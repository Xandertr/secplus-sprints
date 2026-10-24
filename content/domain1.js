/*
 * Domain 1.0 - General Security Concepts
 * Source: Professor Messer SY0-701 Course Notes v1.07, PDF pages 10-26 (printed pages 1-17).
 * All lessons and questions are original wording. "pages" are PDF page numbers
 * (printed page = PDF page - 9).
 *
 * Activity types: choice | multi | match | order | recall  (see content/README.md)
 */
window.SECPLUS = window.SECPLUS || {};
(window.SECPLUS.content = window.SECPLUS.content || []).push({
  domain: "d1",
  topics: [
    // ------------------------------------------------------------------ 1.1
    {
      id: "d1-controls",
      objective: "1.1",
      section: "Security Controls",
      title: "Security controls",
      pages: [10, 11],
      lesson: {
        summary: [
          "Every control can be described two ways: its category (how it's implemented) and its type (what job it does).",
          "Categories: technical (systems do it), managerial (policies and design decisions), operational (people do it), physical (limit physical access).",
          "Types: preventive blocks, deterrent discourages, detective finds and logs, corrective fixes after the fact, compensating fills in when the normal control isn't possible, directive tells people what to do.",
          "These lists overlap. One control can fit more than one type, and real organizations mix them differently."
        ],
        more: [
          "QA analogy: a failing pre-merge check that blocks a PR is preventive. A nightly scan that files a ticket is detective. Rolling back a bad deploy is corrective.",
          "Directive controls are considered relatively weak because they rely on people following instructions.",
          "Compensating controls are often temporary: you can't patch yet, so you wall the system off until you can."
        ],
        pages: [10, 11]
      },
      activities: [
        {
          id: "d1-controls-a1", type: "match", format: "Match",
          prompt: "Match each control to its control type.",
          choices: ["Preventive", "Deterrent", "Detective", "Corrective", "Compensating", "Directive"],
          items: [
            { t: "A firewall rule blocks inbound traffic to the staging database port", a: "Preventive", why: "It stops the access outright." },
            { t: "A login banner warns that all admin-portal activity is monitored", a: "Deterrent", why: "It discourages misuse but doesn't block anyone." },
            { t: "A nightly job reviews authentication logs and flags anomalies", a: "Detective", why: "It finds and records issues; it doesn't stop them." },
            { t: "The team restores a test database from backup after ransomware", a: "Corrective", why: "It reverses the impact after an event." },
            { t: "A vulnerable app is blocked at the firewall until the vendor ships a patch", a: "Compensating", why: "It substitutes for the control you can't apply yet (patching)." },
            { t: "A wiki page says test credentials must be kept only in the vault folder", a: "Directive", why: "It directs people toward compliance and relies on them following it." }
          ],
          hint: "Ask what the control actually does at the moment of an attack: stop it, discourage it, notice it, fix it, stand in for something, or instruct people.",
          explain: "Control type is about function. The same tool can land in a different type depending on how it's used.",
          pages: [10]
        },
        {
          id: "d1-controls-a2", type: "match", format: "Match",
          prompt: "Match each control to its control category.",
          choices: ["Technical", "Managerial", "Operational", "Physical"],
          items: [
            { t: "Anti-malware installed on every CI build agent", a: "Technical", why: "A system enforces it." },
            { t: "A written standard operating procedure for granting prod access", a: "Managerial", why: "Policies and procedures belong to the managerial (administrative) category." },
            { t: "A security awareness program run by the security team", a: "Operational", why: "People carry it out, not systems." },
            { t: "A badge reader on the server room door", a: "Physical", why: "It limits physical access to a space." }
          ],
          hint: "Who or what carries out the control: software, a policy document, a person, or a barrier?",
          explain: "Category describes how a control is implemented, not what it achieves.",
          pages: [10]
        },
        {
          id: "d1-controls-a3", type: "choice", format: "Scenario",
          prompt: "A legacy test server can't be patched for three months. Until then, the team moves it to an isolated VLAN with tight firewall rules. Which control type best describes the VLAN isolation?",
          options: [
            { t: "Compensating", ok: true, why: "The normal control (patching) isn't possible yet, so another measure stands in for it, probably temporarily." },
            { t: "Corrective control", why: "Corrective controls act after an event to reverse damage. Nothing has happened yet here." },
            { t: "Deterrent", why: "Deterrents discourage attackers without blocking them. Isolation actually restricts access." },
            { t: "Directive", why: "Directive controls instruct people. This one is enforced by the network." }
          ],
          hint: "The real fix isn't available yet. What do you call a stand-in?",
          explain: "Compensating controls use other means when the existing control isn't enough or can't be applied.",
          pages: [10]
        },
        {
          id: "d1-controls-a4", type: "choice", format: "Compare",
          prompt: "Which pair is the most commonly confused, and how do you tell them apart?",
          options: [
            { t: "Deterrent vs. preventive: one discourages, the other blocks", ok: true, why: "A warning sign deters. A locked door prevents. Ask whether access is actually stopped." },
            { t: "Detective vs. corrective: one blocks, the other discourages", why: "Neither blocks nor discourages. Detective finds problems and corrective fixes them." },
            { t: "Technical vs. physical: one is a type, the other is a category", why: "Both are categories, so this is the wrong distinction." },
            { t: "Managerial vs. directive: they are two names for one thing", why: "Managerial is a category and directive is a type. A policy can be both, but they aren't the same idea." }
          ],
          hint: "Think about a posted warning sign versus a locked gate.",
          explain: "Deterrent controls make an attacker think twice but don't directly prevent access. Preventive controls block access.",
          pages: [10]
        },
        {
          id: "d1-controls-a5", type: "recall", format: "Recall",
          front: "What's the difference between a control category and a control type? Name the four categories.",
          back: "Category is how the control is implemented: technical, managerial, operational, physical. Type is what it does: preventive, deterrent, detective, corrective, compensating, directive.",
          hint: "One answers 'how', the other answers 'what job'.",
          pages: [10, 11]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.2 CIA
    {
      id: "d1-cia",
      objective: "1.2",
      section: "The CIA Triad",
      title: "The CIA triad",
      pages: [11],
      lesson: {
        summary: [
          "Confidentiality: only the right people or systems can see the data. Tools include encryption, access controls and extra authentication factors.",
          "Integrity: data stays as intended, and any change can be detected. Tools include hashing, digital signatures, certificates and non-repudiation.",
          "Availability: authorized users can reach it when they need it. Tools include redundancy, fault tolerance and patching.",
          "You'll also see it called the AIC triad."
        ],
        more: [
          "QA analogy: a test asserting a response checksum is an integrity check. A health check plus failover is availability. Masking secrets in CI logs is confidentiality.",
          "Patching sits under availability in the notes because it improves stability as well as closing security holes."
        ],
        pages: [11]
      },
      activities: [
        {
          id: "d1-cia-a1", type: "match", format: "Match",
          prompt: "Match each technique to the part of the CIA triad it mainly supports.",
          choices: ["Confidentiality", "Integrity", "Availability"],
          items: [
            { t: "Encrypting API traffic so eavesdroppers can't read it", a: "Confidentiality", why: "It prevents disclosure to unauthorized parties." },
            { t: "Hashing a release artifact to detect tampering", a: "Integrity", why: "A changed file produces a different hash." },
            { t: "Running two load-balanced instances of the auth service", a: "Availability", why: "Redundancy keeps the service up if one node fails." },
            { t: "Restricting the prod log bucket to the on-call role", a: "Confidentiality", why: "Access controls limit who can see data." },
            { t: "Digitally signing a configuration bundle", a: "Integrity", why: "Any change invalidates the signature." },
            { t: "Applying OS patches to keep servers stable", a: "Availability", why: "The notes list patching under availability for stability." }
          ],
          hint: "Ask: is this about who can see it, whether it changed, or whether it's reachable?",
          explain: "Most controls map to one primary pillar, even if they touch others.",
          pages: [11]
        },
        {
          id: "d1-cia-a2", type: "choice", format: "Scenario",
          prompt: "A contract test shows an order total of 100.00 leaving the API and 1.00 arriving at the client, and nothing flagged the change. Which part of the triad failed?",
          options: [
            { t: "Integrity", ok: true, why: "Data was modified in transit without detection." },
            { t: "Confidentiality", why: "Nothing says the data was exposed to someone unauthorized." },
            { t: "Availability", why: "The service responded. It just returned altered data." },
            { t: "Accounting", why: "Accounting belongs to AAA, not the CIA triad." }
          ],
          hint: "The data arrived, but was it what was sent?",
          explain: "Integrity means modifications can't happen without being detected.",
          pages: [11]
        },
        {
          id: "d1-cia-a3", type: "choice", format: "Next action",
          prompt: "Your test environment's only database node keeps crashing and blocks the whole team. You want the environment to keep working even when one node fails. What's the best next step?",
          options: [
            { t: "Add a redundant node for fault tolerance", ok: true, why: "Fault tolerance keeps the system running through a failure." },
            { t: "Encrypt the database so failures don't expose data", why: "Encryption protects confidentiality, not uptime." },
            { t: "Hash every table so you can tell when rows change", why: "Hashing supports integrity, but the problem here is downtime." },
            { t: "Require MFA for every connection to the database server", why: "MFA strengthens authentication. It does nothing for crashes." }
          ],
          hint: "The problem is 'can't reach it'. Which pillar is that?",
          explain: "This is an availability problem, so redundancy and fault tolerance are the tools.",
          pages: [11]
        },
        {
          id: "d1-cia-a4", type: "recall", format: "Recall",
          front: "Give one tool for each part of the CIA triad.",
          back: "Confidentiality: encryption, access controls, 2FA. Integrity: hashing, digital signatures, certificates. Availability: redundancy, fault tolerance, patching.",
          pages: [11]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.2 Non-repudiation
    {
      id: "d1-nonrep",
      objective: "1.2",
      section: "Non-repudiation",
      title: "Non-repudiation",
      pages: [12],
      lesson: {
        summary: [
          "Non-repudiation means the sender can't credibly deny sending something, like a signature on a contract.",
          "A hash on its own proves integrity: if the data changes, the hash changes. It doesn't tell you who created the data.",
          "A digital signature adds proof of origin. The sender hashes the message and encrypts that hash with their private key. Anyone can verify it with the sender's public key.",
          "The message itself doesn't have to be encrypted for a signature to work."
        ],
        more: [
          "The notes' encyclopedia example: hash an 8.1 MB encyclopedia file, change a single character, and the hash comes out completely different. That's how a hash exposes changed data.",
          "Verifying works like this: decrypt the signature with the sender's public key to get the original hash, hash the received message yourself, and compare. If they match, the message is unchanged and came from the private key holder.",
          "QA analogy: a signed Git commit or a signed container image. You check who produced it, not just that it's unchanged."
        ],
        pages: [12]
      },
      activities: [
        {
          id: "d1-nonrep-a1", type: "order", format: "Order",
          prompt: "Put the digital signature steps in order, from Alice signing to Bob verifying.",
          steps: [
            { t: "Alice hashes the plaintext message", why: "The signature is built from a hash of the message." },
            { t: "Alice encrypts that hash with her private key", why: "Only Alice holds the private key, so only she can produce this." },
            { t: "Alice sends the plaintext with the signature attached", why: "The encrypted hash is the digital signature." },
            { t: "Bob decrypts the signature with Alice's public key", why: "This recovers the hash Alice computed." },
            { t: "Bob hashes the plaintext he received", why: "He needs his own hash to compare against." },
            { t: "Bob compares the two hashes", why: "A match means the message is unchanged and came from Alice." }
          ],
          hint: "Signing happens on Alice's side with her private key. Verifying happens on Bob's side with her public key.",
          explain: "Sign by hashing and then encrypting the hash with the private key. Verify by decrypting with the public key, re-hashing and comparing.",
          pages: [12]
        },
        {
          id: "d1-nonrep-a2", type: "choice", format: "Compare",
          prompt: "Which key does the sender use to create a digital signature?",
          options: [
            { t: "The sender's private key", ok: true, why: "Only the sender has it, which is what gives non-repudiation." },
            { t: "The sender's public key", why: "Anyone can have the public key, so it can't prove who signed. It's used to verify." },
            { t: "The recipient's public key", why: "That key is for encrypting a message to the recipient, not for signing." },
            { t: "The recipient's private key", why: "The sender never has the recipient's private key." }
          ],
          hint: "Which key does only one person hold?",
          explain: "Sign with your private key, and others verify with your public key.",
          pages: [12]
        },
        {
          id: "d1-nonrep-a3", type: "choice", format: "Scenario",
          prompt: "A download page lists a SHA-256 hash next to a test-tool installer. Your downloaded file's hash matches. What does that match prove on its own?",
          options: [
            { t: "The file matches the one the hash was made from", ok: true, why: "A hash proves the data hasn't changed relative to that hash." },
            { t: "The vendor personally signed and released the file", why: "A plain hash isn't tied to an identity. That's what a signature adds." },
            { t: "The file is free of malware", why: "A hash says nothing about whether the original was safe." },
            { t: "Nobody else can ever deny publishing the file", why: "Non-repudiation needs a digital signature, not just a hash." }
          ],
          hint: "Think fingerprint versus signature.",
          explain: "Hashes give integrity. They don't associate data with a person.",
          pages: [12]
        },
        {
          id: "d1-nonrep-a4", type: "recall", format: "Recall",
          front: "A digital signature proves three things. What are they?",
          back: "Integrity (the message wasn't changed), authentication (proof of who sent it) and non-repudiation (the signature isn't fake, so the sender can't deny it).",
          pages: [12]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.2 AAA
    {
      id: "d1-aaa",
      objective: "1.2",
      section: "Authentication, Authorization, and Accounting",
      title: "Authentication, authorization, and accounting (AAA)",
      pages: [13],
      lesson: {
        summary: [
          "Identification: who you claim to be, usually a username.",
          "Authentication: proving that claim with a password or other factors.",
          "Authorization: what you're allowed to access once you're verified.",
          "Accounting: recording what was used, such as login time, data sent and received, and logout time."
        ],
        more: [
          "Devices can't type passwords. A common answer is a certificate signed by the organization's own CA, installed on the device and validated by the CA's signature.",
          "Mapping individual users directly to resources doesn't scale and is hard to reason about. An authorization model (roles, organizations, attributes) sits in the middle and simplifies administration.",
          "QA analogy: identification is the test user ID, authentication is the login step, authorization is the role-based permission check, and accounting is the audit log you assert against."
        ],
        pages: [13]
      },
      activities: [
        {
          id: "d1-aaa-a1", type: "order", format: "Order",
          prompt: "A service account logs in to a test API. Put these in the order they happen.",
          steps: [
            { t: "The account presents the username svc-e2e", why: "Identification is the claim." },
            { t: "It proves the claim with its credential", why: "Authentication verifies the claim." },
            { t: "The API grants read-only access to the test project", why: "Authorization decides what's allowed." },
            { t: "The gateway logs login time and bytes transferred", why: "Accounting records usage." }
          ],
          hint: "Claim, prove, permit, record.",
          explain: "Identification, then authentication, then authorization, then accounting.",
          pages: [13]
        },
        {
          id: "d1-aaa-a2", type: "choice", format: "Next action",
          prompt: "Fifty self-hosted CI runners need VPN access. No human is there to type a password, and you don't want shared passwords stored in pipeline config. What's the best approach?",
          options: [
            { t: "Issue each runner a CA-signed device certificate", ok: true, why: "Certificates let devices authenticate, validated by the CA's signature." },
            { t: "Store one shared VPN password as a masked pipeline variable", why: "That's exactly the stored shared secret you wanted to avoid." },
            { t: "Allow the runner subnet onto the VPN without login", why: "That removes authentication entirely." },
            { t: "Have all runners log in as a single admin account", why: "That's weak authentication, and accounting can't tell runners apart." }
          ],
          hint: "The notes describe how to authenticate a system that can't type.",
          explain: "Device certificates signed by an internal CA are the standard way to authenticate systems.",
          pages: [13]
        },
        {
          id: "d1-aaa-a3", type: "choice", format: "Scenario",
          prompt: "Your team grants permissions to people one at a time, and nobody can explain why half the access exists. What does an authorization model change?",
          options: [
            { t: "It puts roles between users and resources", ok: true, why: "The abstraction makes access easier to understand and scales to many users." },
            { t: "It removes the need to authenticate users before granting access", why: "You still need to prove identity first. Authorization comes after." },
            { t: "It encrypts every resource so access lists aren't needed", why: "Encryption doesn't decide who is allowed what." },
            { t: "It replaces accounting logs with access reviews", why: "Accounting is a separate function. The model is about granting access." }
          ],
          hint: "User to resource directly versus user to role to resource.",
          explain: "Direct user-to-resource grants don't scale. A model (roles, attributes, organizations) streamlines administration.",
          pages: [13]
        },
        {
          id: "d1-aaa-a4", type: "match", format: "Compare",
          prompt: "Match each event to the AAA step it shows.",
          choices: ["Identification", "Authentication", "Authorization", "Accounting"],
          items: [
            { t: "Typing the username qa_lead", a: "Identification", why: "This is a claim of identity." },
            { t: "Entering a password and a one-time code", a: "Authentication", why: "These prove the claim." },
            { t: "Being allowed to view but not edit prod configs", a: "Authorization", why: "This is the access decision." },
            { t: "A report showing session length and data downloaded", a: "Accounting", why: "This is a record of resources used." }
          ],
          hint: "Claim, prove, permit, record.",
          explain: "Keep the four steps distinct. Exam questions often swap authentication and authorization.",
          pages: [13]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.2 Gap analysis
    {
      id: "d1-gap",
      objective: "1.2",
      section: "Gap Analysis",
      title: "Gap analysis",
      pages: [14],
      lesson: {
        summary: [
          "A gap analysis compares where security is today with where you want it to be. The difference is the gap.",
          "Pick a target baseline first. It can be internal goals or a formal standard such as NIST SP 800-171 Rev. 2 or ISO/IEC 27001.",
          "Evaluate people (experience, training, policy knowledge) and processes (existing systems and policies), then compare against the baseline.",
          "Finish with a report: a formal description of the current state plus recommendations for reaching the baseline."
        ],
        more: [
          "It can take weeks or months and involve many people, lots of data gathering and technical research.",
          "Closing the gap usually needs time, money and a lot of change control.",
          "QA analogy: it's like a test coverage gap report. You compare current coverage against the target and list what needs to be built."
        ],
        pages: [14]
      },
      activities: [
        {
          id: "d1-gap-a1", type: "order", format: "Order",
          prompt: "Put the phases of a gap analysis in order.",
          steps: [
            { t: "Choose the target framework or baseline", why: "You need a goal to measure against." },
            { t: "Evaluate current people and processes", why: "This establishes the current state." },
            { t: "Compare the current state to the baseline and find weaknesses", why: "This is where the gap appears." },
            { t: "Write the report with recommendations", why: "It documents the current state and the path forward." }
          ],
          hint: "Target, current, compare, report.",
          explain: "A gap analysis measures the current state against a chosen baseline and ends in a report.",
          pages: [14]
        },
        {
          id: "d1-gap-a2", type: "choice", format: "Scenario",
          prompt: "Leadership asks, 'How far are we from meeting ISO/IEC 27001?' Which activity answers that?",
          options: [
            { t: "A gap analysis against ISO/IEC 27001", ok: true, why: "It compares the current state to that target baseline." },
            { t: "A penetration test of the public site", why: "A pen test finds exploitable weaknesses but doesn't measure against a framework." },
            { t: "A change advisory board review", why: "The CAB approves changes. It doesn't assess the overall posture." },
            { t: "Deploying a honeynet", why: "That's a deception tool, not an assessment against a standard." }
          ],
          hint: "'Where we are' versus 'where we want to be'.",
          explain: "Gap analysis is the tool for measuring distance from a standard.",
          pages: [14]
        },
        {
          id: "d1-gap-a3", type: "recall", format: "Recall",
          front: "Name the two example frameworks the notes give as gap analysis baselines.",
          back: "NIST Special Publication 800-171 Rev. 2 (protecting controlled unclassified information in nonfederal systems) and ISO/IEC 27001 (information security management systems).",
          pages: [14]
        },
        {
          id: "d1-gap-a4", type: "multi", format: "Investigate",
          prompt: "You're scoping the 'people' part of a gap analysis. Which items belong in it? Select all that apply.",
          options: [
            { t: "Employees' formal experience", ok: true, why: "The notes list this as part of the people baseline." },
            { t: "Current training levels", ok: true, why: "Training is part of evaluating people." },
            { t: "Knowledge of security policies and procedures", ok: true, why: "This is listed explicitly." },
            { t: "Firewall rule hit counts", why: "That's technical system data, not a people evaluation." },
            { t: "The CA's certificate revocation list", why: "This is a PKI artifact and unrelated to people." }
          ],
          hint: "Three of these describe humans.",
          explain: "The people evaluation covers experience, training and policy knowledge.",
          pages: [14]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.2 Zero trust
    {
      id: "d1-zerotrust",
      objective: "1.2",
      section: "Zero Trust",
      title: "Zero trust",
      pages: [14, 15],
      lesson: {
        summary: [
          "Zero trust means nothing is trusted by default, inside or outside the firewall. Every device, process and person is verified.",
          "The network splits into planes. The data plane moves and processes traffic. The control plane manages it and holds the policies.",
          "In the control plane, the Policy Decision Point is made of the Policy Engine (decides to grant, deny or revoke) and the Policy Administrator (issues tokens and tells the enforcement point what to do).",
          "The Policy Enforcement Point (PEP) is the gatekeeper in the data plane. It allows, monitors and terminates connections."
        ],
        more: [
          "Adaptive identity looks at context such as location, connection type, IP and relationship to the organization, and can require stronger authentication when risk looks high.",
          "Threat scope reduction means fewer possible entry points. Policy-driven access control combines adaptive identity with predefined rules.",
          "Security zones (trusted and untrusted, internal and external, department zones) can be enough on their own to deny a flow, such as untrusted to trusted.",
          "Flag: on PDF p.15 the Policy Administrator bullets include a stray fragment ('address, etc.') that seems to belong to the adaptive identity bullet on p.14. It reads like a layout glitch in the source."
        ],
        pages: [14, 15]
      },
      activities: [
        {
          id: "d1-zerotrust-a1", type: "match", format: "Match",
          prompt: "Match each zero trust component to its job.",
          choices: ["Policy Engine", "Policy Administrator", "Policy Enforcement Point", "Data plane", "Control plane"],
          items: [
            { t: "Evaluates each access request and decides grant, deny or revoke", a: "Policy Engine", why: "The engine makes the decision." },
            { t: "Generates tokens or credentials and tells the gatekeeper what to do", a: "Policy Administrator", why: "The administrator communicates the decision to the PEP." },
            { t: "The gatekeeper that allows, monitors or terminates connections", a: "Policy Enforcement Point", why: "The PEP enforces the decision." },
            { t: "Forwards, encrypts and applies NAT to the actual traffic", a: "Data plane", why: "The data plane processes frames and packets." },
            { t: "Holds the policies, routing tables and session tables", a: "Control plane", why: "The control plane manages the data plane." }
          ],
          hint: "Engine decides, Administrator relays, Enforcement Point acts.",
          explain: "The PDP (engine plus administrator) lives in the control plane, and the PEP sits in the data plane path.",
          pages: [14, 15]
        },
        {
          id: "d1-zerotrust-a2", type: "choice", format: "Next action",
          prompt: "A QA engineer's account, normally used from the office, requests the admin API at 3 a.m. from an unfamiliar country over a new connection. Under adaptive identity, what's the best response?",
          artifact: { kind: "log", title: "access-gateway.log", body: "03:12:44Z user=qa_eng src_ip=203.0.113.77 geo=NEW_COUNTRY conn=residential\n03:12:44Z resource=/admin/api/users risk_signals=geo_change,unusual_time\n03:12:45Z policy=adaptive decision=PENDING" },
          options: [
            { t: "Require stronger authentication before granting access", ok: true, why: "Adaptive identity raises the bar when risk indicators appear." },
            { t: "Allow it, since the user already passed the firewall", why: "Zero trust doesn't trust a request just because of where it is in the network." },
            { t: "Permanently delete the user's account right away", why: "That's an overreaction. Verifying first is the proportionate step." },
            { t: "Turn off logging so the alert stops repeating", why: "That destroys visibility, which zero trust relies on." }
          ],
          hint: "Context changed. What does adaptive identity do with risk signals?",
          explain: "Adaptive identity weighs location, time and connection type, and can make authentication stronger when needed.",
          pages: [14, 15]
        },
        {
          id: "d1-zerotrust-a3", type: "choice", format: "Compare",
          prompt: "In the notes' zero trust diagram, where does the Policy Decision Point sit?",
          options: [
            { t: "In the control plane", ok: true, why: "The PDP (engine plus administrator) is part of the control plane." },
            { t: "In the data plane, next to the subject", why: "The subject and system are on the data plane side. The PDP is not." },
            { t: "Inside the enterprise resource", why: "The resource is what's protected. Decisions are made elsewhere." },
            { t: "Outside both planes, in the trusted zone", why: "The diagram places the PDP above the line, in the control plane." }
          ],
          hint: "Decisions and policies belong to which plane?",
          explain: "The control plane defines policy and makes decisions, and the data plane carries traffic through the PEP.",
          pages: [15]
        },
        {
          id: "d1-zerotrust-a4", type: "choice", format: "Scenario",
          prompt: "A request travels from a zone labeled Untrusted toward a zone labeled Trusted. According to the notes, what can zone information do here?",
          options: [
            { t: "Be enough by itself to deny the access", ok: true, why: "The notes give untrusted-to-trusted as an example where zones alone can deny." },
            { t: "Nothing, since zones are only for reporting", why: "Zones are a security foundation, not just labels." },
            { t: "Automatically trust the request", why: "Untrusted-to-trusted is the opposite of implicit trust." },
            { t: "Replace the need for any policy engine", why: "Zones are one input. Policy evaluation still happens." }
          ],
          hint: "Where it comes from and where it's going matter.",
          explain: "Security zones give broad categories that can drive allow or deny decisions.",
          pages: [15]
        },
        {
          id: "d1-zerotrust-a5", type: "recall", format: "Recall",
          front: "What does 'threat scope reduction' mean in zero trust?",
          back: "Decreasing the number of possible entry points an attacker could use.",
          pages: [15]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.2 Physical
    {
      id: "d1-physical",
      objective: "1.2",
      section: "Physical Security",
      title: "Physical security",
      pages: [16],
      lesson: {
        summary: [
          "Barricades and bollards channel people through specific points while stopping vehicles.",
          "Access control vestibules use interlocking doors so people pass through one controlled set of doors at a time.",
          "Guards check ID, two-person integrity means no single person has access alone, and badges are worn and electronically logged.",
          "Fencing, lighting and CCTV (with motion and object detection) build and watch the perimeter."
        ],
        more: [
          "Sensors: infrared detects IR radiation, light or dark (common in motion detectors). Pressure detects a change in force, as in floor and window sensors. Microwave detects movement over large areas. Ultrasonic sends sound and reads the reflections.",
          "Lighting design matters: light levels, angles, and avoiding shadows and glare all help cameras and facial recognition."
        ],
        pages: [16]
      },
      activities: [
        {
          id: "d1-physical-a1", type: "match", format: "Match",
          prompt: "Match each sensor to how it works.",
          choices: ["Infrared", "Pressure", "Microwave", "Ultrasonic"],
          items: [
            { t: "Detects heat radiation in light or dark; common in motion detectors", a: "Infrared", why: "IR sensors read infrared radiation." },
            { t: "Detects a change in force on a floor or window", a: "Pressure", why: "Pressure sensors respond to force." },
            { t: "Detects movement across a large area", a: "Microwave", why: "The notes describe microwave sensors this way." },
            { t: "Sends sound waves and measures what bounces back", a: "Ultrasonic", why: "Ultrasonic sensors use reflected sound." }
          ],
          hint: "Heat, weight, big area, echo.",
          explain: "Each sensor type senses a different physical signal.",
          pages: [16]
        },
        {
          id: "d1-physical-a2", type: "choice", format: "Scenario",
          prompt: "Visitors keep tailgating employees into the lab where the device-test farm lives. Which control addresses this most directly?",
          options: [
            { t: "An access control vestibule with interlocking doors", ok: true, why: "It manages entry one person or controlled group at a time." },
            { t: "Bollards outside the building entrance", why: "Bollards stop vehicles, not people following each other in." },
            { t: "Brighter parking-lot lighting", why: "Lighting helps cameras and deters, but it doesn't stop tailgating at the door." },
            { t: "A pressure sensor on the lab windows", why: "That detects entry through windows, not through the door." }
          ],
          hint: "You want to control people going through a door one at a time.",
          explain: "Vestibules lock one door while another is open, which stops piggybacking.",
          pages: [16]
        },
        {
          id: "d1-physical-a3", type: "choice", format: "Compare",
          prompt: "What's the goal of two-person integrity (two-person control)?",
          options: [
            { t: "No single person can access a protected asset alone", ok: true, why: "Requiring two people reduces exposure to a single bad actor." },
            { t: "Two badges are logged for every entry, for redundancy", why: "That's a misreading. The control is about requiring two people, not two logs." },
            { t: "Guards work in pairs so one can take breaks", why: "That's staffing, not the security principle." },
            { t: "Visitors bring two forms of photo ID", why: "That's identity proofing, not two-person control." }
          ],
          hint: "Think of a vault that needs two keys turned at once.",
          explain: "Two-person integrity minimizes exposure: no one person can act alone.",
          pages: [16]
        },
        {
          id: "d1-physical-a4", type: "recall", format: "Recall",
          front: "What are bollards for?",
          back: "Channeling people through specific access points while stopping cars and trucks. They also help with safety.",
          pages: [16]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.2 Deception
    {
      id: "d1-deception",
      objective: "1.2",
      section: "Deception and Disruption",
      title: "Deception and disruption",
      pages: [16],
      lesson: {
        summary: [
          "Honeypot: a fake system that attracts attackers (often automated) so you can watch them.",
          "Honeynet: a larger fake network of servers, workstations and network gear, built from one or more honeypots.",
          "Honeyfile: a bait file such as passwords.txt that sends an alert when anyone opens it.",
          "Honeytoken: traceable fake data, such as API credentials that don't actually work or fake email addresses, that alerts you when used or leaked."
        ],
        more: [
          "Other honeytoken ideas from the notes: database records, browser cookies and web page pixels.",
          "QA analogy: a canary API key planted in a test repo. If it ever shows up in a request, you know the repo leaked."
        ],
        pages: [16]
      },
      activities: [
        {
          id: "d1-deception-a1", type: "match", format: "Match",
          prompt: "Match each deception tool to its description.",
          choices: ["Honeypot", "Honeynet", "Honeyfile", "Honeytoken"],
          items: [
            { t: "A single fake server meant to attract and trap attackers", a: "Honeypot", why: "One decoy system." },
            { t: "A whole fake network of servers, routers and workstations", a: "Honeynet", why: "Many decoys together." },
            { t: "A passwords.txt on a file share that alerts when opened", a: "Honeyfile", why: "A bait file." },
            { t: "A fake API key that alerts you when someone uses it", a: "Honeytoken", why: "Traceable fake data." }
          ],
          hint: "System, network, file, data.",
          explain: "They scale from data (token) to a file, a system and a whole network.",
          pages: [16]
        },
        {
          id: "d1-deception-a2", type: "choice", format: "Troubleshoot",
          prompt: "This alert just fired. What's the most likely meaning?",
          artifact: { kind: "log", title: "canary-alerts.log", body: "2026-10-21T14:02:11Z CANARY_TRIGGERED\n  token_id=ci-legacy-deploy-key   (planted in repo: qa-scripts/.env.example)\n  used_from=198.51.100.23  user_agent=python-requests/2.31\n  result=DENIED (token has no real permissions)" },
          options: [
            { t: "The repo leaked and someone tried the bait key", ok: true, why: "A honeytoken only fires when someone uses data they shouldn't have." },
            { t: "A legitimate deploy failed and needs a new key", why: "The key was planted bait with no real permissions. Real deploys don't use it." },
            { t: "The honeytoken gave the attacker access to the production systems", why: "The log shows DENIED. Honeytokens don't grant access." },
            { t: "The firewall blocked a routine vulnerability scan", why: "This is a token-use alert, not a firewall block." }
          ],
          hint: "Who would ever use a key that does nothing?",
          explain: "Honeytokens give no real access and exist to tell you where stolen data came from.",
          pages: [16]
        },
        {
          id: "d1-deception-a3", type: "choice", format: "Next action",
          prompt: "You want to know if anyone is browsing your internal file shares where they shouldn't. Which addition gives you that signal cheaply?",
          options: [
            { t: "Bait files that alert on access", ok: true, why: "Honeyfiles act like a trap that sends an alert when opened." },
            { t: "A full honeynet with routers and switches", why: "That's much heavier than needed for file-share snooping." },
            { t: "Bollards at each office entrance", why: "That's physical security and won't see file access." },
            { t: "A longer symmetric encryption key", why: "It doesn't tell you who's browsing." }
          ],
          hint: "Something 'bright and shiny' sitting in the share.",
          explain: "Honeyfiles placed on file shares alert you when someone opens them.",
          pages: [16]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.3 Change mgmt
    {
      id: "d1-change",
      objective: "1.3",
      section: "Change Management",
      title: "Change management",
      pages: [17],
      lesson: {
        summary: [
          "Change management is a formal way to make changes (patches, upgrades, firewall rules) without unplanned downtime, confusion or mistakes.",
          "The process covers a request, purpose and scope, a schedule, affected systems and impact, risk analysis, change control board approval, then end-user acceptance.",
          "The owner manages the process but usually doesn't do the work. Stakeholders are anyone affected, which is often more people than you'd expect.",
          "Test in a sandbox first, always have a backout plan with good backups, and pick a sensible maintenance window."
        ],
        more: [
          "Impact analysis includes the risk of not making the change, such as leaving a vulnerability open.",
          "A sandbox can't cover every possibility, so confirm the backout plan as part of testing.",
          "The process itself should be documented as a living standard operating procedure.",
          "QA analogy: it's like a release checklist with a staging run, a rollback plan and sign-off."
        ],
        pages: [17]
      },
      activities: [
        {
          id: "d1-change-a1", type: "order", format: "Order",
          prompt: "Put a typical change approval process in order.",
          steps: [
            { t: "Complete the change request form", why: "Everything starts with a formal request." },
            { t: "Define the purpose and scope of the change", why: "This settles what the change is and what it covers." },
            { t: "Schedule a date and time", why: "Pick the window early so impact can be assessed." },
            { t: "Determine affected systems, impact and risk", why: "Know what could break before asking for approval." },
            { t: "Get approval from the change control board", why: "The CAB approves based on the analysis." },
            { t: "Get end-user acceptance after the change", why: "Users confirm it works once it's complete." }
          ],
          hint: "Paperwork first, users last.",
          explain: "This follows the notes' typical approval process. Several of their individual steps are combined here.",
          pages: [17]
        },
        {
          id: "d1-change-a2", type: "choice", format: "Next action",
          prompt: "A patch for the test management server passed in the sandbox. Before scheduling it for production, what else should you confirm?",
          options: [
            { t: "That the backout plan actually works", ok: true, why: "The notes say to confirm the backout plan, since a sandbox can't catch everything." },
            { t: "That the patch also fixes unrelated bugs", why: "That's outside the change's scope." },
            { t: "That users will skip acceptance testing", why: "End-user acceptance is part of the process." },
            { t: "That backups can be skipped since tests passed", why: "Always have good backups, whatever the test results." }
          ],
          hint: "Prepare for the worst, hope for the best.",
          explain: "Sandbox testing plus a verified way to revert keeps a change safe.",
          pages: [17]
        },
        {
          id: "d1-change-a3", type: "match", format: "Compare",
          prompt: "Upgrading the label-printing software. Match each role.",
          choices: ["Owner", "Stakeholder", "Change control board", "Implementer"],
          items: [
            { t: "Shipping and Receiving, who manage the process and get updates", a: "Owner", why: "The owner manages the process but usually doesn't do the work." },
            { t: "Accounting, whose reports depend on shipping data", a: "Stakeholder", why: "They're affected and want input." },
            { t: "The group that formally approves the change", a: "Change control board", why: "They give approval after reviewing risk." },
            { t: "IT, who perform the actual upgrade", a: "Implementer", why: "In the notes' example, IT handles the change itself." }
          ],
          hint: "Who manages it, who's affected, who approves, who does it?",
          explain: "Ownership and implementation are often different groups.",
          pages: [17]
        },
        {
          id: "d1-change-a4", type: "choice", format: "Scenario",
          prompt: "A retail company wants to upgrade its payment network. When is the worst time, according to the notes' example?",
          options: [
            { t: "During the holiday season", ok: true, why: "Retail networks are often frozen during holidays." },
            { t: "Overnight on a weekday", why: "Overnight windows are usually a better choice." },
            { t: "During a planned maintenance window", why: "That's what maintenance windows are for." },
            { t: "After a sandbox test passes", why: "Testing first is good practice, not a bad time." }
          ],
          hint: "Think about the busiest time of year.",
          explain: "Choosing the maintenance window, including time of year, can be the hardest part.",
          pages: [17]
        },
        {
          id: "d1-change-a5", type: "recall", format: "Recall",
          front: "Impact analysis asks about the risk of making a change. What other risk should it consider?",
          back: "The risk of not making the change, such as an unpatched vulnerability, an unavailable application or downtime for other services.",
          pages: [17]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.3 Technical change
    {
      id: "d1-techchange",
      objective: "1.3",
      section: "Technical Change Management",
      title: "Technical change management",
      pages: [18],
      lesson: {
        summary: [
          "Change management decides what changes. The technical team works out how.",
          "Allow lists run only approved apps (very restrictive). Deny lists block known-bad apps, the way anti-malware does.",
          "An approved change has a specific scope. It isn't permission to change anything else while you're in there.",
          "Plan for downtime and restarts, check dependencies, update documentation and diagrams, and use version control so you can roll back."
        ],
        more: [
          "Minimize downtime by switching to a secondary system, upgrading the primary, then switching back. Automate as much as possible.",
          "Legacy apps often have no vendor support, so you become the support team. Document them and become the expert.",
          "Dependency example from the notes: upgrade the firewall code first, then the firewall management software.",
          "QA analogy: dependencies are like a pinned library version, and version control is like reverting a config commit."
        ],
        pages: [18]
      },
      activities: [
        {
          id: "d1-techchange-a1", type: "choice", format: "Compare",
          prompt: "Build agents should run only a short list of vetted tools, and anything else is blocked. Which approach is that?",
          options: [
            { t: "An allow list", ok: true, why: "Nothing runs unless it's approved." },
            { t: "A deny list", why: "A deny list blocks known-bad items and lets everything else run." },
            { t: "A compensating control", why: "This describes a control type, not an application execution policy." },
            { t: "A honeyfile", why: "That's a deception tool." }
          ],
          hint: "Default-deny or default-allow?",
          explain: "Allow lists are very restrictive. Deny lists only block what's on the bad list.",
          pages: [18]
        },
        {
          id: "d1-techchange-a2", type: "choice", format: "Next action",
          prompt: "Mid-change window, you notice a second, unrelated misconfiguration on the same server. It's not in the approved change. What do you do?",
          options: [
            { t: "Raise it through change management", ok: true, why: "Approvals are specific. The process decides how scope can grow." },
            { t: "Fix it now, since you're already logged in to that server anyway", why: "An approval isn't permission for any change." },
            { t: "Ignore it and never mention it", why: "It should go through the process, not be hidden." },
            { t: "Roll back the approved change to be safe", why: "The approved change isn't the problem." }
          ],
          hint: "Restricted activities.",
          explain: "Change approvals cover a specific scope. Expanding it goes through change management.",
          pages: [18]
        },
        {
          id: "d1-techchange-a3", type: "order", format: "Order",
          prompt: "You want to upgrade a service with as little downtime as possible. Put the steps in order.",
          steps: [
            { t: "Switch traffic to the secondary system", why: "Users stay served while you work." },
            { t: "Upgrade the primary system", why: "Now it's safe to change the primary." },
            { t: "Switch traffic back to the primary", why: "Return to normal once the upgrade checks out." }
          ],
          hint: "Move users away, do the work, move them back.",
          explain: "This pattern avoids downtime. If problems appear, switching back to the secondary is the backout.",
          pages: [18]
        },
        {
          id: "d1-techchange-a4", type: "choice", format: "Scenario",
          prompt: "A test framework upgrade fails because it needs a newer runtime library. Which concept is this?",
          options: [
            { t: "A dependency", ok: true, why: "To finish A, you must first finish B." },
            { t: "A legacy application", why: "Legacy refers to old, often unsupported apps, not version requirements." },
            { t: "A restricted activity", why: "That's about the approved scope of a change." },
            { t: "A maintenance window", why: "That's about timing." }
          ],
          hint: "To complete A, you must complete B.",
          explain: "Dependencies can cross systems, and changing one component may require changing others.",
          pages: [18]
        },
        {
          id: "d1-techchange-a5", type: "recall", format: "Recall",
          front: "Why does the notes list version control under technical change management?",
          back: "It tracks changes to files and configurations over time, so you can easily revert to a previous setting.",
          pages: [18]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.4 PKI
    {
      id: "d1-pki",
      objective: "1.4",
      section: "Public Key Infrastructure",
      title: "PKI and encryption basics",
      pages: [19],
      lesson: {
        summary: [
          "PKI is the policies, procedures, hardware, software and people used to create, distribute, manage, store and revoke digital certificates. It binds public keys to identities.",
          "Symmetric encryption uses one shared key. It's fast, but it's hard to distribute and doesn't scale well.",
          "Asymmetric encryption uses a key pair. Data encrypted with the public key can only be decrypted with the private key, and you can't derive the private key from the public one.",
          "Key escrow means a third party holds your decryption keys. It's sometimes legitimate, but it needs strict process and trust."
        ],
        more: [
          "Key pairs are generated together using a lot of randomness and large prime numbers.",
          "Symmetric and asymmetric are often combined: asymmetric to exchange a key, then symmetric for speed.",
          "Escrow examples: a business that needs access to employee data, or legal proceedings and court orders."
        ],
        pages: [19]
      },
      activities: [
        {
          id: "d1-pki-a1", type: "match", format: "Compare",
          prompt: "Symmetric or asymmetric? Match each statement.",
          choices: ["Symmetric", "Asymmetric"],
          items: [
            { t: "One shared key encrypts and decrypts", a: "Symmetric", why: "That's the definition of symmetric." },
            { t: "Very fast, with low overhead", a: "Symmetric", why: "Symmetric is less work than asymmetric." },
            { t: "Hard to distribute and doesn't scale well", a: "Symmetric", why: "Every pair needs the shared secret." },
            { t: "Two mathematically related keys", a: "Asymmetric", why: "Public and private keys form a pair." },
            { t: "The private key can't be derived from the public key", a: "Asymmetric", why: "That's what makes public keys safe to share." }
          ],
          hint: "One key or two?",
          explain: "Symmetric is fast but awkward to share. Asymmetric solves sharing but costs more computation.",
          pages: [19]
        },
        {
          id: "d1-pki-a2", type: "choice", format: "Scenario",
          prompt: "Bob wants to send Alice a secret message that only she can read. Which key does Bob encrypt it with?",
          options: [
            { t: "Alice's public key", ok: true, why: "Only Alice's private key can decrypt it." },
            { t: "Alice's private key", why: "Bob doesn't have it, and nobody else should." },
            { t: "Bob's private key", why: "That would create a signature anyone could check, not secrecy." },
            { t: "Bob's public key", why: "Only Bob could decrypt that, not Alice." }
          ],
          hint: "Encrypt for the recipient.",
          explain: "To keep a message confidential, encrypt with the recipient's public key.",
          pages: [19]
        },
        {
          id: "d1-pki-a3", type: "choice", format: "Compare",
          prompt: "What is key escrow?",
          options: [
            { t: "A third party holds copies of your decryption keys", ok: true, why: "It can be legitimate but needs careful process." },
            { t: "Encrypting a key with a second, stronger key", why: "That's closer to key wrapping, not escrow." },
            { t: "Revoking a key that may have been compromised", why: "That's revocation, handled with a CRL or OCSP." },
            { t: "Generating keys inside a hardware module", why: "That describes an HSM or TPM." }
          ],
          hint: "Like a real estate escrow agent holding money for others.",
          explain: "Escrowed keys sit with someone else, which could be within your own organization.",
          pages: [19]
        },
        {
          id: "d1-pki-a4", type: "recall", format: "Recall",
          front: "PKI covers which certificate lifecycle actions?",
          back: "Create, distribute, manage, store and revoke, using policies, procedures, hardware, software and people.",
          pages: [19]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.4 Encrypting data
    {
      id: "d1-encdata",
      objective: "1.4",
      section: "Encrypting Data",
      title: "Encrypting data",
      pages: [20],
      lesson: {
        summary: [
          "Data at rest can use full-disk or volume encryption (BitLocker, FileVault) or file encryption (EFS).",
          "Databases can use transparent encryption (everything, with one symmetric key) or record-level encryption (individual columns, each with its own key).",
          "Data in transit can be protected inside the application (HTTPS) or with a VPN that covers all traffic: client SSL/TLS VPN or site-to-site IPsec.",
          "Algorithms are usually public. The key is the secret. Longer keys resist brute force better, and asymmetric keys run much longer (3,072 bits or more) than symmetric ones (128 bits or more)."
        ],
        more: [
          "Key stretching makes a weak key or password stronger by hashing it, then hashing the hash, over and over. That forces a brute-force attacker to spend far more time.",
          "Both sides must agree on the algorithm before encrypting. The details are usually hidden from users."
        ],
        pages: [20]
      },
      activities: [
        {
          id: "d1-encdata-a1", type: "match", format: "Match",
          prompt: "Match each technology to what it encrypts.",
          choices: ["Full-disk / volume", "Individual files", "Specific database columns", "Traffic for one application", "All traffic between two sites"],
          items: [
            { t: "BitLocker on a QA laptop", a: "Full-disk / volume", why: "BitLocker and FileVault encrypt whole volumes." },
            { t: "EFS on a shared folder's files", a: "Individual files", why: "EFS is file-level encryption." },
            { t: "Record-level encryption with a separate key per column", a: "Specific database columns", why: "It encrypts individual columns." },
            { t: "HTTPS between the browser and the API", a: "Traffic for one application", why: "Encryption is handled within the application." },
            { t: "An IPsec VPN between two offices", a: "All traffic between two sites", why: "A site-to-site VPN encrypts everything regardless of app." }
          ],
          hint: "Disk, file, column, app, network.",
          explain: "Choose encryption by scope, from a single field up to a whole network link.",
          pages: [20]
        },
        {
          id: "d1-encdata-a2", type: "choice", format: "Compare",
          prompt: "A password is short and weak. Which technique makes brute-forcing it much slower without changing the password?",
          options: [
            { t: "Key stretching", ok: true, why: "Hashing repeatedly makes every guess cost far more work." },
            { t: "Transparent database encryption", why: "That protects stored data, not how hard a password is to guess." },
            { t: "Out-of-band key exchange", why: "That's about delivering keys safely." },
            { t: "Steganography", why: "That hides data. It doesn't strengthen keys." }
          ],
          hint: "Hash the hash of the hash.",
          explain: "Key stretching (key strengthening) adds work for attackers even when the key is small.",
          pages: [20]
        },
        {
          id: "d1-encdata-a3", type: "choice", format: "Scenario",
          prompt: "A reviewer says, 'Our algorithm is secret, so we're safe.' Based on the notes, what's the better view?",
          options: [
            { t: "The algorithm is usually known; protect the key", ok: true, why: "The key is the one thing an attacker doesn't know." },
            { t: "Secret algorithms remove the need for keys", why: "Encryption still depends on keys." },
            { t: "Shorter keys are fine if the algorithm is secret", why: "Key length matters for resisting brute force." },
            { t: "Algorithms only matter for hashing", why: "Algorithms matter for encryption and signatures too." }
          ],
          hint: "What's the only thing you don't know?",
          explain: "The key determines the output, so keep it private.",
          pages: [20]
        },
        {
          id: "d1-encdata-a4", type: "recall", format: "Recall",
          front: "What key lengths do the notes call common for symmetric and asymmetric encryption?",
          back: "Symmetric: 128 bits or larger. Asymmetric: 3,072 bits or larger. Both numbers grow over time.",
          pages: [20]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.4 Key exchange
    {
      id: "d1-keyx",
      objective: "1.4",
      section: "Key Exchange",
      title: "Key exchange",
      pages: [20, 21],
      lesson: {
        summary: [
          "The problem: how do you share a key over an insecure network?",
          "Out-of-band means you don't send it over the network at all. Use the phone, a courier or hand it over in person.",
          "In-band means you send it over the network but protect it, usually by encrypting a symmetric key with asymmetric encryption.",
          "Session keys: the client encrypts a random symmetric key with the server's public key. The server decrypts it, and both sides then use that fast symmetric key."
        ],
        more: [
          "Session keys should be ephemeral (changed often) and unpredictable.",
          "Another method: each side combines its own private key with the other side's public key, and both arrive at the same symmetric key without ever sending it. The notes show this as a diagram on PDF p.21."
        ],
        pages: [20, 21]
      },
      activities: [
        {
          id: "d1-keyx-a1", type: "order", format: "Order",
          prompt: "Put the session-key exchange in order.",
          steps: [
            { t: "The client generates a random symmetric key", why: "This will become the session key." },
            { t: "The client encrypts it with the server's public key", why: "Only the server can decrypt it." },
            { t: "The server decrypts it with its private key", why: "Now both sides share the key." },
            { t: "Both sides encrypt traffic with the symmetric session key", why: "Symmetric is fast for bulk data." }
          ],
          hint: "Make a key, wrap it, unwrap it, use it.",
          explain: "Asymmetric encryption delivers the key, and symmetric encryption does the heavy lifting.",
          pages: [20]
        },
        {
          id: "d1-keyx-a2", type: "choice", format: "Compare",
          prompt: "A partner reads a symmetric key aloud over a phone call instead of emailing it. What kind of key exchange is that?",
          options: [
            { t: "Out-of-band", ok: true, why: "The key never crosses the network." },
            { t: "In-band", why: "In-band would mean sending it over the network." },
            { t: "Key escrow", why: "Escrow is a third party holding keys." },
            { t: "Key stretching", why: "That strengthens a weak key." }
          ],
          hint: "Did the key travel on the 'net?",
          explain: "Out-of-band exchange uses the phone, a courier or a meeting in person.",
          pages: [20]
        },
        {
          id: "d1-keyx-a3", type: "multi", format: "Investigate",
          prompt: "You're reviewing how a test harness creates session keys. Which properties should the keys have? Select all that apply.",
          options: [
            { t: "Changed often (ephemeral)", ok: true, why: "The notes say session keys should change often." },
            { t: "Unpredictable", ok: true, why: "Predictable keys can be guessed." },
            { t: "Reused across every test run for consistency", why: "Reuse defeats the point of session keys." },
            { t: "Hard-coded in the harness for easy debugging", why: "A hard-coded key is predictable and permanent." }
          ],
          hint: "Two good properties, two bad habits.",
          explain: "Implement session keys carefully: ephemeral and unpredictable.",
          pages: [20]
        },
        {
          id: "d1-keyx-a4", type: "recall", format: "Recall",
          front: "How can two parties get the same symmetric key without sending it?",
          back: "Each one combines its own private key with the other's public key. The math produces the same symmetric key on both sides.",
          pages: [21]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.4 Encryption tech
    {
      id: "d1-enctech",
      objective: "1.4",
      section: "Encryption Technologies",
      title: "Encryption technologies",
      pages: [21],
      lesson: {
        summary: [
          "TPM: a chip on the device with a crypto processor, a random number generator, keys burned in at manufacture and storage for things like BitLocker keys. It resists dictionary attacks.",
          "HSM: high-end crypto hardware for large environments. It securely stores thousands of keys, backs them up and offloads crypto work as an accelerator.",
          "Key management system: centralized software that creates, rotates and logs keys across on-premises and cloud services, and keeps keys separate from data.",
          "Secure enclave: a separate, isolated processor for secrets, with its own boot ROM, a true random number generator, memory encryption and hardware AES."
        ],
        more: [
          "Quick tell: one device's chip means TPM. A rack-scale vault for many keys means HSM. A software console means KMS. An isolated co-processor in a phone or laptop means secure enclave."
        ],
        pages: [21]
      },
      activities: [
        {
          id: "d1-enctech-a1", type: "match", format: "Match",
          prompt: "Match each description to the technology.",
          choices: ["TPM", "HSM", "Key management system", "Secure enclave"],
          items: [
            { t: "A chip on a laptop that stores its BitLocker keys", a: "TPM", why: "The TPM is per-device crypto hardware." },
            { t: "Clustered hardware storing thousands of keys and accelerating crypto", a: "HSM", why: "HSMs serve large environments." },
            { t: "One console to create, rotate and log keys across clouds", a: "Key management system", why: "A KMS is centralized management, often software." },
            { t: "An isolated processor with its own boot ROM and memory encryption", a: "Secure enclave", why: "It's isolated from the main CPU." }
          ],
          hint: "Chip, vault, console, isolated co-processor.",
          explain: "All four protect keys, at very different scales and in different forms.",
          pages: [21]
        },
        {
          id: "d1-enctech-a2", type: "choice", format: "Next action",
          prompt: "Your CI/CD platform uses TLS and SSH keys across two clouds and on-premises. Auditors want regular rotation and a log of key use. What should you adopt?",
          options: [
            { t: "A key management system", ok: true, why: "It centralizes creation, rotation and logging of keys." },
            { t: "A TPM in each build agent", why: "TPMs protect one device and don't centrally manage keys." },
            { t: "Steganography for the key files", why: "Hiding files isn't management or auditing." },
            { t: "Honeytokens in place of the real keys", why: "Honeytokens are bait and can't replace working keys." }
          ],
          hint: "One console for many keys across many services.",
          explain: "A KMS manages, rotates and logs keys from one place.",
          pages: [21]
        },
        {
          id: "d1-enctech-a3", type: "choice", format: "Compare",
          prompt: "Which technology is described as a cryptographic accelerator that offloads CPU overhead in large environments?",
          options: [
            { t: "Hardware security module (HSM)", ok: true, why: "HSMs include cryptographic accelerators." },
            { t: "Trusted Platform Module (TPM)", why: "TPMs are per-device and aren't described as accelerators for others." },
            { t: "Certificate revocation list (CRL)", why: "That's a PKI list, not hardware." },
            { t: "Tokenization service", why: "That replaces data and doesn't accelerate crypto." }
          ],
          hint: "Large environments, redundant power, plug-in card or appliance.",
          explain: "HSMs securely store keys and speed up crypto operations.",
          pages: [21]
        },
        {
          id: "d1-enctech-a4", type: "recall", format: "Recall",
          front: "Name three features of a TPM from the notes.",
          back: "Any three of: a crypto processor, a random number generator, key generators, unique keys burned in at manufacture, versatile memory for storage keys and BitLocker keys, and password protection against dictionary attacks.",
          pages: [21]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.4 Obfuscation
    {
      id: "d1-obfuscation",
      objective: "1.4",
      section: "Obfuscation",
      title: "Obfuscation",
      pages: [22],
      lesson: {
        summary: [
          "Obfuscation makes data hard to understand, but not impossible if you know how to read it.",
          "Steganography hides a message inside something else, the covertext: an image, audio, video or even network packets. Printer yellow dots are an example.",
          "Tokenization swaps sensitive data for a placeholder. The token isn't mathematically related to the original, so it isn't encryption or hashing.",
          "Data masking hides part of the data, often only in the view, based on permissions. The full data may still be stored."
        ],
        more: [
          "Tokenized card payments: the phone holds a token, the merchant sends the token, and a token service validates it. A stolen token can't be reused later.",
          "Masking techniques include substituting, shuffling, encrypting and masking out.",
          "QA analogy: masked PII in test environments, and tokenized card numbers in payment sandbox tests."
        ],
        pages: [22]
      },
      activities: [
        {
          id: "d1-obfuscation-a1", type: "match", format: "Compare",
          prompt: "Match each technique to the example.",
          choices: ["Steganography", "Tokenization", "Data masking"],
          items: [
            { t: "A secret message embedded in a product photo's pixels", a: "Steganography", why: "It's hidden inside a covertext file." },
            { t: "A card number replaced by an unrelated stand-in for payments", a: "Tokenization", why: "The token isn't mathematically related to the card number." },
            { t: "The QA dashboard shows ****-****-****-1234 to testers", a: "Data masking", why: "Part of the data is hidden from view." }
          ],
          hint: "Hidden inside, swapped out, partly covered.",
          explain: "All three are obfuscation, applied differently.",
          pages: [22]
        },
        {
          id: "d1-obfuscation-a2", type: "choice", format: "Compare",
          prompt: "Why isn't tokenization a form of encryption?",
          options: [
            { t: "The token and the original aren't mathematically related", ok: true, why: "There's nothing to decrypt. A lookup service maps them." },
            { t: "Tokens are always much longer than the original data they replace", why: "Length isn't the difference. The notes' example token is the same format." },
            { t: "Tokenization only works on images", why: "That describes steganography." },
            { t: "Tokens use a public and private key pair", why: "That describes asymmetric encryption, not tokenization." }
          ],
          hint: "Could you reverse a token with math alone?",
          explain: "Tokenization has no encryption overhead because there's no mathematical relationship.",
          pages: [22]
        },
        {
          id: "d1-obfuscation-a3", type: "order", format: "Order",
          prompt: "Put this tokenized mobile payment flow in order (based on the notes' diagram).",
          steps: [
            { t: "The user registers a credit card with the token service", why: "The card is enrolled first." },
            { t: "The token service sends the phone a token instead", why: "The phone never stores the real card number." },
            { t: "The phone pays at a store using the token", why: "The token is presented at checkout." },
            { t: "The merchant's payment server sends the token for validation", why: "The merchant asks the token service to validate it." },
            { t: "The token is validated and the transaction approved", why: "The token service confirms and the payment completes." }
          ],
          hint: "Enroll, get token, pay, validate, approve.",
          explain: "An attacker who captures the token can't reuse it later.",
          pages: [22]
        },
        {
          id: "d1-obfuscation-a4", type: "choice", format: "Scenario",
          prompt: "Testers need to see customer records in staging, but not full email addresses. The data stays intact in the database. What fits best?",
          options: [
            { t: "Data masking based on the viewer's permissions", ok: true, why: "Masking can hide data in the view while storage stays intact." },
            { t: "Steganography on the database files", why: "That hides messages inside files and doesn't control views." },
            { t: "Deleting all emails from staging", why: "That removes data the scenario says must stay intact." },
            { t: "Key escrow for the database key", why: "Escrow is about who holds keys, not what testers see." }
          ],
          hint: "Hidden from view, still in storage.",
          explain: "Masking can be view-only and controlled by permissions.",
          pages: [22]
        },
        {
          id: "d1-obfuscation-a5", type: "recall", format: "Recall",
          front: "In steganography, what is the covertext?",
          back: "The container document or file that carries the hidden message.",
          pages: [22]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.4 Hashing
    {
      id: "d1-hashing",
      objective: "1.4",
      section: "Hashing and Digital Signatures",
      title: "Hashing and digital signatures",
      pages: [23],
      lesson: {
        summary: [
          "A hash turns any input into a fixed-size digest. It's one-way, so you can't recover the original from it.",
          "Uses: checking a downloaded file against a posted hash (integrity) and storing passwords as salted hashes instead of the passwords themselves.",
          "A collision is two different inputs producing the same hash. MD5 has known collisions (found in 1996), so don't use it for anything important.",
          "A salt is random data added per user before hashing. The same password gives different hashes and rainbow tables stop working, though brute force is only slowed, not stopped."
        ],
        more: [
          "The salt is usually stored with the password hash. It isn't a secret.",
          "Digital signatures (sign with the private key, verify with the public key) provide integrity, authentication and non-repudiation. See the non-repudiation topic too.",
          "QA analogy: comparing artifact checksums in a pipeline step before deploying."
        ],
        pages: [23]
      },
      activities: [
        {
          id: "d1-hashing-a1", type: "choice", format: "Troubleshoot",
          prompt: "You're reviewing a test copy of the users table. What's the security problem?",
          artifact: { kind: "log", title: "users (staging snapshot)", body: "id  username   password_hash\n17  qa_alice   5f4dcc3b5aa765d61d8327deb882cf99\n42  qa_bob     5f4dcc3b5aa765d61d8327deb882cf99\n58  qa_chen    e99a18c428cb38d5f260853678922e03" },
          options: [
            { t: "The hashes aren't salted, so identical passwords look identical", ok: true, why: "With per-user salts, the same password would give different hashes." },
            { t: "The hashes are encrypted with a public key", why: "These are hashes, not ciphertext, and there's no sign of encryption." },
            { t: "Two of the hashes match, which proves the hashing algorithm itself is broken", why: "Matching hashes here come from identical passwords, not necessarily a collision." },
            { t: "Hashes should be stored as plaintext passwords", why: "That's far worse. Storing hashes is the right idea." }
          ],
          hint: "qa_alice and qa_bob have the same value. What would a salt change?",
          explain: "Unsalted hashes reveal reused passwords and allow rainbow-table lookups. The 32-hex-character length also looks like MD5, which the notes warn against.",
          more: "Each user should get their own random salt, stored alongside the hash. Salting defeats precomputed rainbow tables and slows brute force, but doesn't make weak passwords strong.",
          pages: [23]
        },
        {
          id: "d1-hashing-a2", type: "multi", format: "Investigate",
          prompt: "Which statements about salting are true? Select all that apply.",
          options: [
            { t: "Every user gets their own random salt", ok: true, why: "Per-user salts make identical passwords hash differently." },
            { t: "The salt is commonly stored with the hash", ok: true, why: "The notes say so. The salt isn't a secret." },
            { t: "Salting stops rainbow tables from working", ok: true, why: "Precomputed tables don't include the random salt." },
            { t: "Salting completely prevents brute force", why: "It slows brute force but doesn't stop it." },
            { t: "A salt lets you decrypt the hash back to the password", why: "Hashes are one-way, with or without a salt." }
          ],
          hint: "Three are true. Watch for absolutes like 'completely'.",
          explain: "Salt adds randomness per user. It defeats rainbow tables and slows brute force.",
          pages: [23]
        },
        {
          id: "d1-hashing-a3", type: "choice", format: "Compare",
          prompt: "What is a hash collision?",
          options: [
            { t: "Two different inputs that produce the same hash", ok: true, why: "A good hash function should make this practically impossible." },
            { t: "One single input that produces two different hash values", why: "A hash function is deterministic. The same input always gives the same output." },
            { t: "A hash that can be reversed to the input", why: "That's a broken one-way property, not a collision." },
            { t: "Two users choosing the same salt", why: "That's a salt reuse problem, not a collision." }
          ],
          hint: "Different inputs, same output.",
          explain: "Collisions break trust in a hash. MD5 has known collisions.",
          pages: [23]
        },
        {
          id: "d1-hashing-a4", type: "choice", format: "Next action",
          prompt: "You download a test-runner binary, and the site posts its SHA-256 hash. What's the next action before installing?",
          options: [
            { t: "Hash your download and compare it to the posted value", ok: true, why: "A match confirms the file hasn't changed." },
            { t: "Encrypt the binary with your public key", why: "That doesn't verify anything." },
            { t: "Ask the vendor for their private key", why: "Private keys are never shared." },
            { t: "Rename the file so its hash changes", why: "Renaming doesn't change content hashes, and verification is the goal." }
          ],
          hint: "Compute, then compare.",
          explain: "Comparing hashes verifies download integrity.",
          pages: [23]
        },
        {
          id: "d1-hashing-a5", type: "recall", format: "Recall",
          front: "Why do the notes say to avoid MD5 for anything important?",
          back: "MD5 has a collision problem (found in 1996): different inputs can produce the same hash.",
          pages: [23]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.4 Blockchain
    {
      id: "d1-blockchain",
      objective: "1.4",
      section: "Blockchain Technology",
      title: "Blockchain",
      pages: [24],
      lesson: {
        summary: [
          "A blockchain is a distributed ledger that keeps track of transactions.",
          "Every participant keeps a copy, and it's replicated to everyone on the network.",
          "Each block includes a hash of the previous blocks. If someone alters an old block, its hash and every following hash change, so the altered chain no longer matches everyone else's copy and is rejected.",
          "Uses include payment processing, digital identification, supply chain monitoring and digital voting."
        ],
        more: [
          "Most of this topic is a six-step diagram on PDF p.24, with very little bullet text. The steps here are paraphrased from that diagram."
        ],
        pages: [24]
      },
      activities: [
        {
          id: "d1-blockchain-a1", type: "order", format: "Order",
          prompt: "Put the blockchain transaction steps in order.",
          steps: [
            { t: "A transaction is requested", why: "Any digital transaction can start it." },
            { t: "It's sent to every node to be verified", why: "The network is decentralized." },
            { t: "Verified transactions go into a new block", why: "Blocks group verified transactions." },
            { t: "A hash of the previous blocks is added to the new block", why: "This links the chain together." },
            { t: "The block is appended and all nodes update", why: "Now the transaction is complete." }
          ],
          hint: "Request, verify, block, hash, append.",
          explain: "The hash link is what makes tampering detectable.",
          pages: [24]
        },
        {
          id: "d1-blockchain-a2", type: "choice", format: "Scenario",
          prompt: "Someone edits an old block in their copy of the chain. What happens?",
          options: [
            { t: "Hashes change, the copy stops matching and it's rejected", ok: true, why: "The altered chain no longer matches the copies held by the rest of the network." },
            { t: "Every node accepts the edit automatically", why: "Nodes compare chains, and a mismatch is rejected." },
            { t: "Only that one block's hash changes", why: "All the following hashes are recalculated too." },
            { t: "The ledger is deleted and rebuilt from scratch", why: "The network just keeps the matching chain." }
          ],
          hint: "Every later block depends on the hash before it.",
          explain: "Distributed copies plus chained hashes make tampering visible.",
          pages: [24]
        },
        {
          id: "d1-blockchain-a3", type: "recall", format: "Recall",
          front: "Name two practical uses of blockchain from the notes.",
          back: "Any two of: payment processing, digital identification, supply chain monitoring, digital voting.",
          pages: [24]
        }
      ]
    },

    // ------------------------------------------------------------------ 1.4 Certificates
    {
      id: "d1-certs",
      objective: "1.4",
      section: "Certificates",
      title: "Certificates",
      pages: [25, 26],
      lesson: {
        summary: [
          "A digital certificate binds a public key to an identity, with a digital signature for trust. The standard format is X.509.",
          "A CA signs certificates. You trust the CA, so you trust what it signed. Browsers ship with trusted third-party CAs, and organizations can run a private CA and install it on their own devices.",
          "To get a certificate: create a key pair, send a CSR with the public key, the CA validates you, then the CA signs and returns the certificate.",
          "Revocation: the CA publishes a CRL. OCSP lets clients check status in real time. OCSP stapling has the server attach a CA-signed status to the TLS handshake."
        ],
        more: [
          "Subject Alternative Name (SAN) is an X.509 extension that lists extra names, so one certificate can cover many domains. A wildcard such as *.example.com covers every server name in that domain.",
          "A root of trust is an inherently trusted component, such as an HSM, a secure enclave or a CA.",
          "Heartbleed (CVE-2014-0160, April 2014) put web server private keys at risk. OpenSSL was patched, certificates were replaced and the old ones were added to CRLs.",
          "QA analogy: test environments full of browser warnings usually mean self-signed certificates that the test devices don't trust. Install the internal CA certificate on them."
        ],
        pages: [25, 26]
      },
      activities: [
        {
          id: "d1-certs-a1", type: "order", format: "Order",
          prompt: "Put the certificate signing process in order.",
          steps: [
            { t: "The applicant creates a public/private key pair", why: "The private key never leaves the applicant." },
            { t: "The applicant sends a CSR with the public key and identifying info", why: "That's the certificate signing request." },
            { t: "The CA validates the applicant's identity", why: "For example, by confirming DNS, email or site ownership." },
            { t: "The CA signs the certificate with its private key and returns it", why: "The CA's signature is what clients trust." }
          ],
          hint: "Keys, request, check, sign.",
          explain: "Only the public key goes to the CA, and the CA signs with its own private key.",
          pages: [25, 26]
        },
        {
          id: "d1-certs-a2", type: "match", format: "Compare",
          prompt: "Match each revocation method to its description.",
          choices: ["CRL", "OCSP", "OCSP stapling"],
          items: [
            { t: "A possibly large list of revoked certificates kept by the CA", a: "CRL", why: "A certificate revocation list." },
            { t: "The browser asks a responder about one certificate's status, usually over HTTP", a: "OCSP", why: "A real-time check, more efficient than downloading a CRL." },
            { t: "The server includes a CA-signed status in the TLS handshake", a: "OCSP stapling", why: "This takes load off the CA's responders." }
          ],
          hint: "List, ask, attach.",
          explain: "Each method improves on the scalability of the one before it.",
          pages: [25, 26]
        },
        {
          id: "d1-certs-a3", type: "choice", format: "Troubleshoot",
          prompt: "Every internal test site shows a certificate warning on the QA team's laptops. What's the fix?",
          artifact: { kind: "log", title: "browser console", body: "NET::ERR_CERT_AUTHORITY_INVALID\n  subject: CN=*.test.internal\n  issuer:  CN=Internal-Test-CA\n  chain:   Internal-Test-CA (not in trust store)" },
          options: [
            { t: "Trust the internal CA on the QA laptops", ok: true, why: "Devices that trust the internal CA trust what it signs." },
            { t: "Add every test certificate to the CRL", why: "That would revoke them, which makes things worse." },
            { t: "Switch all of the internal test sites from HTTPS to plain HTTP", why: "That removes encryption instead of fixing trust." },
            { t: "Buy one public certificate per tester's laptop", why: "Laptops don't need certificates here. The servers' issuer just needs to be trusted." }
          ],
          hint: "Look at the 'chain' line.",
          explain: "Private CAs work exactly like purchased certificates once devices trust the CA.",
          pages: [25]
        },
        {
          id: "d1-certs-a4", type: "choice", format: "Scenario",
          prompt: "You need one certificate that covers api.test.example.com, ui.test.example.com and any future host in test.example.com. What do you use?",
          options: [
            { t: "A wildcard certificate for *.test.example.com", ok: true, why: "A wildcard applies to all server names in that domain." },
            { t: "A self-signed certificate for each host", why: "That works but isn't one certificate, and future hosts still need new ones." },
            { t: "OCSP stapling", why: "Stapling is about revocation status, not which names are covered." },
            { t: "Key escrow", why: "Escrow is about holding keys." }
          ],
          hint: "One name pattern for many hosts.",
          explain: "Wildcards (and the SAN extension) let one certificate cover many names.",
          pages: [25]
        },
        {
          id: "d1-certs-a5", type: "multi", format: "Investigate",
          prompt: "You're inspecting an X.509 certificate. Which fields do the notes list as certificate details? Select all that apply.",
          options: [
            { t: "Serial number", ok: true, why: "It's listed." },
            { t: "Issuer", ok: true, why: "It's listed." },
            { t: "The holder's public key", ok: true, why: "Binding this key is the certificate's purpose." },
            { t: "The holder's private key", why: "Private keys are never placed in certificates." },
            { t: "The CA's private key", why: "The CA signs with it but never shares it." }
          ],
          hint: "Anything private would defeat the purpose.",
          explain: "Certificates are public documents. Nothing private goes inside.",
          pages: [25]
        },
        {
          id: "d1-certs-a6", type: "recall", format: "Recall",
          front: "What is a root of trust? Give an example.",
          back: "An inherently trusted component that other trust is built on, such as an HSM, a secure enclave or a Certificate Authority.",
          pages: [25]
        }
      ]
    }
  ]
});
