import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    lastname: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: { 
      type: String, 
      required: true,
      unique: true
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ["ADMIN", "REGULAR"], 
      default: "REGULAR" 
    },
    age: { 
      type: Number,
      required: true 
    },
    phone: { 
      type: String 
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default model("User", userSchema);
