import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Commands from '@/pages/Commands';
import About from '@/pages/About';
import Stats from '@/pages/Stats';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';

export default function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"         element={<Home />} />
          <Route path="/commands" element={<Commands />} />
          <Route path="/about"    element={<About />} />
          <Route path="/stats"    element={<Stats />} />
          <Route path="/privacy"  element={<PrivacyPolicy />} />
          <Route path="/terms"    element={<TermsOfService />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}
