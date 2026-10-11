"use client";

import { useState } from "react";

type Song = {
  id: string;
  title: string;
  artist: string;
  requestedBy: string;
};

export default function Home() {
  const [nickname, setNickname] = useState("");
  const [guest, setGuest] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [likes, setLikes] = useState<string[]>([]);

  function toggleLike(id: string) {
    setLikes((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  const inputStyle =
    "mt-2 w-full rounded-2xl border border-[#875042]/30 bg-white/80 p-4 outline-none focus:border-[#875042]";

  const buttonStyle =
    "w-full rounded-full bg-[#875042] px-6 py-4 font-semibold text-white transition hover:bg-[#361915] disabled:opacity-40";

  return (
    <main className="min-h-screen bg-[#F8F6EE] px-5 py-8 text-[#361915] sm:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="#ECBAAD"
            stroke="#361915"
            strokeWidth="0.7"
            className="mx-auto mb-4 h-24 w-24 motion-safe:animate-pulse"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>

          <p className="mb-3 text-sm tracking-wide">
            FRIENDS. MUSIC. YOUR TURN.
          </p>
          <h1 className="break-words font-serif text-5xl font-bold sm:text-7xl">
            PartyHarty
          </h1>
          <p className="mt-4 text-lg">
            Your favourite people. A shared soundtrack.
          </p>
        </header>

        {!guest ? (
          <section className="mx-auto max-w-lg rounded-3xl bg-[#D4DFD7] p-6 sm:p-8">
            <h2 className="font-serif text-3xl">Come join the party.</h2>
            <p className="mt-3">
              Pick a name, request a song, and heart your favourites.
            </p>

            <form
              className="mt-6"
              onSubmit={(event) => {
                event.preventDefault();
                if (nickname.trim()) setGuest(nickname.trim());
              }}
            >
              <label htmlFor="nickname">What should we call you?</label>
              <input
                id="nickname"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                placeholder="Your nickname"
                maxLength={24}
                required
                className={inputStyle}
              />
              <button
                type="submit"
                disabled={!nickname.trim()}
                className={`${buttonStyle} mt-5`}
              >
                Join the party
              </button>
            </form>
          </section>
        ) : (
          <>
            <div
              role="status"
              className="mb-6 rounded-2xl bg-[#E3CC93] p-4"
            >
              Welcome, <strong>{guest}</strong>. Let’s find your next song.
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.4fr]">
              <section className="rounded-3xl bg-[#BDB2C0] p-6 sm:p-8">
                <h2 className="font-serif text-3xl">Make a request</h2>
                <p className="mt-2">Add a song you would love to hear.</p>

                <form
                  className="mt-6"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!title.trim() || !artist.trim()) return;

                    setSongs((current) => [
                      ...current,
                      {
                        id: crypto.randomUUID(),
                        title: title.trim(),
                        artist: artist.trim(),
                        requestedBy: guest,
                      },
                    ]);
                    setTitle("");
                    setArtist("");
                  }}
                >
                  <label htmlFor="title">Song title</label>
                  <input
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Your current favourite"
                    maxLength={100}
                    required
                    className={inputStyle}
                  />

                  <label htmlFor="artist" className="mt-5 block">
                    Artist
                  </label>
                  <input
                    id="artist"
                    value={artist}
                    onChange={(event) => setArtist(event.target.value)}
                    placeholder="Who sings it?"
                    maxLength={100}
                    required
                    className={inputStyle}
                  />

                  <button
                    type="submit"
                    disabled={!title.trim() || !artist.trim()}
                    className={`${buttonStyle} mt-6`}
                  >
                    Add to queue
                  </button>
                </form>
              </section>

              <section className="rounded-3xl bg-[#D4DFD7] p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-serif text-3xl">The queue</h2>
                  <span className="text-sm">{songs.length} songs</span>
                </div>

                {songs.length === 0 ? (
                  <p className="mt-6 rounded-2xl border border-dashed border-[#875042]/40 p-8 text-center">
                    A little quiet in here. Add the first song!
                  </p>
                ) : (
                  <ul className="mt-6 space-y-3">
                    {songs.map((song, index) => {
                      const liked = likes.includes(song.id);

                      return (
                        <li
                          key={song.id}
                          className="flex items-center gap-3 rounded-2xl bg-[#A3AA80] p-4"
                        >
                          <span className="text-sm">{index + 1}</span>

                          <div className="min-w-0 flex-1">
                            <h3 className="break-words font-semibold">
                              {song.title}
                            </h3>
                            <p className="break-words text-sm">
                              {song.artist}
                            </p>
                            <p className="mt-1 break-words text-xs">
                              Requested by {song.requestedBy}
                            </p>
                          </div>

                          <button
                            type="button"
                            aria-label={`Like ${song.title}`}
                            aria-pressed={liked}
                            onClick={() => toggleLike(song.id)}
                            className="flex min-h-12 min-w-16 shrink-0 items-center justify-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-[#361915]"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              fill="currentColor"
                              className={`h-7 w-7 transition-colors ${
                                liked ? "text-[#ECBAAD]" : "text-white"
                              }`}
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
                            </svg>
                            <span className="tabular-nums">
                              {liked ? 1 : 0}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            </div>
          </>
        )}

        <footer className="mx-auto mt-10 max-w-xl text-center text-sm">
          <p className="font-semibold">First-version demo</p>
          <p className="mt-2">
            Requests and likes stay on this page until you refresh.
            Spotify, shared parties, and fair rotation are not connected yet.
          </p>
        </footer>
      </div>
    </main>
  );
}