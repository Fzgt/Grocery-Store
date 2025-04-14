import { createRoot } from 'react-dom/client'
import { Theme } from "@radix-ui/themes";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Theme appearance='dark' accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
    <App />
  </Theme>
)
