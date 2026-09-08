'use client';
import { Children, type ReactNode } from 'react';
import {
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
  return (
    <Carousel
      className="food-slider"
      opts={options}
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
    </Carousel>
  );
}
