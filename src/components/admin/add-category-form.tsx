"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addCategory, uploadToCloudinary } from "@/lib/api";
import { toast } from "sonner";

export default function AddCategoryForm({
  onCategoryAdded,
}: {
  onCategoryAdded: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image)
      return alert("Please provide both a name and an image.");

    setIsUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(image);

      await addCategory({ name, imageUrl });
      toast.success("Category Added Succesfully");

      onCategoryAdded(); // Refresh categories list
      router.push("/admin/categories");
    } catch (error) {
      console.error("Error adding category:", error);
    }
    setIsUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Category Name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        required
      />

      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-600">
          Upload Image:
        </label>
        <Input type="file" onChange={handleImageChange} required />
      </div>

      {imagePreview && (
        <div className="flex justify-center">
          <Image
            unoptimized={true}
            src={imagePreview}
            alt="Preview"
            width={150}
            height={150}
            className="rounded-lg shadow-md"
          />
        </div>
      )}

      <Button type="submit" disabled={isUploading} className="w-full">
        {isUploading ? "Uploading..." : "Add Category"}
      </Button>
    </form>
  );
}
