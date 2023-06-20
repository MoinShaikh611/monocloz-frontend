import Image from "next/image";
import styles from "@/styles/product-list.module.css";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts } from "lib/products";

export const metadata: Metadata = {
  title: "Product",
  description: "This is product page",
};
interface Product {
  _id: string;
  name: string;
  price: number;
}
const ProductList = async () => {
  const products = await getAllProducts();
  return (
    <>
      <div className={styles.productList}>
        {products.map((product: Product) => (
          <Link
            className={styles.productItemLink}
            key={product._id}
            href={`/products/${product._id}`}
          >
            <div className={styles.productItem}>
              <Image
                src={`/images/11.jpg`}
                alt="Product 1"
                width={450}
                height={300}
                layout="responsive"
                loading="eager"
              />
              <div className="d-flex align-items-center justify-content-space-between">
                <h3>{product.name}</h3>
                <h5>${product.price}</h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductList;
