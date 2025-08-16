export interface HeroSection {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  rating: number;
  reviews: number;
  microelements: string;
  weight: string;
  product_name: string;
  badge: string;
}

export interface Image {
  id: number;
  title: string;
  description: string;
  images: string;
}

export interface Why {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Comment {
  id: number;
  fullname: string;
  job: string;
  comment: string;
  image: string;
  created_at: string;
}

export interface Statistic {
  id: number;
  count: string;
  description: string;
}

export interface Question {
  id: number;
  question: string;
  answer: string;
}

export interface Contact {
  id: number;
  icon: string;
  name: string;
  link: string;
}

export interface Certificate {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface Price {
  id: number;
  massa: string;
  month: string;
  description: string;
  price: number;
  old_price: string;
  span: string;
}

export interface Whom {
  id: number;
  image: string;
  icon: string;
  who: string;
  problem: string;
  solution: string;
  benefits: string[];
}

export interface Order {
  id: number;
  name: string;
  phone: string;
  type_id: number;
  status: "pending" | "approved";
  created_at: string;
  updated_at: string;
}

export interface Superior {
  id: number;
  title: string;
  minTitle: string;
  subTitle: string;
  description: string;
  fields: string[];
}

export interface ApiData {
  hero_section: HeroSection;
  images: Image;
  why: Why[];
  comments: Comment[];
  statistics: Statistic[];
  questions: Question[];
  contacts: Contact[];
  certificates: Certificate[];
  prices: Price[];
  whom: Whom[];
  orders?: Order[];
  superior: Superior[];
}
