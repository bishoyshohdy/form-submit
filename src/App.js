import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Form from './components/Form';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher justifySelf="flex-end" />

      <Box display='flex' alignItems='center' justifyContent='center' height='90vh' >
        <Form />
        </Box>

    </ChakraProvider>
  );
}

export default App;
