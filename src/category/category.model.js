import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true 
    },
    description: { 
      type: String 
    },
    status: { 
      type: Boolean, 
      default: true 
    }
  },
  { timestamps: true }
);

export default model("Category", categorySchema);
