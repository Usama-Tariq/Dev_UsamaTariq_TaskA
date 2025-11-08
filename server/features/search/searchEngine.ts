import { Faq, RankedFaq } from "./searchTypes";
import { SearchRequestBody, SearchSuccessResponse } from "../../../shared/http";
import faqsJson from "./faqs.json";

const faqs: Faq[] = faqsJson as Faq[];

/**
 * Scores an FAQ item based on how well it matches the search query.
 * Scoring system:
 * - Title matches: +2 points per matching term
 * - Body matches: +1 point per matching term
 * - Case-insensitive matching
 */
const scoreFaq = (faq: Faq, query: string): number => {
  const normalizedTitle = faq.title.toLowerCase();
  const normalizedBody = faq.body.toLowerCase();

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  if (terms.length === 0) return 0;

  let score = 0;

  for (const term of terms) {
    if (normalizedTitle.includes(term)) score += 2;
    if (normalizedBody.includes(term)) score += 1;
  }

  return score;
};

/**
 * Creates a snippet from the FAQ body, truncating if necessary.
 * Adds an ellipsis (...) if the text is truncated.
 */
const createSnippet = (body: string, maxLength = 120): string => {
  if (body.length <= maxLength) return body;

  return body.slice(0, maxLength).trimEnd() + "…";
};

/**
 * Builds a summary from the ranked FAQ results.
 * Takes the first sentence from each FAQ and combines them.
 */
const buildSummary = (ranked: RankedFaq[]): string | undefined => {
  if (!ranked.length) return undefined;

  const sentences = ranked.map((faq) => {
    const first = faq.body.split(/[.!?]/)[0]?.trim();

    return first || faq.body;
  });

  return sentences.join(". ") + ".";
};

export const executeSearch = (
  body: SearchRequestBody
): { status: number; payload: SearchSuccessResponse | { error: string } } => {
  const { query } = body ?? {};

  if (!query || typeof query !== "string" || query.trim().length === 0) {
    return {
      status: 400,
      payload: { error: "Query is required and cannot be empty." },
    };
  }

  const trimmedQuery = query.trim();

  const ranked: RankedFaq[] = faqs
    .map<RankedFaq>((faq) => ({
      ...faq,
      score: scoreFaq(faq, trimmedQuery),
    }))
    .filter((faq) => faq.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (ranked.length === 0) {
    return {
      status: 200,
      payload: {
        query: trimmedQuery,
        results: [],
        message: `No results found for "${trimmedQuery}". Please try a different keyword.`,
      },
    };
  }

  const results = ranked.map((faq) => ({
    id: faq.id,
    title: faq.title,
    snippet: createSnippet(faq.body),
  }));

  const summary = buildSummary(ranked);
  const sources = ranked.map((faq) => faq.id);

  const response: SearchSuccessResponse = {
    query: trimmedQuery,
    results,
    summary,
    sources,
  };

  return {
    status: 200,
    payload: response,
  };
};
