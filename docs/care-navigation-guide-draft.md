# Care Navigation Guide — founder-only development draft

**Date:** November 12, 2026 (Central)
**Status:** Open development work. No release or whole-Health-area founder acceptance authorized.

## Gap addressed
[Health & Wellness issue #49](https://github.com/ouroneplace/ouroneplace.github.io/issues/49) includes helping family members navigate care, preparing for medical instructions, and removing access barriers. The existing released Health Center already provides a private Appointment Preparation Studio, medicine/screening literacy lessons and medical-cost lessons. This new guide focuses on **coordination between real people and real healthcare teams** rather than another overlapping quiz or a second data-entry tool.

## What people can do
Choose one of four situations, read why and what to do, check three specific actions, verify a clear result, and understand when a professional or emergency escalation is necessary:
1. Supporting someone's appointment while respecting their voice and permission.
2. Coming home from a hospital stay: written discharge plan, clinician-reviewed medicines, appointments, services and warning signs.
3. Waiting for a result/referral: identify the ordering office, expected timing and a follow-up contact.
4. Removing access barriers: interpreter, mobility, transport, cost or scheduling, without assuming availability.

The checklist has no JavaScript, account, personal fields, network calls, hidden collection, or claimed clinical/eligibility determinations. Browser controls may restore checkbox states, which the page explains. The guide explicitly respects patient choices and warns that access/consent/representation laws differ by location, and it uses a general worldwide applicability disclaimer with U.S. examples.

## Official references verified November 12, 2026
- [MedlinePlus: Caregiving—taking a loved one to the doctor](https://medlineplus.gov/ency/patientinstructions/000953.htm).
- [National Institute on Aging: Taking someone to a doctor's appointment](https://www.nia.nih.gov/health/medical-care-and-appointments/taking-someone-doctors-appointment-tips-caregivers).
- [AHRQ: IDEAL discharge planning](https://www.ahrq.gov/patient-safety/patients-families/engagingfamilies/strategy4/index.html).
- [MedlinePlus: How to Understand Your Lab Results](https://medlineplus.gov/lab-tests/how-to-understand-your-lab-results/) — patient-facing guidance for test result questions and follow-up.

## Scope and preservation
- New `one-place/care-navigation.html`.
- Exactly one new link in the existing Health Center visit guidance, no rework of the accepted Appointment Preparation Studio or Health Literacy/Costs Labs.
- New focused tests `tests/care-navigation-guide.spec.cjs` for four breakpoints, 200% text, keyboard, no-JS, privacy, authentic source links, and two-way links to existing Studio and Family Handoff.
- Extend exact-SHA published Pages integrity verification from 21 to 22 application files and desktop/mobile live-site smoke to cover the new guide.
- This development QA ledger.

This is a bounded content expansion, not a 19th life area or another catalog service. The accepted homepage, the 18/72 catalog, TEAL, Money, Housing, Family, studio privacy/download, lesson videos, and prior 673 passing tests are to be preserved.

## Independent QA and release gates
Source and design intent were reviewed; current-head full automated CI, independent rendered screenshots at 320/390/1366/1920 and 200% text, and exact public-source accessibility have not yet been claimed as passed. These gates must be completed before founder publication authorization is requested.

**Do not merge or publish until the founder approves this specific PR after verified QA.** After authorized merge, confirm exact-SHA Pages deployment, 22-file integrity, public desktop/mobile smoke, and post-merge full browser regression. Founder v1.0 acceptance of the *whole* Health & Wellness area remains separate and ungranted.