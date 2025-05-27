// components/StatementUploader.js
import { useState } from "react";
import Papa from "papaparse";

export default function StatementUploader({ onData }) {
  const [error, setError] = useState("");

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        onData(results.data);
      },
      error: (err) => setError(err.message),
    });
  }

  return (
    <div className="p-4 border-2 border-buuk-600 rounded">
      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="block mb-2"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
