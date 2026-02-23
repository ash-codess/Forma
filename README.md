# FORMA — Privacy-First Image & PDF Tools

> Transform images and PDFs entirely in your browser. Zero uploads. Zero tracking.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

## Project Structure

```
forma-nextjs/
├── app/
│   ├── layout.tsx          # Root layout (loads external CDN scripts)
│   ├── page.tsx            # Main page (full app, client component)
│   ├── globals.css         # Global reset styles
│   └── api/
│       └── health/
│           └── route.ts    # Health check API route
├── components/
│   ├── Nav.tsx             # Navigation bar component
│   ├── Loader.tsx          # Animated loader component
│   └── Notification.tsx    # Toast notification component
├── explainer_forma.md      # Hackathon submission explainer
├── next.config.js
├── package.json
└── tsconfig.json
```

## Tech

- **Next.js 14** (App Router)
- **GSAP 3** for animations
- **PDF.js** for PDF rendering
- **jsPDF** for PDF generation
- **JSZip** for batch download packaging
- 100% client-side processing — no backend required for file operations
