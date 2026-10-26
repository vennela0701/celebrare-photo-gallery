# Frame — Celebrare Frontend Intern Assignment

A responsive photo gallery built to match the seven requirements in the Celebrare pre-screening assignment: React + Vite, Tailwind CSS, Picsum Photos API, responsive grid, author search, `useReducer` favourites persisted in `localStorage`, a `useFetchPhotos` custom hook, `useCallback`, and `useMemo`.

## Requirements
- Node.js 18+ (recommended; Node.js 20 is supported)
- Dependency versions are pinned to compatible releases instead of `latest`, to avoid installing a newer Vite/npm toolchain that may require a newer Node.js version.
- npm
- Internet connection for the Picsum Photos API and images

## Run locally
1. Extract this folder and open it in VS Code.
2. Open Terminal → New Terminal.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL Vite prints (usually `http://localhost:5173`).
6. Before submission, test the app and run:
   ```bash
   npm run build
   ```

## Requirement checklist
1. **React + Vite + Tailwind:** configured with `vite.config.js`, `tailwind.config.js`, and `src/index.css`. No component library is used.
2. **API:** `src/hooks/useFetchPhotos.js` fetches `https://picsum.photos/v2/list?limit=30`; exposes `photos`, `loading`, and `error` and aborts the request on unmount.
3. **Responsive grid:** `src/App.jsx` uses one column on mobile, two on tablet, and four on desktop; each card includes image, author, and heart button.
4. **Search:** filters the already-fetched photo array by author as you type; no extra API calls.
5. **Favourites:** reducer actions are `TOGGLE` and `CLEAR`; IDs are loaded from and saved to localStorage. The required favourite state uses `useReducer`, not `useState`.
6. **Custom hook:** the Gallery UI (the `App` component) consumes `useFetchPhotos` rather than fetching directly.
7. **Performance hooks:** `useCallback` stabilizes the search handler and favourite toggle handler; `useMemo` computes filtered photos when its dependencies change.

## GitHub submission
Create a **public** repository on GitHub, for example `celebrare-photo-gallery`. From this project directory run:

```bash
git init
git add .
git commit -m "Build responsive photo gallery assignment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/celebrare-photo-gallery.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username and use the repository URL GitHub gives you. Never commit `node_modules` or secrets.

## Before you submit
- Confirm all 30 photos load.
- Search for part of an author name; confirm the grid filters immediately.
- Favourite a photo, refresh the page, and confirm the heart remains selected.
- Test the Favourites tab and empty states.
- Resize the browser to mobile/tablet/desktop widths.
- Run `npm run build` and resolve any errors.
- Record and upload the required five-minute explanation; the app source alone does not complete the submission.

## Notes
The Picsum endpoint returns photo metadata. Images are loaded using the matching Picsum image endpoint. If the API or image service is temporarily unavailable, check your connection and retry. Favourite data is stored in the current browser's localStorage.
