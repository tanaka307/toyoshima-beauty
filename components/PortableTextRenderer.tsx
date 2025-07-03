// components/PortableTextRenderer.tsx
import { PortableText, PortableTextComponents } from '@portabletext/react'

const myComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={value.asset?.url}
        alt={value.alt || 'image'}
        className="my-4 rounded-lg"
      />
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold my-4">{children}</h2>,
    normal: ({ children }) => <p className="text-base my-2">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 my-2">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
}

export const PortableTextRenderer = ({ value }: { value: any }) => {
  return <PortableText value={value} components={myComponents} />
}
