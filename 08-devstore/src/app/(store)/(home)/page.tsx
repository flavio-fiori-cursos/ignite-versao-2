import Image from 'next/image'
import Link from 'next/link'

import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 10, // 1 hour
    },
  })
  const products = await response.json()

  return products
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const products = await getFeaturedProducts()

  const [highLightedProduct, ...otherProducts] = products

  return (
    <main className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highLightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          className="group-hover:scale-105 transition-transform duration-500"
          src={highLightedProduct.image}
          alt=""
          width={860}
          height={860}
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/50 p-1 pl-5">
          <span className="text-sm truncate">{highLightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highLightedProduct.price.toLocaleString('pt-BR', {
              currency: 'BRL',
              style: 'currency',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
          >
            <Image
              className="group-hover:scale-105 transition-transform duration-500"
              src={product.image}
              alt=""
              width={860}
              height={860}
            />

            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/50 p-1 pl-5">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        )
      })}
    </main>
  )
}
