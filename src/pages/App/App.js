import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import styles from './app.module.scss';

import Logo from 'assets/images/lumin-logo.png';

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
    <div className={styles.App}>
      <nav className={styles.App__Nav}>
        <div className={styles.App__Nav_left}>
          <img src={Logo} alt="Brand logo" />
          <a class="active" href="#home">
            Shop
          </a>
          <a href="#news">Help</a>
          <a href="#contact">Blog</a>
        </div>

        <div className={styles.App__Nav_right}>
          <a class="active" href="#home">
            Account
          </a>
          <a href="#home">Cart</a>
          <select name="language" id="">
            <option key={'EN'} value={'EN'}>
              EN
            </option>
            <option key={'DE'} value={'DE'}>
              DE
            </option>
            <option key={'ESP'} value={'ESP'}>
              ESP
            </option>
          </select>
        </div>
      </nav>

      {currencyData && (
        <select name="currency" id="">
          {currencyData.currency.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      )}

      <main className="App-header">
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
      </main>
    </div>
  );
}

export default App;
