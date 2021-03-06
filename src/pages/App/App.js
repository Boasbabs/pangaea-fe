import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';

const PRODUCT_QUERY = gql`
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

const CURRENCY_QUERY = gql`
  {
    currency
  }
`;

function App() {
  const currentCurrency = {
    currentCurrency: 'USD',
  };
  const {
    loading: productLoading,
    data: productData,
    error: productError,
  } = useQuery(PRODUCT_QUERY, {
    variables: {
      ...currentCurrency,
    },
  });

  const {
    loading: currencyLoading,
    data: currencyData,
    error: currencyError,
  } = useQuery(CURRENCY_QUERY);

  return (
    <div className="App">
      {currencyData && (
        <select name="currency" id="">
          {currencyData.currency.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      )}

      <header className="App-header">
        <div>
          {productLoading ? (
            <h5> loading... </h5>
          ) : (
            productData?.products.map((product) => {
              return (
                <div key={product.id}>
                  <div>{product.title}</div>
                  <div>{product.price}</div>
                  <img
                    src={product.image_url}
                    alt={`${product.title}-product`}
                    srcSet=""
                  />
                </div>
              );
            })
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
