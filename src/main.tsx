import { createRoot } from "react-dom/client";
import { GlobalProvider } from './contexts/GlobalContext';
import { ClerkProvider } from '@clerk/clerk-react'
import App from "./App.tsx";

// @ts-ignore: allow side-effect CSS import without type declarations
import "./index.css";
import { StrictMode } from "react";
import { sendPlainText } from "./services/BackendBridge.ts";

let PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
} else {
  //* This line is putten here for just demonstration purposes.
  PUBLISHABLE_KEY = "pk_test_Ymxlc3NlZC1tb3NxdWl0by0zNi5jbGVyay5hY2NvdW50cy5kZXYk";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ClerkProvider>
  </StrictMode>
);

fetch('http://localhost:8080/connection/check')
  .then(res => res.text())
  .then(data => {
    console.log('Connected to Java server');
    console.log('Received:', data);
  })
  .catch(err => {
    console.error('Failed to connect:', err);
  });