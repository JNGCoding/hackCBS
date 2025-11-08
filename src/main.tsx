import { createRoot } from "react-dom/client";
import { GlobalProvider } from './contexts/GlobalContext';
import App from "./App.tsx";

// @ts-ignore: allow side-effect CSS import without type declarations
import "./index.css";

createRoot(document.getElementById("root")!).render(
<GlobalProvider>
  <App />
</GlobalProvider>
);

fetch('http://localhost:8080/connection/check')
  .then(res => res.text())
  .then(data => {
    console.log('✅ Connected to Java server');
    console.log('📨 Received:', data);
  })
  .catch(err => {
    console.error('Failed to connect:', err);
  });