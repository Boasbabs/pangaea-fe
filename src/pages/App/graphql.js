import { gql } from '@apollo/client';

export const PRODUCT_QUERY = gql`
  query($currentCurrency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currentCurrency)
      product_options {
        title
        options {
          id
          value
        }
      }
    }
  }
`;

export const CURRENCY_QUERY = gql`
  {
    currency
  }
`;