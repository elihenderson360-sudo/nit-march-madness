# NIT Bracket React Migration Plan

## Goal

Convert the current single-file bracket site into a full React project that is still easy to deploy on Netlify as a static frontend, while making the codebase much easier to style, maintain, and extend.

## Current Starting Point

The repository currently contains:

- `nit_bracket_single_file_site.html`
- `LICENSE`

The current app is a fully self-contained HTML file with:

- inline CSS in a `<style>` block
- all state and rendering logic in a single `<script>` block
- direct DOM manipulation instead of components
- `localStorage` persistence for bracket state
- receipt copy/download helpers
- a placeholder `fakeSubmitToBackend()` function instead of real submission handling

This means the migration is not a normal "refactor a web app" task. It is a full extraction of markup, styles, state logic, and browser behavior out of one document into a real frontend project structure.

## Recommended Approach

Use **React + Vite** for the frontend.

Why this fits Netlify:

- Vite outputs a static production build that Netlify can host easily
- React gives the component structure needed for full-site styling and future page growth
- Netlify works cleanly with Vite using a simple build command and publish directory
- this keeps the site compatible with the way it is already being hosted now

## Guiding Constraints

- Keep deployment compatible with Netlify static hosting
- Preserve the current user-facing bracket behavior before adding bigger design changes
- Keep `localStorage` support so users do not lose the current autosave behavior
- Do not remove the current single-file HTML until the React version reaches feature parity
- Leave room for either Netlify Forms or Netlify Functions later, depending on how submissions should work
- Use the ESPN screenshot as a **layout and visual direction reference only**, not as a source to copy logos, trademarks, or exact branded assets

## Phase 1: Capture the Current App as the Baseline

1. Audit the existing single-file app and list the behaviors that must survive the migration.
2. Record the current functional areas:
   - entrant info form
   - bracket pick flow
   - semifinal/championship propagation
   - autosave status
   - tiebreaker inputs
   - receipt generation
   - receipt copy/download actions
   - bracket reset
   - submit flow and validation
3. Treat `nit_bracket_single_file_site.html` as the source of truth until the React app matches it.
4. Optionally save screenshots of desktop and mobile layouts for parity checks during the rebuild.

## Phase 2: Scaffold the React Project

1. Initialize a Vite React app in this repository.
2. Add the standard project files:
   - `package.json`
   - `vite.config.*`
   - `index.html`
   - `src/main.*`
   - `src/App.*`
3. Add a `.gitignore` if one does not already exist.
4. Keep the legacy HTML file in place during migration, either:
   - at the repo root temporarily, or
   - moved into an `archive/` or `legacy/` folder after the React app is working
5. Confirm the local dev server runs and the production build completes before moving deeper into the migration.

## Phase 3: Design the New Project Structure

Create a structure that separates data, UI, utilities, and styles. A good target shape is:

```text
src/
  assets/
  components/
    bracket/
    entry/
    receipt/
    layout/
  data/
    initialState.*
  hooks/
    useBracketState.*
    useLocalStorage.*
  utils/
    bracketLogic.*
    receipt.*
    validation.*
  styles/
    globals.css
    variables.css
```

Key rule: move logic into pure functions where possible so the bracket behavior is easy to test and not trapped inside components.

## Phase 4: Extract Data and Bracket Logic

1. Move the current `INITIAL_STATE` object into a dedicated data file.
2. Extract the pure bracket update logic into utilities:
   - section rebuilding
   - finals rebuilding
   - winner selection
   - reset behavior
3. Extract submission validation into its own utility.
4. Extract receipt formatting into a dedicated receipt helper.
5. Keep the storage key in a constants file so it is easy to update later.
6. Make sure the React version preserves the same team list and bracket structure that exists today.

## Phase 5: Convert the UI into React Components

Break the current page into reusable components rather than rebuilding everything in one file.

Suggested component breakdown:

- `App`: top-level page composition
- `SiteHeader`: title, intro, top action buttons
- `EntryForm`: entrant info section
- `ChampionSummary`: current champion display and save status
- `BracketStage`: left side, finals, right side layout
- `HalfBracket`: one half of the bracket
- `RoundColumn`: a bracket round column
- `GameCard`: two-team game selector
- `FinalsPanel`: semifinal and championship controls
- `TiebreakerForm`: round-by-round tiebreaker inputs
- `SubmitSection`: submit button and submission message
- `ReceiptSection`: receipt text and receipt actions

