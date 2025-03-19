"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import mongoose from "mongoose";
import { toast } from "sonner";
import { fetchCategory, updateCategory, uploadToCloudinary } from "@/lib/api";

export default function EditCategoryForm({
  categoryId,
  onCategoryUpdated,
}: {
  categoryId: string;
  onCategoryUpdated: () => void;
}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCategory() {
      try {
        const category = await fetchCategory(
          new mongoose.Types.ObjectId(categoryId)
        );
        setName(category.name);
        setPreview(category.imageUrl);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    }
    getCategory();
  }, [categoryId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return alert("Please enter a name");
    setLoading(true);
    try {
      let imageUrl = preview; // Keep existing image if no new one is selected

      if (image) {
        imageUrl = await uploadToCloudinary(image);
        if (!imageUrl) {
          alert("Image upload failed");
          setLoading(false);
          return;
        }
      }

      await updateCategory(new mongoose.Types.ObjectId(categoryId), {
        name,
        imageUrl: imageUrl as string,
      });
      onCategoryUpdated();
      toast.success("Updated Successfully");
    } catch (error) {
      toast.error("Failed to update category");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="flex flex-col gap-2 justify-between">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <Image
            unoptimized={true}
            src={preview}
            alt="Preview"
            width={100}
            height={100}
            className="rounded-md mx-auto"
          />
        )}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
