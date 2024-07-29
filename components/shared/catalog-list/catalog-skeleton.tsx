import { Skeleton } from "@/components/ui/skeleton";
import { Rating } from "../rating";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const CatalogSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("w-full flex-grow-1", className)}>
      <h1>Каталог книг</h1>
      <p className="mb-[20px]">По вашему запросу найдено 0 товар(ов/а)</p>
      <div className="flex gap-[30px] w-full flex-wrap">
        {[...Array(9)].map((_, i) => (
          <div
            className={"w-full max-w-[290px] h-[440px] flex flex-col"}
            key={i}
          >
            <Skeleton className="w-full h-[260px] bg-grey-100 rounded-[15px]" />

            <div className="flex flex-col items-start gap-[7px] mt-[15px]">
              <Skeleton className="h-[22px] rounded-full w-full" />
              <Skeleton className="h-[16px] rounded-full w-full" />
            </div>

            <div className="flex flex-col gap-[5px] items-start mt-auto">
              <div className="flex items-center w-full justify-between">
                <Skeleton className="h-[30px] rounded-full w-full max-w-[100px]" />
                <Rating value={0} className="mx-[-2px]" />
              </div>

              <Button variant={"outline"} size={"full"}>
                + Добавить
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