Migration rule:

- first recreate the current layout and behavior in React
- only after parity is reached should larger design/styling changes begin

## Phase 6: Replace DOM Manipulation with React State

1. Replace direct `document.getElementById`, `innerHTML`, and manual element creation with React rendering.
2. Manage the bracket state with `useState` or `useReducer`.
3. Prefer `useReducer` if the bracket transitions feel easier to reason about as explicit actions.
4. Use `useEffect` to persist state to `localStorage`.
5. Initialize state from `localStorage` on load, with a safe fallback to the default bracket state.
6. Recompute downstream rounds whenever a pick changes, using the extracted bracket utility functions.
7. Preserve the current autosave message behavior in a React-friendly way.

## Phase 7: Move Styles into a Real Styling System

1. Pull the inline CSS out of the HTML file and place it in real stylesheet files.
2. Start with the current visual language as the baseline so the app does not regress during migration.
3. Introduce a style organization strategy such as:
   - global variables for colors, spacing, radius, shadows
   - layout styles for page structure
   - component-scoped styles for bracket pieces
4. Add a dedicated visual reference pass based on the attached ESPN bracket challenge screenshot.
5. During that pass, define the visual traits to recreate in a branded-but-original way:
   - a wide, full-page bracket canvas instead of stacked cards dominating the page
   - a top round-navigation/header bar with round names and dates
   - left and right region labels aligned to the bracket edges
   - clean white matchup cards on a light gray background
   - thinner connector lines and more spacious round-to-round separation
   - a center column that feels like a featured stage for semifinals/championship content
   - tighter typography hierarchy with stronger labels and calmer supporting metadata
6. Build a design token set for that direction:
   - neutral background scale
   - white card surfaces
   - subtle border and shadow values
   - dark text hierarchy
   - one accent color for primary actions
   - spacing tokens sized for a large bracket canvas
7. Once parity is stable, expand the app from "single card page" styling into a fuller website feel:
   - stronger page sections
   - more intentional typography
   - more branded header/footer treatment
   - more robust responsive behavior
8. Keep the styling approach Netlify-safe by staying in normal frontend assets compiled by Vite.

## Phase 8: Add an ESPN-Inspired Bracket Presentation Layer

This phase should happen after React feature parity is working, but before final polish and README writing.

1. Rework the page shell so the bracket is the main event rather than one card among many.
2. Introduce a full-width top bracket header with:
   - event title
   - season or year selector area if desired
   - round labels across the top
   - optional date labels beneath each round name
3. Split the main bracket canvas into a strong three-part composition:
   - left side rounds
   - center finals stage
   - right side rounds
4. Add region labels above each side, similar to the screenshot's left/right conference headings.
5. Restyle matchup blocks to look more like broadcast-style bracket cards:
   - white cards
   - softer shadow
   - small radius
   - more compact metadata rows
   - stronger team-name emphasis
6. Add space in each matchup card for future enhancements, even if not all ship immediately:
   - seed number treatment
   - optional team logo slot
   - game time or note row
   - network or source label
7. Rebuild bracket connectors so they feel closer to the screenshot:
   - lighter gray lines
   - more geometric spacing
   - visually centered transitions between rounds
8. Upgrade the center section so it becomes a designed destination instead of just another card:
   - semifinals and championship stacked in a stronger visual frame
   - room for a call-to-action, instructions, or prize/promo box
   - clearer champion emphasis
9. Separate "bracket interaction UI" from "supporting controls" so inputs like name, tiebreakers, receipt, and submit actions can sit above/below the bracket or in secondary sections without cluttering the bracket canvas.
10. Create desktop-first layout rules for the wide bracket view, then define mobile/tablet behavior intentionally instead of only collapsing everything into one column.
11. For smaller breakpoints, decide on one of these responsive strategies:
   - horizontal scroll bracket canvas
   - condensed stacked round groups
   - hybrid approach with a scrollable bracket and stacked support panels
