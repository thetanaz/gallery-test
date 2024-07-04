"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import FullImage from "./full-image";

type AutoplayType = {
  play: () => void;
  stop: () => void;
};

export const Embla: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [isMounted, setIsMounted] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [bounds, setBounds] = useState({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const imgs = [
    "/imgs/1.jpg",
    "/imgs/2.jpg",
    "/imgs/3.jpg",
    "/imgs/4.jpg",
    "/imgs/5.jpg",
  ];

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      carouselRef.current = node;
      emblaRef(node);
    },
    [emblaRef]
  );

  const updateDimensionsAndBounds = useCallback(() => {
    if (typeof window !== "undefined") {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect();
        setBounds({
          top: rect.top,
          left: rect.left,
          bottom: rect.bottom,
          right: rect.right,
        });
      }
    }
  }, []);

  useLayoutEffect(() => {
    updateDimensionsAndBounds();
    setIsMounted(true);

    window.addEventListener("resize", updateDimensionsAndBounds);
    return () => {
      window.removeEventListener("resize", updateDimensionsAndBounds);
    };
  }, [updateDimensionsAndBounds]);

  useLayoutEffect(() => {
    if (isMounted) {
      updateDimensionsAndBounds();
    }
  }, [isMounted, updateDimensionsAndBounds]);

  useLayoutEffect(() => {
    if (emblaApi) {
      const autoplay = emblaApi.plugins().autoplay as unknown as
        | AutoplayType
        | undefined;
      if (autoplay) {
        if (isMaximized) {
          autoplay.stop();
        } else {
          autoplay.play();
        }
      }
    }
  }, [emblaApi, isMaximized]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex h-screen justify-start items-center">
      <AnimatePresence>
        {isMaximized && (
          <FullImage
            top={bounds.top}
            left={bounds.left}
            bottom={bounds.bottom}
            right={bounds.right}
            width={dimensions.width}
            height={dimensions.height}
            key="fullImg"
            imgSrc={imgs[currentImageIndex]}
            onClick={() => setIsMaximized(false)}
          />
        )}
      </AnimatePresence>
      <div
        ref={setRefs}
        className="flex cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden w-[300px] h-[600px] md:w-[600px] md:h-[350px]"
      >
        <div className="flex">
          {imgs.map((img, idx) => (
            <div key={idx} style={{ flex: "0 0 100%" }}>
              <Image
                priority={true}
                width={900}
                height={650}
                alt="image"
                src={img}
                onClick={() => {
                  setIsMaximized(true);
                  setCurrentImageIndex(idx);
                }}
                className="z-20 bg-center object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Embla;
