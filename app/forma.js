
/* ─────────────────────────────────────────────────────────────
   GSAP SETUP
───────────────────────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create('expo', '0.16, 1, 0.3, 1');

/* ─────────────────────────────────────────────────────────────
   CURSOR
───────────────────────────────────────────────────────────── */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
const label = document.getElementById('cursor-label');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  gsap.to(dot, { x: mx, y: my, duration: 0.1, ease: 'none' });
});
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  gsap.set(ring, { x: rx, y: ry });
  gsap.set(label, { x: rx + 18, y: ry });
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a, button, .tab-btn, .dropzone, .toggle, .size-lock').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(ring, { scale: 1.8, duration: 0.3, ease: 'expo' });
    gsap.to(dot, { scale: 0.5, duration: 0.2 });
    const lbl = el.dataset.cursor;
    if (lbl) {
      label.textContent = lbl;
      gsap.to(label, { opacity: 1, duration: 0.2 });
    }
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(ring, { scale: 1, duration: 0.4, ease: 'expo' });
    gsap.to(dot, { scale: 1, duration: 0.2 });
    gsap.to(label, { opacity: 0, duration: 0.15 });
  });
});

/* ─────────────────────────────────────────────────────────────
   LOADER ANIMATION
───────────────────────────────────────────────────────────── */
(function initLoader() {
  const letters = document.querySelectorAll('#loader-logo span');
  const bar = document.getElementById('loader-bar');
  const pct = document.getElementById('loader-pct');
  let p = 0;
  gsap.from(letters, { y: '100%', opacity: 0, stagger: 0.06, duration: 0.7, ease: 'expo', delay: 0.2 });
  const counter = setInterval(() => {
    p += Math.random() * 18;
    if (p >= 100) { p = 100; clearInterval(counter); finishLoad(); }
    bar.style.width = p + '%';
    pct.textContent = Math.floor(p) + '%';
  }, 80);
  function finishLoad() {
    setTimeout(() => {
      gsap.to('#loader', {
        yPercent: -100, duration: 1, ease: 'expo',
        onComplete: () => { document.getElementById('loader').style.display = 'none'; }
      });
      revealHero();
    }, 300);
  }
})();

/* ─────────────────────────────────────────────────────────────
   HERO REVEAL
───────────────────────────────────────────────────────────── */
function revealHero() {
  const tl = gsap.timeline();
  tl.to('.hero-tag', { opacity: 1, y: 0, duration: 0.8, ease: 'expo' })
    .to('.hero-title .word', {
      y: 0, stagger: 0.08, duration: 0.9, ease: 'expo'
    }, '-=0.4')
    .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7, ease: 'expo' }, '-=0.5')
    .to('.hero-actions', { opacity: 1, y: 0, duration: 0.7, ease: 'expo' }, '-=0.5')
    .to('.hero-visual', { opacity: 1, x: 0, duration: 1, ease: 'expo' }, '-=0.6')
    .to('.hero-scroll-hint', { opacity: 1, duration: 0.6, ease: 'expo' }, '-=0.3');
  gsap.set('.hero-sub, .hero-actions', { y: 20 });
  gsap.set('.hero-visual', { x: 40 });

  // animate hero bar fill
  setTimeout(() => {
    document.getElementById('hvc-bar-fill').style.width = '74%';
  }, 1800);

  // animate grid cells
  const cells = document.querySelectorAll('.hvc-cell');
  if (cells.length === 0) buildGrid();
  setTimeout(() => animGrid(), 1400);
}

function buildGrid() {
  const g = document.getElementById('hvc-grid');
  if (!g) return;
  g.innerHTML = '';
  for (let i = 0; i < 36; i++) {
    const c = document.createElement('div');
    c.className = 'hvc-cell';
    g.appendChild(c);
  }
  animGrid();
}
buildGrid();

function animGrid() {
  const cells = document.querySelectorAll('.hvc-cell');
  cells.forEach((c, i) => {
    setTimeout(() => {
      c.classList.remove('active', 'mid');
      const r = Math.random();
      if (r > 0.8) c.classList.add('active');
      else if (r > 0.6) c.classList.add('mid');
    }, i * 30);
  });
  setTimeout(animGrid, 2000);
}

/* ─────────────────────────────────────────────────────────────
   NAV SCROLL
───────────────────────────────────────────────────────────── */
ScrollTrigger.create({
  start: 80,
  onEnter: () => document.getElementById('nav').classList.add('scrolled'),
  onLeaveBack: () => document.getElementById('nav').classList.remove('scrolled'),
});

/* ─────────────────────────────────────────────────────────────
   SCROLL ANIMATIONS
───────────────────────────────────────────────────────────── */
// Section titles
document.querySelectorAll('.section-title .inner').forEach(el => {
  gsap.from(el, {
    y: '100%', duration: 0.9, ease: 'expo',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});

// Stats counter
document.querySelectorAll('.stat-count').forEach(el => {
  const target = parseInt(el.dataset.target);
  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    onEnter: () => {
      gsap.to({ val: 0 }, {
        val: target, duration: 1.5, ease: 'power2.out',
        onUpdate: function() { el.textContent = Math.floor(this.targets()[0].val); },
        onComplete: () => { el.textContent = target; }
      });
    }
  });
});

