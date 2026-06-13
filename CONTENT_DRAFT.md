# WE-BMC Content Draft
> Page copy for Projects and Competitions — ready to wire into components

---

## Projects Page

### Page Header

**Eyebrow:** WE-BMC
**Headline:** Projects
**Subheadline:**
> We take on design challenges that exist at the boundary of mechanical engineering, embedded systems, and clinical medicine — from initial concept through to functional prototype.

---

### Project Grid Intro

Each project is student-led from problem identification through to validated prototype. We work closely with the engineering faculty at Western and, where possible, with clinical collaborators who can stress-test our assumptions against real patient care workflows.

---

## MustangMotion — Full Project Detail

### Hero

**Tag:** Active · 2023–Present
**Headline:** MustangMotion
**Discipline Tags:** Mechanical Design · Embedded Systems · Clinical Diagnostics · Wearables
**One-liner:** A smart diagnostic knee brace that replaces subjective clinical observation with sensor-fused, real-time biomechanical data.

---

### The Problem

Orthopedic assessment of knee function remains largely subjective in outpatient settings. Physical therapists and orthopedic surgeons rely on manual goniometry, self-reported pain scores, and visual gait observation — methods with well-documented inter-rater variability. For post-operative patients recovering from ACL reconstruction or total knee arthroplasty, the absence of objective, continuous measurement means that clinicians have limited visibility into whether rehabilitation milestones are being met between appointments.

MustangMotion is designed to close this gap.

---

### Mechanical Housing & Ergonomic Design

The brace was engineered against two competing constraints: structural rigidity sufficient to maintain precise sensor alignment through the full range of knee flexion (0°–135°), and a low-profile form factor that allows unobtrusive wear beneath standard athletic and clinical attire.

The housing is fabricated from glass-filled nylon using selective laser sintering (SLS), providing the strength-to-weight ratio required for a wearable that must survive repeated loading cycles without dimensional deformation at the sensor mounting points. Hinge joints at the medial and lateral condyle landmarks permit natural knee articulation while maintaining rigid positional reference for the flex sensor array.

Patient fit is addressed through dual-locking Velcro retention straps and an anterior patella relief cutout, accommodating a thigh circumference range of 30–50 cm without patient-specific fabrication. All electronic modules — including the flex sensor array, inertial measurement unit, and Bluetooth system-on-chip — are seated in recessed, shielded pockets within the lateral housing rail. This minimises protrusion during ambulation and protects components from the compressive loading that occurs during normal gait.

The two-piece shell design allows the electronic assembly to be removed for charging and data transfer without disturbing the fit of the brace itself, a feature that was driven directly by physiotherapy feedback during early user testing.

---

### Clinical Utility

MustangMotion targets two primary clinical workflows:

**1. Post-operative rehabilitation monitoring**
Patients recovering from ACL/PCL reconstruction and total knee arthroplasty (TKA) produce quantitative range-of-motion recovery curves that directly inform therapy progression decisions. The device captures these curves continuously across home rehabilitation sessions, generating a data record that a clinician can review remotely rather than relying solely on a fortnightly in-clinic measurement.

**2. Outpatient biomechanical screening**
For patients with osteoarthritis, patellofemoral pain syndrome, or suspected medial/lateral compartment loading imbalance, gait asymmetry and compensatory movement patterns are diagnostically significant. MustangMotion's symmetry index and angular velocity profiles surface these patterns in a standardized format that translates directly into clinical decision-making.

The device outputs a structured clinical report — including gait symmetry index, peak flexion angle, angular velocity profiles, and step cadence — formatted for compatibility with electronic health record (EHR) export.

---

### Technical Specifications

| Parameter | Specification |
|-----------|---------------|
| Flex sensing | 3-axis capacitive flex sensor array |
| Motion sensing | 6-DOF IMU (MPU-6050) |
| Connectivity | Bluetooth 5.0 Low Energy |
| Housing material | SLS glass-filled nylon, dual-rail design |
| Battery | 400 mAh LiPo, ~8 hours continuous operation |
| Data output | JSON over BLE → clinical web dashboard |
| Patient fit range | 30–50 cm thigh circumference |
| Flex range | 0°–135° |

