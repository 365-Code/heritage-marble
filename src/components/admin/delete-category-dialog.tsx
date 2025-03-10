"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import mongoose from "mongoose";
import { deleteCategory, fetchCategory } from "@/lib/api";
import { toast } from "sonner";

export default function DeleteCategoryDialog({
  categoryId,
  onCategoryDeleted,
  onClose,
}: {
  categoryId: string;
  onCategoryDeleted: () => void;
  onClose: () => void;
}) {
  const [category, setCategory] = useState<{
    name: string;
    productCount: number;
  } | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCategory() {
      try {
        const category = await fetchCategory(
          new mongoose.Types.ObjectId(categoryId)
        );
        setCategory({
          name: category.name,
          productCount: category.productCount,
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    }
    getCategory();
  }, [categoryId]);

  const handleDelete = async () => {
    if (!category || confirmText !== category.name)
      return alert("Category name does not match");
    setLoading(true);
    try {
      await deleteCategory(new mongoose.Types.ObjectId(categoryId));
      toast.success("Category deleted successfully");
      onCategoryDeleted();
      onClose();
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {category && (
        <>
          <TriangleAlert fill="yellow" color="black" />
          <p className="text-red-600 mt-2">
            Deleting <strong>{category.name}</strong> will remove{" "}
            <strong>{category.productCount} products</strong> inside it. This
            action cannot be undone!
          </p>
        </>
      )}

      <div className="mt-4">
        <p>
          Type <strong>{category?.name}</strong> to confirm:
        </p>
        <input
          type="text"
          className="border p-2 w-full mt-2"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
        />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={confirmText !== category?.name || loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}