// Stat cells
gsap.from('.stat-cell', {
  opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'expo',
  scrollTrigger: { trigger: '#stats', start: 'top 80%' }
});

// Feature cards
gsap.from('.feature-card', {
  opacity: 0, y: 50, stagger: 0.1, duration: 0.8, ease: 'expo',
  scrollTrigger: { trigger: '.features-grid', start: 'top 80%' }
});

// How steps
gsap.from('.how-step', {
  opacity: 0, x: -30, stagger: 0.15, duration: 0.8, ease: 'expo',
  scrollTrigger: { trigger: '.how-grid', start: 'top 80%' }
});

// Privacy points
gsap.from('.privacy-point', {
  opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: 'expo',
  scrollTrigger: { trigger: '.privacy-points', start: 'top 80%' }
});

// Tools section
gsap.from('.tools-tabs', {
  opacity: 0, y: 20, duration: 0.7, ease: 'expo',
  scrollTrigger: { trigger: '#tools', start: 'top 80%' }
});
gsap.from('.tool-card', {
  opacity: 0, y: 40, duration: 0.9, ease: 'expo',
  scrollTrigger: { trigger: '.tool-card', start: 'top 85%' }
});

/* ─────────────────────────────────────────────────────────────
   PARALLAX HERO GRID
───────────────────────────────────────────────────────────── */
gsap.to('.hero-grid-overlay', {
  yPercent: 20, ease: 'none',
  scrollTrigger: { trigger: '#hero', scrub: true }
});

/* ─────────────────────────────────────────────────────────────
   TABS
───────────────────────────────────────────────────────────── */
function switchTab(id) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  const btn = document.querySelector(`.tab-btn[onclick="switchTab('${id}')"]`);
  const panel = document.getElementById('panel-' + id);
  if (btn) btn.classList.add('active');
  if (panel) {
    panel.classList.add('active');
    gsap.from(panel, { opacity: 0, y: 20, duration: 0.4, ease: 'expo' });
  }
}

/* ─────────────────────────────────────────────────────────────
   FILE STATE
───────────────────────────────────────────────────────────── */
const fileStore = { resize: [], convert: [], compress: [], img2pdf: [], pdf2img: [], pdfmerge: [], pdfsplit: [], pdfcompress: [], pdfrotate: [], pdfwatermark: [] };

function setupDropzone(key, inputId, dzId, listId, multiple) {
  const input = document.getElementById(inputId);
  const dz = document.getElementById(dzId);
  input.multiple = multiple;
  input.addEventListener('change', e => addFiles(key, e.target.files, listId));
  dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('dragover'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));
  dz.addEventListener('drop', e => {
    e.preventDefault();
    dz.classList.remove('dragover');
    addFiles(key, e.dataTransfer.files, listId);
  });
}
setupDropzone('resize',       'file-resize',       'dz-resize',       'fl-resize',       true);
setupDropzone('convert',      'file-convert',      'dz-convert',      'fl-convert',      true);
setupDropzone('compress',     'file-compress',     'dz-compress',     'fl-compress',     true);
setupDropzone('img2pdf',      'file-img2pdf',      'dz-img2pdf',      'fl-img2pdf',      true);
setupDropzone('pdf2img',      'file-pdf2img',      'dz-pdf2img',      'fl-pdf2img',      false);
setupDropzone('pdfmerge',     'file-pdfmerge',     'dz-pdfmerge',     'fl-pdfmerge',     true);
setupDropzone('pdfsplit',     'file-pdfsplit',     'dz-pdfsplit',     'fl-pdfsplit',     false);
setupDropzone('pdfcompress',  'file-pdfcompress',  'dz-pdfcompress',  'fl-pdfcompress',  false);
setupDropzone('pdfrotate',    'file-pdfrotate',    'dz-pdfrotate',    'fl-pdfrotate',    false);
setupDropzone('pdfwatermark', 'file-pdfwatermark', 'dz-pdfwatermark', 'fl-pdfwatermark', false);

function addFiles(key, files, listId) {
  Array.from(files).forEach(f => fileStore[key].push(f));
  renderFileList(key, listId);
}

function renderFileList(key, listId) {
  const container = document.getElementById(listId);
  container.innerHTML = '';
  fileStore[key].forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `
      <span class="file-item-icon">📄</span>
      <span class="file-item-name" title="${f.name}">${f.name}</span>
      <span class="file-item-size">${formatBytes(f.size)}</span>
      <button class="file-item-remove" onclick="removeFile('${key}','${listId}',${i})">×</button>
    `;
    container.appendChild(item);
    gsap.from(item, { opacity: 0, x: -10, duration: 0.3, ease: 'expo' });
  });
}

function removeFile(key, listId, idx) {
  fileStore[key].splice(idx, 1);
  renderFileList(key, listId);
}

