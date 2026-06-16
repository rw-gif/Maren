# CLAUDE.md — Build brief: Maren supporting pages & legal content

Use this file together with `Maren-Website-Pages-and-Legal-Pack.md` (the content source) and
`site-config.json` (the single source of truth for all variable details).

## What to build

Turn each section of the legal pack into its own page on the Maren site:

| Pack section | Page file | Future Shopify home |
|---|---|---|
| Cookie Policy | `/legal/cookie-policy` | Page (banner = Settings → Customer privacy + app) |
| Privacy Policy | `/legal/privacy-policy` | Settings → Policies |
| Terms of Service + Terms of Sale | `/legal/terms` | Settings → Policies |
| Shipping & Delivery | `/help/shipping` | Settings → Policies |
| Returns & Exchanges | `/help/returns` | Settings → Policies |
| FAQ | `/help/faq` | Page |
| Help / Contact | `/help/contact` | Page |
| Newsletter sign-up | component, in footer | Theme / email app |
| Account sign-up / login | `/account` | Native Shopify customer accounts |
| Search | site-wide component | Native theme search |
| Duties & Taxes | `/help/duties-and-taxes` | Page |
| Size Guide + Care | `/help/size-guide` | Page |
| Affiliates + AI disclosure | `/affiliates` + footer/About line | Page |
| Accessibility | `/legal/accessibility` | Page |

## Hard rules

1. **Read every variable from `site-config.json`.** Never hard-code business details
   (company number, addresses, emails, thresholds, dates) into a page. If a value is
   empty in the config, render the visible token `[KEY]` so it is obvious and greppable.
   This is what lets us fill placeholders in one place later.
2. **Keep content separate from presentation.** Page copy as clean semantic HTML/markdown
   blocks; styling via the existing Maren brand tokens. This is what makes the Shopify
   migration a paste, not a rebuild.
3. **Do not deploy to production / do not remove the site password until `PRELAUNCH.md`
   is fully ticked.** Building and previewing in dev is fine. Going live with placeholders
   or un-reviewed legal text is not.
4. **Prices must show the total inclusive of VAT and mandatory charges** wherever a price
   appears (DMCC drip-pricing rule). Never reveal mandatory fees only at checkout.
5. **The cookie banner must block non-essential/advertising scripts until consent**, with
   Accept all / Reject all / Manage preferences of equal prominence and a footer
   "Cookie settings" re-open link. Wire analytics/pixels to fire only after consent.
6. **Newsletter consent is an unticked positive action**, with a working unsubscribe and
   business identity in every email.
7. **Prose style:** follow the project's stop-slop guidance — active voice, no em dashes,
   no filler. Legal copy stays plain and readable.

## Version control

Commit the legal pages as their own set so the solicitor's later edits are tracked.
Tag the commit that passes `PRELAUNCH.md` as the launch-ready baseline.

## Shopify migration note (for go-live)

- The four policies (Privacy, Terms, Shipping, Returns) move to Settings → Policies, which
  auto-link at checkout. The rest become Pages. Because all copy is config-driven and
  presentation-free, this is a straight paste.
- Replace the custom cookie banner with Shopify's Customer Privacy API + a vetted consent
  app; keep the same category logic from the pack.
- Use Shopify's native customer accounts and PCI-compliant checkout — do not port any
  custom password or card handling.
