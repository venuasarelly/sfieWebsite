import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
  useMotionValueEvent,
  useMotionTemplate,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Droplets,
  Leaf,
  PackageCheck,
  Handshake,
  CheckCircle2,
  MapPin,
  ChevronRight,
  Home as HomeIcon,
  SprayCan,
  Shirt,
  Bath,
  CookingPot,
  Layers,
  MessageCircle,
} from "lucide-react";

// ---------- Assets ----------
import heroProducts from "../assets/hero-products.png";
import sfieLogo from "../assets/sfie_logo-Photoroom.png";
import bathroomCleaner from "../assets/products/bathroom_cleaner-Photoroom.png";
import brassCopper from "../assets/products/brass_copper-Photoroom.png";
import detergentLiquid from "../assets/products/detergent_liquid-Photoroom.png";
import dishwashGel from "../assets/products/dishwash_gel-Photoroom.png";
import dishwashLiquid from "../assets/products/dishwash_liquid-Photoroom.png";
import floorCleaner from "../assets/products/floor_cleaner-Photoroom.png";
import glassCleaner from "../assets/products/glass_cleaner-Photoroom.png";
import roomFreshener from "../assets/products/room_freshner-Photoroom.png";
import toiletCleaner from "../assets/products/toilet_cleaner-Photoroom.png";

// SFIE brand: Blue #07377F · Royal Blue #087BD2 · Green #31AD14

const categories = [
  { title: "Kitchen Care", description: "Dishwash liquids, gels and kitchen cleaners", icon: CookingPot, tint: "#F59E0B", image: dishwashLiquid, wide: true },
  { title: "Bathroom Care", description: "Bathroom, toilet and tap cleaning solutions", icon: Bath, tint: "#087BD2", image: toiletCleaner },
  { title: "Floor Care", description: "Floor, surface and marble cleaning", icon: Layers, tint: "#31AD14", image: floorCleaner },
  { title: "Laundry Care", description: "Liquid detergent and fabric conditioner", icon: Shirt, tint: "#A855F7", image: detergentLiquid },
  { title: "Personal Care", description: "Everyday handwash solutions", icon: Droplets, tint: "#EC4899", image: null },
  { title: "Specialty Care", description: "Glass, metal and other surface cleaners", icon: SprayCan, tint: "#06B6D4", image: glassCleaner, wide: true },
];

const products = [
  { name: "Dishwash Liquid", category: "Kitchen Care", image: dishwashLiquid, color: "from-yellow-50 to-orange-100" },
  { name: "Dishwash Gel", category: "Kitchen Care", image: dishwashGel, color: "from-lime-50 to-green-100" },
  { name: "Bathroom Cleaner", category: "Bathroom Care", image: bathroomCleaner, color: "from-blue-50 to-cyan-100" },
  { name: "Toilet Cleaner", category: "Bathroom Care", image: toiletCleaner, color: "from-indigo-50 to-blue-100" },
  { name: "Floor Cleaner", category: "Floor Care", image: floorCleaner, color: "from-green-50 to-emerald-100" },
  { name: "Detergent Liquid", category: "Laundry Care", image: detergentLiquid, color: "from-purple-50 to-fuchsia-100" },
  { name: "Glass Cleaner", category: "Specialty Care", image: glassCleaner, color: "from-sky-50 to-blue-100" },
  { name: "Brass & Copper Cleaner", category: "Specialty Care", image: brassCopper, color: "from-amber-50 to-yellow-100" },
  { name: "Room Freshener", category: "Specialty Care", image: roomFreshener, color: "from-rose-50 to-pink-100" },
];

const filters = ["All", "Kitchen Care", "Bathroom Care", "Floor Care", "Laundry Care", "Specialty Care"];

const benefits = [
  { icon: PackageCheck, title: "Wide Product Range", description: "Cleaning solutions for kitchens, bathrooms, floors, laundry and more." },
  { icon: Leaf, title: "Everyday Home Care", description: "Products designed for different household cleaning needs." },
  { icon: Handshake, title: "Business Partnerships", description: "Dealer and distributor enquiries are welcome." },
  { icon: MessageCircle, title: "Easy Enquiries", description: "Contact our team for product details and bulk-order information." },
];

// ---------- Shared animation variants ----------
const container = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const rise = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const pop = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 16 } },
};

// ---------- Building blocks ----------

// Scroll progress bar pinned to top
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-[#31AD14] via-[#8EE66B] to-[#087BD2]"
    />
  );
}