---

### Competition Highlight

MustangMotion was WE-BMC's entry into the 2024 True North Biomedical Competition — where the device earned **1st place provincially** and **4th place nationally** among all Canadian university teams.

→ [View competition results](/competitions)

---

---

## Competitions Page

### Page Header

**Eyebrow:** WE-BMC
**Headline:** Competitions
**Subheadline:**
> We compete because it forces our work to be defensible — not just by our own standards, but by practicing clinicians, biomedical engineers, and healthcare investors. Every competition is a structured stress test of our design rationale, our clinical evidence, and our ability to communicate technical work to a multi-disciplinary audience.

**Summary Stats Strip:**
- 1 National finalist appearance
- 1 Provincial championship
- 1 Featured project

---

### Featured Competition: TNBC 2024

**Competition Name:** True North Biomedical Competition
**Acronym:** TNBC
**Year:** 2024
**Location:** Ontario & National
**Project:** MustangMotion
**Discipline Tags:** Medical Devices · Diagnostics · Wearables · Biomechanics

---

#### Results

| Scope | Placement | Recognition |
|-------|-----------|-------------|
| Provincial (Ontario) | **1st Place** | Ontario Champion |
| National (Canada) | **4th Place** | National Finalist |

---

#### Overview Tab

Canada's foremost student biomedical engineering competition, TNBC challenges university teams to design, prototype, and clinically validate a novel medical device. Submissions are evaluated across four weighted criteria: technical engineering innovation, clinical relevance and addressable unmet need, commercialization viability, and presentation quality. Judging panels are composed of practicing biomedical engineers, clinical specialists, and representatives from the venture capital and medical device industry — making TNBC one of the most technically demanding and clinically-informed competitions in Canadian engineering education.

---

#### Context Tab

WE-BMC entered TNBC 2024 with MustangMotion, our smart diagnostic knee brace. After advancing through the provincial adjudication round with the top score among all Ontario university teams, the club represented the province at the national level — ultimately finishing 4th against teams from Canada's top engineering programs.

Over 30 university teams competed at the national stage. WE-BMC's provincial championship reflects not only technical competence but the clinical plausibility of the MustangMotion platform — a standard set by practicing healthcare professionals on the judging panel. The national placement is a benchmark we intend to surpass.

---

#### Project Tab

This competition entry was built around **MustangMotion** — WE-BMC's flagship smart diagnostic knee brace. The device integrates embedded flex sensing, real-time gait analysis, and a Bluetooth-enabled clinical reporting pipeline into an ergonomic, patient-ready housing designed for post-operative rehabilitation monitoring and outpatient biomechanical screening.

→ [View the full MustangMotion project](/projects/mustangmotion)

---

### Competition Record Table

| Competition | Year | Project | Provincial Result | National Result |
|-------------|------|---------|-------------------|-----------------|
| True North Biomedical Competition (TNBC) | 2024 | MustangMotion | 1st Place | 4th Place |

*Additional competitions to be announced — follow our updates for the 2025 season.*

---

### Recruitment CTA

**Eyebrow:** Interested in competing?
**Headline:** Join WE-BMC for the 2025 season
**Body:** We're actively recruiting engineers, designers, and clinically-minded students for the next competition cycle. No prior competition experience required — just a drive to build things that work in the real world.
**CTA Button:** Apply to Join →

---

## Copywriting Notes

- **Tone register:** Professional academic — same register as a well-written engineering conference paper abstract, but written for a general university audience. Avoid marketing superlatives ("world-class," "cutting-edge") in favour of specific, verifiable claims.
- **Specificity over vagueness:** "3-axis capacitive flex sensor array" beats "advanced sensors." Specific numbers build credibility.
- **Present tense for active projects:** MustangMotion "is designed to," not "was designed to."
- **Competition results:** Always state both scope and year when citing results (e.g., "1st provincially at TNBC 2024") to distinguish past achievements from current standing.
- **Avoid padding:** Every sentence should carry information. If a sentence could be removed without losing meaning, cut it.
