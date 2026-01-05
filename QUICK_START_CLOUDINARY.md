# 🚀 Quick Start - Cloudinary Setup

## Step 1: Get Cloudinary Credentials (5 minutes)

1. **Sign up for free**: https://cloudinary.com/users/register/free
2. **Login** to your dashboard
3. **Copy these values** from the dashboard:

```
Cloud Name: _________________
API Key: ____________________
API Secret: _________________
```

---

## Step 2: Add to Environment Variables

Open `server/.env` and add:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Replace** the placeholder values with your actual credentials.

---

## Step 3: Restart Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd server
npm run dev
```

---

## Step 4: Test Upload

1. **Login** to admin panel
2. Click **"Add New Product"**
3. **Upload 2-3 images**
4. Fill in product details
5. Click **"Create Item"**

### Expected Result:
- ✅ "Uploading 1/3..." progress shown
- ✅ "Product created successfully" toast
- ✅ Product appears with images
- ✅ Images load from Cloudinary

---

## Step 5: Verify in Cloudinary

1. Go to Cloudinary dashboard
2. Click **"Media Library"**
3. Look for **"kanchi-vastra"** folder
4. ✅ Your uploaded images should be there!

---

## 🎉 You're Done!

Your e-commerce site now has:
- ✅ Persistent image storage
- ✅ Automatic image optimization
- ✅ Fast CDN delivery
- ✅ Production-ready setup

---

## 🐛 Troubleshooting

### "Image upload failed"
- Check if Cloudinary credentials are correct
- Verify `.env` file is in `server/` folder
- Restart the server

### Images not showing
- Check browser console for errors
- Verify MongoDB has image URLs
- Check Cloudinary dashboard

---

## 📞 Need Help?

- Check `CLOUDINARY_SETUP_GUIDE.md` for detailed instructions
- Check `CLOUDINARY_IMPLEMENTATION_SUMMARY.md` for technical details
- Check `ADMIN_UPLOAD_GUIDE.md` for admin usage guide