// Rising soap bubbles (hero)
function Bubbles({ count = 16 }) {
  const reduce = useReducedMotion();
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 10 + ((i * 17) % 38),
        left: (i * 53) % 100,
        duration: 9 + ((i * 7) % 9),
        delay: (i * 0.9) % 8,
        drift: ((i % 2 ? 1 : -1) * (14 + ((i * 5) % 30))),
      })),
    [count]
  );
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((b) => (
        <motion.span
          key={b.id}
          className="absolute bottom-[-60px] rounded-full border border-white/40 bg-white/10 backdrop-blur-[1px]"
          style={{ width: b.size, height: b.size, left: `${b.left}%` }}
          animate={{ y: [0, -640], x: [0, b.drift, -b.drift, 0], opacity: [0, 0.9, 0.9, 0], scale: [0.6, 1, 1.15] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// Headline that reveals word by word
function AnimatedWords({ text, className = "", delay = 0 }) {
  return (
    <motion.span
      variants={container(0.09, delay)}
      initial="hidden"
      animate="show"
      className={`inline-block ${className}`}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: 0, rotate: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="inline-block"
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      variants={container(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <motion.span
        variants={pop}
        className="mb-3 inline-block rounded-full bg-green-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#31AD14]"
      >
        {eyebrow}
      </motion.span>
      <motion.h2 variants={rise} className="text-3xl font-extrabold tracking-tight text-[#07377F] md:text-4xl">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={rise} className="mt-4 text-base leading-7 text-slate-500">
          {description}
        </motion.p>
      )}
      <motion.div
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, delay: 0.3 } } }}
        className="mx-auto mt-6 h-1 w-20 origin-center rounded-full bg-gradient-to-r from-[#31AD14] to-[#087BD2]"
      />
    </motion.div>
  );
}

// Animated wave divider
function Wave({ fill = "#F8FBFF", flip = false }) {
  return (
    <div className={`pointer-events-none relative h-14 w-full overflow-hidden ${flip ? "rotate-180" : ""}`}>
      <motion.svg
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 h-full w-[200%]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <path
          fill={fill}
          d="M0 60 C 240 120 480 0 720 60 S 1200 120 1440 60 C 1680 120 1920 0 2160 60 S 2640 120 2880 60 V120 H0Z"
        />
      </motion.svg>
    </div>
  );
}

