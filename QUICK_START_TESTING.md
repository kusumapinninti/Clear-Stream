# 🚀 Quick Start Testing Guide

## ✅ Current Status

**Both Servers Running:**
- ✅ Frontend: http://localhost:3000 (Next.js)
- ✅ Backend: http://localhost:5000 (Express API)

---

## ⚠️ IMPORTANT: Backend "Cannot GET /" is NORMAL!

Backend server లో `http://localhost:5000` direct ga open చేస్తే **"Cannot GET /"** error వస్తుంది.

**ఇది Normal behavior ఎందుకంటే:**
- Backend = API Server (Not a website)
- Frontend = User Interface (Website)
- Users ఎప్పుడూ backend direct ga open చేయరు

Backend కోసం Frontend internally API calls చేస్తుంది.

---

## 🌟 START HERE - Frontend Testing

### Step 1: Open Landing Page

Browser లో ఈ URL open చేయండి:
```
http://localhost:3000
```

**Expected Result:**
- Landing page with navigation menu
- Hero section with animations
- Features, services sections
- Footer

---

### Step 2: Test Registration

```
URL: http://localhost:3000/auth/register
```

**Fill the form:**
- Full Name: Test User
- Email: test@example.com
- Password: Test@123
- Confirm Password: Test@123
- Role: Select "Editor" or "Viewer"

**Click "Register"**

**Expected Result:**
- ✅ "Registration successful" message
- ✅ Redirect to login page

---

### Step 3: Test Login (3 Different Pages)

#### A) Admin Login:
```
URL: http://localhost:3000/auth/login/admin
```
**Test Credentials:**
- Email: admin@test.com
- Password: admin123

#### B) Editor Login:
```
URL: http://localhost:3000/auth/login/editor
```
**Test Credentials:**
- Email: editor@test.com
- Password: editor123

#### C) Viewer Login:
```
URL: http://localhost:3000/auth/login/viewer
```
**Test Credentials:**
- Email: viewer@test.com
- Password: viewer123

**Expected Result:**
- ✅ Successful login
- ✅ Redirect to dashboard
- ✅ User info displayed in header

---

### Step 4: Test Dashboard

After login, you should be at:
```
URL: http://localhost:3000/dashboard
```

**Check These:**
- [ ] User statistics displayed
- [ ] Recent videos section
- [ ] Navigation sidebar visible
- [ ] Quick action buttons work
- [ ] Logout button works

---

### Step 5: Test Video Upload (Editor/Admin Only)

```
URL: http://localhost:3000/dashboard/upload
```

**Upload a Video:**
1. Click "Choose File" or drag-drop
2. Select a .mp4/.avi/.mov file
3. Fill title and description
4. Click "Upload"

**Expected Result:**
- ✅ Upload progress bar
- ✅ Success message
- ✅ Video appears in library

**Note:** Viewer role cannot access upload page.

---

### Step 6: Test Video Library

```
URL: http://localhost:3000/dashboard/library
```

**Test Features:**
- [ ] Video grid displays
- [ ] Search box works
- [ ] Filter by status works
- [ ] Click video card opens details
- [ ] Responsive grid (1/2/3 columns)

---

### Step 7: Test Admin Panel (Admin Only)

```
URL: http://localhost:3000/dashboard/admin
```

**Test Features:**
- [ ] Users list displayed
- [ ] User statistics shown
- [ ] Change user role works
- [ ] Non-admin users blocked

**Note:** Editor/Viewer roles should get "Access Denied" or redirect.

---

## 📱 Responsive Testing

### Desktop (1920px+):
1. Browser full screen చేయండి
2. 3-column video grid
3. Sidebar always visible

### Tablet (768px - 1024px):
1. Browser window resize చేయండి
2. 2-column video grid
3. Collapsible sidebar

### Mobile (375px - 640px):
1. Press F12 → DevTools
2. Click device icon (Ctrl+Shift+M)
3. Select "iPhone 12" or "Samsung Galaxy"
4. Test:
   - [ ] Hamburger menu
   - [ ] Touch-friendly buttons
   - [ ] Single column layout
   - [ ] No horizontal scroll
   - [ ] Forms full-width

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot GET /" on port 5000
**Solution:** This is NORMAL! Backend is API only. Use frontend on port 3000.

### Issue 2: Frontend not loading
**Solution:**
```bash
cd c:\Users\palur\OneDrive\Desktop\clearstream\clearstream
npm run dev
```

### Issue 3: Login not working
**Solution:**
- Check backend running on port 5000
- Open browser DevTools (F12) → Network tab
- Look for API call errors

### Issue 4: "User not found" error
**Solution:**
- Register a new user first
- Use provided test credentials
- Check MongoDB is connected

---

## 🔍 Debugging Tips

### Check Backend API (Using Browser or Postman):

**Test Backend Health:**
```
Open: http://localhost:5000/api/health
(If this endpoint exists)
```

**Test Login API:**
```
POST http://localhost:5000/api/auth/login
Body: {
  "email": "admin@test.com",
  "password": "admin123"
}
```

### Check Frontend Logs:

**Browser Console:**
1. Press F12
2. Go to Console tab
3. Look for errors (red messages)

**Network Tab:**
1. Press F12
2. Go to Network tab
3. Try login/register
4. Check API calls (should show 200 OK)

---

## ✅ Testing Checklist - Quick Version

### Today's Testing Goals:

**Basic Functionality:**
- [ ] Landing page loads
- [ ] Registration works
- [ ] Login works
- [ ] Dashboard displays
- [ ] Navigation working

**Video Features:**
- [ ] Upload video (Editor/Admin)
- [ ] View library
- [ ] Search videos
- [ ] Filter videos

**Admin Features:**
- [ ] Admin panel accessible
- [ ] User list displays
- [ ] Change user role

**Responsive:**
- [ ] Mobile view works
- [ ] Tablet view works
- [ ] Desktop layout proper

---

## 📊 Expected Test Results

### After Complete Testing:

**✅ Working Features:**
- Authentication (Register/Login/Logout)
- Role-based access (Admin/Editor/Viewer)
- Dashboard with stats
- Video upload
- Video library
- Search & filter
- Admin user management
- Responsive design

**⚠️ Known Limitations:**
- Video player shows placeholder (not real player)
- Email verification not active (emails skipped)
- No forgot password yet

**Overall:** Application is **80% complete** and ready for alpha testing!

---

## 🎯 Testing Priority Order

1. **First:** Test landing page (http://localhost:3000)
2. **Second:** Test registration & login
3. **Third:** Test dashboard
4. **Fourth:** Test video upload & library
5. **Fifth:** Test admin features
6. **Last:** Test responsive design

---

## 📞 Need Help?

**If Something Doesn't Work:**

1. Check browser console (F12 → Console)
2. Check backend terminal output
3. Check frontend terminal output
4. Take screenshot of error
5. Share error message

---

**Happy Testing! 🚀**

Start with: http://localhost:3000

Emaina issues unte screenshot tho share cheyandi! 😊
