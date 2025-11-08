import React, { FormEvent } from "react";

interface SearchFormProps {
  query: string;
  isLoading: boolean;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  query,
  isLoading,
  onQueryChange,
  onSubmit,
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for trust badges, forms, funnels..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};
