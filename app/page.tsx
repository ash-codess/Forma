'use client'

import { useEffect } from 'react'

const styles = `

    /* ─── RESET & BASE ───────────────────────────────────────────── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --red:    #E8231A;
      --black:  #0A0A0A;
      --white:  #F5F4F0;
      --gray:   #8A8A8A;
      --lgray:  #D8D6D0;
      --dgray:  #1A1A1A;
      --border: rgba(255,255,255,0.08);
      --font:   'Space Grotesk', sans-serif;
      --mono:   'Space Mono', monospace;
      --ease:   cubic-bezier(0.16, 1, 0.3, 1);
    }
    html { scroll-behavior: smooth; overflow-x: hidden; }
    body {
      font-family: var(--font);
      background: var(--black);
      color: var(--white);
      overflow-x: hidden;
      cursor: none;
    }
    ::selection { background: var(--red); color: var(--white); }
    img, video { max-width: 100%; display: block; }
    a { color: inherit; text-decoration: none; }
    button { cursor: none; font-family: var(--font); }

    /* ─── CUSTOM CURSOR ──────────────────────────────────────────── */
    #cursor-dot {
      position: fixed; top: 0; left: 0;
      width: 8px; height: 8px;
      background: var(--red);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: background 0.2s;
    }
    #cursor-ring {
      position: fixed; top: 0; left: 0;
      width: 36px; height: 36px;
      border: 1.5px solid rgba(232,35,26,0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
    }
    #cursor-label {
      position: fixed; top: 0; left: 0;
      font-size: 10px; font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--white);
      pointer-events: none;
      z-index: 9997;
      opacity: 0;
      transform: translate(16px, -50%);
      white-space: nowrap;
    }

    /* ─── LOADER ─────────────────────────────────────────────────── */
    #loader {
      position: fixed; inset: 0;
      background: var(--black);
      z-index: 9990;
      display: flex; align-items: center; justify-content: center;
      flex-direction: column; gap: 24px;
    }
    #loader-logo {
      font-size: 72px; font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1;
      overflow: hidden;
    }
    #loader-logo span {
      display: inline-block;
      transform: translateY(100%);
    }
    #loader-bar-wrap {
      width: 240px; height: 1px;
      background: rgba(255,255,255,0.1);
      overflow: hidden;
    }
    #loader-bar {
      height: 100%; width: 0%;
      background: var(--red);
    }
    #loader-pct {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--gray);
      letter-spacing: 0.1em;
    }

    /* ─── NAVIGATION ─────────────────────────────────────────────── */
    #nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 0 48px;
      height: 72px;
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid transparent;
      transition: border-color 0.4s, background 0.4s;
    }
    #nav.scrolled {
      background: rgba(10,10,10,0.92);
      backdrop-filter: blur(20px);
      border-color: var(--border);
    }
    .nav-logo {
      font-size: 22px; font-weight: 700;
      letter-spacing: -0.04em;
    }
    .nav-logo span { color: var(--red); }
    .nav-links {
      display: flex; align-items: center; gap: 40px;
      list-style: none;
    }
    .nav-links a {
      font-size: 13px; font-weight: 500;
      letter-spacing: 0.06em; text-transform: uppercase;
      color: var(--gray);
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--white); }
    .nav-cta {
      padding: 10px 24px;
      background: var(--red);
      color: var(--white) !important;
      border-radius: 2px;
      font-size: 12px !important;
      font-weight: 700 !important;
      letter-spacing: 0.1em !important;
    }
    .nav-cta:hover { background: #c91a12 !important; color: var(--white) !important; }

    /* ─── HERO ───────────────────────────────────────────────────── */
    #hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 0;
      padding-top: 72px;
      position: relative;
      overflow: hidden;
    }
    .hero-grid-overlay {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 80px 80px;
      pointer-events: none;
    }
    .hero-left {
      grid-column: 1 / 8;
      display: flex; flex-direction: column; justify-content: center;
      padding: 80px 48px 80px 80px;
      position: relative;
    }
    .hero-tag {
      display: inline-flex; align-items: center; gap: 10px;
      margin-bottom: 48px;
      opacity: 0;
    }
    .hero-tag-dot {
      width: 6px; height: 6px;
      background: var(--red);
      border-radius: 50%;
      animation: pulse-dot 2s infinite;
    }
    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.4); }
    }
    .hero-tag-text {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--gray);
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .hero-title {
      font-size: clamp(56px, 7vw, 96px);
      font-weight: 700;
      line-height: 0.95;
      letter-spacing: -0.04em;
      margin-bottom: 36px;
    }
    .hero-title .line { overflow: hidden; }
    .hero-title .word {
      display: inline-block;
      transform: translateY(110%);
    }
    .hero-title .accent { color: var(--red); }
    .hero-sub {
      font-size: 18px; font-weight: 400;
      color: var(--gray);
      line-height: 1.6;
      max-width: 480px;
      margin-bottom: 56px;
      opacity: 0;
    }
    .hero-actions {
      display: flex; gap: 16px; align-items: center;
      opacity: 0;
    }
    .btn-primary {
      padding: 16px 36px;
      background: var(--red);
      color: var(--white);
      font-size: 14px; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase;
      border: none; border-radius: 2px;
      transition: background 0.2s, transform 0.2s;
      display: inline-flex; align-items: center; gap: 10px;
    }
    .btn-primary:hover { background: #c91a12; transform: translateY(-2px); }
    .btn-ghost {
      padding: 16px 36px;
      background: transparent;
      color: var(--white);
      font-size: 14px; font-weight: 600;
      letter-spacing: 0.08em; text-transform: uppercase;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 2px;
      transition: border-color 0.2s, transform 0.2s;
      display: inline-flex; align-items: center; gap: 10px;
    }
    .btn-ghost:hover { border-color: var(--white); transform: translateY(-2px); }
    .hero-right {
      grid-column: 8 / 13;
      position: relative;
      display: flex; align-items: center; justify-content: center;
      padding: 80px 80px 80px 0;
    }
    .hero-visual {
      width: 100%; aspect-ratio: 1;
      max-width: 440px;
      position: relative;
      opacity: 0;
    }
    .hero-visual-card {
      position: absolute;
      background: var(--dgray);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 20px;
    }
    .hvc-main {
      inset: 0;
      display: flex; flex-direction: column; justify-content: flex-end;
      gap: 12px;
    }
    .hvc-img-placeholder {
      flex: 1;
      background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
      border-radius: 2px;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
      position: relative;
    }
    .hvc-img-placeholder::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, transparent 50%, rgba(232,35,26,0.06) 100%);
    }
    .hvc-grid-art {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(6, 1fr);
      gap: 2px;
      width: 80%; height: 80%;
    }
    .hvc-cell {
      background: rgba(255,255,255,0.04);
      border-radius: 1px;
      transition: background 0.3s;
    }
    .hvc-cell.active { background: var(--red); }
    .hvc-cell.mid { background: rgba(232,35,26,0.3); }
    .hvc-meta {
      display: flex; justify-content: space-between; align-items: center;
    }
    .hvc-meta-label {
      font-family: var(--mono); font-size: 10px;
      color: var(--gray); letter-spacing: 0.1em;
    }
    .hvc-meta-badge {
      background: var(--red); color: var(--white);
      font-family: var(--mono); font-size: 9px;
      font-weight: 700; letter-spacing: 0.1em;
      padding: 3px 8px; border-radius: 2px;
    }
    .hvc-bar {
      height: 2px; background: rgba(255,255,255,0.06);
      border-radius: 1px; overflow: hidden;
    }
    .hvc-bar-fill {
      height: 100%; border-radius: 1px;
      background: var(--red);
      width: 0;
      transition: width 1.5s var(--ease);
    }
    .hvc-float {
      width: 160px;
      top: 20px; right: -30px;
      animation: float-card 4s ease-in-out infinite;
    }
    @keyframes float-card {
      0%, 100% { transform: translateY(0px) rotate(2deg); }
      50% { transform: translateY(-12px) rotate(2deg); }
    }
    .hvc-float-2 {
      width: 140px;
      bottom: 40px; left: -40px;
      animation: float-card2 5s ease-in-out infinite;
    }
    @keyframes float-card2 {
      0%, 100% { transform: translateY(0px) rotate(-2deg); }
      50% { transform: translateY(10px) rotate(-2deg); }
    }
    .hvc-stat-label {
      font-family: var(--mono); font-size: 9px;
      color: var(--gray); letter-spacing: 0.1em; margin-bottom: 6px;
    }
    .hvc-stat-val {
      font-size: 28px; font-weight: 700;
      letter-spacing: -0.04em; line-height: 1;
    }
    .hvc-stat-val span { color: var(--red); }
    .hero-scroll-hint {
      position: absolute; bottom: 48px; left: 80px;
      display: flex; align-items: center; gap: 16px;
      opacity: 0;
    }
    .scroll-line {
      width: 48px; height: 1px;
      background: rgba(255,255,255,0.2);
      position: relative; overflow: hidden;
    }
    .scroll-line::after {
      content: '';
      position: absolute; top: 0; left: -100%;
      width: 100%; height: 100%;
      background: var(--red);
      animation: scroll-line-anim 2s ease-in-out infinite;
    }
    @keyframes scroll-line-anim {
      0% { left: -100%; } 100% { left: 100%; }
    }
    .scroll-hint-text {
      font-family: var(--mono); font-size: 10px;
      color: var(--gray); letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .hero-number {
      position: absolute; right: 80px; top: 50%;
      transform: translateY(-50%) rotate(90deg);
      font-family: var(--mono); font-size: 10px;
      color: rgba(255,255,255,0.15); letter-spacing: 0.2em;
    }

    /* ─── MARQUEE ────────────────────────────────────────────────── */
    #marquee {
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      padding: 20px 0;
      overflow: hidden;
      background: var(--dgray);
    }
    .marquee-track {
      display: flex; gap: 64px;
      white-space: nowrap;
      animation: marquee 24s linear infinite;
      width: max-content;
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .marquee-item {
      display: inline-flex; align-items: center; gap: 20px;
      font-size: 13px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--gray);
    }
    .marquee-sep {
      width: 4px; height: 4px;
      background: var(--red); border-radius: 50%;
    }

    /* ─── STATS ──────────────────────────────────────────────────── */
    #stats {
      padding: 120px 80px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1px;
      background: var(--border);
      border-top: 1px solid var(--border);
    }
    .stat-cell {
      background: var(--black);
      padding: 60px 48px;
    }
    .stat-number {
      font-size: clamp(48px, 5vw, 72px);
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1;
      margin-bottom: 12px;
    }
    .stat-number .accent { color: var(--red); }
    .stat-label {
      font-size: 13px; font-weight: 500;
      color: var(--gray);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    /* ─── FEATURES ───────────────────────────────────────────────── */
    #features {
      padding: 160px 80px;
    }
    .section-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      margin-bottom: 100px;
      align-items: end;
    }
    .section-tag {
      font-family: var(--mono);
      font-size: 11px; font-weight: 400;
      color: var(--red);
      letter-spacing: 0.16em; text-transform: uppercase;
      margin-bottom: 24px;
      display: flex; align-items: center; gap: 12px;
    }
    .section-tag::before {
      content: '';
      display: block; width: 24px; height: 1px;
      background: var(--red);
    }
    .section-title {
      font-size: clamp(36px, 4vw, 56px);
      font-weight: 700; line-height: 1.05;
      letter-spacing: -0.03em;
    }
    .section-title .line { overflow: hidden; }
    .section-title .inner { display: block; transform: translateY(100%); }
    .section-desc {
      font-size: 16px; line-height: 1.7;
      color: var(--gray); max-width: 460px;
      align-self: end;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1px;
      background: var(--border);
    }
    .feature-card {
      background: var(--black);
      padding: 56px 48px;
      position: relative;
      overflow: hidden;
      transition: background 0.3s;
    }
    .feature-card:hover { background: var(--dgray); }
    .feature-card::before {
      content: '';
      position: absolute; top: 0; left: 0;
      width: 0; height: 2px;
      background: var(--red);
      transition: width 0.4s var(--ease);
    }
    .feature-card:hover::before { width: 100%; }
    .feature-icon {
      width: 48px; height: 48px;
      margin-bottom: 36px;
      position: relative;
    }
    .feature-icon svg { width: 100%; height: 100%; }
    .feature-num {
      position: absolute; top: 56px; right: 48px;
      font-family: var(--mono); font-size: 10px;
      color: rgba(255,255,255,0.15); letter-spacing: 0.1em;
    }
    .feature-name {
      font-size: 20px; font-weight: 700;
      letter-spacing: -0.02em; margin-bottom: 16px;
    }
    .feature-text {
      font-size: 14px; line-height: 1.7;
      color: var(--gray);
    }

    /* ─── TOOLS SECTION ──────────────────────────────────────────── */
    #tools {
      padding: 160px 80px;
      background: var(--dgray);
    }
    .tools-tabs {
      display: flex; gap: 0; flex-wrap: wrap;
      border: 1px solid var(--border);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 64px;
    }
    .tab-btn {
      padding: 14px 32px;
      background: transparent;
      color: var(--gray);
      font-size: 12px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase;
      border: none;
      border-right: 1px solid var(--border);
      transition: color 0.2s, background 0.2s;
      position: relative;
    }
    .tab-btn:last-child { border-right: none; }
    .tab-btn.active {
      background: var(--red);
      color: var(--white);
    }
    .tab-btn:not(.active):hover { background: rgba(255,255,255,0.04); color: var(--white); }
    .tab-panel { display: none; }
    .tab-panel.active { display: block; }

    /* ─── TOOL CARD ──────────────────────────────────────────────── */
    .tool-card {
      display: grid;
      grid-template-columns: 1fr 420px;
      gap: 48px;
      background: var(--black);
      border: 1px solid var(--border);
      border-radius: 4px;
      overflow: hidden;
    }
    .tool-main { padding: 56px; }
    .tool-sidebar {
      background: var(--dgray);
      border-left: 1px solid var(--border);
      padding: 40px;
      display: flex; flex-direction: column; gap: 28px;
    }
    .tool-title {
      font-size: 28px; font-weight: 700;
      letter-spacing: -0.03em; margin-bottom: 8px;
    }
    .tool-desc {
      font-size: 14px; color: var(--gray); line-height: 1.6;
      margin-bottom: 40px;
    }

    /* Drop zone */
    .dropzone {
      border: 2px dashed rgba(255,255,255,0.12);
      border-radius: 4px;
      padding: 64px 40px;
      text-align: center;
      transition: border-color 0.2s, background 0.2s;
      position: relative;
      cursor: none;
    }
    .dropzone:hover, .dropzone.dragover {
      border-color: var(--red);
      background: rgba(232,35,26,0.04);
    }
    .dropzone input[type="file"] {
      position: absolute; inset: 0;
      opacity: 0; cursor: none; width: 100%; height: 100%;
    }
    .dz-icon {
      width: 48px; height: 48px;
      margin: 0 auto 20px;
      opacity: 0.3;
    }
    .dz-title {
      font-size: 16px; font-weight: 600;
      margin-bottom: 8px;
    }
    .dz-sub {
      font-size: 13px; color: var(--gray);
    }
    .dz-sub span { color: var(--red); }

    /* File list */
    .file-list {
      margin-top: 20px;
      display: flex; flex-direction: column; gap: 8px;
      max-height: 240px; overflow-y: auto;
    }
    .file-list::-webkit-scrollbar { width: 4px; }
    .file-list::-webkit-scrollbar-track { background: transparent; }
    .file-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
    .file-item {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 14px;
      background: var(--dgray);
      border: 1px solid var(--border);
      border-radius: 3px;
      font-size: 13px;
    }
    .file-item-icon { color: var(--red); flex-shrink: 0; font-size: 16px; }
    .file-item-name { flex: 1; truncate: ellipsis; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
    .file-item-size { font-family: var(--mono); font-size: 10px; color: var(--gray); flex-shrink: 0; }
    .file-item-remove {
      background: none; border: none;
      color: var(--gray); font-size: 16px;
      padding: 0 4px; flex-shrink: 0;
      transition: color 0.2s;
    }
    .file-item-remove:hover { color: var(--red); }

    /* Settings */
    .setting-group { display: flex; flex-direction: column; gap: 8px; }
    .setting-label {
      font-size: 11px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--gray);
    }
    .setting-row {
      display: flex; gap: 8px; align-items: center;
    }
    .setting-select, .setting-input {
      flex: 1;
      background: var(--black);
      border: 1px solid var(--border);
      color: var(--white);
      font-family: var(--font);
      font-size: 14px;
      padding: 10px 14px;
      border-radius: 3px;
      outline: none;
      transition: border-color 0.2s;
    }
    .setting-select:focus, .setting-input:focus { border-color: var(--red); }
    .setting-select option { background: var(--dgray); }
    .slider-wrap { display: flex; flex-direction: column; gap: 8px; }
    .slider-row { display: flex; justify-content: space-between; }
    .slider-val {
      font-family: var(--mono); font-size: 12px;
      color: var(--red);
    }
    input[type="range"] {
      -webkit-appearance: none;
      width: 100%; height: 2px;
      background: var(--border); border-radius: 1px; outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px; height: 14px;
      background: var(--red); border-radius: 50%;
      cursor: none;
      transition: transform 0.1s;
    }
    input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.3); }
    .toggle-row {
      display: flex; justify-content: space-between; align-items: center;
    }
    .toggle-label { font-size: 13px; color: var(--lgray); }
    .toggle {
      width: 40px; height: 22px;
      background: var(--border);
      border-radius: 11px;
      position: relative; cursor: none;
      transition: background 0.2s;
    }
    .toggle.on { background: var(--red); }
    .toggle::after {
      content: '';
      position: absolute;
      width: 16px; height: 16px;
      background: var(--white);
      border-radius: 50%;
      top: 3px; left: 3px;
      transition: transform 0.2s;
    }
    .toggle.on::after { transform: translateX(18px); }
    .divider {
      height: 1px; background: var(--border);
      margin: 4px 0;
    }

    /* Action bar */
    .action-bar {
      margin-top: 32px;
      display: flex; gap: 12px; align-items: center;
    }
    .btn-convert {
      padding: 14px 32px;
      background: var(--red); color: var(--white);
      font-size: 13px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase;
      border: none; border-radius: 3px;
      transition: background 0.2s, transform 0.2s;
      display: flex; align-items: center; gap: 10px;
    }
    .btn-convert:hover { background: #c91a12; transform: translateY(-1px); }
    .btn-convert:disabled { opacity: 0.5; pointer-events: none; }
    .btn-clear {
      padding: 14px 24px;
      background: transparent; color: var(--gray);
      font-size: 13px; font-weight: 600;
      letter-spacing: 0.08em; text-transform: uppercase;
      border: 1px solid var(--border); border-radius: 3px;
      transition: border-color 0.2s, color 0.2s;
    }
    .btn-clear:hover { border-color: rgba(255,255,255,0.3); color: var(--white); }

    /* Progress */
    .progress-wrap {
      margin-top: 16px;
      display: none;
    }
    .progress-label {
      font-family: var(--mono); font-size: 11px;
      color: var(--gray); letter-spacing: 0.1em;
      margin-bottom: 8px;
    }
    .progress-bar {
      height: 2px; background: var(--border);
      border-radius: 1px; overflow: hidden;
    }
    .progress-fill {
      height: 100%; background: var(--red);
      border-radius: 1px; width: 0%;
      transition: width 0.3s;
    }

    /* Notification */
    #notification {
      position: fixed;
      bottom: 40px; right: 48px;
      padding: 16px 24px;
      background: var(--dgray);
      border: 1px solid var(--border);
      border-radius: 4px;
      font-size: 14px; font-weight: 500;
      display: flex; align-items: center; gap: 12px;
      z-index: 999;
      transform: translateY(120%);
      transition: transform 0.4s var(--ease);
      max-width: 360px;
    }
    #notification.show { transform: translateY(0); }
    #notification.success { border-color: #22c55e; }
    #notification.error { border-color: var(--red); }
    .notif-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .notif-dot.success { background: #22c55e; }
    .notif-dot.error { background: var(--red); }

    /* Size inputs */
    .size-inputs {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 8px; align-items: center;
    }
    .size-lock {
      width: 32px; height: 32px;
      background: var(--border); border: none;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: var(--gray); font-size: 14px;
      transition: background 0.2s, color 0.2s;
    }
    .size-lock.locked { background: rgba(232,35,26,0.2); color: var(--red); }

    /* ─── PRIVACY SECTION ────────────────────────────────────────── */
    #privacy {
      padding: 160px 80px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 120px;
      align-items: center;
    }
    .privacy-left .section-title { margin-bottom: 32px; }
    .privacy-points {
      display: flex; flex-direction: column; gap: 24px;
      margin-top: 48px;
    }
    .privacy-point {
      display: flex; gap: 20px;
      padding: 28px;
      border: 1px solid var(--border);
      border-radius: 4px;
      transition: border-color 0.3s, background 0.3s;
    }
    .privacy-point:hover {
      border-color: rgba(232,35,26,0.3);
      background: rgba(232,35,26,0.04);
    }
    .pp-icon {
      width: 40px; height: 40px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: rgba(232,35,26,0.1);
      border-radius: 2px;
    }
    .pp-icon svg { width: 20px; height: 20px; stroke: var(--red); }
    .pp-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
    .pp-text { font-size: 13px; color: var(--gray); line-height: 1.6; }
    .privacy-right {
      position: relative; display: flex;
      align-items: center; justify-content: center;
    }
    .privacy-visual {
      width: 100%; max-width: 420px; aspect-ratio: 1;
      background: var(--dgray);
      border: 1px solid var(--border);
      border-radius: 4px;
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
    }
    .privacy-ring {
      width: 60%; aspect-ratio: 1;
      border: 1px solid rgba(232,35,26,0.2);
      border-radius: 50%;
      position: absolute;
      animation: ring-pulse 3s ease-in-out infinite;
    }
    .privacy-ring:nth-child(2) {
      width: 75%;
      border-color: rgba(232,35,26,0.1);
      animation-delay: -1s;
    }
    .privacy-ring:nth-child(3) {
      width: 90%;
      border-color: rgba(232,35,26,0.05);
      animation-delay: -2s;
    }
    @keyframes ring-pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.7; }
    }
    .privacy-lock-icon {
      width: 80px; height: 80px; position: relative; z-index: 1;
    }
    .privacy-lock-icon svg { width: 100%; height: 100%; }

    /* ─── HOW IT WORKS ───────────────────────────────────────────── */
    #how {
      padding: 160px 80px;
      background: var(--dgray);
    }
    .how-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1px;
      background: var(--border);
      margin-top: 100px;
    }
    .how-step {
      background: var(--dgray);
      padding: 56px 40px;
      position: relative;
    }
    .how-step-num {
      font-size: 72px; font-weight: 700;
      letter-spacing: -0.06em;
      color: rgba(255,255,255,0.06);
      line-height: 1;
      margin-bottom: 24px;
    }
    .how-step-title {
      font-size: 18px; font-weight: 700;
      margin-bottom: 12px;
    }
    .how-step-text {
      font-size: 14px; color: var(--gray); line-height: 1.7;
    }
    .how-arrow {
      position: absolute; right: -1px; top: 50%;
      transform: translateY(-50%);
      width: 24px; height: 24px;
      background: var(--red);
      clip-path: polygon(0 50%, 100% 0, 100% 100%);
      z-index: 1;
    }
    .how-step:last-child .how-arrow { display: none; }

    /* ─── FOOTER ─────────────────────────────────────────────────── */
    footer {
      border-top: 1px solid var(--border);
      padding: 64px 80px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px; align-items: center;
    }
    .footer-logo {
      font-size: 36px; font-weight: 700;
      letter-spacing: -0.04em; margin-bottom: 12px;
    }
    .footer-logo span { color: var(--red); }
    .footer-tagline { font-size: 14px; color: var(--gray); }
    .footer-right {
      display: flex; flex-direction: column; align-items: flex-end; gap: 24px;
    }
    .footer-links {
      display: flex; gap: 32px; list-style: none;
    }
    .footer-links a {
      font-size: 12px; font-weight: 600;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--gray); transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--white); }
    .footer-copy {
      font-family: var(--mono); font-size: 11px;
      color: rgba(255,255,255,0.2); letter-spacing: 0.06em;
    }

    /* ─── HAMBURGER MENU ─────────────────────────────────────────── */
    .nav-hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      padding: 8px;
      z-index: 200;
    }
    .nav-hamburger span {
      display: block;
      width: 24px;
      height: 1.5px;
      background: var(--white);
      transition: transform 0.3s, opacity 0.3s;
    }
    .nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
    .nav-hamburger.open span:nth-child(2) { opacity: 0; }
    .nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
    .nav-mobile-menu {
      display: none;
      position: fixed;
      inset: 0;
      background: var(--black);
      z-index: 150;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 40px;
    }
    .nav-mobile-menu.open { display: flex; }
    .nav-mobile-menu a {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: var(--gray);
      transition: color 0.2s;
    }
    .nav-mobile-menu a:hover { color: var(--white); }
    .nav-mobile-menu .nav-cta {
      font-size: 14px !important;
      padding: 14px 36px !important;
      color: var(--white) !important;
    }

    /* ─── RESPONSIVE ─────────────────────────────────────────────── */
    @media (max-width: 1200px) {
      #hero { grid-template-columns: 1fr; }
      .hero-left { grid-column: 1; padding: 80px 48px; }
      .hero-right { display: none; }
      #stats { grid-template-columns: repeat(2, 1fr); }
      .features-grid { grid-template-columns: repeat(3, 1fr); }
      .tool-card { grid-template-columns: 1fr; }
      .tool-sidebar { border-left: none; border-top: 1px solid var(--border); }
      #privacy { grid-template-columns: 1fr; gap: 80px; }
      .privacy-right { display: none; }
      .how-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 900px) {
      .tools-tabs { display: grid; grid-template-columns: repeat(3, 1fr); }
      .tab-btn { border-right: none; border-bottom: 1px solid var(--border); font-size: 11px; padding: 12px 8px; }
    }
    @media (max-width: 768px) {
      body { cursor: auto; }
      #cursor-dot, #cursor-ring, #cursor-label { display: none; }
      button { cursor: pointer; }
      input[type="file"] { cursor: pointer; }
      input[type="range"]::-webkit-slider-thumb { cursor: pointer; }
      .dropzone { cursor: pointer; }
      .toggle { cursor: pointer; }
      .size-lock { cursor: pointer; }
      #nav { padding: 0 20px; height: 64px; }
      .nav-links { display: none; }
      .nav-hamburger { display: flex; }
      .hero-left { padding: 48px 20px 60px; }
      .hero-title { font-size: clamp(40px, 12vw, 72px); }
      .hero-sub { font-size: 16px; }
      .hero-actions { flex-direction: column; align-items: flex-start; gap: 12px; }
      .btn-primary, .btn-ghost { width: 100%; justify-content: center; padding: 14px 24px; }
      .hero-scroll-hint { left: 20px; bottom: 24px; }
      #stats { padding: 60px 20px; grid-template-columns: repeat(2, 1fr); }
      .stat-cell { padding: 32px 20px; }
      #features { padding: 80px 20px; }
      #tools { padding: 80px 20px; }
      #privacy { padding: 80px 20px; gap: 48px; }
      #how { padding: 80px 20px; }
      footer { padding: 48px 20px; grid-template-columns: 1fr; gap: 40px; }
      .footer-right { align-items: flex-start; }
      .footer-links { flex-wrap: wrap; gap: 16px; }
      .section-header { grid-template-columns: 1fr; gap: 24px; margin-bottom: 48px; }
      .features-grid { grid-template-columns: 1fr; gap: 16px; }
      .feature-card { padding: 32px 24px; }
      .how-grid { grid-template-columns: 1fr; }
      .how-step { padding: 36px 24px; }
      .how-arrow { display: none !important; }
      .tools-tabs { display: grid; grid-template-columns: repeat(2, 1fr); border-radius: 4px 4px 0 0; }
      .tab-btn { border-right: none !important; border-bottom: 1px solid var(--border); font-size: 11px; padding: 12px 8px; }
      .tab-btn:nth-child(odd) { border-right: 1px solid var(--border) !important; }
      .tool-card { gap: 0; }
      .tool-main { padding: 28px 20px; }
      .tool-sidebar { padding: 24px 20px; }
      .dropzone { padding: 40px 20px; }
      .action-bar { flex-direction: column; gap: 10px; }
      .btn-convert, .btn-clear { width: 100%; justify-content: center; }
      #notification { right: 20px; left: 20px; max-width: none; bottom: 20px; }
      .size-inputs { grid-template-columns: 1fr auto 1fr; }
    }
    @media (max-width: 480px) {
      .hero-title { font-size: clamp(36px, 11vw, 60px); }
      #stats { grid-template-columns: 1fr 1fr; padding: 40px 20px; }
      .stat-number { font-size: 40px; }
      .tools-tabs { grid-template-columns: 1fr 1fr; }
    }
  
`

