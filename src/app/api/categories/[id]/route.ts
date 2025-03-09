import { connectDB } from "@/lib/db";
import { Category, Product } from "@/lib/models";
import { MongooseError } from "mongoose";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const category = await Category.findById(id);

    const productCount = await Product.find({
      categoryId: category.id,
    }).countDocuments();

    const ctg = JSON.parse(JSON.stringify(category));

    return NextResponse.json({
      category: { ...ctg, productCount },
      message: "products Fetched Successfully",
    });
  } catch (error) {
    if (error instanceof ApiError || error instanceof MongooseError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        { status: 500 }
      );
    }
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const { name, image } = await req.json();
    const existing = await Category.findById(id);

    if (!existing) {
      return NextResponse.json(
        {
          message: "Category doesn't exist",
        },
        { status: 200 }
      );
    }

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: String(name).trim().toLowerCase(),
        image,
      },
      { new: true }
    );

    return NextResponse.json({
      category,
      message: "category updated successfully",
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          message: "internal database error",
        },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: categoryId } = await params;

    const existing = await Category.findById(categoryId);

    if (!existing) {
      return NextResponse.json(
        {
          message: "Category doesn't exist",
        },
        { status: 404 }
      );
    }

    // Count products in this category
    const productCount = await Product.countDocuments({ category: categoryId });

    // Delete all products in this category
    await Product.deleteMany({ category: categoryId });

    // Delete the category
    const category = await Category.findByIdAndDelete(categoryId);

    return NextResponse.json({
      category,
      message: "Category deleted successfully",
      productCount,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Internal Database Error",
        },
        { status: 500 }
      );
    }
  }
}
