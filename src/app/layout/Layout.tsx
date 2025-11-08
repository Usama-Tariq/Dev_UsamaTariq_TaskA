import React, { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="app">
      <header className="header">
        <h1>Spiralyze | Task A (Fullstack TypeScript)</h1>
        <p className="subtitle">
          Mini full-stack search with a modular, production-style structure.
        </p>
      </header>
      <main className="main">{children}</main>
    </div>
  );
};