// Infinite marquee strip of product names
function Marquee() {
  const items = products.map((p) => p.name);
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-blue-100 bg-white py-4">
      <motion.div
        className="flex w-max gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {row.map((name, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap text-sm font-extrabold text-[#07377F]">
            {name}
            <Sparkles size={16} className="text-[#31AD14]" />
          </span>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

// 3D tilt product card
function ProductCard({ product }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -20 }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      style={{ perspective: 900 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -8 }}
        className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-2xl"
      >
        <div className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${product.color} sm:h-64`}>
          {/* glow behind product */}
          <motion.div
            className="absolute h-40 w-40 rounded-full bg-white/70 blur-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={product.image}
            alt={`SFIE ${product.name}`}
            loading="lazy"
            style={{ translateZ: 50 }}
            whileHover={{ scale: 1.12, rotate: -4 }}
            transition={{ type: "spring", stiffness: 250, damping: 12 }}
            className="relative h-full w-full object-contain p-5 drop-shadow-xl"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[#07377F] shadow-sm sm:text-xs">
            SFIE
          </span>
          {/* shine sweep on hover */}
          <motion.span
            initial={{ x: "-120%" }}
            whileHover={{ x: "120%" }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-white/40"
          />
        </div>

        <div className="p-4 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#31AD14]">{product.category}</p>
          <h3 className="mt-2 text-base font-extrabold text-[#07377F] sm:text-xl">{product.name}</h3>
          <Link
            to="/products"
            className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#087BD2] transition-colors hover:text-[#31AD14] sm:text-sm"
          >
            View Product
            <motion.span whileHover={{ x: 3, y: -3 }}>
              <ArrowUpRight size={16} />
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------- Cinematic hero (product stage carousel) ----------
const INTERVAL = 5500;

const slides = [
  { key: "dishwash", name: "Dishwash Liquid", category: "Kitchen Care", lines: ["Sparkling", "Kitchens."], text: "Everyday dishwashing made simple, from plates to pans.", image: dishwashLiquid, tint: "#F59E0B" },
  { key: "bathroom", name: "Bathroom Cleaner", category: "Bathroom Care", lines: ["Fresh", "Bathrooms."], text: "Keep tiles, taps and fittings looking clean every day.", image: bathroomCleaner, tint: "#22D3EE" },
  { key: "floor", name: "Floor Cleaner", category: "Floor Care", lines: ["Shining", "Floors."], text: "Floor and surface care for every room in the house.", image: floorCleaner, tint: "#31AD14" },
  { key: "laundry", name: "Detergent Liquid", category: "Laundry Care", lines: ["Brighter", "Laundry."], text: "Liquid detergent for everyday washing.", image: detergentLiquid, tint: "#A855F7" },
  { key: "glass", name: "Glass Cleaner", category: "Specialty Care", lines: ["Crystal", "Clear Glass."], text: "Streak-free care for windows, mirrors and glass surfaces.", image: glassCleaner, tint: "#38BDF8" },
];

const SPLASH_A = "M250 40 C 360 30 460 120 450 240 C 440 360 340 470 230 450 C 110 430 40 330 60 220 C 80 110 150 50 250 40Z";
const SPLASH_B = "M260 60 C 380 70 440 150 430 260 C 420 380 320 450 220 430 C 100 410 50 310 70 200 C 90 90 170 50 260 60Z";

// depth = parallax strength. High depth + blur = foreground bubble (depth of field)
const particles = [
  { depth: 3, size: 74, left: "2%", top: "62%", blur: 5, delay: 0 },
  { depth: 2.6, size: 56, left: "91%", top: "70%", blur: 4, delay: 1 },
  { depth: 1, size: 16, left: "22%", top: "18%", blur: 0, delay: 0.5 },
  { depth: 1.4, size: 24, left: "78%", top: "14%", blur: 0, delay: 1.5 },
  { depth: 2, size: 38, left: "11%", top: "38%", blur: 1.5, delay: 0.8 },
  { depth: 0.8, size: 12, left: "58%", top: "8%", blur: 0, delay: 2 },
  { depth: 1.8, size: 30, left: "87%", top: "42%", blur: 1, delay: 0.3 },
  { depth: 0.6, size: 10, left: "34%", top: "76%", blur: 0, delay: 1.2 },
  { depth: 2.8, size: 64, left: "47%", top: "90%", blur: 6, delay: 0.6 },
  { depth: 1.2, size: 20, left: "68%", top: "30%", blur: 0, delay: 1.8 },
];

function Particle({ sx, sy, depth, size, left, top, blur, delay }) {
  const x = useTransform(sx, [-0.5, 0.5], [-28 * depth, 28 * depth]);
  const y = useTransform(sy, [-0.5, 0.5], [-20 * depth, 20 * depth]);
  return (
    <motion.span
      style={{ x, y, left, top, width: size, height: size, filter: `blur(${blur}px)` }}
      className="pointer-events-none absolute"
    >
      <motion.span
        className="block h-full w-full rounded-full border border-white/50"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,.95), rgba(255,255,255,.22) 45%, rgba(255,255,255,.06) 70%)",
        }}
        animate={{ y: [0, -22 * depth, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 5 + depth * 1.5, delay, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.span>
  );
}

// Water droplets that burst out whenever the product changes
function Burst() {
  const drops = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    const r = 150 + (i % 3) * 50;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.8 - 40, s: 6 + (i % 4) * 5 };
  });
  return (
    <div className="pointer-events-none absolute left-1/2 top-[46%]">
      {drops.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/80"
          style={{ width: d.s, height: d.s }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{ x: d.x, y: d.y, scale: [0, 1.2, 0.8], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, delay: 0.25, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// Sweeping ribbon, redrawn on every slide
function Ribbon({ tint, slideKey }) {
  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
    >
      <defs>
        <linearGradient id="ribbon-grad" x1="0" x2="1">
          <stop offset="0%" stopColor={tint} stopOpacity="0" />
          <stop offset="45%" stopColor={tint} stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <motion.path
        key={`a-${slideKey}`}
        d="M-40 620 C 200 580 380 300 640 170 S 980 50 1240 90"
        stroke="url(#ribbon-grad)"
        strokeWidth="16"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      <motion.path
        key={`b-${slideKey}`}
        d="M-40 660 C 220 640 420 360 660 230 S 1000 110 1240 150"
        stroke="rgba(255,255,255,.5)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: 0.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

function HeroStage() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearTimeout(t);
  }, [index]);

  // Mouse parallax shared by every layer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 16 });
  const sy = useSpring(my, { stiffness: 70, damping: 16 });
  const prodX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const prodY = useTransform(sy, [-0.5, 0.5], [-14, 14]);
  const chipX = useTransform(sx, [-0.5, 0.5], [18, -18]);

  // Scroll parallax: stage drifts slower than the page
  const { scrollY } = useScroll();
  const stageScroll = useTransform(scrollY, [0, 600], [0, 90]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section onMouseMove={onMove} onMouseLeave={onLeave} className="relative isolate overflow-hidden text-white">
      {/* Crossfading backgrounds: brand blue blending into each product's tint */}
      {slides.map((s, i) => (
        <motion.div
          key={s.key}
          initial={false}
          className="absolute inset-0 -z-10"
          style={{ background: `linear-gradient(135deg, #052D67 0%, #07559C 50%, ${s.tint} 140%)` }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        />
      ))}

      <Ribbon tint={slide.tint} slideKey={slide.key} />

      {particles.map((p, i) => (
        <Particle key={i} sx={sx} sy={sy} {...p} />
      ))}

      <div className="relative mx-auto grid min-h-[660px] max-w-7xl items-center gap-4 px-6 pb-24 pt-10 lg:grid-cols-12 lg:px-10">
        {/* ---- Text ---- */}
        <div className="relative z-10 lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-green-200 backdrop-blur-md"
          >
            <motion.span animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.25, 1] }} transition={{ duration: 2.4, repeat: Infinity }}>
              <Sparkles size={16} />
            </motion.span>
            Shine Forge India Enterprises
          </motion.div>

          <div className="min-h-[200px] sm:min-h-[230px]">
            <AnimatePresence mode="wait">
              <motion.div key={slide.key} exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}>
                <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[62px]">
                  <AnimatedWords text={slide.lines[0]} delay={0.1} />
                  <br />
                  <AnimatedWords text={slide.lines[1]} delay={0.35} className="text-[#8EE66B]" />
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.6 }}
                  className="mt-6 max-w-md text-base leading-8 text-blue-100 md:text-lg"
                >
                  {slide.text}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            variants={container(0.15, 0.9)}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.div variants={pop} whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/products"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#31AD14] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-green-950/20"
              >
                <motion.span
                  className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/30"
                  animate={{ x: ["-150%", "450%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                />
                <span className="relative">Explore Products</span>
                <ArrowRight size={19} className="relative transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div variants={pop} whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact?type=dealer"
                className="inline-flex items-center gap-3 rounded-xl border border-white/40 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/15"
              >
                Become a Dealer
                <ArrowUpRight size={19} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ---- Product stage ---- */}
        <motion.div style={{ y: stageScroll }} className="relative flex h-[470px] items-end justify-center md:h-[600px] lg:col-span-7">
          {/* water splash blob */}
          <AnimatePresence mode="wait">
            <motion.svg
              key={slide.key}
              viewBox="0 0 500 500"
              className="absolute bottom-[40px] h-[380px] w-[380px] md:h-[520px] md:w-[520px]"
              initial={{ scale: 0.2, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.3, opacity: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 14 }}
            >
              <motion.path
                d={SPLASH_A}
                animate={{ d: [SPLASH_A, SPLASH_B, SPLASH_A] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                fill="rgba(255,255,255,0.16)"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
              />
            </motion.svg>
          </AnimatePresence>

          {/* ripple rings */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute bottom-[64px] h-[260px] w-[260px] rounded-full border border-white/30 md:h-[340px] md:w-[340px]"
              animate={{ scale: [0.6, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 4, delay: i * 1.3, repeat: Infinity, ease: "easeOut" }}
            />
          ))}

          <AnimatePresence mode="wait">
            <Burst key={slide.key} />
          </AnimatePresence>

          {/* podium */}
          <div className="absolute bottom-0 left-1/2 h-24 w-[88%] max-w-[460px] -translate-x-1/2">
            <motion.div
              className="absolute inset-x-[8%] -top-2 h-24 rounded-[100%] blur-2xl"
              style={{ background: slide.tint }}
              animate={{ opacity: [0.25, 0.55, 0.25] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            />
            <div className="absolute bottom-0 h-16 w-full rounded-[100%] border border-white/30 bg-white/15 backdrop-blur-md" />
            <div className="absolute inset-x-[10%] bottom-6 h-14 rounded-[100%] border border-white/40 bg-white/25 backdrop-blur-md" />
            <motion.div
              className="absolute bottom-[34px] left-1/2 h-5 w-40 -translate-x-1/2 rounded-[100%] bg-black/25 blur-md"
              animate={{ scaleX: [1, 0.8, 1], opacity: [0.35, 0.2, 0.35] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* floating product */}
          <motion.div style={{ x: prodX, y: prodY }} className="absolute bottom-[58px] z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.key}
                initial={{ opacity: 0, y: 140, scale: 0.55, rotate: -20 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, y: -90, scale: 0.8, rotate: 14 }}
                transition={{ type: "spring", stiffness: 90, damping: 13 }}
              >
                <motion.img
                  src={slide.image}
                  alt={`SFIE ${slide.name}`}
                  className="h-[320px] w-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)] md:h-[440px]"
                  animate={{ y: [0, -16, 0], rotate: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* glass info chip */}
          <motion.div style={{ x: chipX }} className="absolute right-0 top-6 z-20 hidden w-56 md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.key}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl border border-white/30 bg-white/15 p-4 backdrop-blur-lg"
              >
                <p className="text-xs font-semibold text-green-200">{slide.category}</p>
                <p className="mt-1 text-lg font-extrabold">{slide.name}</p>
                <Link to="/products" className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#07377F]">
                  View Product
                  <ArrowUpRight size={14} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* carousel dots with progress fill */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((s, i) => (
          <motion.button
            key={s.key}
            aria-label={`Show ${s.name}`}
            onClick={() => setIndex(i)}
            animate={{ width: i === index ? 44 : 10 }}
            className="relative h-2.5 overflow-hidden rounded-full bg-white/35"
          >
            {i === index && (
              <motion.span
                key={`fill-${index}`}
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: INTERVAL / 1000, ease: "linear" }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* bottom stripe */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-2 bg-[length:200%_100%] bg-gradient-to-r from-[#31AD14] via-[#8EE66B] to-[#31AD14]"
        animate={{ backgroundPositionX: ["0%", "200%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
}

// ---------- Category card (Explore Our Range) ----------
function CategoryCard({ c }) {
  const Icon = c.icon;
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  // Spotlight that follows the cursor inside the card
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, ${c.tint}40, transparent 70%)`;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 60, scale: 0.94 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
        hover: { y: -8 },
      }}
      whileHover="hover"
      className={`h-full ${c.wide ? "sm:col-span-2" : ""}`}
    >
      <Link
        to="/products"
        onMouseMove={onMove}
        style={{ "--t": c.tint, background: `linear-gradient(135deg, #ffffff 0%, ${c.tint}1F 100%)` }}
        className="group relative flex h-full min-h-[300px] overflow-hidden rounded-[28px] border border-white p-7 shadow-[0_10px_40px_rgba(7,55,127,0.08)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(7,55,127,0.16)]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        {/* big faint rotating icon */}
        <motion.div
          className="pointer-events-none absolute -right-8 -top-8 opacity-[0.08]"
          style={{ color: c.tint }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <Icon size={210} strokeWidth={1.2} />
        </motion.div>

        {/* pulsing colour blob behind the visual */}
        <motion.div
          className="pointer-events-none absolute -bottom-10 -right-10 h-60 w-60 rounded-full blur-2xl"
          style={{ background: `${c.tint}55` }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* visual: product image, or bubbles when there is none */}
        {c.image ? (
          <motion.div
            className={`pointer-events-none absolute bottom-3 right-3 ${c.wide ? "h-[88%]" : "h-[52%]"}`}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5 + (c.title.length % 3), repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src={c.image}
              alt={`${c.title} product`}
              loading="lazy"
              variants={{ hover: { scale: 1.12, rotate: -6, y: -8 } }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="h-full w-auto object-contain drop-shadow-[0_18px_22px_rgba(7,55,127,0.25)]"
            />
          </motion.div>
        ) : (
          <div className="pointer-events-none absolute bottom-6 right-6 h-32 w-32">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute rounded-full border border-white/70"
                style={{
                  width: 36 + i * 22,
                  height: 36 + i * 22,
                  right: i * 14,
                  bottom: i * 10,
                  background: `radial-gradient(circle at 30% 30%, #fff, ${c.tint}33)`,
                }}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 3 + i, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
            <Droplets className="absolute right-6 top-2" size={34} style={{ color: c.tint }} />
          </div>
        )}

        {/* text */}
        <div className={`relative z-10 flex flex-col justify-between ${c.wide ? "max-w-[52%]" : "max-w-full"}`}>
          <div>
            <motion.div
              variants={{ hover: { rotate: [0, -12, 12, -6, 0], scale: 1.1 } }}
              transition={{ duration: 0.6 }}
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: `${c.tint}22`, color: c.tint }}
            >
              <Icon size={27} />
            </motion.div>
            <h3 className="text-xl font-extrabold text-[#07377F] md:text-2xl">{c.title}</h3>
            <p className="mt-2 max-w-[230px] text-sm leading-6 text-slate-600">{c.description}</p>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm font-bold" style={{ color: c.tint }}>
            Explore
            <motion.span
              variants={{ hover: { rotate: -45, scale: 1.1 } }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-current bg-white transition-colors duration-300 group-hover:border-transparent group-hover:bg-[var(--t)] group-hover:text-white"
            >
              <ArrowRight size={16} />
            </motion.span>
          </div>
        </div>

        {/* bottom accent line draws in on hover */}
        <motion.span
          variants={{ hover: { scaleX: 1 } }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.45 }}
          className="absolute bottom-0 left-0 h-1.5 w-full origin-left"
          style={{ background: `linear-gradient(90deg, ${c.tint}, #087BD2)` }}
        />
      </Link>
    </motion.div>
  );
}

// ---------- Scroll showcase: sticky stage, one product after another ----------
const showcaseItems = [
  { key: "dishwash-liquid", word: "Liquid", name: "Dishwash Liquid", category: "Kitchen Care", text: "Everyday dishwashing made simple, from plates to pans.", image: dishwashLiquid, tint: "#F59E0B" },
  { key: "dishwash-gel", word: "Gel", name: "Dishwash Gel", category: "Kitchen Care", text: "Dishwash gel for everyday kitchen use.", image: dishwashGel, tint: "#84CC16" },
  { key: "bathroom", word: "Bathroom", name: "Bathroom Cleaner", category: "Bathroom Care", text: "Keep tiles, taps and fittings looking clean.", image: bathroomCleaner, tint: "#22D3EE" },
  { key: "toilet", word: "Toilet", name: "Toilet Cleaner", category: "Bathroom Care", text: "Toilet cleaning made simple for daily home care.", image: toiletCleaner, tint: "#6366F1" },
  { key: "floor", word: "Floor", name: "Floor Cleaner", category: "Floor Care", text: "Floor and surface care for every room in the house.", image: floorCleaner, tint: "#31AD14" },
  { key: "detergent", word: "Laundry", name: "Detergent Liquid", category: "Laundry Care", text: "Liquid detergent for everyday laundry.", image: detergentLiquid, tint: "#A855F7" },
  { key: "glass", word: "Glass", name: "Glass Cleaner", category: "Specialty Care", text: "Care for windows, mirrors and glass surfaces.", image: glassCleaner, tint: "#38BDF8" },
  { key: "brass", word: "Brass", name: "Brass & Copper Cleaner", category: "Specialty Care", text: "Care for brass, copper and other metal surfaces.", image: brassCopper, tint: "#D97706" },
  { key: "freshener", word: "Fresh", name: "Room Freshener", category: "Specialty Care", text: "Add a fresh touch to every room in your home.", image: roomFreshener, tint: "#EC4899" },
];

const swapVariants = {
  enter: (d) => ({ opacity: 0, y: d * 180, scale: 0.6, rotate: d * -16 }),
  center: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 110, damping: 15 } },
  exit: (d) => ({ opacity: 0, y: d * -160, scale: 0.7, rotate: d * 16, transition: { duration: 0.35 } }),
};

function Showcase() {
  const ref = useRef(null);
  const n = showcaseItems.length;
  const [state, setState] = useState({ i: 0, dir: 1 });
  const item = showcaseItems[state.i];

  // The section is tall; the inner stage is sticky. Scrolling through it steps through the products.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
    setState((s) => (s.i === i ? s : { i, dir: i > s.i ? 1 : -1 }));
  });

  // Continuous motion inside each product's scroll segment
  const sway = useTransform(scrollYProgress, (p) => (((p * n) % 1) - 0.5) * 16);
  const lift = useTransform(scrollYProgress, (p) => Math.sin(((p * n) % 1) * Math.PI) * -18);

  const jumpTo = (i) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / n) * total, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      style={{ height: `${n * 60 + 40}vh` }}
      className="relative bg-gradient-to-b from-[#EAF4FF] to-white"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 pt-20">
        {/* tinted glow crossfades with each product */}
        {showcaseItems.map((s, idx) => (
          <motion.div
            key={s.key}
            initial={false}
            animate={{ opacity: idx === state.i ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(60% 60% at 50% 55%, ${s.tint}33, transparent 70%)` }}
          />
        ))}

        {/* giant outlined word behind the product */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.key}
            initial={{ opacity: 0, x: 140 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -140 }}
            transition={{ duration: 0.5 }}
            style={{ WebkitTextStroke: `2px ${item.tint}55` }}
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[26vw] font-extrabold leading-none text-transparent lg:text-[14vw]"
          >
            {item.word}
          </motion.div>
        </AnimatePresence>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-4 lg:grid-cols-12 lg:gap-8">
          {/* Left: heading + progress rail */}
          <div className="hidden lg:col-span-3 lg:block">
            <h2 className="text-3xl font-extrabold leading-tight text-[#07377F]">Made for every corner of your home</h2>
            <div className="relative mt-8 pl-6">
              <div className="absolute bottom-1 left-0 top-1 w-0.5 rounded-full bg-blue-100" />
              <motion.div
                style={{ scaleY: scrollYProgress }}
                className="absolute bottom-1 left-0 top-1 w-0.5 origin-top rounded-full bg-gradient-to-b from-[#31AD14] to-[#087BD2]"
              />
              <ul className="space-y-2">
                {showcaseItems.map((s, idx) => {
                  const active = idx === state.i;
                  return (
                    <li key={s.key}>
                      <motion.button
                        type="button"
                        onClick={() => jumpTo(idx)}
                        animate={{ x: active ? 8 : 0, opacity: active ? 1 : 0.5 }}
                        whileHover={{ opacity: 1 }}
                        className="flex items-center gap-3 text-left text-sm font-bold text-[#07377F]"
                      >
                        <motion.span
                          animate={{ scale: active ? 1.5 : 1, backgroundColor: active ? s.tint : "#BFDBFE" }}
                          className="h-2 w-2 rounded-full"
                        />
                        {s.name}
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Centre: product stage */}
          <div className="relative flex h-[320px] items-center justify-center sm:h-[420px] lg:col-span-5 lg:h-[560px]">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute h-[260px] w-[260px] rounded-full border-2 sm:h-[320px] sm:w-[320px]"
                style={{ borderColor: `${item.tint}55` }}
                animate={{ scale: [0.5, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 4.5, delay: i * 1.5, repeat: Infinity, ease: "easeOut" }}
              />
            ))}

            {/* floor shadow */}
            <motion.div
              className="absolute bottom-6 h-6 w-48 rounded-[100%] bg-[#07377F]/25 blur-md sm:bottom-10"
              animate={{ scaleX: [1, 0.8, 1], opacity: [0.4, 0.2, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div style={{ rotate: sway, y: lift }} className="absolute inset-0">
              <AnimatePresence custom={state.dir} initial={false}>
                <motion.div
                  key={item.key}
                  custom={state.dir}
                  variants={swapVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.img
                    src={item.image}
                    alt={`SFIE ${item.name}`}
                    className="h-[270px] w-auto object-contain drop-shadow-[0_40px_40px_rgba(7,55,127,0.3)] sm:h-[360px] lg:h-[500px]"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right: details for the current product */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.key}
                variants={container(0.1)}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
              >
                <motion.span
                  variants={pop}
                  className="inline-block rounded-full px-4 py-1.5 text-xs font-bold"
                  style={{ background: `${item.tint}22`, color: item.tint === "#84CC16" ? "#4D7C0F" : item.tint }}
                >
                  {item.category}
                </motion.span>
                <motion.h3 variants={rise} className="mt-4 text-3xl font-extrabold leading-tight text-[#07377F] md:text-5xl">
                  {item.name}
                </motion.h3>
                <motion.p variants={rise} className="mt-4 max-w-sm text-base leading-8 text-slate-600">
                  {item.text}
                </motion.p>
                <motion.div variants={rise} className="mt-7 flex flex-wrap items-center gap-4">
                  <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-3 rounded-full bg-[#07377F] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#087BD2]"
                    >
                      View Product
                      <ArrowUpRight size={18} />
                    </Link>
                  </motion.div>
                  <span className="text-sm font-bold text-slate-400">
                    {String(state.i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* mobile dots */}
            <div className="mt-6 flex gap-2 lg:hidden">
              {showcaseItems.map((s, idx) => (
                <motion.button
                  key={s.key}
                  type="button"
                  aria-label={`Show ${s.name}`}
                  onClick={() => jumpTo(idx)}
                  animate={{ width: idx === state.i ? 28 : 8, backgroundColor: idx === state.i ? s.tint : "#BFDBFE" }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>

        {/* scroll hint, fades out after the first product */}
        <motion.div
          animate={{ opacity: state.i === 0 ? 1 : 0 }}
          className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-bold text-[#07377F]/60"
        >
          Scroll to explore
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <ArrowRight size={16} className="rotate-90" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Page ----------
export default function Home() {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="w-full bg-white">
      <ScrollProgress />

      <HeroStage />

      <Marquee />

      <Showcase />

      {/* ============ CATEGORIES ============ */}
      <section className="relative overflow-hidden bg-[#F8FBFF] px-6 py-20 lg:py-28">
        <motion.div
          className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#087BD2]/10 blur-3xl"
          animate={{ x: [0, 70, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#31AD14]/10 blur-3xl"
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage: "radial-gradient(#087BD2 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Explore Our Range"
            title="Cleaning Solutions for Every Space"
            description="Discover products across our home cleaning and care categories."
          />

          <motion.div
            variants={container(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-5 sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-4"
          >
            {categories.map((c) => (
              <CategoryCard key={c.title} c={c} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="bg-white px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Collection"
            title="Explore SFIE Products"
            description="Browse some of our everyday home cleaning solutions."
          />

          {/* Filter pills with sliding highlight */}
          <motion.div
            variants={container(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-10 flex flex-wrap justify-center gap-2"
          >
            {filters.map((f) => (
              <motion.button
                key={f}
                variants={pop}
                whileTap={{ scale: 0.94 }}
                onClick={() => setActive(f)}
                className={`relative rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                  active === f ? "text-white" : "text-[#07377F] hover:text-[#087BD2]"
                }`}
              >
                {active === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-[#07377F]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </motion.button>
            ))}
          </motion.div>

          <motion.div layout className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-7">
            <AnimatePresence mode="popLayout">
              {shown.map((p) => (
                <ProductCard key={p.name} product={p} />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <motion.div className="inline-block" whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/products"
                className="inline-flex items-center gap-3 rounded-xl bg-[#07377F] px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-[#087BD2]"
              >
                View All Products
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ WHY SFIE ============ */}
      <section className="bg-[#F4F9FF] px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why SFIE"
            title="Your Home Cleaning Partner"
            description="Explore what SFIE brings to everyday household care and business partnerships."
          />

          <motion.div
            variants={container(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  variants={pop}
                  whileHover="hover"
                  className="rounded-2xl border border-blue-100 bg-white p-7 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl"
                >
                  <motion.div
                    variants={{ hover: { rotateY: 360, scale: 1.1 } }}
                    transition={{ duration: 0.7 }}
                    className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50"
                  >
                    <Icon size={30} className="text-[#087BD2]" />
                  </motion.div>
                  <h3 className="text-lg font-extrabold text-[#07377F]">{b.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{b.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="bg-white px-6 py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-50 to-green-50 p-8"
          >
            <motion.div
              className="absolute h-72 w-72 rounded-full border-2 border-dashed border-[#087BD2]/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute -top-2 left-1/2 h-4 w-4 rounded-full bg-[#31AD14]" />
            </motion.div>
            <motion.div
              className="absolute left-5 top-5 h-24 w-24 rounded-full bg-green-200/50 blur-xl"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.img
              src={sfieLogo}
              alt="Shine Forge India Enterprises"
              className="relative z-10 w-full max-w-[320px] object-contain"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute bottom-5 right-5 rounded-xl bg-white px-5 py-3 shadow-lg"
            >
              <p className="text-sm font-extrabold text-[#07377F]">SFIE</p>
              <p className="text-xs text-slate-500">Home Cleaning Products</p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={container(0.14)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span
              variants={pop}
              className="mb-4 inline-block rounded-full bg-green-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#31AD14]"
            >
              About Our Company
            </motion.span>
            <motion.h2 variants={rise} className="text-3xl font-extrabold leading-tight text-[#07377F] md:text-4xl">
              Welcome to
              <br />
              <span className="text-[#31AD14]">Shine Forge India Enterprises</span>
            </motion.h2>
            <motion.p variants={rise} className="mt-6 text-base leading-8 text-slate-600">
              SFIE offers a range of home cleaning products for everyday household needs, including kitchen care,
              bathroom cleaning, floor care, laundry solutions and more.
            </motion.p>
            <motion.p variants={rise} className="mt-4 text-base leading-8 text-slate-600">
              We also welcome enquiries from dealers, distributors and businesses interested in exploring our product range.
            </motion.p>
            <motion.div variants={rise} className="mt-7 flex items-center gap-3 text-sm font-semibold text-[#07377F]">
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                <MapPin size={20} className="text-[#31AD14]" />
              </motion.span>
              Telangana, India
            </motion.div>
            <motion.div variants={rise} className="mt-8 inline-block" whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 rounded-xl bg-[#07377F] px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-[#087BD2]"
              >
                Learn More About Us
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ DEALER BANNER ============ */}
      <section className="px-6 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-gradient-to-r from-[#07377F] to-[#087BD2] px-7 py-14 text-white md:px-14 lg:py-20"
        >
          <motion.div
            className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border-[45px] border-white/10"
            animate={{ rotate: 360, scale: [1, 1.08, 1] }}
            transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity } }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full border-[30px] border-green-300/10"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <motion.div
              variants={container(0.14)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <motion.div variants={pop} className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-green-200">
                <Handshake size={17} />
                Business Opportunities
              </motion.div>
              <motion.h2 variants={rise} className="text-3xl font-extrabold leading-tight md:text-4xl">
                Grow Your Business
                <br />
                <span className="text-[#9AEE7A]">With SFIE</span>
              </motion.h2>
              <motion.p variants={rise} className="mt-5 max-w-xl text-base leading-8 text-blue-100">
                Interested in becoming a dealer or distributor of SFIE home cleaning products? Get in touch with our team.
              </motion.p>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              whileHover={{ y: -4, scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0"
            >
              <Link
                to="/contact?type=dealer"
                className="relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#31AD14] px-8 py-4 text-sm font-extrabold text-white shadow-xl"
              >
                <motion.span
                  className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/30"
                  animate={{ x: ["-150%", "450%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.2 }}
                />
                <span className="relative">Enquire About Dealership</span>
                <ArrowUpRight size={20} className="relative" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ============ CONTACT CTA ============ */}
      <section className="bg-[#F5FAFF] px-6 py-20 text-center">
        <motion.div
          variants={container(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={pop} className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-2xl bg-green-300/60"
              animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
              <MessageCircle size={30} className="text-[#31AD14]" />
            </span>
          </motion.div>
          <motion.h2 variants={rise} className="text-3xl font-extrabold text-[#07377F] md:text-4xl">
            Have Questions About Our Products?
          </motion.h2>
          <motion.p variants={rise} className="mt-5 text-base leading-8 text-slate-500">
            Contact SFIE for product information, bulk orders or dealer enquiries.
          </motion.p>
          <motion.div variants={rise} className="mt-8 inline-block" whileHover={{ y: -4, scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-xl bg-[#07377F] px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-[#087BD2]"
            >
              Contact Our Team
              <ChevronRight size={19} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}