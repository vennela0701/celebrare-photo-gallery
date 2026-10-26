# Five-minute screen recording script

Use this as a speaking guide, not as a claim that you did anything you have not tested. Start your recording with the app already running in the browser and the source open in VS Code. Speak naturally and show the actions as you explain them.

## 0:00–0:45 — Demonstrate the app
“Hi, this is my photo gallery assignment for the Celebrare Frontend React Internship. It is built with React, Vite and Tailwind CSS. The gallery loads up to 30 photos from the Picsum Photos API. Each card shows a photo, its author and a heart button. The layout adjusts for mobile, tablet and desktop.”

Show the gallery, resize the browser if time allows, and point to the author labels and heart buttons.

## 0:45–1:20 — Search and favourites
“I can search by photographer name. The list updates as I type and this does not make another API request; it filters the data that is already in memory. I can press a heart to add or remove a favourite. The Favourites filter shows only saved photos. I’ll refresh the page now to demonstrate that the saved favourites persist.”

Type a real part of a visible author name, clear the search, favourite one photo, open Favourites, refresh, and show that it is still saved.

## 1:20–2:05 — Explain `useFetchPhotos`
“Here in `src/hooks/useFetchPhotos.js`, I extracted the network request into the custom hook called `useFetchPhotos`. It returns three values: `photos`, `loading`, and `error`. The hook starts in a loading state, requests the Picsum endpoint, checks whether the response succeeded, and parses the JSON. If the request fails, it sets a readable error message. The AbortController cancels an in-flight request if the component unmounts.”

Show the hook in VS Code. Mention that the UI renders a spinner while loading and an error state if the request fails.

## 2:05–3:00 — Explain `useReducer`
“In `src/App.jsx`, the favourites list uses `useReducer`, not `useState`, as required. The reducer handles `TOGGLE`, which adds an ID if it is not saved or removes it if it is already saved, and `CLEAR`, which returns an empty list. The initial state is read from localStorage. An effect writes the updated favourites to localStorage whenever the list changes. Using a reducer keeps the state transitions in one place and makes the add/remove logic explicit.”

Point to `readSavedFavourites`, `favouritesReducer`, the `useReducer` call, and the effect. The `CLEAR` action is implemented as a reducer action even though the UI does not add a separate clear-all control.

## 3:00–3:50 — Explain `useCallback` and `useMemo`
“`useCallback` is used for the search-change handler and favourite-toggle handler so their function references stay stable between renders unless their dependencies change. `useMemo` computes the filtered list from the photos, search text, favourites and active filter. It recalculates when one of those dependencies changes instead of on every unrelated render. The app would still be functionally possible without these hooks, but it would lose the requested memoization and stable callbacks.”

Show the hook declarations and the dependency array. Do not claim these hooks guarantee a dramatic speed increase for a gallery of only 30 items.

## 3:50–4:30 — Explain responsive styling
“The grid uses Tailwind responsive breakpoints: one column by default on mobile, two columns at the small breakpoint, and four columns at the extra-large breakpoint. Tailwind utilities also style the search field, cards, buttons, loading state, error state and empty state. No component library is used.”

Point to the grid classes in `src/App.jsx` and the card component in `src/components/PhotoCard.jsx`.

## 4:30–5:00 — Hardest part and wrap-up
“One part that needed careful handling was keeping favourites saved after refresh while following the requirement to use `useReducer`. I handled this by reading the saved IDs for the reducer’s initial state and writing changes to localStorage in an effect. I also included loading, error and empty states so the UI has a clear response when data is unavailable or a search has no matches. Thank you for reviewing my assignment.”

Only describe the hardest part as your own experience if it matches what you actually found difficult. Keep the final video close to five minutes.

## Recording and submission checklist
- **Windows:** press `Win + G` to open Xbox Game Bar, or use OBS Studio.
- Record your browser demo and code explanation; ensure text is readable and microphone audio is clear.
- Upload to Google Drive or YouTube as **Unlisted** and verify the link can be opened by the reviewer.
- Submit the public GitHub URL, recording URL, and one sentence about the hardest part through the Google Form supplied by Celebrare.