12. Add hover, selected, disabled, and completed states that match the more polished sports-bracket feel.
13. Keep the resulting design inspired by the screenshot while avoiding ESPN-specific marks, logos, wording, or exact UI clones.

## Phase 9: Rebuild Browser Features

Recreate all browser behaviors from the current HTML app:

- autosave to `localStorage`
- save status timestamp
- copy receipt to clipboard
- download receipt as a text file
- reset bracket
- submission validation

Also improve resilience where useful:

- guard clipboard access failures
- protect against malformed saved state
- separate display messages from business logic

## Phase 10: Choose a Netlify-Compatible Submission Path

The current submit flow is only a placeholder, so this should be an explicit decision during implementation.

Option A: Netlify Forms

- good if submission can be form-style and relatively simple
- easiest Netlify-native path
- limited if custom processing is needed

Option B: Netlify Functions

- better if submission should store data, send emails, validate server-side, or integrate with another service
- still fully compatible with Netlify hosting
- requires adding a `netlify/functions/` directory and wiring the frontend request to it

Recommended implementation order:

1. keep the fake submit flow during UI migration
2. finish React feature parity
3. replace the fake submit logic with the chosen Netlify submission path

## Phase 11: Add Netlify Project Configuration

1. Add a `netlify.toml` file if one is not already being used.
2. Set the build command and publish directory for Vite.
3. If using client-side routing beyond a single page, add a redirect rule so Netlify serves `index.html`.
4. If using Netlify Functions, configure the functions directory as well.
5. Verify the production build output is what Netlify expects before changing the live deployment.

Example deployment targets to configure:

- build command: `npm run build`
- publish directory: `dist`

## Phase 12: Verify Feature Parity Before Redesign

Before calling the migration complete, test the React app against the original HTML behavior:

- picks advance correctly through every round
- later-round winners clear correctly when earlier picks change
- champion display updates correctly
- tiebreakers save and reload
- receipt text matches expected data
- download and copy actions still work
- reset clears the bracket state
- submission validation still blocks incomplete entries
- mobile layout still works

If possible, add lightweight tests around the extracted bracket logic since that is the highest-risk behavior during the rewrite.

Add a visual QA pass against the screenshot-inspired target as well:

- header bar reads clearly across the full width
- round labels align with the bracket columns
- bracket cards feel balanced and not cramped
- connector lines are readable but subtle
- center finals area stands out appropriately
- the page feels like a complete website, not just a form with a bracket inside it
- the design remains original and does not look like a direct ESPN asset copy

## Phase 13: Clean Up the Repository

1. Decide what to do with `nit_bracket_single_file_site.html` after migration:
   - keep it as a historical reference, or
   - move it into a legacy folder, or
   - remove it once the React app is fully verified
2. Remove dead code and temporary migration helpers.
3. Confirm the repo contains only the files needed for ongoing development and Netlify deployment.

## Phase 14: Create the README Last

Create the README only after the React app structure and deployment flow are finalized so it reflects the real project.

The README should include:

- project overview
- what the app does
- tech stack
- local development steps
- build command
- Netlify deployment notes
- environment variables, if any
- how submissions work
- where the bracket data and logic live
- any known follow-up work

Suggested final sections:

1. Overview
2. Tech Stack
3. Local Development
4. Production Build
5. Netlify Deployment
6. Project Structure
7. Submission Flow
8. Future Improvements

## Suggested Implementation Order

1. Scaffold Vite + React
2. Preserve the original HTML as a reference
3. Extract initial data and pure bracket logic
4. Rebuild the UI with React components
5. Restore `localStorage`, receipt, reset, and validation features
6. Apply the screenshot-inspired bracket presentation layer
7. Add Netlify config
8. Replace fake submission with a real Netlify-compatible path
9. Run parity and visual testing
10. Clean up legacy files
11. Write the final README

## Definition of Done

This migration is complete when:

- the app runs locally as a React project
- the production build deploys cleanly to Netlify
- the bracket behavior matches the original single-file version
- styles are managed through the React project instead of inline HTML
- the submit path is either real or intentionally documented as pending
- the repository includes a README that documents the new setup

## Immediate Next Step

The first implementation task should be to scaffold the Vite React app without deleting the current HTML file, so the existing bracket can remain available as a working reference during the rewrite.
