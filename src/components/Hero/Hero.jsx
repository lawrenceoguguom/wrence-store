import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import './Hero.css'

const bagSlides = [
  {
    id: 'carry-something-exceptional',
    eyebrow: 'New Collection',
    title: 'Carry Something Exceptional',
    description: 'Discover thoughtfully selected bags designed for everyday style and effortless movement.',
    cta: 'Shop Collection',
    secondaryCta: 'Explore Bags',
    to: '/bags',
    image: {
      src: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1920&q=80',
      srcSet:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80 900w, ' +
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1400&q=80 1400w, ' +
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1920&q=80 1920w',
      sizes: '100vw',
    },
    alt: 'Premium leather tote bag in a minimal studio setting',
  },
  {
    id: 'made-for-every-journey',
    eyebrow: 'Everyday Essentials',
    title: 'Made for Every Journey',
    description: 'Practical silhouettes that transition seamlessly from work to travel and everything in between.',
    cta: 'Explore Bags',
    secondaryCta: 'View New Arrivals',
    to: '/new-arrivals',
    image: {
      src: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1920&q=80',
      srcSet:
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80 900w, ' +
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1400&q=80 1400w, ' +
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1920&q=80 1920w',
      sizes: '100vw',
    },
    alt: 'Structured travel-ready handbag and accessories styled for modern travel',
  },
  {
    id: 'simple-refined-yours',
    eyebrow: 'Signature Style',
    title: 'Simple. Refined. Yours.',
    description: 'Find a statement piece that feels polished, versatile, and personal to your routine.',
    cta: 'Shop Now',
    secondaryCta: 'See Bestsellers',
    to: '/bestsellers',
    image: {
      src: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1920&q=80',
      srcSet:
        'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80 900w, ' +
        'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1400&q=80 1400w, ' +
        'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1920&q=80 1920w',
      sizes: '100vw',
    },
    alt: 'Elegant leather handbag with premium fashion styling',
  },
]

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (mediaQuery.matches || isPaused) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % bagSlides.length)
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [activeIndex, isPaused])

  const goToSlide = (index) => {
    setActiveIndex(index)
    setIsPaused(false)
  }

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + bagSlides.length) % bagSlides.length)
    setIsPaused(false)
  }

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % bagSlides.length)
    setIsPaused(false)
  }

  const currentSlide = bagSlides[activeIndex]

  return (
    <section
      className='hero-carousel'
      aria-label='Featured bag collection'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {bagSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === activeIndex ? 'is-active' : ''}`}
          aria-hidden={index !== activeIndex}
        >
          <img
            src={slide.image.src}
            srcSet={slide.image.srcSet}
            sizes={slide.image.sizes}
            alt={slide.alt}
            className='hero-slide__image'
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding='async'
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
          <div className='hero-slide__overlay' />

          <div className='hero-slide__content'>
            <p className='hero-slide__eyebrow'>{slide.eyebrow}</p>
            <h1>{slide.title}</h1>
            <p className='hero-slide__description'>{slide.description}</p>

            <div className='hero-slide__actions'>
              <Link to={slide.to} className='hero-primary-button'>
                {slide.cta}
              </Link>
              <Link to='/bags' className='hero-secondary-button'>
                {slide.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className='hero-carousel__controls'>
        <button
          type='button'
          className='hero-nav hero-nav--prev'
          onClick={goToPrevious}
          aria-label='Previous slide'
        >
          <ChevronLeft size={20} />
        </button>

        <div className='hero-dots' aria-label='Slide navigation'>
          {bagSlides.map((slide, index) => (
            <button
              key={slide.id}
              type='button'
              className={`hero-dot ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>

        <button
          type='button'
          className='hero-nav hero-nav--next'
          onClick={goToNext}
          aria-label='Next slide'
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}

export default Hero