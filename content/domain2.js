/*
 * Domain 2.0 - Threats, Vulnerabilities, and Mitigations
 * Source: Professor Messer SY0-701 Course Notes v1.07, PDF pages 27-51 (printed pages 18-42).
 * All lessons and questions are original wording. "pages" are PDF page numbers
 * (printed page = PDF page - 9).
 *
 * Activity types: choice | multi | match | order | recall  (see content/README.md)
 */
window.SECPLUS = window.SECPLUS || {};
(window.SECPLUS.content = window.SECPLUS.content || []).push({
  domain: "d2",
  topics: [
    // ------------------------------------------------------------------ 2.1
    {
      id: "d2-actors",
      objective: "2.1",
      section: "Threat Actors",
      title: "Threat actors",
      pages: [27, 28],
      lesson: {
        summary: [
          "A threat actor (malicious actor) is whoever is responsible for an event that harms someone else's safety.",
          "Describe any actor with three attributes: internal or external, how much funding and resources they have, and how sophisticated they are.",
          "Six actor types to know: nation state, unskilled attacker, hacktivist, insider threat, organized crime and shadow IT.",
          "Motivations explain why the attack happens: data exfiltration, espionage, service disruption, blackmail, financial gain, beliefs, ethics, revenge, chaos or war."
        ],
        more: [
          "Nation states: external, massive resources, highest sophistication, often an Advanced Persistent Threat (APT). The notes cite Stuxnet destroying nuclear centrifuges.",
          "Unskilled attackers run pre-made scripts they don't understand. Low resources, no formal funding, looking for easy targets.",
          "Hacktivists have a cause (philosophy, revenge, disruption). Often external, can be very sophisticated, usually limited funding. Typical results: DoS, defacing a site, leaking documents.",
          "Insiders are internal, have institutional knowledge and use the organization's own resources. The notes rate them medium sophistication.",
          "Organized crime is almost always external, motivated by money, very well funded and run like a business with split roles.",
          "Shadow IT is people working around the IT department with their own infrastructure (often cloud). Limited budget, medium sophistication, may lack IT security knowledge.",
          "QA analogy: a team that spins up its own unmanaged test server in a personal cloud account to avoid waiting on IT is shadow IT."
        ],
        pages: [27, 28]
      },
      activities: [
        {
          id: "d2-actors-a1", type: "match", format: "Match",
          prompt: "Match each description to the threat actor it best fits.",
          choices: ["Nation state", "Unskilled attacker", "Hacktivist", "Insider threat", "Organized crime", "Shadow IT"],
          items: [
            { t: "Years-long, well-funded campaign against a country's power grid", a: "Nation state", why: "Constant attacks, huge resources and the highest sophistication are typical of governments. Often an APT." },
            { t: "Someone downloads an exploit kit and fires it at random IPs without understanding it", a: "Unskilled attacker", why: "Running pre-made scripts without knowing what they do is the defining trait." },
            { t: "A group defaces a company's website to protest its environmental record", a: "Hacktivist", why: "A hacker with a cause. Defacement and document leaks are typical." },
            { t: "A departing engineer who knows exactly which test server holds prod data copies it out", a: "Insider threat", why: "Internal, with institutional knowledge of what to hit." },
            { t: "One person breaks in, another manages exploits, another sells the stolen data", a: "Organized crime", why: "Professional, money-driven, with business-like division of roles." },
            { t: "A team runs its own unmanaged CI server in a personal cloud account to skip IT approval", a: "Shadow IT", why: "Working around internal IT with self-built infrastructure." }
          ],
          hint: "Look for the giveaway: funding level, cause, inside knowledge, or going around IT.",
          explain: "Exam questions usually hinge on one attribute: resources, motive, inside vs. outside, or skill.",
          pages: [27]
        },
        {
          id: "d2-actors-a2", type: "choice", format: "Compare",
          prompt: "Which actor type do the notes describe as internal, with extensive resources and medium sophistication?",
          options: [
            { t: "Insider threat", ok: true, why: "Insiders use the organization's own resources against it and know what to target." },
            { t: "Nation state", why: "Nation states are external and rated the highest sophistication." },
            { t: "Unskilled attacker", why: "They usually have limited resources, if any." },
            { t: "Organized crime group", why: "Organized crime is almost always external." }
          ],
          hint: "Whose resources are being used against the organization?",
          explain: "An insider's resources are the organization's own, which is why they count as extensive.",
          pages: [27]
        },
        {
          id: "d2-actors-a3", type: "choice", format: "Scenario",
          prompt: "A threat intel report describes an attacker that has stayed hidden in a defense contractor's network for two years, using custom malware. Which term best fits?",
          options: [
            { t: "Advanced Persistent Threat", ok: true, why: "Long-running, well-resourced, sophisticated. The notes link APTs to nation states." },
            { t: "Shadow IT", why: "Shadow IT is employees working around IT, not a hidden attacker." },
            { t: "An unskilled attacker running scripts", why: "Custom malware and long-term stealth need high skill." },
            { t: "A hacktivist group defacing websites", why: "Defacement is loud and public. This attacker is quiet and patient." }
          ],
          hint: "Persistent, patient, and very capable.",
          explain: "Nation states are commonly APTs: constant effort, massive resources, highest sophistication.",
          pages: [27]
        },
        {
          id: "d2-actors-a4", type: "multi", format: "Investigate",
          prompt: "Which of these are threat actor attributes the notes use to describe an attacker? Select all that apply.",
          options: [
            { t: "Internal or external", ok: true, why: "Is the attacker inside the house or trying to get in?" },
            { t: "Resources and funding", ok: true, why: "From no money to extensive funding." },
            { t: "Level of sophistication", ok: true, why: "From running scripts blindly to writing their own malware." },
            { t: "The attacker's operating system", why: "Not an attribute the notes use." },
            { t: "Which CVE they exploited", why: "That describes an attack, not the actor." }
          ],
          hint: "Three attributes: where they are, what they have, what they can do.",
          explain: "Attributes describe the attacker. Motivation is the separate 'why'.",
          pages: [27]
        },
        {
          id: "d2-actors-a5", type: "recall", format: "Recall",
          front: "Name at least six threat actor motivations from the notes.",
          back: "Data exfiltration, espionage, service disruption, blackmail, financial gain, philosophical/political beliefs, ethical, revenge, disruption/chaos, war.",
          pages: [27]
        }
      ]
    },
    // ------------------------------------------------------------------ 2.2
    {
      id: "d2-vectors",
      objective: "2.2",
      section: "Common Threat Vectors",
      title: "Common threat vectors",
      pages: [28, 29],
      lesson: {
        summary: [
          "A threat vector (attack vector) is the path an attacker uses to get access or infect a target.",
          "Message, image, file, voice and removable device vectors all deliver something to a person or system.",
          "Weak software, unsupported systems, unsecure networks, open ports and default credentials are doors that are already ajar.",
          "Supply chain vectors attack you through people you trust: MSPs, vendors and suppliers."
        ],
        more: [
          "Images: SVG files are XML, so they can carry HTML injection or JavaScript. Browsers need input validation.",
          "Files: PDFs contain other objects, archives (ZIP, RAR or any compression type) contain many files, Office documents can carry macros and add-ins.",
          "Voice: vishing, spam over IP, war dialing, call tampering.",
          "USB: gets around the firewall, can infect air-gapped networks, can pose as a keyboard, and can carry data out with zero bandwidth used.",
          "Software: client-based apps need constant updates. Agentless apps run from the server, so a compromised server affects every user.",
          "Networks: old Wi-Fi protocols (WEP, WPA, WPA2), open or rogue wireless, wired ports without 802.1X, Bluetooth.",
          "Every open port widens the attack surface. Default credentials are easy to look up and give full admin control.",
          "Supply chain examples in the notes: the 2013 Target breach via a vendor, and fake Cisco Catalyst switches in 2020."
        ],
        pages: [28, 29]
      },
      activities: [
        {
          id: "d2-vectors-a1", type: "match", format: "Match",
          prompt: "Match each scenario to its threat vector category.",
          choices: ["Message-based", "Image-based", "File-based", "Voice call", "Removable device", "Supply chain"],
          items: [
            { t: "A text message links to a fake invoice portal", a: "Message-based", why: "Links in email, SMS or IM are message-based vectors." },
            { t: "An uploaded SVG avatar contains embedded JavaScript", a: "Image-based", why: "SVG is XML, so it can carry script or HTML injection." },
            { t: "A spreadsheet in a bug report contains a macro", a: "File-based", why: "Office documents with macros are a file-based vector." },
            { t: "A caller spoofs the help desk number and asks for an MFA code", a: "Voice call", why: "Phishing over the phone is vishing." },
            { t: "A USB stick found in the lab parking lot acts as a keyboard when plugged in", a: "Removable device", why: "USB devices can pose as keyboards and bypass the firewall." },
            { t: "A managed service provider's remote access tool is used to reach every client network", a: "Supply chain", why: "MSPs access many customer networks from one place." }
          ],
          hint: "Ask how the payload reached the target.",
          explain: "Vector = delivery path. The same malware can arrive through many vectors.",
          pages: [28, 29]
        },
        {
          id: "d2-vectors-a2", type: "choice", format: "Scenario",
          prompt: "Your web app lets users upload profile images. Security testing finds that an uploaded image runs script in other users' browsers. Which format is the most likely culprit?",
          options: [
            { t: "SVG", ok: true, why: "SVG images are described in XML and can carry JavaScript or HTML injection." },
            { t: "A plain JPEG photo", why: "JPEG is raster pixel data, not markup. The notes single out SVG." },
            { t: "A PNG icon", why: "PNG is also raster data and isn't the format the notes flag." },
            { t: "A ZIP archive", why: "ZIP is a file-based vector, and it isn't an image." }
          ],
          hint: "Which image format is really a text document?",
          explain: "Text threats are easy to spot. Threats inside images are harder, and SVG's XML makes it risky without input validation.",
          pages: [28]
        },
        {
          id: "d2-vectors-a3", type: "choice", format: "Compare",
          prompt: "What's the key risk difference between a client-based app and an agentless app?",
          options: [
            { t: "Agentless: one compromised server affects all users", ok: true, why: "No local install. Every client runs a fresh instance from the server, so a server compromise hits everyone." },
            { t: "Agentless apps never need patching", why: "The server side still needs patching." },
            { t: "Client-based apps can't have unknown vulnerabilities", why: "The notes say client executables can have known or unknown vulnerabilities." },
            { t: "There's no difference in risk", why: "Where the code lives changes what one compromise can reach." }
          ],
          hint: "Where does the code actually run from each time?",
          explain: "Client-based means many installed copies to keep updated. Agentless means one central point of failure.",
          pages: [29]
        },
        {
          id: "d2-vectors-a4", type: "multi", format: "Investigate",
          prompt: "You're reviewing a new test lab before it goes live. Which findings are threat vectors the notes call out? Select all that apply.",
          artifact: { kind: "log", title: "lab-audit.txt", body: "router01   admin/admin (factory default)\nwifi-lab   WPA2-PSK, guest SSID open\nswitch02   access ports, 802.1X: disabled\napp-srv    ports open: 22, 80, 443, 3306, 8080-8090\nbuild-pc   Windows version: end of support 2 yrs ago" },
          options: [
            { t: "Factory default router credentials", ok: true, why: "Defaults are easy to look up and give full admin control." },
            { t: "Open guest wireless network", ok: true, why: "Open or rogue wireless is an unsecure network vector." },
            { t: "Wired ports without 802.1X", ok: true, why: "The notes list 'no 802.1X' as an unsecure wired interface." },
            { t: "Many open service ports", ok: true, why: "Each open port is another opportunity and widens the attack surface." },
            { t: "An unsupported operating system", ok: true, why: "Unsupported systems aren't patched, and one system can be an entry point." }
          ],
          hint: "Every line in the audit maps to a vector in the notes.",
          explain: "All five are real vectors. Real environments usually have several at once.",
          pages: [29]
        },
        {
          id: "d2-vectors-a5", type: "recall", format: "Recall",
          front: "Why are USB devices a serious vector even on an air-gapped network?",
          back: "USB gets around the firewall: it can carry malware onto isolated networks, act as a keyboard, and carry huge amounts of data out with no network bandwidth used.",
          pages: [28]
        }
      ]
    },
    {
      id: "d2-phishing",
      objective: "2.2",
      section: "Phishing",
      title: "Phishing",
      pages: [29],
      lesson: {
        summary: [
          "Phishing is social engineering plus spoofing, usually by email or text. Something is usually slightly off: the URL, spelling, fonts or graphics.",
          "Business email compromise (BEC) abuses our trust in email: spoofed sender addresses, fake bank detail updates, altered wire transfers.",
          "Typosquatting is URL hijacking with a lookalike domain. Pretexting is lying inside a story the attacker invents.",
          "Vishing is voice phishing (often with caller ID spoofing). Smishing is SMS phishing."
        ],
        more: [
          "Always check the URL before trusting a page.",
          "Common variations in the notes: fake check scam, phone verification code scam, boss/CEO scam, advance-fee scam.",
          "QA angle: a convincing 'your build pipeline token expires today' email that links to a lookalike CI login page is phishing aimed at engineers."
        ],
        pages: [29]
      },
      activities: [
        {
          id: "d2-phishing-a1", type: "multi", format: "Investigate",
          prompt: "This email arrived in the QA team's inbox. Which details are phishing red flags? Select all that apply.",
          artifact: { kind: "log", title: "email.eml", body: "From: \"Jenkins Admin\" <admin@jenklns-ci.com>\nSubject: URGENT: your API token expires in 1 hour\n\nYour pipline token will be revoked. Re-authenticate now:\nhttps://jenklns-ci.com/login?next=/token\n\nCI Team" },
          options: [
            { t: "The sender domain swaps an 'i' for an 'l'", ok: true, why: "A lookalike domain is typosquatting." },
            { t: "The urgent one-hour deadline", ok: true, why: "Pressure to act fast is a classic lure." },
            { t: "The misspelling 'pipline'", ok: true, why: "The notes say something is usually not quite right, such as spelling." },
            { t: "The link goes to the same lookalike domain", ok: true, why: "Check the URL. It isn't your real CI server." },
            { t: "It's addressed to a team mailbox", why: "Team mailboxes get real email all the time. That alone isn't a red flag." }
          ],
          hint: "Read the domain letter by letter.",
          explain: "Look for small mistakes in URLs, spelling and design, plus pressure to act now.",
          pages: [29]
        },
        {
          id: "d2-phishing-a2", type: "match", format: "Match",
          prompt: "Match each attack to its name.",
          choices: ["Business email compromise", "Typosquatting", "Pretexting", "Vishing", "Smishing"],
          items: [
            { t: "An email that appears to come from a vendor asks finance to update its bank account for invoices", a: "Business email compromise", why: "Spoofed trusted sender plus financial fraud." },
            { t: "A fake site at githuh.com hosts a login page", a: "Typosquatting", why: "A misspelled lookalike domain." },
            { t: "A caller says they're from your card company about an automatic payment and asks to confirm details", a: "Pretexting", why: "The attacker plays a character in a situation they made up." },
            { t: "A voicemail claims a bank security check is needed and gives a callback number", a: "Vishing", why: "Phishing by phone or voicemail." },
            { t: "A text says your package is held and links to a 'fee payment' page", a: "Smishing", why: "Phishing by SMS." }
          ],
          hint: "Focus on the channel first, then the trick.",
          explain: "Several can overlap. A vishing call usually uses a pretext too. Pick the most specific match.",
          pages: [29]
        },
        {
          id: "d2-phishing-a3", type: "choice", format: "Next action",
          prompt: "Finance gets an email from a known supplier's address saying their bank details changed and the next payment should go to a new account. What's the best next action?",
          options: [
            { t: "Verify the change by calling the supplier on a known number", ok: true, why: "BEC relies on trusting the email. Confirm out of band." },
            { t: "Reply to the email asking for confirmation", why: "If the account or address is spoofed or compromised, the attacker answers." },
            { t: "Pay to the new account, since the sender address matches", why: "Sender addresses can be spoofed. Matching isn't proof." },
            { t: "Forward it to the whole company as a warning before checking", why: "Verify first. It may be real, and broadcasting doesn't stop the transfer." }
          ],
          hint: "Use a channel the attacker doesn't control.",
          explain: "Business email compromise targets payment details. Out-of-band verification breaks it.",
          pages: [29]
        },
        {
          id: "d2-phishing-a4", type: "recall", format: "Recall",
          front: "Vishing vs. smishing?",
          back: "Vishing is voice phishing by phone or voicemail, often with caller ID spoofing. Smishing is SMS phishing by text message, with forwarded links or requests for personal info.",
          pages: [29]
        }
      ]
    },
    {
      id: "d2-impersonation",
      objective: "2.2",
      section: "Impersonation",
      title: "Impersonation",
      pages: [30],
      lesson: {
        summary: [
          "A pretext is the story set up before the attack: an actor and a plot.",
          "Impersonation means pretending to be someone else, using recon details, claiming higher rank, throwing jargon around, or acting friendly.",
          "Eliciting information is drawing details out of a victim who doesn't realize it's happening. It's common in vishing.",
          "Identity fraud uses your details for credit card, bank, loan or government benefit fraud."
        ],
        more: [
          "Defenses: never volunteer information, don't share personal details, always verify (call back, use third parties), and encourage verification culture.",
          "QA angle: 'Hi, I'm from the platform team, I need the staging admin password to fix the broken deploy' is impersonation. Verify through your team's real channel."
        ],
        pages: [30]
      },
      activities: [
        {
          id: "d2-impersonation-a1", type: "match", format: "Match",
          prompt: "Match each impersonation tactic to what the attacker is doing.",
          choices: ["Claiming authority", "Technical overload", "Being a buddy", "Using recon details"],
          items: [
            { t: "\"This is the VP's office. We need this done before the board meeting.\"", a: "Claiming authority", why: "Attacking as someone higher in rank." },
            { t: "\"Your container's TLS handshake is desyncing the kernel cache, so I need your token.\"", a: "Technical overload", why: "Jargon to confuse and impress." },
            { t: "\"Rough sprint, huh? Anyway, quick favor...\"", a: "Being a buddy", why: "Building rapport so you lower your guard." },
            { t: "\"I see you're on the Payments QA team under Dana, ticket QA-412.\"", a: "Using recon details", why: "Real details make the story believable." }
          ],
          hint: "What lever is being pulled: rank, confusion, friendliness, or credibility?",
          explain: "Impersonators combine these. Spotting the lever helps you pause.",
          pages: [30]
        },
        {
          id: "d2-impersonation-a2", type: "choice", format: "Next action",
          prompt: "A caller says they're from IT and need you to read out the one-time code just sent to your phone to 'finish a security upgrade'. What do you do?",
          options: [
            { t: "Hang up and call the help desk on the known number", ok: true, why: "Always verify before revealing anything. Call back through a trusted channel." },
            { t: "Read the code out, since it expires in a few minutes anyway", why: "That code is exactly what the attacker needs to log in as you." },
            { t: "Ask the caller for their employee ID first", why: "An impostor can invent an ID. Verify through a channel you control." },
            { t: "Give the code but change your password afterward", why: "The attacker can use the session before you change anything." }
          ],
          hint: "Who controls the channel you'd use to verify?",
          explain: "Never volunteer information, and verify through a separate trusted path.",
          pages: [30]
        },
        {
          id: "d2-impersonation-a3", type: "choice", format: "Compare",
          prompt: "What sets 'eliciting information' apart from simply asking for a password?",
          options: [
            { t: "The victim doesn't notice it happening", ok: true, why: "Elicitation uses psychological techniques so the target doesn't notice." },
            { t: "It only happens by email", why: "The notes say it's often seen in vishing." },
            { t: "It's only used against executives", why: "Anyone can be a target." },
            { t: "It needs malware on the victim's device", why: "It's purely social. No malware is involved." }
          ],
          hint: "The notes call it 'hacking the human'.",
          explain: "Attackers can't just ask for your password, so they draw details out indirectly.",
          pages: [30]
        },
        {
          id: "d2-impersonation-a4", type: "recall", format: "Recall",
          front: "Name the four types of identity fraud in the notes.",
          back: "Credit card fraud, bank fraud, loan fraud and government benefits fraud.",
          pages: [30]
        }
      ]
    },
    {
      id: "d2-wateringhole",
      objective: "2.2",
      section: "Watering Hole Attacks",
      title: "Watering hole attacks",
      pages: [30],
      lesson: {
        summary: [
          "When the target is too well defended to phish, the attacker infects a third-party site the target group already visits.",
          "Steps: work out which sites the victims use, infect one of them, then let it infect visitors while you wait for the real targets.",
          "Defense is layered: firewalls and IPS, plus up-to-date anti-malware signatures."
        ],
        more: [
          "The notes' example: in January 2017, sites used by financial regulators were poisoned to serve malicious JavaScript only to IP addresses of banks and financial institutions.",
          "Generic anti-virus signatures recognized and stopped that attack code at one of the victims.",
          "QA angle: poisoning a popular internal wiki, a vendor's docs site or a package mirror your team uses daily is the same idea."
        ],
        pages: [30]
      },
      activities: [
        {
          id: "d2-wateringhole-a1", type: "order", format: "Order",
          prompt: "Put the steps of a watering hole attack in order.",
          steps: [
            { t: "Research which websites the target group visits", why: "It starts with an educated guess about their habits." },
            { t: "Find a weakness in one of those third-party sites", why: "The attacker needs a way to plant code there." },
            { t: "Infect the site", why: "It's now the poisoned watering hole." },
            { t: "Visitors get infected, including the intended victims", why: "Everyone is hit, but the attacker only wants specific targets." }
          ],
          hint: "Research comes before the infection.",
          explain: "Instead of going to the target, the attacker waits where the target goes.",
          pages: [30]
        },
        {
          id: "d2-wateringhole-a2", type: "choice", format: "Scenario",
          prompt: "An attacker can't get past a firm's email filtering, so they compromise an industry forum its developers read daily. What attack is this?",
          options: [
            { t: "Watering hole attack", ok: true, why: "Infecting a site the target group trusts and visits." },
            { t: "Typosquatting", why: "Typosquatting uses a lookalike domain, not a compromised real site." },
            { t: "Smishing", why: "Smishing uses text messages." },
            { t: "Business email compromise (BEC)", why: "BEC uses email, which the attacker couldn't get through here." }
          ],
          hint: "The real site was infected, not faked.",
          explain: "Watering holes are used when the target itself is well protected.",
          pages: [30]
        },
        {
          id: "d2-wateringhole-a3", type: "choice", format: "Troubleshoot",
          prompt: "After a watering hole attack, which defense do the notes credit with stopping the malicious code at one victim?",
          options: [
            { t: "Generic anti-virus signatures", ok: true, why: "Generic signatures recognized the attack code and stopped it." },
            { t: "A user-awareness poster campaign in the office", why: "The victims did nothing unusual, they just browsed a normal site." },
            { t: "Disabling email attachments", why: "This attack didn't use email." },
            { t: "A longer password policy", why: "Passwords weren't the vector." }
          ],
          hint: "It's never one thing, but one layer caught it.",
          explain: "Defense in depth: firewalls and IPS, plus updated anti-malware signatures.",
          pages: [30]
        },
        {
          id: "d2-wateringhole-a4", type: "recall", format: "Recall",
          front: "Why did the 2017 watering hole attack only serve malware to some visitors?",
          back: "The malicious JavaScript was only delivered to IP addresses that matched banks and other financial institutions, the real targets.",
          pages: [30]
        }
      ]
    },
    {
      id: "d2-othersocial",
      objective: "2.2",
      section: "Other Social Engineering Attacks",
      title: "Misinformation and brand impersonation",
      pages: [31],
      lesson: {
        summary: [
          "Misinformation and disinformation spread false information to create confusion and division.",
          "Influence campaigns try to sway opinion on political and social issues. Nation states use them to divide, distract and persuade. Social media and paid ads amplify them.",
          "Brand impersonation fakes a well-known brand across thousands of sites, ads and messages. Malware infection from the pop-ups is almost guaranteed."
        ],
        more: [
          "The notes show the misinformation process as a diagram: create fake users, create content, post on social media, amplify the message, real users share it, then mass media picks up the story.",
          "Brand impersonation sites get into search indexes, paid ads and messaging apps, then show 'You won!' or 'Download the video' pop-ups."
        ],
        pages: [31]
      },
      activities: [
        {
          id: "d2-othersocial-a1", type: "order", format: "Order",
          prompt: "Put the misinformation process from the notes' diagram in order.",
          steps: [
            { t: "Create fake users", why: "Accounts are needed before anything can be posted." },
            { t: "Create content", why: "The false story is produced." },
            { t: "Post it on social media", why: "It's published by the fake accounts." },
            { t: "Amplify the message", why: "Likes, shares and ads boost its reach." },
            { t: "Real users share it", why: "Real people now spread it unknowingly." },
            { t: "Mass media picks up the story", why: "It reaches the widest audience." }
          ],
          hint: "It starts with fake accounts and ends with real news coverage.",
          explain: "Fake accounts seed and boost the content until real people and media carry it.",
          pages: [31]
        },
        {
          id: "d2-othersocial-a2", type: "choice", format: "Scenario",
          prompt: "Thousands of sites copy a popular sportswear brand's look, show up in search ads, and greet visitors with 'You won! Download your voucher.' What is this?",
          options: [
            { t: "Brand impersonation", ok: true, why: "Faking a well-known brand at scale, with malware-laden pop-ups." },
            { t: "Watering hole attack", why: "A watering hole compromises a real site the targets already visit." },
            { t: "An influence campaign", why: "Influence campaigns sway opinion. This one wants clicks and infections." },
            { t: "Pretexting", why: "Pretexting is a story told one-on-one, not mass fake sites." }
          ],
          hint: "Whose identity is being faked?",
          explain: "Brand impersonation leads to ads, tracking and data exfiltration.",
          pages: [31]
        },
        {
          id: "d2-othersocial-a3", type: "multi", format: "Investigate",
          prompt: "Which are features of influence campaigns according to the notes? Select all that apply.",
          options: [
            { t: "Sway public opinion on political and social issues", ok: true, why: "That's their purpose." },
            { t: "Often run by nation-state actors", ok: true, why: "To divide, distract and persuade." },
            { t: "Can use paid advertising", ok: true, why: "Buying a voice for an opinion." },
            { t: "Spread through social media sharing and liking", ok: true, why: "Social media enables them." },
            { t: "Require exploiting a software vulnerability", why: "They exploit people and platforms, not code." }
          ],
          hint: "Think opinion, not exploits.",
          explain: "Influence campaigns are social engineering at population scale.",
          pages: [31]
        },
        {
          id: "d2-othersocial-a4", type: "recall", format: "Recall",
          front: "Misinformation vs. a phishing email: what's the goal of each?",
          back: "Misinformation spreads false information to create confusion and division or sway opinion. Phishing tricks an individual into giving up access or information.",
          pages: [31]
        }
      ]
    },
    // ------------------------------------------------------------------ 2.3
    {
      id: "d2-meminject",
      objective: "2.3",
      section: "Memory Injections",
      title: "Memory injection",
      pages: [31],
      lesson: {
        summary: [
          "Malware has to run in memory, so memory forensics can find it among processes, DLLs, threads and buffers.",
          "Malware either runs as its own process or injects itself into a legitimate one to hide.",
          "Memory injection adds code to an existing process. The code gets that process's data, rights and permissions, which can mean privilege escalation.",
          "DLL injection is one of the most popular methods: the attacker injects a path to a malicious DLL, which then runs as part of the target process."
        ],
        more: [
          "A DLL (Dynamic-Link Library) is a Windows library of code and data that many apps can share.",
          "The notes' diagram shows a target process's memory with a path to a malicious DLL on disk, and then the malicious DLL loaded inside the process.",
          "QA angle: if a trusted test runner process suddenly makes outbound connections it never made before, injected code is one explanation."
        ],
        pages: [31]
      },
      activities: [
        {
          id: "d2-meminject-a1", type: "choice", format: "Scenario",
          prompt: "EDR shows a signed, trusted Windows process loading a library from a user's temp folder, then making unusual network calls. What attack fits best?",
          options: [
            { t: "DLL injection", ok: true, why: "A path to a malicious DLL was injected, so it runs inside the trusted process." },
            { t: "SQL injection", why: "SQL injection targets database queries, not process memory." },
            { t: "A buffer overflow in a web form", why: "Possible in general, but loading a foreign library into a process is the DLL injection pattern." },
            { t: "Typosquatting", why: "That's a lookalike domain trick." }
          ],
          hint: "A library loaded from somewhere it shouldn't come from.",
          explain: "DLL injection hides malware inside a legitimate process and gives it that process's permissions.",
          pages: [31]
        },
        {
          id: "d2-meminject-a2", type: "multi", format: "Investigate",
          prompt: "Why do attackers inject code into an existing process instead of running their own? Select all that apply.",
          options: [
            { t: "To hide inside a legitimate process", ok: true, why: "It blends in with trusted activity." },
            { t: "To get the process's data", ok: true, why: "Injected code can read what the process holds." },
            { t: "To inherit the process's rights and permissions", ok: true, why: "This can be a privilege escalation." },
            { t: "Because injected code can't be found by memory forensics", why: "Memory forensics can find malicious code. That's the point of it." }
          ],
          hint: "Think stealth and permissions.",
          explain: "Running inside something trusted gives cover plus its access level.",
          pages: [31]
        },
        {
          id: "d2-meminject-a3", type: "recall", format: "Recall",
          front: "What is a DLL, and why is DLL injection popular?",
          back: "A Dynamic-Link Library: a Windows library of code and data that many apps can use. Injecting a path to a malicious DLL makes it run as part of the target process, and it's relatively easy to do.",
          pages: [31]
        }
      ]
    },
    {
      id: "d2-overflow",
      objective: "2.3",
      section: "Buffer Overflows",
      title: "Buffer overflows",
      pages: [32],
      lesson: {
        summary: [
          "A buffer overflow writes more data into a memory buffer than it holds, spilling into neighboring memory.",
          "Developers prevent it with bounds checking: make sure input fits before writing it.",
          "It isn't a simple exploit. It takes time to avoid crashes and to make it do what the attacker wants.",
          "A useful overflow is repeatable, and that means a reliable way to compromise the system."
        ],
        more: [
          "The notes' diagram: variable A (8 bytes) sits next to variable B (a number, 1979). Writing the 9-character word 'excessive' into A overflows into B and changes its value (shown as 25856).",
          "QA angle: boundary-value tests (max length, max length + 1) are exactly how you catch missing bounds checks."
        ],
        pages: [32]
      },
      activities: [
        {
          id: "d2-overflow-a1", type: "choice", format: "Troubleshoot",
          prompt: "A fuzz test sends a 9-character string into an 8-byte field. Afterward, an unrelated variable next to it in memory has a different value. What happened?",
          options: [
            { t: "A buffer overflow", ok: true, why: "The extra data spilled past the buffer and overwrote the neighboring variable." },
            { t: "A race condition", why: "There's no timing between two events here, just too much data." },
            { t: "Memory injection", why: "Injection adds code to a process. This is input overwriting memory." },
            { t: "A hash collision in the input validator", why: "No hashing is involved." }
          ],
          hint: "More data than space.",
          explain: "This mirrors the notes' diagram: overflowing variable A changes variable B.",
          pages: [32]
        },
        {
          id: "d2-overflow-a2", type: "choice", format: "Next action",
          prompt: "Code review finds that a parser copies user input into a fixed-size buffer without checking its length. What's the fix the notes point to?",
          options: [
            { t: "Add bounds checking", ok: true, why: "Check the input fits before writing it." },
            { t: "Encrypt the buffer contents", why: "Encryption doesn't stop too much data from being written." },
            { t: "Add a login banner", why: "Banners deter people. They don't fix code." },
            { t: "Hash the input before copying it", why: "Hashing changes the data. It doesn't enforce the buffer size." }
          ],
          hint: "Developers need to check the edges.",
          explain: "Bounds checking is the developer's job, and attackers spend a lot of time looking for places it's missing.",
          pages: [32]
        },
        {
          id: "d2-overflow-a3", type: "recall", format: "Recall",
          front: "Why is a repeatable buffer overflow especially dangerous?",
          back: "Overflows are hard to get right without crashing things. Once an attacker has one that works reliably, they can use it to compromise the system again and again.",
          pages: [32]
        }
      ]
    },
    {
      id: "d2-race",
      objective: "2.3",
      section: "Race Conditions",
      title: "Race conditions",
      pages: [32],
      lesson: {
        summary: [
          "A race condition happens when two things occur at about the same time and the program didn't plan for it.",
          "Time-of-check to time-of-use (TOCTOU): something changes between when you check a value and when you use it.",
          "The notes' bank example: two users each check that Account A has $100, then both transfer $50 out. Without proper validation, the totals come out wrong."
        ],
        more: [
          "In the example, Account A ends at $50 but Account B ends at $200. The notes add that it assumes deposits are immediate and withdrawals aren't.",
          "Real-world examples: the Mars rover Spirit got into a reboot loop in 2004 because of a file system problem, and at Pwn2Own 2023 a TOCTOU attack on a Tesla Model 3's infotainment (over Bluetooth) gained root.",
          "QA angle: flaky tests that only fail when run in parallel are often race conditions. The same bugs exist in production APIs under concurrent load."
        ],
        pages: [32]
      },
      activities: [
        {
          id: "d2-race-a1", type: "choice", format: "Scenario",
          prompt: "An API checks a coupon's 'unused' flag, then applies the discount and marks it used. A load test fires the same coupon 20 times in parallel and it applies 6 times. What is this?",
          options: [
            { t: "A TOCTOU race condition", ok: true, why: "The state changed between the check and the use, and parallel requests all passed the check." },
            { t: "A buffer overflow", why: "No memory was overwritten." },
            { t: "SQL injection", why: "No input was crafted to change a query." },
            { t: "A replay attack", why: "These are legitimate parallel requests hitting a timing gap, not captured traffic." }
          ],
          hint: "Check, then use. What can happen in between?",
          explain: "Time-of-check to time-of-use bugs appear when concurrent actions aren't validated together.",
          pages: [32]
        },
        {
          id: "d2-race-a2", type: "order", format: "Order",
          prompt: "Put the notes' bank race condition in order (both accounts start at $100).",
          steps: [
            { t: "User 1 and User 2 both check the balances and see $100 in each account", why: "Both checks happen before either transfer." },
            { t: "User 1 transfers $50 from A to B (A: $50, B: $150)", why: "The first transfer completes." },
            { t: "User 2 transfers $50 from A, still thinking it has $100", why: "Their check is stale. This is the gap between check and use." },
            { t: "Result: A has $50 and B has $200", why: "Money was created. The expected result was A $0 and B $200, or A $50 and B $150." }
          ],
          hint: "Both checks come first.",
          explain: "Acting on a stale check is the core of TOCTOU.",
          pages: [32]
        },
        {
          id: "d2-race-a3", type: "recall", format: "Recall",
          front: "What does TOCTOU stand for, and what's the risk?",
          back: "Time-of-check to time-of-use. Something can change between checking a condition and acting on it, so the action is based on stale information.",
          pages: [32]
        }
      ]
    },
    {
      id: "d2-updates",
      objective: "2.3",
      section: "Malicious Updates",
      title: "Malicious updates",
      pages: [33],
      lesson: {
        summary: [
          "Keep OS and apps updated, but the update process has its own risks. Not every update is equally secure.",
          "Best practices: always have a known-good backup, and install only from trusted sources.",
          "For downloaded updates, confirm the source and go to the developer's site directly. Don't trust a random pop-up or update button.",
          "Many operating systems only allow signed apps. Don't disable that control."
        ],
        more: [
          "Automatic updates are relatively trustworthy because they come straight from the developer, often with signature checks.",
          "But SolarWinds Orion (reported December 2020) shows the risk: attackers got into the developer's systems, added malicious code to official updates, and reached hundreds of government agencies and companies.",
          "QA angle: pinning dependency versions and checking signatures or checksums in CI is the pipeline version of 'install from trusted sources'."
        ],
        pages: [33]
      },
      activities: [
        {
          id: "d2-updates-a1", type: "choice", format: "Next action",
          prompt: "While testing a staging site, a pop-up says 'Your browser plugin is out of date. Click to update.' What should you do?",
          options: [
            { t: "Close it and update from the developer's own site", ok: true, why: "Confirm the source. Don't trust random update buttons." },
            { t: "Click it, since updates fix security bugs", why: "The pop-up may itself be the malware." },
            { t: "Turn off signed-app enforcement so the update installs", why: "Never disable a security control to make an install work." },
            { t: "Download it and scan it later", why: "Get it from the trusted source in the first place." }
          ],
          hint: "Where did this update come from?",
          explain: "Every install could be malicious. Go to the source directly.",
          pages: [33]
        },
        {
          id: "d2-updates-a2", type: "choice", format: "Scenario",
          prompt: "A vendor's signed, automatic update turns out to contain attacker code that was inserted on the vendor's build systems. Which example from the notes is this most like?",
          options: [
            { t: "SolarWinds Orion", ok: true, why: "Attackers got into the development system and added code to the real updates." },
            { t: "Mirai", why: "Mirai abused default IoT credentials." },
            { t: "WannaCry", why: "WannaCry exploited an SMBv1 vulnerability." },
            { t: "Stuxnet", why: "Stuxnet was a nation-state worm against centrifuges." }
          ],
          hint: "The update itself was trustworthy-looking because it was real.",
          explain: "Automatic updates are relatively trustworthy, which is exactly what makes a poisoned one so effective.",
          pages: [33]
        },
        {
          id: "d2-updates-a3", type: "recall", format: "Recall",
          front: "What's the one best practice the notes repeat for updates?",
          back: "Always have a known-good backup (and install from trusted sources).",
          pages: [33]
        }
      ]
    },
    {
      id: "d2-osvuln",
      objective: "2.3",
      section: "Operating System Vulnerabilities",
      title: "Operating system vulnerabilities",
      pages: [33],
      lesson: {
        summary: [
          "Everyone runs an OS, which makes it a huge target. Millions of lines of code mean many chances for bugs that haven't been found yet.",
          "Microsoft releases patches on Patch Tuesday, the second Tuesday of each month. Other vendors have similar schedules.",
          "Best practices: always update, test patches before deploying, plan for reboots, and keep a fallback (backup)."
        ],
        more: [
          "The notes list a normal month (May 9, 2023): nearly 50 patches covering elevation of privilege, security feature bypass, remote code execution, information disclosure, denial of service and spoofing.",
          "It's a race between you and the attackers.",
          "QA angle: running the regression suite on a patched image before rolling it out is the 'test before deployment' step."
        ],
        pages: [33]
      },
      activities: [
        {
          id: "d2-osvuln-a1", type: "order", format: "Order",
          prompt: "Put a sensible OS patch rollout for a test server fleet in order.",
          steps: [
            { t: "Confirm you have a working backup", why: "Have a fallback before changing anything." },
            { t: "Apply the patch to a test image and run regression tests", why: "A patch might break something else." },
            { t: "Save work and schedule the reboot", why: "Patches may need a reboot." },
            { t: "Roll out to the fleet and monitor", why: "Deploy once it's tested." }
          ],
          hint: "Fallback first, deploy last.",
          explain: "Always update, but test and keep a fallback.",
          pages: [33]
        },
        {
          id: "d2-osvuln-a2", type: "choice", format: "Compare",
          prompt: "What is Patch Tuesday?",
          options: [
            { t: "Microsoft's monthly patch day", ok: true, why: "Other companies have similar schedules." },
            { t: "The day zero-days are announced", why: "Zero-days appear whenever they're found." },
            { t: "An emergency out-of-band release", why: "Out-of-band patches are released outside the normal cycle." },
            { t: "A weekly Linux kernel update", why: "The notes describe Microsoft's monthly schedule." }
          ],
          hint: "It's a monthly calendar event.",
          explain: "Regular schedules make patching predictable.",
          pages: [33]
        },
        {
          id: "d2-osvuln-a3", type: "recall", format: "Recall",
          front: "Why is the OS such a big target?",
          back: "Everyone has one, and it's extremely complex (millions of lines of code), so there are many undiscovered vulnerabilities.",
          pages: [33]
        }
      ]
    },
    {
      id: "d2-sqli",
      objective: "2.3",
      section: "SQL Injection",
      title: "SQL injection",
      pages: [34],
      lesson: {
        summary: [
          "Code injection adds attacker data into a data stream. It's possible because of bad programming: the app doesn't handle input and output properly.",
          "Injectable data types include HTML, SQL, XML and LDAP.",
          "SQL injection (SQLi) puts the attacker's own SQL into an app's query, often through a web form field.",
          "Results can include viewing or deleting all data, adding users, or denial of service."
        ],
        more: [
          "The classic pattern is building a query by joining strings with user input. An input like Professor' OR '1'='1 turns the WHERE clause into something that's always true.",
          "QA angle: a single quote in a search field that produces a database error in the API response is a strong hint that input reaches SQL unescaped."
        ],
        pages: [34]
      },
      activities: [
        {
          id: "d2-sqli-a1", type: "choice", format: "Troubleshoot",
          prompt: "Look at the API log. What's happening?",
          artifact: { kind: "log", title: "api.log", body: "GET /users?name=alice            200  rows=1\nGET /users?name=alice'           500  SQL syntax error near '''\nGET /users?name=x' OR '1'='1     200  rows=48213" },
          options: [
            { t: "SQL injection", ok: true, why: "A quote breaks the query, then an always-true condition returns every row." },
            { t: "Cross-site scripting", why: "No script is being injected for a browser to run." },
            { t: "Directory traversal", why: "No file paths are being manipulated." },
            { t: "Rate limiting is broken", why: "The issue is what the queries return, not how many there are." }
          ],
          hint: "What does OR '1'='1 do to a WHERE clause?",
          explain: "The app builds SQL from raw input. That's the bad programming the notes warn about.",
          pages: [34]
        },
        {
          id: "d2-sqli-a2", type: "multi", format: "Investigate",
          prompt: "Which outcomes do the notes list as possible with SQL injection? Select all that apply.",
          options: [
            { t: "View all database information", ok: true, why: "Listed." },
            { t: "Delete database information", ok: true, why: "Listed." },
            { t: "Add users", ok: true, why: "Listed." },
            { t: "Denial of service", ok: true, why: "Listed." },
            { t: "Physically damage the database server", why: "Not something SQL injection does." }
          ],
          hint: "If you control the query, you control the data.",
          explain: "SQLi gives the attacker direct access to the database through the app.",
          pages: [34]
        },
        {
          id: "d2-sqli-a3", type: "recall", format: "Recall",
          front: "What root cause do the notes give for code injection?",
          back: "Bad programming: the application doesn't properly handle input and output.",
          pages: [34]
        }
      ]
    },
    {
      id: "d2-xss",
      objective: "2.3",
      section: "Cross-site Scripting",
      title: "Cross-site scripting (XSS)",
      pages: [34, 35],
      lesson: {
        summary: [
          "XSS abuses the trust a user has in a site. It usually uses JavaScript. (CSS is something else: style sheets.)",
          "Reflected (non-persistent): the site runs script from user input, often a search box. The attacker emails a link, and the script runs in the victim's browser as if it came from the server.",
          "Stored (persistent): the attacker posts the payload to the site itself, so everyone who views the page gets it.",
          "Protection: be careful with untrusted links, consider controlling JavaScript, keep browsers updated, and validate input so users can't add scripts."
        ],
        more: [
          "Reflected XSS typically steals credentials, session IDs or cookies and sends them to the attacker.",
          "Stored XSS on social networks can spread on its own as each viewer reposts it.",
          "The notes' example: in 2017 a researcher found Subaru's auth tokens never expired, and an XSS flaw in the web front end let one malicious click hand over a token with full access to someone else's car.",
          "The diagram (PDF 35): attacker sends link, victim clicks and visits the real site, the site loads with the malicious script, the script sends the victim's data to the attacker."
        ],
        pages: [34, 35]
      },
      activities: [
        {
          id: "d2-xss-a1", type: "order", format: "Order",
          prompt: "Put the reflected XSS attack from the notes' diagram in order.",
          steps: [
            { t: "Attacker sends the victim a link containing a malicious script", why: "Step 1: delivery." },
            { t: "Victim clicks the link and visits the legitimate site", why: "Step 2: the trusted site is used." },
            { t: "The site loads and the script runs in the victim's browser", why: "Step 3: it runs as if it came from the server." },
            { t: "The script sends the victim's session cookie to the attacker", why: "Step 4: data is stolen." }
          ],
          hint: "Link, click, run, steal.",
          explain: "Reflected XSS bounces the script off the real site, so the browser trusts it.",
          pages: [35]
        },
        {
          id: "d2-xss-a2", type: "choice", format: "Compare",
          prompt: "A tester finds that a comment containing a script tag is saved and runs for every user who opens the ticket. Which XSS type is this?",
          options: [
            { t: "Stored (persistent)", ok: true, why: "The payload is saved on the site and hits every viewer." },
            { t: "Reflected (non-persistent)", why: "Reflected needs each victim to click a crafted link." },
            { t: "SQL injection", why: "It's script running in browsers, not SQL." },
            { t: "Cross-site request forgery", why: "CSRF makes requests as the user. It doesn't run injected script in the page." }
          ],
          hint: "Does each victim need their own link?",
          explain: "Persistent XSS needs no specific target. Everyone who views the page is affected.",
          pages: [34]
        },
        {
          id: "d2-xss-a3", type: "choice", format: "Next action",
          prompt: "Your security test proves the search box reflects script back to the page. What fix do the notes point to on the app side?",
          options: [
            { t: "Validate input so scripts can't be added", ok: true, why: "Don't allow users to add their own scripts to input fields." },
            { t: "Tell users never to search", why: "That's not a fix. The app must handle input safely." },
            { t: "Make session tokens never expire so users stay logged in", why: "The opposite: never-expiring tokens made the Subaru issue worse." },
            { t: "Rename the CSS files", why: "CSS is unrelated to cross-site scripting." }
          ],
          hint: "Fix the input handling.",
          explain: "User-side defenses help, but the app must validate input.",
          pages: [34]
        },
        {
          id: "d2-xss-a4", type: "recall", format: "Recall",
          front: "Why did the Subaru XSS flaw lead to full control of someone else's car account?",
          back: "Auth tokens never expired and any valid token allowed any service request. XSS let the attacker steal a user's token with one malicious link.",
          pages: [34]
        }
      ]
    },
    {
      id: "d2-hardware",
      objective: "2.3",
      section: "Hardware Vulnerabilities",
      title: "Hardware vulnerabilities",
      pages: [35],
      lesson: {
        summary: [
          "Many devices, especially IoT, have no OS you can access, yet they sit on the network as possible entry points.",
          "Firmware is the software inside hardware. Only the vendor can fix it, if they know and care.",
          "End of life (EOL): no longer sold but may still be supported. End of service life (EOSL): no longer sold and no more support or security patches.",
          "Legacy platforms run old OSes and apps. Weigh risk against return and add protections like extra firewall rules and IPS signatures."
        ],
        more: [
          "The notes' firmware example: a thermostat vendor was told about three vulnerabilities in April 2014, patched two a year later, and the last in January 2016.",
          "EOSL products may have a premium-cost support option.",
          "QA angle: an old device in the test lab that can only run an end-of-support OS should be isolated, not left on the main network."
        ],
        pages: [35]
      },
      activities: [
        {
          id: "d2-hardware-a1", type: "choice", format: "Compare",
          prompt: "A vendor stops selling a network appliance and also stops providing security patches for it. Which term applies?",
          options: [
            { t: "End of service life (EOSL)", ok: true, why: "No longer sold and no longer supported." },
            { t: "End of life (EOL)", why: "EOL means no longer sold, but support may continue." },
            { t: "Zero-day", why: "A zero-day is an unknown vulnerability with no patch." },
            { t: "Shadow IT", why: "That's about people bypassing IT." }
          ],
          hint: "Which one ends support too?",
          explain: "EOSL is the bigger security concern because patches stop.",
          pages: [35]
        },
        {
          id: "d2-hardware-a2", type: "choice", format: "Next action",
          prompt: "A legacy device in your lab must stay in service and runs an unsupported OS. What do the notes suggest?",
          options: [
            { t: "Add protections such as firewall rules and IPS signatures", ok: true, why: "Legacy platforms may need extra protection around them." },
            { t: "Ignore it, since it's only in the lab", why: "One system can be an entry point." },
            { t: "Write your own firmware patch", why: "Only the vendor can realistically fix their firmware." },
            { t: "Expose it to the internet so remote testers can reach it more easily", why: "That increases risk." }
          ],
          hint: "If you can't fix it, protect around it.",
          explain: "Compare the risk to the return, then add compensating protections.",
          pages: [35]
        },
        {
          id: "d2-hardware-a3", type: "recall", format: "Recall",
          front: "Why is firmware a special problem?",
          back: "It's the software inside the hardware, and only the vendor can fix it, assuming they know about the issue and care to fix it.",
          pages: [35]
        }
      ]
    },
    {
      id: "d2-virt",
      objective: "2.3",
      section: "Virtualization Vulnerabilities",
      title: "Virtualization vulnerabilities",
      pages: [36],
      lesson: {
        summary: [
          "VMs share many risks with physical machines, and the extra complexity adds more. Examples: local privilege escalation, command injection, information disclosure.",
          "VM escape means breaking out of a VM to reach the host OS or hardware. From there you can control the host and other guest VMs.",
          "Resource reuse: the hypervisor shares RAM, storage and CPU between VMs, so data can leak from one VM to another. Patches can reduce the risk."
        ],
        more: [
          "The notes' VM escape example (Pwn2Own, March 2017) chained three bugs: a browser JavaScript engine bug, a Windows 10 kernel bug, then a VMware hardware simulation bug to reach the host.",
          "Resource example: a host with 4 GB RAM running three VMs with 2 GB each. That only works because RAM is shared and reused.",
          "QA angle: ephemeral CI runners on shared hypervisors rely on strong isolation. A VM escape there could reach other teams' builds and secrets."
        ],
        pages: [36]
      },
      activities: [
        {
          id: "d2-virt-a1", type: "choice", format: "Scenario",
          prompt: "An attacker who compromised one guest VM is now controlling other VMs on the same host. What happened?",
          options: [
            { t: "VM escape", ok: true, why: "Breaking out of a VM to the host gives control of other guests." },
            { t: "Resource reuse", why: "Resource reuse can leak data, but taking control of other guests is escape." },
            { t: "Sideloading", why: "Sideloading is installing apps outside an app store." },
            { t: "Jailbreaking", why: "That's for mobile devices." }
          ],
          hint: "They got out of the box.",
          explain: "VM escape is described as a huge exploit: full control of the virtual world.",
          pages: [36]
        },
        {
          id: "d2-virt-a2", type: "choice", format: "Compare",
          prompt: "A test VM can read memory contents left over from a different VM on the same host. Which vulnerability is this?",
          options: [
            { t: "Resource reuse", ok: true, why: "Shared, reused resources let data leak between VMs." },
            { t: "VM escape", why: "No one broke out to control the host." },
            { t: "Buffer overflow", why: "No buffer was overrun." },
            { t: "Misconfigured open permissions", why: "This is the hypervisor's memory handling, not a permission setting." }
          ],
          hint: "The hypervisor hands out the same RAM to different VMs.",
          explain: "Memory management updates and security patches help reduce this risk.",
          pages: [36]
        },
        {
          id: "d2-virt-a3", type: "order", format: "Order",
          prompt: "Order the bug chain from the notes' 2017 VM escape example.",
          steps: [
            { t: "Browser JavaScript engine bug: code runs in the browser sandbox", why: "First foothold." },
            { t: "OS kernel bug: the guest OS is compromised", why: "Out of the sandbox, into the guest." },
            { t: "Hypervisor hardware simulation bug: escape to the host", why: "Out of the VM." }
          ],
          hint: "From the inside out.",
          explain: "Real escapes usually chain several vulnerabilities, layer by layer.",
          pages: [36]
        },
        {
          id: "d2-virt-a4", type: "recall", format: "Recall",
          front: "Name three virtualization vulnerabilities the notes list besides VM escape.",
          back: "Local privilege escalation, command injection and information disclosure (plus resource reuse).",
          pages: [36]
        }
      ]
    },
    {
      id: "d2-cloud",
      objective: "2.3",
      section: "Cloud-specific Vulnerabilities",
      title: "Cloud-specific vulnerabilities",
      pages: [36],
      lesson: {
        summary: [
          "Almost every company uses the cloud and puts sensitive data there, often without basic protections like MFA on management consoles.",
          "Attacks on cloud services include DoS, authentication bypass, directory traversal and remote code execution on unpatched systems.",
          "Web app attacks are rising (the notes name Log4j and Spring Cloud Function), along with XSS, out-of-bounds writes and SQL injection."
        ],
        more: [
          "The notes quote two statistics without a source: 76% of organizations don't use MFA for management console users, and 63% of production code is unpatched for high or critical vulnerabilities (CVSS 7.0 or higher).",
          "Out-of-bounds write: writing to memory you aren't allowed to, which can cause corruption, crashes or code execution.",
          "QA angle: a cloud test account with console access and no MFA is a common real-world gap."
        ],
        pages: [36]
      },
      activities: [
        {
          id: "d2-cloud-a1", type: "match", format: "Match",
          prompt: "Match each cloud service attack to its description.",
          choices: ["Authentication bypass", "Directory traversal", "Remote code execution", "Out-of-bounds write", "Denial of service"],
          items: [
            { t: "Weak or faulty login logic lets an attacker skip sign-in", a: "Authentication bypass", why: "Exploits weak authentication." },
            { t: "A request reaches files outside the intended folder due to bad configuration", a: "Directory traversal", why: "Faulty configuration puts data at risk." },
            { t: "An unpatched service lets an attacker run their own commands", a: "Remote code execution", why: "Takes advantage of unpatched systems." },
            { t: "Input writes into unauthorized memory and crashes the service", a: "Out-of-bounds write", why: "Data corruption, crashing or code execution." },
            { t: "The service is flooded until it stops responding", a: "Denial of service", why: "A fundamental attack type." }
          ],
          hint: "Think about what's being abused: login, paths, patches, memory or capacity.",
          explain: "Cloud services face the same core attacks as any app, at larger scale.",
          pages: [36]
        },
        {
          id: "d2-cloud-a2", type: "choice", format: "Next action",
          prompt: "An audit shows the team's cloud management console accounts sign in with passwords only. Based on the notes, what's the most basic fix?",
          options: [
            { t: "Turn on MFA for console users", ok: true, why: "The notes point out most organizations skip MFA on management consoles." },
            { t: "Move every cloud workload back on-premises", why: "Overkill. The gap is a missing basic control." },
            { t: "Rename the admin accounts", why: "Doesn't add a second factor." },
            { t: "Publish the console URL less widely", why: "Obscurity isn't authentication." }
          ],
          hint: "Simple best practices aren't being used.",
          explain: "Many cloud breaches come from skipping simple practices like MFA and patching.",
          pages: [36]
        },
        {
          id: "d2-cloud-a3", type: "recall", format: "Recall",
          front: "Which two web application vulnerabilities do the notes name as easy to exploit with big rewards?",
          back: "Log4j and Spring Cloud Function.",
          pages: [36]
        }
      ]
    },
    {
      id: "d2-supplychain",
      objective: "2.3",
      section: "Supply Chain Vulnerabilities",
      title: "Supply chain vulnerabilities",
      pages: [37],
      lesson: {
        summary: [
          "The supply chain runs from raw materials to customers, and attackers can infect any step. People trust their suppliers.",
          "Service providers (network, payroll, cleaning, cloud, sysadmin) often have internal access you can't fully control. Put security audits in the contract.",
          "Hardware providers: use a small supplier base, enforce strict policies, and design security in. Counterfeit gear is a real risk.",
          "Software providers: check digital signatures at install, question how updates are secured, and remember open source can be compromised too."
        ],
        more: [
          "Target, November 2013: an HVAC vendor was phished, its VPN credentials were stolen, and attackers used Target's open network to infect cash registers at 1,800 stores. About 40 million cards were stolen.",
          "July 2022: a reseller was arrested for selling over $1 billion of counterfeit Cisco gear through 30+ companies since 2013.",
          "SolarWinds Orion: updates compromised in March and June 2020, not found until December 2020, with about 18,000 customers including US government agencies.",
          "QA angle: a compromised npm or PyPI package pulled into your test framework is a software supply chain attack."
        ],
        pages: [37]
      },
      activities: [
        {
          id: "d2-supplychain-a1", type: "match", format: "Match",
          prompt: "Match each incident from the notes to the type of supply chain provider involved.",
          choices: ["Service provider", "Hardware provider", "Software provider"],
          items: [
            { t: "An HVAC contractor's stolen VPN credentials led to a retailer's card breach", a: "Service provider", why: "The Target breach came through a service vendor." },
            { t: "Counterfeit networking gear sold as a major brand", a: "Hardware provider", why: "The fake Cisco equipment case." },
            { t: "Malicious code shipped in official product updates", a: "Software provider", why: "The SolarWinds Orion case." }
          ],
          hint: "Who supplied what: a service, a device, or code?",
          explain: "Every link in the chain needs its own trust controls.",
          pages: [37]
        },
        {
          id: "d2-supplychain-a2", type: "choice", format: "Next action",
          prompt: "You're onboarding a new payroll provider that will need access to internal systems. Which control do the notes recommend?",
          options: [
            { t: "Ongoing security audits written into the contract", ok: true, why: "You can't fully control a provider, so audit them." },
            { t: "Trust them because they're a well-known brand", why: "Trust in suppliers is exactly what attackers exploit." },
            { t: "Give them the same access as internal admins for simplicity", why: "Providers' access is an opportunity for attackers. Limit it." },
            { t: "Skip review because payroll isn't IT", why: "The Target HVAC vendor wasn't IT either." }
          ],
          hint: "Make security part of the agreement.",
          explain: "Service providers often reach internal services. Audit them regularly.",
          pages: [37]
        },
        {
          id: "d2-supplychain-a3", type: "multi", format: "Investigate",
          prompt: "Which hardware supply chain practices appear in the notes? Select all that apply.",
          options: [
            { t: "Use a small supplier base", ok: true, why: "Tighter control over vendors." },
            { t: "Strict controls over policies and procedures", ok: true, why: "Make sure proper security is in place." },
            { t: "Make security part of the overall design", ok: true, why: "There's a limit to trust." },
            { t: "Buy from whichever reseller is cheapest", why: "That's how counterfeit gear gets in." }
          ],
          hint: "Fewer, controlled suppliers.",
          explain: "Hardware is a perfect pivot point, so its source matters.",
          pages: [37]
        },
        {
          id: "d2-supplychain-a4", type: "recall", format: "Recall",
          front: "How did attackers reach Target's cash registers in 2013?",
          back: "They phished an HVAC vendor, stole its VPN credentials, then used Target's wide-open network to infect registers at 1,800 stores.",
          pages: [37]
        }
      ]
    },
    {
      id: "d2-misconfig",
      objective: "2.3",
      section: "Misconfiguration Vulnerabilities",
      title: "Misconfiguration vulnerabilities",
      pages: [37, 38],
      lesson: {
        summary: [
          "Open permissions are easy to leave behind, especially on cloud storage. Attackers will find them.",
          "Unsecured admin accounts: weak passwords on root or Administrator. Disable direct root login, use su or sudo, and keep few admin accounts.",
          "Insecure protocols send everything in the clear (Telnet, FTP, SMTP, IMAP). Use encrypted versions like SSH, SFTP and IMAPS.",
          "Default settings and logins often never change. Open ports and services need careful firewall management, testing and auditing."
        ],
        more: [
          "June 2017: a third party left an Amazon S3 repository open, exposing 14 million Verizon records.",
          "The Mirai botnet took over IoT devices using 60+ default configurations, and was then released as open source.",
          "You can verify protocol encryption with a packet capture.",
          "QA angle: a test bucket with public read access holding production data copies is an open-permission misconfiguration."
        ],
        pages: [37, 38]
      },
      activities: [
        {
          id: "d2-misconfig-a1", type: "multi", format: "Investigate",
          prompt: "Review this config dump from a staging environment. Which lines are misconfigurations the notes warn about? Select all that apply.",
          artifact: { kind: "log", title: "staging-config-review.txt", body: "s3://qa-exports          ACL: public-read\nsshd_config              PermitRootLogin yes\nlegacy-deploy            protocol: ftp (port 21)\ncamera-lab-01            login: admin / admin (unchanged)\nweb-01                   TLS 1.3 on 443, HTTP redirects to HTTPS" },
          options: [
            { t: "Public-read storage bucket", ok: true, why: "Open permissions on cloud storage." },
            { t: "Direct root login allowed", ok: true, why: "Disable it and use su or sudo." },
            { t: "Deployments over FTP", ok: true, why: "FTP sends everything in the clear. Use SFTP." },
            { t: "Unchanged default camera login", ok: true, why: "Default settings are what Mirai exploited." },
            { t: "TLS 1.3 with HTTP-to-HTTPS redirect", why: "That's an encrypted setup, not a misconfiguration." }
          ],
          hint: "One line is the good example.",
          explain: "Misconfigurations are open doors. They don't need clever exploits.",
          pages: [37, 38]
        },
        {
          id: "d2-misconfig-a2", type: "match", format: "Match",
          prompt: "Match each insecure protocol to its encrypted replacement.",
          choices: ["SSH", "SFTP", "IMAPS"],
          items: [
            { t: "Telnet", a: "SSH", why: "SSH replaces cleartext remote terminals." },
            { t: "FTP", a: "SFTP", why: "SFTP is the encrypted file transfer option." },
            { t: "IMAP", a: "IMAPS", why: "IMAP over TLS." }
          ],
          hint: "Most just add an S.",
          explain: "Unencrypted protocols expose all traffic. A packet capture shows it.",
          pages: [38]
        },
        {
          id: "d2-misconfig-a3", type: "choice", format: "Scenario",
          prompt: "Thousands of cameras and routers join a botnet because they still use their factory logins. Which example from the notes is this?",
          options: [
            { t: "Mirai", ok: true, why: "Mirai used 60+ default configurations to take over IoT devices." },
            { t: "SolarWinds", why: "That was a poisoned software update." },
            { t: "Zeus", why: "Zeus is the notes' botnet size example for DDoS, not the default-login one." },
            { t: "POODLE", why: "POODLE is a TLS downgrade attack." }
          ],
          hint: "IoT plus default configs.",
          explain: "Default settings are a misconfiguration when they're never changed.",
          pages: [38]
        },
        {
          id: "d2-misconfig-a4", type: "recall", format: "Recall",
          front: "How should admin and root accounts be handled to avoid misconfiguration?",
          back: "Use strong passwords, disable direct root login (use su or sudo), and keep the number of admin-level accounts small.",
          pages: [37]
        }
      ]
    },
    {
      id: "d2-mobile",
      objective: "2.3",
      section: "Mobile Device Vulnerabilities",
      title: "Mobile device vulnerabilities",
      pages: [38],
      lesson: {
        summary: [
          "Mobile devices are hard to secure: small, always moving, full of personal and company data, and always online.",
          "Rooting (Android) and jailbreaking (iOS) give access to the OS, often by installing custom firmware. Security features can be bypassed and MDM becomes close to useless.",
          "Sideloading is installing apps manually without an app store. One Trojan app can cause a data breach."
        ],
        more: [
          "Manage installation sources: the global or local app store.",
          "QA angle: a rooted test phone used for debugging should never hold real company accounts, because MDM can't protect it properly."
        ],
        pages: [38]
      },
      activities: [
        {
          id: "d2-mobile-a1", type: "match", format: "Match",
          prompt: "Match each term to its meaning.",
          choices: ["Rooting", "Jailbreaking", "Sideloading"],
          items: [
            { t: "Gaining OS-level access on an Android device", a: "Rooting", why: "Android's term." },
            { t: "Gaining OS-level access on an iPhone", a: "Jailbreaking", why: "Apple iOS's term." },
            { t: "Installing an app from a downloaded file instead of an app store", a: "Sideloading", why: "Manual install that skips the store." }
          ],
          hint: "Two are platform names for the same idea.",
          explain: "All three get around the controls MDM depends on.",
          pages: [38]
        },
        {
          id: "d2-mobile-a2", type: "choice", format: "Scenario",
          prompt: "Your MDM reports policies applied, but a user's jailbroken phone is still running blocked apps. Why?",
          options: [
            { t: "Jailbreaking bypasses the MDM's controls", ok: true, why: "Uncontrolled OS access defeats the MDM." },
            { t: "The phone needs a stronger Wi-Fi signal", why: "Connectivity isn't the issue." },
            { t: "MDM only works on laptops", why: "MDM is built for mobile devices." },
            { t: "App stores always allow blocked apps", why: "Stores are a managed source. Sideloading avoids them." }
          ],
          hint: "Who controls the OS now?",
          explain: "Once the OS is replaced or opened, policy enforcement can't be trusted.",
          pages: [38]
        },
        {
          id: "d2-mobile-a3", type: "recall", format: "Recall",
          front: "Why are mobile devices challenging to secure?",
          back: "They're small, almost always moving, packed with personal and company data, and constantly connected to the internet.",
          pages: [38]
        }
      ]
    },
    {
      id: "d2-zeroday",
      objective: "2.3",
      section: "Zero-day Vulnerabilities",
      title: "Zero-day vulnerabilities",
      pages: [38],
      lesson: {
        summary: [
          "Most apps have vulnerabilities nobody has found yet. Researchers share theirs with developers. Attackers keep theirs secret for personal gain.",
          "A zero-day attack exploits a vulnerability the vendor doesn't know about, so there's no patch or mitigation yet.",
          "It's a race between exploitation and a patch, and defending against the unknown is difficult.",
          "Known vulnerabilities are tracked as CVEs (Common Vulnerabilities and Exposures)."
        ],
        more: [
          "The notes' 2023 examples: a Chrome zero-day with memory corruption and sandbox escape, a Microsoft Secure Boot zero-day allowing self-signed UEFI-level code, and three Apple iOS/iPadOS zero-days under active exploitation.",
          "QA angle: you can't write a test for a bug class nobody knows about, which is why layered defenses matter."
        ],
        pages: [38]
      },
      activities: [
        {
          id: "d2-zeroday-a1", type: "choice", format: "Compare",
          prompt: "What makes a vulnerability a zero-day?",
          options: [
            { t: "The vendor doesn't know it exists", ok: true, why: "There's no fix for an unknown problem." },
            { t: "It was patched today", why: "Once patched, it's a known vulnerability." },
            { t: "It has a CVSS score of zero", why: "Zero-day has nothing to do with the score." },
            { t: "It only affects day-old software", why: "It's about the vendor not knowing, not the software's age." }
          ],
          hint: "How much warning did the vendor get?",
          explain: "Zero-day attacks have no patch or mitigation available yet.",
          pages: [38]
        },
        {
          id: "d2-zeroday-a2", type: "choice", format: "Scenario",
          prompt: "A researcher finds a new browser flaw and reports it privately to the vendor. An attacker finds a similar one and keeps it secret. What's the difference?",
          options: [
            { t: "The researcher is enabling a fix; the attacker is keeping a zero-day", ok: true, why: "Good actors share with developers; attackers hoard unknown holes for gain." },
            { t: "Both are zero-day attacks", why: "Reporting a flaw isn't an attack." },
            { t: "There's no real difference, because a CVE number gets assigned to both of them anyway", why: "The attacker's flaw has no CVE because nobody knows about it." },
            { t: "The attacker's flaw is less dangerous", why: "Unknown flaws are the hardest to defend against." }
          ],
          hint: "Who gets to know about it?",
          explain: "Disclosure starts the race toward a patch. Secrecy keeps the vendor in the dark.",
          pages: [38]
        },
        {
          id: "d2-zeroday-a3", type: "recall", format: "Recall",
          front: "What does CVE stand for?",
          back: "Common Vulnerabilities and Exposures, the public list of known vulnerabilities.",
          pages: [38]
        }
      ]
    },
    // ------------------------------------------------------------------ 2.4
    {
      id: "d2-malware",
      objective: "2.4",
      section: "An Overview of Malware",
      title: "Malware overview and ransomware",
      pages: [39],
      lesson: {
        summary: [
          "Malware is malicious software. It can gather information (like keystrokes), show ads, or encrypt and ruin your data.",
          "Types in the notes: virus, worm, ransomware, Trojan horse, rootkit, keylogger, spyware, bloatware and logic bomb. They often work together.",
          "Infection needs two things: your computer runs a program (link, pop-up, drive-by download, worm) and your computer is vulnerable (unpatched OS or apps).",
          "Ransomware encrypts your data files but leaves the OS running, then demands payment for the decryption key."
        ],
        more: [
          "Chained example: a worm exploits a vulnerability, installs malware with a remote access backdoor, and more malware may follow.",
          "Ransomware protection: keep an offline backup, and keep the OS, apps and anti-malware signatures up to date.",
          "Both personal data (photos, documents) and organizational data (plans, employee PII, financials) have a price.",
          "QA angle: if your test data backups live on the same network share the ransomware can reach, they aren't really a backup."
        ],
        pages: [39]
      },
      activities: [
        {
          id: "d2-malware-a1", type: "choice", format: "Scenario",
          prompt: "A test server still boots and the OS works, but every document and database file has a new extension and a note demands cryptocurrency for a key. What is this?",
          options: [
            { t: "Ransomware", ok: true, why: "Data is encrypted, the OS stays up, and a key is sold back to you." },
            { t: "Bloatware", why: "Bloatware is unwanted preinstalled apps." },
            { t: "A rootkit", why: "Rootkits hide. They don't announce themselves with a ransom note." },
            { t: "A time-triggered logic bomb", why: "A logic bomb waits for a trigger. It isn't defined by ransom." }
          ],
          hint: "They want you running, but not working.",
          explain: "Ransomware uses public-key cryptography against you.",
          pages: [39]
        },
        {
          id: "d2-malware-a2", type: "choice", format: "Next action",
          prompt: "Which protection do the notes stress most for recovering from ransomware without paying?",
          options: [
            { t: "An offline backup", ok: true, why: "Ransomware can't encrypt what it can't reach." },
            { t: "A longer password policy", why: "Doesn't bring back encrypted files." },
            { t: "Paying quickly to get a discount", why: "Paying isn't protection." },
            { t: "Turning off the screen saver", why: "Unrelated." }
          ],
          hint: "What gets your data back?",
          explain: "Backups plus patching plus up-to-date signatures. Keep everything up to date.",
          pages: [39]
        },
        {
          id: "d2-malware-a3", type: "multi", format: "Investigate",
          prompt: "Which of these does the notes' list give as ways your computer ends up running malware? Select all that apply.",
          options: [
            { t: "Clicking an email link", ok: true, why: "Listed." },
            { t: "A web page pop-up", ok: true, why: "Listed." },
            { t: "A drive-by download", ok: true, why: "Listed." },
            { t: "A worm", ok: true, why: "Listed." },
            { t: "Changing your desktop wallpaper", why: "Not a malware delivery method." }
          ],
          hint: "Your computer must run a program somehow.",
          explain: "Malware needs a way to run and a vulnerability to use.",
          pages: [39]
        },
        {
          id: "d2-malware-a4", type: "recall", format: "Recall",
          front: "What two conditions do the notes give for getting malware?",
          back: "Your computer must run a program (link, pop-up, drive-by download, worm), and your computer is vulnerable (unpatched OS or applications).",
          pages: [39]
        }
      ]
    },
    {
      id: "d2-virusworm",
      objective: "2.4",
      section: "Viruses and Worms",
      title: "Viruses and worms",
      pages: [39, 40],
      lesson: {
        summary: [
          "A virus reproduces itself but needs you to run a program. It spreads through file systems or the network.",
          "Virus types: program, boot sector, script (OS or browser) and macro (common in Office).",
          "A fileless virus runs only in memory and is never saved as a file, which helps it avoid anti-virus.",
          "A worm self-replicates over the network without any user action and spreads very quickly. Firewalls and IDS/IPS help, but not much once it's inside."
        ],
        more: [
          "The notes' fileless diagram: user clicks a malicious link, the site exploits a Flash/Java/Windows vulnerability, PowerShell launches and downloads a payload into RAM, scripts run in memory to exfiltrate data and damage files, and an auto-start entry is added to the Registry.",
          "The worm diagram: an infected computer searches for a vulnerable system, exploits it, then installs a backdoor that downloads the worm.",
          "Thousands of new viruses appear every week, so keep signatures updated."
        ],
        pages: [39, 40]
      },
      activities: [
        {
          id: "d2-virusworm-a1", type: "choice", format: "Compare",
          prompt: "What's the main difference between a virus and a worm?",
          options: [
            { t: "A worm needs no user action to spread", ok: true, why: "Worms self-propagate over the network. Viruses need execution." },
            { t: "Viruses only infect Linux", why: "No such limit." },
            { t: "Worms can't harm data", why: "Worms can take over many systems quickly." },
            { t: "Only viruses can use the network", why: "Worms use the network as their transmission medium." }
          ],
          hint: "Does a user have to do anything?",
          explain: "No user action is the worm's defining trait.",
          pages: [39]
        },
        {
          id: "d2-virusworm-a2", type: "order", format: "Order",
          prompt: "Put the fileless virus infection from the notes' diagram in order.",
          steps: [
            { t: "User clicks a malicious website link", why: "The entry point." },
            { t: "The site exploits a Flash, Java or Windows vulnerability", why: "Uses the vulnerable system." },
            { t: "PowerShell launches and downloads a payload into RAM", why: "Nothing is written as a file." },
            { t: "Scripts run in memory, exfiltrate data and damage files", why: "The attack does its work." },
            { t: "An auto-start entry is added to the Registry", why: "So it comes back after a reboot." }
          ],
          hint: "Click, exploit, load to memory, act, persist.",
          explain: "Fileless malware lives in memory, which makes it hard for anti-virus to spot.",
          pages: [40]
        },
        {
          id: "d2-virusworm-a3", type: "match", format: "Match",
          prompt: "Match each virus to its type.",
          choices: ["Program virus", "Boot sector virus", "Script virus", "Macro virus"],
          items: [
            { t: "Infects an installer executable", a: "Program virus", why: "It's part of the application." },
            { t: "Loads before the operating system", a: "Boot sector virus", why: "'Who needs an OS?'" },
            { t: "Runs through the browser's scripting engine", a: "Script virus", why: "OS- and browser-based scripts." },
            { t: "Hides in a spreadsheet's automation code", a: "Macro virus", why: "Common in Microsoft Office." }
          ],
          hint: "Where does the virus live?",
          explain: "Virus types are named after what they infect.",
          pages: [39]
        },
        {
          id: "d2-virusworm-a4", type: "recall", format: "Recall",
          front: "Order the worm infection steps from the notes.",
          back: "1. An infected computer searches for a vulnerable system. 2. The vulnerable computer is exploited. 3. A backdoor is installed and downloads the worm.",
          pages: [40]
        }
      ]
    },
    {
      id: "d2-spyware",
      objective: "2.4",
      section: "Spyware and Bloatware",
      title: "Spyware and bloatware",
      pages: [40],
      lesson: {
        summary: [
          "Spyware spies on you for advertising, identity theft or affiliate fraud. It can arrive through peer-to-peer downloads or fake security software.",
          "It can monitor browsing habits or log every keystroke and send them to the attacker.",
          "Protect yourself: up-to-date anti-malware, know what you install (watch installer options), keep backups, and run scans.",
          "Bloatware is unexpected, manufacturer-installed apps. It uses storage and resources, slows the system and could open it to exploits."
        ],
        more: [
          "Removing bloatware: try the built-in uninstaller first, then the app's own uninstaller. Third-party cleaners are probably not the first option, and always have a backup.",
          "QA angle: an 'optional toolbar' checkbox already ticked in a tool installer is how spyware sneaks in. Read the options."
        ],
        pages: [40]
      },
      activities: [
        {
          id: "d2-spyware-a1", type: "choice", format: "Compare",
          prompt: "A new laptop ships with a trial game, a vendor update agent and a shopping app you never asked for. What are these?",
          options: [
            { t: "Bloatware", ok: true, why: "Manufacturer-installed apps you didn't expect and often don't need." },
            { t: "Spyware", why: "Spyware is defined by spying, not by being preinstalled." },
            { t: "A kernel-level rootkit", why: "Rootkits hide in core system files." },
            { t: "Ransomware", why: "Nothing is encrypted for ransom." }
          ],
          hint: "Who installed them, and why?",
          explain: "Bloatware wastes resources and could open the system to exploits.",
          pages: [40]
        },
        {
          id: "d2-spyware-a2", type: "order", format: "Order",
          prompt: "Order the bloatware removal options from first choice to last.",
          steps: [
            { t: "Use the OS's built-in uninstaller", why: "Works for most applications." },
            { t: "Use the app's own uninstaller", why: "Some apps need their own." },
            { t: "Use a third-party uninstaller or cleaner, with a backup ready", why: "Probably not the first option." }
          ],
          hint: "Start with what's built in.",
          explain: "Escalate only when the simpler option fails.",
          pages: [40]
        },
        {
          id: "d2-spyware-a3", type: "recall", format: "Recall",
          front: "Name two ways spyware tricks you into installing it, and two things it does.",
          back: "Via peer-to-peer downloads or fake security software. It monitors browsing habits and logs keystrokes (also used for ads, identity theft and affiliate fraud).",
          pages: [40]
        }
      ]
    },
    {
      id: "d2-othermalware",
      objective: "2.4",
      section: "Other Malware Types",
      title: "Keyloggers, logic bombs and rootkits",
      pages: [41],
      lesson: {
        summary: [
          "Keyloggers capture keystrokes (URLs, passwords, messages) before encryption happens. Some also log the clipboard, screen, IMs and searches.",
          "A logic bomb waits for a predefined event: a time or date (time bomb) or a user event. Often left by someone with a grudge. Hard to spot and hard to recover from.",
          "Rootkits modify core system files and the kernel, so they can be invisible to the OS and to traditional anti-virus."
        ],
        more: [
          "Logic bombs have no predefined signatures. Prevent them with formal change control, monitoring and alerting on changes (host-based IDS, Tripwire) and constant auditing.",
          "Examples in the notes: a 2013 South Korea attack wiped storage and boot records at a set time, and a 2016 Ukraine substation attack disabled circuits at a set time on SCADA networks.",
          "Rootkits: look for the unusual, use a remover built for that specific rootkit, and use UEFI Secure Boot.",
          "QA angle: a commit that adds 'if date > 2027-01-01: drop tables' hidden in a test utility is a logic bomb, and code review plus change control catch it."
        ],
        pages: [41]
      },
      activities: [
        {
          id: "d2-othermalware-a1", type: "match", format: "Match",
          prompt: "Match each finding to the malware type.",
          choices: ["Keylogger", "Logic bomb", "Rootkit"],
          items: [
            { t: "Script deletes the database at midnight on the admin's last day", a: "Logic bomb", why: "Waits for a predefined time or event." },
            { t: "Process sends every typed character, including passwords, to an external server", a: "Keylogger", why: "Captures keystrokes before encryption." },
            { t: "Modified kernel module hides a process from Task Manager and anti-virus", a: "Rootkit", why: "Changes core system files to stay invisible." }
          ],
          hint: "Trigger, capture or hide?",
          explain: "Each type has a signature behavior.",
          pages: [41]
        },
        {
          id: "d2-othermalware-a2", type: "choice", format: "Next action",
          prompt: "Why can't signature-based anti-virus reliably stop logic bombs, and what helps instead?",
          options: [
            { t: "Each is unique; use change control and change monitoring", ok: true, why: "No predefined signatures, so rely on process, monitoring and auditing." },
            { t: "They're encrypted; use a bigger hash", why: "Encryption isn't the reason." },
            { t: "They only run on Macs; switch OS", why: "Not true." },
            { t: "They're harmless until found", why: "They can be very destructive." }
          ],
          hint: "There's nothing to match a signature against.",
          explain: "Formal change control, alerting on changes (like Tripwire) and constant auditing.",
          pages: [41]
        },
        {
          id: "d2-othermalware-a3", type: "choice", format: "Scenario",
          prompt: "A user types their password into an HTTPS login page, yet the attacker still gets it in clear text. What's the most likely cause?",
          options: [
            { t: "A keylogger on the user's machine", ok: true, why: "Keystrokes are captured before they're encrypted." },
            { t: "A weak TLS certificate on the login server", why: "TLS protects traffic in transit, not keys typed on an infected host." },
            { t: "Bloatware", why: "Bloatware isn't defined by stealing input." },
            { t: "A boot sector virus on the user's laptop", why: "Possible in general, but capturing keystrokes is the keylogger's job." }
          ],
          hint: "Where is the password before it's encrypted?",
          explain: "Keyloggers get around encryption because your keystrokes are in the clear.",
          pages: [41]
        },
        {
          id: "d2-othermalware-a4", type: "recall", format: "Recall",
          front: "How do you find and remove a rootkit?",
          back: "Look for the unusual with anti-malware scans, use a remover built for that specific rootkit, and use UEFI Secure Boot.",
          pages: [41]
        }
      ]
    },
    {
      id: "d2-physical",
      objective: "2.4",
      section: "Physical Attacks",
      title: "Physical attacks",
      pages: [41],
      lesson: {
        summary: [
          "With physical access to a server, an attacker has full control. An OS can't stop an in-person attack.",
          "Physical brute force means forcing through an obstacle. Check windows and doors yourself.",
          "RFID cloning copies access badges or key fobs in seconds with cheap devices. That's why badges should be combined with another factor (MFA).",
          "Environmental attacks target what supports the tech: power, HVAC and humidity, and fire suppression."
        ],
        more: [
          "Door locks keep out honest people. There's always a way in.",
          "QA angle: a device lab with only a badge reader is vulnerable to cloned badges. Add a PIN or second factor."
        ],
        pages: [41]
      },
      activities: [
        {
          id: "d2-physical-a1", type: "choice", format: "Next action",
          prompt: "An auditor clones an employee's access badge in seconds and walks into the server room. What control do the notes suggest?",
          options: [
            { t: "Require another factor along with the badge", ok: true, why: "That's why we have MFA: a cloned card alone isn't enough." },
            { t: "Issue new badges with a more visible photo and color", why: "Color doesn't stop cloning." },
            { t: "Make every user's password longer", why: "Passwords aren't involved at the door." },
            { t: "Patch the server OS", why: "The attack is physical." }
          ],
          hint: "Something you have can be copied.",
          explain: "RFID duplicators are cheap and fast. Add a second factor.",
          pages: [41]
        },
        {
          id: "d2-physical-a2", type: "match", format: "Match",
          prompt: "Match each attack to its category.",
          choices: ["Brute force", "RFID cloning", "Environmental"],
          items: [
            { t: "Prying open a locked data center door", a: "Brute force", why: "Pushing through the obstruction." },
            { t: "Copying a key fob with a handheld reader", a: "RFID cloning", why: "Read one card, write to another." },
            { t: "Tampering with cooling so servers overheat", a: "Environmental", why: "Attacks the operating environment (HVAC)." }
          ],
          hint: "Force, copy or environment?",
          explain: "Physical security must cover all of them.",
          pages: [41]
        },
        {
          id: "d2-physical-a3", type: "recall", format: "Recall",
          front: "What three environmental systems do the notes list as targets?",
          back: "Power (monitoring), HVAC and humidity controls, and fire suppression.",
          pages: [41]
        }
      ]
    },
    {
      id: "d2-dos",
      objective: "2.4",
      section: "Denial of Service",
      title: "Denial of service",
      pages: [42],
      lesson: {
        summary: [
          "DoS forces a service to fail, by overloading it or exploiting a design flaw. It can also be a smokescreen for another attack.",
          "Not every DoS is malicious: a layer 2 loop without STP, a huge download on a small link, or a burst water pipe.",
          "DDoS uses an army of computers, usually a botnet. It's an asymmetric threat: the attacker may have fewer resources than the victim.",
          "Reflection and amplification bounce small requests off services with little authentication (NTP, DNS, ICMP) to create a much bigger attack."
        ],
        more: [
          "At its peak, the Zeus botnet infected over 3.6 million PCs.",
          "DoS doesn't have to be complicated: turning off the power works.",
          "QA angle: a load test accidentally aimed at production is a 'friendly' DoS."
        ],
        pages: [42]
      },
      activities: [
        {
          id: "d2-dos-a1", type: "choice", format: "Scenario",
          prompt: "Small spoofed queries to many open DNS servers cause huge responses to flood a victim's network. What technique is this?",
          options: [
            { t: "DDoS reflection and amplification", ok: true, why: "Small requests reflect off low-authentication services and grow into a big attack." },
            { t: "DNS poisoning", why: "Poisoning changes DNS answers. It doesn't flood a target." },
            { t: "Domain hijacking", why: "That's taking over the domain registration." },
            { t: "Wireless jamming", why: "That's radio interference." }
          ],
          hint: "Small in, big out, aimed at someone else.",
          explain: "Protocols with little or no authentication, like NTP, DNS and ICMP, get turned against the victim.",
          pages: [42]
        },
        {
          id: "d2-dos-a2", type: "choice", format: "Troubleshoot",
          prompt: "The lab network goes down whenever a new switch is connected. There's no attacker. The notes would call this what?",
          options: [
            { t: "A 'friendly' unintentional DoS, such as a layer 2 loop without STP", ok: true, why: "Not every DoS is malicious." },
            { t: "A DDoS attack from a botnet of compromised lab machines", why: "There's no army of computers here." },
            { t: "A replay attack", why: "No captured data is being replayed." },
            { t: "Ransomware", why: "Nothing is encrypted." }
          ],
          hint: "It's not always a bad actor.",
          explain: "Loops, giant downloads and even water leaks can deny service.",
          pages: [42]
        },
        {
          id: "d2-dos-a3", type: "multi", format: "Investigate",
          prompt: "Which are reasons the notes give for launching a DoS? Select all that apply.",
          options: [
            { t: "Gain a competitive advantage", ok: true, why: "Listed." },
            { t: "Create a smokescreen for another exploit", ok: true, why: "For example, before a DNS spoofing attack." },
            { t: "Make a service unavailable", ok: true, why: "That's the core goal." },
            { t: "Permanently encrypt the victim's files", why: "That's ransomware." }
          ],
          hint: "Availability is the target.",
          explain: "DoS attacks availability, sometimes as a distraction.",
          pages: [42]
        },
        {
          id: "d2-dos-a4", type: "recall", format: "Recall",
          front: "Why is DDoS called an asymmetric threat?",
          back: "The attacker may have fewer resources than the victim, but a botnet lets them overwhelm a bigger target.",
          pages: [42]
        }
      ]
    },
    {
      id: "d2-dns",
      objective: "2.4",
      section: "DNS Attacks",
      title: "DNS attacks",
      pages: [42],
      lesson: {
        summary: [
          "DNS poisoning changes name answers: modify the DNS server, modify the client's hosts file (which takes priority over DNS), or send fake responses on-path.",
          "Domain hijacking takes over the domain registration account, so the attacker controls where traffic goes without touching the servers.",
          "URL hijacking profits from typing mistakes: ads, selling the domain, redirecting to competitors, phishing or drive-by downloads.",
          "Typosquatting types: outright misspelling, a typing error, a different phrase, or a different top-level domain."
        ],
        more: [
          "Registration accounts are taken by brute force, social engineering, or getting into the email that manages the account.",
          "The notes' example: in October 2016, a Brazilian bank's 36 domain registrations were changed, and attackers 'became the bank' for six hours.",
          "QA angle: an /etc/hosts entry left on a test box pointing api.example.com elsewhere behaves just like client-side DNS poisoning."
        ],
        pages: [42]
      },
      activities: [
        {
          id: "d2-dns-a1", type: "match", format: "Match",
          prompt: "Match each typosquatting example (target: example.com) to its type.",
          choices: ["Outright misspelling", "Typing error", "Different phrase", "Different top-level domain"],
          items: [
            { t: "exampel.com", a: "Outright misspelling", why: "The word is spelled wrong." },
            { t: "exmple.com", a: "Typing error", why: "A dropped key." },
            { t: "examples.com", a: "Different phrase", why: "A slightly different name." },
            { t: "example.org", a: "Different top-level domain", why: "Same name, different TLD." }
          ],
          hint: "Spelling, keystroke, wording or TLD?",
          explain: "All are forms of URL hijacking that profit from mistakes.",
          pages: [42]
        },
        {
          id: "d2-dns-a2", type: "choice", format: "Scenario",
          prompt: "Attackers phish the login for a company's domain registrar account and point its domains to their own servers. What is this?",
          options: [
            { t: "Domain hijacking", ok: true, why: "Control of the registration controls where traffic flows." },
            { t: "A DNS amplification attack", why: "That's a DDoS technique." },
            { t: "Typosquatting", why: "Typosquatting uses a different domain. This is the real one." },
            { t: "ARP poisoning", why: "That's a local network on-path attack." }
          ],
          hint: "They never touched the web servers.",
          explain: "Protect registrar accounts like any critical admin account.",
          pages: [42]
        },
        {
          id: "d2-dns-a3", type: "choice", format: "Troubleshoot",
          prompt: "Only one tester's laptop resolves the staging API to an unknown IP. DNS servers return the right answer. Where should you look first?",
          options: [
            { t: "The laptop's hosts file", ok: true, why: "The hosts file takes priority over DNS queries." },
            { t: "The domain registrar", why: "Every machine would be affected if the registration changed." },
            { t: "The TLS certificate", why: "Certificates don't decide name resolution." },
            { t: "The load balancer", why: "Other machines resolve correctly." }
          ],
          hint: "What does the client check before asking DNS?",
          explain: "Modifying the client hosts file is one form of DNS poisoning.",
          pages: [42]
        },
        {
          id: "d2-dns-a4", type: "recall", format: "Recall",
          front: "Three ways to poison DNS?",
          back: "Modify the DNS server, modify the client's hosts file, or send a fake response to a real DNS request (an on-path attack).",
          pages: [42]
        }
      ]
    },
    {
      id: "d2-wireless",
      objective: "2.4",
      section: "Wireless Attacks",
      title: "Wireless attacks",
      pages: [43],
      lesson: {
        summary: [
          "Deauthentication is a major wireless DoS: forged management frames keep knocking you off the network.",
          "Original 802.11 sent management frames unprotected. 802.11w (2014) encrypts some of them (disassociate, deauthenticate, channel switch) and is required for 802.11ac compliance.",
          "RF jamming sends interfering signals to lower the signal-to-noise ratio so receivers can't hear the real signal. Interference is accidental; jamming is intentional."
        ],
        more: [
          "Not every frame is protected by 802.11w: beacons, probes, authentication and association still aren't.",
          "Jamming types: constant random bits, constant legitimate frames, random-timed data, or reactive (only when someone else transmits). It has to be done from nearby.",
          "Finding a jammer is 'fox hunting' with a directional antenna and an attenuator."
        ],
        pages: [43]
      },
      activities: [
        {
          id: "d2-wireless-a1", type: "choice", format: "Troubleshoot",
          prompt: "Testers in one room keep getting dropped from Wi-Fi every few seconds. A capture shows floods of deauthenticate frames claiming to come from the access point. What's happening, and what's the protection?",
          options: [
            { t: "Deauth attack; 802.11w protects those frames", ok: true, why: "802.11w encrypts important management frames like deauthenticate." },
            { t: "RF jamming; use a stronger password", why: "Jamming is noise. These are forged frames, and passwords don't help." },
            { t: "DNS poisoning; flush DNS", why: "This happens below DNS." },
            { t: "Bloatware; uninstall apps", why: "Unrelated." }
          ],
          hint: "Look at the frame type.",
          explain: "Management frames were originally sent with no authentication.",
          pages: [43]
        },
        {
          id: "d2-wireless-a2", type: "choice", format: "Compare",
          prompt: "Wi-Fi drops whenever the break-room microwave runs. Is this jamming?",
          options: [
            { t: "No, it's interference", ok: true, why: "The notes separate accidental interference from deliberate jamming." },
            { t: "Yes, all signal loss is jamming", why: "Jamming needs intent." },
            { t: "No, it's a deauth attack", why: "There are no forged frames." },
            { t: "Yes, microwaves are reactive jammers", why: "Reactive jamming is a deliberate technique." }
          ],
          hint: "Does anyone want your network to fail?",
          explain: "Microwaves and fluorescent lights cause interference, not jamming.",
          pages: [43]
        },
        {
          id: "d2-wireless-a3", type: "recall", format: "Recall",
          front: "What do you need to 'fox hunt' a jammer?",
          back: "The right equipment, such as a directional antenna and an attenuator. The jammer has to be nearby to work.",
          pages: [43]
        }
      ]
    },
    {
      id: "d2-onpath",
      objective: "2.4",
      section: "On-path Attacks",
      title: "On-path attacks",
      pages: [43],
      lesson: {
        summary: [
          "An on-path attack (formerly man-in-the-middle) redirects your traffic, watches it, then passes it on so you never notice.",
          "ARP poisoning is an on-path attack on the local subnet, because ARP has no security.",
          "On-path browser attacks (formerly man-in-the-browser) put the middleman on the victim's own computer as malware that proxies traffic."
        ],
        more: [
          "In-browser malware can proxy encrypted traffic relatively easily and everything looks normal. It may wait until you log in to your bank.",
          "QA angle: debugging proxies like the ones testers use to inspect API calls work the same way, which is why devices shouldn't trust a proxy's certificate unless you set it up."
        ],
        pages: [43]
      },
      activities: [
        {
          id: "d2-onpath-a1", type: "choice", format: "Scenario",
          prompt: "On the lab subnet, a host starts answering ARP requests for the gateway's IP with its own MAC, then forwards traffic onward. What attack is this?",
          options: [
            { t: "ARP poisoning (on-path)", ok: true, why: "ARP has no security, so the attacker becomes the middle hop." },
            { t: "DNS amplification", why: "No DNS flooding here." },
            { t: "Replay attack", why: "Replay reuses captured data later. This is live redirection." },
            { t: "Domain hijacking", why: "Domain registration isn't involved." }
          ],
          hint: "Who claims to be the gateway?",
          explain: "On-path attacks redirect, watch, and forward traffic.",
          pages: [43]
        },
        {
          id: "d2-onpath-a2", type: "choice", format: "Compare",
          prompt: "What's special about an on-path browser attack?",
          options: [
            { t: "The middleman is malware on the victim's own computer", ok: true, why: "Formerly called man-in-the-browser." },
            { t: "It needs a rogue access point", why: "It runs on the victim's machine." },
            { t: "It only works on sites that don't use HTTPS encryption at all", why: "It can proxy encrypted traffic relatively easily." },
            { t: "It's always visible to the user", why: "Everything looks normal to the victim." }
          ],
          hint: "Where does the proxy live?",
          explain: "Being inside the browser avoids most network protections.",
          pages: [43]
        },
        {
          id: "d2-onpath-a3", type: "recall", format: "Recall",
          front: "What was on-path attack formerly called, and what's ARP poisoning?",
          back: "Man-in-the-middle. ARP poisoning is an on-path attack on the local IP subnet, possible because ARP has no security.",
          pages: [43]
        }
      ]
    },
    {
      id: "d2-replay",
      objective: "2.4",
      section: "Replay Attacks",
      title: "Replay attacks and session hijacking",
      pages: [44, 45],
      lesson: {
        summary: [
          "A replay attack captures useful network data (via a tap, ARP poisoning or malware) and replays it to look like someone else.",
          "It isn't an on-path attack: the replay itself doesn't need the original workstation.",
          "Pass the hash: the attacker captures a username and password hash during login, then sends their own login using them.",
          "Session hijacking (sidejacking) steals a session ID, often from a cookie, and uses it to access the server as the victim."
        ],
        more: [
          "Cookies are stored by the browser for tracking, personalization and sessions. They aren't executable, but they're a privacy and security risk if someone gets them.",
          "Header manipulation tools in the notes: Wireshark and Kismet to gather, Tamper, Firesheep and Scapy to modify headers, and cookie editors.",
          "Prevent session hijacking by encrypting end to end (HTTPS everywhere), or at least end to somewhere (a personal VPN) on local wireless.",
          "QA angle: if a bearer token captured from logs still works hours later from another machine, the API is open to replay."
        ],
        pages: [44, 45]
      },
      activities: [
        {
          id: "d2-replay-a1", type: "order", format: "Order",
          prompt: "Put the session hijacking steps from the notes' diagram in order.",
          steps: [
            { t: "Victim authenticates to the server", why: "Step 1." },
            { t: "Server gives the client a session ID", why: "Step 2." },
            { t: "Attacker intercepts the session ID", why: "It was visible on the network." },
            { t: "Attacker uses it to access the server as the victim", why: "No password needed." }
          ],
          hint: "The ID has to exist before it can be stolen.",
          explain: "Encrypting traffic keeps the session ID from being captured.",
          pages: [44]
        },
        {
          id: "d2-replay-a2", type: "choice", format: "Troubleshoot",
          prompt: "Look at the auth log. What's the most likely attack?",
          artifact: { kind: "log", title: "auth.log", body: "09:01:12 user=qa_lead src=10.0.4.21 method=NTLM hash=8846f7...e2 result=OK\n09:03:40 user=qa_lead src=10.0.9.77 method=NTLM hash=8846f7...e2 result=OK\n09:03:41 user=qa_lead src=10.0.9.77 action=admin_share_access" },
          options: [
            { t: "Pass the hash", ok: true, why: "The same captured hash authenticates from a different host." },
            { t: "Password spraying", why: "Spraying tries common passwords across many accounts." },
            { t: "Downgrade attack", why: "Nothing forces weaker encryption here." },
            { t: "Brute force", why: "There are no repeated failures." }
          ],
          hint: "Same hash, new source.",
          explain: "The attacker never needed the plaintext password, just the captured hash.",
          pages: [44]
        },
        {
          id: "d2-replay-a3", type: "choice", format: "Next action",
          prompt: "Testers use public Wi-Fi at a conference to reach a web app that uses HTTP for some pages. What best prevents session hijacking?",
          options: [
            { t: "Serve the whole app over HTTPS", ok: true, why: "They can't capture a session ID they can't see." },
            { t: "Make session IDs longer and more random", why: "A longer ID sent in the clear can still be captured." },
            { t: "Clear cookies daily", why: "The ID can be stolen and used well within a day." },
            { t: "Use Wireshark", why: "Wireshark is a capture tool, which attackers can use too." }
          ],
          hint: "Encrypt end to end.",
          explain: "A personal VPN helps on local wireless, but full HTTPS is better.",
          pages: [45]
        },
        {
          id: "d2-replay-a4", type: "recall", format: "Recall",
          front: "Why isn't a replay attack an on-path attack?",
          back: "The attacker captures the data first, then replays it later. The replay itself doesn't need the original workstation or a live position in the traffic path.",
          pages: [44]
        }
      ]
    },
    {
      id: "d2-maliciouscode",
      objective: "2.4",
      section: "Malicious Code",
      title: "Malicious code",
      pages: [45],
      lesson: {
        summary: [
          "Some attacks need no technical skill: social engineering, default credentials and misconfiguration. The door is already unlocked.",
          "Against well-secured systems, attackers use malicious code: executables, scripts, macro viruses, worms, Trojan horses and more.",
          "Protection comes from many sources: anti-malware, firewalls, continuous patching and secure habits."
        ],
        more: [
          "Examples: WannaCry ransomware exploited Windows SMBv1 for arbitrary code execution. British Airways had 22 lines of malicious JavaScript on checkout pages that stole data from 380,000 victims. Estonia's central health database was breached by SQL injection.",
          "QA angle: a third-party script tag on a checkout page is code you ship but didn't write. Monitor it."
        ],
        pages: [45]
      },
      activities: [
        {
          id: "d2-maliciouscode-a1", type: "match", format: "Match",
          prompt: "Match each incident from the notes to the technique used.",
          choices: ["Exploited SMBv1 vulnerability", "Cross-site scripting", "SQL injection"],
          items: [
            { t: "WannaCry ransomware", a: "Exploited SMBv1 vulnerability", why: "Arbitrary code execution via SMBv1." },
            { t: "British Airways checkout pages", a: "Cross-site scripting", why: "22 lines of malicious JavaScript." },
            { t: "Estonian Central Health Database", a: "SQL injection", why: "Breached healthcare information for a whole country." }
          ],
          hint: "Ransomware, script on a page, or database query?",
          explain: "Malicious code comes in many forms.",
          pages: [45]
        },
        {
          id: "d2-maliciouscode-a2", type: "multi", format: "Investigate",
          prompt: "Which protections against malicious code do the notes list? Select all that apply.",
          options: [
            { t: "Anti-malware", ok: true, why: "Listed." },
            { t: "Firewall", ok: true, why: "Listed." },
            { t: "Continuous updates and patches", ok: true, why: "Listed." },
            { t: "Secure computing habits", ok: true, why: "Listed." },
            { t: "Disabling all logging", why: "Logs help detection. Disabling them helps attackers." }
          ],
          hint: "Protection comes from many sources.",
          explain: "No single control stops all malicious code.",
          pages: [45]
        },
        {
          id: "d2-maliciouscode-a3", type: "recall", format: "Recall",
          front: "Name three ways into a system that need no technical skill.",
          back: "Social engineering, default credentials and misconfiguration.",
          pages: [45]
        }
      ]
    },
    {
      id: "d2-appattacks",
      objective: "2.4",
      section: "Application Attacks",
      title: "Application attacks",
      pages: [45, 46],
      lesson: {
        summary: [
          "Injection, buffer overflows and replay attacks (covered earlier) also count as application attacks.",
          "Privilege escalation gains higher access by exploiting a bug or design flaw. Horizontal escalation means user A reaches user B's resources.",
          "Cross-site request forgery (CSRF, XSRF, 'sea surf') abuses the trust a site has in your browser to send requests without your consent. Fix it with anti-forgery tokens.",
          "Directory traversal (path traversal) reads files outside the website's folder, due to server software or app code flaws."
        ],
        more: [
          "Mitigate privilege escalation: patch quickly, keep anti-malware updated, use Data Execution Prevention and address space layout randomization (ASLR).",
          "The notes' example: CVE-2023-29336, a Win32k elevation of privilege bug that gave SYSTEM access.",
          "Cross-site requests themselves are normal: a page loading video or images from other sites. CSRF abuses that for authenticated actions.",
          "Client side versus server side: client-side code (HTML, JavaScript) renders the page in your browser, and server-side code carries out the requests, like transferring money or posting a video. CSRF targets those server-side actions.",
          "The CSRF diagram: attacker builds a funds transfer request, sends it as a link to someone already logged into the bank, the visitor clicks it, and the bank processes the transfer.",
          "QA angle: a test that calls GET /files?name=../../etc/passwd is a directory traversal check."
        ],
        pages: [45, 46]
      },
      activities: [
        {
          id: "d2-appattacks-a1", type: "choice", format: "Troubleshoot",
          prompt: "What does this request log show?",
          artifact: { kind: "log", title: "web-access.log", body: "GET /download?file=report.pdf               200\nGET /download?file=../../../../etc/passwd    200  bytes=2190\nGET /download?file=..\\..\\windows\\win.ini    200" },
          options: [
            { t: "Directory traversal", ok: true, why: "../ sequences read files outside the web root." },
            { t: "Cross-site request forgery (CSRF)", why: "CSRF tricks a victim's browser into sending a request." },
            { t: "Password spraying", why: "No logins are involved." },
            { t: "DLL injection", why: "No library is loaded into a process." }
          ],
          hint: "Look at the dots and slashes.",
          explain: "Users shouldn't be able to browse past the web server root.",
          pages: [46]
        },
        {
          id: "d2-appattacks-a2", type: "order", format: "Order",
          prompt: "Put the CSRF attack from the notes' diagram in order.",
          steps: [
            { t: "Attacker creates a funds transfer request", why: "Step 1." },
            { t: "The request is sent as a link to someone who may be logged into the bank", why: "Step 2." },
            { t: "The visitor clicks and unknowingly sends the request to the bank", why: "Step 3: the browser carries their session." },
            { t: "The bank validates it and sends funds to the attacker", why: "Step 4: the site trusted the browser." }
          ],
          hint: "The victim's own logged-in browser does the sending.",
          explain: "CSRF abuses the site's trust in the user. Anti-forgery tokens stop it.",
          pages: [46]
        },
        {
          id: "d2-appattacks-a3", type: "choice", format: "Compare",
          prompt: "XSS vs. CSRF: which trust does each exploit?",
          options: [
            { t: "XSS: user trusts site. CSRF: site trusts browser", ok: true, why: "XSS runs script the user trusts. CSRF sends requests the site trusts." },
            { t: "Both exploit the database's trust in the app", why: "That's closer to SQL injection." },
            { t: "XSS: site trusts the user. CSRF: user trusts the site", why: "That's backwards." },
            { t: "Neither involves trust", why: "Both are built on misplaced trust." }
          ],
          hint: "Who trusts whom?",
          explain: "This pairing is a classic exam comparison.",
          pages: [46]
        },
        {
          id: "d2-appattacks-a4", type: "choice", format: "Scenario",
          prompt: "During API testing, user A changes an ID in the URL and can read user B's invoices. Neither is an admin. What is this?",
          options: [
            { t: "Horizontal privilege escalation", ok: true, why: "User A reaches user B's resources at the same level." },
            { t: "Vertical escalation to SYSTEM", why: "No higher-level account was gained." },
            { t: "Buffer overflow", why: "No memory was overrun." },
            { t: "Replay attack", why: "Nothing captured was replayed." }
          ],
          hint: "Sideways, not upward.",
          explain: "Escalation can go up (more rights) or across (another user's data).",
          pages: [46]
        },
        {
          id: "d2-appattacks-a5", type: "multi", format: "Investigate",
          prompt: "Which mitigations for privilege escalation are in the notes? Select all that apply.",
          options: [
            { t: "Patch quickly", ok: true, why: "These are high-priority patches." },
            { t: "Keep anti-malware updated", ok: true, why: "Blocks known vulnerabilities." },
            { t: "Data Execution Prevention", ok: true, why: "Limits where code can run." },
            { t: "Address space layout randomization", ok: true, why: "Prevents attacks at a known memory address." },
            { t: "Give every user admin rights to reduce help desk tickets", why: "That makes escalation unnecessary for attackers." }
          ],
          hint: "One option is the opposite of least privilege.",
          explain: "Patch fast and make memory exploitation harder.",
          pages: [46]
        }
      ]
    },
    {
      id: "d2-crypto",
      objective: "2.4",
      section: "Cryptographic Attacks",
      title: "Cryptographic attacks",
      pages: [47],
      lesson: {
        summary: [
          "Attackers without the key try to break the cryptography instead. The weakness is often the implementation.",
          "Birthday attack: find a hash collision (two different inputs with the same hash) by brute force. Defend with a large hash output size.",
          "Downgrade attack: force systems to use weaker security. POODLE (2014) forced fallback to SSL 3.0, so modern browsers no longer fall back to it.",
          "SSL stripping: an on-path attacker talks HTTPS to the server but HTTP to the victim, so credentials pass in the clear."
        ],
        more: [
          "Birthday paradox: in a class of 23 the chance two share a birthday is about 50%, and about 70% for 30.",
          "MD5 (1992) had collisions found in 1996, and in 2008 researchers created a fake CA certificate that looked legitimate under MD5.",
          "The SSL stripping diagram: the visitor requests http://, the attacker fetches https:// from the server, returns plain HTTP to the visitor, and captures the POSTed username and password before forwarding them over HTTPS."
        ],
        pages: [47]
      },
      activities: [
        {
          id: "d2-crypto-a1", type: "match", format: "Match",
          prompt: "Match each scenario to the cryptographic attack.",
          choices: ["Birthday attack", "Downgrade attack", "SSL stripping"],
          items: [
            { t: "Attacker generates many document versions until one hashes the same as a signed one", a: "Birthday attack", why: "Brute-forcing a hash collision." },
            { t: "On-path attacker forces client and server to fall back to an old, broken protocol", a: "Downgrade attack", why: "Like POODLE forcing SSL 3.0." },
            { t: "Victim sees http:// while the attacker relays to the server over https://", a: "SSL stripping", why: "The victim side is never encrypted." }
          ],
          hint: "Collision, fallback or removing HTTPS?",
          explain: "All three undo security without stealing the key.",
          pages: [47]
        },
        {
          id: "d2-crypto-a2", type: "choice", format: "Next action",
          prompt: "Which defense against birthday attacks do the notes give?",
          options: [
            { t: "Use a large hash output size", ok: true, why: "More possible outputs make collisions far harder to find." },
            { t: "Hash the data twice with MD5 for extra strength", why: "MD5 collisions are known." },
            { t: "Use shorter hashes so they compute faster", why: "Shorter output makes collisions easier." },
            { t: "Store passwords in plaintext", why: "Never." }
          ],
          hint: "More possible outputs.",
          explain: "Collision resistance grows with hash output size.",
          pages: [47]
        },
        {
          id: "d2-crypto-a3", type: "recall", format: "Recall",
          front: "What did POODLE do, and what changed afterward?",
          back: "An on-path downgrade attack (2014) that forced clients to fall back to SSL 3.0, which has serious weaknesses. Modern browsers no longer fall back to SSL 3.0.",
          pages: [47]
        }
      ]
    },
    {
      id: "d2-password",
      objective: "2.4",
      section: "Password Attacks",
      title: "Password attacks",
      pages: [48],
      lesson: {
        summary: [
          "Never store passwords in plaintext. Anyone with the file has every credential. Hashing (a one-way fixed-length fingerprint, like SHA-256) is the common approach.",
          "Spraying tries a few of the most common passwords against many accounts, avoiding lockouts and alerts.",
          "Online brute force keeps trying the login: very slow and usually stopped by lockouts.",
          "Offline brute force takes the stolen list of hashes and computes guesses locally. It needs lots of compute, and a strong hash algorithm slows it down."
        ],
        more: [
          "Different OSes and apps store password files with different hash algorithms.",
          "QA angle: a login test suite should check that 5 failures on one account trigger lockout, and that one failure on each of 500 accounts from one IP raises an alert (spraying)."
        ],
        pages: [48]
      },
      activities: [
        {
          id: "d2-password-a1", type: "choice", format: "Troubleshoot",
          prompt: "What attack does this log show?",
          artifact: { kind: "log", title: "login-events.log", body: "10:00:01 src=198.51.100.9 user=alice pw_try=Winter2026! FAIL\n10:00:02 src=198.51.100.9 user=bob   pw_try=Winter2026! FAIL\n10:00:02 src=198.51.100.9 user=carol pw_try=Winter2026! FAIL\n... 400 more users, 1 attempt each ...\n10:06:30 src=198.51.100.9 user=dmitri pw_try=Winter2026! OK" },
          options: [
            { t: "Password spraying", ok: true, why: "One common password across many accounts avoids lockouts." },
            { t: "Online brute force against one account", why: "Each account sees only one try." },
            { t: "Offline brute force", why: "This is happening against the live login." },
            { t: "Pass the hash", why: "Passwords are being guessed, not hashes replayed." }
          ],
          hint: "Count tries per account.",
          explain: "Spraying: no lockouts, no alarms, unless you watch across accounts.",
          pages: [48]
        },
        {
          id: "d2-password-a2", type: "choice", format: "Compare",
          prompt: "Why is offline brute force more dangerous than online brute force?",
          options: [
            { t: "No lockouts apply to a stolen hash list", ok: true, why: "The attacker compares guesses locally as fast as their hardware allows." },
            { t: "It doesn't need any compute", why: "It needs a lot of compute." },
            { t: "It works against plaintext only", why: "It attacks hashes." },
            { t: "Online attacks are faster", why: "Online attacks are very slow." }
          ],
          hint: "What stops online guessing?",
          explain: "Strong, slow hash algorithms are the defense once hashes are stolen.",
          pages: [48]
        },
        {
          id: "d2-password-a3", type: "recall", format: "Recall",
          front: "Why hash passwords instead of encrypting or storing them in plaintext?",
          back: "A hash is a one-way, fixed-length fingerprint. You can't recover the original password from the digest, but you can compare hashes at login.",
          pages: [48]
        }
      ]
    },
    {
      id: "d2-ioc",
      objective: "2.4",
      section: "Indicators of Compromise",
      title: "Indicators of compromise",
      pages: [48, 49],
      lesson: {
        summary: [
          "An indicator of compromise (IOC) is an event that points to an intrusion with high confidence.",
          "General indicators: unusual network activity, changed file hashes, irregular international traffic, DNS changes, odd login patterns, spikes of reads on certain files.",
          "Account signs: unexpected lockouts, concurrent sessions from different places, impossible travel.",
          "System signs: blocked security content, resource spikes or outages, out-of-cycle logs, missing logs, and your data published online."
        ],
        more: [
          "Lockouts can be part of a plan: the attacker locks the account, then calls support to reset the password.",
          "Blocked content: attackers block auto-updates, patch links, anti-malware sites and removal tools to keep their access.",
          "Impossible travel: a login from headquarters, then three minutes later from the other side of the world.",
          "Resource consumption: a bandwidth spike at 3 AM in the firewall logs is often the first real sign, and the attacker may have been there for months.",
          "Out-of-cycle logging: patch logs outside the normal patch day can mean an attacker patched the hole to keep others out.",
          "QA angle: these are just log queries. Many make good automated alert rules."
        ],
        pages: [48, 49]
      },
      activities: [
        {
          id: "d2-ioc-a1", type: "match", format: "Match",
          prompt: "Match each observation to the IOC it represents.",
          choices: ["Impossible travel", "Concurrent session usage", "Blocked content", "Out-of-cycle logging", "Missing logs", "Resource consumption"],
          items: [
            { t: "Login from Omaha, then from Melbourne three minutes later", a: "Impossible travel", why: "No one travels that fast." },
            { t: "The same user is interactively logged in from two offices right now", a: "Concurrent session usage", why: "You don't have a clone." },
            { t: "A server can't reach the anti-malware vendor's update site", a: "Blocked content", why: "Attackers play keep-away with fixes." },
            { t: "OS patch entries on a Thursday when patching is always Tuesday", a: "Out-of-cycle logging", why: "Activity at an unexpected time." },
            { t: "Auth logs for 02:00 to 04:00 are gone", a: "Missing logs", why: "Attackers cover their tracks." },
            { t: "Outbound transfer spike at 3 AM in firewall logs", a: "Resource consumption", why: "Every attacker action has a footprint." }
          ],
          hint: "Read each like a log line.",
          explain: "Most IOCs are found by log analysis and automation.",
          pages: [48, 49]
        },
        {
          id: "d2-ioc-a2", type: "choice", format: "Scenario",
          prompt: "A user's account is locked out, and minutes later someone calls the help desk claiming to be that user and asking for a password reset. What should you suspect?",
          options: [
            { t: "An attacker locked it to set up a reset", ok: true, why: "The notes describe lockout as part of a larger plan." },
            { t: "A normal forgotten password, so reset it right away", why: "Possible, but the timing matches a known attack pattern. Verify." },
            { t: "A DNS poisoning attack on the help desk", why: "DNS isn't involved." },
            { t: "Bloatware", why: "Unrelated." }
          ],
          hint: "Lockout plus reset call.",
          explain: "Verify identity carefully when a reset follows a lockout.",
          pages: [48]
        },
        {
          id: "d2-ioc-a3", type: "multi", format: "Investigate",
          prompt: "Which of these do the notes list as indicators of compromise? Select all that apply.",
          options: [
            { t: "Changes to file hash values", ok: true, why: "Listed." },
            { t: "Changes to DNS data", ok: true, why: "Listed." },
            { t: "Spikes of read requests to certain files", ok: true, why: "Listed." },
            { t: "Irregular international traffic", ok: true, why: "Listed." },
            { t: "A scheduled, approved patch on Patch Tuesday", why: "Expected activity, not an indicator." }
          ],
          hint: "Unexpected change is the theme.",
          explain: "IOCs are deviations from normal.",
          pages: [48]
        },
        {
          id: "d2-ioc-a4", type: "recall", format: "Recall",
          front: "Why would an attacker patch the system they just broke into?",
          back: "To keep other attackers out of 'their' system. Patch logs outside the normal cycle (out-of-cycle logging) can reveal it.",
          pages: [49]
        }
      ]
    },
    // ------------------------------------------------------------------ 2.5
    {
      id: "d2-segmentation",
      objective: "2.5",
      section: "Segmentation and Access Control",
      title: "Segmentation and access control",
      pages: [49],
      lesson: {
        summary: [
          "Segmentation splits a network physically, logically (VLANs) or virtually, for performance, security and compliance (for example, PCI).",
          "Security example: users shouldn't talk directly to database servers.",
          "Access control lists (ACLs) allow or deny traffic or access by source, destination, port, time, application and more. Be careful: you can lock yourself out.",
          "Operating systems use ACLs and allow/deny lists to control files and applications."
        ],
        more: [
          "Ways to allow or deny apps: by application hash (unique identifier), certificate (signed by trusted publishers), path (only run from certain folders) or network zone.",
          "Segmentation also makes change control easier.",
          "QA angle: test runners in their own VLAN that can only reach the test database on its port is segmentation plus an ACL."
        ],
        pages: [49]
      },
      activities: [
        {
          id: "d2-segmentation-a1", type: "match", format: "Match",
          prompt: "Match each application allow-list rule to its type.",
          choices: ["Application hash", "Certificate", "Path", "Network zone"],
          items: [
            { t: "Only run the binary whose SHA-256 is 9f2c...", a: "Application hash", why: "Allows only that exact file." },
            { t: "Allow any app signed by our internal code-signing CA", a: "Certificate", why: "Trusts signed apps from certain publishers." },
            { t: "Only run executables from C:\\Program Files\\", a: "Path", why: "Location-based." },
            { t: "Apps may only run from the corporate network zone", a: "Network zone", why: "Zone-based." }
          ],
          hint: "What does the rule check: fingerprint, signer, folder or network?",
          explain: "Hash rules are strict but break on every update. Certificate rules survive updates from the same publisher.",
          pages: [49]
        },
        {
          id: "d2-segmentation-a2", type: "choice", format: "Scenario",
          prompt: "An auditor says payment card systems must be separated from the rest of the network. Which reason for segmentation is this?",
          options: [
            { t: "Compliance", ok: true, why: "Mandated segmentation, such as PCI." },
            { t: "Performance", why: "Performance is about high-bandwidth apps." },
            { t: "Convenience", why: "Not one of the reasons in the notes." },
            { t: "Redundancy", why: "Segmentation isn't about redundancy." }
          ],
          hint: "Someone requires it.",
          explain: "Segmentation is done for performance, security and compliance.",
          pages: [49]
        },
        {
          id: "d2-segmentation-a3", type: "choice", format: "Next action",
          prompt: "You're about to push a new ACL to the switch you're managing remotely. What do the notes warn you about?",
          options: [
            { t: "You can accidentally lock yourself out", ok: true, why: "Be careful configuring ACLs." },
            { t: "ACLs only work at night", why: "Time of day can be a condition, but that's not the warning." },
            { t: "ACLs encrypt all traffic", why: "ACLs allow or deny. They don't encrypt." },
            { t: "ACLs can't filter by IP", why: "IP address is a common condition." }
          ],
          hint: "What if the rule blocks your own session?",
          explain: "Test ACL changes and keep a way back in.",
          pages: [49]
        },
        {
          id: "d2-segmentation-a4", type: "recall", format: "Recall",
          front: "Three types of segmentation, and three reasons to segment?",
          back: "Physical, logical (VLANs) and virtual. Reasons: performance, security and compliance.",
          pages: [49]
        }
      ]
    },
    {
      id: "d2-mitigation",
      objective: "2.5",
      section: "Mitigation Techniques",
      title: "Mitigation techniques",
      pages: [50],
      lesson: {
        summary: [
          "Patching: monthly and third-party updates, plus emergency out-of-band patches for zero-days. Auto-update isn't always the best option.",
          "Encryption: full disk (BitLocker, FileVault), file level (Windows EFS) and application data encryption.",
          "Monitoring: sensors (IPS, firewall, auth, web, database and email logs) feed collectors (consoles, SIEM, syslog). SIEMs often correlate across sources.",
          "Least privilege, configuration enforcement and formal decommissioning round out the list."
        ],
        more: [
          "Least privilege: give only exactly what's needed. Apps run with minimal privileges and users don't run as admin.",
          "Configuration enforcement: a posture check each time a device connects (OS patch level, EDR version and status, firewall, certificates). Non-compliant devices are quarantined to a private VLAN and rechecked after fixes.",
          "Decommissioning should be a formal policy, especially for storage (HDD, SSD, USB): recycle the device or destroy it.",
          "QA angle: CI service accounts with only the permissions their jobs need is least privilege."
        ],
        pages: [50]
      },
      activities: [
        {
          id: "d2-mitigation-a1", type: "match", format: "Match",
          prompt: "Match each action to the mitigation technique.",
          choices: ["Patching", "Encryption", "Monitoring", "Least privilege", "Configuration enforcement", "Decommissioning"],
          items: [
            { t: "Out-of-band update for a newly announced zero-day", a: "Patching", why: "Emergency patches outside the normal cycle." },
            { t: "Turning on BitLocker for every test laptop", a: "Encryption", why: "Full disk encryption." },
            { t: "Sending firewall and auth logs into a SIEM", a: "Monitoring", why: "Sensors feeding a collector." },
            { t: "CI deploy job can write to one bucket only", a: "Least privilege", why: "Only exactly what's needed." },
            { t: "A laptop missing its EDR agent is put in a quarantine VLAN on connect", a: "Configuration enforcement", why: "Posture assessment, then quarantine." },
            { t: "Old test servers' SSDs are destroyed under a formal policy", a: "Decommissioning", why: "Don't throw data in the trash." }
          ],
          hint: "Which technique does each action belong to?",
          explain: "These techniques overlap and work together.",
          pages: [50]
        },
        {
          id: "d2-mitigation-a2", type: "order", format: "Order",
          prompt: "Put configuration enforcement steps in order.",
          steps: [
            { t: "Device connects to the network", why: "The check runs every time." },
            { t: "Posture assessment checks OS patches, EDR, firewall and certificates", why: "An extensive check." },
            { t: "Non-compliant device is quarantined in a private VLAN", why: "Limited access until fixed." },
            { t: "After corrections, the device is rechecked", why: "Then allowed if it passes." }
          ],
          hint: "Check, isolate, fix, recheck.",
          explain: "Enforcement keeps out-of-date devices off the main network.",
          pages: [50]
        },
        {
          id: "d2-mitigation-a3", type: "choice", format: "Compare",
          prompt: "In monitoring, what's the difference between a sensor and a collector?",
          options: [
            { t: "Sensors generate data; collectors aggregate it", ok: true, why: "Logs from IPS, firewalls and servers flow into SIEMs and syslog servers." },
            { t: "Sensors are always hardware; collectors are always cloud", why: "Sensors can be built into software or devices." },
            { t: "Collectors block traffic; sensors encrypt it", why: "Neither is their role." },
            { t: "They're the same thing", why: "They're different roles in the pipeline." }
          ],
          hint: "Source vs. destination.",
          explain: "Many SIEMs correlate data across sensors.",
          pages: [50]
        },
        {
          id: "d2-mitigation-a4", type: "recall", format: "Recall",
          front: "Why isn't auto-update always the best option?",
          back: "This page only says it isn't always the best option. A likely reason, from the OS vulnerabilities section: a patch can break something, so some teams test before rolling it out.",
          pages: [50]
        }
      ]
    },
    {
      id: "d2-hardening",
      objective: "2.5",
      section: "Hardening Techniques",
      title: "Hardening techniques",
      pages: [50, 51],
      lesson: {
        summary: [
          "System hardening: OS updates and patches, strong account and password rules, limited network access, and anti-malware.",
          "Encrypt files (EFS), whole disks (BitLocker, FileVault) and network traffic (VPN, application encryption).",
          "EDR detects threats with behavior, ML and process monitoring (not just signatures), investigates root cause, and responds automatically by isolating, quarantining or rolling back.",
          "Also: host-based firewalls, HIPS, closing unneeded ports, changing default passwords, and removing unnecessary software."
        ],
        more: [
          "Host-based firewall: runs on every endpoint, controls traffic per application process, blocks unknown processes, managed centrally.",
          "HIPS recognizes and blocks known attacks using signatures, heuristics and behavior (buffer overflows, registry changes, writing to the Windows folder). It's often built into endpoint protection.",
          "Open ports: close everything not required, watch for apps opening huge port ranges, and verify with Nmap or a similar scanner.",
          "Default passwords: change them on every management interface and add extra authentication where possible.",
          "Removing unused software reduces risk because all software has bugs and every app patches differently.",
          "The notes' hardening section continues onto PDF 51, which also starts 3.1 Cloud Infrastructures."
        ],
        pages: [50, 51]
      },
      activities: [
        {
          id: "d2-hardening-a1", type: "multi", format: "Investigate",
          prompt: "A port scan of a new test server came back. Which hardening actions should follow? Select all that apply.",
          artifact: { kind: "log", title: "nmap-scan.txt", body: "PORT      STATE  SERVICE\n22/tcp    open   ssh\n23/tcp    open   telnet\n443/tcp   open   https\n5900/tcp  open   vnc         (installed with OS image, unused)\n8000-8999 open   legacy-app  (opens whole range)\nmgmt UI:  login admin/admin accepted" },
          options: [
            { t: "Close Telnet and the unused VNC service", ok: true, why: "Close everything except required ports." },
            { t: "Narrow the app's 8000-8999 range to the ports it needs", ok: true, why: "Broad port ranges are a hardening concern." },
            { t: "Change the default management password", ok: true, why: "Default credentials must change." },
            { t: "Rescan afterward to verify", ok: true, why: "Use Nmap or similar, and keep monitoring." },
            { t: "Open more ports so testers don't get blocked", why: "That increases the attack surface." }
          ],
          hint: "Reduce what's exposed, then verify.",
          explain: "Every open port is a possible entry point.",
          pages: [51]
        },
        {
          id: "d2-hardening-a2", type: "choice", format: "Compare",
          prompt: "What makes EDR different from traditional signature-based anti-virus?",
          options: [
            { t: "It also uses behavior and can auto-respond", ok: true, why: "Detect, investigate and respond: isolate, quarantine or roll back via API." },
            { t: "It only uses signatures, but updates them faster", why: "Signatures aren't its only detection tool." },
            { t: "It needs a technician to approve every response", why: "It's API driven with no intervention required." },
            { t: "It replaces the need for patching", why: "Nothing replaces patching." }
          ],
          hint: "Detect, investigate, respond.",
          explain: "EDR scales to more threats by not relying only on signatures.",
          pages: [51]
        },
        {
          id: "d2-hardening-a3", type: "choice", format: "Scenario",
          prompt: "An unknown process on a test laptop tries to open an outbound connection, and it's blocked before it starts sending data. Which control most likely did that?",
          options: [
            { t: "Host-based firewall", ok: true, why: "Controls traffic per application process and blocks unknown processes." },
            { t: "Full disk encryption", why: "FDE protects data at rest, not traffic." },
            { t: "VLAN segmentation", why: "That's network-level, not per-process on the host." },
            { t: "Decommissioning policy", why: "That's for retired devices." }
          ],
          hint: "It knew which process was talking.",
          explain: "Host-based firewalls see and control traffic per application.",
          pages: [51]
        },
        {
          id: "d2-hardening-a4", type: "match", format: "Match",
          prompt: "Match each hardening measure to what it protects.",
          choices: ["Full disk encryption", "VPN", "HIPS", "Removing unnecessary software"],
          items: [
            { t: "A stolen laptop's drive can't be read", a: "Full disk encryption", why: "Everything on the drive is encrypted." },
            { t: "Traffic from a remote tester is unreadable in transit", a: "VPN", why: "Encrypts network communication." },
            { t: "A buffer overflow attempt on the host is recognized and blocked", a: "HIPS", why: "Host-based intrusion prevention." },
            { t: "Fewer apps means fewer bugs and patch processes to manage", a: "Removing unnecessary software", why: "Reduces risk with an easy fix." }
          ],
          hint: "Data at rest, in transit, host attacks, or attack surface?",
          explain: "Hardening is layered: defense in depth.",
          pages: [50, 51]
        },
        {
          id: "d2-hardening-a5", type: "recall", format: "Recall",
          front: "What three detection methods does HIPS use?",
          back: "Signatures, heuristics and behavioral analysis.",
          pages: [51]
        }
      ]
    }
  ]
});
