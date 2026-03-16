# 2026 College Front Office NIT Bracket Challenge

This repository now contains a full React project for the NIT bracket experience, replacing the old single-file HTML approach with a component-based frontend that is still deployable on Netlify as a static site.

The original `nit_bracket_single_file_site.html` is still in the repo as the pre-migration reference. The live app entry point is now the Vite/React app rooted at `index.html` and `src/`.

## Overview

The app lets users:

- enter their name, email, and optional handle
- make bracket picks through every round
- autosave progress in `localStorage`
- enter round-by-round 3-point tiebreakers
- copy or download a receipt of their bracket
- submit the completed entry through a Netlify-compatible function

## Tech Stack

- React
- Vite
- plain CSS with shared variables
- Netlify static hosting
- Netlify Functions for submission handling

## Local Development

1. Install Node.js and npm if they are not already available on your machine.
2. Install dependencies:

```bash
npm install
```

3. Start the Vite dev server:

```bash
npm run dev
```

4. If you want to test the Netlify Function locally, use Netlify's local tooling instead of plain Vite:

```bash
npm run dev:netlify
```

## Production Build

Build the production site with:

```bash
npm run build
```

Vite outputs the static site to `dist/`.

## Netlify Deployment

This repo includes a `netlify.toml` file configured for:

- build command: `npm run build`
- publish directory: `dist`
- functions directory: `netlify/functions`
- redirect from `/api/submit-bracket` to the Netlify function

If you deploy this repo on Netlify, the frontend remains static while submissions are handled through the function at `netlify/functions/submit-bracket.js`.

## Project Structure

Key files and folders:

- `index.html`: Vite app entry
- `src/App.jsx`: page composition and app-level handlers
- `src/hooks/useBracketState.js`: reducer-backed bracket state and local storage persistence
- `src/data/initialState.js`: bracket field and team data
- `src/utils/bracketLogic.js`: round rebuilding and state hydration logic
- `src/utils/receipt.js`: receipt generation helpers
- `src/utils/validation.js`: pre-submit validation
- `src/styles/globals.css`: global app styling
- `src/styles/variables.css`: design tokens
- `netlify/functions/submit-bracket.js`: Netlify submission endpoint

## Submission Flow

The submit button posts the current bracket payload to `/api/submit-bracket`, which Netlify rewrites to the included serverless function.

Current behavior:

- validates required fields in the frontend
- stamps the bracket with `submittedAt`
- returns a generated entry ID from the function
- keeps local browser persistence intact even if submission fails

The provided function currently acknowledges the submission and returns an ID. It does not yet store entries in a database or send emails.

## Design Direction

The styling has been shifted toward a fuller sports-bracket presentation:

- a wide bracket board
- top round header bar
- central finals stage
- cleaner white matchup cards on a light gray canvas

The ESPN screenshot was treated as layout inspiration only. No ESPN branding, logos, or direct asset copies were added.

## Legacy Reference

The original single-file version remains here:

- `nit_bracket_single_file_site.html`

Use it as a parity reference while refining the React version.

## Future Improvements

- add automated tests for bracket progression logic
- add real persistence for submitted entries
- add team logos or richer game metadata if desired
- refine mobile bracket navigation further
- decide whether to keep or archive the legacy HTML file once the React version is fully validated
