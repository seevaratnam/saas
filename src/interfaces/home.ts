export interface HomeAttributes {
  hero_title: string;
  hero_description: string;
  hero_image: string;
  feature_title: string;
  feature_description: string;
  features: Feature[];
  steps: Step[];
  steps_image: string;
  pricing_title: string;
  pricing_description: string;
  plans: Plan[];
  team_title: string;
  team_description: string;
  team: Team[];
  blog_title: string;
  blog_description: string;
  posts: string[];
}

interface Feature {
  name: string;
  description: string;
}
interface Step {
  name: string;
  description: string;
}

interface Plan {
  name: string;
  description: string;
  price: string;
  usps: { name: string }[];
}

interface Team {
  name: string;
  description: string;
  position: string;
  image: string;
}
