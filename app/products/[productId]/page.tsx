import AccordionSection from "@/components/AccordionSection/AccordionSection";
import { AddToCartButton } from "@/components/AddToCartButton/AddToCartButton";
import { getProductDetail } from "lib/products";
import type { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const product = await getProductDetail(params.productId);
  return {
    title: product.name,
    description: product.shortProductDesc,
  };
}

export default async function Page({ params }: any) {
  const product = await getProductDetail(params.productId);
  const { accordion } = product;
  return (
    <>
      <div className="product-detail-container">
        <div className="product-detail-row">
          <div className="product-detail-col">
            <div className="image-wrapper-stick">
              <div className="product-detail-image-container">
                <Image
                  src={`/images/11.jpg`}
                  alt="Product 1"
                  layout="responsive"
                  loading="lazy"
                  width={500}
                  height={600}
                  className="product-detail-image"
                />
              </div>
            </div>
          </div>
          <div className="product-detail-col">
            <p>{product.name}</p>
            <p>{product.shortProductDesc}</p>
            <p>${product.price}</p>
            <p>
              incl. of taxes <br />
              (Also includes all applicable duties)
            </p>
            <div>
              {accordion.sizeFit && (
                <AccordionSection
                  title="Size & fit"
                  accordionData={accordion.sizeFit}
                />
              )}
              {accordion.deliveryReturn && (
                <AccordionSection
                  title="Delivery & return"
                  accordionData={accordion.deliveryReturn}
                />
              )}
              {accordion.productInformation && (
                <AccordionSection
                  title="Product Information"
                  accordionData={accordion.productInformation}
                />
              )}
            </div>
            <div>
              <AddToCartButton product={product}></AddToCartButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
