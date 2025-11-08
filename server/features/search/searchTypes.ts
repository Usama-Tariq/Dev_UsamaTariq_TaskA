export interface Faq {
  id: string;
  title: string;
  body: string;
}

export interface RankedFaq extends Faq {
  score: number;
}
