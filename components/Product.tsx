/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import { urlFor } from '@/sanity/lib/client';

import { ProductData } from '@/types';

type ProductProps = {
  product: ProductData;
};

const Product = ({ product: { image, name, slug, price } }: ProductProps) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0]).url()}
            alt="product image"
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
