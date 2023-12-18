import { delay } from '@/helpers/delay'
import data from './../data.json'
import { z } from 'zod'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  await delay(2000)

  const slug = z.string().parse(params.slug)

  const product = data.products.find((product) => product.slug === slug)

  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 400 })
  }

  return Response.json(product)
}
