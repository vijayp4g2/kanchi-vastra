# Admin Panel - Product Upload Guide

## Adding a New Product

### Step 1: Access Admin Panel
1. Login with admin credentials
2. Navigate to Products section
3. Click **"Add New Product"** button

### Step 2: Upload Images
- Click the **"Add"** button in the image section
- Select up to **5 images** (jpg, png, webp)
- Maximum file size: **5MB per image**
- First image becomes the **cover image**
- Preview images before uploading

### Step 3: Fill Product Details

#### Required Fields:
- **Product Name**: Enter descriptive name
- **Category**: Select from dropdown
  - Sarees: Wedding, Kanchipuram, Festival, Casual, Modern
  - Bangles: Bangles
- **Price**: Enter in rupees (numbers only)
- **Description**: Detailed product description

#### Optional Settings:
- **Availability**: In Stock / Out of Stock
- **Featured Product**: Toggle on for homepage display
- **New Arrival**: Toggle on for new arrivals section

### Step 4: Submit
1. Click **"Create Item"** button
2. Wait for upload progress: "Uploading 1/3..." etc.
3. Success toast appears: "Product created successfully"
4. Product list refreshes automatically

---

## Editing Existing Products

1. Find product in the list
2. Click **Edit** button
3. Modify any fields
4. Add/remove images as needed
5. Click **"Update Item"**

---

## Image Best Practices

### Recommended Image Specs:
- **Format**: JPG or PNG
- **Size**: 1200x1200px (square)
- **File Size**: Under 2MB (for faster uploads)
- **Quality**: High resolution, well-lit

### Image Tips:
- Use clear, professional photos
- Show product from multiple angles
- Include close-up details
- Maintain consistent lighting
- White or neutral background recommended

---

## Product Display Logic

### Frontend Visibility:
- Only **"Active"** products appear on website
- **"Inactive"** products hidden from customers
- **Featured** products show on homepage
- **New Arrivals** appear in dedicated section

### Image Display:
- **First image** = Thumbnail in product cards
- **All images** = Gallery in product detail page
- Images load from Cloudinary CDN (fast worldwide)

---

## Troubleshooting

### "Image upload failed"
- Check internet connection
- Ensure file size under 5MB
- Verify file format (jpg, png, webp only)
- Try uploading fewer images at once

### "Product not appearing on website"
- Check if status is "Active"
- Verify category is correct
- Ensure at least one image uploaded
- Refresh the frontend page

### Images not loading
- Wait a few seconds (Cloudinary processing)
- Check browser console for errors
- Verify Cloudinary credentials configured

---

## Important Notes

✅ **Images are permanent**: Stored on Cloudinary, survive server restarts
✅ **Automatic optimization**: Images compressed for web performance
✅ **Secure URLs**: All images served via HTTPS
✅ **No manual deletion needed**: Removing from product removes from display

⚠️ **Do not refresh** during upload - wait for completion
⚠️ **Fill all required fields** before submitting
⚠️ **Test on frontend** after adding products

---

## Quick Checklist

Before publishing a product:
- [ ] High-quality images uploaded (2-5 images)
- [ ] Product name is descriptive
- [ ] Correct category selected
- [ ] Price is accurate
- [ ] Description is complete
- [ ] Stock status is correct
- [ ] Featured/New Arrival tags set appropriately
- [ ] Tested on frontend website

---

## Support

For technical issues:
- Check server logs
- Verify MongoDB connection
- Ensure Cloudinary credentials are set
- Contact developer if errors persist