function clearFiles(key) {
  const listMap = {
    resize:'fl-resize', convert:'fl-convert', compress:'fl-compress',
    img2pdf:'fl-img2pdf', pdf2img:'fl-pdf2img',
    pdfmerge:'fl-pdfmerge', pdfsplit:'fl-pdfsplit',
    pdfcompress:'fl-pdfcompress', pdfrotate:'fl-pdfrotate', pdfwatermark:'fl-pdfwatermark'
  };
  fileStore[key] = [];
  renderFileList(key, listMap[key]);
  document.querySelectorAll('input[type="file"]').forEach(el => { el.value = ''; });
}

function formatBytes(b) {
  if (b < 1024) return b + ' B';
  if (b < 1048576) return (b/1024).toFixed(1) + ' KB';
  return (b/1048576).toFixed(2) + ' MB';
}

/* ─────────────────────────────────────────────────────────────
   ASPECT LOCK
───────────────────────────────────────────────────────────── */
let aspectLocked = true;
let aspectRatio = 1;
function toggleLock() {
  aspectLocked = !aspectLocked;
  document.getElementById('lock-btn').classList.toggle('locked', aspectLocked);
  document.getElementById('lock-btn').textContent = aspectLocked ? '🔗' : '🔓';
}
document.getElementById('resize-w').addEventListener('input', function() {
  if (!aspectLocked) return;
  const h = document.getElementById('resize-h');
  if (this.value && aspectRatio) h.value = Math.round(this.value / aspectRatio);
});
document.getElementById('resize-h').addEventListener('input', function() {
  if (!aspectLocked) return;
  const w = document.getElementById('resize-w');
  if (this.value && aspectRatio) w.value = Math.round(this.value * aspectRatio);
});

/* ─────────────────────────────────────────────────────────────
   NOTIFICATION
───────────────────────────────────────────────────────────── */
let notifTimer;
function notify(msg, type = 'success') {
  const el = document.getElementById('notification');
  const dot = document.getElementById('notif-dot');
  const msgEl = document.getElementById('notif-msg');
  el.className = 'show ' + type;
  dot.className = 'notif-dot ' + type;
  msgEl.textContent = msg;
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => el.classList.remove('show'), 4000);
}

/* ─────────────────────────────────────────────────────────────
   PROGRESS HELPERS
───────────────────────────────────────────────────────────── */
function setProgress(key, pct, msg) {
  const wrap = document.getElementById('prog-' + key);
  const fill = document.getElementById('prog-' + key + '-fill');
  const lbl  = document.getElementById('prog-' + key + '-label');
  if (!wrap) return;
  wrap.style.display = 'block';
  if (fill) fill.style.width = pct + '%';
  if (lbl && msg) lbl.textContent = msg;
}
function hideProgress(key) {
  const wrap = document.getElementById('prog-' + key);
  if (wrap) setTimeout(() => { wrap.style.display = 'none'; }, 600);
}

/* ─────────────────────────────────────────────────────────────
   DOWNLOAD HELPERS
───────────────────────────────────────────────────────────── */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function downloadZip(blobs, filename) {
  const zip = new JSZip();
  blobs.forEach(({ blob, name }) => zip.file(name, blob));
  const content = await zip.generateAsync({ type: 'blob' });
  downloadBlob(content, filename);
}

/* ─────────────────────────────────────────────────────────────
   IMAGE LOAD HELPER
───────────────────────────────────────────────────────────── */
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => { resolve(img); };
    img.onerror = reject;
    img.src = url;
  });
}

function canvasToBlob(canvas, mime, quality) {
  return new Promise(resolve => {
    canvas.toBlob(resolve, mime, quality / 100);
  });
}

function getExt(mime) {
  const map = {
    'image/jpeg': 'jpg', 'image/png': 'png',
    'image/webp': 'webp', 'image/bmp': 'bmp'
  };
  return map[mime] || 'jpg';
}

