"use client";
import React, { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const Adminlayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const currentTab = pathname.split("/").at(-1) || "";

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 w-full mt-[80px]">
      {/* Back to Dashboard Button */}
      <div className="flex items-center mb-4">
        <Link href="/admin/dashboard">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Tabs for Navigation */}
      <Tabs defaultValue={currentTab} className="w-full">
        <TabsList className="grid h-[60px] w-full grid-cols-2">
          <Link href="/admin/products?page=1" className="h-full">
            <TabsTrigger value="products" className="w-full h-full">
              Products
            </TabsTrigger>
          </Link>
          <Link href="/admin/categories?page=1" className="h-full">
            <TabsTrigger value="categories" className="w-full h-full">
              Categories
            </TabsTrigger>
          </Link>
        </TabsList>
        <TabsContent value={currentTab}>{children}</TabsContent>
      </Tabs>
    </div>
  );
};

export default Adminlayout;
