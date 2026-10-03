/* Single source of truth for team members.
   Powers the nav "Teams" dropdown and the member profile pages. */

const TEAM = [
  /* ---------- Leadership ---------- */
  {
    slug: 'a-sharma', name: 'A. Sharma', initials: 'AS', group: 'leadership', division: 'civil',
    role: 'Founder & Civil Engineering Lead',
    summary: 'Sets the technical direction for every build and signs off on structural design.',
    bio: 'Founded the consultancy in 2016 after 18 years on large urban infrastructure projects. A. owns structural sign-off across every civil engagement and chairs the monthly design review where both divisions align on deliverables. He is a registered chartered engineer and holds a PhD in structural engineering.',
    focus: ['Structural sign-off', 'Business strategy', 'Client relations', 'Design governance'],
    facts: { Experience: '18 years', Projects: '64 led', Education: 'PhD Structural Engineering', Languages: 'English, Hindi', Base: 'Head Office' },
    tags: ['Structural', 'Governance'],
    work: [
      { title: 'Riverside Waterfront District', desc: 'Master-planned 42 hectare waterfront with mixed-use blocks and a public promenade.' },
      { title: 'City Elevated Corridor', desc: '11 km elevated access road with 14 interchange structures.' },
      { title: 'Annual Design Standards', desc: 'Company-wide detailing, QA and material specification manual.' }
    ]
  },
  {
    slug: 'r-verma', name: 'R. Verma', initials: 'RV', group: 'leadership', division: 'it',
    role: 'CTO — IT Solutions',
    summary: 'Leads the software division, from architecture reviews to cloud delivery.',
    bio: 'R. built the technology practice from a three-person team into a 30-engineer division. He reviews every architecture decision, runs the security posture review twice a year and keeps delivery on a predictable release cadence for both government and private clients.',
    focus: ['Architecture reviews', 'Delivery governance', 'Security & compliance', 'Hiring & tech radar'],
    facts: { Experience: '15 years', Projects: '85+ deployments', Education: 'MS Computer Science', Languages: 'English, Hindi, Marathi', Base: 'Head Office' },
    tags: ['Cloud', 'Architecture'],
    work: [
      { title: 'Restaurant Management Suite', desc: 'Multi-outlet ordering, kitchen and inventory platform used by 120+ outlets.' },
      { title: 'Enterprise Cloud Migration', desc: 'Lift-and-shift plus re-architecture for 9 legacy business systems.' },
      { title: 'ISO 27001 Readiness', desc: 'Security controls, logging and audit trail across the delivery pipeline.' }
    ]
  },
  {
    slug: 's-patel', name: 'S. Patel', initials: 'SP', group: 'leadership', division: 'it',
    role: 'Head of R&D',
    summary: 'Drives the Smart Cities and IoT research programmes.',
    bio: 'S. runs the research budget and the university liaison programme, turning field problems into funded research tracks. Current work covers low-cost structural health monitoring and automated survey capture for sites where traditional instruments are impractical.',
    focus: ['Research strategy', 'University partnerships', 'Grant & proposal writing', 'Prototype validation'],
    facts: { Experience: '12 years', Projects: '6 research tracks', Education: 'PhD Civil Engineering (Structures)', Languages: 'English, Hindi, Gujarati', Base: 'Innovation Lab' },
    tags: ['R&D', 'IoT', 'Smart Cities'],
    work: [
      { title: 'IoT Structural Monitoring', desc: 'Low-cost strain and vibration sensors validated against lab testing.' },
      { title: 'Automated Survey Capture', desc: 'Drone and total-station fusion for weekly progress measurement.' },
      { title: 'CivilTech Innovation Fund', desc: 'Seed grants for two prototype projects each cycle.' }
    ]
  },

  /* ---------- Civil Division ---------- */
  {
    slug: 'm-iyer', name: 'M. Iyer', initials: 'MI', group: 'civil', division: 'civil',
    role: 'Head of Structural Design',
    summary: 'Leads load analysis, RCC detailing and seismic retrofits.',
    bio: 'M. handles analysis and detailing for the division\'s largest structures, and runs the seismic retrofit programme for occupied buildings. He is known on site for catching reinforcement clashes before they reach the pour stage, saving rework across the portfolio.',
    focus: ['Finite element analysis', 'RCC & steel detailing', 'Seismic assessment', 'Retrofit design'],
    facts: { Experience: '14 years', Projects: '38 structures', Education: 'M.Tech Structural Engineering', Languages: 'English, Hindi, Tamil', Base: 'Design Studio' },
    tags: ['Structural', 'Seismic'],
    work: [
      { title: 'Mid-Rise Residential Tower', desc: 'G+12 RCC structure designed to Zone III seismic code.' },
      { title: 'Warehouse Retrofit', desc: 'Strengthening and bracing of a live operational shed.' },
      { title: 'Bridge Span Analysis', desc: 'Load testing and rating of a 5-span road bridge.' }
    ]
  },
  {
    slug: 'p-nair', name: 'P. Nair', initials: 'PN', group: 'civil', division: 'civil',
    role: 'Project Manager, Infrastructure',
    summary: 'Runs timelines, budgets and contractor coordination on site.',
    bio: 'P. plans and controls delivery across infrastructure packages, from the first survey mobilisation to handover. He maintains the master programme, contractor payment milestones and the daily site reporting that clients receive every evening.',
    focus: ['Master programme', 'Cost & cash flow', 'Contractor coordination', 'Client reporting'],
    facts: { Experience: '16 years', Projects: '27 packages', Education: 'B.Tech Civil Engineering, PMP', Languages: 'English, Hindi, Malayalam', Base: 'Field Office' },
    tags: ['Planning', 'DPR'],
    work: [
      { title: 'Stormwater Network Ph-II', desc: '9 km of storm drain with 3 pumping stations delivered on schedule.' },
      { title: 'Industrial Park Roads', desc: '4.2 km internal roads with kerbs and drainage for a new park.' },
      { title: 'Contractor Payment System', desc: 'Milestone-linked certification reducing disputes on site.' }
    ]
  },
  {
    slug: 'd-rao', name: 'D. Rao', initials: 'DR', group: 'civil', division: 'civil',
    role: 'Site & Quality Supervisor',
    summary: 'On-site quality assurance, material testing and safety compliance.',
    bio: 'D. is the first person on site every morning and the last to leave. He runs cube tests and material checks, documents every deviation before work proceeds, and has stopped work on site more than once for safety — each time with documentation that held up in review.',
    focus: ['Material testing', 'Cube & pour supervision', 'Safety compliance', 'Non-conformance reports'],
    facts: { Experience: '19 years', Projects: '52 sites', Education: 'Diploma Civil Engineering', Languages: 'English, Hindi, Telugu, Kannada', Base: 'Field Office' },
    tags: ['QA/QC', 'Safety'],
    work: [
      { title: 'Cube Test Programme', desc: '28-day strength tracking for every pour across live sites.' },
      { title: 'Safety Audit Rollout', desc: 'Daily toolbox talks and monthly audits with zero lost-time incidents.' },
      { title: 'Third-Party Testing Tie-up', desc: 'Independent lab verification for high-risk materials.' }
    ]
  },
  {
    slug: 'k-singh', name: 'K. Singh', initials: 'KS', group: 'civil', division: 'civil',
    role: 'DPR & Estimation Lead',
    summary: 'Prepares Detailed Project Reports, feasibility studies and estimates.',
    bio: 'K. turns a concept sketch into a fundable proposal — cost estimates, technical justification, drawings and drawings schedules included. His DPRs have been approved on first submission in 9 of the last 11 submissions.',
    focus: ['Detailed Project Reports', 'Quantity estimation', 'Feasibility studies', 'Tender documentation'],
    facts: { Experience: '11 years', Projects: '34 DPRs', Education: 'B.Tech Civil Engineering', Languages: 'English, Hindi, Punjabi', Base: 'Head Office' },
    tags: ['DPR', 'Costing'],
    work: [
      { title: 'Water Treatment DPR', desc: 'Feasibility and design for a 20 MLD treatment plant.' },
      { title: 'Road Widening Estimate', desc: 'BOQ and rate analysis for a 6 km four-laning project.' },
      { title: 'Tender Document Suite', desc: 'Standard civil tender packs reused across 12 packages.' }
    ]
  },
  {
    slug: 'l-mehra', name: 'L. Mehra', initials: 'LM', group: 'civil', division: 'civil',
    role: 'Water & Drainage Engineer',
    summary: 'Designs stormwater networks, waterways and treatment systems.',
    bio: 'L. designs the water side of every project: stormwater networks, natural waterways and treatment processes. She models catchments in software before anything is dug, and her designs have held up through two monsoon seasons without surcharge.',
    focus: ['Stormwater modelling', 'Hydraulic design', 'Waterway rehabilitation', 'Treatment processes'],
    facts: { Experience: '10 years', Projects: '21 water systems', Education: 'M.Tech Water Resources', Languages: 'English, Hindi', Base: 'Design Studio' },
    tags: ['Hydraulics', 'Drainage'],
    work: [
      { title: 'Stormwater Network Ph-I', desc: '6.5 km network sized for a 1-in-100 year event.' },
      { title: 'Natural Waterway Restoration', desc: 'Channel re-profiling with bank protection and bio-engineering.' },
      { title: '20 MLD Treatment Plant', desc: 'Clarifier and filtration layout with sludge handling.' }
    ]
  },

  /* ---------- IT Division ---------- */
  {
    slug: 'n-gupta', name: 'N. Gupta', initials: 'NG', group: 'it', division: 'it',
    role: 'Lead Software Engineer',
    summary: 'Builds web platforms, ERPs and mobile apps for clients.',
    bio: 'N. owns the delivery standard for full-stack work — framework choice, code review and the release checklist every build passes. He has shipped 40+ client systems across web, Android and internal tooling.',
    focus: ['Full-stack architecture', 'Code review & standards', 'Android development', 'Client workshops'],
    facts: { Experience: '9 years', Projects: '40+ systems', Education: 'B.Tech Information Technology', Languages: 'English, Hindi', Base: 'Delivery Studio' },
    tags: ['Full-Stack', 'Android'],
    work: [
      { title: 'Restaurant Management System', desc: 'Ordering, kitchen display and stock control for 120+ outlets.' },
      { title: 'Inventory ERP', desc: 'Multi-warehouse stock engine with barcode scanning.' },
      { title: 'Client Mobile App', desc: 'Field-force app with offline sync for 300 users.' }
    ]
  },
  {
    slug: 't-menon', name: 'T. Menon', initials: 'TM', group: 'it', division: 'it',
    role: 'IoT & Hardware Engineer',
    summary: 'Sensor networks, device firmware and hardware-software pipelines.',
    bio: 'T. bridges the two divisions: he builds the sensor hardware that civil engineers mount on site and the firmware that streams it. His structural monitoring kit now reports every minute from 14 live sites.',
    focus: ['Sensor selection & calibration', 'Embedded firmware', 'LoRa / Wi-Fi mesh', 'Telemetry pipelines'],
    facts: { Experience: '8 years', Projects: '30 smart sites', Education: 'B.E. Electronics & Communication', Languages: 'English, Hindi, Malayalam', Base: 'Hardware Lab' },
    tags: ['IoT', 'Embedded'],
    work: [
      { title: 'Structural Health Kit', desc: 'Strain and vibration node deployed on 14 structures.' },
      { title: 'Water Level Telemetry', desc: 'Solar-powered level nodes reporting every 10 minutes.' },
      { title: 'Site Sensor Mesh', desc: 'LoRa mesh covering a 6 hectare construction site.' }
    ]
  },
  {
    slug: 'a-bose', name: 'A. Bose', initials: 'AB', group: 'it', division: 'it',
    role: 'Cloud & DevOps Engineer',
    summary: 'Handles migration, hosting, CI/CD and scalable cloud architecture.',
    bio: 'A. keeps the platform running and the deployments boring. He standardised CI/CD across all client systems, cut average deploy time from hours to minutes, and now monitors uptime and cost for every environment the company hosts.',
    focus: ['Cloud migration', 'CI/CD pipelines', 'Monitoring & alerting', 'Cost optimisation'],
    facts: { Experience: '7 years', Projects: '9 migrations', Education: 'B.Tech Computer Science', Languages: 'English, Bengali, Hindi', Base: 'Delivery Studio' },
    tags: ['Cloud', 'DevOps'],
    work: [
      { title: 'Zero-Downtime Pipeline', desc: 'Automated test, staging and production releases.' },
      { title: 'Cloud Cost Audit', desc: 'Rightsizing that cut monthly spend by 34%.' },
      { title: 'Uptime Dashboard', desc: 'Live status and alerting across all client environments.' }
    ]
  },
  {
    slug: 's-kulkarni', name: 'S. Kulkarni', initials: 'SK', group: 'it', division: 'it',
    role: 'QA & Automation Engineer',
    summary: 'Test strategy, automation suites and release sign-off.',
    bio: 'S. defines what "done" means before a build starts. She built the automation suite that runs on every release, and she is the last signature before anything reaches a client environment — no exceptions, no verbal waivers.',
    focus: ['Test strategy', 'Automation frameworks', 'Performance testing', 'Release sign-off'],
    facts: { Experience: '6 years', Projects: '25 suites', Education: 'B.E. Computer Engineering', Languages: 'English, Hindi, Marathi', Base: 'Delivery Studio' },
    tags: ['QA', 'Automation'],
    work: [
      { title: 'Regression Automation Suite', desc: '1,400 scripted cases running on every release.' },
      { title: 'Load Test Programme', desc: 'Peak-hour concurrency testing for the ordering platform.' },
      { title: 'Defect Prevention Report', desc: 'Quarterly root-cause review shared across projects.' }
    ]
  },
  {
    slug: 'r-jain', name: 'R. Jain', initials: 'RJ', group: 'it', division: 'it',
    role: 'UI/UX Designer',
    summary: 'Designs accessible interfaces and client-facing product visuals.',
    bio: 'R. designs the screens clients actually see. Every interface is built to WCAG AA contrast and touch targets, tested with real users before handover, and documented in a component library the engineers reuse.',
    focus: ['Interface design', 'Design systems', 'Accessibility (WCAG)', 'User testing'],
    facts: { Experience: '6 years', Projects: '18 interfaces', Education: 'B.Des Interaction Design', Languages: 'English, Hindi', Base: 'Design Studio' },
    tags: ['UI', 'UX'],
    work: [
      { title: 'Ordering App Redesign', desc: 'Rebuilt the counter flow, cutting order time by 40%.' },
      { title: 'Component Library', desc: 'Shared UI kit adopted across every client project.' },
      { title: 'Accessibility Audit', desc: 'WCAG AA pass on 5 systems before launch.' }
    ]
  }
];

/* Helper: look up one member by slug */
function getMember(slug) {
  return TEAM.find(m => m.slug === slug) || null;
}