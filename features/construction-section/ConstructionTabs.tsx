"use client";

import { useState } from "react";
import styles from "./ConstructionSection.module.scss";
import { ConstructionContent } from "./ConstructionContent";

type ConstructionTabId = "massive" | "wooden" | "coldFormed";

type ConstructionTab = {
  id: ConstructionTabId;
  label: string;
  backgroundImage: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
};

const CONSTRUCTION_TABS: ConstructionTab[] = [
  {
    id: "massive",
    label: "Масивни къщи",
    backgroundImage: "/Massive Background.png",
    description:
      "Масивното строителство със стоманобетонна конструкция е класическо и доказано решение за еднофамилни къщи.",
    advantages: [
      "Висока носимоспособност и устойчивост",
      "Дълъг експлоатационен живот",
      "Добро поведение при сеизмични въздействия",
      "Гъвкавост при архитектурните решения",
    ],
    disadvantages: [
      "По-дълъг срок на изпълнение",
      "По-голямо собствено тегло на конструкцията",
      "По-високи първоначални разходи спрямо някои сглобяеми системи",
    ],
  },
  {
    id: "wooden",
    label: "Дървени сглобяеми къщи",
    backgroundImage: "/Wooden Background 2.png",
    description:
      "Сглобяемото дървено строителство предлага съвременна алтернатива с по-кратки срокове и висока прецизност.",
    advantages: [
      "Бързо изграждане",
      "Добра енергийна ефективност",
      "Лека конструкция",
      "Екологично решение",
    ],
    disadvantages: [
      "По-специфични изисквания към поддръжката",
      "По-ниска топлинна инертност спрямо масивното строителство",
    ],
  },
  {
    id: "coldFormed",
    label: "Сглобяеми къщи от студено-формувани тънкостенни профили",
    backgroundImage: "/ColdFormed Background.png",
    description:
      "Сглобяемите къщи от студено-формувани тънкостенни профили предлагат съвременна алтернатива с по-кратки срокове и висока прецизност.",
    advantages: [
      "Висока точност и контрол на изпълнението",
      "Отлично съотношение тегло / носимоспособност",
      "Съвместимост със съвременни енергийно ефективни решения",
      "Кратки срокове за строителство",
    ],
    disadvantages: [
      "Необходимост от прецизно проектиране и изпълнение",
      "По-малко позната технология за част от клиентите",
    ],
  },
];

export function ConstructionTabs() {
  const [activeTabId, setActiveTabId] = useState<ConstructionTabId>("massive");

  const activeTab =
    CONSTRUCTION_TABS.find((tab) => tab.id === activeTabId) ?? CONSTRUCTION_TABS[0];

  return (
    <>
      <div className={styles.ConstructionTabs} role="tablist" aria-label="Construction types">
        {CONSTRUCTION_TABS.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`construction-tabpanel-${tab.id}`}
              id={`construction-tab-${tab.id}`}
              className={`${styles.ConstructionTab} ${
                isActive ? styles.ConstructionTabActive : styles.ConstructionTabInactive
              }`}
              onClick={() => setActiveTabId(tab.id)}
            >
              <span className={styles.ConstructionTabLabel} aria-hidden="true">
                {tab.label}
              </span>
              <span className={styles.ConstructionTabLabelVisuallyHidden}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`construction-tabpanel-${activeTab.id}`}
        role="tabpanel"
        aria-labelledby={`construction-tab-${activeTab.id}`}
      >
        <ConstructionContent
          backgroundImage={activeTab.backgroundImage}
          description={activeTab.description}
          advantages={activeTab.advantages}
          disadvantages={activeTab.disadvantages}
        />
      </div>
    </>
  );
}
