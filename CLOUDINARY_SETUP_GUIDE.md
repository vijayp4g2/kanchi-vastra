# Cloudinary Integration Setup Guide

## Overview
This guide explains how to set up Cloudinary for image storage in the Kanchi Vastra e-commerce platform.

## Why Cloudinary?
- ✅ **Persistent Storage**: Images survive server restarts and redeployments on Render
- ✅ **Automatic Optimization**: Images are automatically compressed and optimized
- ✅ **CDN Delivery**: Fast image loading worldwide
- ✅ **Scalable**: No server disk space concerns
- ✅ **Free Tier**: 25GB storage + 25GB bandwidth/month

---

## Step 1: Create Cloudinary Account

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up for a free account
3. After login, go to **Dashboard**
4. Copy these credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

## Step 2: Configure Environment Variables

Add these to your `server/.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Important**: Never commit `.env` to Git!

---

## Step 3: How It Works

### Admin Upload Flow

1. **Admin selects images** in the product form
2. **Images are previewed** locally (no upload yet)
3. **On form submit**:
   - Each image is uploaded to Cloudinary
   - Cloudinary returns `{ url, public_id }`
   - Product data + image URLs saved to MongoDB
4. **Success**: Product appears on frontend with Cloudinary URLs

### Data Structure in MongoDB

```javascript
{
  "name": "Elegant Kanchipuram Saree",
  "price": 12500,
  "category": "Wedding",
  "description": "Beautiful silk saree...",
  "images": [
    {
      "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234/kanchi-vastra/abc123.jpg",
      "public_id": "kanchi-vastra/abc123"
    },
    {
      "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234/kanchi-vastra/def456.jpg",
      "public_id": "kanchi-vastra/def456"
    }
  ],
  "stock": 10,
  "status": "Active",
  "inStock": true,
  "featured": true,
  "isNewArrival": true
}
```

---

## Step 4: API Endpoints

### Upload Single Image
```
POST /api/upload
Authorization: Bearer {admin_token}
Content-Type: multipart/form-data

Body: { image: File }

Response: {
  "url": "https://res.cloudinary.com/...",
  "public_id": "kanchi-vastra/..."
}
```

### Upload Multiple Images
```
POST /api/upload/multiple
Authorization: Bearer {admin_token}
Content-Type: multipart/form-data

Body: { images: File[] }

Response: [
  { "url": "...", "public_id": "..." },
  { "url": "...", "public_id": "..." }
]
```

### Delete Image
```
DELETE /api/upload/:public_id
Authorization: Bearer {admin_token}

Response: {
  "message": "Image deleted successfully"
}
```

---

## Step 5: Image Optimization

All uploaded images are automatically:
- **Resized**: Max 1200x1200px (maintains aspect ratio)
- **Compressed**: Quality set to "auto:good"
- **Organized**: Stored in `kanchi-vastra/` folder
- **Secure**: HTTPS URLs only

---

## Step 6: Frontend Display

### Product Cards
```jsx
<img src={product.images[0].url} alt={product.name} />
```

### Product Detail Page
```jsx
{product.images.map((img, idx) => (
  <img key={idx} src={img.url} alt={`${product.name} ${idx + 1}`} />
))}
```

---

## Step 7: Testing

### Test Upload Flow

1. Login as admin
2. Click "Add New Product"
3. Fill in product details
4. Upload 2-3 images
5. Submit form
6. Verify:
   - ✅ Success toast appears
   - ✅ Product appears in admin list
   - ✅ Images display correctly
   - ✅ Check MongoDB - images array has url + public_id
   - ✅ Visit frontend - product displays with images

### Test Image Persistence

1. Upload a product with images
2. Restart the server
3. Check if images still display ✅

---

## Step 8: Deployment to Render

### Add Environment Variables in Render

1. Go to your Render dashboard
2. Select your web service
3. Go to **Environment** tab
4. Add these variables:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
5. Click **Save Changes**
6. Render will auto-redeploy

---

## Troubleshooting

### Issue: "Image upload failed"
**Solution**: Check Cloudinary credentials in `.env`

### Issue: Images not displaying
**Solution**: 
- Check browser console for CORS errors
- Verify image URLs in MongoDB
- Ensure Cloudinary URLs are HTTPS

### Issue: "File too large"
**Solution**: Current limit is 5MB per image. Reduce image size.

### Issue: Old products not showing images
**Solution**: The system supports backward compatibility. Old string URLs will still work.

---

## Migration from Local Storage

If you have existing products with local image paths:

1. Old format: `images: ["/uploads/image-123.jpg"]`
2. New format: `images: [{ url: "https://...", public_id: "..." }]`

The frontend automatically handles both formats!

---

## Security Notes

- ✅ Only admin users can upload images
- ✅ File type validation (jpg, jpeg, png, webp only)
- ✅ File size limit: 5MB per image
- ✅ Maximum 5 images per product
- ✅ Cloudinary credentials stored securely in environment variables

---

## Cost Management

**Free Tier Limits**:
- 25GB storage
- 25GB bandwidth/month
- 25 credits/month

**Estimated Usage**:
- Average image: 200KB (optimized)
- 1000 products × 3 images = 600MB storage
- Well within free tier! 🎉

---

## Support

For Cloudinary issues:
- Documentation: https://cloudinary.com/documentation
- Support: https://support.cloudinary.com

For code issues:
- Check server logs
- Verify MongoDB connection
- Test API endpoints with Postman