function withBg(canvas, ctx, mime) {
  if (mime === 'image/jpeg' || mime === 'image/bmp') {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
}

/* ─────────────────────────────────────────────────────────────
   RESIZE
───────────────────────────────────────────────────────────── */
async function runResize() {
  const files = fileStore.resize;
  if (!files.length) { notify('Please select at least one image.', 'error'); return; }
  const btn = document.getElementById('btn-resize');
  btn.disabled = true;
  setProgress('resize', 0, 'Processing images…');

  const tw = parseInt(document.getElementById('resize-w').value) || 0;
  const th = parseInt(document.getElementById('resize-h').value) || 0;
  const mode = document.getElementById('resize-mode').value;
  const fmtRaw = document.getElementById('resize-fmt').value;
  const quality = parseInt(document.getElementById('resize-q').value);

  if (!tw && !th && mode !== 'width' && mode !== 'height') {
    notify('Please enter at least a width or height.', 'error');
    btn.disabled = false; return;
  }

  const results = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const img = await loadImage(f);
    const origW = img.naturalWidth, origH = img.naturalHeight;
    aspectRatio = origW / origH;

    let cw = tw || origW, ch = th || origH;
    if (mode === 'width') { cw = tw || origW; ch = Math.round(cw / (origW / origH)); }
    else if (mode === 'height') { ch = th || origH; cw = Math.round(ch * (origW / origH)); }
    else if (mode === 'fit') {
      if (tw && th) {
        const ratio = Math.min(tw / origW, th / origH);
        cw = Math.round(origW * ratio); ch = Math.round(origH * ratio);
      } else if (tw) { cw = tw; ch = Math.round(tw / (origW / origH)); }
      else { ch = th; cw = Math.round(th * (origW / origH)); }
    }
    else if (mode === 'cover' || mode === 'fill') { cw = tw || origW; ch = th || origH; }

    const canvas = document.createElement('canvas');
    canvas.width = cw; canvas.height = ch;
    const ctx = canvas.getContext('2d');

    if (mode === 'fill') {
      const srcRatio = origW / origH, dstRatio = cw / ch;
      let sx = 0, sy = 0, sw = origW, sh = origH;
      if (srcRatio > dstRatio) { sw = origH * dstRatio; sx = (origW - sw) / 2; }
      else { sh = origW / dstRatio; sy = (origH - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    } else {
      ctx.drawImage(img, 0, 0, cw, ch);
    }

    const mime = fmtRaw === 'original'
      ? (f.type || 'image/jpeg')
      : fmtRaw;
    withBg(canvas, ctx, mime);
    const blob = await canvasToBlob(canvas, mime, quality);
    const ext = fmtRaw === 'original' ? f.name.split('.').pop() : getExt(mime);
    const base = f.name.replace(/\.[^.]+$/, '');
    results.push({ blob, name: `${base}_${cw}x${ch}.${ext}` });
    URL.revokeObjectURL(img.src);
    setProgress('resize', Math.round(((i+1)/files.length)*100), `${i+1} / ${files.length} done`);
  }

  if (results.length === 1) downloadBlob(results[0].blob, results[0].name);
  else await downloadZip(results, 'forma-resized.zip');

  hideProgress('resize');
  btn.disabled = false;
  notify(`✓ ${results.length} image${results.length > 1 ? 's' : ''} resized successfully!`);
}

/* ─────────────────────────────────────────────────────────────
   CONVERT
───────────────────────────────────────────────────────────── */
async function runConvert() {
  const files = fileStore.convert;
  if (!files.length) { notify('Please select at least one image.', 'error'); return; }
  const btn = document.getElementById('btn-convert');
  btn.disabled = true;
  setProgress('convert', 0, 'Converting…');

  const mime = document.getElementById('convert-fmt').value;
  const quality = parseInt(document.getElementById('convert-q').value);
  const whiteBg = document.getElementById('white-bg-toggle').classList.contains('on');
  const ext = getExt(mime);

  const results = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const img = await loadImage(f);
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (whiteBg || mime === 'image/jpeg') {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, mime, quality);
    const base = f.name.replace(/\.[^.]+$/, '');
    results.push({ blob, name: `${base}.${ext}` });
    URL.revokeObjectURL(img.src);
    setProgress('convert', Math.round(((i+1)/files.length)*100), `${i+1} / ${files.length} done`);
  }

  if (results.length === 1) downloadBlob(results[0].blob, results[0].name);
  else await downloadZip(results, 'forma-converted.zip');

  hideProgress('convert');
  btn.disabled = false;
  notify(`✓ ${results.length} file${results.length > 1 ? 's' : ''} converted to ${ext.toUpperCase()}!`);
}

/* ─────────────────────────────────────────────────────────────
   IMAGE → PDF
───────────────────────────────────────────────────────────── */
async function runImg2PDF() {
  const files = fileStore.img2pdf;
  if (!files.length) { notify('Please add at least one image.', 'error'); return; }
  const btn = document.getElementById('btn-img2pdf');
  btn.disabled = true;
  setProgress('img2pdf', 0, 'Building PDF…');

  const pageSz  = document.getElementById('pdf-pagesize').value;
  const orientRaw = document.getElementById('pdf-orient').value;
  const fit     = document.getElementById('pdf-fit').value;
  const margin  = parseInt(document.getElementById('pdf-margin').value) || 0;
  const outName = document.getElementById('pdf-filename').value || 'output.pdf';
  const orient  = orientRaw === 'landscape' ? 'l' : 'p';

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: orient, unit: 'mm', format: pageSz });

  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const aw = pw - margin * 2;
  const ah = ph - margin * 2;

  for (let i = 0; i < files.length; i++) {
    if (i > 0) doc.addPage(pageSz, orient);
    const img = await loadImage(files[i]);
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    const iw = img.naturalWidth, ih = img.naturalHeight;
    let dx = margin, dy = margin, dw = aw, dh = ah;

    if (fit === 'contain') {
      const ratio = Math.min(aw / iw, ah / ih);
      dw = iw * ratio; dh = ih * ratio;
      dx = margin + (aw - dw) / 2; dy = margin + (ah - dh) / 2;
    } else if (fit === 'cover') {
      const ratio = Math.max(aw / iw, ah / ih);
      dw = iw * ratio; dh = ih * ratio;
      dx = margin + (aw - dw) / 2; dy = margin + (ah - dh) / 2;
    }
    doc.addImage(dataUrl, 'JPEG', dx, dy, dw, dh);
    URL.revokeObjectURL(img.src);
    setProgress('img2pdf', Math.round(((i+1)/files.length)*100), `Page ${i+1} of ${files.length}`);
  }

  doc.save(outName);
  hideProgress('img2pdf');
  btn.disabled = false;
  notify(`✓ PDF created with ${files.length} page${files.length > 1 ? 's' : ''}!`);
}

