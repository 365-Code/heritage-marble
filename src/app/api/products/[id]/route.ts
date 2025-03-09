import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models";
import { MongooseError } from "mongoose";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: productId } = await params;

    const product = await Product.findById(productId);

    return NextResponse.json({
      product,
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

    const { id: productId } = await params;

    const { name, imageUrl, categoryId } = await req.json();

    if (!name || !imageUrl || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndUpdate(productId, {
      name: String(name).trim().toLowerCase(),
      imageUrl,
      categoryId,
    });

    return NextResponse.json(
      {
        product,
        message: "product updated successfully",
      },
      { status: 200 }
    );
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findByIdAndDelete(id);

    return NextResponse.json(
      {
        product,
        message: "product deleted successfully",
      },
      { status: 200 }
    );
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
