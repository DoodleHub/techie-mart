/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from 'react-icons/ai';

import { client, urlFor } from '@/sanity/lib/client';

import { ProductData } from '@/types';
import { Product } from '@/components';

type ProductDetailsProps = {
  params: {
    slug: string;
  };
};

const ProductDetails = ({ params: { slug } }: ProductDetailsProps) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchProductAndBannerData = async () => {
      const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
      const productsQuery = '*[_type == "product"]';

      const product = await client.fetch(query);
      setProduct(product);

      const products = await client.fetch(productsQuery);
      setProducts(products);
    };

    fetchProductAndBannerData();
  }, [slug]);

  if (!product) return null;

  const { image, name, details, price } = product;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index]).url()}
              alt="product image"
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={`${name}_${i}`}
                src={urlFor(item).url()}
                alt={`${name} image ${i + 1}`}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={() => {}}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick={() => {}}>
                0
              </span>
              <span className="plus" onClick={() => {}}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => {}}>
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={() => {}}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
