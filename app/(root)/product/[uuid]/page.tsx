"use server";

import { ProductItem } from "@/components/shared/catalog-list/product-item";
import { Container } from "@/components/shared/container";
import { ImagePreview } from "@/components/shared/image-preview";
import { ProductButtons } from "@/components/shared/product-buttons";
import { ProductDescription } from "@/components/shared/product-description";
import { Rating } from "@/components/shared/rating";
import { ReviewItem } from "@/components/shared/review-item";
import { getProductById, getProducts } from "@/lib/actions/products";
import qs from "qs";

interface Props {
  params: any;
}

export default async function Page({ params }: Props) {
  const uuid = params.uuid;

  const data = await getProductById(uuid);

  console.log(data);

  const filters = {
    limit: 4,
    offset: 0,
  };

  const products = await getProducts(qs.stringify(filters));

  return (
    <Container>
      <div className="w-full inline-flex items-start gap-5">
        <div className="flex flex-col gap-5 flex-shrink-0 w-full max-w-[700px]">
          <ImagePreview images={data?.images} />

          <ProductDescription data={data} />
        </div>

        <div className="flex flex-col gap-5 flex-1 h-full sticky top-[134px]">
          <div className="flex flex-col flex-1 gap-[5px] p-5 bg-light rounded-[20px]">
            <h4 className="font-medium text-grey-400 leading-none">
              {data?.author}
            </h4>
            <h2 className="leading-[120%] my-[5px]">{data?.title}</h2>
            <Rating value={3} className="ml-[-3px]" />

            <div className="mt-7">
              <p className="text-green">В наличии</p>
              <h2 className="text-[30px]">{data?.price} грн</h2>

              <ProductButtons id={data.id} inCart={data.inCart} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[50px] w-full">
        <h2>Также рекомендуем</h2>
        <div className="flex w-full justify-between mt-[10px]">
          {products?.length > 0 &&
            products.map((el, i) => (
              <ProductItem item={el} key={i} className="flex-shrink-0" />
            ))}
        </div>
      </div>

      <div className="mt-[50px] w-full">
        <h2>Отзывы о книге</h2>
        <div className="flex flex-col w-full gap-5 mt-[10px]">
          {[...Array(5)].map((el, i) => (
            <ReviewItem key={i} />
          ))}
        </div>
      </div>
    </Container>
  );
}
