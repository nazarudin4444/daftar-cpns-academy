export type DocumentFormat = "jpg" | "pdf";
export type SizeRule = { format: DocumentFormat; minKB: number; maxKB: number };

export function validSizeRule(rule: SizeRule) {
  return (
    Number.isFinite(rule.minKB) &&
    Number.isFinite(rule.maxKB) &&
    rule.minKB >= 0 &&
    rule.maxKB > 0 &&
    rule.maxKB >= rule.minKB
  );
}

export function checkDocument(size: number, detected: string | null, rule: SizeRule) {
  if (!validSizeRule(rule))
    return {
      ok: false,
      message:
        "Batas ukuran tidak valid. Maksimum harus lebih dari nol dan tidak kurang dari minimum.",
    };
  if (detected !== rule.format)
    return {
      ok: false,
      message: `Format isi file harus ${rule.format.toUpperCase()}. Mengganti ekstensi saja tidak mengubah format.`,
    };
  if (size < rule.minKB * 1024)
    return { ok: false, message: `Terlalu kecil: minimum ${rule.minKB} KB.` };
  if (size > rule.maxKB * 1024)
    return { ok: false, message: `Terlalu besar: maksimum ${rule.maxKB} KB.` };
  return {
    ok: true,
    message:
      "Format dan ukuran sesuai batas yang Anda pilih. Periksa keterbacaan dan isi dokumen sebelum unggah.",
  };
}

export async function detectDocumentFormat(file: Blob): Promise<DocumentFormat | null> {
  const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-") return "pdf";
  return null;
}

export function saveLocalFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

export async function compressImage(file: Blob, maxKB: number) {
  const bitmap = await createImageBitmap(file);
  try {
    if (bitmap.width * bitmap.height > 32_000_000)
      throw new Error("Gambar melebihi 32 megapiksel. Kecilkan resolusi lebih dahulu.");
    const canvas = document.createElement("canvas");
    let scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
    let result: Blob | null = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Browser tidak mendukung pemrosesan gambar.");
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      for (const quality of [0.9, 0.8, 0.7, 0.6, 0.5]) {
        result = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, "image/jpeg", quality),
        );
        if (!result) throw new Error("Gagal menghasilkan JPG.");
        if (result.size <= maxKB * 1024) return result;
      }
      scale *= 0.8;
    }
    if (!result) throw new Error("Gagal memproses gambar.");
    return result;
  } finally {
    bitmap.close();
  }
}

export async function optimizePDF(file: Blob) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const text = new TextDecoder("latin1").decode(bytes);
  if (/\/ByteRange\s*\[|\/Type\s*\/Sig\b/.test(text))
    throw new Error(
      "PDF terindikasi memiliki tanda tangan digital. Gunakan berkas asli sebelum tanda tangan atau e-Meterai.",
    );
  const { PDFDocument } = await import("pdf-lib");
  const pdf = await PDFDocument.load(bytes, { updateMetadata: false });
  if (pdf.isEncrypted) throw new Error("PDF terenkripsi tidak dapat dioptimalkan.");
  const output = await pdf.save({ useObjectStreams: true });
  return new Blob([new Uint8Array(output)], { type: "application/pdf" });
}

export function fillLetter(template: string, fields: Record<string, string>) {
  return template.replace(
    /\{\{([a-z]+)\}\}/g,
    (token, key: string) => fields[key]?.trim() || token,
  );
}

export async function createLetterDOCX(text: string) {
  const { Document, Packer, Paragraph, TextRun, AlignmentType } = await import("docx");
  const doc = new Document({
    creator: "Daftar CPNS",
    title: "Draf surat CASN",
    styles: {
      default: {
        document: {
          run: { font: "Times New Roman", size: 24 },
          paragraph: { spacing: { after: 140, line: 300 } },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 1440, bottom: 1440, left: 1701, right: 1440 },
          },
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "DRAF · Cocokkan dengan format instansi sebelum digunakan",
                size: 18,
                color: "555555",
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          ...text.split("\n").map(
            (line) =>
              new Paragraph({
                children: [new TextRun(line)],
                spacing: { after: line ? 120 : 180 },
              }),
          ),
        ],
      },
    ],
  });
  return Packer.toBlob(doc);
}
