"use server";

import { CatalogList } from "@/components/shared/catalog-list";
import { CatalogSkeleton } from "@/components/shared/catalog-list/catalog-skeleton";
import { Container } from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
import { SortFilter } from "@/components/shared/sort-filter";
import { Suspense } from "react";

interface Props {
  searchParams: Record<string, string>;
}

export default async function Home({ searchParams }: Props) {
  return (
    <>
      <Container className="mt-[40px] flex flex-col gap-10 items-start">
        {/* Фильтр сортировки сверху страницы */}
        <SortFilter />

        <div className="flex items-start gap-[30px] w-full">
          {/* Левая часть */}
          <Filters className="flex-shrink-0" />

          {/* Правая часть */}
          <Suspense fallback={<CatalogSkeleton />}>
            <CatalogList searchParams={searchParams} />
          </Suspense>
        </div>
      </Container>
    </>
  );
}
