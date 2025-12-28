<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1t9N6qD-bsuD6OLWG_mKSU2RdZlj1jyCD

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## CI (GitHub Actions)

- `CI` workflow runs `npm ci`, `npm run lint` (TypeScript no-emit), and `npm run build` on pushes and PRs.

## Deploy (Vercel via GitHub Actions)

This repo includes a Vercel workflow that:
- Creates **Preview** deployments on pull requests
- Creates **Production** deployments on pushes to `main`

### Required GitHub secrets

Add these secrets in your GitHub repo settings:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

