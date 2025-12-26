import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CarouselSlide {
  id: number;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  gradient: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    titleEn: 'Welcome to CSIR-IITR Intranet',
    titleHi: 'सीएसआईआर-आईआईटीआर इंट्रानेट में आपका स्वागत है',
    subtitleEn: 'Your gateway to institutional resources and seamless communication',
    subtitleHi: 'संस्थागत संसाधनों और निर्बाध संचार का आपका प्रवेश द्वार',
    gradient: 'from-navy-dark via-navy to-navy-light',
  },
  {
    id: 2,
    titleEn: 'Research Excellence Since 1965',
    titleHi: '1965 से अनुसंधान उत्कृष्टता',
    subtitleEn: 'Pioneering toxicology research for a healthier tomorrow',
    subtitleHi: 'एक स्वस्थ कल के लिए अग्रणी विषविज्ञान अनुसंधान',
    gradient: 'from-navy via-primary to-navy-dark',
  },
  {
    id: 3,
    titleEn: 'Collaborative Science',
    titleHi: 'सहयोगात्मक विज्ञान',
    subtitleEn: 'Connecting researchers, sharing knowledge, advancing science',
    subtitleHi: 'शोधकर्ताओं को जोड़ना, ज्ञान साझा करना, विज्ञान को आगे बढ़ाना',
    gradient: 'from-navy-light via-navy to-navy-dark',
  },
];

const HeroCarousel: React.FC = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section
      className="relative min-h-[500px] lg:min-h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-all duration-700",
          slide.gradient
        )}
      />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-secondary/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-primary-foreground/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl py-20">
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm text-primary-foreground/90">CSIR-IITR Intranet Portal</span>
            </div>

            {/* Title */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              {language === 'en' ? slide.titleEn : slide.titleHi}
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              {language === 'en' ? slide.subtitleEn : slide.subtitleHi}
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-wrap gap-4 pt-4 animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Button variant="hero" size="lg">
                {language === 'en' ? 'Explore Notices' : 'सूचनाएं देखें'}
              </Button>
              <Button variant="heroOutline" size="lg">
                {language === 'en' ? 'View Directory' : 'निर्देशिका देखें'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentSlide
                    ? "w-8 bg-secondary"
                    : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <Button
              variant="heroOutline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="heroOutline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
