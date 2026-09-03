# JubileePraise — setup TODOs

This project was created by cloning **JubilujahMobileApp** (`D:\Projects Data\JubilujahMobileApp`,
`main` @ `77a9bf4`, v2.0.14) and rebranding it. Every `Jubilujah`/`JubiLujah`/`jubilujah` token
became `JubileePraise`/`jubileepraise`.

The values below were **derived from the name as placeholders** or **inherited from Jubilujah**.
They compile and typecheck, but they are not verified against any real JubileePraise
infrastructure. Confirm each one before the first real build.

## 1. Backend endpoints — `app.json` → `expo.extra`

| Key | Current value | Status |
|---|---|---|
| `cdnBaseUrl` | `https://cd.jubileepraise.com` | **Placeholder** — derived from name; domain may not exist |
| `authBaseUrl` | `https://api.jubileepraise.com` | **Placeholder** — derived from name; domain may not exist |
| `mobileConfigBaseUrl` | `https://api.jubileepraise.com` | **Placeholder** — derived from name |
| `apiBaseUrl` | `https://api.jubileeverse.com/v1` | **Inherited unchanged** — this is the shared *Jubileeverse* platform API, not a Jubilujah-specific host. Confirm JubileePraise reads the same catalog API |
| `useMock` / `dataSource` | `false` / `manifest` | Inherited. Set `dataSource: "mock"` to run fully offline against bundled JSON until the real backend exists |

Same fallback defaults are duplicated in [src/constants/env.ts](src/constants/env.ts) — update both.

## 2. Cloudflare Turnstile (sign-in CAPTCHA)

| Key | Current value | Status |
|---|---|---|
| `turnstileSiteKey` | `0x4AAAAAADJah9FpwSaEzlLP` | **Inherited from Jubilujah** — a Turnstile key is bound to allow-listed origins, so this will fail for JubileePraise. Issue a new key, or set to `""` to disable the CAPTCHA |
| `turnstileBaseUrl` | `https://jubileeinspire.com` | **Inherited** — sibling brand, deliberately not renamed. Confirm |

## 3. EAS / Expo account

- `expo.extra.eas.projectId` was **removed** — it pointed at Jubilujah's EAS project
  (`7354f6a2-…`), so a build would have shipped into the wrong app. Run `eas init` to create
  a fresh JubileePraise project.
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
