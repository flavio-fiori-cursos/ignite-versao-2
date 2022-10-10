import axios from 'axios'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/future/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string
  }
}

const Product: NextPage<ProductProps> = ({ product }) => {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { isFallback } = useRouter()

  if(isFallback) {
    return <p>Loading...</p>
  }

  async function handleBuyProduct() {
    setIsCreatingCheckoutSession(true)

    try {
      const response  = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      }) 

      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl

    } catch (error) {
      console.error(error)
      setIsCreatingCheckoutSession(false)
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt={product.name} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>
            {product.description}
          </p>
          <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>Comprar agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export default Product

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MVRWhBgcYoCrGY'} }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {

  const productId = params?.id || '';
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format((price.unit_amount || 0)  / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, // 1 Hour
  }
}