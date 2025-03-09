"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Boxes, Package } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
        Admin Dashboard
      </h1>
      <p className="text-gray-500 text-center mt-2">
        Manage products and categories with ease.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Products Management */}
        <Card
          className="cursor-pointer transition-transform hover:scale-105 shadow-md"
          onClick={() => router.push("/admin/products")}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Manage Products</CardTitle>
            <Package className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Add, edit, and delete products with an intuitive interface.
            </p>
            <Button variant="outline" className="mt-4">
              Go to Products
            </Button>
          </CardContent>
        </Card>

        {/* Categories Management */}
        <Card
          className="cursor-pointer transition-transform hover:scale-105 shadow-md"
          onClick={() => router.push("/admin/categories")}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Manage Categories</CardTitle>
            <Boxes className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Organize products by category efficiently.
            </p>
            <Button variant="outline" className="mt-4">
              Go to Categories
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
