import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./ConstructionSection.module.scss";

const ConstructionModelViewer = dynamic(
  () =>
    import("./ConstructionModelViewer").then(
      (mod) => mod.ConstructionModelViewer
    ),
  {
    ssr: false,
    loading: () => null,
  }
);

export type ConstructionContentProps = {
  backgroundImage: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
};

export function ConstructionContent({
  backgroundImage,
  description,
  advantages,
  disadvantages,
}: ConstructionContentProps) {
  return (
    <div className={styles.ConstructionContent}>
      <Image
        src={backgroundImage}
        alt=""
        fill
        className={styles.ConstructionContentBg}
        priority
      />
      <div className={styles.ConstructionContentOverlay} aria-hidden="true" />

      <div className={styles.ConstructionContentInner}>
        {/* Left: 3D model panel */}
        <div className={styles.ConstructionModelPanel}>
          <div className={styles.ConstructionDragLabel}>
            <div className={styles.ConstructionDragLabelBg} />
            <Image
              src="/360 Icon.png"
              alt=""
              width={82}
              height={52}
              className={styles.ConstructionDragIcon}
            />
            <p className={styles.ConstructionDragText}>Плъзнете за завъртане</p>
          </div>
          <div className={styles.ConstructionModelFrame}>
            <ConstructionModelViewer />
          </div>
        </div>

        {/* Right: text content panel */}
        <div className={styles.ConstructionTextPanel}>
          <p className={styles.ConstructionText}>{description}</p>

          <div className={styles.ConstructionHorizontalDivider} role="separator" />

          <div className={styles.ConstructionListsRow}>
            {/* Advantages */}
            <div className={styles.ConstructionAdvantages}>
              <div className={styles.ConstructionListHeader}>
                <Image
                  src="/Tick.png"
                  alt=""
                  width={42}
                  height={42}
                  className={styles.ConstructionListIcon}
                />
                <p className={styles.ConstructionListTitle}>Предимства</p>
              </div>
              <ol className={styles.ConstructionList}>
                {advantages.map((item, i) => (
                  <li key={i} className={styles.ConstructionListItem}>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.ConstructionVerticalDivider} role="separator" />

            {/* Disadvantages */}
            <div className={styles.ConstructionDisadvantages}>
              <div className={styles.ConstructionListHeader}>
                <Image
                  src="/Cross.png"
                  alt=""
                  width={42}
                  height={42}
                  className={styles.ConstructionListIcon}
                />
                <p className={styles.ConstructionListTitle}>Недостатъци</p>
              </div>
              <ol className={styles.ConstructionList}>
                {disadvantages.map((item, i) => (
                  <li key={i} className={styles.ConstructionListItem}>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className={styles.ConstructionSurveyRow}>
            <button
              type="button"
              className={styles.ConstructionSurveyButton}
              aria-label="Попълнете анкета"
            >
              Попълнете анкета!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