/* ─────────────────────────────────────────────────────────────
   PDF → IMAGES (PDF.js)
───────────────────────────────────────────────────────────── */
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

async function runPDF2Img() {
  const files = fileStore.pdf2img;
  if (!files.length) { notify('Please select a PDF file.', 'error'); return; }
  const btn = document.getElementById('btn-pdf2img');
  btn.disabled = true;
  setProgress('pdf2img', 0, 'Loading PDF…');

  const mime     = document.getElementById('p2i-fmt').value;
  const quality  = parseInt(document.getElementById('p2i-q').value);
  const scale    = parseFloat(document.getElementById('p2i-scale').value);
  const rangeRaw = document.getElementById('p2i-pages').value.trim();
  const ext      = getExt(mime);

  const file = files[0];
  const buf  = await file.arrayBuffer();

  let pdfDoc;
  try {
    pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise;
  } catch (e) {
    notify('Failed to read PDF. Is it a valid file?', 'error');
    btn.disabled = false; hideProgress('pdf2img'); return;
  }

  const total = pdfDoc.numPages;
  const pages = parsePageRange(rangeRaw, total);
  const results = [];

  for (let pi = 0; pi < pages.length; pi++) {
    const pageNum = pages[pi];
    setProgress('pdf2img', Math.round(((pi+1)/pages.length)*100),
      `Rendering page ${pageNum} / ${total}…`);
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width; canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;
    const blob = await canvasToBlob(canvas, mime, quality);
    const base = file.name.replace(/\.pdf$/i, '');
    results.push({ blob, name: `${base}_page${pageNum}.${ext}` });
  }

  if (results.length === 1) downloadBlob(results[0].blob, results[0].name);
  else await downloadZip(results, `${file.name.replace(/\.pdf$/i,'')}_pages.zip`);

  hideProgress('pdf2img');
  btn.disabled = false;
  notify(`✓ Extracted ${results.length} page${results.length > 1 ? 's' : ''} from PDF!`);
}

function parsePageRange(raw, total) {
  if (!raw) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set();
  raw.split(',').forEach(part => {
    const range = part.trim().match(/^(\d+)(?:-(\d+))?$/);
    if (!range) return;
    const s = parseInt(range[1]), e = range[2] ? parseInt(range[2]) : s;
    for (let i = Math.max(1, s); i <= Math.min(total, e); i++) pages.add(i);
  });
  return Array.from(pages).sort((a, b) => a - b);
}

/* ─────────────────────────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────────────────────────── */
function toggleMobileMenu() {
  const btn = document.getElementById('nav-hamburger');
  const menu = document.getElementById('mobile-menu');
  btn.classList.toggle('open');
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}
function closeMobileMenu() {
  document.getElementById('nav-hamburger').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────────────────────────────
   IMAGE COMPRESS
───────────────────────────────────────────────────────────── */
async function runCompress() {
  const files = fileStore.compress;
  if (!files.length) { notify('Please select at least one image.', 'error'); return; }
  const btn = document.getElementById('btn-compress');
  btn.disabled = true;
  setProgress('compress', 0, 'Compressing…');

  const quality = parseInt(document.getElementById('compress-q').value);
  const fmtRaw = document.getElementById('compress-fmt').value;
  const results = [];

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const img = await loadImage(f);
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const mime = fmtRaw === 'original' ? (f.type || 'image/jpeg') : fmtRaw;
    const blob = await canvasToBlob(canvas, mime, quality);
    const ext = fmtRaw === 'original' ? f.name.split('.').pop() : getExt(mime);
    const base = f.name.replace(/\.[^.]+$/, '');
    results.push({ blob, name: `${base}_compressed.${ext}` });
    URL.revokeObjectURL(img.src);
    setProgress('compress', Math.round(((i+1)/files.length)*100), `${i+1} / ${files.length} done`);
  }

  if (results.length === 1) downloadBlob(results[0].blob, results[0].name);
  else await downloadZip(results, 'forma-compressed.zip');
  hideProgress('compress');
  btn.disabled = false;
  notify(`✓ ${results.length} image${results.length > 1 ? 's' : ''} compressed!`);
}

