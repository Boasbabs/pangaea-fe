import React from 'react';
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

  const ProductCard = ({product, handleAddToCart}) => {
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
  }
   
  export default ProductCard;