# 🎯 ClearStream Website Testing Guide (Telugu)

**Created:** December 26, 2025  
**Purpose:** Step-by-step website testing guide in Telugu (English alphabets)

---

## 📌 **Current Status**

✅ **Frontend Server:** Running on port 3000  
❌ **Backend Server:** NOT Running (port 5000 expected)  
⚠️ **Issue:** Backend server start cheyali mundu testing kosam

---

## 🚀 **STEP 1: Backend Server Start Cheyandi**

Backend server lekunte authentication, video upload, database features work avvavu.

### **Backend Server Start Cheyyadaniki:**

```bash
# Terminal open chesi ee commands run cheyandi:

# 1. Server folder loki vellandi
cd server

# 2. Dependencies install ayyayo check cheyandi
npm install

# 3. MongoDB running undho check cheyandi
# MongoDB local ga install undali or MongoDB Atlas connection undali

# 4. Server start cheyandi
npm run dev
# OR
node server.js
```

**Backend server start ayyaka idi chupinchaali:**
```
✓ Server running on port 5000
✓ MongoDB Connected Successfully
✓ Database: sensistream
```

---

## 🌐 **STEP 2: Frontend Server Check**

Frontend already running undi port 3000 mida.

### **Check Cheyandi:**

1. **Browser open cheyandi** (Chrome, Edge, Firefox - edi aina)
2. **Navigate to:** http://localhost:3000
3. **Landing page load avvali**

**Expected Result:**
- ✅ Landing page with hero section visible
- ✅ Navigation menu working
- ✅ Images loading properly
- ✅ No console errors

---

## 🔐 **STEP 3: Authentication Testing**

### **3.1 Registration Test - Kotha User Create Cheyandi**

1. **Registration page ki vellandi:**
   ```
   http://localhost:3000/auth/register
   ```

2. **Form fill cheyandi:**
   - Name: Test User
   - Email: testuser@example.com
   - Password: Test@123
   - Role: Editor (or Viewer)

3. **"Register" button click cheyandi**

**Expected Results:**
- ✅ "Registration successful" message
- ✅ Automatically login page ki redirect
- ❌ Error unte - "Email already exists" or validation error

---

### **3.2 Login Test - Different Roles**

Mee application lo 3 different login pages unnai:

#### **A) Admin Login:**
```
http://localhost:3000/auth/login/admin
```
- Email: admin@test.com
- Password: admin123

#### **B) Editor Login:**
```
http://localhost:3000/auth/login/editor
```
- Email: editor@test.com
- Password: editor123

#### **C) Viewer Login:**
```
http://localhost:3000/auth/login/viewer
```
- Email: viewer@test.com
- Password: viewer123

**Test Cheyandi:**
1. Login credentials enter cheyandi
2. "Login" button click cheyandi
3. Dashboard page ki redirect avvali

**Expected Results:**
- ✅ Successful login → Dashboard redirect
- ✅ JWT token stored in localStorage
- ✅ User info displayed in header/sidebar
- ❌ Wrong password → "Invalid credentials" error
- ❌ Backend down → "Server error" message

---

## 📊 **STEP 4: Dashboard Testing**

Login ayyaka dashboard page open avvali.

### **Dashboard lo Check Cheyandi:**

1. **User Stats Display:**
   - Total Videos count
   - Processing/Approved counts
   - Recent activity

2. **Navigation Sidebar:**
   - Home
   - Video Library
   - Upload Video
   - Settings
   - Admin Panel (Admin role lo matrame)

3. **Quick Actions:**
   - "Upload New Video" button work chesthunda
   - "View Library" button work chesthunda

**Expected Results:**
- ✅ All stats showing correct data
- ✅ Sidebar links working
- ✅ Responsive on mobile/tablet
- ✅ Role-based menu items (Admin ki extra options)

---

## 📹 **STEP 5: Video Upload Testing**

### **Upload Page Test (Editor/Admin only):**

1. **Upload page ki vellandi:**
   ```
   http://localhost:3000/dashboard/upload
   ```

2. **Video file select cheyandi:**
   - Click "Choose File" or drag-and-drop
   - Select a video file (.mp4, .avi, .mov)

3. **Details fill cheyandi:**
   - Title: "Test Video 1"
   - Description: "Testing upload functionality"
   - Category: Select from dropdown

4. **"Upload" button click cheyandi**

**Expected Results:**
- ✅ File upload progress bar visible
- ✅ Upload success message
- ✅ Redirect to video library or details page
- ⚠️ Backend issue unte error message

**Common Issues:**
- ❌ File too large → "File size exceeds limit"
- ❌ Wrong format → "Invalid file type"
- ❌ Backend down → Cannot upload

---

