'use client';

import { useEffect, useState } from 'react';

import { FooterBanner, HeroBanner } from '@/components';
import { client } from '@/sanity/lib/client';

import { BannerData, Product } from '@/types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
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
      {bannerData.length && <HeroBanner heroBanner={bannerData[0]} />}
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => product.name)}
      </div>
      <FooterBanner />
    </>
  );
}
