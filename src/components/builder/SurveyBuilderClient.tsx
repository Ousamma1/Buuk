"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import {
  defaultSurveyDefinition,
  SURVEY_STORAGE_KEY,
} from "@/lib/surveyDefaults";
import type { SurveyDefinition } from "@/lib/surveyDefaults";

interface SurveyCreatorInstance {
  JSON: SurveyDefinition;
  render: (element: HTMLElement) => void;
  destroy?: () => void;
  onModified: { add: (callback: () => void) => void };
}

interface SurveyCreatorNamespace {
  SurveyCreator: new (options: Record<string, unknown>) => SurveyCreatorInstance;
}

function ensureStyles() {
  if (typeof document === "undefined") {
    return;
  }

  const existing = document.getElementById("surveyjs-stylesheet");
  if (!existing) {
    const link = document.createElement("link");
    link.id = "surveyjs-stylesheet";
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/survey-core@1.9.132/defaultV2.min.css";
    document.head.appendChild(link);
  }

  const creatorExisting = document.getElementById("surveyjs-creator-stylesheet");
  if (!creatorExisting) {
    const link = document.createElement("link");
    link.id = "surveyjs-creator-stylesheet";
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/survey-creator-core@1.9.132/survey-creator-core.min.css";
    document.head.appendChild(link);
  }
}

function getStoredSurvey(): SurveyDefinition {
  if (typeof window === "undefined") {
    return defaultSurveyDefinition;
  }
  try {
    const stored = window.localStorage.getItem(SURVEY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultSurveyDefinition;
  } catch (error) {
    console.error("Failed to parse stored survey definition", error);
    return defaultSurveyDefinition;
  }
}

export function SurveyBuilderClient() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const creatorRef = useRef<SurveyCreatorInstance | null>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState({ core: false, creator: false });
  const surveyJson = useMemo<SurveyDefinition>(() => getStoredSurvey(), []);

  useEffect(() => {
    ensureStyles();
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    if (!scriptsLoaded.core || !scriptsLoaded.creator) {
      return;
    }
    if (creatorRef.current) {
      return;
    }
    const creatorNamespace = window.SurveyCreator as SurveyCreatorNamespace | undefined;
    if (!creatorNamespace) {
      return;
    }

    const creator = new creatorNamespace.SurveyCreator({
      showLogicTab: true,
      showThemeTab: true,
      questionTypes: [
        "text",
        "comment",
        "radiogroup",
        "checkbox",
        "dropdown",
        "rating",
        "matrix",
        "boolean",
        "image",
        "panel",
      ],
      isAutoSave: true,
      showJSONEditorTab: true,
      allowModifyPages: true,
      useTabsInElementEditor: true,
      showToolbox: "right",
      showPropertyGrid: "right",
    });

    creator.JSON = surveyJson;

    creator.onModified.add(() => {
      try {
        const json = creator.JSON;
        window.localStorage.setItem(SURVEY_STORAGE_KEY, JSON.stringify(json));
      } catch (error) {
        console.warn("Unable to persist survey definition", error);
      }
    });

    creator.render(containerRef.current);
    creatorRef.current = creator;

    return () => {
      creatorRef.current = null;
      creator.destroy?.();
    };
  }, [scriptsLoaded, surveyJson]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Script
        src="https://unpkg.com/survey-core@1.9.132/survey.core.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, core: true }))}
      />
      <Script
        src="https://unpkg.com/survey-creator-core@1.9.132/survey-creator-core.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, creator: true }))}
      />
      <div className="glass-panel" style={{ padding: "1.25rem" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0 }}>Survey Builder</h1>
            <p style={{ margin: "0.35rem 0 0", color: "var(--muted)" }}>
              Drag, configure, and wire up visual logic without touching expressions.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <span className="badge">Auto-save to browser</span>
            <span className="badge" style={{ background: "rgba(82,199,234,0.18)", color: "var(--primary-dark)" }}>
              Logic tab enabled
            </span>
          </div>
        </header>
      </div>
      <div
        ref={containerRef}
        className="glass-panel"
        style={{ padding: 0, minHeight: "70vh", overflow: "hidden" }}
      />
    </div>
  );
}
