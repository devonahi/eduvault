"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import BuyNowModal from "./modals/BuyNowModal";
import { getMarketplaceListing, getPreviewCounts } from "@/lib/marketplace/listings";

function PreviewBlock({ title, emptyLabel, items, type = "list" }) {
  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-500 mt-1">
            Creator-provided preview content when available.
          </p>
        </div>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
          Preview
        </span>
      </div>

      {hasItems ? (
        type === "list" ? (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <blockquote
                key={item}
                className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700"
              >
                {item}
              </blockquote>
            ))}
          </div>
        )
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-5 text-sm text-gray-500">
          {emptyLabel}
        </div>
      )}
    </section>
  );
}

function PreviewBadge({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <div className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function DetailCover({ listing }) {
  return (
    <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
      {listing.coverImage ? (
        <Image
          src={listing.coverImage}
          alt={listing.title}
          width={800}
          height={600}
          className="w-full h-[380px] object-cover"
        />
      ) : (
        <div className="h-[380px] bg-gradient-to-br from-amber-50 via-white to-sky-50 flex items-center justify-center px-10 text-center">
          <div className="max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-400 mb-3">
              No cover provided
            </p>
            <h3 className="text-2xl font-bold text-gray-900">{listing.title}</h3>
            <p className="mt-3 text-sm text-gray-600">
              The creator has not uploaded a preview image yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MaterialDetailsPage() {
  const params = useParams();
  const [showBuyModal, setShowBuyModal] = useState(false);

  const material = useMemo(() => {
    const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";
    return getMarketplaceListing(id) || null;
  }, [params]);

  const relatedMaterials = useMemo(() => {
    return [
      "chm-112-lab-report-template",
      "mth-101-calculus-cheat-sheet",
      "phy-110-problem-sets",
      "psy-100-study-tips-mnemonics",
    ]
      .map((id) => getMarketplaceListing(id))
      .filter(Boolean)
      .filter((item) => item.id !== material?.id);
  }, [material]);

  if (!material) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-[#fffaf6] px-6 py-16">
          <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-sm text-gray-500 mb-4">
              <Link href="/marketplace" className="text-blue-600 hover:underline">
                Marketplace
              </Link>{" "}
              / Listing not found
            </p>
            <h1 className="text-2xl font-bold text-gray-900">Listing not found</h1>
            <p className="mt-3 text-sm text-gray-600">
              The marketplace listing you requested is not available in the current
              preview dataset.
            </p>
            <Link
              href="/marketplace"
              className="mt-6 inline-flex rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Back to Marketplace
            </Link>
          </div>
        </section>
      </>
    );
  }

  const previewCounts = getPreviewCounts(material);

  return (
    <>
      <Navbar />

      <section className="relative bg-[#fffaf6] min-h-screen py-10 px-6 md:px-20">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#f2ede8_1px,transparent_1px),linear-gradient(to_bottom,#f2ede8_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 pointer-events-none -z-10"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <p className="text-sm text-gray-500 mb-6">
            <Link href="/marketplace" className="text-blue-600 hover:underline">
              Marketplace
            </Link>{" "}
            / {material.title}
          </p>

          <div className="flex flex-col md:flex-row gap-10">
            <DetailCover listing={material} />

            <div className="flex-1 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700 mb-2">
                    {material.previewType}
                  </p>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {material.title}
                  </h1>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm">
                  Creator preview
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {material.shortSummary || "No short summary was provided for this listing."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <PreviewBadge label="Learning outcomes" value={`${previewCounts.outcomes} shared`} />
                <PreviewBadge label="Table of contents" value={`${previewCounts.sections} sections`} />
                <PreviewBadge label="Sample notes" value={`${previewCounts.notes} snippets`} />
              </div>

              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/celo.png"
                    alt="Celo"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <span className="text-lg font-semibold text-gray-900">
                    {material.price}
                  </span>
                </div>
                <span className="text-sm text-yellow-500">STAR rating preview</span>
                <span className="text-gray-400 text-sm">Creator price signal</span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-100 transition">
                  Add to Cart
                </button>
                <button
                  onClick={() => setShowBuyModal(true)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
                >
                  Buy Now!
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
                <FaHeart className="text-pink-500" />
                {material.likes} Likes
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <PreviewBadge label="Institution" value={material.institution} />
                <PreviewBadge label="Department" value={material.department} />
                <PreviewBadge label="Level" value={material.level} />
                <PreviewBadge label="Uploaded" value={material.uploadedAt} />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-10">
            <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {material.shortSummary || material.title}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {material.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Author Info</h2>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong className="text-gray-800">Author:</strong> {material.author}
                </p>
                <p>
                  <strong className="text-gray-800">Institution:</strong>{" "}
                  {material.institution}
                </p>
                <p>
                  <strong className="text-gray-800">Department:</strong>{" "}
                  {material.department}
                </p>
                <p>
                  <strong className="text-gray-800">Level:</strong> {material.level}
                </p>
                <p>
                  <strong className="text-gray-800">Uploaded:</strong> {material.uploadedAt}
                </p>
                <p className="flex items-center gap-2">
                  <strong className="text-gray-800">Verification:</strong>
                  <span className="text-green-600 flex items-center gap-1 text-xs font-medium">
                    <FaCheckCircle /> Creator profile linked
                  </span>
                </p>
              </div>
            </section>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <PreviewBlock
              title="Learning Outcomes"
              emptyLabel="The creator has not added learning outcomes yet."
              items={material.learningOutcomes}
            />
            <PreviewBlock
              title="Table of Contents"
              emptyLabel="The creator has not shared a table of contents yet."
              items={material.tableOfContents}
            />
            <PreviewBlock
              title="Sample Notes"
              emptyLabel="No sample notes were shared for this listing."
              items={material.sampleNotes}
              type="notes"
            />
            <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Preview Fields</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Listing cards and detail pages now surface creator-provided preview
                fields when available. Missing values fall back to friendly placeholder
                states so the UI remains readable.
              </p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <strong className="text-gray-900">Cover image:</strong> optional image
                  URL for the listing hero.
                </li>
                <li className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <strong className="text-gray-900">Short summary:</strong> compact
                  listing teaser for cards and the detail header.
                </li>
                <li className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <strong className="text-gray-900">Learning outcomes, TOC, sample
                  notes:</strong> arrays of short strings, or newline/comma separated
                  values from the upload flow.
                </li>
              </ul>
            </section>
          </div>

          {relatedMaterials.length > 0 && (
            <div className="mt-14">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Discover more Notes
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedMaterials.map((item) => (
                  <Link
                    key={item.id}
                    href={`/marketplace/${item.id}`}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    <div className="relative w-full h-40 bg-gray-100">
                      {item.coverImage ? (
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-500 text-xs">
                          No preview image
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">by {item.author}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{item.price}</span>
                        <span>{item.likes} Likes</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      <BuyNowModal
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        price={material.price}
      />
    </>
  );
}
