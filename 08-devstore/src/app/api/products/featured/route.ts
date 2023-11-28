import { delay } from '@/helpers/delay'
import data from './../data.json'

export async function GET() {
  await delay(2000)

  const featuredProducts = data.products.filter((product) => product.featured)

  return Response.json(featuredProducts)
}
