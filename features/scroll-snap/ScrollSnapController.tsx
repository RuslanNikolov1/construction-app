"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

/**
 * Intercepts wheel + touch events and smoothly scrolls to the nearest
 * snap section using GSAP. Sections are identified by the
 * [data-snap-section] attribute.
 *
 * The BannerVideoScroll section deliberately omits this attribute so it
 * is excluded from snapping. While the user is still inside the banner's
 * GSAP pin zone (scrollY < BANNER_SCROLL_END), wheel events are passed
 * through untouched so the video scrub works naturally.
 */

const SCROLL_DURATION = 1.2; // seconds
const SCROLL_EASE = "power2.inOut";
const WHEEL_THRESHOLD = 30; // minimum delta to register intent

// Must match the `end: "+=2000"` value in BannerVideoScroll ScrollTrigger.
const BANNER_SCROLL_END = 2000;

export function ScrollSnapController() {
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);
  const wasInBanner = useRef(true);

  useEffect(() => {
    const getSections = (): HTMLElement[] =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-snap-section]"));

    const getCurrentIndex = (sections: HTMLElement[]): number => {
      const scrollY = window.scrollY;
      let closest = 0;
      let closestDist = Infinity;

      sections.forEach((section, i) => {
        const dist = Math.abs(section.offsetTop - scrollY);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      return closest;
    };

    const scrollToSection = (index: number, sections: HTMLElement[]) => {
      if (index < 0 || index >= sections.length) return;
      if (isScrolling.current) return;

      isScrolling.current = true;

      const targetY = sections[index].offsetTop;

      gsap.to(window, {
        scrollTo: { y: targetY, autoKill: false },
        duration: SCROLL_DURATION,
        ease: SCROLL_EASE,
        onComplete: () => {
          setTimeout(() => {
            isScrolling.current = false;
          }, 100);
        },
      });
    };

    // When the user scrolls past the banner's pin zone, snap to the first section.
    const onScroll = () => {
      const inBanner = window.scrollY < BANNER_SCROLL_END;

      if (wasInBanner.current && !inBanner) {
        // Just crossed the banner boundary going downward — snap to section 0.
        const sections = getSections();
        if (sections.length) scrollToSection(0, sections);
      }

      wasInBanner.current = inBanner;
    };

    const scrollToBanner = () => {
      if (isScrolling.current) return;
      isScrolling.current = true;
      wasInBanner.current = true;

      gsap.to(window, {
        scrollTo: { y: 0, autoKill: false },
        duration: SCROLL_DURATION,
        ease: SCROLL_EASE,
        onComplete: () => {
          setTimeout(() => {
            isScrolling.current = false;
          }, 100);
        },
      });
    };

    const onWheel = (e: WheelEvent) => {
      // Let the banner's GSAP pin handle its own scroll region naturally.
      if (window.scrollY < BANNER_SCROLL_END) return;

      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

      const sections = getSections();
      if (!sections.length) return;

      e.preventDefault();

      if (isScrolling.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const currentIndex = getCurrentIndex(sections);

      // Scrolling up from the first snap section — go back to the banner.
      if (direction === -1 && currentIndex === 0) {
        scrollToBanner();
        return;
      }

      scrollToSection(currentIndex + direction, sections);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (window.scrollY < BANNER_SCROLL_END) return;

      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return;

      const sections = getSections();
      if (!sections.length) return;

      if (isScrolling.current) return;

      const direction = delta > 0 ? 1 : -1;
      const currentIndex = getCurrentIndex(sections);

      // Swiping up from the first snap section — go back to the banner.
      if (direction === -1 && currentIndex === 0) {
        scrollToBanner();
        return;
      }

      scrollToSection(currentIndex + direction, sections);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return null;
}
