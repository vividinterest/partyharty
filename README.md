# PartyHarty

A responsive party music-request prototype built with Next.js,
TypeScript, and Tailwind CSS.

## Try the prototype

- Join with a nickname.
- Add songs manually by title and artist.
- Like and unlike songs.
- Use the interface on phones and larger screens.

## Current limitations

This version runs locally in each visitor’s browser.
Requests and likes reset on refresh and are not shared between guests.

Spotify playback, shared party rooms, QR joining, fair queue rotation,
and crowd boosts are planned features, not implemented yet.

## Run locally

Install Node.js 22, then run:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Design

Pastel colors :)

## Project status

This is the first version of PartyHarty—a prototype for testing the
design, song requests, and likes.

Spotify integration is planned for a future version, allowing the
host to connect their account and send requested songs to their
Spotify playback queue. Shared party rooms, fair turns, and
crowd-voted song boosts are also planned.

Spotify is not connected in this version.
