import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ROUTES } from "./constants/routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Gallery from "./pages/Gallery";
import Event from "./pages/Event";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout controller: selectively renders Navbar, Footer, and ChatWidget based on path
const AppLayout = () => {
  const location = useLocation();

  // Hide Navbar, Footer, and ChatWidget on the admin dashboard and login pages to maintain visual separation
  const isAdminPage = location.pathname.startsWith(ROUTES.ADMIN_LOGIN);

  return (
    <>
      <ScrollToTop />
      {!isAdminPage && <Navbar />}

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Event />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path={ROUTES.ADMIN_LOGIN}     element={<AdminLogin />} />
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        </Routes>
      </main>

      {!isAdminPage && <Footer />}
      {!isAdminPage && <ChatWidget />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4500,
            style: {
              fontFamily: "Outfit, Inter, sans-serif",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#2563EB", secondary: "#fff" } },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
