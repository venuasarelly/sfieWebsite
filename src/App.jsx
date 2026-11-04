
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import {
  MapPin,
  Mail,
  ArrowUpRight,


} from "lucide-react";

// Components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-white">

        {/* HEADER */}
        <Header />

        {/* WEBSITE PAGES */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="bg-[#062A58] text-white">

          {/* Main Footer */}
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">

            {/* Company Information */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block">
                <img
                  src="/src/assets/sfie_logo-Photoroom.png"
                  alt="SFIE Shine Forge India Enterprises"
                  className="mb-5 h-24 w-56 rounded-lg bg-white p-2 object-contain"
                />
              </Link>

              <h2 className="mb-3 text-xl font-bold">
                Shine Forge India Enterprises
              </h2>

              <p className="max-w-md text-sm leading-7 text-blue-100">
                Discover SFIE home cleaning solutions
                for kitchens, bathrooms, floors,
                laundry, and everyday household care.
              </p>

              {/* Social Links - add your actual URLs */}
              <div className="mt-6 flex gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                 
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                  
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-5 text-lg font-bold">
                Quick Links
              </h3>

              <div className="flex flex-col gap-3 text-sm text-blue-100">
                <Link to="/" className="transition hover:text-green-400">
                  Home
                </Link>

                <Link to="/about" className="transition hover:text-green-400">
                  About Us
                </Link>

                <Link to="/products" className="transition hover:text-green-400">
                  Our Products
                </Link>

                <Link to="/gallery" className="transition hover:text-green-400">
                  Gallery
                </Link>

                <Link to="/contact" className="transition hover:text-green-400">
                  Contact Us
                </Link>

                <Link
                  to="/contact?type=dealer"
                  className="inline-flex items-center gap-1 font-semibold text-green-400"
                >
                  Become a Dealer
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="mb-5 text-lg font-bold">
                Get in Touch
              </h3>

              <div className="flex flex-col gap-5 text-sm text-blue-100">

                <div className="flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="mt-1 shrink-0 text-green-400"
                  />
                  <p className="leading-6">
                    Plot 47 & 48,
                    Dwarkamai Enclave,
                    Cheeriyal,
                    Medchal-Malkajgiri,
                    Telangana - 501301,
                    India.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail
                    size={20}
                    className="shrink-0 text-green-400"
                  />
                  <Link
                    to="/contact"
                    className="hover:text-green-400"
                  >
                    Send an Enquiry
                  </Link>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center text-xs text-blue-200 md:flex-row">

              <p>
                © {new Date().getFullYear()} SFIE –
                Shine Forge India Enterprises.
                All Rights Reserved.
              </p>

              <p>
                Cleaner Homes. Brighter Everyday.
              </p>

            </div>
          </div>

        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
