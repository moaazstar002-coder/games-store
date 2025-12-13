import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Toaster } from 'sonner';
import AnimatedRoutes from "./components/AnimatedRoutes";



function App() {
  return (
    <>
    <Toaster position="top-right" richColors />
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
