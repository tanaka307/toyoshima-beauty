import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const config = {
  projectId: 'vc0at8rs', // ← SanityのプロジェクトID
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false, // 最新のデータを取得
}

export const sanityClient = createClient(config)

const builder = imageUrlBuilder(sanityClient)
export function urlFor(source) {
  return builder.image(source)
}
