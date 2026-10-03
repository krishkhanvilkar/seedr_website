"use client";

import { LiquidMetal, liquidMetalPresets } from '@paper-design/shaders-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface LiquidMetalHeroProps {
  id?: string;
  badge?: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  onPrimaryCtaClick: () => void;
  onSecondaryCtaClick?: () => void;
  features?: LiquidMetalFeature[];
}

export interface LiquidMetalFeature {
  title: string;
  description: string;
}

const obsidianMetal = {
  ...liquidMetalPresets[2].params,
  colorBack: "#050506",
  colorTint: "#b9bcc4",
  shiftRed: 0,
  shiftBlue: 0,
  softness: 0.35,
  contour: 0.25,
  distortion: 0.08,
};

export default function LiquidMetalHero({
  id,
  badge,
  title,
  subtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  features = [],
}: LiquidMetalHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const meshOpacity = useTransform(scrollYProgress, [0.1, 0.38, 0.62, 0.9], [0, 1, 1, 0]);
  const meshScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative isolate min-h-[120vh] flex items-center justify-center overflow-hidden py-32 scroll-mt-0"
    >
      {/* Contained to this section; opacity is scroll-linked so the mesh emerges from and returns to black */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: meshOpacity, scale: meshScale }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <LiquidMetal
          {...obsidianMetal}
          style={{ position: "absolute", inset: 0 }}
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5] bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(0,0,0,0.6),rgba(0,0,0,0.2)_70%,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-[5] h-80 bg-gradient-to-b from-black from-15% via-black/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-40 bg-gradient-to-t from-black to-transparent"
      />

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {badge && (
            <motion.div
              className="flex justify-center"
              variants={itemVariants}
            >
              <Badge
                variant="secondary"
                className="bg-foreground/10 text-foreground border-foreground/20 hover:bg-foreground/20 transition-colors duration-300 backdrop-blur-sm px-4 py-1.5 text-sm"
              >
                {badge}
              </Badge>
            </motion.div>
          )}

          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <motion.h2
              className="text-balance text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
              variants={itemVariants}
            >
              {title}
            </motion.h2>

            <motion.p
              className="text-pretty max-w-3xl mx-auto text-xl sm:text-2xl text-foreground/90 leading-relaxed drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)]"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={buttonVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onPrimaryCtaClick}
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-2xl text-lg px-8 py-6 font-semibold"
              >
                {primaryCtaLabel}
              </Button>
            </motion.div>

            {secondaryCtaLabel && onSecondaryCtaClick && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onSecondaryCtaClick}
                  variant="outline"
                  size="lg"
                  className="border-foreground/30 text-foreground hover:bg-foreground/10 hover:border-foreground/50 transition-all duration-300 backdrop-blur-sm text-lg px-8 py-6 font-semibold"
                >
                  {secondaryCtaLabel}
                </Button>
              </motion.div>
            )}
          </motion.div>

          {features.length > 0 && (
            <motion.div
              className="mx-auto max-w-5xl pt-12"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden rounded-2xl bg-white/[0.03] border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/60 ring-1 ring-inset ring-white/5">
                  <ul
                    className={`grid grid-cols-1 divide-y divide-white/10 md:divide-x md:divide-y-0 ${
                      features.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
                    }`}
                  >
                    {features.map((feature, index) => (
                      <motion.li
                        key={feature.title}
                        className="flex flex-col gap-4 p-8 text-left md:p-10"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: 0.8 + (index * 0.1)
                        }}
                      >
                        <span className="font-mono text-xs tracking-[0.2em] text-white/40">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-lg font-semibold tracking-tight text-white">
                          {feature.title}
                        </h3>
                        <p className="text-pretty text-sm leading-relaxed text-white/60">
                          {feature.description}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
