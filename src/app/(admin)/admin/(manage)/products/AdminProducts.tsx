"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, SortAsc, SortDesc, Trash2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { CategoryType, ProductType } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddProductForm from "@/components/admin/add-product-form";
import EditProductForm from "@/components/admin/edit-product-form";
import DeleteProductDialog from "@/components/admin/delete-product-dialog";

interface AdminProductsParams {
  page: number | 1;
  totalPages: number | 1;
  selectedCategory: string | null;
  products: ProductType[];
  categories: CategoryType[];
}

const AdminProducts = ({
  selectedCategory,
  page,
  totalPages,
  products,
  categories,
}: AdminProductsParams) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const isAddDialogOpen = searchParams.get("add") === "true";
  const editProductId = searchParams.get("edit");
  const deleteProductId = searchParams.get("delete");
  const order = searchParams.get("order");

  const openDialog = (type: "add" | "edit" | "delete", id?: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set(type, id || "true");
    router.replace(newUrl.toString(), { scroll: false });
  };

  const handlePaging = (newPage: number) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("page", newPage.toString());
    router.push(newUrl.toString());
  };

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <h1 className="text-2xl font-semibold">Products</h1>

      <div className="flex justify-between items-center my-4">
        <div className="flex items-center gap-4">
          {/* Filter By Category */}
          <Select
            onValueChange={(value) =>
              router.push(`?category=${value === "all" ? "" : value}`)
            }
            value={selectedCategory ?? "all"}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category: CategoryType) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select
            onValueChange={(value) => {
              const newUrl = new URL(window.location.href);
              newUrl.searchParams.set("sort", value);
              router.push(newUrl.toString());
            }}
            value={searchParams.get("sort") ?? "date_added"} // Default sorting
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date_added">Date Added</SelectItem>
              <SelectItem value="updated">Updated</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>

          {/* Sorting Order Toggle */}
          <Button
            variant="ghost"
            onClick={() => {
              const newOrder =
                searchParams.get("order") === "asc" ? "desc" : "asc";
              const newUrl = new URL(window.location.href);
              newUrl.searchParams.set("order", newOrder);
              router.push(newUrl.toString());
            }}
            className="p-2"
          >
            {order === "asc" ? <SortAsc size={20} /> : <SortDesc size={20} />}
          </Button>
        </div>

        {/* Add product */}
        <Button onClick={() => openDialog("add")}>Add Product</Button>
      </div>

      <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow className="text-center">
            <TableHead className="w-[100px] text-center">Item No</TableHead>
            <TableHead className="w-[200px] text-center">Name</TableHead>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p: ProductType, index) => (
            <TableRow key={p.id}>
              <TableCell className="w-[100px] text-center font-medium">
                {index + 1}.
              </TableCell>
              <TableCell className="w-[100px] text-center font-medium">
                {p.name}
              </TableCell>
              <TableCell>
                <Image
                  unoptimized={true}
                  width={150}
                  height={150}
                  alt={p.name}
                  className="mx-auto rounded-md aspect-square min-w-[100px]"
                  src={p.imageUrl}
                />
              </TableCell>
              <TableCell className="text-center">{p.categoryId.name}</TableCell>
              <TableCell className="text-center space-x-2 text-nowrap">
                <Button onClick={() => openDialog("edit", p.id)}>
                  <Pen size={20} />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => openDialog("delete", p.id)}
                >
                  <Trash2 size={20} />

                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent className="mt-4">
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePaging(page - 1)} />
            </PaginationItem>
          )}
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <Button
                variant={i + 1 === page ? "default" : "ghost"}
                onClick={() => handlePaging(i + 1)}
              >
                {i + 1}
              </Button>
            </PaginationItem>
          ))}
          {page < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => handlePaging(page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>

      <ProductActions
        isAddDialogOpen={isAddDialogOpen}
        editProductId={editProductId}
        deleteProductId={deleteProductId}
      />
    </div>
  );
};

export default AdminProducts;

const ProductActions = ({
  isAddDialogOpen,
  editProductId,
  deleteProductId,
}: {
  isAddDialogOpen: boolean;
  editProductId: string | null;
  deleteProductId: string | null;
}) => {
  const router = useRouter();

  const closeDialog = (type: "add" | "edit" | "delete") => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete(type);
    router.replace(newUrl.toString(), { scroll: false });
  };
  return (
    <div>
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={() => closeDialog("add")}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <AddProductForm onProductAdded={() => router.refresh()} />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      {editProductId && (
        <Dialog open={true} onOpenChange={() => closeDialog("edit")}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <EditProductForm
              productId={editProductId}
              onProductUpdated={() => router.refresh()}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Product Dialog */}
      {deleteProductId && (
        <Dialog open={true} onOpenChange={() => closeDialog("delete")}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
            </DialogHeader>
            <DeleteProductDialog
              productId={deleteProductId}
              onProductDeleted={() => router.refresh()}
              onClose={() => closeDialog("delete")}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
