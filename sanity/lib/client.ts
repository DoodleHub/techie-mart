import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

import { apiVersion, dataset, projectId, useCdn } from '../env';

import { Image } from '@/types';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: Image) => builder.image(source);
