"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export default function RouteScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Bypass the site's smooth-scroll CSS so a new route never visibly
    // travels up from the previous page's scroll position.
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
