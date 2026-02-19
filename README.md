# PromptPilot MVP (Prompt a Startup 2026)

Production-focused MVP for **Prompt a Startup 2026 — Polar × Lovable**.

## What this ships

- Landing page with clear product positioning
- **Monetization flow**:
  - Free tier with daily generation limit (3/day)
  - Upgrade path to Pro ($19/mo)
  - Checkout page (Polar-style demo) that upgrades account state
- Subscription-gated app behavior (free vs pro)

## Run locally

```bash
python -m http.server 8080
# open http://localhost:8080
```

## Deploy

Deploy the `prompt-startup-mvp` folder to Vercel.

## Files

- `index.html` — marketing + pricing
- `app.html` — gated product experience
- `checkout.html` — checkout completion flow
- `script.js` — usage limits + subscription logic
- `styles.css` — UI styles
