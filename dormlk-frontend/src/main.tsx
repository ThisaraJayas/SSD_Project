import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/store.ts'

// Load Google Ads only in production
if (process.env.NODE_ENV === 'production') {
  const script = document.createElement('script');
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7741658003653293';
  script.async = true;
  script.crossOrigin = 'anonymous';
  
  // Add error handling
  script.onerror = () => {
    console.warn('Failed to load Google Ads script');
  };
  
  document.head.appendChild(script);
  
  // Initialize ads
  ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <ChakraProvider>
      <App/>
    </ChakraProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
