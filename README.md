<div align="center">
  <h1>✨ OpenResume</h1>
  <p><strong>Create stunning, ATS-friendly resumes in seconds—not hours</strong></p>
  
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
  [![Next.js](https://img.shields.io/badge/Next.js_15-black?logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
  
  <p align="center">
    <a href="#demo">View Demo</a> •
    <a href="#features">Features</a> •
    <a href="#quickstart">Quick Start</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#contributing">Contribute</a>
  </p>

  <br/>
  
  <img src="https://via.placeholder.com/800x400?text=OpenResume+Screenshot" alt="OpenResume Preview" width="80%" />
</div>

## 🚀 What is OpenResume?

**OpenResume** liberates your resume-building experience. No paywalls, no sign-ups, no tracking—just a beautifully simple tool that puts you in control.

**The Problem:** Most resume builders are frustrating experiences:
- 🔒 Basic features locked behind paywalls
- 📊 Your data tracked and sold
- 🔑 Account creation required for simple PDF exports

**Our Solution:** A privacy-first, open-source alternative built with modern web technologies that just works.

## ✨ Features <a name="features"></a>

- 💨 **Blazing Fast** — Built with Next.js 15 and Turbopack for instant feedback
- 🎨 **Professional Templates** — Multiple ATS-optimized designs
- ⚡️ **Instant Preview** — See changes in real-time with live rendering
- 📱 **Fully Responsive** — Perfect experience on desktop, tablet, or mobile
- 🔐 **100% Private** — All data stays in your browser, nothing sent to servers
- 🌙 **Dark Mode** — Easy on the eyes, day or night
- 🧩 **Drag & Drop Sections** — Customize your resume layout intuitively
- 📤 **Export Options** — Download as PDF, share links, or print directly

## 🏁 Quick Start <a name="quickstart"></a>

```bash
# Clone the repo
git clone https://github.com/yourusername/openresume.git

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to start building your resume!

## 🧰 Tech Stack <a name="tech-stack"></a>

OpenResume leverages modern technologies for the best developer and user experience:

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Components**: Radix UI for accessible, unstyled components
- **Forms**: React Hook Form with Zod validation
- **PDF Generation**: @react-pdf/renderer for pixel-perfect exports
- **State Management**: Zustand for simple, fast state
- **Deployment**: Optimized for Cloudflare Pages, Vercel, or self-hosting

## 🛠️ Development

```bash
# Start development server with hot reloading
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Deploy to Cloudflare Pages
pnpm deploy
```

## 🤝 Contributing <a name="contributing"></a>

Contributions make OpenResume better for everyone! Whether you're fixing bugs, improving templates, or enhancing features—we welcome your input.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-improvement`)
3. Commit your changes (`git commit -m 'Add some amazing improvement'`)
4. Push to the branch (`git push origin feature/amazing-improvement`)
5. Open a Pull Request

See our [Contribution Guidelines](CONTRIBUTING.md) for more details.

## 🔍 Project Structure

```
openresume/
├── components/         # Reusable UI components
│   ├── resume/         # Resume-specific components
│   └── ui/             # Base UI components with Radix
├── lib/                # Utility functions and hooks
├── pages/              # Next.js pages and API routes
├── public/             # Static assets
└── styles/             # Global styles and Tailwind config
```

## 🌐 Live Demo <a name="demo"></a>

Try OpenResume right now at [https://openresume.codeideal.com](https://openresume.codeideal.com)

## 📄 License

OpenResume is [MIT licensed](LICENSE) — free to use, modify, and distribute.

---

<div align="center">
  <p>Built with ❤️ by developers, for developers</p>
  <p>
    <a href="https://github.com/novincode/openresume/stargazers">Star us on GitHub</a> •
  
  </p>
</div>
