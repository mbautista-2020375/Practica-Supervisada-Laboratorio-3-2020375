import { model, Schema } from "mongoose";

const commentarySchema = new Schema(
  {
    author: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    publication: { 
      type: Schema.Types.ObjectId, 
      ref: "Publication", 
      required: true 
    },
    content: { 
      type: String, 
      required: true 
    }
  },
  { timestamps: true }
);

export default model("Commentary", commentarySchema);