/* ─────────────────────────────────────────────────────────────
   PDF MERGE
───────────────────────────────────────────────────────────── */
async function runPDFMerge() {
  const files = fileStore.pdfmerge;
  if (files.length < 2) { notify('Please add at least 2 PDF files.', 'error'); return; }
  const btn = document.getElementById('btn-pdfmerge');
  btn.disabled = true;
  setProgress('pdfmerge', 0, 'Merging PDFs…');

  const outName = document.getElementById('pdfmerge-filename').value || 'merged.pdf';
  const { jsPDF } = window.jspdf;

  let doc = null;
  let totalPagesDone = 0;
  let totalPages = 0;

  // count total pages first
  const pdfDocs = [];
  for (let fi = 0; fi < files.length; fi++) {
    const buf = await files[fi].arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise;
    pdfDocs.push(pdfDoc);
    totalPages += pdfDoc.numPages;
  }

  for (let fi = 0; fi < pdfDocs.length; fi++) {
    const pdfDoc = pdfDocs[fi];
    for (let pi = 1; pi <= pdfDoc.numPages; pi++) {
      const page = await pdfDoc.getPage(pi);
      const vp = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      canvas.width = vp.width; canvas.height = vp.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport: vp }).promise;
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

      const pw = vp.width * 0.2645; // px to mm
      const ph = vp.height * 0.2645;

      if (!doc) {
        doc = new jsPDF({ orientation: vp.width > vp.height ? 'l' : 'p', unit: 'mm', format: [pw, ph] });
      } else {
        doc.addPage([pw, ph], vp.width > vp.height ? 'l' : 'p');
      }
      doc.addImage(dataUrl, 'JPEG', 0, 0, pw, ph);
      totalPagesDone++;
      setProgress('pdfmerge', Math.round((totalPagesDone / totalPages) * 100), `Page ${totalPagesDone} / ${totalPages}`);
    }
  }

  if (doc) doc.save(outName);
  hideProgress('pdfmerge');
  btn.disabled = false;
  notify(`✓ Merged ${files.length} PDFs into ${outName}!`);
}

/* ─────────────────────────────────────────────────────────────
   PDF SPLIT
───────────────────────────────────────────────────────────── */
function updateSplitMode() {
  const mode = document.getElementById('split-mode').value;
  document.getElementById('split-range-group').style.display = mode === 'range' ? 'flex' : 'none';
  document.getElementById('split-fixed-group').style.display = mode === 'fixed' ? 'flex' : 'none';
  const hints = {
    all: 'Each page will be saved as a separate PDF, bundled into a ZIP.',
    range: 'Enter page numbers like 1-3, 5, 7-9 to extract a specific range into one PDF.',
    fixed: 'PDF will be split into chunks of N pages each.'
  };
  document.getElementById('split-hint').textContent = hints[mode] || '';
}

async function runPDFSplit() {
  const files = fileStore.pdfsplit;
  if (!files.length) { notify('Please select a PDF file.', 'error'); return; }
  const btn = document.getElementById('btn-pdfsplit');
  btn.disabled = true;
  setProgress('pdfsplit', 0, 'Loading PDF…');

  const mode = document.getElementById('split-mode').value;
  const rangeRaw = document.getElementById('split-pages').value.trim();
  const fixedN = parseInt(document.getElementById('split-n').value) || 1;
  const { jsPDF } = window.jspdf;

  const file = files[0];
  const buf = await file.arrayBuffer();
  let pdfDoc;
  try { pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise; }
  catch { notify('Failed to read PDF.', 'error'); btn.disabled = false; hideProgress('pdfsplit'); return; }

  const total = pdfDoc.numPages;
  const baseName = file.name.replace(/\.pdf$/i, '');

  async function renderPageToPDF(pageNum) {
    const page = await pdfDoc.getPage(pageNum);
    const vp = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    canvas.width = vp.width; canvas.height = vp.height;
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const pw = vp.width * 0.2645, ph = vp.height * 0.2645;
    const doc = new jsPDF({ orientation: vp.width > vp.height ? 'l' : 'p', unit: 'mm', format: [pw, ph] });
    doc.addImage(dataUrl, 'JPEG', 0, 0, pw, ph);
    return doc.output('blob');
  }

  async function renderPagesToPDF(pageNums, firstDoc) {
    let doc = null;
    for (let i = 0; i < pageNums.length; i++) {
      const page = await pdfDoc.getPage(pageNums[i]);
      const vp = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      canvas.width = vp.width; canvas.height = vp.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport: vp }).promise;
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const pw = vp.width * 0.2645, ph = vp.height * 0.2645;
      if (!doc) {
        doc = new jsPDF({ orientation: vp.width > vp.height ? 'l' : 'p', unit: 'mm', format: [pw, ph] });
      } else {
        doc.addPage([pw, ph], vp.width > vp.height ? 'l' : 'p');
      }
      doc.addImage(dataUrl, 'JPEG', 0, 0, pw, ph);
    }
    return doc ? doc.output('blob') : null;
  }

  const results = [];

  if (mode === 'all') {
    for (let p = 1; p <= total; p++) {
      setProgress('pdfsplit', Math.round((p / total) * 100), `Splitting page ${p} / ${total}…`);
      const blob = await renderPageToPDF(p);
      results.push({ blob, name: `${baseName}_page${p}.pdf` });
    }
  } else if (mode === 'range') {
    const pages = parsePageRange(rangeRaw, total);
    if (!pages.length) { notify('No valid pages in range.', 'error'); btn.disabled = false; hideProgress('pdfsplit'); return; }
    setProgress('pdfsplit', 50, `Extracting ${pages.length} pages…`);
    const blob = await renderPagesToPDF(pages);
    if (blob) results.push({ blob, name: `${baseName}_pages${rangeRaw || 'all'}.pdf` });
    setProgress('pdfsplit', 100, 'Done');
  } else if (mode === 'fixed') {
    const chunks = [];
    for (let i = 1; i <= total; i += fixedN) chunks.push(Array.from({ length: Math.min(fixedN, total - i + 1) }, (_, k) => i + k));
    for (let ci = 0; ci < chunks.length; ci++) {
      setProgress('pdfsplit', Math.round(((ci + 1) / chunks.length) * 100), `Chunk ${ci + 1} / ${chunks.length}…`);
      const blob = await renderPagesToPDF(chunks[ci]);
      if (blob) results.push({ blob, name: `${baseName}_part${ci + 1}.pdf` });
    }
  }

  if (results.length === 1) downloadBlob(results[0].blob, results[0].name);
  else if (results.length > 1) await downloadZip(results, `${baseName}_split.zip`);

  hideProgress('pdfsplit');
  btn.disabled = false;
  notify(`✓ Split into ${results.length} PDF${results.length > 1 ? 's' : ''}!`);
}

