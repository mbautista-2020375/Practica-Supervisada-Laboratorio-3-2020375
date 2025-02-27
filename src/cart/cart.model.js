import { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      unique: true, 
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
        }
      }
    ]
  },
  { timestamps: true }
);

export default model("Cart", cartSchema);
