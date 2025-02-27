import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String 
    },
    price: { 
      type: Number, 
      required: true 
    },
    stock: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    category: { 
      type: Schema.Types.ObjectId, 
      ref: "Category" 
    },
    image: { 
      type: String 
    },
    sold: { 
      type: Number, 
      default: 0 
    },
    status: { 
      type: Boolean, 
      default: true 
    }
  },
  { timestamps: true }
);

export default model("Product", productSchema);
