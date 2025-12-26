// Script to create admin user in database
// Run this in server directory: node create-admin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/sensistream';

// Admin user details
const adminUser = {
    name: 'System Administrator',
    email: 'admin@sensistream.com',
    password: 'Admin@SensiStream2025!',
    role: 'admin',
    organizationId: new mongoose.Types.ObjectId()
};

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'editor', 'viewer'] },
    organizationId: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminUser.email });
        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('Email:', adminUser.email);
            process.exit(0);
        }

        // Hash password
        console.log('🔐 Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminUser.password, salt);

        // Create admin user
        console.log('👤 Creating admin user...');
        const admin = new User({
            ...adminUser,
            password: hashedPassword
        });

        await admin.save();

        console.log('\n✅ SUCCESS! Admin user created successfully!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email:    ', adminUser.email);
        console.log('🔑 Password: ', adminUser.password);
        console.log('👑 Role:     ', adminUser.role);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('You can now login at: http://localhost:3000/auth/login/admin');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

createAdmin();
