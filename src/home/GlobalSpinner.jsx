// src/components/GlobalSpinner.js
import React from 'react';
import { Spinner as ChakraSpinner } from '@chakra-ui/react';

const GlobalSpinner = () => (
  <div className="spinner-overlay">
    <ChakraSpinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
    <style jsx>{`
      .spinner-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
    `}</style>
  </div>
);

export default GlobalSpinner;
