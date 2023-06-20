import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Monocloz",
  description: "This is Home page",
};
export default function Home() {
  return (
    <div>
      <Image
        alt="any"
        width={1920}
        height={1536}
        layout="responsive"
        src={"/images/11.jpg"}
      ></Image>
      <h1>Image</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quia,
        doloribus eos soluta blanditiis similique aliquid vero expedita
        molestiae fugit. Provident laudantium hic sunt unde ad repellendus
        cumque veritatis laborum? Repudiandae eaque omnis distinctio, numquam
        asperiores facilis repellat molestiae sunt, voluptates consectetur
        voluptate temporibus, incidunt quibusdam cupiditate. Cum, hic odio!
      </p>
    </div>
  );
}
