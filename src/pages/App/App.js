import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
  Grid,
  Text,
  Heading,
  Select,
  Box,
  Image,
  Button,
  Skeleton,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { PRODUCT_QUERY, CURRENCY_QUERY } from './graphql';

import Logo from 'assets/images/lumin-logo.png';
import styles from './app.module.scss';

function App() {
  const [cartData, setCartData] = useState({});
  const [currency, setCurrency] = useState('USD');

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleAddToCart = (data) => {
    //
    let tempArray = cartData;

    //  1. check if  data is in Cart
    if (tempArray.hasOwnProperty(data.id)) {
      // 2a. if yes, increase itemQuantity in cart
      let newQuantity = cartData[data.id].itemQuantity + 1;

      // 2b. copy old items and update with newQuantity
      let _obj = {
        ...cartData,
        [data.id]: {
          ...cartData[data.id],
          itemQuantity: newQuantity,
        },
      };

      setCartData(_obj);
    } else {
      // 3. if no, add to cart
      let newObject = {
        ...cartData,
        [data.id]: {
          ...data,
          itemQuantity: 1,
        },
      };

      setCartData(newObject);
    }
  };

  const {
    loading: productLoading,
    data: productData,
    error: productError,
  } = useQuery(PRODUCT_QUERY, {
    variables: {
      currentCurrency: currency,
    },
  });

  const {
    loading: currencyLoading,
    data: currencyData,
    error: currencyError,
  } = useQuery(CURRENCY_QUERY);

  useEffect(() => console.log({ cartData }), [currency, cartData]);

  if (productError || currencyError) return <Box children="error" />;

  return (
    <div className={styles.App}>
      <nav className={styles.App__Nav}>
        <div className={styles.App__Nav_left}>
          <Image
            boxSize="120px"
            objectFit="cover"
            fallbackSrc="https://via.placeholder.com/40"
            src={Logo}
            alt={`Brand logo`}
          />
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

      <Flex bg="white" padding="60">
        <Box>
          <Heading as="h1" mb="5" isTruncated>
            All Products
          </Heading>
          <Text mt="15" fontSize="xl">
            A 360° look at Lumins
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Select
            variant="outline"
            placeholder="Filter By"
            size="lg"
            mt="16"
            iconColor="white"
          >
            <option value="all-products">All Products</option>
            <option value="new-products">New Products</option>
            <option value="sets">Sets</option>
            <option value="skincare">Skincare</option>
            <option value="hair-and-body">Hair &amp; Body Care</option>
            <option value="accessories">Accessories</option>
          </Select>
        </Box>
      </Flex>

      {currencyData && (
        <select name="currency" id="" onChange={handleCurrencyChange}>
          {currencyData.currency.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      )}

      <Skeleton height="50px" isLoaded={!productLoading}>
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          {productData?.products.map((product) => {
            return (
              <Box key={product.id} bg="transparent" w="100%" mt="70">
                <Box boxSize="sm" mb="40" padding="16" textAlign="center">
                  <Image
                    boxSize="120px"
                    fallbackSrc="https://via.placeholder.com/150"
                    src={product.image_url}
                    alt={`${product.title}-product`}
                  />
                </Box>
                <Box
                  mt="40"
                  textAlign="center"
                  as="p"
                  color="#4B5548"
                  lineHeight="taller"
                  isTruncated
                >
                  {product.title}
                </Box>
                <Box
                  mt="2"
                  textAlign="center"
                  as="p"
                  color="black"
                  lineHeight="taller"
                  isTruncated
                >
                  From: {product.price}
                </Box>
                <Box mt="25" textAlign="center">
                  <Button
                    size="md"
                    height="48px"
                    width="200px"
                    border="0px"
                    bg="#4B5548"
                    color="white"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Grid>
      </Skeleton>
    </div>
  );
}

export default App;
