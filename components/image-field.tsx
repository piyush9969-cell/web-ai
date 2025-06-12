"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import ImageUploadCrop from "./image-upload-crop";
import Image from "next/image";

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  aspectRatio?: number;
  placeholder?: string;
}

export default function ImageField({
  label,
  value,
  onChange,
  aspectRatio = 1,
  placeholder = "Enter image URL or upload an image",
}: ImageFieldProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleImageSave = (imageUrl: string) => {
    onChange(imageUrl);
  };

  const handleRemoveImage = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`${label.toLowerCase()}-field`}>{label}</Label>

      {value && (
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200">
            <Image
              src={value || "/placeholder.svg"}
              alt={`${label} preview`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={handleRemoveImage}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div className="flex gap-2">
        <Input
          id={`${label.toLowerCase()}-field`}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>

      <ImageUploadCrop
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onImageSave={handleImageSave}
        aspectRatio={aspectRatio}
      />
    </div>
  );
}