const bodyHTML = `
<!-- CURSOR -->
<div id="cursor-dot"></div>
<div id="cursor-ring"></div>
<div id="cursor-label"></div>

<!-- LOADER -->
<div id="loader">
  <div id="loader-logo">
    <span>F</span><span>O</span><span>R</span><span>M</span><span>A</span>
  </div>
  <div id="loader-bar-wrap"><div id="loader-bar"></div></div>
  <div id="loader-pct">0%</div>
</div>

<!-- NOTIFICATION -->
<div id="notification">
  <div class="notif-dot" id="notif-dot"></div>
  <span id="notif-msg"></span>
</div>

<!-- NAVIGATION -->
<nav id="nav">
  <a href="#" class="nav-logo">FORM<span>A</span></a>
  <ul class="nav-links">
    <li><a href="#features">Features</a></li>
    <li><a href="#tools">Tools</a></li>
    <li><a href="#privacy">Privacy</a></li>
    <li><a href="#how">How It Works</a></li>
    <li><a href="#tools" class="nav-cta">Use Free</a></li>
  </ul>
  <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu" onclick="toggleMobileMenu()">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- MOBILE MENU -->
<div class="nav-mobile-menu" id="mobile-menu">
  <a href="#features" onclick="closeMobileMenu()">Features</a>
  <a href="#tools" onclick="closeMobileMenu()">Tools</a>
  <a href="#privacy" onclick="closeMobileMenu()">Privacy</a>
  <a href="#how" onclick="closeMobileMenu()">How It Works</a>
  <a href="#tools" class="nav-cta" onclick="closeMobileMenu()">Use Free →</a>
</div>

<!-- HERO -->
<section id="hero">
  <div class="hero-grid-overlay"></div>
  <div class="hero-left">
    <div class="hero-tag">
      <div class="hero-tag-dot"></div>
      <span class="hero-tag-text">100% Client-Side Processing</span>
    </div>
    <h1 class="hero-title">
      <div class="line"><span class="word">Transform</span></div>
      <div class="line"><span class="word">Without</span> <span class="word accent">Limits</span></div>
      <div class="line"><span class="word">Or&nbsp;Exposure.</span></div>
    </h1>
    <p class="hero-sub">Resize, convert, and compress images and PDFs directly in your browser. Your files never touch a server — ever.</p>
    <div class="hero-actions">
      <a href="#tools" class="btn-primary">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
        Start Converting
      </a>
      <a href="#features" class="btn-ghost">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
        Learn More
      </a>
    </div>
    <div class="hero-scroll-hint">
      <div class="scroll-line"></div>
      <span class="scroll-hint-text">Scroll to explore</span>
    </div>
  </div>
  <div class="hero-right">
    <div class="hero-visual">
      <div class="hero-visual-card hvc-main">
        <div class="hvc-img-placeholder">
          <div class="hvc-grid-art" id="hvc-grid"></div>
        </div>
        <div class="hvc-meta">
          <span class="hvc-meta-label">QUALITY ——</span>
          <span class="hvc-meta-badge">PNG → WEBP</span>
        </div>
        <div class="hvc-bar"><div class="hvc-bar-fill" id="hvc-bar-fill"></div></div>
      </div>
      <div class="hero-visual-card hvc-float">
        <div class="hvc-stat-label">FILE SIZE</div>
        <div class="hvc-stat-val">-<span>74</span>%</div>
      </div>
      <div class="hero-visual-card hvc-float-2">
        <div class="hvc-stat-label">PRIVACY</div>
        <div class="hvc-stat-val" style="font-size:18px; letter-spacing:0.01em;">100% LOCAL</div>
      </div>
    </div>
    <div class="hero-number">01 / FORMA</div>
  </div>
</section>

<!-- MARQUEE -->
<div id="marquee">
  <div class="marquee-track">
    <span class="marquee-item">Image Resize<span class="marquee-sep"></span></span>
    <span class="marquee-item">Image Compress<span class="marquee-sep"></span></span>
    <span class="marquee-item">PNG to JPEG<span class="marquee-sep"></span></span>
    <span class="marquee-item">WebP Converter<span class="marquee-sep"></span></span>
    <span class="marquee-item">PDF to Image<span class="marquee-sep"></span></span>
    <span class="marquee-item">Image to PDF<span class="marquee-sep"></span></span>
    <span class="marquee-item">Merge PDF<span class="marquee-sep"></span></span>
    <span class="marquee-item">Split PDF<span class="marquee-sep"></span></span>
    <span class="marquee-item">Compress PDF<span class="marquee-sep"></span></span>
    <span class="marquee-item">Rotate PDF<span class="marquee-sep"></span></span>
    <span class="marquee-item">Watermark PDF<span class="marquee-sep"></span></span>
    <span class="marquee-item">Batch Processing<span class="marquee-sep"></span></span>
    <span class="marquee-item">100% Private<span class="marquee-sep"></span></span>
    <span class="marquee-item">Image Resize<span class="marquee-sep"></span></span>
    <span class="marquee-item">Image Compress<span class="marquee-sep"></span></span>
    <span class="marquee-item">PNG to JPEG<span class="marquee-sep"></span></span>
    <span class="marquee-item">WebP Converter<span class="marquee-sep"></span></span>
    <span class="marquee-item">PDF to Image<span class="marquee-sep"></span></span>
    <span class="marquee-item">Image to PDF<span class="marquee-sep"></span></span>
    <span class="marquee-item">Merge PDF<span class="marquee-sep"></span></span>
    <span class="marquee-item">Split PDF<span class="marquee-sep"></span></span>
    <span class="marquee-item">Compress PDF<span class="marquee-sep"></span></span>
    <span class="marquee-item">Rotate PDF<span class="marquee-sep"></span></span>
    <span class="marquee-item">Watermark PDF<span class="marquee-sep"></span></span>
    <span class="marquee-item">Batch Processing<span class="marquee-sep"></span></span>
    <span class="marquee-item">100% Private<span class="marquee-sep"></span></span>
  </div>
</div>

<!-- STATS -->
<section id="stats">
  <div class="stat-cell">
    <div class="stat-number"><span class="stat-count" data-target="100">0</span><span class="accent">%</span></div>
    <div class="stat-label">Client-Side Only</div>
  </div>
  <div class="stat-cell">
    <div class="stat-number"><span class="stat-count" data-target="10">0</span><span class="accent">+</span></div>
    <div class="stat-label">Conversion Tools</div>
  </div>
  <div class="stat-cell">
    <div class="stat-number"><span class="stat-count" data-target="0">0</span><span class="accent">KB</span></div>
    <div class="stat-label">Data Transmitted</div>
  </div>
  <div class="stat-cell">
    <div class="stat-number"><span class="stat-count" data-target="8">0</span><span class="accent">+</span></div>
    <div class="stat-label">Output Formats</div>
  </div>
</section>

<!-- FEATURES -->
<section id="features">
  <div class="section-header">
    <div>
      <div class="section-tag">Capabilities</div>
      <h2 class="section-title">
        <div class="line"><span class="inner">Everything you</span></div>
        <div class="line"><span class="inner">need, nothing</span></div>
        <div class="line"><span class="inner">you don't.</span></div>
      </h2>
    </div>
    <p class="section-desc">Professional-grade image and PDF processing tools, all running locally in your browser with zero compromise on privacy or quality.</p>
  </div>
  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-num">01</div>
      <div class="feature-icon">
        <svg fill="none" stroke="var(--red)" stroke-width="1.5" viewBox="0 0 48 48">
          <rect x="6" y="6" width="36" height="36" rx="3"/>
          <path d="M6 32l10-10 8 8 8-12 10 8"/>
        </svg>
      </div>
      <h3 class="feature-name">Image Resizer</h3>
      <p class="feature-text">Resize images to exact pixel dimensions. Lock aspect ratio, choose fit/fill/stretch modes, and control quality.</p>
    </div>
    <div class="feature-card">
      <div class="feature-num">02</div>
      <div class="feature-icon">
        <svg fill="none" stroke="var(--red)" stroke-width="1.5" viewBox="0 0 48 48">
          <path d="M24 8v24M16 24l8 8 8-8"/><rect x="8" y="36" width="32" height="4" rx="1"/>
        </svg>
      </div>
      <h3 class="feature-name">Image Compressor</h3>
      <p class="feature-text">Reduce image file sizes significantly. Fine-tune quality from 1–99 and optionally strip metadata.</p>
    </div>
    <div class="feature-card">
      <div class="feature-num">03</div>
      <div class="feature-icon">
        <svg fill="none" stroke="var(--red)" stroke-width="1.5" viewBox="0 0 48 48">
          <path d="M8 12h32M8 24h24M8 36h16"/>
          <circle cx="38" cy="30" r="8"/>
          <path d="M35 30l3 3 5-5"/>
        </svg>
      </div>
      <h3 class="feature-name">Format Converter</h3>
      <p class="feature-text">Convert between PNG, JPEG, WebP, and BMP. Batch process entire sets with consistent quality settings.</p>
    </div>
    <div class="feature-card">
      <div class="feature-num">04</div>
      <div class="feature-icon">
        <svg fill="none" stroke="var(--red)" stroke-width="1.5" viewBox="0 0 48 48">
          <path d="M10 6h20l12 12v24H10V6z"/>
          <path d="M30 6v12h12"/>
          <path d="M18 26h12M18 32h8"/>
        </svg>
      </div>
      <h3 class="feature-name">Image to PDF</h3>
      <p class="feature-text">Combine multiple images into a polished PDF. Control page size, orientation, margins, and image fitting.</p>
    </div>
    <div class="feature-card">
      <div class="feature-num">05</div>
      <div class="feature-icon">
        <svg fill="none" stroke="var(--red)" stroke-width="1.5" viewBox="0 0 48 48">
          <path d="M10 6h20l12 12v24H10V6z"/>
          <path d="M30 6v12h12"/>
          <path d="M24 36V20M17 27l7 9 7-9"/>
        </svg>
      </div>
      <h3 class="feature-name">PDF to Images</h3>
      <p class="feature-text">Extract any pages from a PDF as high-quality images. Choose format, resolution scale, and page ranges.</p>
    </div>
    <div class="feature-card">
      <div class="feature-num">06</div>
      <div class="feature-icon">
        <svg fill="none" stroke="var(--red)" stroke-width="1.5" viewBox="0 0 48 48">
          <path d="M8 6h14l8 8v28H8V6z"/><path d="M22 6v8h8"/>
          <path d="M28 20h12l-6 6-6-6z" fill="rgba(232,35,26,0.2)" stroke="none"/>
          <path d="M34 26v16"/>
        </svg>
      </div>
      <h3 class="feature-name">Merge PDFs</h3>
      <p class="feature-text">Combine multiple PDF files into one seamless document. Preserves all pages in your chosen order.</p>
    </div>
    <div class="feature-card">
      <div class="feature-num">07</div>
      <div class="feature-icon">
        <svg fill="none" stroke="var(--red)" stroke-width="1.5" viewBox="0 0 48 48">
          <path d="M10 6h20l12 12v24H10V6z"/><path d="M30 6v12h12"/>
          <path d="M10 28h28M10 36h28" stroke-dasharray="4 3"/>
        </svg>
      </div>
      <h3 class="feature-name">Split PDF</h3>
      <p class="feature-text">Split a PDF into individual pages, extract specific ranges, or divide into fixed-size chunks.</p>
    </div>
    <div class="feature-card">
      <div class="feature-num">08</div>
      <div class="feature-icon">
        <svg fill="none" stroke="var(--red)" stroke-width="1.5" viewBox="0 0 48 48">
          <path d="M10 6h20l12 12v24H10V6z"/><path d="M30 6v12h12"/>
          <path d="M24 20v16M18 28l6 8 6-8"/>
        </svg>
      </div>
      <h3 class="feature-name">Compress PDF</h3>
      <p class="feature-text">Shrink PDF file sizes by re-rendering at optimised resolution. Three compression levels for full control.</p>
    </div>
    <div class="feature-card">
      <div class="feature-num">09</div>
      <div class="feature-icon">
        <svg fill="none" stroke="var(--red)" stroke-width="1.5" viewBox="0 0 48 48">
          <path d="M10 6h20l12 12v24H10V6z"/><path d="M30 6v12h12"/>
          <path d="M31 28a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"/>
          <path d="M27 22l4-2-1 4"/>
        </svg>
      </div>
      <h3 class="feature-name">Rotate PDF</h3>
      <p class="feature-text">Rotate all or specific pages by 90°, 180°, or 270°. Fix scanned documents with wrong orientation.</p>
    </div>
    <div class="feature-card">
      <div class="feature-num">10</div>
      <div class="feature-icon">
        <svg fill="none" stroke="var(--red)" stroke-width="1.5" viewBox="0 0 48 48">
          <path d="M10 6h20l12 12v24H10V6z"/><path d="M30 6v12h12"/>
          <path d="M16 32l16-16" stroke="var(--red)" stroke-width="2" opacity="0.6"/>
        </svg>
      </div>
      <h3 class="feature-name">Watermark PDF</h3>
      <p class="feature-text">Add text watermarks to every page. Customize opacity, font size, color, and position — diagonal or corner.</p>
    </div>
  </div>
</section>

<!-- TOOLS -->
<section id="tools">
  <div class="section-header">
    <div>
      <div class="section-tag">Tools</div>
      <h2 class="section-title">
        <div class="line"><span class="inner">Start converting</span></div>
        <div class="line"><span class="inner">right now.</span></div>
      </h2>
    </div>
    <p class="section-desc">Select a tool below. All processing happens locally — your files never leave your device.</p>
  </div>

  <div class="tools-tabs">
    <button class="tab-btn active" onclick="switchTab('resize')">↔ Resize</button>
    <button class="tab-btn" onclick="switchTab('compress')">⬇ Compress</button>
    <button class="tab-btn" onclick="switchTab('convert')">⇄ Convert</button>
    <button class="tab-btn" onclick="switchTab('img2pdf')">↑ Image→PDF</button>
    <button class="tab-btn" onclick="switchTab('pdf2img')">↓ PDF→Images</button>
    <button class="tab-btn" onclick="switchTab('pdfmerge')">⊕ Merge PDF</button>
    <button class="tab-btn" onclick="switchTab('pdfsplit')">⊗ Split PDF</button>
    <button class="tab-btn" onclick="switchTab('pdfcompress')">⬇ Compress PDF</button>
    <button class="tab-btn" onclick="switchTab('pdfrotate')">↻ Rotate PDF</button>
    <button class="tab-btn" onclick="switchTab('pdfwatermark')">◈ Watermark</button>
  </div>

  <!-- TAB: RESIZE -->
  <div class="tab-panel active" id="panel-resize">
    <div class="tool-card">
      <div class="tool-main">
        <h3 class="tool-title">Image Resizer</h3>
        <p class="tool-desc">Resize images to exact dimensions. Supports PNG, JPEG, WebP, BMP, and GIF files.</p>
        <div class="dropzone" id="dz-resize">
          <input type="file" id="file-resize" accept="image/*" multiple />
          <div class="dz-icon">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
              <rect x="4" y="4" width="40" height="40" rx="4"/>
              <path d="M24 16v16M16 24h16"/>
            </svg>
          </div>
          <div class="dz-title">Drop images here</div>
          <div class="dz-sub">or <span>browse files</span> — PNG, JPEG, WebP, BMP supported</div>
        </div>
        <div class="file-list" id="fl-resize"></div>
        <div class="action-bar">
          <button class="btn-convert" id="btn-resize" onclick="runResize()">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
            Resize Images
          </button>
          <button class="btn-clear" onclick="clearFiles('resize')">Clear All</button>
        </div>
        <div class="progress-wrap" id="prog-resize">
          <div class="progress-label" id="prog-resize-label">Processing…</div>
          <div class="progress-bar"><div class="progress-fill" id="prog-resize-fill"></div></div>
        </div>
      </div>
      <div class="tool-sidebar">
        <div class="setting-group">
          <div class="setting-label">Dimensions</div>
          <div class="size-inputs">
            <input type="number" class="setting-input" id="resize-w" placeholder="Width px" min="1" />
            <button class="size-lock locked" id="lock-btn" onclick="toggleLock()" title="Lock aspect ratio">🔗</button>
            <input type="number" class="setting-input" id="resize-h" placeholder="Height px" min="1" />
          </div>
        </div>
        <div class="divider"></div>
        <div class="setting-group">
          <div class="setting-label">Resize Mode</div>
          <select class="setting-select" id="resize-mode">
            <option value="fit">Fit (maintain ratio)</option>
            <option value="fill">Fill (crop to fill)</option>
            <option value="stretch">Stretch (ignore ratio)</option>
            <option value="width">Width only</option>
            <option value="height">Height only</option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="setting-group">
          <div class="setting-label">Output Format</div>
          <select class="setting-select" id="resize-fmt">
            <option value="original">Keep Original</option>
            <option value="image/jpeg">JPEG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="slider-wrap">
          <div class="slider-row">
            <div class="setting-label">Quality</div>
            <div class="slider-val" id="resize-q-val">85%</div>
          </div>
          <input type="range" id="resize-q" min="1" max="100" value="85"
            oninput="document.getElementById('resize-q-val').textContent=this.value+'%'" />
        </div>
      </div>
    </div>
  </div>

  <!-- TAB: CONVERT -->
  <div class="tab-panel" id="panel-convert">
    <div class="tool-card">
      <div class="tool-main">
        <h3 class="tool-title">Format Converter</h3>
        <p class="tool-desc">Convert images between formats. Multiple files are bundled into a ZIP for easy download.</p>
        <div class="dropzone" id="dz-convert">
          <input type="file" id="file-convert" accept="image/*" multiple />
          <div class="dz-icon">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
              <path d="M8 24h32M30 16l10 8-10 8"/>
            </svg>
          </div>
          <div class="dz-title">Drop images to convert</div>
          <div class="dz-sub">or <span>browse files</span> — any image format accepted</div>
        </div>
        <div class="file-list" id="fl-convert"></div>
        <div class="action-bar">
          <button class="btn-convert" id="btn-convert" onclick="runConvert()">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
            Convert Files
          </button>
          <button class="btn-clear" onclick="clearFiles('convert')">Clear All</button>
        </div>
        <div class="progress-wrap" id="prog-convert">
          <div class="progress-label" id="prog-convert-label">Processing…</div>
          <div class="progress-bar"><div class="progress-fill" id="prog-convert-fill"></div></div>
        </div>
      </div>
      <div class="tool-sidebar">
        <div class="setting-group">
          <div class="setting-label">Convert To</div>
          <select class="setting-select" id="convert-fmt">
            <option value="image/jpeg">JPEG (.jpg)</option>
            <option value="image/png">PNG (.png)</option>
            <option value="image/webp">WebP (.webp)</option>
            <option value="image/bmp">BMP (.bmp)</option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="slider-wrap">
          <div class="slider-row">
            <div class="setting-label">Quality</div>
            <div class="slider-val" id="convert-q-val">90%</div>
          </div>
          <input type="range" id="convert-q" min="1" max="100" value="90"
            oninput="document.getElementById('convert-q-val').textContent=this.value+'%'" />
        </div>
        <div class="divider"></div>
        <div class="toggle-row">
          <span class="toggle-label">Strip EXIF metadata</span>
          <div class="toggle on" id="strip-exif-toggle" onclick="this.classList.toggle('on')"></div>
        </div>
        <div class="toggle-row">
          <span class="toggle-label">Add white background</span>
          <div class="toggle on" id="white-bg-toggle" onclick="this.classList.toggle('on')"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- TAB: IMAGE → PDF -->
  <div class="tab-panel" id="panel-img2pdf">
    <div class="tool-card">
      <div class="tool-main">
        <h3 class="tool-title">Images to PDF</h3>
        <p class="tool-desc">Combine multiple images into a single PDF document. Reorder by dragging in the file list.</p>
        <div class="dropzone" id="dz-img2pdf">
          <input type="file" id="file-img2pdf" accept="image/*" multiple />
          <div class="dz-icon">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
              <path d="M10 6h20l12 12v24H10V6z"/>
              <path d="M30 6v12h12"/>
              <path d="M24 36V20M17 27l7 9 7-9"/>
            </svg>
          </div>
          <div class="dz-title">Drop images here</div>
          <div class="dz-sub">or <span>browse files</span> — each image becomes one PDF page</div>
        </div>
        <div class="file-list" id="fl-img2pdf"></div>
        <div class="action-bar">
          <button class="btn-convert" id="btn-img2pdf" onclick="runImg2PDF()">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
            Create PDF
          </button>
          <button class="btn-clear" onclick="clearFiles('img2pdf')">Clear All</button>
        </div>
        <div class="progress-wrap" id="prog-img2pdf">
          <div class="progress-label" id="prog-img2pdf-label">Building PDF…</div>
          <div class="progress-bar"><div class="progress-fill" id="prog-img2pdf-fill"></div></div>
        </div>
      </div>
      <div class="tool-sidebar">
        <div class="setting-group">
          <div class="setting-label">Page Size</div>
          <select class="setting-select" id="pdf-pagesize">
            <option value="a4">A4 (210 × 297 mm)</option>
            <option value="a3">A3 (297 × 420 mm)</option>
            <option value="letter">Letter (8.5 × 11 in)</option>
            <option value="legal">Legal (8.5 × 14 in)</option>
          </select>
        </div>
        <div class="setting-group">
          <div class="setting-label">Orientation</div>
          <select class="setting-select" id="pdf-orient">
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="setting-group">
          <div class="setting-label">Image Fit</div>
          <select class="setting-select" id="pdf-fit">
            <option value="contain">Contain (letterbox)</option>
            <option value="cover">Cover (fill page)</option>
            <option value="stretch">Stretch to page</option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="setting-group">
          <div class="setting-label">Margin (mm)</div>
          <input type="number" class="setting-input" id="pdf-margin" value="10" min="0" max="50" />
        </div>
        <div class="divider"></div>
        <div class="setting-group">
          <div class="setting-label">Output Filename</div>
          <input type="text" class="setting-input" id="pdf-filename" placeholder="output.pdf" value="output.pdf" />
        </div>
      </div>
    </div>
  </div>

  <!-- TAB: PDF → IMAGES -->
  <div class="tab-panel" id="panel-pdf2img">
    <div class="tool-card">
      <div class="tool-main">
        <h3 class="tool-title">PDF to Images</h3>
        <p class="tool-desc">Extract PDF pages as high-quality images. Specify page ranges to extract only what you need.</p>
        <div class="dropzone" id="dz-pdf2img">
          <input type="file" id="file-pdf2img" accept=".pdf" />
          <div class="dz-icon">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
              <path d="M10 6h20l12 12v24H10V6z"/>
              <path d="M30 6v12h12"/>
              <path d="M24 20v16M17 29l7 9 7-9"/>
            </svg>
          </div>
          <div class="dz-title">Drop a PDF file here</div>
          <div class="dz-sub">or <span>browse files</span> — one PDF file at a time</div>
        </div>
        <div class="file-list" id="fl-pdf2img"></div>
        <div class="action-bar">
          <button class="btn-convert" id="btn-pdf2img" onclick="runPDF2Img()">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
            Extract Images
          </button>
          <button class="btn-clear" onclick="clearFiles('pdf2img')">Clear All</button>
        </div>
        <div class="progress-wrap" id="prog-pdf2img">
          <div class="progress-label" id="prog-pdf2img-label">Rendering pages…</div>
          <div class="progress-bar"><div class="progress-fill" id="prog-pdf2img-fill"></div></div>
        </div>
      </div>
      <div class="tool-sidebar">
        <div class="setting-group">
          <div class="setting-label">Output Format</div>
          <select class="setting-select" id="p2i-fmt">
            <option value="image/jpeg">JPEG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="slider-wrap">
          <div class="slider-row">
            <div class="setting-label">Image Quality</div>
            <div class="slider-val" id="p2i-q-val">92%</div>
          </div>
          <input type="range" id="p2i-q" min="1" max="100" value="92"
            oninput="document.getElementById('p2i-q-val').textContent=this.value+'%'" />
        </div>
        <div class="divider"></div>
        <div class="slider-wrap">
          <div class="slider-row">
            <div class="setting-label">Render Scale</div>
            <div class="slider-val" id="p2i-scale-val">2×</div>
          </div>
          <input type="range" id="p2i-scale" min="1" max="4" step="0.5" value="2"
            oninput="document.getElementById('p2i-scale-val').textContent=this.value+'×'" />
        </div>
        <div class="divider"></div>
        <div class="setting-group">
          <div class="setting-label">Page Range</div>
          <input type="text" class="setting-input" id="p2i-pages" placeholder="e.g. 1-3, 5, 7-9 (blank = all)" />
        </div>
      </div>
    </div>
  </div>

  <!-- TAB: IMAGE COMPRESS -->
  <div class="tab-panel" id="panel-compress">
    <div class="tool-card">
      <div class="tool-main">
        <h3 class="tool-title">Image Compressor</h3>
        <p class="tool-desc">Reduce image file size with smart compression. Keeps the format, reduces the bytes. Batch compress multiple images at once.</p>
        <div class="dropzone" id="dz-compress">
          <input type="file" id="file-compress" accept="image/*" multiple />
          <div class="dz-icon">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
              <path d="M24 8v24M16 24l8 8 8-8"/><rect x="8" y="36" width="32" height="4" rx="1"/>
            </svg>
          </div>
          <div class="dz-title">Drop images here</div>
          <div class="dz-sub">or <span>browse files</span> — PNG, JPEG, WebP supported</div>
        </div>
        <div class="file-list" id="fl-compress"></div>
        <div class="action-bar">
          <button class="btn-convert" id="btn-compress" onclick="runCompress()">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
            Compress Images
          </button>
          <button class="btn-clear" onclick="clearFiles('compress')">Clear All</button>
        </div>
        <div class="progress-wrap" id="prog-compress">
          <div class="progress-label" id="prog-compress-label">Compressing…</div>
          <div class="progress-bar"><div class="progress-fill" id="prog-compress-fill"></div></div>
        </div>
      </div>
      <div class="tool-sidebar">
        <div class="slider-wrap">
          <div class="slider-row">
            <div class="setting-label">Quality</div>
            <div class="slider-val" id="compress-q-val">70%</div>
          </div>
          <input type="range" id="compress-q" min="1" max="99" value="70"
            oninput="document.getElementById('compress-q-val').textContent=this.value+'%'" />
        </div>
        <div class="divider"></div>
        <div class="setting-group">
          <div class="setting-label">Output Format</div>
          <select class="setting-select" id="compress-fmt">
            <option value="original">Keep Original</option>
            <option value="image/jpeg">JPEG (best compression)</option>
            <option value="image/webp">WebP (modern)</option>
            <option value="image/png">PNG (lossless)</option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="toggle-row">
          <span class="toggle-label">Strip EXIF metadata</span>
          <div class="toggle on" id="compress-exif-toggle" onclick="this.classList.toggle('on')"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- TAB: PDF MERGE -->
  <div class="tab-panel" id="panel-pdfmerge">
    <div class="tool-card">
      <div class="tool-main">
        <h3 class="tool-title">Merge PDFs</h3>
        <p class="tool-desc">Combine multiple PDF files into one. Files are merged in the order listed below.</p>
        <div class="dropzone" id="dz-pdfmerge">
          <input type="file" id="file-pdfmerge" accept=".pdf" multiple />
          <div class="dz-icon">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
              <path d="M8 6h14l8 8v28H8V6z"/><path d="M22 6v8h8"/>
              <path d="M28 20h12l-6 6-6-6z" fill="rgba(232,35,26,0.3)" stroke="none"/>
              <path d="M34 26v16"/>
            </svg>
          </div>
          <div class="dz-title">Drop PDF files here</div>
          <div class="dz-sub">or <span>browse files</span> — drop multiple PDFs to merge</div>
        </div>
        <div class="file-list" id="fl-pdfmerge"></div>
        <div class="action-bar">
          <button class="btn-convert" id="btn-pdfmerge" onclick="runPDFMerge()">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
            Merge PDFs
          </button>
          <button class="btn-clear" onclick="clearFiles('pdfmerge')">Clear All</button>
        </div>
        <div class="progress-wrap" id="prog-pdfmerge">
          <div class="progress-label" id="prog-pdfmerge-label">Merging…</div>
          <div class="progress-bar"><div class="progress-fill" id="prog-pdfmerge-fill"></div></div>
        </div>
      </div>
      <div class="tool-sidebar">
        <div class="setting-group">
          <div class="setting-label">Output Filename</div>
          <input type="text" class="setting-input" id="pdfmerge-filename" placeholder="merged.pdf" value="merged.pdf" />
        </div>
        <div class="divider"></div>
        <div style="font-size:13px; color:var(--gray); line-height:1.6;">
          Files are merged in the order shown. All pages from each PDF are included in sequence.
        </div>
      </div>
    </div>
  </div>

  <!-- TAB: PDF SPLIT -->
  <div class="tab-panel" id="panel-pdfsplit">
    <div class="tool-card">
      <div class="tool-main">
        <h3 class="tool-title">Split PDF</h3>
        <p class="tool-desc">Split a PDF into individual pages or extract specific page ranges. Downloads as a ZIP of separate PDFs.</p>
        <div class="dropzone" id="dz-pdfsplit">
          <input type="file" id="file-pdfsplit" accept=".pdf" />
          <div class="dz-icon">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
              <path d="M10 6h20l12 12v24H10V6z"/><path d="M30 6v12h12"/>
              <path d="M10 28h28M10 36h28" stroke-dasharray="4 3"/>
            </svg>
          </div>
          <div class="dz-title">Drop a PDF file here</div>
          <div class="dz-sub">or <span>browse files</span> — one PDF at a time</div>
        </div>
        <div class="file-list" id="fl-pdfsplit"></div>
        <div class="action-bar">
          <button class="btn-convert" id="btn-pdfsplit" onclick="runPDFSplit()">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
            Split PDF
          </button>
          <button class="btn-clear" onclick="clearFiles('pdfsplit')">Clear All</button>
        </div>
        <div class="progress-wrap" id="prog-pdfsplit">
          <div class="progress-label" id="prog-pdfsplit-label">Splitting…</div>
          <div class="progress-bar"><div class="progress-fill" id="prog-pdfsplit-fill"></div></div>
        </div>
      </div>
      <div class="tool-sidebar">
        <div class="setting-group">
          <div class="setting-label">Split Mode</div>
          <select class="setting-select" id="split-mode" onchange="updateSplitMode()">
            <option value="all">Split into individual pages</option>
            <option value="range">Extract page range</option>
            <option value="fixed">Split every N pages</option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="setting-group" id="split-range-group" style="display:none;">
          <div class="setting-label">Page Range</div>
          <input type="text" class="setting-input" id="split-pages" placeholder="e.g. 1-3, 5, 7-9" />
        </div>
        <div class="setting-group" id="split-fixed-group" style="display:none;">
          <div class="setting-label">Pages per chunk</div>
          <input type="number" class="setting-input" id="split-n" placeholder="e.g. 5" min="1" value="1" />
        </div>
        <div style="font-size:13px; color:var(--gray); line-height:1.6;" id="split-hint">
          Each page will be saved as a separate PDF file, bundled into a ZIP download.
        </div>
      </div>
    </div>
  </div>

  <!-- TAB: PDF COMPRESS -->
  <div class="tab-panel" id="panel-pdfcompress">
    <div class="tool-card">
      <div class="tool-main">
        <h3 class="tool-title">Compress PDF</h3>
        <p class="tool-desc">Reduce PDF file size by re-rendering pages at optimised resolution. Great for sharing large PDFs.</p>
        <div class="dropzone" id="dz-pdfcompress">
          <input type="file" id="file-pdfcompress" accept=".pdf" />
          <div class="dz-icon">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
              <path d="M10 6h20l12 12v24H10V6z"/><path d="M30 6v12h12"/>
              <path d="M24 20v16M18 28l6 8 6-8"/>
            </svg>
          </div>
          <div class="dz-title">Drop a PDF file here</div>
          <div class="dz-sub">or <span>browse files</span> — compression via page re-rendering</div>
        </div>
        <div class="file-list" id="fl-pdfcompress"></div>
        <div class="action-bar">
          <button class="btn-convert" id="btn-pdfcompress" onclick="runPDFCompress()">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
            Compress PDF
          </button>
          <button class="btn-clear" onclick="clearFiles('pdfcompress')">Clear All</button>
        </div>
        <div class="progress-wrap" id="prog-pdfcompress">
          <div class="progress-label" id="prog-pdfcompress-label">Compressing…</div>
          <div class="progress-bar"><div class="progress-fill" id="prog-pdfcompress-fill"></div></div>
        </div>
      </div>
      <div class="tool-sidebar">
        <div class="setting-group">
          <div class="setting-label">Compression Level</div>
          <select class="setting-select" id="pdfcompress-level">
            <option value="low">Low — High quality (slight reduction)</option>
            <option value="medium" selected>Medium — Balanced (recommended)</option>
            <option value="high">High — Max compression, lower quality</option>
          </select>
        </div>
        <div class="divider"></div>
        <div style="font-size:13px; color:var(--gray); line-height:1.6;">
          Pages are re-rendered as images at reduced resolution and repacked into a new PDF. Works best on scanned or image-heavy PDFs.
        </div>
      </div>
    </div>
  </div>

  <!-- TAB: PDF ROTATE -->
  <div class="tab-panel" id="panel-pdfrotate">
    <div class="tool-card">
      <div class="tool-main">
        <h3 class="tool-title">Rotate PDF</h3>
        <p class="tool-desc">Rotate all or specific pages. Fix upside-down scans, switch portrait to landscape, and more.</p>
        <div class="dropzone" id="dz-pdfrotate">
          <input type="file" id="file-pdfrotate" accept=".pdf" />
          <div class="dz-icon">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
              <path d="M10 6h20l12 12v24H10V6z"/><path d="M30 6v12h12"/>
              <path d="M31 28a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"/>
              <path d="M27 22l4-2-1 4"/>
            </svg>
          </div>
          <div class="dz-title">Drop a PDF file here</div>
          <div class="dz-sub">or <span>browse files</span> — rotate pages to correct orientation</div>
        </div>
        <div class="file-list" id="fl-pdfrotate"></div>
        <div class="action-bar">
          <button class="btn-convert" id="btn-pdfrotate" onclick="runPDFRotate()">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
            Rotate PDF
          </button>
          <button class="btn-clear" onclick="clearFiles('pdfrotate')">Clear All</button>
        </div>
        <div class="progress-wrap" id="prog-pdfrotate">
          <div class="progress-label" id="prog-pdfrotate-label">Rotating pages…</div>
          <div class="progress-bar"><div class="progress-fill" id="prog-pdfrotate-fill"></div></div>
        </div>
      </div>
      <div class="tool-sidebar">
        <div class="setting-group">
          <div class="setting-label">Rotation</div>
          <select class="setting-select" id="rotate-angle">
            <option value="90">90° Clockwise</option>
            <option value="180">180° (Flip)</option>
            <option value="270">90° Counter-clockwise</option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="setting-group">
          <div class="setting-label">Apply to Pages</div>
          <input type="text" class="setting-input" id="rotate-pages" placeholder="e.g. 1-3, 5 (blank = all)" />
        </div>
      </div>
    </div>
  </div>

  <!-- TAB: PDF WATERMARK -->
  <div class="tab-panel" id="panel-pdfwatermark">
    <div class="tool-card">
      <div class="tool-main">
        <h3 class="tool-title">Watermark PDF</h3>
        <p class="tool-desc">Stamp a text watermark on every page of your PDF. Control opacity, size, color, and position.</p>
        <div class="dropzone" id="dz-pdfwatermark">
          <input type="file" id="file-pdfwatermark" accept=".pdf" />
          <div class="dz-icon">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
              <path d="M10 6h20l12 12v24H10V6z"/><path d="M30 6v12h12"/>
              <path d="M16 32l16-16" stroke="var(--red)" stroke-width="2" opacity="0.5"/>
              <path d="M14 26l4-4 4 4-4 4z" fill="rgba(232,35,26,0.2)" stroke="none"/>
            </svg>
          </div>
          <div class="dz-title">Drop a PDF file here</div>
          <div class="dz-sub">or <span>browse files</span> — add watermark text to all pages</div>
        </div>
        <div class="file-list" id="fl-pdfwatermark"></div>
        <div class="action-bar">
          <button class="btn-convert" id="btn-pdfwatermark" onclick="runPDFWatermark()">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
            Add Watermark
          </button>
          <button class="btn-clear" onclick="clearFiles('pdfwatermark')">Clear All</button>
        </div>
        <div class="progress-wrap" id="prog-pdfwatermark">
          <div class="progress-label" id="prog-pdfwatermark-label">Adding watermark…</div>
          <div class="progress-bar"><div class="progress-fill" id="prog-pdfwatermark-fill"></div></div>
        </div>
      </div>
      <div class="tool-sidebar">
        <div class="setting-group">
          <div class="setting-label">Watermark Text</div>
          <input type="text" class="setting-input" id="wm-text" placeholder="e.g. CONFIDENTIAL" value="CONFIDENTIAL" />
        </div>
        <div class="divider"></div>
        <div class="slider-wrap">
          <div class="slider-row">
            <div class="setting-label">Opacity</div>
            <div class="slider-val" id="wm-opacity-val">30%</div>
          </div>
          <input type="range" id="wm-opacity" min="5" max="100" value="30"
            oninput="document.getElementById('wm-opacity-val').textContent=this.value+'%'" />
        </div>
        <div class="divider"></div>
        <div class="slider-wrap">
          <div class="slider-row">
            <div class="setting-label">Font Size</div>
            <div class="slider-val" id="wm-size-val">48px</div>
          </div>
          <input type="range" id="wm-size" min="12" max="120" value="48"
            oninput="document.getElementById('wm-size-val').textContent=this.value+'px'" />
        </div>
        <div class="divider"></div>
        <div class="setting-group">
          <div class="setting-label">Position</div>
          <select class="setting-select" id="wm-position">
            <option value="center">Center (diagonal)</option>
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="setting-group">
          <div class="setting-label">Color</div>
          <div class="setting-row">
            <input type="color" id="wm-color" value="#E8231A" style="width:40px;height:36px;border:1px solid var(--border);border-radius:3px;background:none;padding:2px;cursor:pointer;" oninput="document.getElementById('wm-color-hex').value=this.value" />
            <input type="text" class="setting-input" id="wm-color-hex" value="#E8231A" placeholder="#E8231A" style="flex:1;" oninput="document.getElementById('wm-color').value=this.value" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section id="privacy">
  <div class="privacy-left">
    <div class="section-tag">Privacy First</div>
    <h2 class="section-title">
      <div class="line"><span class="inner">Your files stay</span></div>
      <div class="line"><span class="inner">yours. Always.</span></div>
    </h2>
    <div class="privacy-points">
      <div class="privacy-point">
        <div class="pp-icon">
          <svg fill="none" stroke="var(--red)" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div>
          <div class="pp-title">Zero Server Uploads</div>
          <div class="pp-text">Every operation runs entirely in your browser using native Canvas and File APIs. Nothing is ever transmitted.</div>
        </div>
      </div>
      <div class="privacy-point">
        <div class="pp-icon">
          <svg fill="none" stroke="var(--red)" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
        </div>
        <div>
          <div class="pp-title">No Tracking, No Analytics</div>
          <div class="pp-text">We don't run any analytics, ad networks, or tracking pixels. No cookies for profiling. Just the tool.</div>
        </div>
      </div>
      <div class="privacy-point">
        <div class="pp-icon">
          <svg fill="none" stroke="var(--red)" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <div>
          <div class="pp-title">Open Architecture</div>
          <div class="pp-text">All processing logic is transparent, runs in your browser's memory, and is cleared when you close the tab.</div>
        </div>
      </div>
    </div>
  </div>
  <div class="privacy-right">
    <div class="privacy-visual">
      <div class="privacy-ring"></div>
      <div class="privacy-ring"></div>
      <div class="privacy-ring"></div>
      <div class="privacy-lock-icon">
        <svg fill="none" stroke="var(--red)" stroke-width="1" viewBox="0 0 80 80">
          <rect x="12" y="36" width="56" height="40" rx="4" fill="rgba(232,35,26,0.1)" stroke="var(--red)" stroke-width="1.5"/>
          <path d="M24 36V26a16 16 0 0 1 32 0v10" stroke-width="1.5"/>
          <circle cx="40" cy="56" r="6" fill="var(--red)"/>
          <path d="M40 56v8" stroke="var(--black)" stroke-width="2"/>
        </svg>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section id="how">
  <div class="section-header">
    <div>
      <div class="section-tag">Process</div>
      <h2 class="section-title">
        <div class="line"><span class="inner">How FORMA</span></div>
        <div class="line"><span class="inner">works.</span></div>
      </h2>
    </div>
    <p class="section-desc">A transparent, four-step process — entirely within your browser, no external dependencies for your data.</p>
  </div>
  <div class="how-grid">
    <div class="how-step">
      <div class="how-step-num">01</div>
      <h3 class="how-step-title">Select Your Files</h3>
      <p class="how-step-text">Drag and drop images or PDFs directly onto the tool. Multiple files are supported for batch operations.</p>
      <div class="how-arrow"></div>
    </div>
    <div class="how-step">
      <div class="how-step-num">02</div>
      <h3 class="how-step-title">Configure Settings</h3>
      <p class="how-step-text">Set dimensions, quality, format, and other parameters. All settings update the output in real time.</p>
      <div class="how-arrow"></div>
    </div>
    <div class="how-step">
      <div class="how-step-num">03</div>
      <h3 class="how-step-title">Browser Processes</h3>
      <p class="how-step-text">Your browser's Canvas API and WebAssembly engine handle all transformations locally at native speed.</p>
      <div class="how-arrow"></div>
    </div>
    <div class="how-step">
      <div class="how-step-num">04</div>
      <h3 class="how-step-title">Instant Download</h3>
      <p class="how-step-text">Results download directly from memory. Multiple outputs are auto-zipped. No account required.</p>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div>
    <div class="footer-logo">FORM<span>A</span></div>
    <div class="footer-tagline">Privacy-first image & PDF tools — built for the browser.</div>
  </div>
  <div class="footer-right">
    <ul class="footer-links">
      <li><a href="#features">Features</a></li>
      <li><a href="#tools">Tools</a></li>
      <li><a href="#privacy">Privacy</a></li>
      <li><a href="#how">How It Works</a></li>
    </ul>
    <div class="footer-copy">© 2026 FORMA — All processing is local. No data collected.</div>
  </div>
</footer>
`

