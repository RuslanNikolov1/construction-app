"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./BannerVideoScroll.module.scss";

gsap.registerPlugin(ScrollTrigger);

export function BannerVideoScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      video.currentTime = 0;
      return;
    }

    const setupScrollTrigger = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const tween = gsap.to(video, {
        currentTime: duration,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
        },
      });

      return () => {
        tween.kill();
      };
    };

    let killScrollTrigger: (() => void) | undefined;

    if (video.readyState >= 1) {
      killScrollTrigger = setupScrollTrigger();
    } else {
      const onLoadedMetadata = () => {
        killScrollTrigger = setupScrollTrigger();
      };
      video.addEventListener("loadedmetadata", onLoadedMetadata, {
        once: true,
      });
      return () => {
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
        killScrollTrigger?.();
      };
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    // #region agent log
    fetch("http://127.0.0.1:7245/ingest/34dffbbf-3473-4123-bba1-7cdc517fd77b", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "e8284a",
      },
      body: JSON.stringify({
        sessionId: "e8284a",
        runId: "pre-fix",
        hypothesisId: "H1",
        location: "BannerVideoScroll.tsx:78",
        message: "Viewport vs document widths",
        data: {
          innerWidth: window.innerWidth,
          docClientWidth: document.documentElement.clientWidth,
          docScrollWidth: document.documentElement.scrollWidth,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});

    const designSection = document.querySelector(
      '[aria-label="Follow-up content section"]'
    ) as HTMLElement | null;

    if (designSection) {
      const rect = designSection.getBoundingClientRect();
      fetch(
        "http://127.0.0.1:7245/ingest/34dffbbf-3473-4123-bba1-7cdc517fd77b",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "e8284a",
          },
          body: JSON.stringify({
            sessionId: "e8284a",
            runId: "pre-fix",
            hypothesisId: "H2",
            location: "BannerVideoScroll.tsx:99",
            message: "DesignSection bounding rect",
            data: {
              left: rect.left,
              right: rect.right,
              width: rect.width,
              viewportWidth: window.innerWidth,
            },
            timestamp: Date.now(),
          }),
        }
      ).catch(() => {});
    }
    // #endregion

    return () => {
      killScrollTrigger?.();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Banner video"
    >
      <video
        ref={videoRef}
        className={styles.video}
        src="/output_scroll_ready.mp4"
        preload="auto"
        muted
        playsInline
        aria-label="Construction banner video"
      />
    </section>
  );
}
