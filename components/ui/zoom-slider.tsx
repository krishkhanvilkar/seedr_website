'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export interface ZoomSliderItem {
  number: string;
  src: string;
  title: string;
  desc: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=2000&auto=format&fit=crop`;

export const DEFAULT_SLIDER_DATA: ZoomSliderItem[] = [
  { number: '01', src: unsplash('1618005182384-a83a8bd57fbe'), title: 'VERIFIED', desc: 'Proof of work is the only currency.' },
  { number: '02', src: unsplash('1550684848-fac1c5b4e853'), title: 'NETWORK', desc: 'High-signal operators only.' },
  { number: '03', src: unsplash('1635776062127-d379bfcba9f8'), title: 'CAPITAL', desc: 'Liquidity meets execution.' },
  { number: '04', src: unsplash('1506377247377-2a5b3b417ebb'), title: 'DEPLOY', desc: 'Production is absolute.' },
  { number: '05', src: unsplash('1614850523459-c2f4c699c52e'), title: 'VAULT', desc: 'Encrypted, private, institutional.' },
  { number: '06', src: unsplash('1558494949-ef010cbdcc31'), title: 'SYNTHESIS', desc: 'Multi-agent architecture.' },
];

const SCROLL_PER_PX = 1.0;
const LERP_FACTOR = 0.08;

const DRAG_LERP_FACTOR = 0.22;
const MOMENTUM_FRICTION = 0.92;
const MIN_MOMENTUM = 0.1;
const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1025;
const SLIDER_BOTTOM_OFFSET = 0;

const REDUCED_MOTION_LERP_FACTOR = 1;
const REDUCED_MOTION_FADE_DURATION = 0.18;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;

const lerp = (a: number, b: number, n: number): number => a + (b - a) * n;

interface ZoomSliderCompProps {
  sliderData: ZoomSliderItem[];
  id?: string;
  title?: string;
  subheading?: string;
  scaleOnHover?: boolean;
  textOnHover?: boolean;
  size?: number;
  easeScrollPercentage?: number;
}

export function ZoomSliderComp({
  sliderData,
  id,
  title,
  subheading,
  scaleOnHover = true,
  textOnHover = true,
  size = 1,
  easeScrollPercentage = 100,
}: ZoomSliderCompProps) {
  const images = sliderData;

  const rootRef = useRef<HTMLElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [viewportWidth, setViewportWidth] = useState(1440);
  const [viewportHeight, setViewportHeight] = useState(900);
  const [reduceMotion, setReduceMotion] = useState(false);

  const isMobile = viewportWidth < MOBILE_BREAKPOINT;
  const isTablet =
    viewportWidth >= MOBILE_BREAKPOINT && viewportWidth < TABLET_BREAKPOINT;

  const resolvedSize = Math.max(0.5, Number(size) || 1);
  const resolvedEaseScrollPercentage = Math.max(20, Number(easeScrollPercentage) || 100);
  const cardWidthMin = (isMobile ? 75 : 190) * resolvedSize;
  const cardWidthMax = (isMobile ? 260 : isTablet ? 500 : 680) * resolvedSize;
  const cardHeightMax = isMobile
    ? Math.round(viewportHeight * 0.6 * resolvedSize)
    : Math.round(viewportHeight * 0.82 * resolvedSize);
  const cardHeightMin = (isMobile ? 80 : 50) * resolvedSize;
  const cardStep = cardWidthMax;

  const stateRef = useRef({
    current: 0,
    target: 0,
    raf: null as number | null,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    velocity: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const announcedIndexRef = useRef(0);

  useEffect(() => {
    const onResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');

    const syncReducedMotion = (event: MediaQueryList | MediaQueryListEvent) => {
      setReduceMotion('matches' in event ? event.matches : prefersReducedMotion());
    };

    if (!mediaQuery) return;

    syncReducedMotion(mediaQuery);
    mediaQuery.addEventListener('change', syncReducedMotion);
    return () => mediaQuery.removeEventListener('change', syncReducedMotion);
  }, []);

  const positionCards = useCallback(
    (offset: number) => {
      if (!stripRef.current || !rootRef.current) return;

      const cards = Array.from(stripRef.current.children) as HTMLElement[];
      const count = images.length;

      if (!count) return;

      const loopWidth = count * cardStep;
      const viewportWidthValue = window.innerWidth;
      // Anchored to the section height rather than the window, because the
      // slider now lives inside a scrolling page instead of owning the viewport.
      const viewportHeightValue = rootRef.current.clientHeight;
      const bottom = viewportHeightValue - SLIDER_BOTTOM_OFFSET;
      const easingDistance = 2 * viewportWidthValue * (resolvedEaseScrollPercentage / 100);

      const mapVtoX = (value: number) => {
        if (value <= 0) return 0;
        if (value >= easingDistance) return value - easingDistance / 2;
        return (value * value) / (2 * easingDistance);
      };

      const normalizedOffset = ((offset % loopWidth) + loopWidth) % loopWidth;
      const startIndex = Math.floor(normalizedOffset / cardStep);
      const fractionalOffset = (normalizedOffset % cardStep) / cardStep;

      for (let index = 0; index < count; index += 1) {
        const cardIndex = (startIndex + index) % count;
        const visualOffset = (index - fractionalOffset) * cardStep;
        const currentX = mapVtoX(visualOffset);
        const nextX = mapVtoX(visualOffset + cardStep);
        const visualWidth = nextX - currentX;
        const scale = visualWidth / cardWidthMax;
        const cardHeight = cardHeightMin + scale * (cardHeightMax - cardHeightMin);
        const y = bottom - cardHeight;

        if (!cards[cardIndex]) continue;

        cards[cardIndex].style.transform = `translate(${currentX}px, ${y}px)`;

        const imageWrap = imageWrapRefs.current[cardIndex];

        if (!imageWrap) continue;

        imageWrap.style.width = `${visualWidth}px`;
        imageWrap.style.height = `${cardHeight}px`;
      }
    },
    [cardHeightMax, cardHeightMin, cardStep, cardWidthMax, images.length, resolvedEaseScrollPercentage]
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!images.length || !root) return;

    const state = stateRef.current;
    const loopWidth = images.length * cardStep;

    const tick = () => {
      if (!reduceMotion && !state.isDragging && Math.abs(state.velocity) > MIN_MOMENTUM) {
        state.target += state.velocity;
        state.velocity *= MOMENTUM_FRICTION;
      } else if (!state.isDragging) {
        state.velocity = 0;
      }

      const lerpFactor = reduceMotion
        ? REDUCED_MOTION_LERP_FACTOR
        : state.isDragging
          ? DRAG_LERP_FACTOR
          : LERP_FACTOR;
      state.current = lerp(state.current, state.target, lerpFactor);

      if (Math.abs(state.current - state.target) < 0.01) {
        const shift = Math.round(state.current / loopWidth) * loopWidth;
        state.current -= shift;
        state.target -= shift;
      }

      positionCards(state.current);

      const normalizedOffset = ((state.current % loopWidth) + loopWidth) % loopWidth;
      const nextIndex = Math.floor(normalizedOffset / cardStep) % images.length;

      if (nextIndex !== announcedIndexRef.current) {
        announcedIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }

      state.raf = requestAnimationFrame(tick);
    };

    // Wheel is passive: the page keeps scrolling naturally while the strip
    // glides, so the slider never traps the visitor mid-page.
    const onWheel = (event: WheelEvent) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      state.target -= delta * SCROLL_PER_PX;
    };

    const beginDrag = (clientX: number, clientY: number) => {
      state.isDragging = true;
      state.lastX = clientX;
      state.lastY = clientY;
      state.velocity = 0;
    };

    const moveDrag = (clientX: number, clientY: number, direction: number = 1) => {
      if (!state.isDragging) return;

      const deltaX = clientX - state.lastX;
      const deltaY = clientY - state.lastY;
      const rawDelta = Math.abs(deltaX) >= Math.abs(deltaY) ? -deltaX : -deltaY;
      const delta = rawDelta * direction;

      state.target += delta;
      state.velocity = lerp(state.velocity, delta, 0.5);
      state.lastX = clientX;
      state.lastY = clientY;
    };

    const endDrag = () => {
      state.isDragging = false;
    };

    const onMouseDown = (event: MouseEvent) => beginDrag(event.clientX, event.clientY);
    const onMouseMove = (event: MouseEvent) => moveDrag(event.clientX, event.clientY);
    const onTouchStart = (event: TouchEvent) =>
      beginDrag(event.touches[0].clientX, event.touches[0].clientY);
    const onTouchMove = (event: TouchEvent) =>
      moveDrag(event.touches[0].clientX, event.touches[0].clientY, -1);

    root.addEventListener('wheel', onWheel, { passive: true });
    root.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', endDrag);
    root.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', endDrag);
    window.addEventListener('touchcancel', endDrag);

    state.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.raf as number);
      root.removeEventListener('wheel', onWheel);
      root.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', endDrag);
      root.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', endDrag);
      window.removeEventListener('touchcancel', endDrag);
    };
  }, [cardStep, images, positionCards, reduceMotion]);

  useEffect(() => {
    if (!images.length) return;

    const cleanups: (() => void)[] = [];

    cardRefs.current.forEach((card, index) => {
      const textElement = textRefs.current[index];
      const imageWrap = imageWrapRefs.current[index];

      if (!card || !textElement || !imageWrap) return;

      const numberElement = textElement.querySelector('[data-number]');
      const titleElement = textElement.querySelector('[data-title]');
      const descElement = textElement.querySelector('[data-desc]');

      if (!numberElement || !titleElement || !descElement) return;

      const split = SplitText.create([numberElement, titleElement, descElement], {
        type: 'lines',
        mask: 'lines',
      });

      gsap.set(split.lines, { yPercent: 100 });
      gsap.set(textElement, { autoAlpha: 0 });

      const imageElement = imageWrap.querySelector('img');

      if (imageElement) {
        gsap.set(imageElement, { opacity: 1 });
      }

      const onEnter = () => {
        if (textOnHover) {
          if (reduceMotion) {
            gsap.killTweensOf([textElement, split.lines]);
            gsap.set(split.lines, { yPercent: 0 });
            gsap.to(textElement, {
              autoAlpha: 1,
              duration: REDUCED_MOTION_FADE_DURATION,
              ease: 'power2.out',
            });
          } else {
            gsap
              .timeline()
              .set(textElement, { autoAlpha: 1 })
              .to(split.lines, {
                yPercent: 0,
                duration: 0.55,
                stagger: 0.05,
                ease: 'power3.out',
              });
          }
        }

        if (!imageElement || !scaleOnHover || reduceMotion) return;

        gsap.to(imageElement, { scale: 1.05, duration: 0.6, ease: 'power2.out' });
      };

      const onLeave = () => {
        if (textOnHover) {
          if (reduceMotion) {
            gsap.killTweensOf([textElement, split.lines]);
            gsap.to(textElement, {
              autoAlpha: 0,
              duration: REDUCED_MOTION_FADE_DURATION,
              ease: 'power2.out',
              onComplete: () => {
                gsap.set(split.lines, { yPercent: 100 });
              },
            });
          } else {
            gsap.to(split.lines, {
              yPercent: 100,
              duration: 0.28,
              stagger: 0.03,
              ease: 'power2.in',
              onComplete: () => {
                gsap.set(textElement, { autoAlpha: 0 });
              },
            });
          }
        } else {
          gsap.killTweensOf([textElement, split.lines]);
          gsap.set(textElement, { autoAlpha: 0 });
          gsap.set(split.lines, { yPercent: 100 });
        }

        if (!imageElement || !scaleOnHover) return;

        gsap.to(imageElement, { scale: 1, duration: 0.6, ease: 'power2.out' });
      };

      imageWrap.addEventListener('mouseenter', onEnter);
      imageWrap.addEventListener('mouseleave', onLeave);

      cleanups.push(() => {
        imageWrap.removeEventListener('mouseenter', onEnter);
        imageWrap.removeEventListener('mouseleave', onLeave);
        split.revert();
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [images, reduceMotion, scaleOnHover, textOnHover]);

  const activeItem = images[activeIndex];
  const slideAnnouncement = images.length
    ? activeItem?.title
      ? `${activeItem.title}, slide ${activeIndex + 1} of ${images.length}`
      : `Slide ${activeIndex + 1} of ${images.length}`
    : '';

  return (
    <section
      ref={rootRef}
      id={id}
      aria-roledescription="carousel"
      aria-label={title ?? 'Image slider'}
      className="relative w-full cursor-grab overflow-hidden bg-[#050505] active:cursor-grabbing"
      style={{ height: '100svh', touchAction: 'pan-y' }}
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {slideAnnouncement}
      </div>
      {title ? (
        <div className="pointer-events-none absolute left-1/2 top-24 z-20 -translate-x-1/2 px-4 text-center">
          <h2 className="text-4xl font-semibold tracking-tighter text-white max-md:text-2xl">{title}</h2>
          {subheading ? (
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 max-md:text-[10px]">
              {subheading}
            </p>
          ) : null}
        </div>
      ) : null}

      <div ref={stripRef} className="absolute inset-0">
        {images.map((item, index) => (
          <div
            key={item.number}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className="absolute left-0 top-0"
            style={{ willChange: 'transform' }}
          >
            <div
              ref={(element) => {
                textRefs.current[index] = element;
              }}
              className="absolute z-10 flex w-full flex-col gap-1.25"
              style={{
                bottom: 'calc(100% + 10px)',
                left: 0,
                padding: '0 0 4px',
                visibility: 'hidden',
              }}
            >
              <p
                data-number
                className="overflow-hidden select-none text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-white/50"
              >
                {item.number}
              </p>
              <p
                data-title
                className="overflow-hidden select-none text-[13px] font-extrabold uppercase leading-[1.15] tracking-[0.08em] text-white"
              >
                {item.title}
              </p>
              <p
                data-desc
                className="overflow-hidden select-none text-[10px] font-normal leading-normal tracking-[0.04em] text-white/60"
              >
                {item.desc}
              </p>
            </div>

            <div
              ref={(element) => {
                imageWrapRefs.current[index] = element;
              }}
              className="relative overflow-hidden"
              style={{
                width: cardWidthMin,
                height: cardHeightMax,
                willChange: 'width, height',
              }}
            >
              <img
                src={item.src || '/placeholder.svg'}
                alt={`${item.title} — ${item.desc}`}
                draggable={false}
                crossOrigin="anonymous"
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-0 grayscale contrast-125 brightness-90"
                style={{
                  transform: 'none',
                  objectPosition: 'center bottom',
                  transition: 'none',
                  willChange: 'auto',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const ZoomSlider = ({
  id,
  title = 'The Architecture',
  subheading = 'Swipe to explore the protocol',
  sliderData = DEFAULT_SLIDER_DATA,
  scaleOnHover = true,
  textOnHover = true,
  size = 1,
  easeScrollPercentage = 100,
}: Partial<ZoomSliderCompProps> = {}) => (
  <ZoomSliderComp
    id={id}
    title={title}
    subheading={subheading}
    sliderData={sliderData}
    scaleOnHover={scaleOnHover}
    textOnHover={textOnHover}
    size={size}
    easeScrollPercentage={easeScrollPercentage}
  />
);

export default ZoomSlider;
