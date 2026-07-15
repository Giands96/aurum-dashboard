"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);
  const prevPathname = useRef(pathname);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prevPathname.current === pathname) return;

    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    setTransitioning(true);

    const timeoutId = setTimeout(() => {
      setDisplayChildren(children);
      setTransitioning(false);
    }, 150);

    timeoutRef.current = timeoutId;
    prevPathname.current = pathname;

    return () => clearTimeout(timeoutId);
  }, [pathname, children]);

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
