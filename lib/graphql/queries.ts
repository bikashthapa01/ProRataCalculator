import { gql } from "@apollo/client";

export const GET_BLOG_POSTS = gql`
  query GetBlogPosts(
    $first: Int
    $after: String
    $categoryName: String
    $search: String
  ) {
    posts(
      first: $first
      after: $after
      where: { search: $search, categoryName: $categoryName }
    ) {
      nodes {
        id
        title
        content
        excerpt
        slug
        date
        modified
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            id
            name
            slug
            count
            description
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
        seo {
          title
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_BLOG_POST = gql`
  query GetBlogPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      slug
      date
      modified
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          id
          name
          slug
          count
          description
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
      seo {
        title
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      nodes {
        id
        name
        slug
        count
        description
        seo {
          title
        }
      }
    }
  }
`;

export const GET_TAGS = gql`
  query GetTags {
    tags {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const GET_BLOG_SEARCH = gql`
  query GetBlogSearch($search: String!, $first: Int) {
    posts(first: $first, where: { search: $search }) {
      nodes {
        id
        title
        content
        excerpt
        slug
        date
        modified
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
        seo {
          title
        }
      }
    }
  }
`;

export const GET_FEATURED_POSTS = gql`
  query GetFeaturedPosts($first: Int) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        content
        excerpt
        slug
        date
        modified
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
        seo {
          title
        }
      }
    }
  }
`;
