/*
 * Domain 5.0 - Security Program Management and Oversight
 * Source: Professor Messer SY0-701 Course Notes v1.07, PDF pages 93-105 (printed pages 84-96).
 * All lessons and questions are original wording. "pages" are PDF page numbers
 * (printed page = PDF page - 9).
 *
 * Activity types: choice | multi | match | order | recall  (see content/README.md)
 */
window.SECPLUS = window.SECPLUS || {};
(window.SECPLUS.content = window.SECPLUS.content || []).push({
  domain: "d5",
  topics: [
    // ------------------------------------------------------------------ 5.1 Security policies
    {
      id: "d5-policies",
      objective: "5.1",
      section: "Security Policies",
      title: "Security policies",
      pages: [93, 94],
      lesson: {
        summary: [
          "Security policy guidelines: what rules do you follow to provide confidentiality, integrity and availability (CIA)? Policies cover high-level strategies and detailed goals. Policies answer 'what' and 'why'; technical controls answer 'how'.",
          "Information security policies are the big centralized list of security policies: compliance requirements, detailed procedures (what happens when…?), and roles and responsibilities. They're just words unless the organization enforces them.",
          "Acceptable use policies (AUP) define acceptable use of company assets (Internet, phones, computers, mobile devices), sometimes in the Rules of Behavior. They limit legal liability: if someone is dismissed, these are the documented reasons.",
          "Business continuity plans give alternatives when technology fails (manual transactions, paper receipts, phone approvals), documented and tested before a problem. A disaster recovery plan, part of continuity planning, covers recovery location, data recovery, application restoration and staff availability for natural, technology and human-created disasters.",
          "Incident response roles: the incident response team (trained and tested), IT security management (corporate support), compliance officers, technical staff (in the trenches) and the user community (they see everything)."
        ],
        more: [
          "Security incidents examples repeat from 4.8: malware from an attachment, botnet DDoS, data stolen for ransom, and peer-to-peer software exposing internal servers. NIST SP800-61 Revision 2 and its four-phase lifecycle also appear again here.",
          "Software development lifecycle (SDLC): there are many ways from idea to app, with customer requirements, schedule and budget to manage. There's no single best way, but a framework helps.",
          "Change management is one of the most common enterprise risks: frequent, often overlooked. Have clear policies on frequency, duration, installation and fallback. It's sometimes very hard because organizational culture is hard to change."
        ],
        pages: [93, 94]
      },
      activities: [
        {
          id: "d5-policies-a1", type: "choice", format: "Compare",
          prompt: "According to the notes, what do security policies answer, and what do technical controls answer?",
          options: [
            { t: "Policies answer 'how'; controls answer 'why'", why: "Reversed." },
            { t: "Policies answer 'what' and 'why'; controls answer 'how'", ok: true, why: "That's the split in the notes." },
            { t: "Both answer only 'who'", why: "Not the notes' framing." },
            { t: "Policies answer 'when'; controls answer 'where'", why: "Not the notes' framing." }
          ],
          hint: "Intent vs. implementation.",
          explain: "Policies set the rules and reasons; technology carries them out.",
          pages: [93]
        },
        {
          id: "d5-policies-a2", type: "choice", format: "Scenario",
          prompt: "An employee is dismissed for streaming games on a company laptop. Which document gives the well-documented reason and limits the company's legal liability?",
          options: [
            { t: "The disaster recovery plan", why: "That's for restoring IT after a disaster." },
            { t: "The acceptable use policy", ok: true, why: "It defines acceptable use of company assets." },
            { t: "The SDLC", why: "That's for building software." },
            { t: "NIST SP800-61", why: "That's an incident handling guide." }
          ],
          hint: "Acceptable use of company assets.",
          explain: "An AUP documents the rules, which protects the organization legally.",
          pages: [93]
        },
        {
          id: "d5-policies-a3", type: "choice", format: "Next action",
          prompt: "The payment system may go down for a day. The business wants to keep taking orders. What belongs in the business continuity plan?",
          options: [
            { t: "Manual alternatives like paper receipts and phone approvals, tested in advance", ok: true, why: "Continuity needs documented, tested alternatives." },
            { t: "Nothing, because systems never fail", why: "Not everything goes to plan." },
            { t: "Improvise the alternatives during the outage, since every disaster is different and plans go stale", why: "They must be documented and tested before a problem." },
            { t: "A new acceptable use policy", why: "That doesn't keep the business running." }
          ],
          hint: "There needs to be an alternative.",
          explain: "Business continuity keeps operations going while IT recovers.",
          pages: [93]
        },
        {
          id: "d5-policies-a4", type: "match", format: "Match",
          prompt: "Match each incident response role to its description.",
          choices: ["Incident response team", "IT security management", "Compliance officers", "Technical staff", "User community"],
          items: [
            { t: "A specialized group, trained and tested", a: "Incident response team", why: "They lead the response." },
            { t: "Provides corporate support", a: "IT security management", why: "Leadership backing." },
            { t: "Knows the compliance rules in detail", a: "Compliance officers", why: "Intricate knowledge of compliance." },
            { t: "The team in the trenches", a: "Technical staff", why: "Hands-on work." },
            { t: "They see everything", a: "User community", why: "Users often notice first." }
          ],
          hint: "Who does what during an incident?",
          explain: "Incident response involves more than the IR team.",
          pages: [94]
        },
        {
          id: "d5-policies-a5", type: "recall", format: "Recall",
          front: "What does a disaster recovery plan include, and how does it relate to business continuity?",
          back: "It's part of business continuity planning. A comprehensive DR plan covers the recovery location, data recovery method, application restoration, and IT team and employee availability, for natural, technology and human-created disasters.",
          pages: [93]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.1 Security standards
    {
      id: "d5-standards",
      objective: "5.1",
      section: "Security Standards",
      title: "Security standards",
      pages: [94],
      lesson: {
        summary: [
          "Security standards formally define how to use security technologies and processes, so everyone understands expectations. Write them in-house if your needs are unique, or use existing ones from ISO and NIST.",
          "Password standard: a formal complexity policy, acceptable authentication methods (for example, no local accounts, only LDAP to AD), secure reset procedures, change frequency, secure storage and password manager options.",
          "Access control standard: which information, at what time, under what circumstances; which access control types are allowed (no discretionary, mandatory only); how access is granted (privilege documentation) and removed (security issue, expiration, contract renewal).",
          "Physical security standard: doors, building access, property security; different access for employees and visitors; specific systems (electronic locks, monitoring, motion detection); mandatory escorts and off-boarding.",
          "Encryption standard: everything cryptographic, including implementation, password storage methods, and minimum algorithms for data in use, in transit and at rest."
        ],
        more: [
          "The notes add that encryption minimums will probably be different for each data state."
        ],
        pages: [94]
      },
      activities: [
        {
          id: "d5-standards-a1", type: "match", format: "Match",
          prompt: "Match each requirement to the security standard it belongs in.",
          choices: ["Password", "Access control", "Physical security", "Encryption"],
          items: [
            { t: "Only LDAP authentication to AD; no local accounts", a: "Password", why: "Acceptable authentication methods." },
            { t: "Mandatory access control only, no discretionary", a: "Access control", why: "Defines allowed access control types." },
            { t: "Visitors need a mandatory escort", a: "Physical security", why: "Additional physical concerns." },
            { t: "Minimum algorithms for data at rest", a: "Encryption", why: "Data encryption minimums." }
          ],
          hint: "Login, permissions, building, crypto.",
          explain: "Each standard formalizes one area so expectations are clear.",
          pages: [94]
        },
        {
          id: "d5-standards-a2", type: "choice", format: "Scenario",
          prompt: "A contractor's engagement ends. Which standard should already document how their access is removed?",
          options: [
            { t: "The encryption standard", why: "That covers cryptography." },
            { t: "The access control standard", ok: true, why: "It documents removal for expiration, contract renewals and security issues." },
            { t: "The acceptable use policy", why: "That's about how assets may be used." },
            { t: "The SDLC", why: "That's software development." }
          ],
          hint: "How access may be removed.",
          explain: "Access control standards cover granting and removing access.",
          pages: [94]
        },
        {
          id: "d5-standards-a3", type: "recall", format: "Recall",
          front: "Name two organizations the notes cite as sources of existing security standards, and why you might write your own instead.",
          back: "ISO (International Organization for Standardization) and NIST (National Institute of Standards and Technology). You might write in-house standards when your requirements are unique.",
          pages: [94]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.1 Security procedures
    {
      id: "d5-procedures",
      objective: "5.1",
      section: "Security Procedures",
      title: "Security procedures",
      pages: [95],
      lesson: {
        summary: [
          "Change management (repeated from Security Policies): changes like software upgrades or firewall edits are a common, often ignored risk. Set clear policies for frequency, duration, installation and fallback; culture makes it hard.",
          "Change control is the formal process that avoids downtime, confusion and mistakes. Nothing changes without it: scope the change, analyze risk, create a plan, get end-user approval, present to the change control board, have a backout plan, and document the changes.",
          "Onboarding: new hires or transfers sign IT agreements (handbook or separate AUP), get accounts tied to the right groups and departments, and receive preconfigured hardware.",
          "Offboarding should be pre-planned: decide what happens to the hardware and the data. Accounts are usually deactivated, not always deleted.",
          "Playbooks are conditional, step-by-step procedures for broad processes (investigate a breach, recover from ransomware). They can be manual checklists or drive automation, often through a SOAR (Security Orchestration, Automation, and Response) platform."
        ],
        more: [
          "Monitoring and revision: security changes constantly, so procedures must too: tighter change control, new playbooks, extra checks, protection against emerging threats.",
          "Governance structures: boards (specialists who gather information for a committee), committees (subject-matter experts who consider board input, decide next steps and report back), government entities (legal, administrative and political concerns, often public), and centralized vs. decentralized governance (one group of decision makers vs. spread across people or locations)."
        ],
        pages: [95]
      },
      activities: [
        {
          id: "d5-procedures-a1", type: "order", format: "Order",
          prompt: "Put the change control steps from the notes in order.",
          steps: [
            { t: "Determine the scope of the change", why: "Know what's changing first." },
            { t: "Analyze the risk", why: "Then understand the risk." },
            { t: "Create a plan", why: "Plan the work." },
            { t: "Get end-user approval", why: "Users sign off." },
            { t: "Present the proposal to the change control board", why: "The board approves." },
            { t: "Document the changes", why: "Record what was done (with a backout plan ready throughout)." }
          ],
          hint: "Scope, risk, plan, users, board, record.",
          explain: "Nothing changes without the process, and a backout plan is ready if it fails.",
          pages: [95]
        },
        {
          id: "d5-procedures-a2", type: "choice", format: "Scenario",
          prompt: "An engineer leaves the company. Their account is disabled but not deleted. Is this consistent with the notes?",
          options: [
            { t: "No, accounts must always be deleted immediately", why: "The notes say usually deactivated, not always deleted." },
            { t: "Yes, accounts are usually deactivated but not always deleted", ok: true, why: "That matches the offboarding notes." },
            { t: "No, the account should stay active for a year", why: "It should be deactivated." },
            { t: "Yes, and the hardware decision can be made later as needed", why: "Offboarding should be pre-planned, including hardware." }
          ],
          hint: "Deactivated vs. deleted.",
          explain: "Offboarding is pre-planned: accounts, hardware and data all have a defined fate.",
          pages: [95]
        },
        {
          id: "d5-procedures-a3", type: "choice", format: "Compare",
          prompt: "Your ransomware playbook should trigger automated containment through integrated third-party tools. What platform do the notes mention?",
          options: [
            { t: "SDLC", why: "That's software development." },
            { t: "MOU", why: "That's an agreement type." },
            { t: "SOAR", ok: true, why: "Security Orchestration, Automation, and Response." },
            { t: "AUP", why: "That's acceptable use." }
          ],
          hint: "Orchestration, automation, response.",
          explain: "Playbooks often integrate with SOAR to automate steps.",
          pages: [95]
        },
        {
          id: "d5-procedures-a4", type: "match", format: "Match",
          prompt: "Match each governance structure to its description.",
          choices: ["Board", "Committee", "Government entity", "Decentralized governance"],
          items: [
            { t: "A panel of specialists gathering information for a committee", a: "Board", why: "Boards gather information." },
            { t: "Subject-matter experts who decide next steps and present results", a: "Committee", why: "Committees consider board input." },
            { t: "Faces legal, administrative and political issues, often in public", a: "Government entity", why: "A different kind of machine." },
            { t: "Decision-making spread across individuals or locations", a: "Decentralized governance", why: "Not one central group." }
          ],
          hint: "Who gathers, who decides, who's public, who's spread out.",
          explain: "Governance structures decide where processes and procedures come from.",
          pages: [95]
        },
        {
          id: "d5-procedures-a5", type: "recall", format: "Recall",
          front: "What happens during onboarding, per the notes?",
          back: "New hires or transfers sign IT agreements (in the handbook or a separate AUP), get accounts associated with the right groups and departments, and receive preconfigured IT hardware such as laptops and tablets.",
          pages: [95]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.1 Security considerations
    {
      id: "d5-considerations",
      objective: "5.1",
      section: "Security Considerations",
      title: "Security considerations",
      pages: [96],
      lesson: {
        summary: [
          "Regulatory: regulations are often mandated and shape logging, data storage, protection and retention. Examples: Sarbanes-Oxley (SOX, the Public Company Accounting Reform and Investor Protection Act of 2002) and HIPAA (healthcare information storage, use and transmission).",
          "Legal: security teams report illegal activity and hold data for legal proceedings. Breach notification is a legal requirement in many jurisdictions. Cloud data moving between jurisdictions without human intervention makes this harder.",
          "Industry: every market differs. Power and utilities need isolated, protected system controls; medical needs highly secure storage, access logs and encryption.",
          "Geographical security: local/regional (city and state records, uptime of services), national (federal government, defense, multi-state organizations, state secrets), and global (multinationals, financial markets, widely varying legal concerns)."
        ],
        more: [],
        pages: [96]
      },
      activities: [
        {
          id: "d5-considerations-a1", type: "match", format: "Match",
          prompt: "Match each concern to its security consideration.",
          choices: ["Regulatory", "Legal", "Industry", "Geographical"],
          items: [
            { t: "SOX requires certain financial record retention", a: "Regulatory", why: "A mandated regulation." },
            { t: "A breach must be reported to affected people by law", a: "Legal", why: "Breach notification is a legal requirement." },
            { t: "A hospital needs highly secure storage and access logs", a: "Industry", why: "Medical industry requirements." },
            { t: "A multinational faces widely varying laws across markets", a: "Geographical", why: "Global scope." }
          ],
          hint: "Regulation, law, market, location.",
          explain: "Each consideration shapes security differently.",
          pages: [96]
        },
        {
          id: "d5-considerations-a2", type: "choice", format: "Scenario",
          prompt: "Customer data replicates automatically between cloud regions in different countries. Which consideration do the notes say this complicates?",
          options: [
            { t: "Legal, because data moves between jurisdictions without human intervention", ok: true, why: "The security team must still follow legal guidelines." },
            { t: "Industry, because cloud is its own market", why: "The notes tie this to legal concerns." },
            { t: "None, since cloud providers take on every legal duty for the data they replicate between regions", why: "The security team must follow legal guidelines." },
            { t: "Physical security", why: "Not the issue raised." }
          ],
          hint: "Which country's law applies?",
          explain: "Cloud computing makes legal responsibilities harder to track.",
          pages: [96]
        },
        {
          id: "d5-considerations-a3", type: "recall", format: "Recall",
          front: "What do SOX and HIPAA cover, per the notes?",
          back: "SOX is the Public Company Accounting Reform and Investor Protection Act of 2002. HIPAA sets extensive healthcare standards for the storage, use and transmission of health care information.",
          pages: [96]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.1 Data roles
    {
      id: "d5-dataroles",
      objective: "5.1",
      section: "Data Roles and Responsibilities",
      title: "Data roles and responsibilities",
      pages: [96],
      lesson: {
        summary: [
          "Data responsibilities are high-level organizational relationships, not always technical.",
          "Data owner: accountable for specific data, often a senior officer (the VP of Sales owns customer relationship data; the treasurer owns financial information).",
          "Data controller: manages the purposes and means by which personal data is processed. Data processor: processes data on the controller's behalf, often a third party or another group.",
          "Example: the payroll department (controller) defines payroll amounts and timeframes; the payroll company (processor) runs payroll and stores employee information.",
          "Data custodian/steward: works directly with the data, responsible for accuracy, privacy and security. Applies sensitivity labels, ensures legal compliance, manages access rights and implements security controls."
        ],
        more: [
          "QA analogy: the product owner (data owner) decides what matters; the test lead (custodian) labels, guards and maintains the test data day to day."
        ],
        pages: [96]
      },
      activities: [
        {
          id: "d5-dataroles-a1", type: "match", format: "Match",
          prompt: "Match each person to their data role.",
          choices: ["Data owner", "Data controller", "Data processor", "Data custodian/steward"],
          items: [
            { t: "The treasurer, accountable for financial information", a: "Data owner", why: "Often a senior officer." },
            { t: "HR decides what personal data is processed for payroll and why", a: "Data controller", why: "Manages purposes and means." },
            { t: "An outside payroll firm that runs payroll for HR", a: "Data processor", why: "Processes on the controller's behalf." },
            { t: "The admin who applies sensitivity labels and manages access rights", a: "Data custodian/steward", why: "Works directly with the data." }
          ],
          hint: "Accountable, decides, does, maintains.",
          explain: "Owners are accountable, controllers decide, processors act, custodians maintain.",
          pages: [96]
        },
        {
          id: "d5-dataroles-a2", type: "choice", format: "Compare",
          prompt: "What's the key difference between a data controller and a data processor?",
          options: [
            { t: "The processor decides why data is processed", why: "That's the controller." },
            { t: "The controller manages purposes and means; the processor acts on the controller's behalf", ok: true, why: "Matches the notes." },
            { t: "They're the same role with different names; GDPR just uses processor for what others call controller", why: "The notes define them separately." },
            { t: "Only processors handle personal data", why: "Both deal with personal data." }
          ],
          hint: "Who decides vs. who does.",
          explain: "The payroll department is the controller; the payroll company is the processor.",
          pages: [96]
        },
        {
          id: "d5-dataroles-a3", type: "recall", format: "Recall",
          front: "List four responsibilities of a data custodian/steward.",
          back: "Associate sensitivity labels with the data, ensure compliance with applicable laws and standards, manage access rights, and implement security controls, keeping the data accurate, private and secure.",
          pages: [96]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.2 Risk management
    {
      id: "d5-riskmgmt",
      objective: "5.2",
      section: "Risk Management",
      title: "Risk management",
      pages: [97],
      lesson: {
        summary: [
          "Risk identification: the only certainty is uncertainty. Risk management finds weaknesses before they become issues, qualifies internal and external threats, and helps plan for contingencies. Growth brings risk.",
          "Performing a risk assessment: not all risk needs constant evaluation. One-time assessments fit projects like an acquisition, new equipment or a unique new threat. Continuous assessments are part of existing processes, such as change control.",
          "Ad hoc assessments happen when the situation requires and there's no formal process: the CEO returns from a conference asking about a new attack, a committee assesses it, then disbands.",
          "Recurring assessments occur at standard intervals, like an internal check every quarter, or are mandated: PCI DSS requires annual risk assessments."
        ],
        more: [],
        pages: [97]
      },
      activities: [
        {
          id: "d5-riskmgmt-a1", type: "match", format: "Match",
          prompt: "Match each situation to the type of risk assessment.",
          choices: ["One-time", "Continuous", "Ad hoc", "Recurring"],
          items: [
            { t: "Assessing risk for a company acquisition", a: "One-time", why: "Part of a one-time project." },
            { t: "Every change request includes a risk assessment", a: "Continuous", why: "Built into change control." },
            { t: "The CEO asks if you're protected from an attack they just heard about", a: "Ad hoc", why: "Performed when the situation requires." },
            { t: "An annual assessment required by PCI DSS", a: "Recurring", why: "Mandated at standard intervals." }
          ],
          hint: "Project, process, surprise, schedule.",
          explain: "Assessment timing depends on the trigger.",
          pages: [97]
        },
        {
          id: "d5-riskmgmt-a2", type: "choice", format: "Scenario",
          prompt: "After an ad hoc risk assessment is complete, what happens to the committee that ran it?",
          options: [
            { t: "It becomes the permanent change control board", why: "Not in the notes." },
            { t: "It's disbanded, since the risk may not need investigating again", ok: true, why: "Matches the notes' example." },
            { t: "It must meet every quarter", why: "That's a recurring assessment." },
            { t: "It reports to PCI DSS", why: "Unrelated." }
          ],
          hint: "Ad hoc means for this purpose.",
          explain: "Ad hoc assessments are one-off responses without a formal process.",
          pages: [97]
        },
        {
          id: "d5-riskmgmt-a3", type: "recall", format: "Recall",
          front: "What does risk management help an organization do?",
          back: "Understand potential risks and identify weaknesses before they become issues, qualify internal and external threats, and plan for contingencies through risk analysis.",
          pages: [97]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.2 Risk analysis
    {
      id: "d5-riskanalysis",
      objective: "5.2",
      section: "Risk Analysis",
      title: "Risk analysis",
      pages: [97, 98],
      lesson: {
        summary: [
          "Qualitative risk assessment: identify significant risk factors by asking opinions, and display them visually (for example, a traffic light grid).",
          "Quantitative risk assessment: ARO (annualized rate of occurrence, how often per year), AV (asset value, including sales impact and fines), EF (exposure factor, the fraction lost: .25 for a quarter, 1.0 for everything).",
          "SLE (single loss expectancy) = AV × EF. A stolen $1,000 laptop with EF 1.0 has an SLE of $1,000. ALE (annualized loss expectancy) = ARO × SLE: seven laptops a year × $1,000 = $7,000.",
          "Impact goes beyond money: life (most important), property, safety, finance and reputation. Likelihood is qualitative (rare, possible, almost certain); probability is quantitative and statistical, often from history. People use them interchangeably in casual talk.",
          "Risk appetite is the broad amount of risk accepted before acting to reduce it, with a posture of conservative, neutral or expansionary. Risk tolerance is the acceptable (usually larger) variance from it. The notes' analogy: the speed limit is the appetite; tickets well above it show the tolerance, which can shift with conditions."
        ],
        more: [
          "Risk register: for each project step, identify and document risks, apply solutions and monitor results. It includes key risk indicators, a risk owner for each indicator, and a risk threshold: the cost of mitigation is at least equal to the value gained by mitigation.",
          "QA analogy: a risk register is like a test plan's risk section, each risk with an owner and an exit criterion."
        ],
        pages: [97, 98]
      },
      activities: [
        {
          id: "d5-riskanalysis-a1", type: "choice", format: "Scenario",
          prompt: "A server worth $20,000 would lose half its value in a flood (EF 0.5). Floods hit twice a year (ARO 2). What's the ALE?",
          options: [
            { t: "$10,000", why: "That's the SLE (AV × EF)." },
            { t: "$20,000", ok: true, why: "SLE $10,000 × ARO 2 = $20,000." },
            { t: "$40,000", why: "That's AV × ARO, skipping the exposure factor." },
            { t: "$5,000", why: "That divides instead of multiplies." }
          ],
          hint: "SLE = AV × EF, then ALE = ARO × SLE.",
          explain: "$20,000 × 0.5 = $10,000 SLE; × 2 per year = $20,000 ALE.",
          pages: [97]
        },
        {
          id: "d5-riskanalysis-a2", type: "match", format: "Match",
          prompt: "Match each term to its meaning.",
          choices: ["ARO", "AV", "EF", "SLE", "ALE"],
          items: [
            { t: "How many times per year the event is expected", a: "ARO", why: "Annualized rate of occurrence." },
            { t: "What the asset is worth to the organization", a: "AV", why: "Asset value." },
            { t: "The fraction of value lost in one incident", a: "EF", why: "Exposure factor." },
            { t: "The cost of one event", a: "SLE", why: "Single loss expectancy = AV × EF." },
            { t: "The expected yearly loss", a: "ALE", why: "Annualized loss expectancy = ARO × SLE." }
          ],
          hint: "Rate, value, percentage, once, yearly.",
          explain: "These five terms make up quantitative risk assessment.",
          pages: [97]
        },
        {
          id: "d5-riskanalysis-a3", type: "choice", format: "Compare",
          prompt: "In the notes' speed limit analogy, what represents risk tolerance?",
          options: [
            { t: "The posted speed limit", why: "That's the risk appetite." },
            { t: "Ticketing only well above the posted limit, adjusted for conditions", ok: true, why: "Tolerance is the acceptable variance from the appetite." },
            { t: "The highest speed any car on that road is physically able to reach", why: "Not part of the analogy." },
            { t: "The cost of a speeding ticket", why: "Not part of the analogy." }
          ],
          hint: "The wiggle room.",
          explain: "Appetite is the target; tolerance is how far past it you'll accept.",
          pages: [98]
        },
        {
          id: "d5-riskanalysis-a4", type: "choice", format: "Next action",
          prompt: "You're building a risk register for a migration project. Each key risk indicator also needs what?",
          options: [
            { t: "A risk owner assigned to manage it", ok: true, why: "Each indicator gets someone to manage the risk." },
            { t: "A traffic light color only", why: "That's a qualitative display, not a register requirement." },
            { t: "A guarantee it won't happen", why: "Registers manage risk; they can't eliminate it." },
            { t: "Approval from PCI DSS", why: "Unrelated." }
          ],
          hint: "Somebody has to own it.",
          explain: "Risk registers track indicators, owners and thresholds.",
          pages: [98]
        },
        {
          id: "d5-riskanalysis-a5", type: "recall", format: "Recall",
          front: "What's the difference between risk likelihood and risk probability?",
          back: "Likelihood is qualitative (rare, possible, almost certain). Probability is quantitative and statistical, often based on historical performance. In casual conversation they're used interchangeably.",
          pages: [97]
        },
        {
          id: "d5-riskanalysis-a6", type: "recall", format: "Recall",
          front: "List the five impact categories from the notes, with the most important first.",
          back: "Life (most important), property, safety, finance and reputation.",
          pages: [97]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.2 Risk management strategies
    {
      id: "d5-riskstrategies",
      objective: "5.2",
      section: "Risk Management Strategies",
      title: "Risk management strategies",
      pages: [98],
      lesson: {
        summary: [
          "Transfer: move the risk to another party, for example by buying cybersecurity insurance.",
          "Accept: a business decision to take the risk, often the usual course. Accept with exemption: a security policy or regulation can't be followed (based on available controls, organization size, assets), and the exemption may need approval. Accept with exception: an internal policy isn't applied, such as extending a 3-day patch deadline because the update crashes critical software.",
          "Avoid: stop the high-risk activity, which effectively removes the risk. Mitigate: decrease the risk level, for example by investing in security systems.",
          "Risk reporting: a formal document identifying risks with details for each, usually for senior management to decide on resources, budget and security tasks. It commonly highlights critical and emerging risks."
        ],
        more: [
          "Layout note: on the page, Avoid, Mitigate and Risk reporting sit in the right column under Risk Management Strategies, though the text layer places them after the Business Impact Analysis heading."
        ],
        pages: [98]
      },
      activities: [
        {
          id: "d5-riskstrategies-a1", type: "match", format: "Match",
          prompt: "Match each response to its risk strategy.",
          choices: ["Transfer", "Accept", "Avoid", "Mitigate"],
          items: [
            { t: "Buy cybersecurity insurance", a: "Transfer", why: "Moves the risk to another party." },
            { t: "Decide the small risk is worth taking", a: "Accept", why: "A business decision." },
            { t: "Stop offering a high-risk service entirely", a: "Avoid", why: "Removes the risk." },
            { t: "Invest in an IPS to lower the risk", a: "Mitigate", why: "Decreases the risk level." }
          ],
          hint: "Pass it on, live with it, walk away, reduce it.",
          explain: "The four core strategies, with exemption and exception as forms of accept.",
          pages: [98]
        },
        {
          id: "d5-riskstrategies-a2", type: "choice", format: "Compare",
          prompt: "Monthly patches must go on within 3 days, but this month's crashes a critical app, so leadership extends the deadline. What is this?",
          options: [
            { t: "Accept with exception", ok: true, why: "An internal policy isn't applied; this is the notes' own example." },
            { t: "Accept with exemption", why: "Exemptions relate to an external policy or regulation that can't be followed." },
            { t: "Transfer", why: "No other party takes the risk." },
            { t: "Avoid", why: "The activity continues." }
          ],
          hint: "Internal policy, not regulation.",
          explain: "Exception: internal policy. Exemption: a policy or regulation that can't be followed.",
          pages: [98]
        },
        {
          id: "d5-riskstrategies-a3", type: "choice", format: "Scenario",
          prompt: "Who is the usual audience of a formal risk report?",
          options: [
            { t: "Every customer", why: "It's an internal document." },
            { t: "Senior management, to decide on resources and budget", ok: true, why: "Usually created for senior management." },
            { t: "Only the help desk, which uses it to prioritize tickets", why: "Not the intended audience." },
            { t: "Attackers, as a deterrent", why: "Definitely not." }
          ],
          hint: "Who controls budget?",
          explain: "Risk reports highlight critical and emerging risks for decision makers.",
          pages: [98]
        },
        {
          id: "d5-riskstrategies-a4", type: "recall", format: "Recall",
          front: "What might justify accepting a risk with an exemption?",
          back: "A security policy or regulation can't be followed, based on available security controls, the size of the organization, total assets and so on. The exemption may need approval.",
          pages: [98]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.2 Business impact analysis
    {
      id: "d5-bia",
      objective: "5.2",
      section: "Business Impact Analysis",
      title: "Business impact analysis",
      pages: [98],
      lesson: {
        summary: [
          "Recovery time objective (RTO): how long until you're back to a particular service level. You aren't up until both the database and the web server work.",
          "Recovery point objective (RPO): how much data loss is acceptable. If the restored database only has the last twelve months, that's how far back your data goes.",
          "Mean time to repair (MTTR): the average time to fix an issue, including diagnosis. Important for estimating cost and time of unplanned outages.",
          "Mean time between failures (MTBF): the time between outages, predicted or calculated from history as total uptime / number of breakdowns. Use it to plan for outages statistically."
        ],
        more: [
          "QA analogy: RTO is how long the build stays red; RPO is how many commits you'd lose if you restored last night's backup."
        ],
        pages: [98]
      },
      activities: [
        {
          id: "d5-bia-a1", type: "match", format: "Match",
          prompt: "Match each question to the metric that answers it.",
          choices: ["RTO", "RPO", "MTTR", "MTBF"],
          items: [
            { t: "How long until the service is back to its required level?", a: "RTO", why: "Recovery time objective." },
            { t: "How much data can we afford to lose?", a: "RPO", why: "Recovery point objective." },
            { t: "On average, how long does a fix take, including diagnosis?", a: "MTTR", why: "Mean time to repair." },
            { t: "On average, how long between outages?", a: "MTBF", why: "Mean time between failures." }
          ],
          hint: "Time to recover, point in time, repair, between.",
          explain: "RTO and RPO are objectives; MTTR and MTBF are measurements.",
          pages: [98]
        },
        {
          id: "d5-bia-a2", type: "choice", format: "Scenario",
          prompt: "A system ran 1,000 hours total and broke down 4 times. What's the MTBF?",
          options: [
            { t: "4 hours", why: "That's the number of breakdowns." },
            { t: "250 hours", ok: true, why: "Total uptime / number of breakdowns = 1,000 / 4." },
            { t: "4,000 hours", why: "That multiplies instead of divides." },
            { t: "1,004 hours", why: "That adds them." }
          ],
          hint: "Total uptime / number of breakdowns.",
          explain: "MTBF = 1,000 / 4 = 250 hours.",
          pages: [98]
        },
        {
          id: "d5-bia-a3", type: "choice", format: "Compare",
          prompt: "After a restore, the database is online but only holds the last twelve months of data. Which metric does this describe?",
          options: [
            { t: "RTO", why: "RTO is about time to recover." },
            { t: "MTTR", why: "That's repair time." },
            { t: "RPO", ok: true, why: "How far back the data goes after recovery." },
            { t: "ALE", why: "That's a yearly loss estimate." }
          ],
          hint: "How far back does data go?",
          explain: "RPO defines acceptable data loss.",
          pages: [98]
        },
        {
          id: "d5-bia-a4", type: "recall", format: "Recall",
          front: "According to the notes, when are you really 'up and running' for RTO purposes?",
          back: "Only when everything needed for the service level works, for example both the database and the web server are operational. RTO measures how long that took.",
          pages: [98]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.3 Third-party risk
    {
      id: "d5-thirdparty",
      objective: "5.3",
      section: "Third-party Risk Assessment",
      title: "Third-party risk assessment",
      pages: [99, 100],
      lesson: {
        summary: [
          "Third-party risk: every organization uses vendors (payroll, CRM, email marketing, travel) and often shares important data with them. Assess and categorize risk per vendor, and use contracts to set expectations and enforce a secure environment.",
          "Right-to-audit clauses put in the contract the option to perform a security audit at any time, so you can verify a partner's security before a breach.",
          "Evidence of internal audits: have a third party evaluate controls (access management, offboarding, passwords, VPN) at a reasonable frequency. It may be required for compliance, and it's a good idea anyway.",
          "Supply chain analysis evaluates how a product gets from supplier to customer: coordination, improvement areas, supporting IT systems and process changes. The notes' example: SolarWinds updates carried malware from March to June 2020 with a valid digital signature, announced December 2020, potentially affecting at least 18,000 of 300,000 customers.",
          "Vendor selection: due diligence (financial status, legal issues, background checks, interviews) and conflicts of interest (a partner also serving your biggest competitor, employing the CFO's brother, or offering gifts for signing)."
        ],
        more: [
          "Penetration testing and rules of engagement repeat from 4.3. Here the point is that regular third-party pentests are often a compliance mandate, sometimes a legal one, done by specialized experts.",
          "Independent assessments bring in an outside firm of specialists who've seen it all and can offer options you hadn't considered.",
          "Vendor monitoring continues after the contract is signed: regular financial health checks, IT security reviews, news and social media, with one person in charge of the relationship.",
          "Questionnaires get answers directly from the vendor (their due diligence process, disaster recovery plans, how your data is stored) and update the vendor risk analysis throughout the relationship."
        ],
        pages: [99, 100]
      },
      activities: [
        {
          id: "d5-thirdparty-a1", type: "choice", format: "Scenario",
          prompt: "You want the option to inspect a cloud vendor's security controls whenever you choose. What should the contract include?",
          options: [
            { t: "A right-to-audit clause", ok: true, why: "A legal agreement allowing a security audit at any time." },
            { t: "A memorandum of understanding", why: "An MOU is an informal letter of intent." },
            { t: "A conflict of interest disclosure only", why: "That doesn't grant audit rights." },
            { t: "A playbook", why: "Playbooks are internal procedures." }
          ],
          hint: "Audit, any time, in the contract.",
          explain: "Right-to-audit lets you verify security before a breach occurs.",
          pages: [99]
        },
        {
          id: "d5-thirdparty-a2", type: "choice", format: "Compare",
          prompt: "What made the SolarWinds incident in the notes so hard to catch?",
          options: [
            { t: "It used an unsigned installer that users ignored warnings about, so signature checks would have stopped it", why: "The malware had a valid digital signature." },
            { t: "Malware arrived inside a legitimate software update with a valid signature", ok: true, why: "A supply chain compromise." },
            { t: "It only affected one customer", why: "At least 18,000 were potentially impacted." },
            { t: "It was caught the same week", why: "Updates ran March to June 2020; it was announced in December." }
          ],
          hint: "Trusted source, trusted signature.",
          explain: "Supply chain analysis looks at risks introduced by trusted suppliers.",
          pages: [99]
        },
        {
          id: "d5-thirdparty-a3", type: "multi", format: "Investigate",
          prompt: "During vendor selection, which are conflicts of interest from the notes? Select all that apply.",
          options: [
            { t: "The vendor employs your CFO's brother", ok: true, why: "Listed." },
            { t: "The vendor offers gifts if the contract is signed", ok: true, why: "Listed." },
            { t: "The vendor also serves your largest competitor", ok: true, why: "Listed." },
            { t: "The vendor passed a financial health check", why: "That's due diligence, not a conflict." }
          ],
          hint: "A personal interest that could compromise judgment.",
          explain: "Conflicts of interest are checked alongside due diligence.",
          pages: [99]
        },
        {
          id: "d5-thirdparty-a4", type: "choice", format: "Next action",
          prompt: "A vendor contract was signed six months ago. What do the notes say about ongoing oversight?",
          options: [
            { t: "Oversight ends at signing", why: "It doesn't end when the contract is signed." },
            { t: "Run regular reviews, with one person in charge of the relationship", ok: true, why: "That's vendor monitoring." },
            { t: "Only review if the vendor asks", why: "Reviews should be regular." },
            { t: "Replace the vendor every six months so no single vendor ever builds up enough risk to matter", why: "Not what the notes suggest." }
          ],
          hint: "Vendor monitoring.",
          explain: "Financial checks, security reviews and news monitoring continue for the whole relationship.",
          pages: [99]
        },
        {
          id: "d5-thirdparty-a5", type: "recall", format: "Recall",
          front: "What are vendor questionnaires used for?",
          back: "Getting answers directly from the vendor (due diligence process, disaster recovery plans, how company data is stored) as part of due diligence and ongoing monitoring. The answers update the vendor risk analysis throughout the relationship.",
          pages: [100]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.3 Agreement types
    {
      id: "d5-agreements",
      objective: "5.3",
      section: "Agreement Types",
      title: "Agreement types",
      pages: [100],
      lesson: {
        summary: [
          "SLA (service level agreement): minimum service terms such as uptime and response time, between customers and providers. Example: no more than four hours of unscheduled downtime from an Internet provider.",
          "MOU (memorandum of understanding): both sides agree in general, usually stating common goals; an informal letter of intent, not a signed contract, but may include confidentiality. MOA (memorandum of agreement): the next step up, conditional agreement on objectives; can be legal but may lack enforceable promises.",
          "MSA (master service agreement): a legal contract setting a broad framework for future transactions. A work order (WO) / statement of work (SOW) lists the specific job under it: scope, location, deliverables, schedule and acceptance criteria.",
          "NDA (non-disclosure agreement): a formal, signed confidentiality contract protecting trade secrets and business activities. Unilateral (one-way) or bilateral/multilateral (mutual).",
          "BPA (business partners agreement): going into business together, covering owner stake, financials, who makes which decisions, and contingencies like financial issues and disaster recovery."
        ],
        more: [
          "QA analogy: the MSA is the framework contract; each SOW is a ticket with acceptance criteria. 'Was the job done properly? Check the SOW.'"
        ],
        pages: [100]
      },
      activities: [
        {
          id: "d5-agreements-a1", type: "match", format: "Match",
          prompt: "Match each agreement to its description.",
          choices: ["SLA", "MOU", "MSA", "SOW", "NDA"],
          items: [
            { t: "Guarantees uptime and response times", a: "SLA", why: "Minimum terms for services." },
            { t: "An informal letter of intent stating common goals", a: "MOU", why: "Not a signed contract." },
            { t: "A broad framework contract for future projects", a: "MSA", why: "Later work builds on it." },
            { t: "Lists deliverables, schedule and acceptance criteria for one job", a: "SOW", why: "Used with an MSA." },
            { t: "Keeps trade secrets confidential", a: "NDA", why: "A confidentiality contract." }
          ],
          hint: "Service level, intent, framework, job, secrets.",
          explain: "Each agreement fits a different stage and purpose.",
          pages: [100]
        },
        {
          id: "d5-agreements-a2", type: "choice", format: "Compare",
          prompt: "How does an MOA differ from an MOU?",
          options: [
            { t: "An MOA is the next step up: both sides conditionally agree to objectives", ok: true, why: "It can be a legal document, though it may lack enforceable promises." },
            { t: "An MOA is less formal than an MOU", why: "It's the step above." },
            { t: "An MOA is always a fully enforceable contract with legal language, unlike every other agreement type", why: "It may not contain legally enforceable promises." },
            { t: "They are identical", why: "The notes distinguish them." }
          ],
          hint: "Understanding → agreement.",
          explain: "MOU: general agreement. MOA: conditional agreement, more formal.",
          pages: [100]
        },
        {
          id: "d5-agreements-a3", type: "choice", format: "Scenario",
          prompt: "Two companies want to share secrets with each other during merger talks. Which agreement fits?",
          options: [
            { t: "A unilateral NDA", why: "That protects only one side." },
            { t: "A bilateral (mutual) NDA", ok: true, why: "Both sides' information is protected." },
            { t: "An SLA", why: "That covers service levels." },
            { t: "A work order", why: "That details a job." }
          ],
          hint: "Both directions.",
          explain: "Mutual NDAs protect information flowing both ways.",
          pages: [100]
        },
        {
          id: "d5-agreements-a4", type: "recall", format: "Recall",
          front: "What does a business partners agreement (BPA) cover?",
          back: "Going into business together: owner stake, the financial contract, who makes which business decisions (specific individuals and scope), and contingencies such as financial issues and disaster recovery.",
          pages: [100]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.4 Compliance
    {
      id: "d5-compliance",
      objective: "5.4",
      section: "Compliance",
      title: "Compliance",
      pages: [101],
      lesson: {
        summary: [
          "Compliance means meeting the standards of laws, policies and regulations, many industry-specific, domestic and international. Penalties include fines, loss of employment and incarceration.",
          "Compliance reporting: internal (monitoring compliance efforts, often under a Central Compliance Officer, also shared with customers or investors) and external (documentation for regulators, sometimes annual or ongoing; missing or invalid reports can bring fines or sanctions).",
          "Regulatory compliance examples: SOX (public company accounting, 2002), HIPAA (healthcare information), and GLBA (the Gramm-Leach-Bliley Act of 1999, privacy disclosures from financial institutions).",
          "Consequences beyond fines: reputational damage (stock drops after required disclosure), loss of license (can't sell, others can't buy from you, costly to re-license), and contractual impacts (deals requiring minimum compliance may be breached).",
          "Compliance monitoring: due care (internal activities) and due diligence (often third-party activities), both meaning act honestly and verify; attestation and acknowledgment (someone signs off and is responsible); internal and external monitoring; and automation, which large organizations must have."
        ],
        more: [
          "HIPAA non-compliance penalties in the notes range from fines up to $50,000 and/or one year in prison, up to $250,000 and/or ten years for intent to sell or misuse health information, plus civil fines of $100 per violation capped at $25,000 per identical requirement per year.",
          "The notes' Uber example: a breach in October 2016 exposed 25.6 million names, email addresses and phone numbers. Uber didn't announce it until November 2017, allegedly paid the hackers $100,000 and had them sign an NDA, paid $148 million in fines in 2018, and its former CSO was sentenced in May 2023 to three years' probation and a $50,000 fine."
        ],
        pages: [101]
      },
      activities: [
        {
          id: "d5-compliance-a1", type: "match", format: "Match",
          prompt: "Match each regulation to what it covers.",
          choices: ["SOX", "HIPAA", "GLBA"],
          items: [
            { t: "Accounting reform for public companies", a: "SOX", why: "Public Company Accounting Reform and Investor Protection Act of 2002." },
            { t: "Storage, use and transmission of health information", a: "HIPAA", why: "Healthcare standards." },
            { t: "Privacy disclosures from financial institutions", a: "GLBA", why: "Gramm-Leach-Bliley Act of 1999." }
          ],
          hint: "Accounting, health, banking.",
          explain: "Each regulation targets a different industry.",
          pages: [101]
        },
        {
          id: "d5-compliance-a2", type: "choice", format: "Compare",
          prompt: "According to the notes, how do due care and due diligence differ?",
          options: [
            { t: "Due care is about third-party activities and due diligence is about internal activities, the reverse of each other", why: "Reversed." },
            { t: "Due care tends to refer to internal activities; due diligence to third-party activities", ok: true, why: "That's the notes' distinction." },
            { t: "They're unrelated to compliance", why: "Both are part of compliance monitoring." },
            { t: "Due diligence means signing off on documents", why: "That's attestation." }
          ],
          hint: "Inside vs. outside.",
          explain: "Both mean acting honestly, in good faith, and verifying.",
          pages: [101]
        },
        {
          id: "d5-compliance-a3", type: "choice", format: "Scenario",
          prompt: "A company loses its license after compliance failures. What consequence do the notes describe?",
          options: [
            { t: "It can keep selling but pays a small fee", why: "It can't sell products." },
            { t: "It can't sell products, others can't buy from it, and re-licensing may be expensive", ok: true, why: "A significant economic sanction." },
            { t: "Only the stock price changes for a while, and normal sales continue without any interruption", why: "That's reputational damage." },
            { t: "Nothing, licenses are symbolic", why: "Loss of license is a major sanction." }
          ],
          hint: "Significant economic sanction.",
          explain: "Loss of license can halt business entirely.",
          pages: [101]
        },
        {
          id: "d5-compliance-a4", type: "choice", format: "Next action",
          prompt: "A manager signs off on the annual compliance report. What does that signature mean, per the notes?",
          options: [
            { t: "Nothing; signatures are a formality", why: "The signer is ultimately responsible." },
            { t: "They're ultimately responsible if the documentation is incorrect", ok: true, why: "That's attestation and acknowledgment." },
            { t: "Responsibility for the report's accuracy passes to the regulator once it's been submitted", why: "It stays with the signer." },
            { t: "The report no longer needs monitoring", why: "Compliance monitoring is ongoing." }
          ],
          hint: "Attestation.",
          explain: "Someone must sign off and own the accuracy.",
          pages: [101]
        },
        {
          id: "d5-compliance-a5", type: "recall", format: "Recall",
          front: "What made the notes' Uber breach example worse than the breach itself?",
          back: "Uber didn't publicly announce the October 2016 breach until November 2017 and allegedly paid the hackers $100,000 and had them sign an NDA. It paid $148 million in fines, and its former CSO was later sentenced.",
          pages: [101]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.4 Privacy
    {
      id: "d5-privacy",
      objective: "5.4",
      section: "Privacy",
      title: "Privacy",
      pages: [102],
      lesson: {
        summary: [
          "Privacy legal implications keep evolving: local/regional (state limits on legal records, vehicle registration, medical licensing), national (HIPAA, online privacy for children under 13), and global (countries working together).",
          "GDPR (General Data Protection Regulation) is EU regulation protecting individuals in the EU: name, address, photo, email, bank details, social posts, medical info, even a computer's IP address. It controls export of personal data, lets users decide where data goes and request removal from search engines, and gives a right to be forgotten.",
          "A data subject is any identified or identifiable natural person: everyone. Personal data includes name, ID number, address, genetic makeup, physical characteristics and location. Privacy is ideally defined from the data subject's perspective.",
          "Data inventory and retention: document all managed data with owner, update frequency and format. Internal use covers collaboration, security and quality checks; external use means sharing selected data publicly within the law."
        ],
        more: [
          "Data responsibilities and data roles (owner, controller, processor, payroll example) repeat here from 5.1 Data Roles and Responsibilities."
        ],
        pages: [102]
      },
      activities: [
        {
          id: "d5-privacy-a1", type: "choice", format: "Scenario",
          prompt: "An EU resident asks a company to delete their personal data and remove it from search results. Which regulation gives them this right?",
          options: [
            { t: "SOX", why: "That's public company accounting." },
            { t: "GLBA", why: "That's U.S. financial institution privacy." },
            { t: "GDPR", ok: true, why: "It gives data subjects a right to be forgotten." },
            { t: "PCI DSS", why: "That's payment cards." }
          ],
          hint: "European Union.",
          explain: "GDPR gives data subjects control over their personal data.",
          pages: [102]
        },
        {
          id: "d5-privacy-a2", type: "multi", format: "Investigate",
          prompt: "Which count as personal data under GDPR, per the notes? Select all that apply.",
          options: [
            { t: "A computer's IP address", ok: true, why: "Listed." },
            { t: "Posts on social networking sites", ok: true, why: "Listed." },
            { t: "Bank details", ok: true, why: "Listed." },
            { t: "A company's quarterly revenue total", why: "That's not data about an identifiable person." }
          ],
          hint: "Relates to an identifiable person.",
          explain: "GDPR's definition of personal data is broad.",
          pages: [102]
        },
        {
          id: "d5-privacy-a3", type: "choice", format: "Compare",
          prompt: "Who is a data subject?",
          options: [
            { t: "Only employees of the data controller", why: "It includes everyone." },
            { t: "Any identified or identifiable natural person", ok: true, why: "You are a data subject." },
            { t: "Only people outside the EU", why: "Not a limit in the definition." },
            { t: "The database administrator", why: "That's a role, not the definition." }
          ],
          hint: "You.",
          explain: "Privacy is ideally defined from the data subject's perspective.",
          pages: [102]
        },
        {
          id: "d5-privacy-a4", type: "recall", format: "Recall",
          front: "What should a data inventory record for each data set?",
          back: "A listing of all managed data with its owner, update frequency and data format, plus how it's used internally (collaboration, security, quality checks) and externally (data shared publicly, following the law).",
          pages: [102]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.5 Audits and assessments
    {
      id: "d5-audits",
      objective: "5.5",
      section: "Audits and Assessments",
      title: "Audits and assessments",
      pages: [102, 103],
      lesson: {
        summary: [
          "Audits and assessments aren't just for taxes. A cybersecurity audit examines infrastructure, software and devices, checks policy effectiveness, and finds vulnerabilities before attackers, internally or by a third party.",
          "Attestation: an auditor gives an opinion on the truth or accuracy of a company's security posture.",
          "Internal audits: check compliance with regulatory or industry requirements; an audit committee oversees risk management (all audits start and stop with it); self-assessments are consolidated into ongoing reports.",
          "External audits: regulations may require an independent third party, with type and frequency set by the regulation. Examinations involve hands-on research (records, reports, details). Assessments evaluate current activities and may recommend improvements."
        ],
        more: [],
        pages: [102, 103]
      },
      activities: [
        {
          id: "d5-audits-a1", type: "match", format: "Match",
          prompt: "Match each audit term to its description.",
          choices: ["Attestation", "Audit committee", "Self-assessment", "Examination"],
          items: [
            { t: "An auditor's opinion on the accuracy of your security posture", a: "Attestation", why: "An opinion of truth or accuracy." },
            { t: "Oversees risk management; all audits start and stop here", a: "Audit committee", why: "Internal oversight." },
            { t: "The organization runs its own checks for ongoing reports", a: "Self-assessment", why: "Consolidated into ongoing reports." },
            { t: "Hands-on research into records during an external audit", a: "Examination", why: "View records, compile reports." }
          ],
          hint: "Opinion, oversight, own checks, hands-on.",
          explain: "Internal and external audits each have their own parts.",
          pages: [102, 103]
        },
        {
          id: "d5-audits-a2", type: "choice", format: "Scenario",
          prompt: "A regulation requires a yearly audit by someone outside your company. What kind of audit is this?",
          options: [
            { t: "A self-assessment consolidated into the audit committee's ongoing reports", why: "That's done by your own organization." },
            { t: "An external audit by an independent third party", ok: true, why: "Regulations may require this, with set type and frequency." },
            { t: "A tabletop exercise", why: "That's incident planning." },
            { t: "A playbook review", why: "Not an audit type." }
          ],
          hint: "Independent.",
          explain: "External audits are often driven by regulatory requirements.",
          pages: [103]
        },
        {
          id: "d5-audits-a3", type: "recall", format: "Recall",
          front: "What does a cybersecurity audit examine?",
          back: "The IT infrastructure, software and devices; the effectiveness of policies and procedures; and vulnerabilities, found before attackers find them. It can be done internally or by a third party.",
          pages: [102]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.5 Penetration tests
    {
      id: "d5-pentests",
      objective: "5.5",
      section: "Penetration Tests",
      title: "Penetration tests",
      pages: [103],
      lesson: {
        summary: [
          "Physical penetration testing: OS security can be bypassed physically (modify the boot process, boot other media, replace OS files), so test physical security: can you get in without a key, and what's reachable inside (doors, windows, elevators, processes)?",
          "Pentesting perspectives: offensive (red team, attacks and exploits), defensive (blue team, identifies attacks in real time and prevents access), and integrated (an ongoing cycle of finding, patching and retesting).",
          "Working knowledge: known environment (full disclosure), partially known (a mix, focused on certain systems), unknown environment (a 'blind' test where the tester knows nothing).",
          "Reconnaissance comes first: build a digital footprint, understand the security posture, focus on key systems, and map routers, networks and remote sites.",
          "Passive reconnaissance uses open sources and is hard to detect: social media, the corporate site, forums and Reddit, social engineering, dumpster diving, business organizations. Active reconnaissance 'tries the doors' and is visible in traffic and logs: ping and port scans, DNS queries, OS fingerprinting, service and version scans."
        ],
        more: [],
        pages: [103]
      },
      activities: [
        {
          id: "d5-pentests-a1", type: "match", format: "Match",
          prompt: "Sort each technique into passive or active reconnaissance.",
          choices: ["Passive", "Active"],
          items: [
            { t: "Reading the company's social media", a: "Passive", why: "Open sources." },
            { t: "Dumpster diving", a: "Passive", why: "Listed under passive." },
            { t: "Port scanning the perimeter", a: "Active", why: "Visible on network traffic and logs." },
            { t: "OS fingerprinting", a: "Active", why: "Touches the target systems." },
            { t: "Browsing online forums about the company", a: "Passive", why: "Open sources." }
          ],
          hint: "Does it touch the target's systems?",
          explain: "Passive recon is hard to detect; active recon is relatively easy to see.",
          pages: [103]
        },
        {
          id: "d5-pentests-a2", type: "choice", format: "Scenario",
          prompt: "A tester is given no information at all about the target systems. What type of test is this?",
          options: [
            { t: "Known environment", why: "That's full disclosure." },
            { t: "Partially known environment", why: "That's a mix." },
            { t: "Unknown environment", ok: true, why: "A 'blind' test." },
            { t: "Integrated", why: "That's a team perspective." }
          ],
          hint: "Blind.",
          explain: "Working knowledge ranges from full disclosure to none.",
          pages: [103]
        },
        {
          id: "d5-pentests-a3", type: "match", format: "Match",
          prompt: "Match each team to its pentesting perspective.",
          choices: ["Red team", "Blue team", "Integrated"],
          items: [
            { t: "Attacks systems looking for vulnerabilities to exploit", a: "Red team", why: "Offensive." },
            { t: "Identifies attacks in real time and blocks access", a: "Blue team", why: "Defensive." },
            { t: "Runs a continuous cycle of finding, patching and retesting", a: "Integrated", why: "An ongoing process." }
          ],
          hint: "Attack, defend, both.",
          explain: "Offensive, defensive and integrated perspectives.",
          pages: [103]
        },
        {
          id: "d5-pentests-a4", type: "choice", format: "Compare",
          prompt: "Why does physical penetration testing matter even with strong OS security?",
          options: [
            { t: "Physical access can bypass OS security by changing the boot process or OS files", ok: true, why: "That's the notes' point." },
            { t: "Physical tests replace the need for network tests, so the red team can skip scanning and reconnaissance", why: "They complement them." },
            { t: "OS security only works on weekdays", why: "Not a thing." },
            { t: "Because elevators run the operating system", why: "No." }
          ],
          hint: "Boot from other media.",
          explain: "Physical security is key: keep unauthorized people away from the hardware.",
          pages: [103]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.6 Security awareness
    {
      id: "d5-awareness",
      objective: "5.6",
      section: "Security Awareness",
      title: "Security awareness",
      pages: [104],
      lesson: {
        summary: [
          "Phishing campaigns: send your own phishing email to employees through an automated process with central reporting of clicks and immediate feedback or training. Teach users to recognize phishing (spelling and grammar errors, domain and email inconsistencies, unusual attachments, requests for personal information), never click links or run attachments, and use a reporting process.",
          "Anomalous behavior recognition: risky (modifying the hosts file, replacing a core OS file, uploading sensitive files), unexpected (logon from another country, more data transfers), and unintentional (typing the wrong domain, misplacing USB drives, misconfiguring security settings).",
          "Reporting and monitoring: track metrics automatically (phishing click rates, password manager adoption, MFA use, password sharing). A first occurrence is a training opportunity; recurring monitoring finds high-frequency issues and users who need more help.",
          "Development: build a security awareness team, set a minimum awareness level (delivery methods, depth by job function), integrate compliance mandates (PCI DSS, HIPAA, GDPR), and define metrics to improve weak areas.",
          "Execution: create materials, document how you'll measure success, identify stakeholders and share metrics, deploy (classes, posters, weekly emails), and track training, usually with automated reporting."
        ],
        more: [],
        pages: [104]
      },
      activities: [
        {
          id: "d5-awareness-a1", type: "match", format: "Match",
          prompt: "Classify each behavior using the notes' categories.",
          choices: ["Risky", "Unexpected", "Unintentional"],
          items: [
            { t: "A user edits the hosts file", a: "Risky", why: "Listed as risky behavior." },
            { t: "A logon from another country", a: "Unexpected", why: "Listed as unexpected." },
            { t: "Someone mistypes a domain name", a: "Unintentional", why: "Listed as unintentional." },
            { t: "Uploading sensitive files", a: "Risky", why: "Listed as risky." },
            { t: "Losing a USB drive", a: "Unintentional", why: "Misplacing USB drives." }
          ],
          hint: "Deliberate but dangerous, surprising, or accidental?",
          explain: "Awareness training helps users and analysts spot all three.",
          pages: [104]
        },
        {
          id: "d5-awareness-a2", type: "multi", format: "Investigate",
          prompt: "Which signs of phishing do the notes teach users to recognize? Select all that apply.",
          options: [
            { t: "Spelling and grammatical errors", ok: true, why: "Listed." },
            { t: "Domain name and email inconsistencies", ok: true, why: "Listed." },
            { t: "Requests for personal information", ok: true, why: "Listed." },
            { t: "A message from a known colleague with no links or attachments, about a meeting you scheduled", why: "Nothing here matches the warning signs." }
          ],
          hint: "One is an ordinary message.",
          explain: "Also watch for unusual attachments, and report anything suspicious.",
          pages: [104]
        },
        {
          id: "d5-awareness-a3", type: "choice", format: "Next action",
          prompt: "An employee clicks a simulated phishing link for the first time. What do the notes suggest?",
          options: [
            { t: "Treat it as an opportunity for user training", ok: true, why: "A first occurrence is a training opportunity." },
            { t: "Terminate their account immediately", why: "Not the guidance." },
            { t: "Ignore it because it was only a simulation", why: "The point is learning from it." },
            { t: "Stop running phishing campaigns", why: "They're how you find out." }
          ],
          hint: "Initial occurrence.",
          explain: "Immediate feedback and training; recurring issues get extra help.",
          pages: [104]
        },
        {
          id: "d5-awareness-a4", type: "recall", format: "Recall",
          front: "Name three security awareness metrics the notes suggest tracking.",
          back: "Any three of: phishing click rates, password manager adoption, MFA use, and password sharing. Tracking is usually automated.",
          pages: [104]
        }
      ]
    },

    // ------------------------------------------------------------------ 5.6 User training
    {
      id: "d5-training",
      objective: "5.6",
      section: "User Training",
      title: "User training",
      pages: [105],
      lesson: {
        summary: [
          "Security awareness training happens before granting access, with specialized training for each role's responsibilities. It applies to third parties too (contractors, partners, suppliers). Keep detailed records, because problems later can be severe for everyone.",
          "Policy/handbooks document all security requirements, available online and referenced in the employee handbook. Situational awareness: always watch for threats, both software (links, attachments, odd URLs, texts) and physical (a USB drive in a delivery envelope, unlocked doors).",
          "Insider threats are hard to guard against: require multiple approvals for critical processes and monitor files and systems so unauthorized changes are very difficult.",
          "Password management: guide users with standard length and complexity, often enforced by technology like Group Policy. Removable media and cables: unknown USB drives can carry malware, and unknown cables can connect to malicious systems.",
          "Social engineering needs extensive, ongoing training because attackers are good and users are the front line. Operational security means seeing from the attacker's view and keeping sensitive data private. Hybrid/remote work adds risks, so add endpoint security, VPN policies, and no access for family and friends."
        ],
        more: [],
        pages: [105]
      },
      activities: [
        {
          id: "d5-training-a1", type: "choice", format: "Scenario",
          prompt: "A USB drive arrives in a delivery envelope labeled 'Q4 bonuses'. What does user training say to do?",
          options: [
            { t: "Plug it in to see who it belongs to", why: "Unknown USB drives can contain malware." },
            { t: "Don't connect it; report it as a possible physical attack", ok: true, why: "Situational awareness covers physical attacks like this." },
            { t: "Give it to a colleague in IT so they can plug it in and check it on their own workstation", why: "That just moves the risk." },
            { t: "Format it and keep it", why: "Plugging it in at all is the risk." }
          ],
          hint: "Be ready for anything.",
          explain: "Unknown media and cables are a classic physical attack.",
          pages: [105]
        },
        {
          id: "d5-training-a2", type: "choice", format: "Compare",
          prompt: "Which control do the notes recommend against insider threats?",
          options: [
            { t: "Multiple approvals for critical processes", ok: true, why: "It should be very difficult to make an unauthorized change." },
            { t: "Trust long-time employees completely", why: "Insiders are hard to guard against, so add checks." },
            { t: "Remove all monitoring to build trust", why: "Monitor files and systems as much as possible." },
            { t: "Give everyone admin rights so they don't need approvals", why: "The opposite of what's needed." }
          ],
          hint: "More than one person.",
          explain: "Approvals plus monitoring make unauthorized changes hard.",
          pages: [105]
        },
        {
          id: "d5-training-a3", type: "multi", format: "Investigate",
          prompt: "Which are hybrid/remote work measures from the notes? Select all that apply.",
          options: [
            { t: "Additional endpoint security", ok: true, why: "Listed." },
            { t: "Security policies for VPN access", ok: true, why: "Listed." },
            { t: "No access for family and friends", ok: true, why: "Listed." },
            { t: "Sharing work laptops with household members", why: "That contradicts the guidance." }
          ],
          hint: "One option invites the household in.",
          explain: "Working at home brings unusual risks that need specific controls.",
          pages: [105]
        },
        {
          id: "d5-training-a4", type: "recall", format: "Recall",
          front: "Who needs security awareness training, and when?",
          back: "Users before they're given access, with specialized training for each role, and third parties too (contractors, partners, suppliers). Keep detailed records of it.",
          pages: [105]
        }
      ]
    }
  ]
});
