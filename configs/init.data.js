import { initializeAdminUser } from "./init.admin.js";
import { initializeDefaultCategory } from "./init.category.js";

export const initializeData = async () => {
    await initializeAdminUser();
    await initializeDefaultCategory();
  };
  