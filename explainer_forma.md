# FORMA — Privacy-First Image & PDF Tools


**Product Name:** FORMA  
**One-line description:** Transform images and PDFs entirely in your browser — zero uploads, zero tracking, zero compromise.



---

## Live Deployment URL

> _Add your Vercel deployment URL here after deploying_  
> Example: `https://forma-tools.vercel.app`


---

## Problem We Solved

Most online image and PDF tools require users to upload their private files to remote servers — creating serious privacy risks, especially for sensitive documents like contracts, medical records, or personal photos. Existing tools are also riddled with ads, file size limits, and forced account creation.

FORMA solves this by running every single operation — resizing, compressing, converting, merging, splitting, watermarking — entirely inside the user's browser using the Canvas API and PDF.js. Files never leave the device. There are no server uploads, no tracking, no ads, and no sign-up required.

The result is a professional-grade, privacy-first file transformation suite that works offline, handles batch operations, and outputs directly to the user's downloads folder — all for free.

---

## Features

- **Image Resizer** — Exact pixel dimensions with aspect ratio lock
- **Image Compressor** — Quality control + EXIF stripping
- **Format Converter** — PNG ↔ JPEG ↔ WebP ↔ BMP (batch)
- **Images → PDF** — Multi-image to polished PDF with page settings
- **PDF → Images** — Extract pages as JPEG/PNG/WebP
- **Merge PDFs** — Combine multiple PDFs into one
- **Split PDF** — Split by page, range, or fixed chunks
- **Compress PDF** — Three quality levels
- **Rotate PDF** — Per-page or all-page rotation
- **Watermark PDF** — Text watermarks with full styling control

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Inline CSS + CSS Custom Properties |
| Animations | GSAP 3 + ScrollTrigger |
| PDF Processing | PDF.js + jsPDF |
| File Archiving | JSZip |
| Backend | Next.js API Routes (health check) |
| Deployment | Vercel |
| Auth | Not required — no accounts needed by design |
| Database | Not required — 100% stateless by design |

---

## Why This Is a Viable SaaS

FORMA's privacy-first positioning addresses a genuine gap in the market. Monetization paths include:

1. **FORMA Pro** — Batch limits lifted, higher resolution exports, custom watermark styles
2. **FORMA Teams** — Shared workspaces, branded output, bulk API access
3. **White-label licensing** — Embed the tool suite inside enterprise products
