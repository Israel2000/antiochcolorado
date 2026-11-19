# Antioch Church of Colorado — App (Ionic + Capacitor + Angular 19)

Church app for **Antioch Church of Colorado** (14100 East Jewell Ave,
Aurora, CO 80012 — (720) 434-1126 / (720) 207-7720), focused on
**(1) church info** and **(2) giving**.
One codebase, native iOS + Android apps via Capacitor.

Live web preview: https://antiochcolorado-eight.vercel.app/tabs/home
(Vercel auto-deploys from GitHub `main` — push to `main` and the
preview updates.)

- **Frontend:** Angular 19 (standalone components), TypeScript, Ionic 8
- **Native wrapper:** Capacitor 7 — `com.webinnovativetech.churchapp`
- **Backend (to add):** Node.js / Express REST API + PostgreSQL
  (same stack Israel uses for client work). The app currently runs on
  local sample data so it builds and demos without a backend.

> Built without the Ionic CLI (it fails here with `EPERM chown` on
> `~/.ionic/config.json`). Everything is scaffolded manually with the
> Angular CLI — see `package.json` / `angular.json`.

## Tabs

| Tab | What it does |
| --- | --- |
| **Home** | Church logo, tagline, Amharic vision, office hours, address, phones, Get Directions, quick actions (all navigate) |
| **Sermons** | Sample sermons — title, speaker, date, duration, scripture, play button (opens `mediaUrl` when set) |
| **Events** | Sample events — date, time, location, category, RSVP toggle (local state only for now) |
| **Give** | Fund selector (Tithe / Offering / Missions / Building Fund), $10/$25/$50/$100 chips + custom amount, one-time/monthly toggle, donor name/email, confirmation state |
| **More** | About / Beliefs, Ministries, Staff, Contact, Prayer Request form (local success state) |

## Run it (web preview)

```bash
cd ~/workspace/church-app
npm install
npm start          # http://localhost:4200 — tabs work in the browser
npm run build      # production build -> dist/church-app/browser
```

## Build native apps

```bash
npm run build

# First time only — adds the native projects (installs @capacitor/ios / android)
npx cap add ios
npx cap add android

# After any web change
npx cap sync

# Open in Xcode / Android Studio
npx cap open ios
npx cap open android
```

Requirements: macOS + Xcode for iOS, Android Studio + JDK 17 for Android.
`ios/` and `android/` are git-ignored — regenerate them with `npx cap add`.

## What to replace before launch

1. **Church content** — `src/app/data/church-data.ts`
   Church name, address, phone, email, service times, beliefs, sermons
   (`mediaUrl` = YouTube URL or audio MP3), events, ministries, staff.
   Later, move this behind an API so the pastor can edit it.
2. **Theme** — `src/theme/variables.scss`
   Primary / secondary colours, fonts, light + dark mode.
3. **App identity** — `capacitor.config.ts`
   `appId` is `com.webinnovativetech.churchapp`, `appName` is `Church App`.
   Change these *before* the first store submission, and replace the
   placeholder icon/splash in `src/assets/icon/`.
4. **Giving (real payments)** — `src/app/services/giving.service.ts`
   Currently **simulated only — no payment is taken**.
   To go live, pick one (see the comments in that file):
   - **Stripe Checkout (recommended):** app POSTs to your backend →
     backend creates a Checkout Session with the Stripe **secret** key →
     app opens the session URL. Never put the secret key in the app.
   - **Tithe.ly / Pushpay:** open their hosted giving page / SDK with
     the church's account, pre-filled with fund + amount.
   - **Stripe Payment Links:** one link per fund, opened in the browser.
5. **RSVP + Prayer Requests** — currently local state only.
   Wire `EventsPage.toggleRsvp()` and `MorePage.submitPrayer()` to the
   backend / church email.

## Giving — Apple / Google store rules

- Donations to a registered 501(c)(3) nonprofit are **exempt from the
  30% in-app-purchase fee**. Do **not** use Apple/Google IAP for giving.
- Use an approved processor (Stripe, Tithe.ly, Pushpay, Planning Center).
- Money must go directly to the church; the app must not take a cut.
- The **church** must own the Stripe / Tithe.ly account (EIN + bank
  account). You build the app; they own the money account.
- Add a privacy-policy URL to the store listing (required).

## Store publishing checklist

### Apple App Store
- [ ] Apple Developer Program — **$99/year**, enrolled as an **Organization**
      (not an individual — the church's legal entity)
- [ ] **D-U-N-S number** for the church (Apple requires it for org accounts —
      request it early, it can take days)
- [ ] App icon (1024×1024), splash screen, iPhone screenshots
- [ ] Privacy policy URL, app description, support URL
- [ ] TestFlight build → internal test → submit for review (usually 1–3 days)

### Google Play
- [ ] Google Play Console — **$25 one-time**
- [ ] App icon (512×512), feature graphic, phone screenshots
- [ ] Privacy policy URL, content rating questionnaire, data-safety form
- [ ] Internal testing track → production (usually a few hours–1 day)

## Project layout

```
capacitor.config.ts          # appId, appName, webDir
src/
  main.ts / app/             # bootstrap, routes, tabs shell
  app/data/church-data.ts    # <-- ALL sample church content lives here
  app/services/giving.service.ts  # giving (simulated — see TODOs)
  app/pages/home|sermons|events|give|more/
  app/tabs/tabs.page.ts      # bottom tab bar
  theme/variables.scss       # warm church theme
```

## Status

Starter / MVP scaffold. Info tabs + giving flow (demo mode) are working
in the browser. Not yet connected to a backend, Stripe, or the app stores.
