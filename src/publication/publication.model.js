import { model, Schema } from "mongoose";

const publicationSchema = new Schema(
  {
    author: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    title: { 
      type: String, 
      required: true 
    },
    category: { 
      type: Schema.Types.ObjectId, 
      ref: "Category", 
      required: true 
    },
    content: { 
      type: String, 
      required: true 
    }
  },
  { timestamps: true }
);

export default model("Publication", publicationSchema);
