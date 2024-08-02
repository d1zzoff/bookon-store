"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface Props {
  className?: string;
  images: string[] | undefined;
}

export const ImagePreview: React.FC<Props> = ({ images, className }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [previewIndex, setPreviewIndex] = React.useState(0);

  React.useEffect(() => {
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#F9F9F9";

    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, []);

  const handleSelectImage = (i: number) => {
    api?.scrollTo(i);
  };

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setPreviewIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setPreviewIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div
      className={cn(
        "flex items-start gap-5 w-full bg-light p-5 rounded-[20px]",
        className
      )}
    >
      <div className="flex flex-col gap-[5px]">
        {images &&
          images.map((item, i) => (
            <button
              className={cn(
                "w-[50px] h-[50px] border-2 border-grey-300 rounded-[10px] transition-color duration-200 hover:border-accent",
                previewIndex === i && "border-accent"
              )}
              key={i}
              onClick={() => handleSelectImage(i)}
            >
              <img
                src={item}
                alt="Image"
                className="object-cover w-full h-full rounded-[10px]"
              />
            </button>
          ))}
      </div>
      <Carousel
        className="w-full relative"
        opts={{
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {images &&
            images.length > 0 &&
            images.map((_, i) => (
              <CarouselItem>
                <img
                  src={images ? images[i] : ""}
                  alt={`Preview Image`}
                  className="w-full object-contain max-w-[600px] h-[500px] rounded-[15px]"
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
