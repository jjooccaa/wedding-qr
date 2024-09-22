import React, { useCallback, useEffect, useRef, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType, EngineType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './CarouselArrowButtons'
import { LazyLoadImage } from './LazyLoaderImage'
import { SupabaseService } from '../services/supabase.service'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const Carousel: React.FC<PropType> = (props) => {
  const { options } = props
  const scrollListenerRef = useRef<() => void>(() => undefined)
  const listenForScrollRef = useRef(true)
  const hasMoreToLoadRef = useRef(true)
  const [slides, setSlides] = useState<string[]>([])
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    watchSlides: (emblaApi) => {
      const reloadEmbla = (): void => {
        const oldEngine = emblaApi.internalEngine()

        emblaApi.reInit()
        const newEngine = emblaApi.internalEngine()
        const copyEngineModules: (keyof EngineType)[] = [
          'scrollBody',
          'location',
          'offsetLocation',
          'previousLocation',
          'target'
        ]
        copyEngineModules.forEach((engineModule) => {
          Object.assign(newEngine[engineModule], oldEngine[engineModule])
        })

        newEngine.translate.to(oldEngine.location.get())
        const { index } = newEngine.scrollTarget.byDistance(0, false)
        newEngine.index.set(index)
        newEngine.animation.start()

        setLoadingMore(false)
        listenForScrollRef.current = true
      }

      const reloadAfterPointerUp = (): void => {
        emblaApi.off('pointerUp', reloadAfterPointerUp)
        reloadEmbla()
      }

      const engine = emblaApi.internalEngine()

      if (hasMoreToLoadRef.current && engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get())
        engine.scrollBounds.toggleActive(boundsActive)
        emblaApi.on('pointerUp', reloadAfterPointerUp)
      } else {
        reloadEmbla()
      }
    }
  })

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const fetchMoreImages = useCallback(async () => {
    const bucketName: string = 'Wedding Photos'
    try {
      const imagePaths = await SupabaseService.fetchImagePaths(bucketName)
      const newImageUrls = await SupabaseService.generatePublicUrls(bucketName, imagePaths)
      
      setSlides((currentSlides) => {
        const updatedSlides = [...currentSlides, ...newImageUrls]
        if (updatedSlides.length >= 20) {
          setHasMoreToLoad(false)
          if (emblaApi) {
            emblaApi.off('scroll', scrollListenerRef.current)
          }
        }
        return updatedSlides
      })
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoadingMore(false)
      listenForScrollRef.current = true
    }
  }, [emblaApi])

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    if (!listenForScrollRef.current) return

    setLoadingMore((loadingMore) => {
      const lastSlide = emblaApi.slideNodes().length - 1
      const lastSlideInView = emblaApi.slidesInView().includes(lastSlide)
      const loadMore = !loadingMore && lastSlideInView

      if (loadMore) {
        listenForScrollRef.current = false
        fetchMoreImages()
      }

      return loadingMore || lastSlideInView
    })
  }, [fetchMoreImages])

  const addScrollListener = useCallback(
    (emblaApi: EmblaCarouselType) => {
      scrollListenerRef.current = () => onScroll(emblaApi)
      emblaApi.on('scroll', scrollListenerRef.current)
    },
    [onScroll]
  )

  useEffect(() => {
    if (!emblaApi) return
    addScrollListener(emblaApi)

    const onResize = () => emblaApi.reInit()
    window.addEventListener('resize', onResize)
    emblaApi.on('destroy', () => window.removeEventListener('resize', onResize))

    fetchMoreImages()
  }, [emblaApi, addScrollListener])

  useEffect(() => {
    hasMoreToLoadRef.current = hasMoreToLoad
  }, [hasMoreToLoad])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <LazyLoadImage
              key={index}
              index={index}
              imgSrc={slide}
              inView={slides.indexOf(slide) > -1}
            />
          ))}
          {hasMoreToLoad && (
            <div
              className={'embla-infinite-scroll'.concat(
                loadingMore ? ' embla-infinite-scroll--loading-more' : ''
              )}
            >
              <span className="embla-infinite-scroll__spinner" />
            </div>
          )}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  )
}

export default Carousel
