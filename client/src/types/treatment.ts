export interface Treatment {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  category: 'general' | 'orthodontics' | 'cosmetic' | 'implants' | 'pediatric' | 'emergency';
  description: string;
  procedureSteps: string[];
  benefits: string[];
  durationMinutes: number;
  costRange: {
    min: number;
    max: number;
  };
  beforeAfterGallery: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  isActive: boolean;
  imageUrl?: string;
}
