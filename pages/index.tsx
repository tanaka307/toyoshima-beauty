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
  console.log('Sanityから取得したデータ:', posts)

  return (
    <main style={{ padding: '2rem' }}>
      <h1>豊島区おすすめ美容室ブログ</h1>
      {posts.map((post) => (
        <article key={post._id} style={{ marginBottom: '3rem' }}>
          <h2>{post.title}</h2>

          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).width(800).url()}
              alt={post.title}
              style={{ width: '100%', maxWidth: '800px', borderRadius: '8px' }}
            />
          )}

          {post.body?.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              {post.body.map((block: any, i: number) => (
                <p key={i}>{block?.children?.[0]?.text || ''}</p>
              ))}
            </div>
          )}
        </article>
      ))}
    </main>
  )
}
