import { EmblaOptionsType } from 'embla-carousel'
import './embla.css'
import Carousel from './Carousel'

const OPTIONS: EmblaOptionsType = {
  dragFree: true,
  containScroll: 'keepSnaps',
  watchSlides: false,
  watchResize: false
}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const CarouselDemo = () => {
  return <>
    <header>
      <h1 className="carousel-header">Poslednje dodate fotografije</h1>
    </header>
    <Carousel slides={SLIDES} options={OPTIONS} />
  </>
}

export default CarouselDemo;
