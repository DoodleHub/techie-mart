'use client';

import { useEffect, useState } from 'react';

import { FooterBanner, HeroBanner, Product } from '@/components';
import { client } from '@/sanity/lib/client';

import { BannerData, ProductData } from '@/types';

export default function Home() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [bannerData, setBannerData] = useState<BannerData[]>([]);

  useEffect(() => {
    const fetchProductAndBannerData = async () => {
      const query = '*[_type == "product"]';
      const products = await client.fetch(query);
      setProducts(products);

      const bannerQuery = '*[_type == "banner"]';
      const bannerData = await client.fetch(bannerQuery);
      setBannerData(bannerData);
    };

    fetchProductAndBannerData();
  }, []);

  return (
    <>
      {bannerData.length > 0 && <HeroBanner heroBanner={bannerData[0]} />}
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      {bannerData.length > 0 && <FooterBanner footerBanner={bannerData[0]} />}
    </>
  );
}
