"use client";

import { useState, type ChangeEvent } from "react";
import Papa from "papaparse";

export function StatementUploader() {
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setError(null);
        setSummary(`${results.data.length} rows ready to sync`);
      },
      error: (err) => setError(err.message),
    });
  }

  return (
    <div
      className="glass-panel"
      style={{
        padding: "1.2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
      }}
    >
      <label style={{ fontWeight: 600, letterSpacing: "0.04em" }}>Bulk assignment upload</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        style={{
          padding: "0.65rem 0.8rem",
          borderRadius: "var(--border-radius-sm)",
          border: "1px dashed rgba(14,27,61,0.25)",
          background: "rgba(255,255,255,0.65)",
        }}
      />
      <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--muted)" }}>
        Upload assignments exported from the geo service (CSV with location_id, surveyor_email, due_at).
      </p>
      {summary && !error && (
        <p style={{ color: "var(--primary-dark)", fontSize: "0.85rem", fontWeight: 600 }}>{summary}</p>
      )}
      {error && <p style={{ color: "#ff5f6d", fontSize: "0.85rem" }}>{error}</p>}
    </div>
  );
}
