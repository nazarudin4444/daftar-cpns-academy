// @vitest-environment node
import { describe, expect, it } from "vitest";
import { PDFDocument } from "pdf-lib";
import { unzipSync } from "fflate";
import {
  checkDocument,
  createLetterDOCX,
  detectDocumentFormat,
  fillLetter,
  optimizePDF,
  validSizeRule,
} from "@/lib/document-tools";

describe("local document checks", () => {
  const jpg = { format: "jpg", minKB: 100, maxKB: 300 } as const;
  it("accepts inclusive boundaries and rejects wrong formats", () => {
    expect(checkDocument(100 * 1024, "jpg", jpg).ok).toBe(true);
    expect(checkDocument(300 * 1024, "jpg", jpg).ok).toBe(true);
    expect(checkDocument(300 * 1024 + 1, "jpg", jpg).ok).toBe(false);
    expect(checkDocument(100 * 1024 - 1, "jpg", jpg).ok).toBe(false);
    expect(checkDocument(100 * 1024, "pdf", jpg).ok).toBe(false);
    expect(validSizeRule({ ...jpg, maxKB: NaN })).toBe(false);
    expect(validSizeRule({ ...jpg, minKB: 301 })).toBe(false);
  });
  it("reads content signatures rather than trusting extension or MIME", async () => {
    expect(await detectDocumentFormat(new Blob(["%PDF-1.7\n"], { type: "image/jpeg" }))).toBe(
      "pdf",
    );
    expect(await detectDocumentFormat(new Blob([new Uint8Array([255, 216, 255, 224])]))).toBe(
      "jpg",
    );
    expect(
      await detectDocumentFormat(new Blob(["not a PDF"], { type: "application/pdf" })),
    ).toBeNull();
  });
  it("optimizes a PDF without losing pages and refuses signed files", async () => {
    const pdf = await PDFDocument.create();
    pdf.addPage().drawText("LOCAL FIXTURE - NO PERSONAL DATA");
    pdf.addPage();
    const source = await pdf.save({ useObjectStreams: false });
    const output = await optimizePDF(new Blob([new Uint8Array(source)]));
    const reopened = await PDFDocument.load(await output.arrayBuffer());
    expect(reopened.getPageCount()).toBe(2);
    expect(output.size).toBeLessThan(source.length);
    await expect(optimizePDF(new Blob(["%PDF-1.7\n/ByteRange [0 1 2 3]"]))).rejects.toThrow(
      "tanda tangan digital",
    );
    await expect(optimizePDF(new Blob(["%PDF-corrupt"]))).rejects.toThrow();
  });
});

describe("letter downloads", () => {
  it("keeps unmatched placeholders visible and preserves literal user input", () => {
    expect(fillLetter("{{nama}} {{nama}} {{instansi}}", { nama: "A & <B> $&" })).toBe(
      "A & <B> $& A & <B> $& {{instansi}}",
    );
  });
  it("produces an editable A4 DOCX with escaped content and draft label", async () => {
    const blob = await createLetterDOCX("Nama: A & <B>\nJabatan: Analis\n中文");
    const files = unzipSync(new Uint8Array(await blob.arrayBuffer()));
    const xml = new TextDecoder().decode(files["word/document.xml"]);
    expect(xml).toContain("A &amp; &lt;B&gt;");
    expect(xml).toContain("DRAF");
    expect(xml).toContain("中文");
    expect(xml).toContain('w:w="11906"');
    expect(xml).toContain('w:h="16838"');
  });
});
