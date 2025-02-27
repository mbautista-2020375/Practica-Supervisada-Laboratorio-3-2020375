import { model, Schema } from "mongoose";
import { boolean } from "webidl-conversions";

const categorySchema = new Schema(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default model("Category", categorySchema);