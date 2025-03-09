import mongoose, { Schema, Document } from "mongoose";

// Interface for Category
export interface ICategory extends Document {
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Product
export interface IProduct extends Document {
  name: string;
  imageUrl: string;
  categoryId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Category Schema
const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id; // Replace _id with id
        delete ret._id;
        delete ret.__v; // Remove Mongoose version key
      },
    },
  }
);

// Product Schema
const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Export models
export const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
