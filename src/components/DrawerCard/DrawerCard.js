import React from 'react';
import {
  Text,
  Box,
  Image,
  Flex,
  Spacer,
  CloseButton,
} from '@chakra-ui/react';
import styles from './style.module.scss';

const DrawerCard = ({
  imageUrl,
  price,
  title,
  handleDelete,
  currency,
  increment,
  decrement,
  quantity
}) => {
  return (
    <Box
      mt="5"
      padding="10px"
      border="1px"
      borderColor="#e0e2e0"
      height="150px"
      borderRadius="none"
      bg="white"
      overflow="hidden"
    >
      <Flex alignItems="center" justifyContent="flex-end">
        <Text mt="1" fontSize="md">
          {title}
        </Text>
        <Spacer />
        <CloseButton onClick={handleDelete} size="md" />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <div class={styles.quantity}>
            <button onClick={decrement} class="btn minus1">
              -
            </button>
            <input
              class={styles.quantity}
              id="id_form-0-quantity"
              min="0"
              name="quantity"
              value={quantity}
              type="number"
            />
            <button onClick={increment} class="btn add1">
              +
            </button>
          </div>
        </Box>
        <Box
          mt="0"
          textAlign="center"
          as="p"
          color="black"
          lineHeight="taller"
          isTruncated
        >
          {`${currency} ${price}`}
        </Box>
        <Box>
          <Image
            fit="contain"
            mb="10"
            mr="10"
            boxSize="70px"
            fallbackSrc="https://via.placeholder.com/150"
            src={imageUrl}
            alt={`${title}-product`}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default DrawerCard;
