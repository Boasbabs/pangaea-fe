import React from 'react';
import { Flex, Box, Image, Button } from '@chakra-ui/react';

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Box key={product.id} bg="transparent" w="100%" mt="90">
      <Flex alignItems="center" justifyContent="center">
        <Image
          fit="contain"
          mb="20"
          boxSize="120px"
          fallbackSrc="https://via.placeholder.com/150"
          src={product.image_url}
          alt={`${product.title}-product`}
        />
      </Flex>
      <Box
        mt="0"
        textAlign="center"
        as="p"
        color="#4B5548"
        lineHeight="taller"
        isTruncated
        bg="transparent"
      >
        {product.title}
      </Box>
      <Box
        mt="0"
        textAlign="center"
        as="p"
        color="black"
        lineHeight="taller"
        isTruncated
      >
        From: {product.price}
      </Box>
      <Box mt="4" textAlign="center">
        <Button
          size="md"
          height="48px"
          width="200px"
          border="none"
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
          color="white"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
