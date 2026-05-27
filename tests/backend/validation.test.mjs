import assert from "node:assert/strict";
import { test } from "node:test";

import {
  sanitizeObject,
  normalizeStringList,
  validateMaterialPayload,
  validateProfilePayload,
} from "../../src/lib/api/validation.js";

test("validateProfilePayload normalizes and sanitizes profile input", () => {
  const profile = validateProfilePayload({
    fullName: "  Ada Creator  ",
    email: "ADA@EXAMPLE.COM ",
    walletAddress: "0x0000000000000000000000000000000000000001",
    bio: "hello\u0000world",
  });

  assert.equal(profile.fullName, "Ada Creator");
  assert.equal(profile.email, "ada@example.com");
  assert.equal(profile.bio, "helloworld");
  assert.equal(profile.walletAddressLower, "0x0000000000000000000000000000000000000001");
});

test("validateMaterialPayload rejects invalid price and unknown visibility", () => {
  assert.throws(
    () => validateMaterialPayload({ title: "Notes", fileUrl: "ipfs://file", price: -1 }),
    /Invalid price/
  );
  assert.throws(
    () =>
      validateMaterialPayload({
        title: "Notes",
        fileUrl: "ipfs://file",
        visibility: "everyone",
      }),
    /Invalid visibility/
  );
});

test("validateMaterialPayload preserves and normalizes preview fields", () => {
  const material = validateMaterialPayload({
    title: "Notes",
    fileUrl: "ipfs://file",
    coverImageUrl: "https://example.com/cover.png",
    shortSummary: "  Useful summary  ",
    learningOutcomes: "Outcome 1\nOutcome 2,Outcome 3",
    tableOfContents: ["Intro", "Methods", "Conclusion"],
    sampleNotes: "First note,Second note",
  });

  assert.equal(material.coverImageUrl, "https://example.com/cover.png");
  assert.equal(material.shortSummary, "Useful summary");
  assert.deepEqual(material.learningOutcomes, ["Outcome 1", "Outcome 2", "Outcome 3"]);
  assert.deepEqual(material.tableOfContents, ["Intro", "Methods", "Conclusion"]);
  assert.deepEqual(material.sampleNotes, ["First note", "Second note"]);
});

test("sanitizeObject strips control characters from stored metadata", () => {
  assert.deepEqual(sanitizeObject({ title: "  Math\u0000 Notes " }), { title: "Math Notes" });
});

test("normalizeStringList trims empty values and caps the list", () => {
  assert.deepEqual(
    normalizeStringList([" first ", "", "second", "third"], { maxItems: 2 }),
    ["first", "second"]
  );
});
