import { model, Schema } from "mongoose";

const billSchema = new Schema(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    products: [
      {
        product: { 
          type: Schema.Types.ObjectId, 
          ref: "Product", 
          required: true 
        },
        quantity: { 
          type: Number, 
          required: true, 
          min: 1 
        },
        price: { 
          type: Number, 
          required: true 
        }
      }
    ],
    total: { 
      type: Number, 
      required: true 
    },
    date: { 
      type: Date, 
      default: Date.now 
    },
    status: { 
      type: String, 
      enum: ["completed", "pending", "canceled"], 
      default: "pending" 
    }
  },
  { timestamps: true }
);

export default model("Bill", billSchema);
