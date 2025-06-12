"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Upload, RotateCcw, Check } from "lucide-react";
import "react-image-crop/dist/ReactCrop.css";

interface ImageUploadCropProps {
  onImageSave: (imageUrl: string) => void;
  aspectRatio?: number;
  isOpen: boolean;
  onClose: () => void;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageUploadCrop({
  onImageSave,
  aspectRatio = 1,
  isOpen,
  onClose,
}: ImageUploadCropProps) {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isUploading, setIsUploading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspectRatio) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspectRatio));
    }
  };

  const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: PixelCrop): Promise<Blob> => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("No 2d context");
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            }
          },
          "image/jpeg",
          0.9
        );
      });
    },
    []
  );

  const handleSave = async () => {
    if (!imgRef.current || !completedCrop) return;

    setIsUploading(true);
    try {
      const croppedImageBlob = await getCroppedImg(
        imgRef.current,
        completedCrop
      );

      // Create FormData to send the image
      const formData = new FormData();
      formData.append("image", croppedImageBlob, "cropped-image.jpg");

      // Upload to your API endpoint
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { imageUrl } = await response.json();
        onImageSave(imageUrl);
        handleClose();
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setImgSrc("");
    setCrop(undefined);
    setCompletedCrop(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  const handleReset = () => {
    setImgSrc("");
    setCrop(undefined);
    setCompletedCrop(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload and Crop Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!imgSrc && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => fileInputRef.current?.click()}
              >
                Select Image
              </Button>
            </div>
          )}

          {imgSrc && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">Crop your image</h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="max-h-96 overflow-auto border rounded-lg">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspectRatio}
                  minWidth={50}
                  minHeight={50}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc || "/placeholder.svg"}
                    onLoad={onImageLoad}
                    className="max-w-full h-auto"
                  />
                </ReactCrop>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          {imgSrc && (
            <Button
              type="button"
              onClick={handleSave}
              disabled={!completedCrop || isUploading}
            >
              {isUploading ? (
                <>Uploading...</>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Save Image
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
