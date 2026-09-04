# Firebase Setup

This site's dynamic content (projects, blog posts) is stored in Firestore.
Only you can write to it, via Firebase Auth — no separate backend to host.

## 1. Create a Firebase project

1. Go to https://console.firebase.google.com → **Add project**.
2. Name it (e.g. `ashiq-portfolio`), skip Google Analytics if you don't need it.

## 2. Enable Firestore

1. In the console, go to **Build → Firestore Database → Create database**.
2. Start in **production mode** (the security rules below handle access control).
3. Pick the region closest to your users.

## 3. Enable Google sign-in

1. **Build → Authentication → Get started** (or Security → Authentication in the newer layout).
2. On the **Sign-in method** tab, click **Add new provider → Google**, toggle Enable.
3. It'll ask for a support email — pick your dev Gmail from the dropdown. Save.
4. You don't need to add a "user" manually — the first time you sign in with
   Google on `/admin/login`, Firebase creates that user automatically.

## 4. Deploy the security rules

Open `firestore.rules` in this repo, replace `YOUR_ADMIN_EMAIL` with the email
you used in step 3, then paste the whole file into:

**Firestore Database → Rules tab → Publish**

This is what actually enforces "only I can edit" — it's not just a hidden
`/admin` route, writes are rejected server-side for anyone else.

## 5. Register a web app and get your config

1. **Project settings (gear icon) → General → Your apps → Web (`</>`)**.
2. Register it (nickname doesn't matter, skip Hosting setup).
3. Copy the config object shown — you'll need each value for `.env`.

## 6. Configure the frontend

```bash
cp .env.example .env
```

Fill in the six `VITE_FIREBASE_*` values from step 5.

## 7. Run it

```bash
npm install
npm run dev
```

Go to `/admin/login`, sign in with the account from step 3, and add your
first project or post.

## One-time Firestore index

The blog list query (published posts, newest first) needs a composite index.
The first time you load `/blog` after adding a published post, if you see a
Firestore error in the console, it will include a direct link to create the
index automatically — click it, wait ~a minute, reload. You only need to do
this once.

## Notes

- There's no `users` collection or role system — "admin" is just "the one
  email address hardcoded into `firestore.rules`". Fine for a personal site;
  revisit if you ever need multiple editors.
- The old Spring Boot backend (`vultra-backend.zip` from earlier) is no
  longer used by this site, but it's still a legitimate standalone project
  if you want to showcase it separately.
