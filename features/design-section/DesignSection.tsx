"use client";

import { useRef, useEffect, useCallback, type RefObject } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./DesignSection.module.scss";

// ─── Slot definitions ────────────────────────────────────────────────────────
// All positions use `left` as the horizontal anchor (normalised from the
// original CSS that mixed `left` / `right`).  xPercent: -50 is applied once
// via gsap.set() so that every island is centred on its `left` value.
//
// Right slot: original `right: 19vw` → visual centre = 100vw - 19vw = 81vw.
// ─────────────────────────────────────────────────────────────────────────────
const SLOT_CONFIGS = {
  front: { left: "50%",  bottom: "0vh",  width: "48vw", height: "29vh", zIndex: 4, opacity: 1    },
  left:  { left: "19vw", bottom: "21vh", width: "30vw", height: "18vh", zIndex: 3, opacity: 0.75 },
  back:  { left: "50%",  bottom: "38vh", width: "24vw", height: "15vh", zIndex: 2, opacity: 0.5  },
  right: { left: "81vw", bottom: "21vh", width: "30vw", height: "18vh", zIndex: 3, opacity: 0.75 },
} as const;

const SLOT_SCALES = {
  front: { construction: 1.6, label: 1.5 },
  left:  { construction: 1, label: 1 },
  back:  { construction: 0.8, label: 0.8 },
  right: { construction: 1, label: 1 },
} as const;

const SLOT_CONSTRUCTION_Y = {
  front: -8,
  left:  4,
  back:  4,
  right: 4,
} as const;

// Per-island banner text. Each entry is an array of lines (same placeholder for all islands for now).
const ISLAND_TEXTS: string[][] = [
  [
    "От еднофамилни къщи до големи и сложни сгради и съоръжения.",
    "Много стабилна и функционална конструкция за всички.",
    "Много стабилна и функционална конструкция за всички неща.",
  ],
  [
    "От еднофамилни къщи до големи и сложни сгради и съоръжения.",
    "Много стабилна и функционална конструкция за всички.",
    "Много стабилна и функционална конструкция за всички неща.",
  ],
  [
    "От еднофамилни къщи до големи и сложни сгради и съоръжения.",
    "Много стабилна и функционална конструкция за всички.",
    "Много стабилна и функционална конструкция за всички неща.",
  ],
  [
    "От еднофамилни къщи до големи и сложни сгради и съоръжения.",
    "Много стабилна и функционална конструкция за всички.",
    "Много стабилна и функционална конструкция за всички неща.",
  ],
];

function renderBannerLines(lines: string[]): string {
  return lines.map((l) => `<span style="display:block">${l}</span>`).join("");
}

type SlotName = keyof typeof SLOT_CONFIGS;

// Clockwise cycle: each slot maps to where it goes on a right-arrow click.
const CW: Record<SlotName, SlotName> = {
  front: "left",
  left:  "back",
  back:  "right",
  right: "front",
};

// Counter-clockwise is the inverse.
const CCW: Record<SlotName, SlotName> = {
  front: "right",
  right: "back",
  back:  "left",
  left:  "front",
};

const ANIM_DURATION = 0.75;
const ANIM_EASE = "power2.inOut";

// ─── Component ───────────────────────────────────────────────────────────────

