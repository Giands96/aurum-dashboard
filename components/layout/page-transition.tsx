"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);
  const prevPathname = useRef(pathname);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (prevPathname.current !== pathname) {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    setTransitioning(true);

    timeoutRef.current = setTimeout(() => {
      setDisplayChildren(children);
      setTransitioning(false);
    }, 150);

    prevPathname.current = pathname;
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={transitioning ? "opacity-0" : "animate-page-in"}
      key={pathname}
    >
      {displayChildren}
    </div>
  );
}
