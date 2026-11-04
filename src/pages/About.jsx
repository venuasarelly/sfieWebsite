
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Leaf,
  Target,
  Eye,
  Handshake,
  PackageCheck,
  House,
  MapPin,
  CheckCircle2,
  Droplets,
  SprayCan,
  Shirt,
  CookingPot,
  Bath,
  Layers,
} from "lucide-react";

// Animation settings
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const productCategories = [
  {
    title: "Kitchen Cleaning",
    description: "Dishwash Liquid, Dishwash Gel and Kitchen Cleaner",
    icon: CookingPot,
    color: "bg-orange-50 text-orange-500",
  },
  {
    title: "Bathroom Cleaning",
    description: "Bathroom Cleaner, Toilet Cleaner and Taps & Shower Cleaner",
    icon: Bath,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Floor & Surface Care",
    description: "Floor Cleaner, Surface Cleaner and Marble Cleaner",
    icon: Layers,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Laundry Care",
    description: "Liquid Detergent and Fabric Conditioner",
    icon: Shirt,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Hand & Home Care",
    description: "Handwash Liquid and Room Freshener",
    icon: Droplets,
    color: "bg-pink-50 text-pink-600",
  },
  {
    title: "Specialty Cleaning",
    description: "Glass Cleaner and Brass & Copper Cleaning Powder",
    icon: SprayCan,
    color: "bg-cyan-50 text-cyan-600",
  },
];

const values = [
  {
    icon: House,
    title: "Everyday Home Care",
    description:
      "A diverse selection of cleaning products for different areas of the home.",
  },
  {
    icon: PackageCheck,
    title: "Product Variety",
    description:
      "Solutions across kitchen, bathroom, floor, laundry and specialty cleaning categories.",
  },
  {
    icon: Handshake,
    title: "Business Partnerships",
    description:
      "Opportunities for dealers, distributors and businesses to explore our product range.",
  },
  {
    icon: Leaf,
    title: "Continuous Improvement",
    description:
      "A commitment to developing our range and responding to customer needs.",
  },
];

