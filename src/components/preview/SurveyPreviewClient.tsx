"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  defaultSurveyDefinition,
  SURVEY_STORAGE_KEY,
} from "@/lib/surveyDefaults";
import type { SurveyDefinition } from "@/lib/surveyDefaults";

interface SurveyModel {
  render: (element: HTMLElement) => void;
  dispose?: () => void;
  destroy?: () => void;
}

interface SurveyNamespace {
  Model: new (json: SurveyDefinition) => SurveyModel;
}

function ensurePreviewStyles() {
  if (typeof document === "undefined") {
    return;
  }

  const coreStyle = document.getElementById("surveyjs-stylesheet");
  if (!coreStyle) {
    const link = document.createElement("link");
    link.id = "surveyjs-stylesheet";
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/survey-core@1.9.132/defaultV2.min.css";
    document.head.appendChild(link);
  }
}

function loadSurveyDefinition(): SurveyDefinition {
  if (typeof window === "undefined") {
    return defaultSurveyDefinition;
  }
  try {
    const stored = window.localStorage.getItem(SURVEY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultSurveyDefinition;
  } catch (error) {
    console.error("Unable to hydrate survey definition", error);
    return defaultSurveyDefinition;
  }
}

export function SurveyPreviewClient() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [coreLoaded, setCoreLoaded] = useState(false);
  const [modelJson, setModelJson] = useState<SurveyDefinition>(() => loadSurveyDefinition());

  useEffect(() => {
    ensurePreviewStyles();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handler = () => {
      const nextJson = loadSurveyDefinition();
      setModelJson(nextJson);
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  useEffect(() => {
    if (!coreLoaded || !containerRef.current) {
      return;
    }
    const surveyNamespace = window.Survey as SurveyNamespace | undefined;
    if (!surveyNamespace) {
      return;
    }

    const containerEl = containerRef.current;
    const model = new surveyNamespace.Model(modelJson);
    model.render(containerEl);

    return () => {
      model.dispose?.();
      model.destroy?.();
      containerEl.replaceChildren();
    };
  }, [coreLoaded, modelJson]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Script
        src="https://unpkg.com/survey-core@1.9.132/survey.core.min.js"
        strategy="afterInteractive"
        onLoad={() => setCoreLoaded(true)}
      />
      <div className="glass-panel" style={{ padding: "1.25rem" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0 }}>Survey Preview</h1>
            <p style={{ margin: "0.35rem 0 0", color: "var(--muted)" }}>
              Test the participant experience, logic rules, and completion messaging in real time.
            </p>
          </div>
          <span className="badge">Synced with builder</span>
        </header>
      </div>
      <div
        ref={containerRef}
        className="glass-panel"
        style={{ padding: "2rem", minHeight: "60vh" }}
      >
        {!coreLoaded && (
          <p style={{ margin: 0, color: "var(--muted)" }}>Loading SurveyJS runtime…</p>
        )}
      </div>
    </div>
  );
}
