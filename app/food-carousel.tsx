'use client';
import { Children, useEffect, useState, type ReactNode } from 'react';
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const options = {
  align: 'start' as const,
  containScroll: 'trimSnaps' as const,
  breakpoints: {
    '(min-width: 1101px)': { active: false },
    '(prefers-reduced-motion: reduce)': { duration: 0 },
  },
};

export function FoodCarousel({ children }: { children: ReactNode }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const count = Children.count(children);
  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    api.on('select', update);
    api.on('reInit', update);
    return () => {
      api.off('select', update);
      api.off('reInit', update);
    };
  }, [api]);
  return (
    <Carousel
      className="food-slider"
      opts={options}
      setApi={setApi}
      aria-label="Food Tour gallery"
    >
      <CarouselContent className="food-grid">
        {Children.map(children, (child, index) => (
          <CarouselItem className="food-slide" aria-label={`${index + 1} of 4`}>
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="food-slider-controls">
        <CarouselPrevious />
        <CarouselNext />
      </div>
      <div className="pagination food-pagination" aria-label="Choose Food Tour">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            className={selected === index ? 'selected' : ''}
            aria-label={`Show Food Tour ${index + 1}`}
            aria-current={selected === index}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </Carousel>
  );
}
