/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import { urlFor } from '@/sanity/lib/client';

import { BannerData } from '@/types';

type HeroBannerProps = {
  heroBanner: BannerData;
};

const HeroBanner = ({ heroBanner }: HeroBannerProps) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          src={urlFor(heroBanner.image).url()}
          alt="headphones"
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
