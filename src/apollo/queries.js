import { gql } from '@apollo/client';

export const BUY_PROPERTIES = gql`
  query getBuyTab {
    properties(where: { category: { name: "Buy" } }, sort: "createdAt:DESC") {
      id
      name
      state
      city
      bedrooms
      bathroom
      description
      price
      category {
        name
      }
      images {
        url
      }
      per
      size
    }
  }
`;

export const RENT_PROPERTIES = gql`
  query getRentTab {
    properties(where: { category: { name: "Rent" } }, sort: "createdAt:DESC") {
      id
      name
      state
      city
      bedrooms
      bathroom
      description
      price
      category {
        name
      }
      images {
        url
      }
      per
      size
    }
  }
`;

export const SHORTLET_PROPERTIES = gql`
  query getRentTab {
    properties(where: { category: { name: "Shortlet" } }, sort: "createdAt:DESC") {
      id
      name
      state
      city
      bedrooms
      bathroom
      description
      price
      category {
        name
      }
      images {
        url
      }
      per
      size
    }
  }
`;

export const BY_CATEGORY = gql`
  query getByCategory($category: String!) {
    properties(
      where: { category: $category }
      sort: "featured:DESC"
      limit: 10
    ) {
      name
      description
      price
      category {
        name
      }
      images {
        url
      }
    }
  }
`;

export const GET_TAB_PROPERTIES = gql`
  query getProperties {
    properties {
      id
      name
      state
      city
      bedrooms
      bathroom
      description
      price
      category {
        name
      }
      images {
        url
      }
      per
      size
    }
  }
`;
