export interface BlogPost {
  id: string;
  title: string;
  content: string; // Full post content is available!
  excerpt: string;
  slug: string;
  date: string;
  modified: string;
  author: {
    node: {
      name: string;
    };
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
  categories: {
    nodes: BlogCategory[];
  };
  tags: {
    nodes: BlogTag[];
  };
  seo: {
    title: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
  description: string | null;
  seo: {
    title: string;
  };
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface BlogPostsResponse {
  posts: {
    nodes: BlogPost[];
    pageInfo: BlogPageInfo;
  };
}
