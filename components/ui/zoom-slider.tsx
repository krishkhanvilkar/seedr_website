'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ShowcaseScreen {
  src: string;
  alt: string;
}

export const VAULT_IMAGES: ShowcaseScreen[] = [
  { src: '/app/trajectory.png', alt: 'Seedr onboarding: Define your trajectory, join as Builder or Investor' },
  { src: '/app/next-chapter.png', alt: 'Seedr onboarding: Start building or join a founding team' },
  { src: '/app/discover.jpg', alt: 'Seedr discover feed with founders, projects and startups' },
  { src: '/app/perceived-startup.jpg', alt: 'Startup card preview: This is how you will be perceived' },
  { src: '/app/profile.jpg', alt: 'Verified founder profile with venture, experience and interests' },
  { src: '/app/spark-tab.png', alt: 'Spark Tab with restricted inbound requests from investors' },
  { src: '/app/project-hermes.png', alt: 'Project Hermes venture page with problem and solution' },
  { src: '/app/open-roles.png', alt: 'Company open roles and founding team overview' },
  { src: '/app/perceived-project.jpg', alt: 'Project card preview in concept phase' },
  { src: '/app/messages.jpg', alt: 'Messages inbox with an established connection' },
  { src: '/app/ignite.jpg', alt: 'New conversation: You just ignited with Rajesh Arora' },
  { src: '/app/secure-channel.png', alt: 'Encrypted secure channel conversation' },
];

const CENTER_SCALE = 1.05;
const EDGE_SCALE = 0.82;
const EDGE_OPACITY = 0.35;

interface ZoomSliderProps {
  id?: string;
  title?: string;
  subheading?: string;
  images?: ShowcaseScreen[];
}

export default function ZoomSlider({
  id,
  title = 'The Architecture',
  subheading = 'Scroll to inspect the app preview',
  images = VAULT_IMAGES,
}: ZoomSliderProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-card]'));

    const updateFocus = () => {
      const center = window.innerWidth / 2;
      const falloff = window.innerWidth * 0.55;
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const distance = Math.min(1, Math.abs(rect.left + rect.width / 2 - center) / falloff);
        const eased = distance * distance * (3 - 2 * distance);
        gsap.set(card, {
          scale: CENTER_SCALE - (CENTER_SCALE - EDGE_SCALE) * eased,
          opacity: 1 - (1 - EDGE_OPACITY) * eased,
        });
      }
    };

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: updateFocus,
          onRefresh: updateFocus,
        },
      });
    }, section);

    updateFocus();

    const images = Array.from(track.querySelectorAll('img'));
    const refresh = () => ScrollTrigger.refresh();
    images.forEach((img) => {
      if (!img.complete) img.addEventListener('load', refresh, { once: true });
    });

    return () => {
      images.forEach((img) => img.removeEventListener('load', refresh));
      ctx.revert();
    };
  }, [images]);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label={title}
      className="relative flex h-svh w-full flex-col overflow-hidden bg-[#050505]"
    >
      <div className="pointer-events-none relative z-10 px-6 pt-24 text-center md:pt-28">
        <h2 className="text-4xl font-semibold tracking-tighter text-white max-md:text-2xl">{title}</h2>
        {subheading ? (
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 max-md:text-[10px]">
            {subheading}
          </p>
        ) : null}
      </div>

      <div className="relative flex flex-1 items-center">
        <div
          ref={trackRef}
          className="flex items-center gap-8 will-change-transform [--card-h:56svh] md:gap-14 md:[--card-h:min(64svh,620px)]"
          style={{ paddingInline: 'calc(50vw - var(--card-h) * 9 / 38)' }}
        >
          {images.map((image) => (
            <div
              key={image.src}
              data-card
              className="relative aspect-[9/19] h-[var(--card-h)] shrink-0 will-change-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src || '/placeholder.svg'}
                alt={image.alt}
                draggable={false}
                loading="eager"
                className="rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.03)] object-cover w-full h-full select-none object-top"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
