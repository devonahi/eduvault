"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  marketplaceCategories,
  marketplaceListings,
  getPreviewCounts,
} from "@/lib/marketplace/listings";

function ListingCover({ listing }) {
  const label = listing.coverImage ? "Creator preview cover" : "No cover provided yet";

  return (
    <div className="relative w-full h-44 bg-gradient-to-br from-amber-50 via-white to-sky-50 overflow-hidden">
      {listing.coverImage ? (
        <Image
          src={listing.coverImage}
          alt={listing.title}
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="max-w-[12rem]">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm">
              <span className="text-xl">Preview</span>
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
              Cover not provided
            </p>
          </div>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-4">
        <div className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-700">
          {label}
        </div>
      </div>
    </div>
  );
}

function PreviewSignal({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
      <div className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
        {label}
      </div>
      <div className="mt-1 text-xs font-medium text-gray-700 line-clamp-2">
        {value}
      </div>
    </div>
  );
}

export default function MarketPage() {
  const categories = marketplaceCategories;
  const materials = marketplaceListings;

  return (
    <>
      <Navbar />

      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#f2ede8_1px,transparent_1px),linear-gradient(to_bottom,#f2ede8_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 pointer-events-none -z-10"
        aria-hidden="true"
      />

      <section className="flex min-h-screen bg-[#fffaf6]">
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 px-6 py-10 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-700 mb-6">Categories</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            {categories.map((category) => (
              <li
                key={category}
                className="cursor-pointer hover:text-blue-600 transition-all"
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 px-6 md:px-10 py-10 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 mb-10 flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-800/80 mb-3">
                Creator preview fields
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Discover More Study Materials
              </h1>
              <p className="text-gray-700 text-sm mb-4">
                Buyers can compare cover images, summaries, learning outcomes, and
                table of contents before checkout.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-sm font-semibold transition-all">
                Become a Creator
              </button>
            </div>

            <div className="w-40 h-40 mt-2 md:mt-0 flex items-center justify-center">
              <Image
                src="/images/celo.png"
                alt="Celo Token"
                width={144}
                height={144}
                className="object-contain"
              />
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600 text-sm flex-wrap">
                <span className="font-medium">Filters:</span>
                <select className="border border-gray-300 bg-white rounded-md px-3 py-1 text-sm focus:ring-1 focus:ring-blue-300">
                  <option>Category: All</option>
                  <option>Social Sciences</option>
                  <option>Engineering</option>
                  <option>Pharmacy</option>
                </select>
                <select className="border border-gray-300 bg-white rounded-md px-3 py-1 text-sm focus:ring-1 focus:ring-blue-300">
                  <option>Price Range</option>
                </select>
                <select className="border border-gray-300 bg-white rounded-md px-3 py-1 text-sm focus:ring-1 focus:ring-blue-300">
                  <option>Latest Releases</option>
                  <option>Most Downloaded</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Sort by:{" "}
              <select className="border border-gray-300 bg-white rounded-md px-3 py-1 text-sm ml-1 focus:ring-1 focus:ring-blue-300">
                <option>Most Popular</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {materials.map((material) => {
              const previewCounts = getPreviewCounts(material);

              return (
                <Link
                  href={`/marketplace/${material.id}`}
                  key={material.id}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 block"
                >
                  <ListingCover listing={material} />

                  <div className="p-4 space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {material.title}
                        </h3>
                        <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700">
                          {material.previewType}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        by {material.author}
                      </p>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-3 min-h-[3rem]">
                      {material.shortSummary || "Creator preview not provided yet."}
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      <PreviewSignal
                        label="Outcomes"
                        value={
                          previewCounts.outcomes
                            ? `${previewCounts.outcomes} listed`
                            : "Not shared"
                        }
                      />
                      <PreviewSignal
                        label="Sections"
                        value={
                          previewCounts.sections
                            ? `${previewCounts.sections} items`
                            : "Not shared"
                        }
                      />
                      <PreviewSignal
                        label="Sample notes"
                        value={
                          previewCounts.notes ? `${previewCounts.notes} snippets` : "Not shared"
                        }
                      />
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaHeart className="text-pink-500" />
                        <span>{material.likes} Likes</span>
                      </div>
                      <span>Price</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-800">
                        {material.price}
                      </span>
                      <span className="text-xs text-gray-400">CELO</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </motion.div>

          <div className="flex items-center justify-between mt-12 text-sm text-gray-600">
            <button className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100">
              Previous
            </button>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`w-8 h-8 flex items-center justify-center rounded-md ${
                    num === 1
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <button className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100">
              Next
            </button>
          </div>
        </main>
      </section>
    </>
  );
}
