export type NavigationItem = {
  label: string;
  href?: string;
  type: "link" | "dropdown";
  featured?: {
    title: string;
    href: string;
    description: string;
  };
  items?: {
    title: string;
    href: string;
    description: string;
  }[];
};
