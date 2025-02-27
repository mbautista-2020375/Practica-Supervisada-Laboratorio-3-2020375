import { initializeAdminUser } from "./default.admin.js";
import { initializeDefaultCategory } from "./default.category.js";

export const initializeData = async () => {
    await initializeAdminUser();
    await initializeDefaultCategory();
  };
  