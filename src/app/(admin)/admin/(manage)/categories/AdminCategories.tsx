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
import { CategoryType } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DeleteCategoryDialog from "@/components/admin/delete-category-dialog";
import EditCategoryForm from "@/components/admin/edit-category-form";
import AddCategoryForm from "@/components/admin/add-category-form";

interface AdminCategoriesParams {
  page: number | 1;
  totalPages: number;
  categories: CategoryType[];
}

const AdminCategories = ({
  page,
  totalPages,
  categories,
}: AdminCategoriesParams) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const isAddDialogOpen = searchParams.get("add") === "true";
  const editCategoryId = searchParams.get("edit");
  const deleteCategoryId = searchParams.get("delete");
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
      <h1 className="text-2xl font-semibold">Categories</h1>

      <div className="flex justify-between items-center my-4">
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
          Sort By
          {order === "asc" ? <SortAsc size={20} /> : <SortDesc size={20} />}
        </Button>
        <Button onClick={() => openDialog("add")}>Add Category</Button>
      </div>

      <Table>
        <TableCaption>A list of your categories.</TableCaption>
        <TableHeader>
          <TableRow className="text-center">
            <TableHead className="w-[110px] text-center">
              Category No.
            </TableHead>
            <TableHead className="w-[200px] text-center">Name</TableHead>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((c, index) => (
            <TableRow key={c.id}>
              <TableCell className="text-center font-medium">
                {index + 1}
              </TableCell>
              <TableCell className="text-center font-medium">
                {c.name}
              </TableCell>
              <TableCell>
                <Image
                  unoptimized={true}
                  width={150}
                  height={150}
                  alt={c.name}
                  className="mx-auto rounded-md aspect-square min-w-[100px]"
                  src={c.imageUrl}
                />
              </TableCell>
              <TableCell className="text-center space-x-2 text-nowrap">
                <Button onClick={() => openDialog("edit", c.id)}>
                  <Pen size={20} />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => openDialog("delete", c.id)}
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

      <CategoryActions
        isAddDialogOpen={isAddDialogOpen}
        editCategoryId={editCategoryId}
        deleteCategoryId={deleteCategoryId}
      />
    </div>
  );
};

export default AdminCategories;

const CategoryActions = ({
  isAddDialogOpen,
  editCategoryId,
  deleteCategoryId,
}: {
  isAddDialogOpen: boolean;
  editCategoryId: string | null;
  deleteCategoryId: string | null;
}) => {
  const router = useRouter();

  const closeDialog = (type: "add" | "edit" | "delete") => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete(type);
    router.replace(newUrl.toString(), { scroll: false });
  };
  return (
    <div>
      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={() => closeDialog("add")}>
        <DialogContent className="backdrop-blur-md">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <AddCategoryForm onCategoryAdded={() => router.refresh()} />
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      {editCategoryId && (
        <Dialog open={true} onOpenChange={() => closeDialog("edit")}>
          <DialogContent className="backdrop-blur-md">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <EditCategoryForm
              categoryId={editCategoryId}
              onCategoryUpdated={() => router.refresh()}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Category Dialog */}
      {deleteCategoryId && (
        <Dialog open={true} onOpenChange={() => closeDialog("delete")}>
          <DialogContent className="backdrop-blur-md">
            <DialogHeader>
              <DialogTitle>Delete Category</DialogTitle>
            </DialogHeader>
            <DeleteCategoryDialog
              categoryId={deleteCategoryId}
              onCategoryDeleted={() => router.refresh}
              onClose={() => closeDialog("delete")}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
