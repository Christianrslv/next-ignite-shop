import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { theme } from "@/styles";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <ProductContainer>
        <Skeleton baseColor={theme.colors.gray900.toString()} highlightColor={theme.colors.gray800.toString()} height={500} width={480} />
        <ProductDetails>
          <h1>
            <Skeleton baseColor={theme.colors.gray900.toString()} highlightColor={theme.colors.gray800.toString()} />
          </h1>
          <span>
            <Skeleton baseColor={theme.colors.gray900.toString()} highlightColor={theme.colors.gray800.toString()} width={100} />
          </span>
          <p>
            <Skeleton baseColor={theme.colors.gray900.toString()} highlightColor={theme.colors.gray800.toString()} count={3} />
          </p>
          <Skeleton baseColor={theme.colors.gray900.toString()} highlightColor={theme.colors.gray800.toString()} width={100} height={40} />
        </ProductDetails>
      </ProductContainer>
    )
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={300} height={420} alt='' />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>Buy now</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{
      params: { id: 'prod_NP9uf2LDCRGToE' }
    }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })
  const price = product.default_price as Stripe.Price
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('en-Us', {
          style: 'currency',
          currency: 'USD',
        }).format(price.unit_amount! / 100),
        description: product.description
      }
    },
    revalidate: 60 * 60 * 1,
  }
}