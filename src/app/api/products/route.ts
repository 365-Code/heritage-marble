import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models";
import { MongooseError } from "mongoose";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const page = Number(searchParams.get("page"));

    const products = await Product.find(categoryId ? { categoryId } : {})
      .skip(page ? (page - 1) * 20 : 0)
      .sort({ createdAt: -1 })
      .populate(["categoryId"], ["id", "name"]);

    return NextResponse.json(
      {
        products,
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

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, imageUrl, categoryId } = await req.json();

    if (!name || !imageUrl || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name: String(name).trim().toLowerCase(),
      imageUrl,
      categoryId,
    });

    return NextResponse.json(
      {
        product,
        message: "product added successfully",
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
