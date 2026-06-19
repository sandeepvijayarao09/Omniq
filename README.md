# Omniq

> One app. Every person. Every task. Every organization.

A single-page marketing site for **Omniq**, a concept for an enterprise AI platform positioned as a controlled interface between employees and large language models — privacy-first, role-aware, and fully auditable.

## Overview

This repository contains the static landing page for Omniq. It presents the product concept: an organization-wide AI layer that grounds answers in internal context, tokenizes sensitive data before any model call, enforces role-based access, and logs every interaction to an immutable audit trail.

The site is built as a self-contained static page (HTML, CSS, vanilla JavaScript) with no build step or framework.

## Features

- Single-page responsive landing site with sticky navigation and a mobile menu
- Animated hero terminal that types through sample org-intelligence queries
- Sections for the problem statement, platform features, architecture flow, security, role-based access tiers, pricing, and results
- Interactive role tabs (Basic, Pro, Manager, Admin, Executive)
- Scroll-triggered fade-in animations via `IntersectionObserver`
- Active-section highlighting in the nav as you scroll
- Contact form that opens a prefilled `mailto:` draft on submit

## Tech Stack

- HTML5
- CSS3 (custom design system, Google Fonts: Inter, JetBrains Mono, Lora)
- Vanilla JavaScript (no dependencies, no bundler)

## Project Structure

```
index.html   -- Page markup and all content sections
style.css    -- Styling and design system
main.js      -- Nav behavior, role tabs, scroll animations, terminal typing, contact form
```

## Running Locally

No build step is required. Serve the directory with any static file server, for example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or simply open `index.html` directly in a browser.

## Notes

The metrics, pricing, and product claims on the page describe a conceptual product and are illustrative. This repository is the front-end marketing site only.
