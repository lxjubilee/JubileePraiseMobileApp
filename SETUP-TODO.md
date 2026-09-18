# JubileePraise — setup TODOs

This project was created by cloning **JubilujahMobileApp** (`D:\Projects Data\JubilujahMobileApp`,
`main` @ `77a9bf4`, v2.0.14) and rebranding it — with the CDN and API hosts kept on Jubilujah.

The split is deliberate: **app identity is JubileePraise** (name, slug, scheme, bundle id,
local storage keys) while **the CDN and API stay Jubilujah's**, so the app runs against a real
backend today. Website-facing values — the share/deep-link domain and the legal contact
addresses — were renamed to jubileepraise.com and have no site behind them yet.

Confirm each item below before the first real build.

## 1. Backend endpoints — `app.json` → `expo.extra`

**JubileePraise deliberately runs against Jubilujah's live CDN and API.** These are not
placeholders — do not "fix" them to jubileepraise.com hosts without a backend to point at.

| Key | Value | Notes |
|---|---|---|
| `cdnBaseUrl` | `https://cd.jubilujah.com` | Jubilujah CDN — all media (audio, artwork) |
| `authBaseUrl` | `https://api.jubilujah.com` | Jubilujah unified `jubilujah-api` — every `/api/auth/*` call |
| `mobileConfigBaseUrl` | `https://api.jubilujah.com` | Same host; dynamic mobile CMS config |
| `apiBaseUrl` | *(not set)* | Only read when `dataSource: "api"`; falls back to `https://api.jubileeverse.com/v1` in `env.ts` |
| `useMock` / `dataSource` | `false` / `manifest` | Reads the live catalog manifest. Set `dataSource: "mock"` to run offline against bundled JSON |

The same values are duplicated as fallback defaults in [src/constants/env.ts](src/constants/env.ts)
(used only when `extra` is missing a key) — keep both in step.

Because the backend is Jubilujah's, JubileePraise sees Jubilujah's catalog, accounts and
entitlements. Point these at a JubileePraise backend when one exists.

## 2. Cloudflare Turnstile (sign-in CAPTCHA)

| Key | Value | Notes |
|---|---|---|
| `turnstileSiteKey` | `0x4AAAAAADJah9FpwSaEzlLP` | Jubilujah's key — **correct**, since auth runs against Jubilujah's API. Set to `""` to disable the CAPTCHA |
| `turnstileBaseUrl` | `https://jubileeinspire.com` | Origin the widget runs under, allow-listed for that key |

## 3. EAS / Expo account

- `expo.extra.eas.projectId` is `edcfbf6f-…` — **done**. The inherited id pointed at
  Jubilujah's EAS project (`7354f6a2-…`), so a build would have shipped into the wrong app;
  it was dropped and `eas init` has since linked a fresh Jubilee Praise project.
- `expo.owner` is still `gabeungureanu`. Change it if JubileePraise lives under a different
  Expo account/organisation.

## 4. App identity

- `name` `JubileePraise` · `slug`/`scheme` `jubileepraise` · version reset **2.0.14 → 1.0.0**.
- Bundle id / package: `com.jubileepraise.app` (iOS + Android) — **derived**, confirm before
  the first store submission; it cannot be changed after publishing.

## 5. Deep links

`app.json` claims `jubileepraise.com` / `www.jubileepraise.com` for `/album` links. For these
to verify, the web team must host, per [docs/deep-linking/](docs/deep-linking/):

- `https://jubileepraise.com/.well-known/apple-app-site-association` — needs the real Apple
  **Team ID** (currently the literal `TEAMID.com.jubileepraise.app`)
- `https://jubileepraise.com/.well-known/assetlinks.json` — needs the release keystore's
  **SHA-256 fingerprint**

**Live mismatch to be aware of:** share links are built for `jubileepraise.com`
([src/services/share/shareLinks.ts](src/services/share/shareLinks.ts), `WEB_HOST`;
also `WEB_ORIGIN` in [src/services/playlists/mappers.ts](src/services/playlists/mappers.ts)
and the prefixes in [src/navigation/linking.ts](src/navigation/linking.ts)), but the content
they point at lives in Jubilujah's catalog. Until jubileepraise.com is serving album pages,
a shared link resolves to nothing outside the app. Either stand that site up, or switch
those three constants to `jubilujah.com` to match the backend.

## 6. Assets — all placeholders

`assets/` holds **Jubilujah artwork**, renamed but not redrawn:

- `JubileePraise-App-Icon.png`, `JubileePraise-app-logo.png` (was `Jubilujah-*`)
- `assets/hero-banner/`, `assets/Jubilee-Persona/` — shared "Jubilee" platform art, names kept
- `icon.png`, `splash-icon.png`, `favicon.png`, `android-icon-*.png`

Replace with JubileePraise brand art before any release build.

## 7. Secrets — `.env` was NOT copied

Copy [.env.example](.env.example) to `.env` and fill in. `.env` is gitignored.

- `JI_SERVICE_CLIENT_SECRET` — JubileeInspire service-to-service secret (password sync)
- `AUTH_MOBILE_CLIENT_KEY` — mobile client key to skip Turnstile on prod login

Note: [app.config.js](app.config.js) currently passes `app.json` straight through and injects
nothing, so these are documentation-only until wired up.

## 8. Copy / legal text

- [src/screens/Legal/content.ts](src/screens/Legal/content.ts) now says `privacy@jubileepraise.com`
  and `legal@jubileepraise.com` — confirm these mailboxes exist.
- **39 locale files** in [src/localization/locales/](src/localization/locales/) had the brand
  name substituted. Inflected languages need a native-speaker pass: Finnish
  (`JubileePraiseissa`, `JubileePraiseiin`) and Hungarian (`JubileePraise-hoz`, `JubileePraise-on`)
  now read awkwardly. `npm run check-locales` / [scripts/check-locales.mjs](scripts/check-locales.mjs) checks key parity, not grammar.

## 9. Not copied from the reference

Deliberately excluded: `node_modules/`, `.git/`, `.expo/`, `.env`,
`android.bak-broken-manifest/` (a broken native backup), `gradle.decoded.txt` (a debug dump).
Everything else — `src/`, `assets/`, `docs/`, `API docs/`, `patches/`, `scripts/`, `.claude/`,
`App.tsx`, `index.ts`, `eas.json`, `tsconfig.json` — came across.

`patches/react-native-track-player+4.1.2.patch` is required for the Android build and is applied
automatically by the `postinstall` → `patch-package` script.

## 10. `.gitignore`

The repo's original Visual Studio `.gitignore` was **kept**, with a React Native / Expo section
**appended** (`.expo/`, `/ios`, `/android`, `dist/`, key/cert files). Without it, `expo prebuild`
output would have been committed.