export default function Home() {
  useEffect(() => {
    // Inject styles
    const styleEl = document.createElement('style')
    styleEl.textContent = styles
    document.head.appendChild(styleEl)

    // Inject scripts (GSAP, PDF.js, JSZip, jsPDF already loaded via layout)
    const waitForLibs = setInterval(() => {
      if (
        typeof window !== 'undefined' &&
        window.gsap &&
        window.pdfjsLib &&
        window.JSZip &&
        window.jspdf
      ) {
        clearInterval(waitForLibs)
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
        // Run main app script
        try {
          const fn = new Function('\n/* ─────────────────────────────────────────────────────────────\n   GSAP SETUP\n───────────────────────────────────────────────────────────── */\ngsap.registerPlugin(ScrollTrigger, CustomEase);\nCustomEase.create(\'expo\', \'0.16, 1, 0.3, 1\');\n\n/* ─────────────────────────────────────────────────────────────\n   CURSOR\n───────────────────────────────────────────────────────────── */\nconst dot = document.getElementById(\'cursor-dot\');\nconst ring = document.getElementById(\'cursor-ring\');\nconst label = document.getElementById(\'cursor-label\');\nlet mx = 0, my = 0, rx = 0, ry = 0;\ndocument.addEventListener(\'mousemove\', e => {\n  mx = e.clientX; my = e.clientY;\n  gsap.to(dot, { x: mx, y: my, duration: 0.1, ease: \'none\' });\n});\n(function animRing() {\n  rx += (mx - rx) * 0.12;\n  ry += (my - ry) * 0.12;\n  gsap.set(ring, { x: rx, y: ry });\n  gsap.set(label, { x: rx + 18, y: ry });\n  requestAnimationFrame(animRing);\n})();\ndocument.querySelectorAll(\'a, button, .tab-btn, .dropzone, .toggle, .size-lock\').forEach(el => {\n  el.addEventListener(\'mouseenter\', () => {\n    gsap.to(ring, { scale: 1.8, duration: 0.3, ease: \'expo\' });\n    gsap.to(dot, { scale: 0.5, duration: 0.2 });\n    const lbl = el.dataset.cursor;\n    if (lbl) {\n      label.textContent = lbl;\n      gsap.to(label, { opacity: 1, duration: 0.2 });\n    }\n  });\n  el.addEventListener(\'mouseleave\', () => {\n    gsap.to(ring, { scale: 1, duration: 0.4, ease: \'expo\' });\n    gsap.to(dot, { scale: 1, duration: 0.2 });\n    gsap.to(label, { opacity: 0, duration: 0.15 });\n  });\n});\n\n/* ─────────────────────────────────────────────────────────────\n   LOADER ANIMATION\n───────────────────────────────────────────────────────────── */\n(function initLoader() {\n  const letters = document.querySelectorAll(\'#loader-logo span\');\n  const bar = document.getElementById(\'loader-bar\');\n  const pct = document.getElementById(\'loader-pct\');\n  let p = 0;\n  gsap.from(letters, { y: \'100%\', opacity: 0, stagger: 0.06, duration: 0.7, ease: \'expo\', delay: 0.2 });\n  const counter = setInterval(() => {\n    p += Math.random() * 18;\n    if (p >= 100) { p = 100; clearInterval(counter); finishLoad(); }\n    bar.style.width = p + \'%\';\n    pct.textContent = Math.floor(p) + \'%\';\n  }, 80);\n  function finishLoad() {\n    setTimeout(() => {\n      gsap.to(\'#loader\', {\n        yPercent: -100, duration: 1, ease: \'expo\',\n        onComplete: () => { document.getElementById(\'loader\').style.display = \'none\'; }\n      });\n      revealHero();\n    }, 300);\n  }\n})();\n\n/* ─────────────────────────────────────────────────────────────\n   HERO REVEAL\n───────────────────────────────────────────────────────────── */\nfunction revealHero() {\n  const tl = gsap.timeline();\n  tl.to(\'.hero-tag\', { opacity: 1, y: 0, duration: 0.8, ease: \'expo\' })\n    .to(\'.hero-title .word\', {\n      y: 0, stagger: 0.08, duration: 0.9, ease: \'expo\'\n    }, \'-=0.4\')\n    .to(\'.hero-sub\', { opacity: 1, y: 0, duration: 0.7, ease: \'expo\' }, \'-=0.5\')\n    .to(\'.hero-actions\', { opacity: 1, y: 0, duration: 0.7, ease: \'expo\' }, \'-=0.5\')\n    .to(\'.hero-visual\', { opacity: 1, x: 0, duration: 1, ease: \'expo\' }, \'-=0.6\')\n    .to(\'.hero-scroll-hint\', { opacity: 1, duration: 0.6, ease: \'expo\' }, \'-=0.3\');\n  gsap.set(\'.hero-sub, .hero-actions\', { y: 20 });\n  gsap.set(\'.hero-visual\', { x: 40 });\n\n  // animate hero bar fill\n  setTimeout(() => {\n    document.getElementById(\'hvc-bar-fill\').style.width = \'74%\';\n  }, 1800);\n\n  // animate grid cells\n  const cells = document.querySelectorAll(\'.hvc-cell\');\n  if (cells.length === 0) buildGrid();\n  setTimeout(() => animGrid(), 1400);\n}\n\nfunction buildGrid() {\n  const g = document.getElementById(\'hvc-grid\');\n  if (!g) return;\n  g.innerHTML = \'\';\n  for (let i = 0; i < 36; i++) {\n    const c = document.createElement(\'div\');\n    c.className = \'hvc-cell\';\n    g.appendChild(c);\n  }\n  animGrid();\n}\nbuildGrid();\n\nfunction animGrid() {\n  const cells = document.querySelectorAll(\'.hvc-cell\');\n  cells.forEach((c, i) => {\n    setTimeout(() => {\n      c.classList.remove(\'active\', \'mid\');\n      const r = Math.random();\n      if (r > 0.8) c.classList.add(\'active\');\n      else if (r > 0.6) c.classList.add(\'mid\');\n    }, i * 30);\n  });\n  setTimeout(animGrid, 2000);\n}\n\n/* ─────────────────────────────────────────────────────────────\n   NAV SCROLL\n───────────────────────────────────────────────────────────── */\nScrollTrigger.create({\n  start: 80,\n  onEnter: () => document.getElementById(\'nav\').classList.add(\'scrolled\'),\n  onLeaveBack: () => document.getElementById(\'nav\').classList.remove(\'scrolled\'),\n});\n\n/* ─────────────────────────────────────────────────────────────\n   SCROLL ANIMATIONS\n───────────────────────────────────────────────────────────── */\n// Section titles\ndocument.querySelectorAll(\'.section-title .inner\').forEach(el => {\n  gsap.from(el, {\n    y: \'100%\', duration: 0.9, ease: \'expo\',\n    scrollTrigger: { trigger: el, start: \'top 85%\' }\n  });\n});\n\n// Stats counter\ndocument.querySelectorAll(\'.stat-count\').forEach(el => {\n  const target = parseInt(el.dataset.target);\n  ScrollTrigger.create({\n    trigger: el,\n    start: \'top 80%\',\n    onEnter: () => {\n      gsap.to({ val: 0 }, {\n        val: target, duration: 1.5, ease: \'power2.out\',\n        onUpdate: function() { el.textContent = Math.floor(this.targets()[0].val); },\n        onComplete: () => { el.textContent = target; }\n      });\n    }\n  });\n});\n\n// Stat cells\ngsap.from(\'.stat-cell\', {\n  opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: \'expo\',\n  scrollTrigger: { trigger: \'#stats\', start: \'top 80%\' }\n});\n\n// Feature cards\ngsap.from(\'.feature-card\', {\n  opacity: 0, y: 50, stagger: 0.1, duration: 0.8, ease: \'expo\',\n  scrollTrigger: { trigger: \'.features-grid\', start: \'top 80%\' }\n});\n\n// How steps\ngsap.from(\'.how-step\', {\n  opacity: 0, x: -30, stagger: 0.15, duration: 0.8, ease: \'expo\',\n  scrollTrigger: { trigger: \'.how-grid\', start: \'top 80%\' }\n});\n\n// Privacy points\ngsap.from(\'.privacy-point\', {\n  opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: \'expo\',\n  scrollTrigger: { trigger: \'.privacy-points\', start: \'top 80%\' }\n});\n\n// Tools section\ngsap.from(\'.tools-tabs\', {\n  opacity: 0, y: 20, duration: 0.7, ease: \'expo\',\n  scrollTrigger: { trigger: \'#tools\', start: \'top 80%\' }\n});\ngsap.from(\'.tool-card\', {\n  opacity: 0, y: 40, duration: 0.9, ease: \'expo\',\n  scrollTrigger: { trigger: \'.tool-card\', start: \'top 85%\' }\n});\n\n/* ─────────────────────────────────────────────────────────────\n   PARALLAX HERO GRID\n───────────────────────────────────────────────────────────── */\ngsap.to(\'.hero-grid-overlay\', {\n  yPercent: 20, ease: \'none\',\n  scrollTrigger: { trigger: \'#hero\', scrub: true }\n});\n\n/* ─────────────────────────────────────────────────────────────\n   TABS\n───────────────────────────────────────────────────────────── */\nfunction switchTab(id) {\n  document.querySelectorAll(\'.tab-btn\').forEach(b => b.classList.remove(\'active\'));\n  document.querySelectorAll(\'.tab-panel\').forEach(p => p.classList.remove(\'active\'));\n  const btn = document.querySelector(`.tab-btn[onclick="switchTab(\'${id}\')"]`);\n  const panel = document.getElementById(\'panel-\' + id);\n  if (btn) btn.classList.add(\'active\');\n  if (panel) {\n    panel.classList.add(\'active\');\n    gsap.from(panel, { opacity: 0, y: 20, duration: 0.4, ease: \'expo\' });\n  }\n}\n\n/* ─────────────────────────────────────────────────────────────\n   FILE STATE\n───────────────────────────────────────────────────────────── */\nconst fileStore = { resize: [], convert: [], compress: [], img2pdf: [], pdf2img: [], pdfmerge: [], pdfsplit: [], pdfcompress: [], pdfrotate: [], pdfwatermark: [] };\n\nfunction setupDropzone(key, inputId, dzId, listId, multiple) {\n  const input = document.getElementById(inputId);\n  const dz = document.getElementById(dzId);\n  input.multiple = multiple;\n  input.addEventListener(\'change\', e => addFiles(key, e.target.files, listId));\n  dz.addEventListener(\'dragover\', e => { e.preventDefault(); dz.classList.add(\'dragover\'); });\n  dz.addEventListener(\'dragleave\', () => dz.classList.remove(\'dragover\'));\n  dz.addEventListener(\'drop\', e => {\n    e.preventDefault();\n    dz.classList.remove(\'dragover\');\n    addFiles(key, e.dataTransfer.files, listId);\n  });\n}\nsetupDropzone(\'resize\',       \'file-resize\',       \'dz-resize\',       \'fl-resize\',       true);\nsetupDropzone(\'convert\',      \'file-convert\',      \'dz-convert\',      \'fl-convert\',      true);\nsetupDropzone(\'compress\',     \'file-compress\',     \'dz-compress\',     \'fl-compress\',     true);\nsetupDropzone(\'img2pdf\',      \'file-img2pdf\',      \'dz-img2pdf\',      \'fl-img2pdf\',      true);\nsetupDropzone(\'pdf2img\',      \'file-pdf2img\',      \'dz-pdf2img\',      \'fl-pdf2img\',      false);\nsetupDropzone(\'pdfmerge\',     \'file-pdfmerge\',     \'dz-pdfmerge\',     \'fl-pdfmerge\',     true);\nsetupDropzone(\'pdfsplit\',     \'file-pdfsplit\',     \'dz-pdfsplit\',     \'fl-pdfsplit\',     false);\nsetupDropzone(\'pdfcompress\',  \'file-pdfcompress\',  \'dz-pdfcompress\',  \'fl-pdfcompress\',  false);\nsetupDropzone(\'pdfrotate\',    \'file-pdfrotate\',    \'dz-pdfrotate\',    \'fl-pdfrotate\',    false);\nsetupDropzone(\'pdfwatermark\', \'file-pdfwatermark\', \'dz-pdfwatermark\', \'fl-pdfwatermark\', false);\n\nfunction addFiles(key, files, listId) {\n  Array.from(files).forEach(f => fileStore[key].push(f));\n  renderFileList(key, listId);\n}\n\nfunction renderFileList(key, listId) {\n  const container = document.getElementById(listId);\n  container.innerHTML = \'\';\n  fileStore[key].forEach((f, i) => {\n    const item = document.createElement(\'div\');\n    item.className = \'file-item\';\n    item.innerHTML = `\n      <span class="file-item-icon">📄</span>\n      <span class="file-item-name" title="${f.name}">${f.name}</span>\n      <span class="file-item-size">${formatBytes(f.size)}</span>\n      <button class="file-item-remove" onclick="removeFile(\'${key}\',\'${listId}\',${i})">×</button>\n    `;\n    container.appendChild(item);\n    gsap.from(item, { opacity: 0, x: -10, duration: 0.3, ease: \'expo\' });\n  });\n}\n\nfunction removeFile(key, listId, idx) {\n  fileStore[key].splice(idx, 1);\n  renderFileList(key, listId);\n}\n\nfunction clearFiles(key) {\n  const listMap = {\n    resize:\'fl-resize\', convert:\'fl-convert\', compress:\'fl-compress\',\n    img2pdf:\'fl-img2pdf\', pdf2img:\'fl-pdf2img\',\n    pdfmerge:\'fl-pdfmerge\', pdfsplit:\'fl-pdfsplit\',\n    pdfcompress:\'fl-pdfcompress\', pdfrotate:\'fl-pdfrotate\', pdfwatermark:\'fl-pdfwatermark\'\n  };\n  fileStore[key] = [];\n  renderFileList(key, listMap[key]);\n  document.querySelectorAll(\'input[type="file"]\').forEach(el => { el.value = \'\'; });\n}\n\nfunction formatBytes(b) {\n  if (b < 1024) return b + \' B\';\n  if (b < 1048576) return (b/1024).toFixed(1) + \' KB\';\n  return (b/1048576).toFixed(2) + \' MB\';\n}\n\n/* ─────────────────────────────────────────────────────────────\n   ASPECT LOCK\n───────────────────────────────────────────────────────────── */\nlet aspectLocked = true;\nlet aspectRatio = 1;\nfunction toggleLock() {\n  aspectLocked = !aspectLocked;\n  document.getElementById(\'lock-btn\').classList.toggle(\'locked\', aspectLocked);\n  document.getElementById(\'lock-btn\').textContent = aspectLocked ? \'🔗\' : \'🔓\';\n}\ndocument.getElementById(\'resize-w\').addEventListener(\'input\', function() {\n  if (!aspectLocked) return;\n  const h = document.getElementById(\'resize-h\');\n  if (this.value && aspectRatio) h.value = Math.round(this.value / aspectRatio);\n});\ndocument.getElementById(\'resize-h\').addEventListener(\'input\', function() {\n  if (!aspectLocked) return;\n  const w = document.getElementById(\'resize-w\');\n  if (this.value && aspectRatio) w.value = Math.round(this.value * aspectRatio);\n});\n\n/* ─────────────────────────────────────────────────────────────\n   NOTIFICATION\n───────────────────────────────────────────────────────────── */\nlet notifTimer;\nfunction notify(msg, type = \'success\') {\n  const el = document.getElementById(\'notification\');\n  const dot = document.getElementById(\'notif-dot\');\n  const msgEl = document.getElementById(\'notif-msg\');\n  el.className = \'show \' + type;\n  dot.className = \'notif-dot \' + type;\n  msgEl.textContent = msg;\n  clearTimeout(notifTimer);\n  notifTimer = setTimeout(() => el.classList.remove(\'show\'), 4000);\n}\n\n/* ─────────────────────────────────────────────────────────────\n   PROGRESS HELPERS\n───────────────────────────────────────────────────────────── */\nfunction setProgress(key, pct, msg) {\n  const wrap = document.getElementById(\'prog-\' + key);\n  const fill = document.getElementById(\'prog-\' + key + \'-fill\');\n  const lbl  = document.getElementById(\'prog-\' + key + \'-label\');\n  if (!wrap) return;\n  wrap.style.display = \'block\';\n  if (fill) fill.style.width = pct + \'%\';\n  if (lbl && msg) lbl.textContent = msg;\n}\nfunction hideProgress(key) {\n  const wrap = document.getElementById(\'prog-\' + key);\n  if (wrap) setTimeout(() => { wrap.style.display = \'none\'; }, 600);\n}\n\n/* ─────────────────────────────────────────────────────────────\n   DOWNLOAD HELPERS\n───────────────────────────────────────────────────────────── */\nfunction downloadBlob(blob, filename) {\n  const url = URL.createObjectURL(blob);\n  const a = document.createElement(\'a\');\n  a.href = url; a.download = filename;\n  document.body.appendChild(a); a.click();\n  document.body.removeChild(a);\n  setTimeout(() => URL.revokeObjectURL(url), 1000);\n}\n\nasync function downloadZip(blobs, filename) {\n  const zip = new JSZip();\n  blobs.forEach(({ blob, name }) => zip.file(name, blob));\n  const content = await zip.generateAsync({ type: \'blob\' });\n  downloadBlob(content, filename);\n}\n\n/* ─────────────────────────────────────────────────────────────\n   IMAGE LOAD HELPER\n───────────────────────────────────────────────────────────── */\nfunction loadImage(file) {\n  return new Promise((resolve, reject) => {\n    const img = new Image();\n    const url = URL.createObjectURL(file);\n    img.onload = () => { resolve(img); };\n    img.onerror = reject;\n    img.src = url;\n  });\n}\n\nfunction canvasToBlob(canvas, mime, quality) {\n  return new Promise(resolve => {\n    canvas.toBlob(resolve, mime, quality / 100);\n  });\n}\n\nfunction getExt(mime) {\n  const map = {\n    \'image/jpeg\': \'jpg\', \'image/png\': \'png\',\n    \'image/webp\': \'webp\', \'image/bmp\': \'bmp\'\n  };\n  return map[mime] || \'jpg\';\n}\n\nfunction withBg(canvas, ctx, mime) {\n  if (mime === \'image/jpeg\' || mime === \'image/bmp\') {\n    ctx.save();\n    ctx.globalCompositeOperation = \'destination-over\';\n    ctx.fillStyle = \'#fff\';\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    ctx.restore();\n  }\n}\n\n/* ─────────────────────────────────────────────────────────────\n   RESIZE\n───────────────────────────────────────────────────────────── */\nasync function runResize() {\n  const files = fileStore.resize;\n  if (!files.length) { notify(\'Please select at least one image.\', \'error\'); return; }\n  const btn = document.getElementById(\'btn-resize\');\n  btn.disabled = true;\n  setProgress(\'resize\', 0, \'Processing images…\');\n\n  const tw = parseInt(document.getElementById(\'resize-w\').value) || 0;\n  const th = parseInt(document.getElementById(\'resize-h\').value) || 0;\n  const mode = document.getElementById(\'resize-mode\').value;\n  const fmtRaw = document.getElementById(\'resize-fmt\').value;\n  const quality = parseInt(document.getElementById(\'resize-q\').value);\n\n  if (!tw && !th && mode !== \'width\' && mode !== \'height\') {\n    notify(\'Please enter at least a width or height.\', \'error\');\n    btn.disabled = false; return;\n  }\n\n  const results = [];\n  for (let i = 0; i < files.length; i++) {\n    const f = files[i];\n    const img = await loadImage(f);\n    const origW = img.naturalWidth, origH = img.naturalHeight;\n    aspectRatio = origW / origH;\n\n    let cw = tw || origW, ch = th || origH;\n    if (mode === \'width\') { cw = tw || origW; ch = Math.round(cw / (origW / origH)); }\n    else if (mode === \'height\') { ch = th || origH; cw = Math.round(ch * (origW / origH)); }\n    else if (mode === \'fit\') {\n      if (tw && th) {\n        const ratio = Math.min(tw / origW, th / origH);\n        cw = Math.round(origW * ratio); ch = Math.round(origH * ratio);\n      } else if (tw) { cw = tw; ch = Math.round(tw / (origW / origH)); }\n      else { ch = th; cw = Math.round(th * (origW / origH)); }\n    }\n    else if (mode === \'cover\' || mode === \'fill\') { cw = tw || origW; ch = th || origH; }\n\n    const canvas = document.createElement(\'canvas\');\n    canvas.width = cw; canvas.height = ch;\n    const ctx = canvas.getContext(\'2d\');\n\n    if (mode === \'fill\') {\n      const srcRatio = origW / origH, dstRatio = cw / ch;\n      let sx = 0, sy = 0, sw = origW, sh = origH;\n      if (srcRatio > dstRatio) { sw = origH * dstRatio; sx = (origW - sw) / 2; }\n      else { sh = origW / dstRatio; sy = (origH - sh) / 2; }\n      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);\n    } else {\n      ctx.drawImage(img, 0, 0, cw, ch);\n    }\n\n    const mime = fmtRaw === \'original\'\n      ? (f.type || \'image/jpeg\')\n      : fmtRaw;\n    withBg(canvas, ctx, mime);\n    const blob = await canvasToBlob(canvas, mime, quality);\n    const ext = fmtRaw === \'original\' ? f.name.split(\'.\').pop() : getExt(mime);\n    const base = f.name.replace(/\\.[^.]+$/, \'\');\n    results.push({ blob, name: `${base}_${cw}x${ch}.${ext}` });\n    URL.revokeObjectURL(img.src);\n    setProgress(\'resize\', Math.round(((i+1)/files.length)*100), `${i+1} / ${files.length} done`);\n  }\n\n  if (results.length === 1) downloadBlob(results[0].blob, results[0].name);\n  else await downloadZip(results, \'forma-resized.zip\');\n\n  hideProgress(\'resize\');\n  btn.disabled = false;\n  notify(`✓ ${results.length} image${results.length > 1 ? \'s\' : \'\'} resized successfully!`);\n}\n\n/* ─────────────────────────────────────────────────────────────\n   CONVERT\n───────────────────────────────────────────────────────────── */\nasync function runConvert() {\n  const files = fileStore.convert;\n  if (!files.length) { notify(\'Please select at least one image.\', \'error\'); return; }\n  const btn = document.getElementById(\'btn-convert\');\n  btn.disabled = true;\n  setProgress(\'convert\', 0, \'Converting…\');\n\n  const mime = document.getElementById(\'convert-fmt\').value;\n  const quality = parseInt(document.getElementById(\'convert-q\').value);\n  const whiteBg = document.getElementById(\'white-bg-toggle\').classList.contains(\'on\');\n  const ext = getExt(mime);\n\n  const results = [];\n  for (let i = 0; i < files.length; i++) {\n    const f = files[i];\n    const img = await loadImage(f);\n    const canvas = document.createElement(\'canvas\');\n    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;\n    const ctx = canvas.getContext(\'2d\');\n    if (whiteBg || mime === \'image/jpeg\') {\n      ctx.fillStyle = \'#fff\';\n      ctx.fillRect(0, 0, canvas.width, canvas.height);\n    }\n    ctx.drawImage(img, 0, 0);\n    const blob = await canvasToBlob(canvas, mime, quality);\n    const base = f.name.replace(/\\.[^.]+$/, \'\');\n    results.push({ blob, name: `${base}.${ext}` });\n    URL.revokeObjectURL(img.src);\n    setProgress(\'convert\', Math.round(((i+1)/files.length)*100), `${i+1} / ${files.length} done`);\n  }\n\n  if (results.length === 1) downloadBlob(results[0].blob, results[0].name);\n  else await downloadZip(results, \'forma-converted.zip\');\n\n  hideProgress(\'convert\');\n  btn.disabled = false;\n  notify(`✓ ${results.length} file${results.length > 1 ? \'s\' : \'\'} converted to ${ext.toUpperCase()}!`);\n}\n\n/* ─────────────────────────────────────────────────────────────\n   IMAGE → PDF\n───────────────────────────────────────────────────────────── */\nasync function runImg2PDF() {\n  const files = fileStore.img2pdf;\n  if (!files.length) { notify(\'Please add at least one image.\', \'error\'); return; }\n  const btn = document.getElementById(\'btn-img2pdf\');\n  btn.disabled = true;\n  setProgress(\'img2pdf\', 0, \'Building PDF…\');\n\n  const pageSz  = document.getElementById(\'pdf-pagesize\').value;\n  const orientRaw = document.getElementById(\'pdf-orient\').value;\n  const fit     = document.getElementById(\'pdf-fit\').value;\n  const margin  = parseInt(document.getElementById(\'pdf-margin\').value) || 0;\n  const outName = document.getElementById(\'pdf-filename\').value || \'output.pdf\';\n  const orient  = orientRaw === \'landscape\' ? \'l\' : \'p\';\n\n  const { jsPDF } = window.jspdf;\n  const doc = new jsPDF({ orientation: orient, unit: \'mm\', format: pageSz });\n\n  const pw = doc.internal.pageSize.getWidth();\n  const ph = doc.internal.pageSize.getHeight();\n  const aw = pw - margin * 2;\n  const ah = ph - margin * 2;\n\n  for (let i = 0; i < files.length; i++) {\n    if (i > 0) doc.addPage(pageSz, orient);\n    const img = await loadImage(files[i]);\n    const canvas = document.createElement(\'canvas\');\n    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;\n    const ctx = canvas.getContext(\'2d\');\n    ctx.fillStyle = \'#fff\';\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    ctx.drawImage(img, 0, 0);\n\n    const dataUrl = canvas.toDataURL(\'image/jpeg\', 0.92);\n    const iw = img.naturalWidth, ih = img.naturalHeight;\n    let dx = margin, dy = margin, dw = aw, dh = ah;\n\n    if (fit === \'contain\') {\n      const ratio = Math.min(aw / iw, ah / ih);\n      dw = iw * ratio; dh = ih * ratio;\n      dx = margin + (aw - dw) / 2; dy = margin + (ah - dh) / 2;\n    } else if (fit === \'cover\') {\n      const ratio = Math.max(aw / iw, ah / ih);\n      dw = iw * ratio; dh = ih * ratio;\n      dx = margin + (aw - dw) / 2; dy = margin + (ah - dh) / 2;\n    }\n    doc.addImage(dataUrl, \'JPEG\', dx, dy, dw, dh);\n    URL.revokeObjectURL(img.src);\n    setProgress(\'img2pdf\', Math.round(((i+1)/files.length)*100), `Page ${i+1} of ${files.length}`);\n  }\n\n  doc.save(outName);\n  hideProgress(\'img2pdf\');\n  btn.disabled = false;\n  notify(`✓ PDF created with ${files.length} page${files.length > 1 ? \'s\' : \'\'}!`);\n}\n\n/* ─────────────────────────────────────────────────────────────\n   PDF → IMAGES (PDF.js)\n───────────────────────────────────────────────────────────── */\npdfjsLib.GlobalWorkerOptions.workerSrc =\n  \'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js\';\n\nasync function runPDF2Img() {\n  const files = fileStore.pdf2img;\n  if (!files.length) { notify(\'Please select a PDF file.\', \'error\'); return; }\n  const btn = document.getElementById(\'btn-pdf2img\');\n  btn.disabled = true;\n  setProgress(\'pdf2img\', 0, \'Loading PDF…\');\n\n  const mime     = document.getElementById(\'p2i-fmt\').value;\n  const quality  = parseInt(document.getElementById(\'p2i-q\').value);\n  const scale    = parseFloat(document.getElementById(\'p2i-scale\').value);\n  const rangeRaw = document.getElementById(\'p2i-pages\').value.trim();\n  const ext      = getExt(mime);\n\n  const file = files[0];\n  const buf  = await file.arrayBuffer();\n\n  let pdfDoc;\n  try {\n    pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise;\n  } catch (e) {\n    notify(\'Failed to read PDF. Is it a valid file?\', \'error\');\n    btn.disabled = false; hideProgress(\'pdf2img\'); return;\n  }\n\n  const total = pdfDoc.numPages;\n  const pages = parsePageRange(rangeRaw, total);\n  const results = [];\n\n  for (let pi = 0; pi < pages.length; pi++) {\n    const pageNum = pages[pi];\n    setProgress(\'pdf2img\', Math.round(((pi+1)/pages.length)*100),\n      `Rendering page ${pageNum} / ${total}…`);\n    const page = await pdfDoc.getPage(pageNum);\n    const viewport = page.getViewport({ scale });\n    const canvas = document.createElement(\'canvas\');\n    canvas.width = viewport.width; canvas.height = viewport.height;\n    const ctx = canvas.getContext(\'2d\');\n    await page.render({ canvasContext: ctx, viewport }).promise;\n    const blob = await canvasToBlob(canvas, mime, quality);\n    const base = file.name.replace(/\\.pdf$/i, \'\');\n    results.push({ blob, name: `${base}_page${pageNum}.${ext}` });\n  }\n\n  if (results.length === 1) downloadBlob(results[0].blob, results[0].name);\n  else await downloadZip(results, `${file.name.replace(/\\.pdf$/i,\'\')}_pages.zip`);\n\n  hideProgress(\'pdf2img\');\n  btn.disabled = false;\n  notify(`✓ Extracted ${results.length} page${results.length > 1 ? \'s\' : \'\'} from PDF!`);\n}\n\nfunction parsePageRange(raw, total) {\n  if (!raw) return Array.from({ length: total }, (_, i) => i + 1);\n  const pages = new Set();\n  raw.split(\',\').forEach(part => {\n    const range = part.trim().match(/^(\\d+)(?:-(\\d+))?$/);\n    if (!range) return;\n    const s = parseInt(range[1]), e = range[2] ? parseInt(range[2]) : s;\n    for (let i = Math.max(1, s); i <= Math.min(total, e); i++) pages.add(i);\n  });\n  return Array.from(pages).sort((a, b) => a - b);\n}\n\n/* ─────────────────────────────────────────────────────────────\n   MOBILE MENU\n───────────────────────────────────────────────────────────── */\nfunction toggleMobileMenu() {\n  const btn = document.getElementById(\'nav-hamburger\');\n  const menu = document.getElementById(\'mobile-menu\');\n  btn.classList.toggle(\'open\');\n  menu.classList.toggle(\'open\');\n  document.body.style.overflow = menu.classList.contains(\'open\') ? \'hidden\' : \'\';\n}\nfunction closeMobileMenu() {\n  document.getElementById(\'nav-hamburger\').classList.remove(\'open\');\n  document.getElementById(\'mobile-menu\').classList.remove(\'open\');\n  document.body.style.overflow = \'\';\n}\n\n/* ─────────────────────────────────────────────────────────────\n   IMAGE COMPRESS\n───────────────────────────────────────────────────────────── */\nasync function runCompress() {\n  const files = fileStore.compress;\n  if (!files.length) { notify(\'Please select at least one image.\', \'error\'); return; }\n  const btn = document.getElementById(\'btn-compress\');\n  btn.disabled = true;\n  setProgress(\'compress\', 0, \'Compressing…\');\n\n  const quality = parseInt(document.getElementById(\'compress-q\').value);\n  const fmtRaw = document.getElementById(\'compress-fmt\').value;\n  const results = [];\n\n  for (let i = 0; i < files.length; i++) {\n    const f = files[i];\n    const img = await loadImage(f);\n    const canvas = document.createElement(\'canvas\');\n    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;\n    const ctx = canvas.getContext(\'2d\');\n    ctx.drawImage(img, 0, 0);\n    const mime = fmtRaw === \'original\' ? (f.type || \'image/jpeg\') : fmtRaw;\n    const blob = await canvasToBlob(canvas, mime, quality);\n    const ext = fmtRaw === \'original\' ? f.name.split(\'.\').pop() : getExt(mime);\n    const base = f.name.replace(/\\.[^.]+$/, \'\');\n    results.push({ blob, name: `${base}_compressed.${ext}` });\n    URL.revokeObjectURL(img.src);\n    setProgress(\'compress\', Math.round(((i+1)/files.length)*100), `${i+1} / ${files.length} done`);\n  }\n\n  if (results.length === 1) downloadBlob(results[0].blob, results[0].name);\n  else await downloadZip(results, \'forma-compressed.zip\');\n  hideProgress(\'compress\');\n  btn.disabled = false;\n  notify(`✓ ${results.length} image${results.length > 1 ? \'s\' : \'\'} compressed!`);\n}\n\n/* ─────────────────────────────────────────────────────────────\n   PDF MERGE\n───────────────────────────────────────────────────────────── */\nasync function runPDFMerge() {\n  const files = fileStore.pdfmerge;\n  if (files.length < 2) { notify(\'Please add at least 2 PDF files.\', \'error\'); return; }\n  const btn = document.getElementById(\'btn-pdfmerge\');\n  btn.disabled = true;\n  setProgress(\'pdfmerge\', 0, \'Merging PDFs…\');\n\n  const outName = document.getElementById(\'pdfmerge-filename\').value || \'merged.pdf\';\n  const { jsPDF } = window.jspdf;\n\n  let doc = null;\n  let totalPagesDone = 0;\n  let totalPages = 0;\n\n  // count total pages first\n  const pdfDocs = [];\n  for (let fi = 0; fi < files.length; fi++) {\n    const buf = await files[fi].arrayBuffer();\n    const pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise;\n    pdfDocs.push(pdfDoc);\n    totalPages += pdfDoc.numPages;\n  }\n\n  for (let fi = 0; fi < pdfDocs.length; fi++) {\n    const pdfDoc = pdfDocs[fi];\n    for (let pi = 1; pi <= pdfDoc.numPages; pi++) {\n      const page = await pdfDoc.getPage(pi);\n      const vp = page.getViewport({ scale: 1.5 });\n      const canvas = document.createElement(\'canvas\');\n      canvas.width = vp.width; canvas.height = vp.height;\n      const ctx = canvas.getContext(\'2d\');\n      await page.render({ canvasContext: ctx, viewport: vp }).promise;\n      const dataUrl = canvas.toDataURL(\'image/jpeg\', 0.85);\n\n      const pw = vp.width * 0.2645; // px to mm\n      const ph = vp.height * 0.2645;\n\n      if (!doc) {\n        doc = new jsPDF({ orientation: vp.width > vp.height ? \'l\' : \'p\', unit: \'mm\', format: [pw, ph] });\n      } else {\n        doc.addPage([pw, ph], vp.width > vp.height ? \'l\' : \'p\');\n      }\n      doc.addImage(dataUrl, \'JPEG\', 0, 0, pw, ph);\n      totalPagesDone++;\n      setProgress(\'pdfmerge\', Math.round((totalPagesDone / totalPages) * 100), `Page ${totalPagesDone} / ${totalPages}`);\n    }\n  }\n\n  if (doc) doc.save(outName);\n  hideProgress(\'pdfmerge\');\n  btn.disabled = false;\n  notify(`✓ Merged ${files.length} PDFs into ${outName}!`);\n}\n\n/* ─────────────────────────────────────────────────────────────\n   PDF SPLIT\n───────────────────────────────────────────────────────────── */\nfunction updateSplitMode() {\n  const mode = document.getElementById(\'split-mode\').value;\n  document.getElementById(\'split-range-group\').style.display = mode === \'range\' ? \'flex\' : \'none\';\n  document.getElementById(\'split-fixed-group\').style.display = mode === \'fixed\' ? \'flex\' : \'none\';\n  const hints = {\n    all: \'Each page will be saved as a separate PDF, bundled into a ZIP.\',\n    range: \'Enter page numbers like 1-3, 5, 7-9 to extract a specific range into one PDF.\',\n    fixed: \'PDF will be split into chunks of N pages each.\'\n  };\n  document.getElementById(\'split-hint\').textContent = hints[mode] || \'\';\n}\n\nasync function runPDFSplit() {\n  const files = fileStore.pdfsplit;\n  if (!files.length) { notify(\'Please select a PDF file.\', \'error\'); return; }\n  const btn = document.getElementById(\'btn-pdfsplit\');\n  btn.disabled = true;\n  setProgress(\'pdfsplit\', 0, \'Loading PDF…\');\n\n  const mode = document.getElementById(\'split-mode\').value;\n  const rangeRaw = document.getElementById(\'split-pages\').value.trim();\n  const fixedN = parseInt(document.getElementById(\'split-n\').value) || 1;\n  const { jsPDF } = window.jspdf;\n\n  const file = files[0];\n  const buf = await file.arrayBuffer();\n  let pdfDoc;\n  try { pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise; }\n  catch { notify(\'Failed to read PDF.\', \'error\'); btn.disabled = false; hideProgress(\'pdfsplit\'); return; }\n\n  const total = pdfDoc.numPages;\n  const baseName = file.name.replace(/\\.pdf$/i, \'\');\n\n  async function renderPageToPDF(pageNum) {\n    const page = await pdfDoc.getPage(pageNum);\n    const vp = page.getViewport({ scale: 1.5 });\n    const canvas = document.createElement(\'canvas\');\n    canvas.width = vp.width; canvas.height = vp.height;\n    const ctx = canvas.getContext(\'2d\');\n    await page.render({ canvasContext: ctx, viewport: vp }).promise;\n    const dataUrl = canvas.toDataURL(\'image/jpeg\', 0.9);\n    const pw = vp.width * 0.2645, ph = vp.height * 0.2645;\n    const doc = new jsPDF({ orientation: vp.width > vp.height ? \'l\' : \'p\', unit: \'mm\', format: [pw, ph] });\n    doc.addImage(dataUrl, \'JPEG\', 0, 0, pw, ph);\n    return doc.output(\'blob\');\n  }\n\n  async function renderPagesToPDF(pageNums, firstDoc) {\n    let doc = null;\n    for (let i = 0; i < pageNums.length; i++) {\n      const page = await pdfDoc.getPage(pageNums[i]);\n      const vp = page.getViewport({ scale: 1.5 });\n      const canvas = document.createElement(\'canvas\');\n      canvas.width = vp.width; canvas.height = vp.height;\n      const ctx = canvas.getContext(\'2d\');\n      await page.render({ canvasContext: ctx, viewport: vp }).promise;\n      const dataUrl = canvas.toDataURL(\'image/jpeg\', 0.9);\n      const pw = vp.width * 0.2645, ph = vp.height * 0.2645;\n      if (!doc) {\n        doc = new jsPDF({ orientation: vp.width > vp.height ? \'l\' : \'p\', unit: \'mm\', format: [pw, ph] });\n      } else {\n        doc.addPage([pw, ph], vp.width > vp.height ? \'l\' : \'p\');\n      }\n      doc.addImage(dataUrl, \'JPEG\', 0, 0, pw, ph);\n    }\n    return doc ? doc.output(\'blob\') : null;\n  }\n\n  const results = [];\n\n  if (mode === \'all\') {\n    for (let p = 1; p <= total; p++) {\n      setProgress(\'pdfsplit\', Math.round((p / total) * 100), `Splitting page ${p} / ${total}…`);\n      const blob = await renderPageToPDF(p);\n      results.push({ blob, name: `${baseName}_page${p}.pdf` });\n    }\n  } else if (mode === \'range\') {\n    const pages = parsePageRange(rangeRaw, total);\n    if (!pages.length) { notify(\'No valid pages in range.\', \'error\'); btn.disabled = false; hideProgress(\'pdfsplit\'); return; }\n    setProgress(\'pdfsplit\', 50, `Extracting ${pages.length} pages…`);\n    const blob = await renderPagesToPDF(pages);\n    if (blob) results.push({ blob, name: `${baseName}_pages${rangeRaw || \'all\'}.pdf` });\n    setProgress(\'pdfsplit\', 100, \'Done\');\n  } else if (mode === \'fixed\') {\n    const chunks = [];\n    for (let i = 1; i <= total; i += fixedN) chunks.push(Array.from({ length: Math.min(fixedN, total - i + 1) }, (_, k) => i + k));\n    for (let ci = 0; ci < chunks.length; ci++) {\n      setProgress(\'pdfsplit\', Math.round(((ci + 1) / chunks.length) * 100), `Chunk ${ci + 1} / ${chunks.length}…`);\n      const blob = await renderPagesToPDF(chunks[ci]);\n      if (blob) results.push({ blob, name: `${baseName}_part${ci + 1}.pdf` });\n    }\n  }\n\n  if (results.length === 1) downloadBlob(results[0].blob, results[0].name);\n  else if (results.length > 1) await downloadZip(results, `${baseName}_split.zip`);\n\n  hideProgress(\'pdfsplit\');\n  btn.disabled = false;\n  notify(`✓ Split into ${results.length} PDF${results.length > 1 ? \'s\' : \'\'}!`);\n}\n\n/* ─────────────────────────────────────────────────────────────\n   PDF COMPRESS\n───────────────────────────────────────────────────────────── */\nasync function runPDFCompress() {\n  const files = fileStore.pdfcompress;\n  if (!files.length) { notify(\'Please select a PDF file.\', \'error\'); return; }\n  const btn = document.getElementById(\'btn-pdfcompress\');\n  btn.disabled = true;\n  setProgress(\'pdfcompress\', 0, \'Loading PDF…\');\n\n  const level = document.getElementById(\'pdfcompress-level\').value;\n  const scaleMap = { low: 2.0, medium: 1.2, high: 0.8 };\n  const qualityMap = { low: 0.85, medium: 0.65, high: 0.45 };\n  const scale = scaleMap[level];\n  const quality = qualityMap[level];\n\n  const { jsPDF } = window.jspdf;\n  const file = files[0];\n  const buf = await file.arrayBuffer();\n  let pdfDoc;\n  try { pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise; }\n  catch { notify(\'Failed to read PDF.\', \'error\'); btn.disabled = false; hideProgress(\'pdfcompress\'); return; }\n\n  const total = pdfDoc.numPages;\n  let doc = null;\n\n  for (let pi = 1; pi <= total; pi++) {\n    setProgress(\'pdfcompress\', Math.round((pi / total) * 100), `Compressing page ${pi} / ${total}…`);\n    const page = await pdfDoc.getPage(pi);\n    const vp = page.getViewport({ scale });\n    const canvas = document.createElement(\'canvas\');\n    canvas.width = vp.width; canvas.height = vp.height;\n    const ctx = canvas.getContext(\'2d\');\n    ctx.fillStyle = \'#fff\';\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    await page.render({ canvasContext: ctx, viewport: vp }).promise;\n    const dataUrl = canvas.toDataURL(\'image/jpeg\', quality);\n    const pw = vp.width * 0.2645, ph = vp.height * 0.2645;\n    if (!doc) {\n      doc = new jsPDF({ orientation: vp.width > vp.height ? \'l\' : \'p\', unit: \'mm\', format: [pw, ph] });\n    } else {\n      doc.addPage([pw, ph], vp.width > vp.height ? \'l\' : \'p\');\n    }\n    doc.addImage(dataUrl, \'JPEG\', 0, 0, pw, ph);\n  }\n\n  if (doc) {\n    const outName = file.name.replace(/\\.pdf$/i, \'_compressed.pdf\');\n    doc.save(outName);\n  }\n  hideProgress(\'pdfcompress\');\n  btn.disabled = false;\n  notify(`✓ PDF compressed (${level} level)!`);\n}\n\n/* ─────────────────────────────────────────────────────────────\n   PDF ROTATE\n───────────────────────────────────────────────────────────── */\nasync function runPDFRotate() {\n  const files = fileStore.pdfrotate;\n  if (!files.length) { notify(\'Please select a PDF file.\', \'error\'); return; }\n  const btn = document.getElementById(\'btn-pdfrotate\');\n  btn.disabled = true;\n  setProgress(\'pdfrotate\', 0, \'Loading PDF…\');\n\n  const angleVal = parseInt(document.getElementById(\'rotate-angle\').value);\n  const rangeRaw = document.getElementById(\'rotate-pages\').value.trim();\n  const { jsPDF } = window.jspdf;\n\n  const file = files[0];\n  const buf = await file.arrayBuffer();\n  let pdfDoc;\n  try { pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise; }\n  catch { notify(\'Failed to read PDF.\', \'error\'); btn.disabled = false; hideProgress(\'pdfrotate\'); return; }\n\n  const total = pdfDoc.numPages;\n  const rotatePages = new Set(parsePageRange(rangeRaw, total));\n  let doc = null;\n\n  for (let pi = 1; pi <= total; pi++) {\n    setProgress(\'pdfrotate\', Math.round((pi / total) * 100), `Rotating page ${pi} / ${total}…`);\n    const page = await pdfDoc.getPage(pi);\n    const shouldRotate = rotatePages.has(pi);\n    const vp = page.getViewport({ scale: 1.5, rotation: shouldRotate ? angleVal : 0 });\n    const canvas = document.createElement(\'canvas\');\n    canvas.width = vp.width; canvas.height = vp.height;\n    const ctx = canvas.getContext(\'2d\');\n    ctx.fillStyle = \'#fff\';\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    await page.render({ canvasContext: ctx, viewport: vp }).promise;\n    const dataUrl = canvas.toDataURL(\'image/jpeg\', 0.9);\n    const pw = vp.width * 0.2645, ph = vp.height * 0.2645;\n    if (!doc) {\n      doc = new jsPDF({ orientation: vp.width > vp.height ? \'l\' : \'p\', unit: \'mm\', format: [pw, ph] });\n    } else {\n      doc.addPage([pw, ph], vp.width > vp.height ? \'l\' : \'p\');\n    }\n    doc.addImage(dataUrl, \'JPEG\', 0, 0, pw, ph);\n  }\n\n  if (doc) {\n    const outName = file.name.replace(/\\.pdf$/i, \'_rotated.pdf\');\n    doc.save(outName);\n  }\n  hideProgress(\'pdfrotate\');\n  btn.disabled = false;\n  notify(`✓ PDF rotated ${angleVal}°!`);\n}\n\n/* ─────────────────────────────────────────────────────────────\n   PDF WATERMARK\n───────────────────────────────────────────────────────────── */\nasync function runPDFWatermark() {\n  const files = fileStore.pdfwatermark;\n  if (!files.length) { notify(\'Please select a PDF file.\', \'error\'); return; }\n  const btn = document.getElementById(\'btn-pdfwatermark\');\n  btn.disabled = true;\n  setProgress(\'pdfwatermark\', 0, \'Loading PDF…\');\n\n  const wmText = document.getElementById(\'wm-text\').value.trim() || \'WATERMARK\';\n  const opacity = parseInt(document.getElementById(\'wm-opacity\').value) / 100;\n  const fontSize = parseInt(document.getElementById(\'wm-size\').value);\n  const position = document.getElementById(\'wm-position\').value;\n  const color = document.getElementById(\'wm-color\').value;\n  const { jsPDF } = window.jspdf;\n\n  // parse hex color to rgba\n  const r = parseInt(color.slice(1,3), 16);\n  const g = parseInt(color.slice(3,5), 16);\n  const b = parseInt(color.slice(5,7), 16);\n\n  const file = files[0];\n  const buf = await file.arrayBuffer();\n  let pdfDoc;\n  try { pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise; }\n  catch { notify(\'Failed to read PDF.\', \'error\'); btn.disabled = false; hideProgress(\'pdfwatermark\'); return; }\n\n  const total = pdfDoc.numPages;\n  let doc = null;\n\n  for (let pi = 1; pi <= total; pi++) {\n    setProgress(\'pdfwatermark\', Math.round((pi / total) * 100), `Watermarking page ${pi} / ${total}…`);\n    const page = await pdfDoc.getPage(pi);\n    const vp = page.getViewport({ scale: 1.5 });\n    const canvas = document.createElement(\'canvas\');\n    canvas.width = vp.width; canvas.height = vp.height;\n    const ctx = canvas.getContext(\'2d\');\n    ctx.fillStyle = \'#fff\';\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    await page.render({ canvasContext: ctx, viewport: vp }).promise;\n\n    // Draw watermark\n    ctx.save();\n    ctx.globalAlpha = opacity;\n    ctx.fillStyle = `rgb(${r},${g},${b})`;\n    ctx.font = `bold ${fontSize * 1.5}px Arial`;\n    ctx.textAlign = \'center\';\n    ctx.textBaseline = \'middle\';\n\n    const cx = canvas.width / 2, cy = canvas.height / 2;\n    let tx = cx, ty = cy;\n    const pad = 40;\n    if (position === \'top-left\') { tx = pad + ctx.measureText(wmText).width / 2; ty = pad + fontSize; ctx.globalAlpha = opacity; }\n    else if (position === \'top-right\') { tx = canvas.width - pad - ctx.measureText(wmText).width / 2; ty = pad + fontSize; }\n    else if (position === \'bottom-left\') { tx = pad + ctx.measureText(wmText).width / 2; ty = canvas.height - pad - fontSize; }\n    else if (position === \'bottom-right\') { tx = canvas.width - pad - ctx.measureText(wmText).width / 2; ty = canvas.height - pad - fontSize; }\n    else { // center diagonal\n      ctx.rotate(-Math.PI / 4);\n      tx = 0; ty = 0;\n      // translate to center for rotation\n      ctx.restore();\n      ctx.save();\n      ctx.globalAlpha = opacity;\n      ctx.fillStyle = `rgb(${r},${g},${b})`;\n      ctx.font = `bold ${fontSize * 1.5}px Arial`;\n      ctx.textAlign = \'center\';\n      ctx.textBaseline = \'middle\';\n      ctx.translate(cx, cy);\n      ctx.rotate(-Math.PI / 4);\n      ctx.fillText(wmText, 0, 0);\n      ctx.restore();\n      const dataUrl2 = canvas.toDataURL(\'image/jpeg\', 0.9);\n      const pw2 = vp.width * 0.2645, ph2 = vp.height * 0.2645;\n      if (!doc) {\n        doc = new jsPDF({ orientation: vp.width > vp.height ? \'l\' : \'p\', unit: \'mm\', format: [pw2, ph2] });\n      } else {\n        doc.addPage([pw2, ph2], vp.width > vp.height ? \'l\' : \'p\');\n      }\n      doc.addImage(dataUrl2, \'JPEG\', 0, 0, pw2, ph2);\n      continue;\n    }\n    ctx.fillText(wmText, tx, ty);\n    ctx.restore();\n\n    const dataUrl = canvas.toDataURL(\'image/jpeg\', 0.9);\n    const pw = vp.width * 0.2645, ph = vp.height * 0.2645;\n    if (!doc) {\n      doc = new jsPDF({ orientation: vp.width > vp.height ? \'l\' : \'p\', unit: \'mm\', format: [pw, ph] });\n    } else {\n      doc.addPage([pw, ph], vp.width > vp.height ? \'l\' : \'p\');\n    }\n    doc.addImage(dataUrl, \'JPEG\', 0, 0, pw, ph);\n  }\n\n  if (doc) {\n    const outName = file.name.replace(/\\.pdf$/i, \'_watermarked.pdf\');\n    doc.save(outName);\n  }\n  hideProgress(\'pdfwatermark\');\n  btn.disabled = false;\n  notify(`✓ Watermark "${wmText}" added to ${total} page${total > 1 ? \'s\' : \'\'}!`);\n}\n')
          fn()
        } catch(e) {
          console.error('FORMA init error:', e)
        }
      }
    }, 100)

    return () => {
      clearInterval(waitForLibs)
      styleEl.remove()
    }
  }, [])

  return (
    <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />
  )
}
