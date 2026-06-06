export type TargetIntent = "Informational" | "Commercial" | "Comparison";

export interface AffiliateProduct {
  id: string;
  name: string;
  brand: string;
  rating: number; // e.g. 4.8
  description: string;
  affiliateUrl: string;
  keyFeatures: string[];
  pricePlan: string; // e.g. "Free, plus Pro from $9.99/mo"
  pros: string[];
  cons: string[];
  badge?: string; // e.g. "Best Overall", "Best for Speed", "Best Budget"
  whatItDoes?: string;
  whyItHelpsStudents?: string;
}

export interface ComparisonRow {
  productName: string;
  rating: string;
  accuracy: string;
  pricing: string;
  bestFor: string;
}

export interface MoneyPage {
  id: string;
  slug: string; // e.g.best-ai-essay-writer-tools
  title: string;
  targetKeyword: string;
  parentCategorySlug: string; // references Category
  introduction: string;
  contentSections: {
    heading: string;
    level: 2 | 3;
    body: string;
  }[];
  featuredProductId: string; // references AffiliateProduct (Best Overall)
  bestFreeProductId?: string; // references AffiliateProduct (Best Free)
  productReviewIds: string[]; // references AffiliateProduct[]
  comparisonTable: ComparisonRow[];
  faqs: { question: string; answer: string }[];
  conclusion: string;
  views: number;
  isCustomGenerated: boolean;
  creationDate: string;
}

export interface CategoryHub {
  id: string;
  slug: string; // e.g. ai-writing-tools
  title: string;
  broadKeyword: string;
  description: string;
  moneyPageSlugs: string[]; // children pages
}

export interface KeywordPlanItem {
  id: string;
  keyword: string;
  searchVolume: number;
  difficulty: number; // 0 - 100
  intent: TargetIntent;
  suggestedTitle: string;
  categorySlug: string;
  targetedPageSlug?: string;
  status: "Targeted" | "Planned" | "Generating";
}

export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  skeletonPrompt: string;
  pattern: "Listicle" | "Comparison" | "Guide";
}
