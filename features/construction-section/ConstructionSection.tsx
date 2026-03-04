import styles from "./ConstructionSection.module.scss";
import { ConstructionTabs } from "./ConstructionTabs";

export function ConstructionSection() {
  return (
    <section aria-label="Construction">
      <div className={styles.ConstructionDescription}>
        <p className={styles.ConstructionTitle}>Строителство</p>
        <p className={styles.ConstructionDescriptionText}>
          Строителната дейност на STRENGSOL е целенасочено фокусирана изключително
          върху изграждането на еднофамилни жилищни къщи. Фокусът ни е върху
          оптимални, сигурни и дълготрайни решения, съобразени с нуждите на
          бъдещите обитатели.
        </p>
      </div>
      <ConstructionTabs />
    </section>
  );
}
