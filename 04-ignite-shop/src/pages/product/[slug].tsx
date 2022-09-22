import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Product: NextPage = () => {

  const { query } = useRouter()

  return (
    <h1>Product! {JSON.stringify(query)}</h1>
  )
}

export default Product
