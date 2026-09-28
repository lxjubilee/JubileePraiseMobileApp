# Apple Release Compliance Report — Jubilee Praise (iOS)

Checked against [Apple_App_Store_Master_Compliance_Checklist-1.md](../../Apple_App_Store_Master_Compliance_Checklist-1.md) (687 items; baseline: App Review Guidelines of 8 June 2026).
Audit date: 24 September 2026. App version 1.0.1, iOS build 2, bundle `com.jubileepraise.app`.

This audit was done from the source code and configuration only. Anything that lives in App Store Connect, or that needs a device, is marked **Not verified** and must be checked by hand.

```text
Status: BLOCKED
```

## Summary

| Result | Items (approx.) |
|---|---|
| Pass (confirmed in code) | ~110 |
| Fail | ~12 |
| Not verified (App Store Connect / devices / process) | ~235 |
| N/A (feature not used) | ~330 |

The counts come from sorting the checklist section by section. They are estimates, not a line-by-line sign-off.

## Blocking issues

1. **4.3(a)/(b) Spam and 4.1(a) copycat.** The previous build was rejected under 4.3(a) (Design, and Design – Spam).
   - About 98.5% of the code lines are the same as in the JubiLujah app (brand names ignored). 274 of Jubilee Praise's 277 source files also exist in JubiLujah.
   - The dependencies and the `app.json` layout are identical.
   - 33 image assets, including all persona portraits and all hero-banner slides, are the same files other apps use.
   - The music catalogue loads from JubiLujah's CDN (`cd.jubilujah.com`).
   - JubiLujah was removed from the App Store on 24 September 2026. That helps, but Apple's record of it remains.
   - Fix: a business decision is needed. Either merge the brands into one app, or make Jubilee Praise genuinely distinct in concept, content, screens and assets.
2. ~~**4.3(a) Design: duplicate app icon.**~~ **Resolved 25 September 2026.** A new icon (`assets/JubileePraise-App-Icon-1024.png`, made from `assets/JubileePraise-App-Icon.png`) replaced it. It does not match any image in the JubiLujah, KJubilee, Torah Sings, Jubilee Verse or Jubilee Inspire assets. Still to do: confirm the rights to the photo, and replace it with a 1024px original when available (the current one is enlarged from 200px).
3. ~~**1.2 User-generated content has no Report or Block.**~~ **Resolved 25 September 2026.** Written reviews are switched off (`CONFIG.WRITTEN_REVIEWS = false` in `src/constants/config.ts`). The app no longer lets users write reviews or shows reviews by other users; only star ratings, as an anonymous average, remain. Turn written reviews back on only after Report, Block and a moderation process exist.
4. **2.4.1 / Release gate: iPad not tested.** `supportsTablet` is `false`, so iPads run the app in iPhone-compatibility mode. Apple has reviewed our other apps on an iPad Air. Fix: test on an iPad before submitting.

## Findings by area

| Area | Guideline | Evidence | Result |
|---|---|---|---|
| Payments | 3.1.1, 3.1.3(a) | No StoreKit and no payment SDKs. Paid plans live on the server (`/api/subscriptions/me`). The daily-limit popup has no purchase link or call to action. | Pass, but explain in Review Notes |
| Account deletion | 5.1.1(v) | Profile → Delete Account calls `authEndpoints.deleteAccount()` | Pass |
| Sign-in optional | 5.1.1(v) | Browsing and playback work without an account | Pass |
| Privacy Policy in app | 5.1.1(i) | Profile → Privacy Policy; also linked from sign-up | Pass |
| Privacy Policy content | 5.1.1(i) | Covers collection, third parties (Cloudflare, SendGrid), retention, deletion and children. The date-of-birth purpose and the in-app deletion path were added in this change. | Pass |
| Policy accuracy | 5.1.1(i), 2.3 | Rewritten 25 September 2026 in `src/screens/Legal/content.ts`: the CSRF claim is gone, the policy now covers both the website and the app, and it describes listening analytics, on-device storage, Turnstile and the JubileeInspire account link. The website `/privacy` page must be updated to the same text. | Pass (in app); **update website** |
| Data minimisation | 5.1.1(iii) | Date of birth is collected only for the 13+ age check (`MIN_AGE = 13`) | Pass |
| Permissions | 5.1.1(ii) | No camera, microphone, location, contacts, photos or tracking | Pass |
| Background modes | 2.5.4 | `UIBackgroundModes: audio`, used for music playback (react-native-track-player) | Pass |
| Tracking / ATT | 5.1.2(i) | No ad or tracking SDKs; analytics go to our own API only | Pass (ATT not needed) |
| Ads | 2.5.18 | None | N/A |
| Remote code | 2.5.2 | `/api/mobile/config` delivers content curation only, not code | Pass |
| WebView | 2.5.6 | Used only for the Cloudflare Turnstile CAPTCHA | Pass |
| CAPTCHA and reviewer access | 2.1, Release gate | Turnstile fails open after 8 seconds and sign-in is optional | Pass. Still supply a demo account |
| Secrets | 1.6 | No secrets bundled. The Turnstile site key is public by design. | Pass |
| Staging / debug | 6, 8 | No staging URLs; `useMock: false` | Pass |
| Export compliance | Release gate | `ios.config.usesNonExemptEncryption: false` was added in this change (the app uses HTTPS only) | Pass |
| Login services | 4.8 | The app uses only its own account system | Exception applies |
| Kids | 1.3, 5.1.4 | Not in the Kids category; users must be 13 or older | N/A |
| Backend dependency | 2.1(a) | `cd.jubilujah.com` must stay online during review | **Verify** |

## Not verified here (check by hand before submitting)

- **Metadata** (2.3): name, subtitle, keywords, description, screenshots, previews and What's New must match the build.
- **App Store Connect settings**: age rating questionnaire (2.3.6), App Privacy labels (5.1.1), category (2.3.5), support URL (1.5).
- **Testing**: a clean install and the main user journeys on an iPhone and an iPad; an IPv6-only network (2.5.5); offline and slow networks.
- **Review Notes**: a working demo account. A draft is in [REVIEW_NOTES.md](REVIEW_NOTES.md).
- **Distribution**: legal and licensing rights to the music and images in every territory where the app is sold (5.2).

## Recommended fixes, in order

1. Decide between merging the apps and making Jubilee Praise genuinely distinct (blocker 1).
2. Commission an original app icon (blocker 2).
3. Build user-generated-content Report and Block, with server endpoints and a moderation process (blocker 3).
4. Test on an iPad (blocker 4).
5. Have the policy wording reviewed (the CSRF claim, and the website-specific passages).
6. Complete the items under "Not verified", then re-run this report.

No known blocking issue may remain at submission. This report does not predict Apple's decision.
