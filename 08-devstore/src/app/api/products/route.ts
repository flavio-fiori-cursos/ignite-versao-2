import { delay } from '@/helpers/delay'
import data from './data.json'

export async function GET() {
  await delay(2000)

  return Response.json(data.products)
}
