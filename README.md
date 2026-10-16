# Docwright 📝

A client-side, zero-backend, Google Docs-style rich text processor powered by **DeepSeek Flash** multi-agent editorial engines, speech-to-text dictation, and client-side encrypted password sharing built specifically for GitHub Pages.

## ✨ Features

- **Google Docs Experience**: Authentic typography, rulers with drag margins, paginated view with zoom stepper, Letter/A4 toggles, print and export to HTML, Markdown, and TXT.
- **DeepSeek Flash Multi-Agent Workshop (4 Passes)**:
  - **Pass 1: Architect (Planner)** – Complete structural blueprint adhering strictly to requested volume, outline, and page count.
  - **Pass 2: Drafter (Builder)** – High-cadence longform prose expansion with realistic facts and domain depth.
  - **Pass 3: Auditor (Critic)** – Rigorous editorial critique and audit enforcing anti-AI rules (no em dashes, no hyphen list slop, no artificial buzzwords).
  - **Pass 4: Master Polisher (Reviewer)** – Final publication-grade manuscript synthesized from audit directives.
- **Floating Inline AI Pill ("Help Me Write")**: Select any text to activate quick transformations:
  - 🪄 **Human Voice**: Rewrites stiff or robotic prose into natural human cadence without AI buzzwords.
  - 📈 **Expand & Deepen**: Elaborates with concrete factual mechanisms and practical depth.
  - ✂️ **Shorten**: Punchy, concise, and direct summaries.
  - 🔍 **Fix Flow**: Enhances rhythm, sentence variety, and clarity.
  - 💬 **Custom Prompt**: Execute custom instructions directly on selections with real-time preview, Replace Selection, or Insert Below.
- **Voice Typing / Dictation (Feature 5)**:
  - Continuous speech-to-text powered by native Web Speech API.
  - Toolbar microphone button with live recording animations.
  - Keyboard shortcut: `Ctrl+Shift+S`.
- **Encrypted Document Sharing (Zero-Backend for GitHub Pages)**:
  - **Share Button**: Generate shareable links formatted as `#/d/[random-8-digits]#...`.
  - **Password Protection**: Encrypted directly in the browser via Web Crypto AES-GCM (256-bit) and PBKDF2 (SHA-256, 100,000 iterations) with Gzip compression stream.
  - Recipients open the link, enter the password in the modal, and the document is decrypted and imported into their local documents list.
