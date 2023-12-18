import { AddToCartButton } from '@/components/add-to-cart-button'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'
import Image from 'next/image'

interface ProdcutPageProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 10, // 1 hour
    },
  })

  const product = await response.json()

  return product
}

export async function generateMetadata({
  params,
}: ProdcutPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: product.title,
  }
}

export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: Product[] = await response.json()

  return products.map((product) => {
    return {
      slug: product.slug,
    }
  })
}

export default async function ProductPage({ params }: ProdcutPageProps) {
  const product = await getProduct(params.slug)

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <figure className="col-span-2 overflow-hidden">
        <Image src={product.image} alt="" width={1000} height={1000} />
      </figure>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price?.toLocaleString('pt-BR', {
              currency: 'BRL',
              style: 'currency',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-zinc-400 text-sm">
            Em 12x s/ juros de{' '}
            {(product.price / 12)?.toLocaleString('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span>Tamanhos</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              GG
            </button>
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}
