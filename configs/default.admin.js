'use strict';

import User from '../src/user/user.model.js'; 
import { encrypt } from '../utils/encrypt.js';

export const initializeAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ role: 'ADMIN' }); 

    if (!existingAdmin) {
      console.log("-> No admin user found. Creating default ADMIN user...");

      const adminUser = new User({
        name: "Administrator",
        lastname: "System",
        username: "admin",
        email: "admin@example.com",
        password: await encrypt(process.env.ADMIN_PASSWORD), 
        role: "ADMIN",
        address: 'Not Specified',
        phone: "000-000-0000",
        status: true
      });

      await adminUser.save();
      console.log("-> Default ADMIN user created successfully.");
    } else {
      console.log("-> ADMIN user already exists. Skipping creation.");
    }
  } catch (error) {
    console.error("-> Error initializing ADMIN user:", error);
  }
};