## 📚 **STEP 6: Video Library Testing**

### **Library Page Test:**

1. **Library page ki vellandi:**
   ```
   http://localhost:3000/dashboard/library
   ```

2. **Check Cheyandi:**
   - All uploaded videos list lo unnayi
   - Video thumbnails display avuthunnai
   - Video titles and status visible

3. **Search & Filter:**
   - Search box lo video name type cheyandi
   - Filter by status (All/Processing/Approved/Rejected)
   - Sort by date

4. **Video Card Actions:**
   - Click video card
   - "View Details" button
   - "Edit" button (if available)
   - "Delete" button (Admin only)

**Expected Results:**
- ✅ Video grid responsive (1 column mobile, 2 tablet, 3 desktop)
- ✅ Search working properly
- ✅ Filter updating results
- ✅ Clicking video opens details page

---

## 🎬 **STEP 7: Video Details Testing**

### **Details Page Test:**

1. **Video card click chesi details page open cheyandi**

2. **Check Cheyandi:**
   - Video player visible (⚠️ Currently placeholder)
   - Video title, description
   - Upload date and time
   - Uploaded by (user name)
   - Status badge (Processing/Approved/Rejected)
   - Sensitivity analysis results (if processed)

3. **Editor/Admin Actions:**
   - "Approve" button
   - "Reject" button
   - "Delete" button
   - Edit details

**Expected Results:**
- ✅ All video information displayed
- ✅ Role-based buttons visible
- ⚠️ Video player may show placeholder (not implemented yet)
- ✅ Status change working (if backend running)

---

## 👥 **STEP 8: Admin Panel Testing (Admin Only)**

### **User Management Test:**

1. **Admin Panel ki vellandi:**
   ```
   http://localhost:3000/dashboard/admin
   ```

2. **Users List Check:**
   - All registered users displayed
   - Email, name, role visible
   - User count statistics

3. **Role Management:**
   - Select a user
   - Click "Change Role" button
   - Select new role (Admin/Editor/Viewer)
   - Save changes

4. **User Actions:**
   - View user details
   - Deactivate user (if implemented)
   - Delete user (careful!)

**Expected Results:**
- ✅ Only Admin can access this page
- ✅ Viewer/Editor accessing → "Access denied" or redirect
- ✅ User role changes reflected immediately
- ✅ User statistics accurate

---

## ⚙️ **STEP 9: Settings Page Testing**

### **Settings Test:**

1. **Settings page ki vellandi:**
   ```
   http://localhost:3000/dashboard/settings
   ```

2. **Profile Settings:**
   - View current user info
   - Edit name
   - Change password form

3. **Preferences:**
   - Theme toggle (Light/Dark mode)
   - Notification settings
   - Language preferences (if any)

**Expected Results:**
- ✅ Profile info displayed correctly
- ✅ Password change working
- ✅ Theme toggle working
- ✅ Settings saved to database

---

## 📱 **STEP 10: Responsive Design Testing**

### **Different Screen Sizes lo Test Cheyandi:**

#### **Desktop (1920px+):**
- Browser full screen cheyandi
- All sections properly aligned
- Sidebar always visible
- 3-column video grid

#### **Tablet (768px - 1024px):**
- Browser window resize cheyandi
- Sidebar collapsible
- 2-column video grid
- Navigation hamburger menu

#### **Mobile (375px - 640px):**
- Browser DevTools open cheyandi (F12)
- Toggle device toolbar
- Select iPhone/Samsung
- Test:
  - Touch-friendly buttons
  - Single column layout
  - Hamburger menu
  - Forms full-width
  - No horizontal scroll

**Testing Tips:**
```
Right-click → Inspect → Click device icon (Ctrl+Shift+M)
Test phones: iPhone SE, iPhone 12, Samsung Galaxy
```

---

## 🛡️ **STEP 11: Security Testing**

### **Protected Routes Test:**

1. **Without Login:**
   - Try to access: http://localhost:3000/dashboard
   - **Expected:** Redirect to login page

2. **Viewer Role:**
   - Login as Viewer
   - Try to access: http://localhost:3000/dashboard/admin
   - **Expected:** "Access denied" or redirect

3. **Token Expiration:**
   - Login cheyandi
   - LocalStorage lo velli token delete cheyandi
   - Page refresh cheyandi
   - **Expected:** Logout and redirect to login

4. **Role Boundaries:**
   - Viewer login → Cannot upload videos
   - Editor login → Cannot access admin panel
   - Admin login → Full access

---

## 🐛 **STEP 12: Error Handling Testing**

### **Test These Error Scenarios:**

1. **Network Error:**
   - Backend server stop cheyandi
   - Try to upload video
   - **Expected:** "Server not reachable" error

