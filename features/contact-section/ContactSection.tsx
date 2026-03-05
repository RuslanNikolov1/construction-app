"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ContactSection.module.scss";

export function ContactSection() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      <section
        className={styles.section}
        aria-labelledby="contact-heading"
        data-snap-section
      >
        <header className={styles.header}>
          <h2 id="contact-heading" className={styles.heading}>
            Свържете се
          </h2>
          <p className={styles.subheading}>
            Свържете се с нас за консултация или запитване
          </p>
        </header>

        <div className={styles.content}>
          <form className={styles.form} aria-label="Форма за контакт">
            <div className={styles.inputsColumn}>
              <label className={styles.inputGroup}>
                <input
                  className={styles.input}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Име"
                />
                <span className={styles.inputIcon}>
                  <Image
                    src="/Name Icon.png"
                    alt=""
                    fill
                    sizes="2vw"
                  />
                </span>
              </label>

              <label className={styles.inputGroup}>
                <input
                  className={styles.input}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Телефон"
                />
                <span className={styles.inputIcon}>
                  <Image
                    src="/Phone Icon.png"
                    alt=""
                    fill
                    sizes="2vw"
                  />
                </span>
              </label>

              <label className={styles.inputGroup}>
                <input
                  className={styles.input}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Имейл"
                />
                <span className={styles.inputIcon}>
                  <Image
                    src="/Mail Icon.png"
                    alt=""
                    fill
                    sizes="2vw"
                  />
                </span>
              </label>
            </div>

            <div className={styles.messageColumn}>
              <label className={styles.messageGroup}>
                <textarea
                  className={styles.messageInput}
                  name="message"
                  placeholder="Напишете съобщение..."
                  rows={4}
                />
              </label>
              <button className={styles.submitButton} type="submit">
                Изпрати
              </button>
            </div>
          </form>

          <section
            className={styles.details}
            aria-label="Допълнителна контакт информация"
          >
            <div className={styles.detailRow}>
              <span className={styles.detailIcon}>
                <Image
                  src="/White Phone Icon New.png"
                  alt="Телефон"
                  fill
                  sizes="2vw"
                />
              </span>
              <a
                className={styles.detailLink}
                href="tel:+359888118718"
              >
                +359 888 118 718
              </a>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailIcon}>
                <Image
                  src="/White Mail Icon New.png"
                  alt="Имейл"
                  fill
                  sizes="2vw"
                />
              </span>
              <a
                className={styles.detailLink}
                href="mailto:office@strengsol.com"
              >
                office@strengsol.com
              </a>
              <span className={styles.detailDivider} aria-hidden="true" />
              <a
                className={styles.detailLink}
                href="mailto:sinan.saliev@strengsol.com"
              >
                sinan.saliev@strengsol.com
              </a>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailIcon}>
                <Image
                  src="/Location Icon New.png"
                  alt="Локация"
                  fill
                  sizes="2vw"
                />
              </span>
              <p className={styles.detailText}>бул. “Стефан Стамболов” 120</p>
              <button
                className={styles.mapButton}
                type="button"
                onClick={() => setIsMapOpen(true)}
              >
                Виж карта
              </button>
            </div>
          </section>
        </div>
      </section>

      {isMapOpen && (
        <div
          className={styles.mapBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label="Локация на STRENGSOL"
          onClick={() => setIsMapOpen(false)}
        >
          <div
            className={styles.mapModal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.mapCloseButton}
              onClick={() => setIsMapOpen(false)}
              aria-label="Затвори картата"
            >
              ✕
            </button>
            <iframe
              title="Локация на STRENGSOL"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2810.953110832511!2d27.464685075958744!3d42.50938997117935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a6949b2b1d12d3%3A0x26896e1c63a9c14!2sg.k.%20Bratya%20Miladinovi%2C%20bul.%20%22Stefan%20Stambolov%22%20120%2C%208001%20Burgas!5e1!3m2!1sen!2sbg!4v1772725079115!5m2!1sen!2sbg"
              loading="lazy"
              style={{ border: 0, width: "100%", height: "100%" }}
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