/* ─────────────────────────────────────────────────────────────
   PDF COMPRESS
───────────────────────────────────────────────────────────── */
async function runPDFCompress() {
  const files = fileStore.pdfcompress;
  if (!files.length) { notify('Please select a PDF file.', 'error'); return; }
  const btn = document.getElementById('btn-pdfcompress');
  btn.disabled = true;
  setProgress('pdfcompress', 0, 'Loading PDF…');

  const level = document.getElementById('pdfcompress-level').value;
  const scaleMap = { low: 2.0, medium: 1.2, high: 0.8 };
  const qualityMap = { low: 0.85, medium: 0.65, high: 0.45 };
  const scale = scaleMap[level];
  const quality = qualityMap[level];

  const { jsPDF } = window.jspdf;
  const file = files[0];
  const buf = await file.arrayBuffer();
  let pdfDoc;
  try { pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise; }
  catch { notify('Failed to read PDF.', 'error'); btn.disabled = false; hideProgress('pdfcompress'); return; }

  const total = pdfDoc.numPages;
  let doc = null;

  for (let pi = 1; pi <= total; pi++) {
    setProgress('pdfcompress', Math.round((pi / total) * 100), `Compressing page ${pi} / ${total}…`);
    const page = await pdfDoc.getPage(pi);
    const vp = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = vp.width; canvas.height = vp.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const pw = vp.width * 0.2645, ph = vp.height * 0.2645;
    if (!doc) {
      doc = new jsPDF({ orientation: vp.width > vp.height ? 'l' : 'p', unit: 'mm', format: [pw, ph] });
    } else {
      doc.addPage([pw, ph], vp.width > vp.height ? 'l' : 'p');
    }
    doc.addImage(dataUrl, 'JPEG', 0, 0, pw, ph);
  }

  if (doc) {
    const outName = file.name.replace(/\.pdf$/i, '_compressed.pdf');
    doc.save(outName);
  }
  hideProgress('pdfcompress');
  btn.disabled = false;
  notify(`✓ PDF compressed (${level} level)!`);
}

/* ─────────────────────────────────────────────────────────────
   PDF ROTATE
───────────────────────────────────────────────────────────── */
async function runPDFRotate() {
  const files = fileStore.pdfrotate;
  if (!files.length) { notify('Please select a PDF file.', 'error'); return; }
  const btn = document.getElementById('btn-pdfrotate');
  btn.disabled = true;
  setProgress('pdfrotate', 0, 'Loading PDF…');

  const angleVal = parseInt(document.getElementById('rotate-angle').value);
  const rangeRaw = document.getElementById('rotate-pages').value.trim();
  const { jsPDF } = window.jspdf;

  const file = files[0];
  const buf = await file.arrayBuffer();
  let pdfDoc;
  try { pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise; }
  catch { notify('Failed to read PDF.', 'error'); btn.disabled = false; hideProgress('pdfrotate'); return; }

  const total = pdfDoc.numPages;
  const rotatePages = new Set(parsePageRange(rangeRaw, total));
  let doc = null;

  for (let pi = 1; pi <= total; pi++) {
    setProgress('pdfrotate', Math.round((pi / total) * 100), `Rotating page ${pi} / ${total}…`);
    const page = await pdfDoc.getPage(pi);
    const shouldRotate = rotatePages.has(pi);
    const vp = page.getViewport({ scale: 1.5, rotation: shouldRotate ? angleVal : 0 });
    const canvas = document.createElement('canvas');
    canvas.width = vp.width; canvas.height = vp.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const pw = vp.width * 0.2645, ph = vp.height * 0.2645;
    if (!doc) {
      doc = new jsPDF({ orientation: vp.width > vp.height ? 'l' : 'p', unit: 'mm', format: [pw, ph] });
    } else {
      doc.addPage([pw, ph], vp.width > vp.height ? 'l' : 'p');
    }
    doc.addImage(dataUrl, 'JPEG', 0, 0, pw, ph);
  }

  if (doc) {
    const outName = file.name.replace(/\.pdf$/i, '_rotated.pdf');
    doc.save(outName);
  }
  hideProgress('pdfrotate');
  btn.disabled = false;
  notify(`✓ PDF rotated ${angleVal}°!`);
}

