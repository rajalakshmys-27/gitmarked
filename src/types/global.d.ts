/// <reference types="vite/client" />

declare global {
  interface Window {
    process: any;
  }
  
  const process: {
    env: {
      NODE_ENV: 'development' | 'production' | 'test';
      [key: string]: string | undefined;
    };
  };
}
