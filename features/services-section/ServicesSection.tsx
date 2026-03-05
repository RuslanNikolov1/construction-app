import Image from "next/image";
import styles from "./ServicesSection.module.scss";

export function ServicesSection() {
  return (
    <section className={styles.ServicesSection} aria-label="Services" data-snap-section>
      <div className={styles.ServicesLabelWrapper}>
        <Image
          src="/Services label.png"
          alt=""
          fill
          sizes="30vw"
          className={styles.ServicesLabel}
        />
      </div>
      <div className={`${styles.ServiceWrapper1} ${styles.ServiceWrapper}`}>
        <Image
          src="/Light Bulb Icon.png"
          alt=""
          width={20}
          height={25}
          className={`${styles.ServiceIcon1} ${styles.ServiceIcon}`}
        />
        <p className={styles.ServicesLabelText}>Конструктивни становища</p>
      </div>
      <div className={`${styles.ServiceWrapper2} ${styles.ServiceWrapper}`}>
        <Image
          src="/Optimization Icon.png"
          alt=""
          width={22}
          height={22}
          className={`${styles.ServiceIcon2} ${styles.ServiceIcon}`}
        />
        <p className={styles.ServicesLabelText}>Оптимизация на проекти</p>
      </div>
      <div className={`${styles.ServiceWrapper3} ${styles.ServiceWrapper}`}>
        <Image
          src="/Mountain Icon.png"
          alt=""
          width={22}
          height={22}
          className={`${styles.ServiceIcon3} ${styles.ServiceIcon}`}
        />
        <p className={styles.ServicesLabelText}>Усилване на сгради</p>
      </div>
      <div className={`${styles.ServiceWrapper4} ${styles.ServiceWrapper}`}>
        <Image
          src="/Glasses Icon.png"
          alt=""
          width={25}
          height={12}
          sizes="1vw"
          className={`${styles.ServiceIcon4} ${styles.ServiceIcon}`}
        />
        <p className={styles.ServicesLabelText}>Конструктивни експертизи</p>
      </div>
    </section>
  );
}

