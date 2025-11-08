import React from "react";

import type { SearchResultItem } from "../../../shared/http";

interface ResultsListProps {
  results: SearchResultItem[];
}

export const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  if (!results.length) return null;

  return (
    <section className="results-section">
      <h3>Top Matches</h3>

      <ul className="results-list">
        {results.map((item) => (
          <li key={item.id} className="result-card">
            <h4>{item.title}</h4>
            <p>{item.snippet}</p>
            <span className="result-id">ID: {item.id}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
