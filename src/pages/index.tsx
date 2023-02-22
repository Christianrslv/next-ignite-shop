/* eslint-disable jsx-a11y/alt-text */
import { HomeContainer, Product } from "../styles/pages/home"
import { useKeenSlider } from 'keen-slider/react'
import Image from "next/image"

import img1 from "../assets/1.jpg"
import img2 from "../assets/2.jpg"
import img3 from "../assets/3.jpg"

import 'keen-slider/keen-slider.min.css'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      <Product className="keen-slider__slide">
        <Image src={img3} /*width={520}*/ height={420} alt="" />
        <footer>
          <strong>Shirt X</strong>
          <span>U$ 79.90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={img2} /*width={520}*/ height={420} alt="" />
        <footer>
          <strong>Shirt Y</strong>
          <span>U$ 29.90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={img1} /*width={520}*/ height={420} alt="" />
        <footer>
          <strong>Shirt Z</strong>
          <span>U$ 19.90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={img3} /*width={520}*/ height={420} alt="" />
        <footer>
          <strong>Shirt Z</strong>
          <span>U$ 19.90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
