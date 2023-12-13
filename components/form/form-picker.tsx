"use client";
import { useState, useEffect } from "react";

import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { FormErrors } from "./form-errors";
import { unsplash } from "@/lib/unsplash";
import { defaultImages } from "@/constants/images";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}
export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 6,
        });
        if (result && result.response) {
          const unsplashImages = result.response as Array<Record<string, any>>;
          setImages(unsplashImages);
        } else {
          throw new Error("Failed to fetch Images!");
        }
      } catch (error) {
        console.error(error);
        setImages(defaultImages);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={JSON.stringify({
                imageId: image.id,
                imageThumbUrl: image.urls.thumb,
                imageFullUrl: image.urls.full,
                imageUserName: image.user.name,
                imageLinkHTML: image.links.html,
              })}
              readOnly
            />
            <Image
              src={image.urls.thumb}
              alt="Unsplash image"
              className=" object-fill rounded-sm  "
              fill
            />

            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 rounded-sm h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white left-0 hover:underline p-1 bg-black/50 rounded-b-sm "
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
