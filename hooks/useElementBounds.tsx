import { useEffect, useState, RefObject, useLayoutEffect } from "react";

interface Rect {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

function useElementBounds(ref: RefObject<HTMLDivElement>): Rect | null {
  const [bounds, setBounds] = useState<Rect | null>(null);

  useLayoutEffect(() => {
    const updateBounds = () => {
      if (ref.current) {
        const { top, right, bottom, left } =
          ref.current.getBoundingClientRect();
        setBounds({ top, right, bottom, left });
      }
    };

    updateBounds();

    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds);
    };
  }, [ref]);

  return bounds;
}

export default useElementBounds;
