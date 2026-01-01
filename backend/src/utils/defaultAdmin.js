import User from "../models/user.model.js";

export const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Default admin already exists.', existingAdmin.email);
      return;
    }

    const defaultAdmin = new User({
      name: 'Default Admin',
      email: 'admin@skillbridge.com',
      password: 'admin123', // In a real-world scenario, ensure to hash passwords
      role: 'admin'
    });

    await defaultAdmin.save();
    console.log('Default admin created successfully.');
    console.log(`Email: admin@skillbridge.com, Password: admin123`);
  } catch (error) {
    console.error('Failed to create default admin:', error);
  }
}