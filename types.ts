
export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  cta: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProgramModule {
  title: string;
  content: string[];
}
