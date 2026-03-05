"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./IntroductionSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const LINE_1 = "Инженерни решения за";
const LINE_2_ACCENT = "сигурни и устойчиви";
const LINE_2_REST = " конструкции";

function splitIntoChars(str: string) {
  return Array.from(str);
}

export function IntroductionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  const line1Chars = splitIntoChars(LINE_1);
  const line2Chars = splitIntoChars(LINE_2_ACCENT + LINE_2_REST);
  const accentLength = LINE_2_ACCENT.length;

  useEffect(() => {
    const section = sectionRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!section || !line1 || !line2) return;

    const letterWraps1 = line1.querySelectorAll(`.${styles.letterWrap}`);
    const letterWraps2 = line2.querySelectorAll(`.${styles.letterWrap}`);
    if (!letterWraps1.length || !letterWraps2.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      letterWraps1,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0 0 0)",
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
      }
    ).fromTo(
      letterWraps2,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0 0 0)",
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
      },
      "-=0.2"
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="introduction-heading"
      data-snap-section
    >
      <div className={styles.background} aria-hidden="true">
        <div className={styles.sky} />
        <div className={styles.city} />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <h1 id="introduction-heading" className={styles.heading}>
            <span ref={line1Ref} className={styles.headingLine}>
              {line1Chars.map((char, i) => (
                <span key={`l1-${i}`} className={styles.letterWrap}>
                  <span className={styles.letter}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                </span>
              ))}
            </span>
            <span ref={line2Ref} className={styles.headingLine}>
              {line2Chars.map((char, i) => (
                <span key={`l2-${i}`} className={styles.letterWrap}>
                  <span
                    className={
                      i < accentLength ? styles.headingAccent : undefined
                    }
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <p className={styles.subheading}>
            STRENGSOL LTD е инженерна компания, специализирана в{" "}
              проектиране и изпълнение
            на строителни конструкции.
          </p>

        </header>

        <div className={styles.descriptionGrid}>
          <div className={styles.descriptionBlock}>
            <p className={styles.descriptionText}>
              Ние съчетаваме задълбочени инженерни знания, практически опит и
              съвременни технологии, за да създаваме{" "}
              <span className={styles.textEmphasis}>
                надеждни, икономични и дълготрайни
              </span>{" "}
              сгради.
            </p>
            <span className={styles.lShape} aria-hidden="true" />
          </div>

          <div className={styles.descriptionBlock}>
            <p className={styles.descriptionText}>
              Работим както в сферата на конструктивното проектиране, така и в
              реалното строителство, с фокус върху еднофамилни къщи – масивни и
              сглобяеми.
            </p>
            <span className={styles.lShape} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

