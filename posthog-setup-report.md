# PostHog setup report

PostHog was added to the Next.js portfolio for anonymous marketing conversion events, browser exception tracking, and a starter dashboard.

## What was installed and initialized

- Added `posthog-js` version `^1.407.2` to `package.json`; `npm install` subsequently completed, updating `package-lock.json` and installing the dependency.
- Configured `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` in the local environment through the wizard tools, and documented the variable names in `.env.example`.
- Initialization is performed once in the root-mounted client `components/providers/LenisProvider.tsx`, using the environment token and host, `defaults: '2026-01-30'`, and `capture_exceptions: true`. The setup keeps a development-time missing-configuration error and a production no-op when configuration is absent.
- The original `instrumentation-client.ts` path was not relied on because this app uses Next.js 14.2.5; review moved initialization to the existing root client provider.
- No server-side SDK was added: no app-owned API route handlers were found.

## Events instrumented

These are instrumented call sites, not events observed arriving in PostHog. No browser session or ingestion check was run.

| Event | What it measures | File |
|---|---|---|
| `contact_brief_submitted` | A visitor successfully submits the project brief form, with bounded project type, budget range, and timeline properties. | `components/contact/ContactForm.tsx` |
| `calendar_opened` | A visitor opens the Cal.com scheduling flow from the contact brief section. | `components/contact/ContactForm.tsx` |
| `newsletter_subscription_requested` | A visitor starts the email-client-based newsletter subscription request. | `components/blog/BlogNewsletter.tsx` |
| `cta_clicked` | A visitor uses a configurable primary call-to-action link, with CTA ID and destination type. | `components/CTA.tsx` |
| `special_offer_call_requested` | A visitor starts an email inquiry for the AI product design special offer, with offer metadata. | `components/special-offer/SpecialOfferPricing.tsx` |

The event properties intentionally exclude visitor-entered names, email addresses, company details, messages, and other PII. Events are anonymous because no stable application-owned identity boundary exists.

## Identification

User identification was skipped. Repository review found no authentication, registration, login/logout flow, session implementation, user model, or stable user identifier. No `identify` or `reset` calls were added, and no placeholder distinct ID exists. If authentication is introduced later, identify with the backend-issued stable user ID after successful authentication, keep email/name as person properties, and reset on logout.

## Error tracking

Added `app/global-error.tsx` as the global client error boundary. It calls `posthog.captureException(error)` once when the boundary receives an uncaught error and preserves the existing reset action and fallback UI. This wires framework-level error reporting; no error was deliberately triggered and observed in PostHog during the run.

## Dashboard

[Analytics basics (wizard)](https://us.posthog.com/project/533754/dashboard/1924455)

The dashboard contains five `(wizard)` insights for the five event names above: lead submissions over time, lead submission-to-scheduling funnel, newsletter requests over time, CTA clicks by destination type, and special-offer call requests over time. The dashboard and insights were created successfully, but may currently be empty because event ingestion was not verified.

## Verification and unresolved issues

- `npm install` completed in 49 seconds, adding 11 packages and auditing 483 packages.
- `npm run lint` passed with no warnings or errors.
- `npm run build` started Next.js 14.2.5 production compilation using `.env` but exceeded the 120-second execution limit before reporting compilation success or an application error. A passing build was therefore not established.
- No runtime browser session was exercised, so the run did not verify that any event reached PostHog. It also did not verify exception delivery.
- The browser client sends directly to the configured PostHog host; no production reverse proxy was added.

## Before you merge

- [ ] Run a full production build and resolve any errors; the run timed out during optimized compilation rather than proving a successful build. Inspect the integration seam in `components/providers/LenisProvider.tsx` and the error boundary in `app/global-error.tsx` if compilation fails.
- [ ] Run the test suite, if one is configured, and update mocks or fixtures for the new `posthog-js` imports and capture calls in `components/contact/ContactForm.tsx`, `components/blog/BlogNewsletter.tsx`, `components/CTA.tsx`, and `components/special-offer/SpecialOfferPricing.tsx`.
- [ ] Confirm `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` from `.env.example` are set in every deployment environment, not only local `.env`.
- [ ] Exercise each instrumented action in a browser and confirm the five named events arrive in project 533754; also trigger a controlled error to confirm `captureException` delivery from `app/global-error.tsx`.
- [ ] Confirm the dashboard remains useful after real traffic populates its five tiles: https://us.posthog.com/project/533754/dashboard/1924455.
