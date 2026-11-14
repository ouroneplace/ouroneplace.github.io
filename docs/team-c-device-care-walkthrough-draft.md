# Team C — Everyday Device Care (source-only draft)

**Team C ownership:** Technology & Digital Safety, one bounded v1.0 outcome. **Not founder-accepted, HQ-integrated, merged or published.** This adds no homepage, shared navigation, site manifest or new catalog offering.

## Visitor outcome and reason for scope
The already published `one-place/digital-safety-practice.html` covers 4 scam/account-fraud decision scenarios. This separate, nonduplicating practice explains three *device maintenance and privacy habits*: authentic software updates, recoverable backups, and reviewing app permissions. One fictional situation, three decisions and plain reasons per habit (9 explanations); a real-world one-task takeaway. All advice readable without JavaScript. Does not promise to scan/secure a device or handle data.

## Original primary sources (official U.S. starting points)
- CISA, Secure Our World Software Updates Tip Sheet, https://www.cisa.gov/sites/default/files/2024-09/Secure-Our-World-Software-Updates-Tip-Sheet.pdf — security updates and checking device settings
- Federal Trade Commission, “Five ways to keep scammers and hackers away,” https://consumer.ftc.gov/consumer-alerts/2024/08/five-ways-keep-scammers-hackers-away — backups, updates and device locking
- Federal Trade Commission, “How Websites and Apps Collect and Use Your Information,” https://consumer.ftc.gov/articles/how-websites-and-apps-collect-and-use-your-information — reviewing app privileges in phone privacy settings
All linked only by explicit visitor click, externally. U.S.-specific references, not specific device screenshots or promises of vendor support. Links reviewed 2026-11-13.

## Guardrails, quality and truth
The HTML asks no personal questions, captures no passwords/account info, stores no browser state, loads no third-party assets, sends no forms or write requests. No automatic backups, resets, permission changes or updates occur. Readable fallback, keyboard-focused main skip, reason disclosure, status announcements, reduced-motion CSS, 320/390/1366/1920 widths plus 200% text should be verified through exact-head CI. Real iOS/Android device behavior, native TalkBack/VoiceOver, external humans and device-specific setup are **not verified** by synthetic browser tests. “No JavaScript” retains three full teaching guides, the nine reasons in disclosures, official resources and next steps.

## HQ handoff / preservation
Only add `one-place/device-care-walkthrough.html`, `tests/device-care-walkthrough.spec.cjs` and this documentation. Do not modify public main, founder-approved experiences, shared 18/72 catalog, or HQ release assets. HQ chooses whether/when to add discovery navigation while selectively importing exact three blobs to current published main, reruns exact merged-head QA, and asks for a specific founder-scoped release only when ready. Keep PR #79 founder hold/#81 independent review requirements untouched. An individual Team C handoff does not certify the Technology area or all seven Team C areas as v1.0 complete.

**Source / exact-head test status:** pending GitHub Actions; do not mark PASS before inspecting job logs.