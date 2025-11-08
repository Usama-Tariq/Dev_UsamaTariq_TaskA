import React, { useReducer, useCallback, useMemo } from "react";
import { SearchForm } from "./SearchForm";
import { ResultsList } from "./ResultsList";
import { searchFaqs } from "./api";
import { searchReducer, initialState, SearchActionType } from "./searchReducer";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { ErrorBoundary } from "../../shared/components/ErrorBoundary";

import type { SearchSuccessResponse } from "../../../shared/http";

export const SearchPanel: React.FC = () => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const debouncedQuery = useDebounce(state.query, 300);

  const handleSearch = useCallback(async (): Promise<void> => {
    const trimmed = debouncedQuery.trim();

    if (!trimmed) {
      dispatch({
        type: SearchActionType.SEARCH_ERROR,
        payload: "Please enter a search query.",
      });

      return;
    }

    dispatch({ type: SearchActionType.SEARCH_START });

    try {
      const response: SearchSuccessResponse = await searchFaqs(trimmed);

      dispatch({
        type: SearchActionType.SEARCH_SUCCESS,
        payload: {
          results: response.results ?? [],
          summary: response.summary,
          sources: response.sources ?? [],
          message: response.message,
        },
      });
    } catch (error) {
      const _error = error as { message?: string };

      dispatch({
        type: SearchActionType.SEARCH_ERROR,
        payload: _error.message || "Unexpected error while searching.",
      });
    }
  }, [debouncedQuery]);

  const handleQueryChange = useCallback((newQuery: string): void => {
    dispatch({ type: SearchActionType.SET_QUERY, payload: newQuery });
    dispatch({ type: SearchActionType.RESET_MESSAGES });
  }, []);

  const showEmptyState = useMemo(
    () =>
      state.hasSearched &&
      !state.isLoading &&
      !state.errorMessage &&
      state.results.length === 0,
    [
      state.hasSearched,
      state.isLoading,
      state.errorMessage,
      state.results.length,
    ]
  );

  return (
    <ErrorBoundary>
      <section className="card">
        <h2>Task A: Mini Full-Stack Search</h2>
        <p>
          Search a local FAQ dataset via <code>POST /api/search</code> and see
          the top 3 most relevant matches.
        </p>

        <SearchForm
          query={state.query}
          isLoading={state.isLoading}
          onQueryChange={handleQueryChange}
          onSubmit={handleSearch}
        />

        {state.errorMessage && (
          <div className="alert alert-error">{state.errorMessage}</div>
        )}

        {state.infoMessage && !state.errorMessage && (
          <div className="alert alert-info">{state.infoMessage}</div>
        )}

        {state.isLoading && <div className="loading">Searching FAQs…</div>}

        <ResultsList results={state.results} />

        {(state.summary || state.sources.length > 0) &&
          state.results.length > 0 && (
            <section className="meta">
              {state.summary && (
                <div className="summary">
                  <h3>Summary</h3>
                  <p>{state.summary}</p>
                </div>
              )}

              {state.sources.length > 0 && (
                <div className="sources">
                  <strong>Sources:</strong> [{state.sources.join(", ")}]
                </div>
              )}
            </section>
          )}

        {showEmptyState && (
          <div className="empty-state">
            <p>No results found. Try adjusting your search terms.</p>
          </div>
        )}
      </section>
    </ErrorBoundary>
  );
};
