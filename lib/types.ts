export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  content: string;
  draft: boolean;
  toc: { id: string; text: string; level: number }[];
};

export type Project = {
  title: string;
  summary: string;
  stack: string[];
  links: {
    primary: string;
    secondary?: string;
  };
};