function SectionTitle({ eyebrow, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <span className="mb-4 inline-block rounded-full bg-green-50 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#31AD14]">
        {eyebrow}
      </span>

      <h2 className="text-3xl font-extrabold leading-tight text-[#07377F] md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-8 text-slate-500">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="overflow-x-hidden bg-white">

      {/* =====================================
          ABOUT HERO
      ===================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#052D67] via-[#07559C] to-[#087BD2] px-6 py-20 text-white md:py-28">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-7xl text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-green-200">
            <Sparkles size={15} />
            Get to Know SFIE
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            About <span className="text-[#9AEE7A]">Us</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
            Discover Shine Forge India Enterprises and
            our growing range of home cleaning products
            for everyday household care.
          </p>
        </motion.div>
      </section>

      {/* =====================================
          WHO WE ARE
      ===================================== */}
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

          {/* Logo presentation */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-50 via-white to-green-50 p-10 shadow-[0_15px_55px_rgba(7,55,127,0.08)]">
              <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-blue-200/30 blur-2xl" />
              <div className="absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-green-200/40 blur-2xl" />

              <motion.img
                src="/images/sfie-logo.png"
                alt="SFIE Shine Forge India Enterprises"
                className="relative z-10 w-full max-w-[420px] object-contain"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="absolute -bottom-6 left-5 rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-xl sm:left-10">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-100 p-3">
                  <House size={23} className="text-[#31AD14]" />
                </div>

                <div>
                  <p className="font-extrabold text-[#07377F]">
                    SFIE
                  </p>
                  <p className="text-xs text-slate-500">
                    Home Cleaning Products
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Company text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="mb-4 inline-block rounded-full bg-green-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#31AD14]">
              Who We Are
            </span>

            <h2 className="text-3xl font-extrabold leading-tight text-[#07377F] md:text-4xl">
              Welcome to
              <span className="mt-2 block text-[#31AD14]">
                Shine Forge India Enterprises
              </span>
            </h2>

            <p className="mt-7 text-base leading-8 text-slate-600">
              Shine Forge India Enterprises (SFIE)
              is a home cleaning products business
              based in Telangana, India. Our product
              range covers everyday cleaning needs
              across kitchens, bathrooms, floors,
              laundry and other household surfaces.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-600">
              From dishwashing and handwashing products
              to specialized cleaners and fabric care,
              SFIE brings multiple home cleaning
              categories together under one brand.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-600">
              We also welcome dealer and distributor
              enquiries from businesses interested
              in exploring our products.
            </p>

            <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-[#07377F]">
              <MapPin size={20} className="text-[#31AD14]" />
              Medchal-Malkajgiri, Telangana, India
            </div>

            <Link
              to="/products"
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-[#07377F] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#087BD2]"
            >
              Explore Our Products
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =====================================
          MISSION & VISION
      ===================================== */}
      <section className="bg-[#F5FAFF] px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Our Direction"
            title="Our Mission & Vision"
            description="The principles guiding how we develop our brand and serve the home cleaning market."
          />

          <div className="grid gap-7 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#07377F] to-[#087BD2] p-9 text-white shadow-lg md:p-12"
            >
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border-[25px] border-white/10" />

              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                <Target size={32} />
              </div>

              <h3 className="text-2xl font-extrabold">
                Our Mission
              </h3>

              <p className="mt-5 max-w-lg text-base leading-8 text-blue-100">
                To offer a diverse range of home
                cleaning products that help households
                address everyday cleaning needs,
                while building meaningful relationships
                with customers and business partners.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-green-100 bg-white p-9 shadow-lg md:p-12"
            >
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border-[25px] border-green-50" />

              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
                <Eye size={32} className="text-[#31AD14]" />
              </div>

              <h3 className="text-2xl font-extrabold text-[#07377F]">
                Our Vision
              </h3>

              <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">
                To grow SFIE into a recognized home
                cleaning products brand by expanding
                our product range, strengthening
                distribution partnerships and
                focusing on customer needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================
          OUR PRODUCT CATEGORIES
      ===================================== */}
      <section className="px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="What We Offer"
            title="Our Product Categories"
            description="Explore the different cleaning and household care categories available from SFIE."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                  }}
                  className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-xl"
                >
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${category.color}`}
                  >
                    <Icon size={30} />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#07377F]">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {category.description}
                  </p>

                  <Link
                    to="/products"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#31AD14] transition hover:text-[#087BD2]"
                  >
                    Explore Products
                    <ArrowUpRight size={17} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================
          OUR VALUES
      ===================================== */}
      <section className="bg-[#F5FAFF] px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="What Matters to Us"
            title="Our Core Values"
            description="The ideas that shape our approach to home cleaning products and business relationships."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="rounded-2xl border border-blue-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                    <Icon size={29} className="text-[#087BD2]" />
                  </div>

                  <h3 className="text-lg font-extrabold text-[#07377F]">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================
          DEALER & DISTRIBUTOR SECTION
      ===================================== */}
      <section className="px-6 py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-r from-[#07377F] to-[#087BD2] px-8 py-14 text-white md:px-14 lg:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[45px] border-white/10" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-green-200">
                <Handshake size={18} />
                Partner With SFIE
              </div>

              <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
                Let's Grow
                <span className="block text-[#9AEE7A]">
                  Together
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-blue-100">
                Interested in becoming a dealer or
                distributor of SFIE home cleaning
                products? Reach out to learn more
                about business opportunities.
              </p>

              <div className="mt-7 flex flex-wrap gap-4 text-sm text-blue-100">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-300" />
                  Product Enquiries
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-300" />
                  Bulk Order Enquiries
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-300" />
                  Dealer Partnerships
                </span>
              </div>
            </div>

            <Link
              to="/contact?type=dealer"
              className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#31AD14] px-8 py-4 text-sm font-extrabold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#269512]"
            >
              Become a Dealer
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================
          CONTACT CTA
      ===================================== */}
      <section className="bg-[#F5FAFF] px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
            <Handshake size={30} className="text-[#31AD14]" />
          </div>

          <h2 className="text-3xl font-extrabold text-[#07377F] md:text-4xl">
            Get to Know Our Products
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-500">
            Have a question about our company,
            product range or business partnerships?
            Contact the SFIE team today.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#07377F] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#087BD2]"
          >
            Contact Us
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
}
