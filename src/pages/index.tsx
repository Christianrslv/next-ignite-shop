/* eslint-disable jsx-a11y/alt-text */
import { HomeContainer, Product } from "../styles/pages/home"
import Head from 'next/head'
import { useKeenSlider } from 'keen-slider/react'
import Image from "next/image"

import 'keen-slider/keen-slider.min.css'
import { GetStaticProps } from "next"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <>
      <Head>
        <title>Home | MyShop</title>
      </Head>
      <HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map(product => {
          return (
            <Product href={`/product/${product.id}`} key={product.id} className="keen-slider__slide" >
              <Image src={product.imageUrl} width={300} height={420} alt="" />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD',
      }).format(price.unit_amount! / 100)
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}