import React from "react";

import bathroomCleaner from "../assets/products/bathroom_cleaner.png";
import brassCopper from "../assets/products/brass_copper.png";
import detergentLiquid from "../assets/products/detergent_liquid.png";
import dishwashGel from "../assets/products/dishwash_gel.png";
import dishwashLiquid from "../assets/products/dishwash_liquid.png";
import floorCleaner from "../assets/products/floor_cleaner.png";
import glassCleaner from "../assets/products/glass_cleaner.png";
import roomFreshener from "../assets/products/room_freshner.png";
import toiletCleaner from "../assets/products/toilet_cleaner.png";

const products = [
  {
    name: "Bathroom Cleaner",
    image: bathroomCleaner,
    description: "For clean bathroom floors and tiles.",
  },
  {
    name: "Brass & Copper Cleaning Powder",
    image: brassCopper,
    description: "Bring back the shine of your brass and copper items.",
  },
  {
    name: "Liquid Detergent",
    image: detergentLiquid,
    description: "Everyday cleaning care for your clothes.",
  },
  {
    name: "Dishwash Gel",
    image: dishwashGel,
    description: "Cut through grease for sparkling clean utensils.",
  },
  {
    name: "Dishwash Liquid",
    image: dishwashLiquid,
    description: "Make everyday dishwashing simple.",
  },
  {
    name: "Floor Cleaner",
    image: floorCleaner,
    description: "Keep your floors clean and your home fresh.",
  },
  {
    name: "Glass Cleaner",
    image: glassCleaner,
    description: "For clear glass and beautiful reflections.",
  },
  {
    name: "Room Freshener",
    image: roomFreshener,
    description: "Add a refreshing fragrance to your space.",
  },
  {
    name: "Toilet Cleaner",
    image: toiletCleaner,
    description: "Clean tough stains inside your toilet bowl.",
  },
];

function Products() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page heading */}
      <section className="bg-emerald-950 px-5 py-16 text-center text-white sm:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
          Shine Forge India Enterprises
        </p>

        <h1 className="text-4xl font-bold sm:text-5xl">
          Our Products
        </h1>

        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-emerald-100">
          Discover cleaning essentials for a cleaner, fresher home.
        </p>
      </section>

      {/* Product grid */}
      <section
        aria-label="Our cleaning products"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-72 items-center justify-center overflow-hidden bg-white p-6 sm:h-80">
                <img
                  src={product.image}
                  alt={`SFIE ${product.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="border-t border-slate-100 p-6">
                <h2 className="text-xl font-bold text-slate-900">
                  {product.name}
                </h2>

                <p className="mt-3 leading-relaxed text-slate-600">
                  {product.description}
                </p>

                <a
                  href={`https://wa.me/919392636493?text=${encodeURIComponent(
                    `Hello, I would like to enquire about SFIE ${product.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Enquire about ${product.name} on WhatsApp`}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                >
                  Enquire Now
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Dealer enquiry */}
      <section className="px-5 pb-14">
        <div className="mx-auto max-w-7xl rounded-2xl bg-emerald-100 px-6 py-10 text-center">
          <h2 className="text-2xl font-bold text-emerald-950">
            Interested in dealership or bulk orders?
          </h2>

          <p className="mt-3 text-slate-700">
            Connect with Shine Forge India Enterprises.
          </p>

          <a
            href="tel:+919392636493"
            className="mt-6 inline-flex rounded-lg bg-emerald-950 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
          >
            Call 9392636493
          </a>
        </div>
      </section>
    </main>
  );
}

export default Products;