import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, ArrowUpRight, ChevronRight } from "lucide-react";
import sfieLogo from "../assets/sfie_logo-Photoroom.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Our Products", path: "/products" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact Us", path: "/contact" },
];

const menuVariants = {
  hidden: { opacity: 0, y: -16, transition: { duration: 0.2 } },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  const closeMenu = () => setIsOpen(false);

  // Shrink when scrolled; hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 220 && !isOpen);
  });

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: hidden ? -130 : 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
      className={`sticky top-0 z-50 w-full border-b border-white/10 text-white backdrop-blur-xl transition-shadow duration-300 ${
        scrolled ? "shadow-[0_10px_35px_rgba(3,25,64,0.45)]" : "shadow-[0_4px_25px_rgba(3,25,64,0.2)]"
      }`}
    >
      {/* Same blue gradient as the hero, so header and hero read as one surface */}
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-r from-[#052D67] via-[#07448E] to-[#087BD2] transition-opacity duration-300 ${
          scrolled ? "opacity-[0.97]" : "opacity-100"
        }`}
      />

      {/* Drifting glow blobs (echo the hero) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-10 top-0 h-24 w-56 rounded-full bg-green-400/20 blur-3xl"
          animate={{ x: [0, 80, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-10 top-0 h-24 w-64 rounded-full bg-cyan-300/25 blur-3xl"
          animate={{ x: [0, -80, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Flowing accent line + scroll progress */}
      <div className="relative h-1 w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[length:200%_100%] bg-gradient-to-r from-[#31AD14] via-[#8EE66B] to-[#31AD14]"
          animate={{ backgroundPositionX: ["0%", "200%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-0 origin-left bg-white/70 mix-blend-overlay"
        />
      </div>

      <motion.div
        animate={{ height: scrolled ? 76 : 92 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-5 md:px-8 xl:px-12"
      >
        {/* LOGO — on a white badge so its colours stay crisp on the blue */}
        <Link to="/" onClick={closeMenu} aria-label="SFIE Home" className="flex shrink-0 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.2 }}
            whileHover={{ scale: 1.06, rotate: -1.5 }}
            whileTap={{ scale: 0.96 }}
            className="relative overflow-hidden rounded-2xl bg-white px-3 py-1.5 shadow-[0_8px_22px_rgba(3,25,64,0.35)]"
          >
            <img
              src={sfieLogo}
              alt="SFIE - Shine Forge India Enterprises"
              className={`w-auto object-contain transition-[height] duration-300 ${
                scrolled ? "h-[50px] md:h-[56px]" : "h-[58px] md:h-[68px]"
              }`}
            />
            {/* slow shine across the badge */}
            <motion.span
              className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
              animate={{ x: ["-200%", "500%"] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
            />
          </motion.div>
        </Link>

        {/* DESKTOP NAV */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex xl:gap-2">
          {navItems.map((item, i) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 180, damping: 16 }}
            >
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `group relative block whitespace-nowrap rounded-full px-4 py-2.5 text-[14px] font-semibold transition-colors duration-300 ${
                    isActive ? "text-white" : "text-blue-100 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Glass pill that glides between the active links */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-white/25 bg-white/15 backdrop-blur-md"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <motion.span className="relative inline-block" whileHover={{ y: -2 }}>
                      {item.name}
                    </motion.span>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-0.5 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-[#8EE66B]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute bottom-0.5 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-[#8EE66B] transition-all duration-300 group-hover:w-6" />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* DESKTOP CTA */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 150, damping: 16 }}
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="hidden shrink-0 lg:block"
        >
          <Link
            to="/contact?type=dealer"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#31AD14] px-5 py-3.5 text-[13px] font-bold text-white shadow-[0_8px_22px_rgba(49,173,20,0.35)]"
          >
            {/* hover: white wash rises from below */}
            <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 group-hover:translate-y-0" />
            {/* idle shine sweep */}
            <motion.span
              className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/30"
              animate={{ x: ["-150%", "450%"] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
            />
            <span className="relative transition-colors duration-300 group-hover:text-[#07377F]">Become a Dealer</span>
            <ArrowUpRight
              size={18}
              strokeWidth={2.3}
              className="relative transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#07377F]"
            />
          </Link>
        </motion.div>

        {/* MOBILE MENU BUTTON */}
        <motion.button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          whileTap={{ scale: 0.88 }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="sfie-mobile-navigation"
          className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 lg:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* MOBILE NAVIGATION */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* dimmed backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 top-[96px] -z-20 bg-[#031940]/60 backdrop-blur-sm lg:hidden"
            />

            <motion.nav
              id="sfie-mobile-navigation"
              aria-label="Mobile navigation"
              variants={menuVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="absolute left-0 right-0 top-full max-h-[calc(100dvh-96px)] overflow-y-auto border-t border-white/10 bg-gradient-to-b from-[#052D67] to-[#07559C] px-5 py-5 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <motion.div key={item.path} variants={itemVariants}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `group flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-colors ${
                          isActive
                            ? "border border-white/20 bg-white/15 text-[#8EE66B]"
                            : "border border-transparent text-blue-100 hover:bg-white/10 hover:text-white"
                        }`
                      }
                    >
                      {item.name}
                      <ChevronRight
                        size={17}
                        className="opacity-60 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </NavLink>
                  </motion.div>
                ))}

                <motion.div variants={itemVariants}>
                  <Link
                    to="/contact?type=dealer"
                    onClick={closeMenu}
                    className="relative mt-3 flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#31AD14] px-5 py-4 text-sm font-bold text-white"
                  >
                    <motion.span
                      className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/30"
                      animate={{ x: ["-150%", "450%"] }}
                      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5 }}
                    />
                    <span className="relative">Become a Dealer</span>
                    <ArrowUpRight size={18} className="relative" />
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}