"use client";

import { motion, useMotionValue } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

const imgs = [
  "../imgs/1.jpg",
  "../imgs/2.jpg",
  "../imgs/3.jpg",
  "../imgs/4.jpg",
  "../imgs/5.jpg",
];

const DRAG_BUFFER = 50;

export default function SwipeCarousel() {
  const [dragging, setDragging] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  const onDragStart = () => {
    setDragging(true);
  };
  const onDragEnd = () => {
    setDragging(false);
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 py-8">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className="flex items-center cursor-grab active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} />
      </motion.div>
      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
    </div>
  );
}

function Images({ imgIndex }: { imgIndex: number }) {
  return (
    <>
      {imgs.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            className="aspect-video w-screen  rounded-xl shrink-0 bg-neutral-800  object-cover"
          />
        );
      })}
    </>
  );
}

function Dots({
  imgIndex,
  setImgIndex,
}: {
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {imgs.map((img, idx) => {
        return (
          <button
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
            }`}
            key={idx}
            onClick={() => setImgIndex(idx)}
          />
        );
      })}
    </div>
  );
}
