import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from 'sonner';
import AnimatedRoutes from "./components/AnimatedRoutes";



function App() {
  return (
    <div data-testid="app">
    <Toaster position="top-right" richColors />
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
