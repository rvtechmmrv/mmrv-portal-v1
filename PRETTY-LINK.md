# Portal pretty link (Shape B) — locked 2026-10-26

Pattern: `https://portal.mmrvsolar.com/?m=<member-code>`  (also works as `#m=<code>`)
Example: https://portal.mmrvsolar.com/?m=paula-scott

- Code = lowercase letters/digits/dashes; it is the membership id.
- Lookup: `members.json` (and the MEMBERS_FALLBACK copy inside index.html — keep both in sync).
- Record fields: name, tier (basic|premium|var|""), hours (banked toward free $75 service call), PAY_LINK, INVOICE_LINK, ESTIMATE_LINK, RECEIPT_LINK (QuoteIQ guest URLs; "" = not ready).
- v2 fields (2026-10-26): `trailer` and `work_log`. Keep this file, `members.json`, and `MEMBERS_FALLBACK` in `index.html` in sync.

## Trailer

`trailer`: year, make, model, length_ft, type (`TT` | `5th` | `MH` | `""`), data_plate_photos (array, usually empty until a file is on Drive), warranty_provider, warranty_expiry, systems.ac / systems.wh / systems.solar, parked, seed_note (ops only — the page does not show it).

The guest can edit the rig on the page. **Save on this phone** writes `localStorage` key `mmrv-portal-trailer:<code>`. **Email rig details to the shop** opens a mail to `mmrv+june@mail.grokbot.com`. That mail is the Elmer same-day QuoteIQ queue. The page does not write QuoteIQ.

### Data plate photos (static Pages)

GitHub Pages cannot accept an upload, and this repo has no Drive API secret. Day-one path:

1. File input on the rig card (`accept="image/*"`, up to 4 images, 8 MB each).
2. The browser keeps the file in IndexedDB on that phone (`mmrv-portal-v2` / `plates`) and shows a preview.
3. **Email rig details to the shop** tries the phone share sheet with the image files and the June address in the text. If the browser cannot share files, it downloads the photo (when there is one) and opens `mailto:mmrv+june@mail.grokbot.com` telling June to attach it.
4. June or Elmer files the photo in Drive. `data_plate_photos` in `members.json` stays the ops list of what is already on file (URL or name). It is not a guest upload bucket.

## Work log

`work_log`: `{ date, title, status: done|planned, amount, note }`. `amount: null` means no price on file. Guests do not edit the log. Free-trip progress stays on the membership card (Premium goal 6 hours, Basic goal 9). Blake’s `hours: 3` is a demo midpoint, not a QuoteIQ balance (`hours_note`).

## Self-quote

Portal tap opens `https://mmrvsolar.com/self-quote` with query params when we have them: `m`, `tier`, `year`, `make`, `model`, `type`, `coachType` (`TT` → `travel_trailer`, `5th` → `fifth_wheel`; motorhome is left unset so we do not guess Class A/B/C), `lengthFt`, `address` (parked), `systems`.

The live estimator does not read those params yet. The portal strip is the member framing: Premium **$25 saved per labor hour**, Basic **$10 saved per labor hour**, VAR **$39 saved on the first ticket**. Empty tier gets rack prices plus the member-discount note. Do not redesign selfquote.grok.me for this.

Checked 2026-10-26: `https://mmrvsolar.com/self-quote` is a WordPress page that refreshes to `https://selfquote.grok.me` and does not forward the query string. Phoebe owns forwarding params and any subpath.

**Request a time** mailto’s `mmrv+june@mail.grokbot.com`. That address is on the card. The card’s shop-inbox link is the live self-quote `/admin`: `https://selfquote.grok.me/admin`. The mailto body also names the pretty inbox path `https://mmrvsolar.com/self-quote/admin`. That pretty path returned HTTP 404 on 2026-10-26, so the card does not send guests there. The guest is told June will message them to confirm. The request does not book a slot.
- No match / no ?m= → taps muted + "links coming" empty state.
- Demo/test params: `&tier=basic|premium|var`, `&hrs=3`, `&pay=fail` (sticky; clear with `&pay=ok`).
- Not secret: anyone with the code sees that member's QI guest links (same exposure as texting the QI link).
