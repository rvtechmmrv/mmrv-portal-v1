# Portal pretty link (Shape B) — locked 2026-10-26

Pattern: `https://portal.mmrvsolar.com/?m=<member-code>`  (also works as `#m=<code>`)
Example: https://portal.mmrvsolar.com/?m=paula-scott

- Code = lowercase letters/digits/dashes; it is the membership id.
- Lookup: `members.json` (and the MEMBERS_FALLBACK copy inside index.html — keep both in sync).
- Record fields: name, tier (basic|premium|var|""), hours (banked toward free $75 service call), PAY_LINK, INVOICE_LINK, ESTIMATE_LINK, RECEIPT_LINK (QuoteIQ guest URLs; "" = not ready).
- No match / no ?m= → taps muted + "links coming" empty state.
- Demo/test params: `&tier=basic|premium|var`, `&hrs=3`, `&pay=fail` (sticky; clear with `&pay=ok`).
- Not secret: anyone with the code sees that member's QI guest links (same exposure as texting the QI link).
