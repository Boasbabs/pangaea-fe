import React, { useState, useEffect, useReducer } from 'react';
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
  Stack,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { PRODUCT_QUERY, CURRENCY_QUERY } from './graphql';
import { ProductCard, DrawerCard } from 'components';
import {reducer, initialState} from "./config"

import Logo from 'assets/images/lumin-logo.png';
import styles from './app.module.scss';


function App() {
  const [currency, setCurrency] = useState('USD');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [state, dispatch] = useReducer(reducer, initialState);
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
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

  // useEffect(() => {}, [currency, state]);

  // show error when API fails
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

      <Flex bg="white" padding="40">
        <Box>
          <Heading
            as="h1"
            fontSize="xx-large"
            fontWeight="normal"
            fontFamily="Playfair Display"
            mb="5"
            isTruncated
          >
            All Products
          </Heading>
          <Text mt="15" fontSize="xl">
            A 360° look at Lumins
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Select
            borderRadius="none"
            size="lg"
            w="300px"
            variant="outline"
            placeholder="Filter By"
            size="lg"
            mt="1"
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

      <Skeleton height="80vh" isLoaded={!productLoading}>
        <Grid bg="#e0e2e0" templateColumns="repeat(3, 1fr)" gap={1}>
          {productData?.products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                handleAddToCart={() => {
                  dispatch({
                    type: 'ADD_TO_CART',
                    payload: {
                      product,
                      itemQuantity: 1,
                    },
                  });
                  onOpen(); // open drawer
                }}
              />
            );
          })}
        </Grid>
      </Skeleton>

      <Drawer
        bg="#e0e2e0"
        onClose={onClose}
        isOpen={isOpen}
        size={'md'}
        placement="right"
      >
        <DrawerOverlay bg="#e0e2e0">
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerHeader>
              <Text mt="15" fontSize="md">
                Your Cart
              </Text>
            </DrawerHeader>
            <DrawerBody>
              <Flex alignItems="center" justifyContent="flex-start">
                <Box w="80px">
                  {currencyData && (
                    <Select
                      borderRadius="none"
                      name="currency"
                      id=""
                      size="sm"
                      onChange={handleCurrencyChange}
                    >
                      {currencyData.currency.map((curr) => (
                        <option key={curr} value={curr}>
                          {curr}
                        </option>
                      ))}
                    </Select>
                  )}
                </Box>
                <Spacer />
              </Flex>

              {state.cart.map((item, index) => {
                const { image_url, title, price } = item.product;
                return (
                  <DrawerCard
                    key={index}
                    imageUrl={image_url}
                    quantity={item.itemQuantity}
                    title={title}
                    price={price}
                    currency={currency}
                    increment={() =>
                      dispatch({
                        type: 'INCREASE_ITEM',
                        payload: {
                          ...item,
                        },
                      })
                    }
                    decrement={() =>
                      dispatch({
                        type: 'DECREASE_ITEM',
                        payload: {
                          ...item,
                        },
                      })
                    }
                    handleDelete={() =>
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: {
                          ...item,
                        },
                      })
                    }
                  />
                );
              })}
            </DrawerBody>

            <DrawerFooter>
              <Stack direction="column" spacing={6} align="left">
                <Button
                  //  isFullWidth={true}
                  variant="outline"
                  size="lg"
                  height="50px"
                  width="300px"
                  fontSize="12"
                  borderRadius="none"
                  border="1px"
                  borderColor="#4B5548"
                  bg="#e0e2e0"
                  color="#4B5548"
                  textTransform="uppercase"
                  mr={3}
                  onClick={onClose}
                >
                  {'Make this a subscription (Save 20 %)'}
                </Button>
                <Button
                  height="50px"
                  textTransform="uppercase"
                  border="none"
                  fontSize="12"
                  borderRadius="none"
                  bg="#4B5548"
                  _hover={{
                    bg: '#e0e2e0',
                    color: '#4B5548',
                    border: '1px',
                    borderColor: '#4B5548',
                  }}
                  _active={{
                    bg: '#e0e2e0',
                    transform: 'scale(0.98)',
                    border: '1px',
                    borderColor: '#4B5548',
                    color: '#4B5548',
                  }}
                  isFullWidth={true}
                  color="white"
                >
                  Proceed to checkout
                </Button>
              </Stack>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
}

export default App;
