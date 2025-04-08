import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme, ThemePanel } from "@radix-ui/themes";
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme appearance='dark' accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
      <App />
      {/* <ThemePanel /> */}
    </Theme>
  </StrictMode>,
)