2. **Invalid Input:**
   - Login form lo email without @ symbol
   - Password less than 6 characters
   - **Expected:** Validation error messages

3. **Server Errors:**
   - Database connection issue
   - **Expected:** User-friendly error message

4. **File Upload Errors:**
   - Upload very large file (>500MB)
   - Upload wrong format (.txt, .pdf)
   - **Expected:** Specific error messages

---

## ✅ **COMPLETE TESTING CHECKLIST**

### **Before Testing:**
- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 3000)
- [ ] MongoDB connected
- [ ] .env files configured

### **Basic Functionality:**
- [ ] Landing page loads
- [ ] Registration works
- [ ] Login works (all 3 roles)
- [ ] Dashboard displays
- [ ] Navigation working
- [ ] Logout working

### **Video Features:**
- [ ] Video upload successful
- [ ] Video appears in library
- [ ] Search and filter working
- [ ] Video details page opens
- [ ] Video player visible (placeholder ok for now)

### **Admin Features:**
- [ ] Admin panel accessible (Admin only)
- [ ] User list displays
- [ ] Role change working
- [ ] Access denied for non-admins

### **UI/UX:**
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop layout proper
- [ ] Theme toggle working
- [ ] Loading states showing
- [ ] Error messages clear

### **Security:**
- [ ] Protected routes working
- [ ] Role-based access control
- [ ] Token validation
- [ ] Logout clears session

---

## 🚨 **Common Issues & Solutions**

### **Issue 1: Backend Not Running**
```bash
Error: Cannot connect to server
Solution: 
  cd server
  npm install
  npm run dev
```

### **Issue 2: MongoDB Not Connected**
```bash
Error: MongoNetworkError
Solution: 
  - Install MongoDB Community Edition
  - Start MongoDB service
  OR use MongoDB Atlas cloud connection
```

### **Issue 3: Port Already in Use**
```bash
Error: Port 3000 is already in use
Solution:
  # Find process
  netstat -ano | findstr :3000
  # Kill process (replace PID)
  taskkill /F /PID <process_id>
```

### **Issue 4: Login Not Working**
```bash
Error: Invalid credentials
Solution:
  - Check backend server running
  - Verify user exists in database
  - Check network tab for API errors (F12 → Network)
```

### **Issue 5: Video Upload Failing**
```bash
Error: Upload failed
Solution:
  - Check file size (max 500MB)
  - Check file format (.mp4, .avi, .mov)
  - Check server uploads folder permissions
  - Verify backend API is running
```

---

## 🎯 **Testing Priority Order**

### **Day 1: Core Functionality**
1. ✅ Start backend server
2. ✅ Test registration
3. ✅ Test login (all roles)
4. ✅ Test dashboard
5. ✅ Test navigation

### **Day 2: Features**
1. ✅ Test video upload
2. ✅ Test video library
3. ✅ Test search/filter
4. ✅ Test admin panel
5. ✅ Test settings

### **Day 3: Advanced**
1. ✅ Responsive testing
2. ✅ Security testing
3. ✅ Error scenarios
4. ✅ Performance check
5. ✅ Browser compatibility

---

## 📝 **Testing Report Template**

Test ayyaka ee format lo report create cheyandi:

```markdown
# Testing Report - ClearStream

**Date:** December 26, 2025
**Tester:** [Your Name]
**Version:** 1.0

## ✅ Working Features:
- Registration: ✅ Working
- Login: ✅ Working
- Dashboard: ✅ Working
- Video Upload: ⚠️ Backend issue

## ❌ Issues Found:
1. Backend server not starting
2. Video player shows placeholder
3. Email verification missing

## 🐛 Bugs:
1. Login form validation error on mobile
2. Video thumbnail not generating
3. Search case-sensitive issue

## 💡 Suggestions:
1. Add forgot password
2. Improve error messages
3. Add loading spinners

## ⭐ Overall Rating: 8/10
```

---

## 🎊 **Next Steps After Testing**

1. **Document all bugs** - Screenshot tho
2. **Create bug report** - Priority tho (High/Medium/Low)
3. **Fix critical issues** - Login, Auth, Core features
4. **Re-test fixed features**
5. **Deploy to staging** - Test online
6. **Production deployment** - After all tests pass

---

## 📞 **Need Help?**

Ee testing process lo evaraina doubts unte:

1. **Console errors check cheyandi** - F12 → Console tab
2. **Network errors check cheyandi** - F12 → Network tab
3. **Backend logs check cheyandi** - Server terminal output
4. **Browser DevTools use cheyandi** - Element inspect

---

**Happy Testing! 🚀**

Meeku ee guide helpful ga unte, testing start cheyandi! Emaina doubts unte adigochu. 😊