export function DesignSection() {
  // One ref per island card (the whole card travels: base + building + label).
  const frontRef = useRef<HTMLDivElement>(null);
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const backRef  = useRef<HTMLDivElement>(null);

  // Inner construction image wrappers.
  const frontConstructionRef = useRef<HTMLDivElement>(null);
  const leftConstructionRef  = useRef<HTMLDivElement>(null);
  const rightConstructionRef = useRef<HTMLDivElement>(null);
  const backConstructionRef  = useRef<HTMLDivElement>(null);

  // Inner label wrappers.
  const frontLabelRef = useRef<HTMLDivElement>(null);
  const leftLabelRef  = useRef<HTMLDivElement>(null);
  const rightLabelRef = useRef<HTMLDivElement>(null);
  const backLabelRef  = useRef<HTMLDivElement>(null);

  // Banner refs.
  const bannerRef     = useRef<HTMLDivElement>(null);
  const bannerTextRef = useRef<HTMLDivElement>(null);

  // Index into islands[] of whichever island is currently in the front slot.
  // islands[0] starts in front, so activeFrontIndex starts at 0.
  const activeFrontIndex = useRef<number>(0);

  const islands = [
    { card: frontRef, construction: frontConstructionRef, label: frontLabelRef },
    { card: leftRef,  construction: leftConstructionRef,  label: leftLabelRef  },
    { card: rightRef, construction: rightConstructionRef, label: rightLabelRef },
    { card: backRef,  construction: backConstructionRef,  label: backLabelRef  },
  ] as const;

  // Tracks which slot each island currently occupies so we can look up the
  // next target slot on every click.
  const slotOf = useRef<Map<RefObject<HTMLDivElement | null>, SlotName>>(
    new Map()
  );

  const isAnimating = useRef(false);

  // ── Mount: set initial island positions + animate banner in.
  useEffect(() => {
    islands.forEach(({ card, construction, label }, index) => {
      const slot: SlotName = (["front", "left", "right", "back"] as SlotName[])[index];

      if (card.current) {
        gsap.set(card.current, { ...SLOT_CONFIGS[slot], xPercent: -50 });
        slotOf.current.set(card, slot);
      }

      const scales = SLOT_SCALES[slot];

      if (construction.current) {
        gsap.set(construction.current, {
          scale: scales.construction,
          yPercent: SLOT_CONSTRUCTION_Y[slot],
          transformOrigin: "50% 100%",
        });
      }

      if (label.current) {
        gsap.set(label.current, {
          scale: scales.label,
          transformOrigin: "50% 100%",
        });
      }
    });

    // Banner entrance: starts as a tiny pill at the base of the front island
    // (hidden behind it), slides down to its resting position, then expands.
    if (bannerRef.current) {
      // Place the banner at the front island's bottom edge, collapsed, behind the island.
      gsap.set(bannerRef.current, {
        scaleX: 0.08,
        autoAlpha: 1,
        bottom: "0vh",
        xPercent: -50,
        zIndex: 3,
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Slide down from behind the island to its resting position.
      tl.to(bannerRef.current, {
        bottom: "-14vh",
        duration: 0.55,
        ease: "power2.inOut",
      });

      // 2. Expand to full width once it has cleared the island.
      tl.to(bannerRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: "power2.out",
        zIndex: 5,
      }, "-=0.05");
    }
  }, []);

  // ── Rotate all islands one step in the given direction.
  const rotate = useCallback((direction: "clockwise" | "counterclockwise") => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const cycle = direction === "clockwise" ? CW : CCW;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Label for when rotation tweens begin so we can schedule other steps relative to it.
    tl.addLabel("rotate", 0.1);

    // 1. Banner collapse: shrink to pill and slide back up behind the island.
    if (bannerRef.current) {
      tl.to(
        bannerRef.current,
        {
          scaleX: 0.08,
          duration: 0.18,
          ease: "power2.in",
          zIndex: 3,
        },
        0
      ).to(
        bannerRef.current,
        {
          bottom: "0vh",
          autoAlpha: 0,
          duration: 0.24,
          ease: "power2.inOut",
        },
        0.02
      );
    }

    // 2. Island rotation tweens: run in parallel, starting shortly after collapse begins.
    const tweens = islands.map(({ card, construction, label }) => {
      if (!card.current) return null;

      const currentSlot = slotOf.current.get(card)!;
      const nextSlot = cycle[currentSlot];
      const scales = SLOT_SCALES[nextSlot];

      tl.to(
        card.current,
        {
          ...SLOT_CONFIGS[nextSlot],
          duration: ANIM_DURATION,
          ease: ANIM_EASE,
        },
        "rotate"
      );

      if (construction.current) {
        tl.to(
          construction.current,
          {
            scale: scales.construction,
            yPercent: SLOT_CONSTRUCTION_Y[nextSlot],
            duration: ANIM_DURATION,
            ease: ANIM_EASE,
          },
          "rotate"
        );
      }

      if (label.current) {
        tl.to(
          label.current,
          {
            scale: scales.label,
            duration: ANIM_DURATION,
            ease: ANIM_EASE,
          },
          "rotate"
        );
      }

      return { card, nextSlot };
    });

    // 3. Commit slot assignments and swap text as the new front island comes into place.
    tl.add(() => {
      tweens.forEach((t) => {
        if (t) {
          slotOf.current.set(t.card, t.nextSlot);
        }
      });

      const newFrontEntry = tweens.find((t) => t?.nextSlot === "front");
      if (newFrontEntry) {
        const newIndex = islands.findIndex((i) => i.card === newFrontEntry.card);
        activeFrontIndex.current = newIndex;
        if (bannerTextRef.current) {
          bannerTextRef.current.innerHTML = renderBannerLines(ISLAND_TEXTS[newIndex]);
        }
      }
    }, "rotate+=0.5");

    // 4. Banner re-entry: start while islands are still moving so it feels synced.
    if (bannerRef.current) {
      tl.to(
        bannerRef.current,
        {
          bottom: "-14vh",
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "rotate+=0.35"
      ).to(
        bannerRef.current,
        {
          scaleX: 1,
          duration: 0.5,
          ease: "power2.out",
          zIndex: 5,
        },
        "rotate+=0.4"
      );
    }
  }, []);

  const handleRight = useCallback(() => rotate("clockwise"),        [rotate]);
  const handleLeft  = useCallback(() => rotate("counterclockwise"), [rotate]);

  return (
    <section className={styles.section} aria-label="Follow-up content section" data-snap-section>
      <div className={styles.content}>
        <p className={styles.titleText}>Проектиране</p>
        <p className={styles.headerText}>
          Проектирането е основна дейност на STRENGSOL и не се ограничава по
          тип, размер или предназначение на обекта. Работим по проекти с
          различна сложност – от еднофамилни къщи до големи и комплексни
          сгради и съоръжения.
        </p>
      </div>
      <div className={styles.illustration} aria-hidden="true">

        {/* Back island */}
        <div ref={backRef} className={`${styles.islandBase} ${styles.islandBack}`}>
          <Image src="/Real Island.png" alt="" fill sizes="32vw" className={styles.islandImage} priority />
          <div ref={backConstructionRef} className={styles.backConstruction}>
            <Image src="/Construction 3.png" alt="" fill sizes="24vw" />
          </div>
          <div ref={backLabelRef} className={styles.backLabel}>
            <Image src="/Design Label 3.png" alt="" fill sizes="22vw" className={styles.backLabelImage} />
          </div>
        </div>

        {/* Left island */}
        <div ref={leftRef} className={`${styles.islandBase} ${styles.islandLeft}`}>
          <Image src="/Real Island.png" alt="" fill sizes="26vw" className={styles.islandImage} />
          <div ref={leftConstructionRef} className={styles.leftConstruction}>
            <Image src="/Construction 4.png" alt="" fill sizes="18vw" />
          </div>
          <div ref={leftLabelRef} className={styles.leftLabel}>
            <Image src="/Design Label 4.png" alt="" fill sizes="16vw" className={styles.leftLabelImage} />
          </div>
        </div>

        {/* Right island */}
        <div ref={rightRef} className={`${styles.islandBase} ${styles.islandRight}`}>
          <Image src="/Real Island.png" alt="" fill sizes="26vw" className={styles.islandImage} />
          <div ref={rightConstructionRef} className={styles.rightConstruction}>
            <Image src="/Construction 2.png" alt="" fill />
          </div>
          <div ref={rightLabelRef} className={styles.rightLabel}>
            <Image src="/Design Label 2.png" alt="" fill sizes="16vw" className={styles.rightLabelImage} />
          </div>
        </div>

        {/* Front island */}
        <div ref={frontRef} className={`${styles.islandBase} ${styles.islandFront}`}>
          <Image src="/Real Island.png" alt="" fill sizes="34vw" className={styles.islandImage} />
          <div ref={frontConstructionRef} className={styles.frontConstruction}>
            <Image src="/Construction 1.png" alt="" fill sizes="24vw" />
          </div>
          <div ref={frontLabelRef} className={styles.frontLabel}>
            <Image src="/Design Label 1.png" alt="" fill sizes="30vw" className={styles.frontLabelImage} />
          </div>
        </div>

        {/* Description banner — sits just below the front island */}
        <div ref={bannerRef} className={styles.banner}>
          <div
            ref={bannerTextRef}
            className={styles.bannerText}
            dangerouslySetInnerHTML={{ __html: renderBannerLines(ISLAND_TEXTS[0]) }}
          />
        </div>

        {/* Navigation arrows */}
        <button className={styles.arrowLeft} type="button" aria-label="Previous" onClick={handleLeft}>
          <Image src="/Left Arrow.png" alt="" fill sizes="4vw" />
        </button>

        <button className={styles.arrowRight} type="button" aria-label="Next" onClick={handleRight}>
          <Image src="/Right Arrow.png" alt="" fill sizes="4vw" />
        </button>

      </div>
    </section>
  );
}
