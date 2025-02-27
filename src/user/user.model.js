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
      required: true
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
      enum: ["ADMIN", "CLIENT"], 
      default: "CLIENT" 
    },
    address: { 
      type: String 
    },
    phone: { 
      type: String 
    }
  },
  { timestamps: true }
);

export default model("User", userSchema);
