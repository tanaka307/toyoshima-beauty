import { sanityClient, urlFor } from '../lib/sanity'
export const revalidate = 60

const query = `*[_type == "post"]{_id, title, body, mainImage}`

type Post = {
  _id: string
  title: string
  body?: any
  mainImage?: any
}

export default async function Home() {
  const posts: Post[] = await sanityClient.fetch(query)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        豊島区おすすめ美容室ブログ
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition"
          >
            {post.mainImage && (
              <img
                className="w-full h-48 object-cover rounded-t-lg shadow-md"
                src={urlFor(post.mainImage).width(800).url()}
                alt={post.title}
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {post.title}
              </h2>
              {post.body?.length > 0 && (
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {post.body.map((block: any, i: number) => (
                    <p key={i}>{block?.children?.[0]?.text || ''}</p>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