/* ─────────────────────────────────────────────────────────────
   PDF WATERMARK
───────────────────────────────────────────────────────────── */
async function runPDFWatermark() {
  const files = fileStore.pdfwatermark;
  if (!files.length) { notify('Please select a PDF file.', 'error'); return; }
  const btn = document.getElementById('btn-pdfwatermark');
  btn.disabled = true;
  setProgress('pdfwatermark', 0, 'Loading PDF…');

  const wmText = document.getElementById('wm-text').value.trim() || 'WATERMARK';
  const opacity = parseInt(document.getElementById('wm-opacity').value) / 100;
  const fontSize = parseInt(document.getElementById('wm-size').value);
  const position = document.getElementById('wm-position').value;
  const color = document.getElementById('wm-color').value;
  const { jsPDF } = window.jspdf;

  // parse hex color to rgba
  const r = parseInt(color.slice(1,3), 16);
  const g = parseInt(color.slice(3,5), 16);
  const b = parseInt(color.slice(5,7), 16);

  const file = files[0];
  const buf = await file.arrayBuffer();
  let pdfDoc;
  try { pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise; }
  catch { notify('Failed to read PDF.', 'error'); btn.disabled = false; hideProgress('pdfwatermark'); return; }

  const total = pdfDoc.numPages;
  let doc = null;

  for (let pi = 1; pi <= total; pi++) {
    setProgress('pdfwatermark', Math.round((pi / total) * 100), `Watermarking page ${pi} / ${total}…`);
    const page = await pdfDoc.getPage(pi);
    const vp = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    canvas.width = vp.width; canvas.height = vp.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;

    // Draw watermark
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.font = `bold ${fontSize * 1.5}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const cx = canvas.width / 2, cy = canvas.height / 2;
    let tx = cx, ty = cy;
    const pad = 40;
    if (position === 'top-left') { tx = pad + ctx.measureText(wmText).width / 2; ty = pad + fontSize; ctx.globalAlpha = opacity; }
    else if (position === 'top-right') { tx = canvas.width - pad - ctx.measureText(wmText).width / 2; ty = pad + fontSize; }
    else if (position === 'bottom-left') { tx = pad + ctx.measureText(wmText).width / 2; ty = canvas.height - pad - fontSize; }
    else if (position === 'bottom-right') { tx = canvas.width - pad - ctx.measureText(wmText).width / 2; ty = canvas.height - pad - fontSize; }
    else { // center diagonal
      ctx.rotate(-Math.PI / 4);
      tx = 0; ty = 0;
      // translate to center for rotation
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.font = `bold ${fontSize * 1.5}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.translate(cx, cy);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(wmText, 0, 0);
      ctx.restore();
      const dataUrl2 = canvas.toDataURL('image/jpeg', 0.9);
      const pw2 = vp.width * 0.2645, ph2 = vp.height * 0.2645;
      if (!doc) {
        doc = new jsPDF({ orientation: vp.width > vp.height ? 'l' : 'p', unit: 'mm', format: [pw2, ph2] });
      } else {
        doc.addPage([pw2, ph2], vp.width > vp.height ? 'l' : 'p');
      }
      doc.addImage(dataUrl2, 'JPEG', 0, 0, pw2, ph2);
      continue;
    }
    ctx.fillText(wmText, tx, ty);
    ctx.restore();

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const pw = vp.width * 0.2645, ph = vp.height * 0.2645;
    if (!doc) {
      doc = new jsPDF({ orientation: vp.width > vp.height ? 'l' : 'p', unit: 'mm', format: [pw, ph] });
    } else {
      doc.addPage([pw, ph], vp.width > vp.height ? 'l' : 'p');
    }
    doc.addImage(dataUrl, 'JPEG', 0, 0, pw, ph);
  }

  if (doc) {
    const outName = file.name.replace(/\.pdf$/i, '_watermarked.pdf');
    doc.save(outName);
  }
  hideProgress('pdfwatermark');
  btn.disabled = false;
  notify(`✓ Watermark "${wmText}" added to ${total} page${total > 1 ? 's' : ''}!`);
}
