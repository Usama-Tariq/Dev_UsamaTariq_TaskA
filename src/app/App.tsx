import React, { useState } from "react";
import { Layout } from "./layout/Layout";
import { getJson } from "../shared/api/http";
import { SearchPanel } from "../features/search/SearchPanel";

import type { HealthResponse } from "../../shared/http";

const App: React.FC = () => {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const pingBackend = async (): Promise<void> => {
    setIsPinging(true);
    setError("");

    try {
      const data = await getJson<HealthResponse>("/api/health");

      setHealth(data);
    } catch (error) {
      const _error = error as { message?: string };

      setHealth(null);
      setError(_error.message || "Failed to reach backend.");
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <Layout>
      <section className="card">
        <h2>Backend Connectivity</h2>
        <p>
          Use this to verify Express, proxy, and shared contracts are wired
          correctly before relying on <code>/api/search</code>.
        </p>

        <button onClick={pingBackend} disabled={isPinging}>
          {isPinging ? "Pinging…" : "Ping /api/health"}
        </button>

        {error && <div className="alert alert-error">{error}</div>}

        {health && !error && (
          <div className="health-result">
            <p>
              <strong>Status:</strong> {health.status}
            </p>
            <p>
              <strong>Env:</strong> {health.env}
            </p>
            <p>
              <strong>Uptime:</strong> {health.uptimeSeconds.toFixed(1)} seconds
            </p>
            <p>
              <strong>Timestamp:</strong> {health.timestamp}
            </p>
          </div>
        )}
      </section>

      <SearchPanel />
    </Layout>
  );
};

export default App;
