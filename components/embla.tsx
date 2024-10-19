"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { debounce } from "lodash";
import {
  LoaderCircle,
  Minimize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AutoplayType = {
  play: () => void;
  stop: () => void;
};

const imgs = [
  "/imgs/1.webp",
  "/imgs/2.webp",
  "/imgs/3.webp",
  "/imgs/4.webp",
  "/imgs/5.webp",
];

export const Embla: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000 }),
  ]);
  const [isMounted, setIsMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const updateDimensionsAndBounds = useCallback(() => {
    if (carouselRef.current) {
      // Update any necessary dimensions or bounds here
    }
  }, []);

  const debouncedUpdateDimensionsAndBounds = useMemo(
    () => debounce(updateDimensionsAndBounds, 200),
    [updateDimensionsAndBounds]
  );

  useEffect(() => {
    updateDimensionsAndBounds();
    setIsMounted(true);
    window.addEventListener("resize", debouncedUpdateDimensionsAndBounds);
    return () => {
      window.removeEventListener("resize", debouncedUpdateDimensionsAndBounds);
      debouncedUpdateDimensionsAndBounds.cancel();
    };
  }, [debouncedUpdateDimensionsAndBounds, updateDimensionsAndBounds]);

  useEffect(() => {
    if (emblaApi) {
      const autoplay = emblaApi.plugins().autoplay as unknown as
        | AutoplayType
        | undefined;
      if (autoplay) {
        isExpanded ? autoplay.stop() : autoplay.play();
      }
      emblaApi.reInit();
    }
  }, [emblaApi, isExpanded]);

  const handleImageClick = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleMinimize = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      if (isExpanded) {
        const autoplay = emblaApi.plugins().autoplay as unknown as
          | AutoplayType
          | undefined;
        if (autoplay) {
          autoplay.stop();
        }
      }
      emblaApi.scrollPrev();
    }
  }, [emblaApi, isExpanded]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      if (isExpanded) {
        const autoplay = emblaApi.plugins().autoplay as unknown as
          | AutoplayType
          | undefined;
        if (autoplay) {
          autoplay.stop();
        }
      }
      emblaApi.scrollNext();
    }
  }, [emblaApi, isExpanded]);

  if (!isMounted) {
    return (
      <div className="flex w-[500px] h-[250px] ml-2">
        <LoaderCircle
          size={50}
          className="w-[50px] h-[50px] place-self-center mx-auto animate-spin"
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={carouselRef}
      className={`rounded-3xl overflow-hidden ${
        isExpanded
          ? "fixed inset-0 z-50"
          : "relative flex w-[500px] h-[250px] ml-2"
      }`}
      layout
      initial={false}
      animate={{
        scale: isExpanded ? 1 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleMinimize}
              className="absolute top-4 right-4 z-50 bg-white rounded-full p-2"
            >
              <Minimize2 size={24} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 hover:bg-white -translate-y-1/2 z-50 bg-white/80 rounded-full p-2"
            >
              <ChevronLeft size={24} className="bg-transparent" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollNext}
              className="absolute hover:bg-white right-4 top-1/2 -translate-y-1/2 z-50 bg-white/80 rounded-full p-2"
            >
              <ChevronRight size={24} className="bg-transparent" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
      <div ref={emblaRef} className="w-full h-full overflow-hidden">
        <div className="flex h-full">
          {imgs.map((img, idx) => (
            <div key={idx} className="flex-[0_0_100%] relative w-full h-full">
              <Image
                priority={idx === 0}
                fill
                alt={`image-${idx}`}
                src={img}
                onClick={handleImageClick}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Embla;
