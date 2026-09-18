export interface ScrapbookElement {
  id: string;
  type: 'text' | 'image' | 'sticker';
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  style?: Record<string, string>;
}

export interface ScrapbookPage {
  id: string;
  elements: ScrapbookElement[];
}

// A4 landscape, in mm — the scrapbook canvas is much wider than it is tall
const PAGE_W = 297;
const PAGE_H = 210;
const MARGIN = 10;

/**
 * Emoji can't be drawn with jsPDF's built-in fonts, so we paint each sticker
 * onto a 2D canvas (which uses the system emoji font) and embed that instead.
 */
const rasterizeSticker = (char: string, sizePx: number): string => {
  const scale = 4; // oversample so stickers stay crisp when printed
  const canvas = document.createElement('canvas');
  canvas.width = sizePx * scale;
  canvas.height = sizePx * scale;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.font = `${sizePx * scale * 0.8}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(char, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL('image/png');
};

/**
 * On screen the images are `object-cover`, so replicate that crop here rather
 * than letting the PDF stretch them.
 */
const coverCrop = (
  src: string,
  boxW: number,
  boxH: number
): Promise<{ data: string; format: 'PNG' | 'JPEG' } | null> =>
  new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const scale = 2; // render above layout size so print quality holds up
      const canvas = document.createElement('canvas');
      canvas.width = boxW * scale;
      canvas.height = boxH * scale;

      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(null);

      const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
      const drawW = img.width * ratio;
      const drawH = img.height * ratio;

      ctx.drawImage(img, (canvas.width - drawW) / 2, (canvas.height - drawH) / 2, drawW, drawH);

      const isPng = src.startsWith('data:image/png');
      resolve({
        data: isPng ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', 0.92),
        format: isPng ? 'PNG' : 'JPEG',
      });
    };

    img.onerror = () => resolve(null);
    img.src = src;
  });

/**
 * Renders every page of the scrapbook into a PDF and hands it to the browser.
 * `srcW`/`srcH` are the on-screen canvas dimensions the element coordinates
 * were captured against, so the layout maps across faithfully.
 */
export const exportScrapbookToPdf = async (
  pages: ScrapbookPage[],
  srcW: number,
  srcH: number,
  fileName = 'our-scrapbook.pdf'
): Promise<void> => {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // One scale factor for both axes keeps the layout from skewing
  const scale = Math.min((PAGE_W - MARGIN * 2) / srcW, (PAGE_H - MARGIN * 2) / srcH);
  const offsetX = (PAGE_W - srcW * scale) / 2;
  const offsetY = (PAGE_H - srcH * scale) / 2;

  const toPdfX = (x: number) => offsetX + x * scale;
  const toPdfY = (y: number) => offsetY + y * scale;

  for (let i = 0; i < pages.length; i++) {
    if (i > 0) doc.addPage();

    for (const element of pages[i].elements) {
      const w = element.width * scale;
      const h = element.height * scale;
      const x = toPdfX(element.x);
      const y = toPdfY(element.y);

      if (element.type === 'image' && element.content) {
        const image = await coverCrop(element.content, element.width, element.height);
        if (image) doc.addImage(image.data, image.format, x, y, w, h);
        continue;
      }

      if (element.type === 'sticker' && element.content) {
        const sticker = rasterizeSticker(element.content, element.width);
        if (sticker) doc.addImage(sticker, 'PNG', x, y, w, h);
        continue;
      }

      if (element.type === 'text' && element.content.trim()) {
        const fontSize = 12;
        doc.setFont('times', 'italic');
        doc.setFontSize(fontSize);
        doc.setTextColor(60, 60, 60);

        // Wrap to the element's box, and keep the first line inside it
        const lines = doc.splitTextToSize(element.content, w) as string[];
        const lineHeight = fontSize * 0.3528 * 1.15; // pt -> mm, with leading
        doc.text(lines, x, y + lineHeight);
      }
    }
  }

  doc.save(fileName);
};
