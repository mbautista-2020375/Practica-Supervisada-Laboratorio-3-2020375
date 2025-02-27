import Category from "../src/category/category.model.js"

export const initializeDefaultCategory = async () => {
    try {
        const existingCategory = await Category.findOne({ name: 'Not Assigned' });
        if (!existingCategory) {
            const defaultCategory = new Category({
                name: 'Not Assigned',
                description: 'This is the default category for unassigned publications.'
            });

            await defaultCategory.save();
            console.log("-> Default category 'Not Assigned' created successfully.");
        } else {
            console.log("->Default category 'Not Assigned' already exists, skipping creation.");
        }
    } catch (error) {
        console.error("-> Error initializing default category:", error);
    }
};
