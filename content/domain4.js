/*
 * Domain 4.0 - Security Operations
 * Source: Professor Messer SY0-701 Course Notes v1.07, PDF pages 68-93 (printed pages 59-84).
 * All lessons and questions are original wording. "pages" are PDF page numbers
 * (printed page = PDF page - 9).
 *
 * Activity types: choice | multi | match | order | recall  (see content/README.md)
 */
window.SECPLUS = window.SECPLUS || {};
(window.SECPLUS.content = window.SECPLUS.content || []).push({
  domain: "d4",
  topics: [
    // ------------------------------------------------------------------ 4.1 Secure baselines
    {
      id: "d4-baselines",
      objective: "4.1",
      section: "Secure Baselines",
      title: "Secure baselines",
      pages: [68],
      lesson: {
        summary: [
          "A secure baseline defines how every instance of an application environment must be configured: firewall settings, patch levels, OS file versions. It may need constant updates.",
          "Integrity measurements check systems against the baseline. Run them often, compare against well-documented baselines, and correct any failure immediately.",
          "Establish baselines: build a series of foundational security policies. Manufacturers (app developers, OS makers, appliance makers) often publish them.",
          "Deploy baselines from a central console, sometimes through several mechanisms (Active Directory group policy, MDM). Automation is the key to reaching thousands of devices.",
          "Maintain baselines: many are stable best practices, but new vulnerabilities, updated apps and new OS installs force changes. Test and measure, because some baselines can contradict others."
        ],
        more: [
          "The notes point out that Windows 10 has over 3,000 group policy settings, and only some relate to security. A manufacturer's baseline saves you sorting through them all.",
          "QA analogy: a baseline is the expected result, and an integrity measurement is the assertion. A failed assertion means fix it now, not next sprint."
        ],
        pages: [68]
      },
      activities: [
        {
          id: "d4-baselines-a1", type: "order", format: "Order",
          prompt: "Put the secure baseline lifecycle from the notes in order.",
          steps: [
            { t: "Establish the baselines from foundational security policies", why: "You need a defined baseline before anything else." },
            { t: "Deploy them, ideally automated from a central console", why: "Then push them to every device." },
            { t: "Maintain them as vulnerabilities, apps and OSes change", why: "Baselines need ongoing updates and conflict testing." }
          ],
          hint: "Define, push, keep current.",
          explain: "Establish, deploy, maintain. Integrity measurements keep checking against the baseline throughout.",
          pages: [68]
        },
        {
          id: "d4-baselines-a2", type: "choice", format: "Next action",
          prompt: "An integrity measurement shows a server's OS file versions no longer match the secure baseline. What do the notes say should happen?",
          options: [
            { t: "Correct it immediately", ok: true, why: "A failed integrity check requires an immediate correction." },
            { t: "Wait for the next quarterly audit and fix it then", why: "The notes say failure requires immediate correction, not a delay." },
            { t: "Update the baseline so the server's current files become the standard", why: "That hides the drift instead of fixing it." },
            { t: "Ignore it, because file versions aren't part of a baseline", why: "OS file versions are one of the notes' examples of baseline settings." }
          ],
          hint: "How urgent is a failure?",
          explain: "Integrity measurements exist so drift is caught and fixed right away.",
          pages: [68]
        },
        {
          id: "d4-baselines-a3", type: "choice", format: "Scenario",
          prompt: "You must apply the same security settings to 4,000 laptops. Which approach fits the notes best?",
          options: [
            { t: "Ask each user to follow a settings guide", why: "Manual steps don't scale and won't stay consistent." },
            { t: "Automate deployment through group policy or MDM", ok: true, why: "Automation through a central console is the key." },
            { t: "Configure a sample of laptops and assume the rest match", why: "Unchecked assumptions are exactly what integrity measurements catch." },
            { t: "Skip the baseline because Windows has too many settings", why: "Manufacturer baselines already pick out the security-relevant settings." }
          ],
          hint: "The notes name one key word for scale.",
          explain: "Deploy baselines centrally and automatically.",
          pages: [68]
        },
        {
          id: "d4-baselines-a4", type: "recall", format: "Recall",
          front: "Name three events that can force a secure baseline to change.",
          back: "A new vulnerability is discovered, an updated application is deployed, or a new operating system is installed. Test and measure afterward, because some baselines can contradict others.",
          pages: [68]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.1 Hardening targets
    {
      id: "d4-hardening",
      objective: "4.1",
      section: "Hardening Targets",
      title: "Hardening targets",
      pages: [68, 69],
      lesson: {
        summary: [
          "No system is secure with default configurations. Hardening guides are specific to the software or platform; get them from the manufacturer or an Internet interest group.",
          "Mobile devices: use manufacturer checklists, keep updates current, segment company and user data, and control them with an MDM.",
          "Workstations: monitor and update constantly (OS, apps, firmware), automate monthly patches, connect to a policy system like AD group policy, and remove unnecessary software.",
          "Network infrastructure devices (switches, routers): purpose-built with an embedded OS. Change default authentication and check the manufacturer for security updates, which are infrequent but important.",
          "Cloud infrastructure: secure the cloud management workstation (the keys to the kingdom), apply least privilege, run EDR on every device that reaches the cloud, and keep backups (cloud to cloud, C2C).",
          "Servers: OS updates and patches, password length and complexity, account limits, limited network access, and anti-virus/anti-malware."
        ],
        more: [
          "SCADA / ICS: large multi-site industrial control systems (power, refining, manufacturing) need extensive segmentation with no access from outside.",
          "Embedded systems can be hard to upgrade. Patch what you can, then segment and firewall them.",
          "RTOS (real-time operating system): deterministic scheduling for industrial equipment, cars and military gear. Isolate it, run minimum services, and use secure communication with a host-based firewall.",
          "IoT devices (HVAC, lighting, wearables) often ship with weak defaults because the makers aren't security professionals. Change passwords, deploy updates quickly, and put them on their own VLAN."
        ],
        pages: [68, 69]
      },
      activities: [
        {
          id: "d4-hardening-a1", type: "match", format: "Match",
          prompt: "Match each target to a hardening step the notes give for it.",
          choices: ["IoT device", "Cloud infrastructure", "Network infrastructure device", "RTOS", "Workstation"],
          items: [
            { t: "Put it on its own VLAN and change the default password", a: "IoT device", why: "IoT makers aren't security professionals, so isolate and fix defaults." },
            { t: "Secure the management workstation and keep C2C backups", a: "Cloud infrastructure", why: "The management workstation holds the keys to the kingdom." },
            { t: "Replace default authentication on the embedded OS", a: "Network infrastructure device", why: "Switches and routers are purpose-built and must not keep defaults." },
            { t: "Run minimum services and a host-based firewall", a: "RTOS", why: "Deterministic systems are isolated and kept minimal." },
            { t: "Automate monthly patches and remove unnecessary software", a: "Workstation", why: "User desktops need constant updates and fewer threats." }
          ],
          hint: "Look for the one detail that only fits each device.",
          explain: "Each platform has its own hardening guide, but defaults, updates and isolation come up again and again.",
          pages: [68, 69]
        },
        {
          id: "d4-hardening-a2", type: "choice", format: "Compare",
          prompt: "Where should you get the most detailed hardening guidance for a specific firewall appliance?",
          options: [
            { t: "The manufacturer or a relevant Internet interest group", ok: true, why: "The notes say they'll have the best details." },
            { t: "The default configuration, since it was tested by the vendor", why: "No system is secure with default configurations." },
            { t: "Any general-purpose guide, since all platforms harden the same way", why: "Hardening guides are specific to the software or platform." },
            { t: "The users who access it most", why: "Users aren't a source of platform hardening guidance." }
          ],
          hint: "Who knows the product best?",
          explain: "Use platform-specific guides from the manufacturer or interest groups.",
          pages: [68]
        },
        {
          id: "d4-hardening-a3", type: "choice", format: "Scenario",
          prompt: "A refinery's control systems are managed by a PC and span several sites. What do the notes say this kind of system requires above all?",
          options: [
            { t: "A bring-your-own-device policy", why: "BYOD is about mobile devices, not industrial control." },
            { t: "Faster Wi-Fi coverage", why: "Coverage isn't the security priority here." },
            { t: "Extensive segmentation with no access from the outside", ok: true, why: "SCADA/ICS needs extensive segmentation." },
            { t: "Default passwords so field technicians can always log in", why: "Defaults are the opposite of hardening." }
          ],
          hint: "SCADA / ICS.",
          explain: "Industrial control systems are kept tightly segmented.",
          pages: [69]
        },
        {
          id: "d4-hardening-a4", type: "multi", format: "Investigate",
          prompt: "You're hardening a fleet of servers. Which steps come from the notes? Select all that apply.",
          options: [
            { t: "Enforce minimum password length and complexity", ok: true, why: "Listed under user accounts." },
            { t: "Limit network access", ok: true, why: "Listed under network access and security." },
            { t: "Run anti-virus and anti-malware", ok: true, why: "Listed under monitor and secure." },
            { t: "Leave unused services enabled in case they're needed later", why: "Unneeded services add attack surface." }
          ],
          hint: "One option grows the attack surface.",
          explain: "Patch, lock down accounts, limit network access, and monitor.",
          pages: [69]
        },
        {
          id: "d4-hardening-a5", type: "recall", format: "Recall",
          front: "Why are embedded systems hard to secure, and what do the notes suggest?",
          back: "They're built for one function and can be difficult to upgrade (a TV is easy, many other devices aren't). Apply security patches where you can, then segment and firewall them.",
          pages: [69]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.1 Wireless and mobile
    {
      id: "d4-mobile",
      objective: "4.1",
      section: "Securing Wireless and Mobile",
      title: "Securing wireless and mobile",
      pages: [69, 70],
      lesson: {
        summary: [
          "Site surveys sample the wireless spectrum, identify existing access points (you may not control them all), plan around existing frequencies, and repeat over time. Heat maps show signal strength.",
          "Wireless survey tools check signal coverage and interference, using built-in tools, third-party tools or a spectrum analyzer.",
          "Mobile Device Management (MDM) centrally manages company-owned and user-owned devices: policies on apps, data and camera, control of the whole device or a partition, and forced screen locks and PINs.",
          "Deployment models: BYOD (employee owns it, hard to secure), COPE (company owns it, personal use allowed, full company control), CYOD (like COPE, but the user picks the device)."
        ],
        more: [
          "BYOD questions from the notes: how is data protected on a device that's both home and work, and what happens to the data when the device is sold or traded in?",
          "Cellular networks (4G, 5G) split land into cells. Concerns: traffic monitoring, location tracking, and worldwide access to the device.",
          "Wi-Fi has local security problems: data capture (so encrypt), on-path attacks that monitor or modify data, and denial of service by frequency interference.",
          "Bluetooth is a short-range personal area network (PAN) for tethering, headsets, health monitors, car integration, smartwatches and speakers."
        ],
        pages: [69, 70]
      },
      activities: [
        {
          id: "d4-mobile-a1", type: "match", format: "Match",
          prompt: "Match each deployment model to its description.",
          choices: ["BYOD", "COPE", "CYOD"],
          items: [
            { t: "The employee owns the device and must meet company requirements", a: "BYOD", why: "Bring your own device." },
            { t: "The company buys the device, allows personal use, and keeps full control", a: "COPE", why: "Corporate owned, personally enabled." },
            { t: "Like COPE, but the employee picks which device", a: "CYOD", why: "Choose your own device." }
          ],
          hint: "Who owns it, and who chooses it?",
          explain: "Ownership and choice are what separate the three models.",
          pages: [69, 70]
        },
        {
          id: "d4-mobile-a2", type: "choice", format: "Scenario",
          prompt: "An employee sells their personal phone, which still has company email on it. Which model makes this risk most likely?",
          options: [
            { t: "COPE", why: "With COPE the company owns the device and can delete information at any time." },
            { t: "CYOD", why: "CYOD is company-owned too, just chosen by the user." },
            { t: "BYOD", ok: true, why: "The notes ask what happens to data when a BYOD device is sold or traded in." },
            { t: "An air-gapped workstation", why: "That isn't a mobile deployment model." }
          ],
          hint: "Who owns the phone being sold?",
          explain: "BYOD mixes home and work on a device the company doesn't own.",
          pages: [69]
        },
        {
          id: "d4-mobile-a3", type: "choice", format: "Next action",
          prompt: "You're adding access points to a new floor. What should you do first, according to the notes?",
          options: [
            { t: "Run a site survey to sample the existing wireless landscape", ok: true, why: "Identify existing APs and frequencies before you plan." },
            { t: "Install the access points at maximum power everywhere", why: "Without a survey you'll fight interference you didn't plan for." },
            { t: "Assume you control every access point in range", why: "The notes warn you may not control all of them." },
            { t: "Turn on Bluetooth for all staff devices", why: "Unrelated to planning Wi-Fi coverage." }
          ],
          hint: "Look before you build.",
          explain: "Site surveys, plus heat maps, show what's already there. Repeat them because things change.",
          pages: [69]
        },
        {
          id: "d4-mobile-a4", type: "multi", format: "Investigate",
          prompt: "Which are Wi-Fi security concerns listed in the notes? Select all that apply.",
          options: [
            { t: "Data capture", ok: true, why: "So encrypt your data." },
            { t: "On-path attacks", ok: true, why: "Attackers can monitor or modify data." },
            { t: "Denial of service from frequency interference", ok: true, why: "Listed as a Wi-Fi DoS." },
            { t: "Location tracking through cell towers", why: "That's the notes' cellular network concern." }
          ],
          hint: "One belongs to cellular networks.",
          explain: "Wi-Fi: capture, on-path, DoS. Cellular: monitoring, location tracking, worldwide access.",
          pages: [70]
        },
        {
          id: "d4-mobile-a5", type: "recall", format: "Recall",
          front: "What can an MDM control on a mobile device?",
          back: "Policies on apps, data and the camera; the entire device or just a work partition; and access control such as forced screen locks and PINs. It manages both company-owned and user-owned (BYOD) devices.",
          pages: [69]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.1 Wireless security settings
    {
      id: "d4-wireless",
      objective: "4.1",
      section: "Wireless Security Settings",
      title: "Wireless security settings",
      pages: [70, 71],
      lesson: {
        summary: [
          "Securing a wireless network means authenticating users before access, encrypting the data for confidentiality, and verifying integrity with a message integrity check (MIC).",
          "The WPA2 PSK problem: an attacker captures the four-way handshake (or derives the PSK hash without it), then brute forces the pre-shared key offline with GPUs or cloud cracking. With the PSK they have everyone's key, because there's no forward secrecy.",
          "WPA3 (2018) uses GCMP (Galois/Counter Mode Protocol): AES for confidentiality and GMAC for the message integrity check.",
          "SAE (Simultaneous Authentication of Equals, the dragonfly handshake) replaces the four-way handshake with a Diffie-Hellman derived exchange plus mutual authentication. Everyone gets a different session key even with the same PSK, so there's no hash to brute force.",
          "Wireless security modes: Open System (no password), WPA3-Personal / PSK (everyone shares one 256-bit key), WPA3-Enterprise / 802.1X (each user authenticates to a server such as RADIUS)."
        ],
        more: [
          "Wireless authentication credentials are either a shared password (PSK) or centralized 802.1X, configured as part of the connection and prompted during it.",
          "AAA framework: identification (who you claim to be), authentication (prove it), authorization (what you can access), accounting (login time, data sent and received, logout time).",
          "RADIUS is a common AAA protocol for routers, switches, firewalls, servers, VPNs and 802.1X. It's available on almost any server OS and isn't just for dial-in.",
          "IEEE 802.1X is port-based NAC: no network access until you authenticate, using an access database like RADIUS, LDAP or TACACS+.",
          "EAP is an authentication framework with many RFC-based methods (vendors can build their own). It works with 802.1X. The roles: supplicant (client), authenticator (the device giving access), authentication server (validates credentials)."
        ],
        pages: [70, 71]
      },
      activities: [
        {
          id: "d4-wireless-a1", type: "choice", format: "Scenario",
          prompt: "An attacker captured a WPA2-Personal handshake and later cracked the PSK on rented cloud GPUs. Why is this so damaging?",
          options: [
            { t: "Because WPA2 doesn't encrypt traffic at all", why: "WPA2 encrypts. The flaw is in how the PSK can be brute forced." },
            { t: "With the PSK they have everyone's key, since there's no forward secrecy", ok: true, why: "One cracked key exposes all users on that network." },
            { t: "It only affects the single user whose handshake was captured", why: "Everyone shares the same PSK." },
            { t: "It forces the access point to switch to Open System mode", why: "Cracking the key doesn't change the AP's mode." }
          ],
          hint: "Everyone shares one key.",
          explain: "WPA2-PSK has no forward secrecy, and weak PSKs fall quickly to modern cracking.",
          pages: [70]
        },
        {
          id: "d4-wireless-a2", type: "choice", format: "Compare",
          prompt: "What does SAE change compared with WPA2's four-way handshake?",
          options: [
            { t: "It sends the PSK across the network in encrypted form", why: "SAE creates a shared session key without sending it across the network." },
            { t: "It removes authentication so guests can join faster", why: "SAE adds mutual authentication." },
            { t: "Mutual authentication and a different session key per user, with no hash to brute force", ok: true, why: "A Diffie-Hellman derived exchange: the dragonfly handshake." },
            { t: "It switches encryption from AES to RC4", why: "WPA3's GCMP uses AES." }
          ],
          hint: "Dragonfly, Diffie-Hellman.",
          explain: "SAE means no four-way handshake, no hashes, and no offline brute force.",
          pages: [70]
        },
        {
          id: "d4-wireless-a3", type: "match", format: "Match",
          prompt: "Match each 802.1X role to what it is.",
          choices: ["Supplicant", "Authenticator", "Authentication server"],
          items: [
            { t: "The laptop trying to join the network", a: "Supplicant", why: "The supplicant is the client." },
            { t: "The access point or switch that grants access", a: "Authenticator", why: "It's the device that provides access." },
            { t: "The RADIUS server checking the credentials", a: "Authentication server", why: "It validates the client credentials." }
          ],
          hint: "Client, gatekeeper, judge.",
          explain: "802.1X with EAP keeps the port closed until the authentication server says yes.",
          pages: [71]
        },
        {
          id: "d4-wireless-a4", type: "choice", format: "Next action",
          prompt: "A company wants each employee to log in to Wi-Fi with their own credentials, checked by RADIUS. Which mode should you configure?",
          options: [
            { t: "Open System", why: "No authentication at all." },
            { t: "WPA3-Personal (PSK)", why: "Everyone would share the same key." },
            { t: "WPA3-Enterprise (802.1X)", ok: true, why: "Users authenticate individually against a server such as RADIUS." },
            { t: "WPA2-Personal with a longer pre-shared key", why: "Still one shared key, and still the PSK brute-force problem." }
          ],
          hint: "Individual users, central server.",
          explain: "Enterprise mode means 802.1X and per-user authentication.",
          pages: [71]
        },
        {
          id: "d4-wireless-a5", type: "order", format: "Order",
          prompt: "Put the AAA steps in order for a user joining the network.",
          steps: [
            { t: "Identification: the user claims an identity with a username", why: "Who you claim to be comes first." },
            { t: "Authentication: they prove it with a password and other factors", why: "Then prove the claim." },
            { t: "Authorization: the system decides what they can access", why: "Access depends on who they proved to be." },
            { t: "Accounting: login time, data sent and logout time are recorded", why: "Usage is tracked last." }
          ],
          hint: "Claim, prove, permit, record.",
          explain: "The AAA framework adds identification in front of the three A's.",
          pages: [71]
        },
        {
          id: "d4-wireless-a6", type: "recall", format: "Recall",
          front: "What three things should a secure wireless network provide, and how does WPA3's GCMP deliver two of them?",
          back: "Authentication before access, confidentiality (encryption) and integrity (a message integrity check). GCMP uses AES for confidentiality and GMAC for the MIC.",
          pages: [70]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.1 Application security
    {
      id: "d4-appsec",
      objective: "4.1",
      section: "Application Security",
      title: "Application security",
      pages: [71, 72],
      lesson: {
        summary: [
          "Secure coding concepts: development balances time and quality, and security is often secondary. Test, test, test through QA, because vulnerabilities will eventually be found and exploited.",
          "Input validation: document every input method, compare actual input with expected input, and normalize (check and correct) it. Fuzzers will find what you missed.",
          "Secure cookies have the Secure attribute, so the browser only sends them over HTTPS. Cookies aren't secure storage, so never put sensitive information in them.",
          "Static code analyzers (SAST) find many flaws, like buffer overflows and injections, but not everything (authentication security, insecure cryptography). Verify every finding, because false positives happen.",
          "Code signing: a trusted CA signs the developer's public key, and the developer signs the code with their private key. Users can confirm who wrote it and that it wasn't modified. Use your own CA for internal apps."
        ],
        more: [
          "Sandboxing keeps an application from reaching unrelated resources. It's used in development and production: virtual machines, mobile devices, browser iframes and Windows UAC.",
          "Application security monitoring gives real-time usage and access data, shows blocked attacks (SQL injection attempts, patched vulnerabilities), audits logs for hidden attacks, and flags anomalies like unusual file transfers or a jump in client access.",
          "Cookies are used for tracking, personalization and session management. They aren't executable and aren't generally a risk unless someone gets access to them."
        ],
        pages: [71, 72]
      },
      activities: [
        {
          id: "d4-appsec-a1", type: "choice", format: "Scenario",
          prompt: "A signup form accepts a postal code of any length with any characters. What should the developers add?",
          options: [
            { t: "Input validation that checks and normalizes the expected format", ok: true, why: "Validate actual vs. expected input and fix improper data." },
            { t: "Code signing for the form's JavaScript", why: "Signing proves origin, not that input is valid." },
            { t: "A Secure attribute on the session cookie", why: "That protects the cookie in transit, not form input." },
            { t: "A larger database column to fit whatever arrives", why: "That accepts bad input instead of rejecting it." }
          ],
          hint: "Actual vs. expected.",
          explain: "Document inputs, validate and normalize them, and assume fuzzers will test what you skipped.",
          pages: [71]
        },
        {
          id: "d4-appsec-a2", type: "multi", format: "Investigate",
          prompt: "Your SAST tool reports 40 findings. Which statements match the notes? Select all that apply.",
          options: [
            { t: "Some findings may be false positives, so verify each one", ok: true, why: "False positives are an issue." },
            { t: "It probably caught buffer overflows and injection flaws", ok: true, why: "These are easy for static analysis." },
            { t: "It may have missed insecure cryptography or authentication flaws", ok: true, why: "Not everything can be found through analysis." },
            { t: "A clean SAST run means the app needs no other testing", why: "Don't rely on automation for everything." }
          ],
          hint: "Useful, but not complete.",
          explain: "SAST is a strong first pass that still needs human verification and other testing.",
          pages: [72]
        },
        {
          id: "d4-appsec-a3", type: "order", format: "Order",
          prompt: "Put the code signing chain in order.",
          steps: [
            { t: "A trusted CA signs the developer's public key", why: "That gives the developer a trusted certificate." },
            { t: "The developer signs the code with their private key", why: "The signature ties the code to that developer." },
            { t: "The user's system checks the signature with the developer's public key", why: "That confirms the author and that the code wasn't modified." }
          ],
          hint: "Trust the key first, then the code.",
          explain: "Code signing uses asymmetric encryption to answer 'who wrote this?' and 'was it changed?'.",
          pages: [72]
        },
        {
          id: "d4-appsec-a4", type: "match", format: "Match",
          prompt: "Match each control to the problem it addresses.",
          choices: ["Sandboxing", "Secure cookie attribute", "Application security monitoring", "Code signing"],
          items: [
            { t: "A plugin shouldn't be able to read unrelated files", a: "Sandboxing", why: "Apps can't access unrelated resources." },
            { t: "A session cookie must never travel over plain HTTP", a: "Secure cookie attribute", why: "The browser only sends it over HTTPS." },
            { t: "You want to spot a sudden spike in client access", a: "Application security monitoring", why: "Anomaly detection is part of monitoring." },
            { t: "Users need to know an installer wasn't tampered with", a: "Code signing", why: "The signature proves integrity and author." }
          ],
          hint: "Contain, transport, watch, verify.",
          explain: "Each control covers a different part of the application's life.",
          pages: [71, 72]
        },
        {
          id: "d4-appsec-a5", type: "recall", format: "Recall",
          front: "Name four places the notes say sandboxing is used.",
          back: "Virtual machines, mobile devices, browser iframes (inline frames) and Windows User Account Control (UAC).",
          pages: [72]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.2 Asset management
    {
      id: "d4-assets",
      objective: "4.2",
      section: "Asset Management",
      title: "Asset management",
      pages: [72, 73],
      lesson: {
        summary: [
          "Acquisition/procurement: a multi-step purchasing process. A user request with budget and approvals, supplier negotiation of terms, then purchase, invoice and payment.",
          "Assignment/accounting: a central asset tracking system records ownership (a person tied to each asset) and classification (hardware is capital expenditure, software is operating expenditure).",
          "Monitoring / asset tracking: inventory every asset, tie support tickets to make and model, enumerate parts (CPU, memory, drives), and add asset tags (barcode, RFID, tracking number).",
          "Media sanitization at disposal or decommissioning removes data completely, whether cleaning a drive for reuse or deleting one file. It's a one-way trip: no recovery even with forensics tools.",
          "Physical destruction: shredder or pulverizer, drill or hammer through the platters, degaussing (removes the magnetic field and makes the drive unusable), or incineration."
        ],
        more: [
          "Certificate of destruction: when a third party destroys media, the service should include a certificate, giving you a paper trail of exactly what happened.",
          "Data retention: decide how much to back up and where (copies, versions, lifecycle, purging). Regulations may require some retention (emails, financial data), and operations need it for accidental deletion and disaster recovery. Differentiate by type and application."
        ],
        pages: [72, 73]
      },
      activities: [
        {
          id: "d4-assets-a1", type: "choice", format: "Scenario",
          prompt: "You need hard drives destroyed so they can never be used again, and you want the drive itself made unusable without shredding. Which method fits?",
          options: [
            { t: "Quick format", why: "Formatting doesn't completely remove data." },
            { t: "Degaussing", ok: true, why: "It removes the magnetic field, destroying the data and the drive." },
            { t: "Deleting files to the recycle bin", why: "Deleted files are easily recovered." },
            { t: "Encrypting the drive with a new key", why: "That's not one of the notes' destruction methods." }
          ],
          hint: "Electromagnetic.",
          explain: "Degaussing renders the drive unusable as well as wiping it.",
          pages: [73]
        },
        {
          id: "d4-assets-a2", type: "choice", format: "Next action",
          prompt: "A vendor shredded 300 of your old drives. What should you get from them?",
          options: [
            { t: "The shredded pieces, to inspect them yourself", why: "Not practical, and not what the notes suggest." },
            { t: "A certificate of destruction", ok: true, why: "It gives you a paper trail confirming the data was destroyed." },
            { t: "A refund for the drives' resale value", why: "Destroyed drives have no resale value." },
            { t: "Nothing, since outsourcing transfers all responsibility", why: "You still need confirmation your data is gone." }
          ],
          hint: "A paper trail.",
          explain: "Third-party destruction should include a certificate.",
          pages: [73]
        },
        {
          id: "d4-assets-a3", type: "match", format: "Match",
          prompt: "Match each asset management activity to its stage.",
          choices: ["Acquisition/procurement", "Assignment/accounting", "Monitoring/asset tracking", "Media sanitization"],
          items: [
            { t: "Negotiate terms and conditions with suppliers", a: "Acquisition/procurement", why: "Part of the purchasing process." },
            { t: "Record which person owns a laptop", a: "Assignment/accounting", why: "Ownership is tracked centrally." },
            { t: "Attach an RFID asset tag and enumerate its parts", a: "Monitoring/asset tracking", why: "Inventory and enumeration." },
            { t: "Wipe a decommissioned server so nothing is recoverable", a: "Media sanitization", why: "Disposal must leave no usable information." }
          ],
          hint: "Buy, assign, track, dispose.",
          explain: "Asset management follows each item from purchase to disposal.",
          pages: [72]
        },
        {
          id: "d4-assets-a4", type: "multi", format: "Investigate",
          prompt: "Which are reasons the notes give for data retention? Select all that apply.",
          options: [
            { t: "Regulatory compliance, such as email and financial data", ok: true, why: "Some backup may be required." },
            { t: "Recovering from accidental deletion", ok: true, why: "An operational need." },
            { t: "Disaster recovery", ok: true, why: "Another operational need." },
            { t: "Keeping every file forever so nothing is ever purged", why: "Retention includes lifecycles and purging old data." }
          ],
          hint: "One option ignores the lifecycle.",
          explain: "Retain what regulations and operations require, by type and application.",
          pages: [73]
        },
        {
          id: "d4-assets-a5", type: "recall", format: "Recall",
          front: "How do the notes classify hardware and software as asset types?",
          back: "Hardware is a capital expenditure, and software is an operating expenditure.",
          pages: [72]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.3 Vulnerability scanning
    {
      id: "d4-vulnscan",
      objective: "4.3",
      section: "Vulnerability Scanning",
      title: "Vulnerability scanning",
      pages: [73],
      lesson: {
        summary: [
          "Vulnerability scanning is usually minimally invasive, unlike a penetration test. Port scan to see what's open, identify systems and security devices, test from outside and inside, and gather everything (sort wheat from chaff later).",
          "Static code analyzers (SAST) appear again here: good at buffer overflows and injections, blind to some flaws, and prone to false positives.",
          "Dynamic analysis (fuzzing) sends random input to an application (fault-injecting, robustness, syntax and negative testing) and watches for crashes, server errors and exceptions.",
          "Fuzzing engines and frameworks are platform or language specific and very time and CPU heavy, so many use high-probability tests. Example: CERT's Basic Fuzzing Framework (BFF) from Carnegie Mellon.",
          "Package monitoring protects supply chain integrity: confirm a package (often open source) comes from a trusted source with no added malware or embedded vulnerabilities, before deployment."
        ],
        more: [
          "Fuzzing history: a 1988 University of Wisconsin class project by Professor Barton Miller, 'Operating System Utility Program Reliability', using the Fuzz Generator.",
          "QA analogy: fuzzing is automated negative testing at scale. Your test suite checks the inputs you thought of; the fuzzer checks the ones you didn't."
        ],
        pages: [73]
      },
      activities: [
        {
          id: "d4-vulnscan-a1", type: "choice", format: "Compare",
          prompt: "How does a vulnerability scan differ from a penetration test?",
          options: [
            { t: "A scan actively exploits flaws to prove they're real", why: "That's what a pentest does." },
            { t: "A scan is usually minimally invasive and doesn't exploit", ok: true, why: "It identifies what's there without breaking in." },
            { t: "A scan only works from outside the network", why: "Test from both outside and inside." },
            { t: "A scan never uses port scanning", why: "Port scanning is a core part of it." }
          ],
          hint: "Look vs. break in.",
          explain: "Scanning finds and reports. Pentesting tries to exploit.",
          pages: [73]
        },
        {
          id: "d4-vulnscan-a2", type: "choice", format: "Scenario",
          prompt: "Your team pipes millions of malformed requests into an API and watches for 500 errors and crashes. What is this?",
          options: [
            { t: "Static code analysis", why: "SAST reads code without running it." },
            { t: "Package monitoring", why: "That checks whether third-party packages are legitimate." },
            { t: "Port scanning", why: "That finds open ports, not input-handling bugs." },
            { t: "Dynamic analysis (fuzzing)", ok: true, why: "Random input, looking for crashes, server errors and exceptions." }
          ],
          hint: "Random input, running app.",
          explain: "Fuzzing is dynamic: it runs the app and throws unexpected input at it.",
          pages: [73]
        },
        {
          id: "d4-vulnscan-a3", type: "choice", format: "Next action",
          prompt: "A build pulls in a new open-source package. Which step do the notes recommend before deployment?",
          options: [
            { t: "Confirm it's from a trusted source with no added malware or embedded vulnerabilities", ok: true, why: "Package monitoring protects supply chain integrity." },
            { t: "Deploy it and wait for user bug reports", why: "Verify the contents before deployment." },
            { t: "Fuzz the package manager instead", why: "The concern is the package's legitimacy." },
            { t: "Remove all tests that use it", why: "That hides problems instead of checking the package." }
          ],
          hint: "Supply chain.",
          explain: "Verify packages before they reach production.",
          pages: [73]
        },
        {
          id: "d4-vulnscan-a4", type: "recall", format: "Recall",
          front: "Why do many fuzzing engines use high-probability tests?",
          back: "Fuzzing is very time and processor heavy, with many, many iterations to try, so engines focus on the tests most likely to find problems.",
          pages: [73]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.3 Threat intelligence
    {
      id: "d4-threatintel",
      objective: "4.3",
      section: "Threat Intelligence",
      title: "Threat intelligence",
      pages: [74],
      lesson: {
        summary: [
          "Threat intelligence researches threats and threat actors (group profiles, their tools) so you can invest in the best prevention. Researchers and security operations teams both use it.",
          "OSINT (open-source intelligence) uses public sources: discussion groups and social media, government data (hearings, reports), and commercial data (maps, financial reports, databases).",
          "Proprietary/third-party intelligence is compiled by someone else and sold: threat analytics, correlation across sources, constant monitoring and automated prevention workflows.",
          "Information-sharing organizations share real-time, high-quality threat data. In the Cyber Threat Alliance (CTA), members upload formatted intelligence, the CTA scores and validates it, and other members extract it.",
          "Dark web intelligence monitors overlay networks (special software needed) where hacking groups sell tools, credit cards and credentials. Watch forums for your company and executive names."
        ],
        more: [
          "Public threat intelligence is often classified. Private companies have extensive resources. Sharing critical details helps both."
        ],
        pages: [74]
      },
      activities: [
        {
          id: "d4-threatintel-a1", type: "match", format: "Match",
          prompt: "Match each source to its type of threat intelligence.",
          choices: ["OSINT", "Proprietary/third-party", "Information-sharing organization", "Dark web intelligence"],
          items: [
            { t: "Public government hearings and reports", a: "OSINT", why: "Publicly available sources." },
            { t: "A paid service correlating threats across sources", a: "Proprietary/third-party", why: "Someone else compiled it, and you buy it." },
            { t: "Members submit data that is scored and validated for others", a: "Information-sharing organization", why: "That's how the Cyber Threat Alliance works." },
            { t: "A forum selling stolen credentials with your CEO's name", a: "Dark web intelligence", why: "Monitor overlay-network forums." }
          ],
          hint: "Free, bought, shared, hidden.",
          explain: "Each source type fills a different gap.",
          pages: [74]
        },
        {
          id: "d4-threatintel-a2", type: "choice", format: "Scenario",
          prompt: "Security wants an early warning if company account passwords are being sold. Which intelligence source fits best?",
          options: [
            { t: "Commercial maps", why: "Maps are OSINT but won't show stolen accounts." },
            { t: "Government hearings", why: "Unlikely to cover your credentials." },
            { t: "Dark web forum monitoring", ok: true, why: "Accounts and passwords are sold there." },
            { t: "A vulnerability scan of your servers", why: "That finds vulnerabilities, not stolen credentials for sale." }
          ],
          hint: "Where are credentials sold?",
          explain: "Monitor dark web forums for your company and executive names.",
          pages: [74]
        },
        {
          id: "d4-threatintel-a3", type: "recall", format: "Recall",
          front: "What is the main point of collecting threat intelligence?",
          back: "To make decisions based on it: understand threats and threat actors, then invest in the best prevention.",
          pages: [74]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.3 Penetration testing
    {
      id: "d4-pentest",
      objective: "4.3",
      section: "Penetration Testing",
      title: "Penetration testing",
      pages: [74, 75],
      lesson: {
        summary: [
          "A penetration test simulates an attack. Unlike a vulnerability scan, it actually tries to exploit vulnerabilities. It's often a compliance mandate done regularly by a third party. NIST's Technical Guide to Information Security Testing and Assessment is the reference.",
          "Rules of engagement define purpose and scope: type of test (physical, internal, external), schedule, IP ranges, emergency contacts, handling of sensitive information, and in-scope and out-of-scope systems.",
          "Exploiting vulnerabilities can cause a DoS, data loss or instability, so be careful. Try many types (brute force, social engineering, injections, buffer overflows). If you get through, so can attackers.",
          "The process: initial exploitation (get in), lateral movement (system to system, since the inside is relatively unprotected), persistence (a way back in: backdoors, accounts), and the pivot (use a compromised system as a relay to reach otherwise inaccessible systems).",
          "Responsible disclosure: the researcher reports, the manufacturer fixes, then the vulnerability is announced. Bug bounty programs pay researchers who document vulnerabilities."
        ],
        more: [
          "Fixing a vulnerability takes time (code changes, testing, deployment), which is why disclosure is controlled.",
          "The table of contents lists 4.3 Penetration Testing twice, but in the body it's one section across PDF 74-75 (see the notes flags)."
        ],
        pages: [74, 75]
      },
      activities: [
        {
          id: "d4-pentest-a1", type: "order", format: "Order",
          prompt: "Put the penetration testing process in order.",
          steps: [
            { t: "Initial exploitation: get into the network", why: "First you need a foothold." },
            { t: "Lateral movement: move from system to system", why: "The inside is relatively unprotected." },
            { t: "Persistence: set up a way back in", why: "Backdoors or accounts keep access." },
            { t: "The pivot: use a compromised system to reach otherwise inaccessible systems", why: "A vulnerable system becomes a proxy or relay." }
          ],
          hint: "In, around, stay, reach further.",
          explain: "Exploit, move, persist, pivot.",
          pages: [75]
        },
        {
          id: "d4-pentest-a2", type: "multi", format: "Investigate",
          prompt: "Which belong in the rules of engagement? Select all that apply.",
          options: [
            { t: "IP address ranges and in-scope devices", ok: true, why: "Scope is defined up front." },
            { t: "Emergency contacts", ok: true, why: "Listed in the rules." },
            { t: "Testing schedule, such as after 6 PM only", ok: true, why: "Type of testing and schedule." },
            { t: "A list of the exploits that are guaranteed to work", why: "Nobody can guarantee that ahead of a test." }
          ],
          hint: "Purpose, scope, logistics.",
          explain: "Rules of engagement make everyone aware of the test parameters.",
          pages: [74]
        },
        {
          id: "d4-pentest-a3", type: "choice", format: "Scenario",
          prompt: "A researcher finds a flaw and reports it privately. The vendor ships a fix, then the issue is announced. What is this?",
          options: [
            { t: "Lateral movement", why: "That's moving between systems during an attack." },
            { t: "Responsible disclosure", ok: true, why: "Report, fix, then announce publicly." },
            { t: "A false positive", why: "The flaw was real." },
            { t: "Persistence", why: "That's keeping access during a pentest." }
          ],
          hint: "A controlled information release.",
          explain: "Responsible disclosure gives the vendor time to fix before the world knows.",
          pages: [75]
        },
        {
          id: "d4-pentest-a4", type: "choice", format: "Compare",
          prompt: "During a pentest, the tester uses a compromised web server as a relay to reach a database that isn't reachable from outside. Which step is this?",
          options: [
            { t: "Initial exploitation", why: "They already had access to the web server." },
            { t: "Persistence", why: "Persistence is a way back in, not reaching new systems." },
            { t: "The pivot", ok: true, why: "Using a vulnerable system as a proxy to reach inaccessible systems." },
            { t: "Rules of engagement", why: "That's the agreement before testing." }
          ],
          hint: "Relay.",
          explain: "Pivoting turns one compromised system into a path to others.",
          pages: [75]
        },
        {
          id: "d4-pentest-a5", type: "recall", format: "Recall",
          front: "Why must a penetration tester be careful when exploiting vulnerabilities?",
          back: "Exploits can cause a denial of service or data loss, and buffer overflows can cause instability. Rules of engagement set the limits.",
          pages: [74]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.3 Analyzing vulnerabilities
    {
      id: "d4-analyzevuln",
      objective: "4.3",
      section: "Analyzing Vulnerabilities",
      title: "Analyzing vulnerabilities",
      pages: [75, 76],
      lesson: {
        summary: [
          "Dealing with false information: a false positive reports a vulnerability that doesn't exist (different from a real but low-severity one). A false negative is a real vulnerability you didn't detect. Keep signatures updated and work with the scanner vendor.",
          "Prioritizing vulnerabilities: not all are equal. Use public disclosures and vulnerability databases, since the research has usually been done.",
          "CVSS (Common Vulnerability Scoring System) scores a vulnerability from 0 to 10. Standards change over time (CVSS 2.0 vs 3.x). The National Vulnerability Database (NVD) is synchronized with the CVE list.",
          "CVE (Common Vulnerabilities and Exposures) lets you cross-reference findings online, along with sources like Microsoft Security Bulletins. Some vulnerabilities still need a manual check; the scanner gives you a heads-up.",
          "Vulnerability classification by scan type: application scans (desktop, mobile apps), web application scans (software on a web server), and network scans (misconfigured firewalls, open ports, vulnerable devices). Signatures are the key."
        ],
        more: [
          "Exposure factor: the loss of value or business activity if exploited, as a percentage. A small DDoS that limits access might be 50%; a buffer overflow that disables a service, 100%. The worst outcome usually gets priority.",
          "Environmental variables: the same vulnerability matters more on a revenue-generating public cloud database than on an isolated test lab device. Consider the number and type of users and the potential for exploit.",
          "Industry/organizational impact: the notes cite Tallahassee Memorial HealthCare (Feb 2023, ransomware closed it for two weeks, diverting emergencies and canceling surgeries) and power utilities in Salt Lake City and LA County (March 2019, DDoS through an unpatched known vulnerability).",
          "Risk tolerance: you can't remove all risk. Patching immediately skips testing, but testing leaves you exposed meanwhile. The middle ground depends on severity."
        ],
        pages: [75, 76]
      },
      activities: [
        {
          id: "d4-analyzevuln-a1", type: "match", format: "Match",
          prompt: "Classify each scanner result.",
          choices: ["False positive", "False negative", "Low-severity vulnerability"],
          items: [
            { t: "The scanner flags a flaw in software that isn't installed", a: "False positive", why: "It reports something that doesn't exist." },
            { t: "A real flaw goes unreported because signatures are out of date", a: "False negative", why: "It exists, but wasn't detected." },
            { t: "A real flaw that needs physical access to exploit", a: "Low-severity vulnerability", why: "It's real, just not your top priority." }
          ],
          hint: "Real or not? Detected or not?",
          explain: "A false positive isn't the same as a low-severity finding. Update signatures to cut false negatives.",
          pages: [75]
        },
        {
          id: "d4-analyzevuln-a2", type: "choice", format: "Compare",
          prompt: "The same vulnerability is found on an isolated test lab device and on a revenue-generating database in the public cloud. Which consideration from the notes says to fix the cloud database first?",
          options: [
            { t: "Environmental variables", ok: true, why: "Environment, users and revenue change the priority." },
            { t: "Code signing", why: "Unrelated to prioritizing a vulnerability." },
            { t: "False negatives", why: "Both were detected." },
            { t: "Certificate of destruction", why: "That's for media disposal." }
          ],
          hint: "Where does it live, and who uses it?",
          explain: "Every environment is different, so the same CVE can rank differently.",
          pages: [76]
        },
        {
          id: "d4-analyzevuln-a3", type: "choice", format: "Scenario",
          prompt: "A flaw would let attackers fully disable a customer-facing service. What exposure factor would the notes assign?",
          options: [
            { t: "0%", why: "There's clearly a loss." },
            { t: "25%", why: "Too low for a full outage." },
            { t: "50%", why: "The notes use 50% for a small DDoS that only limits access." },
            { t: "100%", ok: true, why: "Completely disabling a service is a 100% exposure factor." }
          ],
          hint: "Total loss of the service.",
          explain: "Exposure factor is the percentage of value lost if the vulnerability is exploited.",
          pages: [75]
        },
        {
          id: "d4-analyzevuln-a4", type: "choice", format: "Next action",
          prompt: "A critical patch arrives. Your change board wants a week of testing; the security team wants it live now. What does the notes' idea of risk tolerance suggest?",
          options: [
            { t: "Always patch immediately without testing", why: "That skips proper testing." },
            { t: "Find a middle ground based on the severity", ok: true, why: "Testing takes time, and you're vulnerable while testing." },
            { t: "Never patch, since patches can break things", why: "Leaving it unpatched isn't an acceptable middle ground." },
            { t: "Remove all risk before deciding", why: "It's impractical to remove all risk." }
          ],
          hint: "Neither extreme.",
          explain: "Risk tolerance balances testing time against exposure, shifting with severity.",
          pages: [76]
        },
        {
          id: "d4-analyzevuln-a5", type: "recall", format: "Recall",
          front: "What is CVSS, and how does it relate to the NVD and CVE?",
          back: "CVSS is a quantitative 0-10 score for a vulnerability (versions like 2.0 and 3.x score differently). The National Vulnerability Database is synchronized with the CVE list and adds search; CVE is the common naming list for cross-referencing.",
          pages: [75]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.3 Vulnerability remediation
    {
      id: "d4-remediation",
      objective: "4.3",
      section: "Vulnerability Remediation",
      title: "Vulnerability remediation",
      pages: [76, 77],
      lesson: {
        summary: [
          "Patching is the most common mitigation: scheduled notices (monthly, quarterly) and unscheduled, often urgent, zero-day patches. It's ongoing and prevents most exploits.",
          "Cybersecurity insurance can cover lost revenue, data recovery, money lost to phishing and privacy lawsuits, but not everything (intentional acts, funds transfers). Ransomware has made it popular.",
          "Segmentation limits an exploit's scope: separate devices into networks or VLANs, air gap what you can't patch, and use internal NGFWs to block unneeded traffic between VLANs and spot malicious internal traffic.",
          "Physical segmentation uses separate devices and infrastructure. Logical segmentation uses VLANs, which can't talk to each other without a layer 3 device (router).",
          "Compensating controls cover the gap until a patch is possible: disable the problematic service, revoke application access, limit external access, or adjust internal controls and software firewalls."
        ],
        more: [
          "Exceptions and exemptions: removing a vulnerability is best, but not everything can be patched. Some need local login or physical access. An exception usually goes through a formal approval process.",
          "Validation of remediation: did the patch stop the exploit, on every system? Rescan extensively, audit remediated systems, and manually verify.",
          "Reporting is continuous and needs automation: number of vulnerabilities, systems patched vs. unpatched, new threat notifications, and errors, exceptions and exemptions."
        ],
        pages: [76, 77]
      },
      activities: [
        {
          id: "d4-remediation-a1", type: "choice", format: "Scenario",
          prompt: "A vulnerable service can't be patched for three weeks. Which response is a compensating control?",
          options: [
            { t: "Disable the problematic service or limit external access until the patch", ok: true, why: "These provide coverage until a patch is deployed." },
            { t: "Mark the finding as a false positive", why: "It's a real vulnerability." },
            { t: "Wait three weeks and do nothing", why: "Compensating controls exist so you don't wait unprotected." },
            { t: "Buy insurance and consider it remediated", why: "Insurance transfers some cost but doesn't cover the gap." }
          ],
          hint: "Cover the gap another way.",
          explain: "When the optimal fix isn't available, compensate with other controls.",
          pages: [76]
        },
        {
          id: "d4-remediation-a2", type: "order", format: "Order",
          prompt: "After a patch is deployed, put the validation steps from the notes in order.",
          steps: [
            { t: "Rescan with an extensive vulnerability scan", why: "First, see what the scanner says now." },
            { t: "Audit remediated systems to confirm the patch deployed", why: "Then check each system really took it." },
            { t: "Manually verify the system's security", why: "Finally, confirm by hand." }
          ],
          hint: "Scan, audit, verify.",
          explain: "Validation answers two questions: does it stop the exploit, and is every system patched?",
          pages: [77]
        },
        {
          id: "d4-remediation-a3", type: "choice", format: "Compare",
          prompt: "Two VLANs on one switch can't communicate. What's needed to let them talk?",
          options: [
            { t: "An air gap", why: "That would separate them further." },
            { t: "A layer 3 device such as a router", ok: true, why: "VLANs can't communicate without one." },
            { t: "A longer patch cable", why: "VLAN separation is logical, not about cabling." },
            { t: "Cybersecurity insurance", why: "Unrelated to traffic between VLANs." }
          ],
          hint: "Logical separation, routed connection.",
          explain: "Logical segmentation with VLANs needs layer 3 to cross between them.",
          pages: [76]
        },
        {
          id: "d4-remediation-a4", type: "multi", format: "Investigate",
          prompt: "Which items does a cybersecurity insurance policy typically cover, per the notes? Select all that apply.",
          options: [
            { t: "Lost revenue", ok: true, why: "Listed." },
            { t: "Data recovery costs", ok: true, why: "Listed." },
            { t: "Privacy lawsuit costs", ok: true, why: "Listed." },
            { t: "Losses from an employee's intentional act", why: "The notes say intentional acts aren't covered." }
          ],
          hint: "It doesn't cover everything.",
          explain: "Insurance covers many breach costs, but intentional acts and funds transfers are typical exclusions.",
          pages: [76]
        },
        {
          id: "d4-remediation-a5", type: "recall", format: "Recall",
          front: "When might you grant a vulnerability exception, and how?",
          back: "When something can't be patched and you must balance providing the service with protecting it, especially if exploitation needs local login or physical access. It usually goes through a formal approval process.",
          pages: [77]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.4 Security monitoring
    {
      id: "d4-monitoring",
      objective: "4.4",
      section: "Security Monitoring",
      title: "Security monitoring",
      pages: [77, 78],
      lesson: {
        summary: [
          "Attackers never sleep, so monitor 24/7/365: all entry points (logins, public services, data storage, remote access), react to security events, and use status dashboards.",
          "Monitoring computing resources: systems (strange-location logins, service activity, backups, versions), applications (uptime, response time, data transfer rates, vendor security notices) and infrastructure (remote access for employees, vendors and guests; firewall and IPS reports).",
          "Log aggregation with a SIEM consolidates logs from servers, firewalls, VPN concentrators, SANs and cloud services into one database for central reporting and correlation.",
          "Scanning keeps up with a changing landscape: OS types and versions, driver versions, installed apps and anomalies. Reporting turns that data into actionable reports, like how many systems a new vulnerability affects.",
          "Archiving: the notes cite an IBM 2022 report that it takes about nine months on average to identify and contain a breach, so keep data for an extended period. Laws or the organization may mandate it."
        ],
        more: [
          "Alerting: real-time notice of events such as rising authentication errors or large file transfers, by SMS, email or the SOC console. Keep it actionable.",
          "Alert response and remediation: quarantine is a foundational response that stops spread. Alert tuning balances false positives and false negatives and improves over time.",
          "Reporting also includes ad hoc summaries to prepare for the unknown and status info such as devices on older operating systems."
        ],
        pages: [77, 78]
      },
      activities: [
        {
          id: "d4-monitoring-a1", type: "choice", format: "Scenario",
          prompt: "Your analysts get 800 alerts a day and most are noise, but you're also worried about missing real attacks. What do the notes call this ongoing work?",
          options: [
            { t: "Archiving", why: "That's long-term data storage." },
            { t: "Alert tuning", ok: true, why: "A balancing act between false positives and false negatives." },
            { t: "Log aggregation", why: "That's collecting the logs, not tuning the alerts." },
            { t: "Quarantine", why: "That's a response to a threat, not tuning." }
          ],
          hint: "It gets better over time.",
          explain: "Alerts should be accurate, and tuning is an ongoing process.",
          pages: [78]
        },
        {
          id: "d4-monitoring-a2", type: "choice", format: "Compare",
          prompt: "Why do the notes recommend archiving security data for an extended period?",
          options: [
            { t: "Because dashboards only show the last hour", why: "Not the reason given." },
            { t: "To make SIEM correlation faster", why: "Not the reason given." },
            { t: "Breaches take about nine months on average to identify and contain", ok: true, why: "You'll need old data during that long investigation." },
            { t: "So alerts can be sent by SMS", why: "Unrelated to archiving." }
          ],
          hint: "How long do breaches go unnoticed?",
          explain: "Long detection times mean old logs are critical. Law may also mandate retention.",
          pages: [77]
        },
        {
          id: "d4-monitoring-a3", type: "match", format: "Match",
          prompt: "Match each thing to monitor with its category from the notes.",
          choices: ["Systems", "Applications", "Infrastructure"],
          items: [
            { t: "Logins from strange places", a: "Systems", why: "Authentication monitoring." },
            { t: "Uptime and response times", a: "Applications", why: "Availability monitoring." },
            { t: "Vendor and guest remote access", a: "Infrastructure", why: "Remote access systems." },
            { t: "Increases or decreases in data transfer rates", a: "Applications", why: "Data transfers." },
            { t: "Firewall and IPS reports", a: "Infrastructure", why: "Shows increases or types of attack." }
          ],
          hint: "Servers, apps, network gear.",
          explain: "Monitoring covers systems, applications and infrastructure.",
          pages: [77]
        },
        {
          id: "d4-monitoring-a4", type: "choice", format: "Next action",
          prompt: "An alert shows a laptop beaconing to a known malware domain. What's the foundational first response from the notes?",
          options: [
            { t: "Archive the logs for nine months", why: "Archiving doesn't stop the threat." },
            { t: "Tune the alert to stop it firing", why: "The alert looks real. Silencing it is wrong." },
            { t: "Quarantine the device", ok: true, why: "Quarantine prevents the issue from spreading." },
            { t: "Email the user a newsletter about malware", why: "Not a response to an active issue." }
          ],
          hint: "Stop it spreading.",
          explain: "Quarantine is a foundational security response.",
          pages: [78]
        },
        {
          id: "d4-monitoring-a5", type: "recall", format: "Recall",
          front: "What does log aggregation give you, and what tool does it?",
          back: "A SIEM (or SEM) consolidates logs from many sources into one database, giving centralized reporting and correlation across diverse systems: authentication and access, application access and data transfers.",
          pages: [77]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.4 Security tools
    {
      id: "d4-tools",
      objective: "4.4",
      section: "Security Tools",
      title: "Security tools",
      pages: [78, 79],
      lesson: {
        summary: [
          "SCAP (Security Content Automation Protocol), managed by NIST, lets different tools (NGFWs, IPS, scanners) identify and act on the same criteria: validate configuration, confirm patches, scan for breaches. Shared content enables automation across tools for monitoring, alerting and remediating noncompliant systems.",
          "Benchmarks are the minimum security settings for OSes, cloud providers and mobile devices, such as the CIS benchmarks. A mobile example: disable screenshots and screen recording, force encrypted backups, set a 'lost phone' message.",
          "Agents vs. agentless: an agent gives more detail and real-time monitoring but must be maintained. An agentless check runs on demand, then disappears, needs no updates, but can't alert when it isn't running.",
          "A SIEM collects real-time security alerts, aggregates and stores logs long-term, correlates diverse data, and supports forensic analysis after an event.",
          "DLP (data loss prevention) finds sensitive data (SSNs, card numbers, medical records) and stops leakage. It often needs several solutions: endpoints, cloud systems, email and collaboration tools."
        ],
        more: [
          "Anti-virus vs. anti-malware: technically, viruses (trojans, worms, macro viruses) are one type of malware, while anti-malware also covers spyware, ransomware and fileless malware. Today the terms are effectively the same.",
          "SNMP (Simple Network Management Protocol) polls devices over udp/161 for values in the MIB (Management Information Base), identified by OIDs (object identifiers), to build historical graphs.",
          "SNMP traps let the device send an alert itself over udp/162 when a threshold is hit (for example, CRC errors rising by 5), so the station can react immediately.",
          "NetFlow gathers statistics on traffic flows: a probe watches traffic and sends summary records to a collector, usually with a separate reporting app.",
          "Vulnerability scanners appear here too, with the same points as 4.3: minimally invasive, port scans, inside and outside testing."
        ],
        pages: [78, 79]
      },
      activities: [
        {
          id: "d4-tools-a1", type: "match", format: "Match",
          prompt: "Match each tool to what it does.",
          choices: ["SCAP", "NetFlow", "SNMP trap", "DLP", "CIS benchmark"],
          items: [
            { t: "Lets different vendors' tools evaluate the same criteria", a: "SCAP", why: "A shared standard that enables automation between tools." },
            { t: "A probe sends traffic flow summaries to a collector", a: "NetFlow", why: "Probe and collector." },
            { t: "A switch alerts the moment CRC errors cross a threshold", a: "SNMP trap", why: "Sent by the device over udp/162." },
            { t: "Stops credit card numbers leaving by email", a: "DLP", why: "Prevents data leakage." },
            { t: "Minimum recommended security settings for an OS", a: "CIS benchmark", why: "Benchmarks are best-practice baselines." }
          ],
          hint: "Standard, flows, push alert, leak, baseline.",
          explain: "Security tools cover configuration, traffic, devices and data.",
          pages: [78, 79]
        },
        {
          id: "d4-tools-a2", type: "choice", format: "Compare",
          prompt: "What's the trade-off of an agentless compliance check compared with an installed agent?",
          options: [
            { t: "It needs constant updates on every device", why: "That's the agent's downside." },
            { t: "It gives more detail than an agent", why: "Agents usually give more detail." },
            { t: "It can't alert you when it isn't running", ok: true, why: "It runs, checks, then disappears." },
            { t: "It requires a formal install on each device", why: "Agentless means no formal install." }
          ],
          hint: "It disappears after the check.",
          explain: "Agents: detail and real-time, but maintenance. Agentless: no upkeep, but no ongoing alerts.",
          pages: [78]
        },
        {
          id: "d4-tools-a3", type: "choice", format: "Scenario",
          prompt: "You want routers to report a problem immediately instead of waiting for the next poll. What should you configure?",
          options: [
            { t: "SNMP polling every 24 hours", why: "Polling waits for the request." },
            { t: "SNMP traps with a threshold", ok: true, why: "The device sends a trap over udp/162 when the threshold is crossed." },
            { t: "A larger MIB", why: "The MIB holds data. It doesn't push alerts." },
            { t: "An agentless scan", why: "That's a compliance check, not a device alert." }
          ],
          hint: "Let the device speak first.",
          explain: "Traps avoid constant polling and allow immediate reaction.",
          pages: [79]
        },
        {
          id: "d4-tools-a4", type: "multi", format: "Investigate",
          prompt: "Which are SIEM capabilities listed in the notes? Select all that apply.",
          options: [
            { t: "Log aggregation and long-term storage", ok: true, why: "Listed." },
            { t: "Data correlation across diverse data types", ok: true, why: "Listed." },
            { t: "Forensic analysis after an event", ok: true, why: "Listed." },
            { t: "Physically destroying old hard drives", why: "That's media sanitization." }
          ],
          hint: "Collect, link, investigate.",
          explain: "A SIEM collects, stores, correlates and supports investigation.",
          pages: [78]
        },
        {
          id: "d4-tools-a5", type: "recall", format: "Recall",
          front: "SNMP: which ports for polling and traps, and what are the MIB and OIDs?",
          back: "Polling uses udp/161; traps use udp/162. The MIB (Management Information Base) is the database of values, and each value is identified by an OID (object identifier).",
          pages: [79]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.5 Firewalls
    {
      id: "d4-firewalls",
      objective: "4.5",
      section: "Firewalls",
      title: "Firewalls",
      pages: [79, 80],
      lesson: {
        summary: [
          "Network-based firewalls filter by port or application (traditional vs. NGFW), can build site-to-site VPNs, and often act as layer 3 routers at the network edge with NAT and dynamic routing.",
          "NGFWs work at OSI layer 7 (also called application layer gateway, stateful multilayer inspection or deep packet inspection). Every packet is analyzed, categorized and given a security decision.",
          "Ports and protocols: traditional firewalls decide by TCP/UDP and port. Examples: web tcp/80 and tcp/443, SSH tcp/22, RDP tcp/3389, DNS udp/53, NTP udp/123.",
          "Firewall rules are read top to bottom with specific rules first. Most firewalls end with an implicit deny even if you didn't add one. ACLs group criteria like source and destination IP, port, time of day and application.",
          "A screened subnet adds a layer between you and the Internet: public access to public resources while private data stays inaccessible."
        ],
        more: [
          "IPS rules: usually built into an NGFW. Signature-based detection looks for a perfect match; anomaly-based builds a baseline of normal and flags unusual patterns. You choose the action (block, allow, alert).",
          "There can be thousands of IPS rules, customized by group or individually. Finding the balance between security and alert noise or false positives takes time."
        ],
        pages: [79, 80]
      },
      activities: [
        {
          id: "d4-firewalls-a1", type: "match", format: "Match",
          prompt: "Match each service to its default port from the notes.",
          choices: ["tcp/22", "tcp/443", "tcp/3389", "udp/53", "udp/123"],
          items: [
            { t: "SSH", a: "tcp/22", why: "SSH server." },
            { t: "HTTPS web server", a: "tcp/443", why: "Web uses tcp/80 and tcp/443." },
            { t: "Microsoft RDP", a: "tcp/3389", why: "Remote Desktop." },
            { t: "DNS query", a: "udp/53", why: "DNS." },
            { t: "NTP", a: "udp/123", why: "Network Time Protocol." }
          ],
          hint: "Two of these are UDP.",
          explain: "Port-based rules use these destination ports.",
          pages: [79]
        },
        {
          id: "d4-firewalls-a2", type: "choice", format: "Scenario",
          prompt: "You add one allow rule for tcp/443 and nothing else. Traffic to tcp/8080 is dropped. Why?",
          options: [
            { t: "The implicit deny at the bottom of the rule list", ok: true, why: "Most firewalls deny anything not explicitly allowed." },
            { t: "Port 8080 is reserved for SNMP", why: "SNMP uses udp/161 and 162." },
            { t: "Rules are read bottom to top", why: "They're usually read top to bottom." },
            { t: "NAT always blocks high-numbered ports", why: "That's not how NAT works." }
          ],
          hint: "What's there even if you didn't add it?",
          explain: "Implicit deny drops anything no rule allowed.",
          pages: [80]
        },
        {
          id: "d4-firewalls-a3", type: "choice", format: "Compare",
          prompt: "Which feature defines a next-generation firewall?",
          options: [
            { t: "It only filters by port number", why: "That's a traditional firewall." },
            { t: "It can't do NAT", why: "Firewalls commonly do NAT." },
            { t: "It understands applications at OSI layer 7", ok: true, why: "Also called deep packet inspection or an application layer gateway." },
            { t: "It has no rule list", why: "NGFWs still use rules." }
          ],
          hint: "Which OSI layer?",
          explain: "An NGFW analyzes and categorizes every packet by application.",
          pages: [79]
        },
        {
          id: "d4-firewalls-a4", type: "choice", format: "Next action",
          prompt: "Your IPS flags a new internal file-sharing pattern that matches no signature but is far from normal traffic. Which detection method fired?",
          options: [
            { t: "Signature-based", why: "No signature matched." },
            { t: "Anomaly-based", ok: true, why: "It compares traffic to a baseline of normal." },
            { t: "Implicit deny", why: "That's a firewall rule, not IPS detection." },
            { t: "Screened subnet", why: "That's a network design." }
          ],
          hint: "Baseline of normal.",
          explain: "Anomaly-based IPS flags unusual patterns; signature-based needs an exact match.",
          pages: [80]
        },
        {
          id: "d4-firewalls-a5", type: "recall", format: "Recall",
          front: "Why are specific firewall rules usually placed at the top?",
          back: "Rules are processed top to bottom and the first match wins, so specific rules must come before general ones or they'd never be reached. An implicit deny sits at the bottom.",
          pages: [80]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.5 Web filtering
    {
      id: "d4-webfilter",
      objective: "4.5",
      section: "Web Filtering",
      title: "Web filtering",
      pages: [80, 81],
      lesson: {
        summary: [
          "Content filtering controls traffic based on the data inside it: URL and category filtering, corporate control of sensitive materials in and out, blocking inappropriate (not safe for work) content and parental controls, plus anti-virus and anti-malware.",
          "URL scanning allows or restricts by URL (also called URI) with allow and block lists, usually by category (auction, hacking, malware, travel). It's often built into an NGFW, but URLs aren't the only way to surf, so control is limited.",
          "Agent-based filtering installs client software managed from a central console. The local agent filters wherever the user is, always on, and updates must reach every agent (often cloud-based).",
          "Proxies sit between users and the external network and make requests on their behalf: caching, access control, URL filtering, content scanning. Explicit proxies need apps configured to use them; transparent ones are invisible. A forward proxy is a centralized internal proxy that controls user access to the Internet.",
          "Block rules can target a specific URL or one of 50+ content categories, each with a disposition: for example, educational allow, home and garden allow and alert, gambling block."
        ],
        more: [
          "Reputation filtering blocks or allows based on perceived risk (trustworthy, low, medium, suspicious, high). Reputation can be automated by scanning sites or set manually by managers, then added to the URL filter as dispositions.",
          "DNS filtering: DNS servers use real-time threat intelligence (commercial and public lists) and refuse to resolve harmful sites. No IP address means no connection, and it works for any DNS lookup, not just the web."
        ],
        pages: [80, 81]
      },
      activities: [
        {
          id: "d4-webfilter-a1", type: "choice", format: "Scenario",
          prompt: "Malware on a server tries to reach a command server by name over a custom protocol, not HTTP. Which filter can still stop it?",
          options: [
            { t: "A URL category block list in the browser", why: "The malware isn't browsing, so URL filtering may never see it." },
            { t: "DNS filtering", ok: true, why: "It works for any DNS lookup: no IP address, no connection." },
            { t: "A parental control setting", why: "Not aimed at server traffic." },
            { t: "A transparent proxy that caches images", why: "Caching web content doesn't stop a non-web connection." }
          ],
          hint: "Every connection by name starts with a lookup.",
          explain: "DNS filtering refuses to resolve known-harmful names for any application.",
          pages: [81]
        },
        {
          id: "d4-webfilter-a2", type: "match", format: "Match",
          prompt: "Match each web filtering approach to its description.",
          choices: ["Agent-based", "Forward proxy", "Reputation", "Block rule by category"],
          items: [
            { t: "Filters on the laptop itself, even at a café", a: "Agent-based", why: "The local agent makes the decisions anywhere." },
            { t: "A central internal proxy that controls user access to the Internet", a: "Forward proxy", why: "Sits between users and the Internet." },
            { t: "A site rated suspicious is blocked automatically", a: "Reputation", why: "Filtering on perceived risk." },
            { t: "All gambling sites are blocked", a: "Block rule by category", why: "A category with a block disposition." }
          ],
          hint: "Where does the decision happen, and on what basis?",
          explain: "Filters differ in where they run and what they judge.",
          pages: [80, 81]
        },
        {
          id: "d4-webfilter-a3", type: "choice", format: "Compare",
          prompt: "What's the difference between an explicit and a transparent proxy?",
          options: [
            { t: "Explicit proxies encrypt everything; transparent ones don't", why: "That's not the distinction." },
            { t: "Applications must be configured for an explicit proxy; a transparent proxy is invisible to them", ok: true, why: "That's how the notes define them." },
            { t: "Transparent proxies can't cache content", why: "Caching is a general proxy feature." },
            { t: "There is no difference", why: "The notes distinguish them." }
          ],
          hint: "Does the app know the proxy is there?",
          explain: "Explicit: the app knows. Transparent: the app doesn't.",
          pages: [80]
        },
        {
          id: "d4-webfilter-a4", type: "recall", format: "Recall",
          front: "Why does URL scanning give only limited control?",
          back: "URLs aren't the only way to reach content, so filtering by URL alone can be bypassed. It's often combined with an NGFW that filters by category or specific URL.",
          pages: [80]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.5 OS security
    {
      id: "d4-ossec",
      objective: "4.5",
      section: "Operating System Security",
      title: "Operating system security",
      pages: [81],
      lesson: {
        summary: [
          "Active Directory is a mostly Windows-based database of everything on the network: computers, users, file shares, printers, groups. It handles authentication with AD credentials and centralized access control, and the help desk uses it to reset passwords and manage accounts.",
          "Group Policy manages computers or users with local and domain policies from a central console (Group Policy Management Editor): login scripts, network settings like QoS, and security parameters, with hundreds of options.",
          "SELinux (Security-Enhanced Linux) adds mandatory access control (MAC) to the Linux kernel, which traditionally uses discretionary access control (DAC). It limits application access (least privilege) so a breach has limited scope. It's open source and included in many distributions."
        ],
        more: [
          "QA analogy: Group Policy is like a shared config file every machine must load at login, so you change a setting once instead of on each test runner."
        ],
        pages: [81]
      },
      activities: [
        {
          id: "d4-ossec-a1", type: "choice", format: "Scenario",
          prompt: "You want a web server on Linux limited so a compromise can't reach other files, using mandatory access control. What do you enable?",
          options: [
            { t: "Group Policy", why: "That's the Windows configuration tool." },
            { t: "SELinux", ok: true, why: "It adds MAC to Linux and limits application access." },
            { t: "A longer password policy", why: "Doesn't confine the application." },
            { t: "DNS filtering", why: "That blocks name lookups, not file access." }
          ],
          hint: "Security-Enhanced…",
          explain: "SELinux enforces least privilege so a breach has limited scope.",
          pages: [81]
        },
        {
          id: "d4-ossec-a2", type: "match", format: "Match",
          prompt: "Match each task to the tool from the notes.",
          choices: ["Active Directory", "Group Policy", "SELinux"],
          items: [
            { t: "The help desk resets a user's password", a: "Active Directory", why: "AD holds accounts and credentials." },
            { t: "Push a login script and QoS settings to every PC", a: "Group Policy", why: "Central management of computers and users." },
            { t: "Replace DAC with MAC on a Linux server", a: "SELinux", why: "Adds mandatory access control." }
          ],
          hint: "Directory, policy, kernel.",
          explain: "AD stores identity, Group Policy configures, SELinux confines.",
          pages: [81]
        },
        {
          id: "d4-ossec-a3", type: "recall", format: "Recall",
          front: "What access control model does Linux traditionally use, and what does SELinux add?",
          back: "Traditionally discretionary access control (DAC). SELinux adds mandatory access control (MAC) through kernel security patches.",
          pages: [81]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.5 Secure protocols
    {
      id: "d4-secureproto",
      objective: "4.5",
      section: "Secure Protocols",
      title: "Secure protocols",
      pages: [81, 82],
      lesson: {
        summary: [
          "Unencrypted network data: Telnet, FTP, SMTP and IMAP send everything in the clear. A packet capture shows exactly what's exposed.",
          "Protocol selection: use an application protocol with built-in encryption. If no secure version exists, that may be a deal-breaker. The notes' table pairs them: Telnet → SSH (remote console), HTTP → HTTPS (web), IMAP → IMAPS (email client), FTP → SFTP (file transfer).",
          "Port selection: secure and insecure versions often use different ports (HTTP 80, HTTPS 443). But the port number doesn't guarantee security, so confirm the features are on, with packet captures if needed.",
          "Transport method: don't rely on the application; encrypt the transport. An open access point has no transport encryption, while WPA3 encrypts all user data. A VPN builds an encrypted tunnel for all traffic, often using third-party services."
        ],
        more: [
          "QA analogy: 'it's on port 443' is like 'the test is named test_secure'. The name doesn't prove anything; look at the actual traffic."
        ],
        pages: [81, 82]
      },
      activities: [
        {
          id: "d4-secureproto-a1", type: "choice", format: "Scenario",
          prompt: "An app is said to be secure because it uses port 443. What should you do according to the notes?",
          options: [
            { t: "Accept it, because 443 always means HTTPS", why: "The port number doesn't guarantee security." },
            { t: "Confirm the security features are enabled, using a packet capture if needed", ok: true, why: "Verify, don't assume." },
            { t: "Move it to port 80", why: "Port 80 is in-the-clear HTTP." },
            { t: "Disable the firewall to test it", why: "That isn't a verification step." }
          ],
          hint: "Trust the capture, not the number.",
          explain: "Ports are conventions. Confirm encryption is really on.",
          pages: [81]
        },
        {
          id: "d4-secureproto-a2", type: "multi", format: "Investigate",
          prompt: "Which protocols do the notes list as sending traffic in the clear? Select all that apply.",
          options: [
            { t: "Telnet", ok: true, why: "Listed." },
            { t: "FTP", ok: true, why: "Listed." },
            { t: "IMAP", ok: true, why: "Listed." },
            { t: "HTTPS", why: "HTTPS is encrypted web browsing." }
          ],
          hint: "One is the encrypted version of web browsing.",
          explain: "Telnet, FTP, SMTP and IMAP are the notes' unencrypted examples.",
          pages: [81]
        },
        {
          id: "d4-secureproto-a3", type: "choice", format: "Next action",
          prompt: "A legacy app only speaks an unencrypted protocol, and staff use it from hotel Wi-Fi. What transport-level fix do the notes suggest?",
          options: [
            { t: "Use an open access point", why: "Open APs give no transport encryption." },
            { t: "Change the app's port number", why: "Changing ports doesn't encrypt anything." },
            { t: "Send the traffic through a VPN tunnel", ok: true, why: "A VPN encrypts all traffic regardless of the app." },
            { t: "Run more packet captures", why: "That shows the problem without fixing it." }
          ],
          hint: "Don't rely on the application.",
          explain: "Encrypt the transport when the application can't encrypt itself.",
          pages: [82]
        },
        {
          id: "d4-secureproto-a5", type: "match", format: "Match",
          prompt: "The notes' table pairs each insecure protocol with its secure replacement. Match them.",
          choices: ["SSH", "HTTPS", "IMAPS", "SFTP"],
          items: [
            { t: "Telnet (remote console)", a: "SSH", why: "SSH replaces Telnet for remote console access." },
            { t: "HTTP (web browsing)", a: "HTTPS", why: "Encrypted web browsing." },
            { t: "IMAP (email client access)", a: "IMAPS", why: "IMAP over an encrypted connection." },
            { t: "FTP (file transfer)", a: "SFTP", why: "Encrypted file transfer." }
          ],
          hint: "Most secure versions just add an S.",
          explain: "Pick the protocol with built-in encryption whenever one exists.",
          pages: [81]
        },
        {
          id: "d4-secureproto-a4", type: "recall", format: "Recall",
          front: "How do an open access point and WPA3 differ for transport security?",
          back: "An open access point has no transport-level encryption; WPA3 encrypts all user data over the wireless link.",
          pages: [82]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.5 Email security
    {
      id: "d4-email",
      objective: "4.5",
      section: "Email Security",
      title: "Email security",
      pages: [82],
      lesson: {
        summary: [
          "Email security challenges: the transfer protocols have few security checks, so spoofing a sender is easy and constant. Reputable senders publish email validation in their DNS.",
          "A mail gateway is the gatekeeper: it evaluates inbound email sources and blocks messages before they reach users, on-site or in the cloud.",
          "SPF (Sender Policy Framework): the sender lists every server authorized to send for the domain in a DNS TXT record, and receivers check incoming mail against it.",
          "DKIM (DomainKeys Identified Mail): the sending server digitally signs outgoing mail, and receivers validate it with the public key in a DKIM TXT record. Users usually don't see it.",
          "DMARC extends SPF and DKIM: the domain owner publishes (in a DNS TXT record) what receivers should do with mail that fails, such as accept, send to spam, or reject, and gets compliance reports."
        ],
        more: [
          "All three records live in the sender's DNS, which is why the notes say validation is publicly available on the sender's DNS server."
        ],
        pages: [82]
      },
      activities: [
        {
          id: "d4-email-a1", type: "match", format: "Match",
          prompt: "Match each email control to what it does.",
          choices: ["SPF", "DKIM", "DMARC", "Mail gateway"],
          items: [
            { t: "Lists which servers may send mail for the domain", a: "SPF", why: "Authorized servers in a DNS TXT record." },
            { t: "Digitally signs outgoing messages", a: "DKIM", why: "Public key published in a DKIM TXT record." },
            { t: "Tells receivers to reject mail that fails checks and sends reports", a: "DMARC", why: "Policy plus compliance reports." },
            { t: "Blocks suspicious inbound mail before users see it", a: "Mail gateway", why: "The gatekeeper." }
          ],
          hint: "List, sign, policy, gate.",
          explain: "SPF and DKIM validate; DMARC sets the policy; the gateway enforces at the door.",
          pages: [82]
        },
        {
          id: "d4-email-a2", type: "choice", format: "Scenario",
          prompt: "Your domain is being spoofed, and you want receiving servers to reject messages that fail SPF and DKIM. Which record do you publish?",
          options: [
            { t: "A DMARC policy", ok: true, why: "DMARC tells receivers to accept, send to spam, or reject failures." },
            { t: "A second SPF record", why: "SPF lists servers but doesn't set the failure policy." },
            { t: "A DKIM signature on inbound mail", why: "DKIM signs your outgoing mail; it doesn't set policy." },
            { t: "An MX record pointing to the attacker", why: "That would make things worse." }
          ],
          hint: "What should receivers do on failure?",
          explain: "DMARC builds on SPF and DKIM by adding a policy and reporting.",
          pages: [82]
        },
        {
          id: "d4-email-a3", type: "choice", format: "Compare",
          prompt: "Where are SPF, DKIM and DMARC information published?",
          options: [
            { t: "In each email's subject line", why: "No." },
            { t: "In the receiver's spam folder", why: "No." },
            { t: "As TXT records in the sending domain's DNS", ok: true, why: "All three use DNS TXT records." },
            { t: "On the end user's desktop", why: "Validation is server-side." }
          ],
          hint: "Publicly available on the sender's…",
          explain: "Email validation lives in the sender's public DNS.",
          pages: [82]
        },
        {
          id: "d4-email-a4", type: "recall", format: "Recall",
          front: "Why is email spoofing so common?",
          back: "The protocols used to transfer email include relatively few security checks, so it's very easy to fake the sender. SPF, DKIM and DMARC let receivers check.",
          pages: [82]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.5 Monitoring data
    {
      id: "d4-monitordata",
      objective: "4.5",
      section: "Monitoring Data",
      title: "Monitoring data",
      pages: [82, 83],
      lesson: {
        summary: [
          "FIM (file integrity monitoring) watches important OS and application files that should never change and flags when they do. Examples: Windows SFC (System File Checker), Linux Tripwire, and many host-based IPS products.",
          "DLP stops sensitive data (SSNs, card numbers, medical records) from leaking, and often needs solutions in several places: endpoint DLP for data in use, network DLP for data in motion, and server DLP for data at rest.",
          "USB blocking is DLP on a workstation. After the agent.btz worm spread via USB in November 2008, the U.S. Department of Defense banned removable media, with local DLP agents doing the blocking. The ban was lifted in February 2010 and replaced with strict guidelines.",
          "Cloud-based DLP sits between users and the Internet with no hardware or software: it watches all traffic, blocks custom data strings, manages URL access and transfers to cloud storage, and blocks malware.",
          "DLP and email: email is the most critical risk vector. Check inbound (block keywords, spot impostors, quarantine) and outbound (fake wire transfers, W-2s, employee information)."
        ],
        more: [
          "The notes' cautionary tale: in November 2016 a Boeing employee emailed a spreadsheet to their spouse as a template. Hidden columns held personal data (SSNs, birth dates) of 36,000 employees. Boeing sells DLP software but used it only for classified work."
        ],
        pages: [82, 83]
      },
      activities: [
        {
          id: "d4-monitordata-a1", type: "match", format: "Match",
          prompt: "Match each DLP placement to the data state it protects.",
          choices: ["Data in use", "Data in motion", "Data at rest"],
          items: [
            { t: "Endpoint DLP on a laptop", a: "Data in use", why: "On your computer." },
            { t: "Network DLP watching traffic", a: "Data in motion", why: "On your network." },
            { t: "DLP on a file server", a: "Data at rest", why: "On your server." }
          ],
          hint: "Computer, network, server.",
          explain: "DLP needs to be where the data is.",
          pages: [82]
        },
        {
          id: "d4-monitordata-a2", type: "choice", format: "Scenario",
          prompt: "You need to know immediately if a core system binary on a Linux server changes. Which tool fits?",
          options: [
            { t: "Tripwire (file integrity monitoring)", ok: true, why: "FIM flags changes to files that should never change." },
            { t: "A mail gateway", why: "That screens email." },
            { t: "USB blocking", why: "That stops removable media." },
            { t: "A forward proxy", why: "That controls web access." }
          ],
          hint: "Some files should never change.",
          explain: "FIM: SFC on Windows, Tripwire on Linux.",
          pages: [82]
        },
        {
          id: "d4-monitordata-a3", type: "choice", format: "Compare",
          prompt: "What lesson does the notes' Boeing spreadsheet incident teach?",
          options: [
            { t: "Hidden spreadsheet columns are safe to email", why: "That's exactly what leaked." },
            { t: "Having DLP software doesn't help if it isn't applied to the email that leaks", ok: true, why: "Boeing only used its DLP for classified work." },
            { t: "USB drives are the only real DLP risk", why: "This leak was by email." },
            { t: "DLP only matters for classified data", why: "Personal data of 36,000 employees leaked." }
          ],
          hint: "They sold DLP software.",
          explain: "Email is the most critical risk vector, so outbound email needs DLP.",
          pages: [83]
        },
        {
          id: "d4-monitordata-a4", type: "multi", format: "Investigate",
          prompt: "Which can cloud-based DLP do, per the notes? Select all that apply.",
          options: [
            { t: "Block custom data strings unique to your organization", ok: true, why: "Listed." },
            { t: "Prevent file transfers to cloud storage", ok: true, why: "Listed under managing URL access." },
            { t: "Block viruses and malware crossing the network", ok: true, why: "Listed." },
            { t: "Require hardware installed in every office", why: "Cloud-based DLP needs no hardware or software." }
          ],
          hint: "No hardware, no software.",
          explain: "Cloud DLP sits between users and the Internet, watching every byte.",
          pages: [83]
        },
        {
          id: "d4-monitordata-a5", type: "recall", format: "Recall",
          front: "Why did the U.S. Department of Defense ban USB storage in 2008?",
          back: "The agent.btz worm replicated using USB storage. Local DLP agents enforced the ban, which was lifted in February 2010 and replaced with strict guidelines.",
          pages: [82]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.5 Endpoint security
    {
      id: "d4-endpoint",
      objective: "4.5",
      section: "Endpoint Security",
      title: "Endpoint security",
      pages: [83, 84],
      lesson: {
        summary: [
          "The endpoint is the user's access to apps and data. Stop inbound and outbound attacks across mobile and desktop platforms with defense in depth.",
          "Edge vs. access control: edge control at the Internet link uses firewall rules that rarely change. Access control works wherever you are, based on user, group, location or application, and can be changed or revoked any time.",
          "Posture assessment: you can't trust every computer (BYOD, malware, unauthorized apps), so run a health check before it connects. Is it trusted? Running updated anti-virus? Corporate apps installed? Disk encrypted? Any OS.",
          "Health check agents: persistent agents are permanently installed and updated; dissolvable agents run during the assessment and then terminate; agentless NAC integrates with Active Directory and checks at login and logoff, but can't be scheduled.",
          "Failing the assessment puts the device in a quarantine network with just enough access to fix the issue, and notifies administrators. Then try again."
        ],
        more: [
          "EDR detects threats with behavioral analysis, machine learning and process monitoring (not just signatures) through a lightweight agent, investigates root cause, and responds automatically: isolate the system, quarantine the threat, roll back the config, all API-driven.",
          "XDR (extended detection and response) evolves EDR by adding network-based detection and correlating endpoint, network and cloud data, cutting missed detections, false positives and investigation time.",
          "User behavior analytics, common in XDR, builds a baseline of normal activity for users, hosts, traffic and data stores over an extended period, then uses rules, pattern matching and statistics to catch unusual activity in real time."
        ],
        pages: [83, 84]
      },
      activities: [
        {
          id: "d4-endpoint-a1", type: "match", format: "Match",
          prompt: "Match each posture-check method to its description.",
          choices: ["Persistent agent", "Dissolvable agent", "Agentless NAC"],
          items: [
            { t: "Permanently installed and periodically updated", a: "Persistent agent", why: "It stays on the system." },
            { t: "Runs only during the assessment, then terminates", a: "Dissolvable agent", why: "No installation required." },
            { t: "Checks during login and logoff through Active Directory, can't be scheduled", a: "Agentless NAC", why: "Integrated with AD." }
          ],
          hint: "Stays, vanishes, or never installs.",
          explain: "Each method trades detail and upkeep differently.",
          pages: [83]
        },
        {
          id: "d4-endpoint-a2", type: "choice", format: "Next action",
          prompt: "A contractor's laptop fails the posture assessment because its anti-virus is out of date. What happens next?",
          options: [
            { t: "Give it full access but log the failure", why: "It's too dangerous to allow access." },
            { t: "Put it on a quarantine network with just enough access to fix it, then reassess", ok: true, why: "That's the notes' flow." },
            { t: "Permanently ban the contractor", why: "The notes say fix it and try again." },
            { t: "Turn off the posture check for contractors", why: "That removes the control." }
          ],
          hint: "Fix it, then try again.",
          explain: "Quarantine, notify admins, remediate, reassess.",
          pages: [83]
        },
        {
          id: "d4-endpoint-a3", type: "choice", format: "Compare",
          prompt: "What does XDR add on top of EDR?",
          options: [
            { t: "It removes the endpoint agent entirely", why: "XDR still uses endpoint data." },
            { t: "It relies only on signatures", why: "EDR already moved beyond signatures." },
            { t: "It turns off automatic response", why: "Not what XDR does." },
            { t: "Network-based detection and correlation of endpoint, network and cloud data", ok: true, why: "Attacks involve more than the endpoint." }
          ],
          hint: "Extended beyond the endpoint.",
          explain: "XDR correlates across sources to improve detection and simplify investigations.",
          pages: [84]
        },
        {
          id: "d4-endpoint-a4", type: "choice", format: "Scenario",
          prompt: "An EDR agent spots a process behaving like ransomware, isolates the host, and rolls back its config with no technician involved. Which EDR stage is the isolation and rollback?",
          options: [
            { t: "Detect", why: "Detection was spotting the behavior." },
            { t: "Investigate", why: "Investigation is root cause analysis." },
            { t: "Respond", ok: true, why: "Isolate, quarantine, roll back, API-driven." },
            { t: "Posture assessment", why: "That's a pre-connection health check." }
          ],
          hint: "Detect, investigate, ...",
          explain: "EDR detects, investigates and responds, often automatically.",
          pages: [83]
        },
        {
          id: "d4-endpoint-a5", type: "recall", format: "Recall",
          front: "How does access control differ from edge control?",
          back: "Edge control is at the Internet link, managed by firewall rules that rarely change. Access control works from anywhere, inside or outside, based on user, group, location, application and more, and can be changed or revoked at any time.",
          pages: [83]
        },
        {
          id: "d4-endpoint-a6", type: "recall", format: "Recall",
          front: "What does user behavior analytics need before it can catch unusual activity?",
          back: "A baseline of normal activity for users, hosts, network traffic and data repositories, built from data analysis over an extended period. Then rules, pattern matching and statistics flag anything unusual in real time.",
          pages: [84]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.6 IAM
    {
      id: "d4-iam",
      objective: "4.6",
      section: "Identity and Access Management",
      title: "Identity and access management",
      pages: [84, 85],
      lesson: {
        summary: [
          "IAM gives the right permissions to the right people at the right time, for apps and data that live anywhere and users who may be employees, vendors, contractors or customers. It covers identity lifecycle management (every human and non-human entity gets a digital identity), access control, authentication and authorization, and identity governance (tracking access, sometimes required by regulation).",
          "Provisioning/de-provisioning creates and removes accounts on events like hiring, transfers, promotions and job separation. It's an initial checkpoint: nobody gets Administrator access.",
          "Permission assignments: just enough to do the job, commonly by group. Storage can be private to each user, and user accounts get no privileged OS access.",
          "Identity proofing confirms who someone is: resolution (who the system thinks you are), validation (password, security questions) and verification/attestation (passport, in-person meeting, or automated).",
          "Single sign-on (SSO): authenticate once to reach all assigned resources, usually limited in time (for example 24 hours). The underlying infrastructure must support it."
        ],
        more: [
          "LDAP reads and writes directories over IP. It's the lightweight way to query X.500 directories (the older DAP needed the OSI stack). Used by Windows Active Directory, Apple OpenDirectory and Novell eDirectory.",
          "The X.500 Directory Information Tree is hierarchical: container objects (country, organization, organizational units) hold leaf objects (users, computers, printers, files).",
          "SAML is an open standard for authentication and authorization through a third party. It wasn't designed for mobile apps, its biggest roadblock.",
          "OAuth is an authorization framework (what resources you can access), not authentication. OpenID Connect handles the SSO authentication. Used by Twitter, Google, Facebook and LinkedIn.",
          "Federation extends access to partners, suppliers and customers (for example, log in with Facebook). The third parties must establish a trust relationship and its degree.",
          "Interoperability: how you connect depends on what's at hand, such as a VPN concentrator using an existing LDAP server, or a new OAuth app needing authentication API access. It's part of a larger IAM strategy."
        ],
        pages: [84, 85]
      },
      activities: [
        {
          id: "d4-iam-a1", type: "choice", format: "Compare",
          prompt: "Which statement about OAuth is correct?",
          options: [
            { t: "OAuth is an authentication protocol that replaces passwords", why: "The notes stress it's not an authentication protocol." },
            { t: "OAuth handles authorization between applications; OpenID Connect handles authentication", ok: true, why: "That's the split in the notes." },
            { t: "OAuth was designed by the ITU for X.500 directories", why: "That's X.500. OAuth came from Twitter, Google and others." },
            { t: "OAuth only works inside a single company", why: "It's widely used across the industry." }
          ],
          hint: "OAuth = authorization.",
          explain: "OAuth decides what an app may access. OpenID Connect proves who you are.",
          pages: [85]
        },
        {
          id: "d4-iam-a2", type: "match", format: "Match",
          prompt: "Match each identity proofing step to its example.",
          choices: ["Resolution", "Validation", "Verification/attestation"],
          items: [
            { t: "The system works out which identity record you claim", a: "Resolution", why: "Who the system thinks you are." },
            { t: "You answer security questions and give a password", a: "Validation", why: "Gathering information from the user." },
            { t: "You show a passport in person", a: "Verification/attestation", why: "Strong proof of identity." }
          ],
          hint: "Who you seem to be, what you know, what proves it.",
          explain: "Identity proofing confirms the person before IAM trusts them.",
          pages: [84]
        },
        {
          id: "d4-iam-a3", type: "choice", format: "Scenario",
          prompt: "An employee moves from finance to engineering. Which IAM process should run?",
          options: [
            { t: "Identity proofing with a passport", why: "Their identity hasn't changed." },
            { t: "Provisioning/de-provisioning for the transfer", ok: true, why: "Transfers are a trigger for account changes." },
            { t: "Federation with a partner company", why: "Unrelated to an internal move." },
            { t: "Grant Administrator access to ease the move", why: "Nobody gets Administrator access." }
          ],
          hint: "Hiring, transfers, promotions, separation.",
          explain: "Account changes follow job events so access matches the new role.",
          pages: [84]
        },
        {
          id: "d4-iam-a4", type: "match", format: "Match",
          prompt: "Match each X.500 item to its object type.",
          choices: ["Container object", "Leaf object"],
          items: [
            { t: "Organizational unit", a: "Container object", why: "Containers hold other objects." },
            { t: "Country", a: "Container object", why: "Top of the tree." },
            { t: "A user", a: "Leaf object", why: "Users are leaves." },
            { t: "A printer", a: "Leaf object", why: "Devices are leaves." }
          ],
          hint: "Branches vs. leaves.",
          explain: "The Directory Information Tree is a hierarchy of containers and leaves.",
          pages: [85]
        },
        {
          id: "d4-iam-a5", type: "choice", format: "Next action",
          prompt: "A supplier's staff need to log in to your portal with their own company credentials. What must be set up first?",
          options: [
            { t: "A trust relationship for federation", ok: true, why: "Third parties must establish trust and its degree." },
            { t: "Local accounts with shared passwords", why: "That defeats federation and accountability." },
            { t: "SELinux on their laptops", why: "Unrelated to cross-organization login." },
            { t: "A DMARC policy", why: "That's for email." }
          ],
          hint: "Authenticate and authorize between two organizations.",
          explain: "Federation needs an agreed trust relationship.",
          pages: [85]
        },
        {
          id: "d4-iam-a6", type: "recall", format: "Recall",
          front: "What was SAML's largest roadblock, and what is LDAP used for?",
          back: "SAML wasn't originally designed for mobile apps. LDAP is the protocol for querying and updating X.500 directories, such as Active Directory.",
          pages: [85]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.6 Access controls
    {
      id: "d4-accesscontrol",
      objective: "4.6",
      section: "Access Controls",
      title: "Access controls",
      pages: [86],
      lesson: {
        summary: [
          "Access control is authorization: policy definition (determining rights) and policy enforcement (making sure only those rights are used). Users get rights through access control models and business needs.",
          "Least privilege: bare-minimum rights for users and applications, and no running as administrator, which limits the scope of malicious behavior.",
          "Mandatory Access Control (MAC): the OS enforces labels (confidential, secret, top secret). The administrator decides who gets each clearance level, and users can't change it.",
          "Discretionary Access Control (DAC): the owner of an object (say, your spreadsheet) controls who has access. Used in most OSes; very flexible but weak security.",
          "Role-based access control (RBAC): access comes from your role (manager, team lead), implicitly rather than explicitly. In Windows, Groups provide RBAC.",
          "Rule-based access control: system-enforced rules tied to the object's ACL, set by admins, based on conditions other than who you are (lab network only 9 AM to 5 PM, only Chrome may submit a form)."
        ],
        more: [
          "Attribute-based access control (ABAC) is a 'next generation', context-aware model that combines many parameters: resource info, IP address, time of day, desired action, relationship to the data.",
          "Time-of-day restrictions exist on almost every security device but are usually not the only control, and they're hard in 24-hour environments. Examples: training room network off midnight to 6 AM, conference room limited after 8 PM."
        ],
        pages: [86]
      },
      activities: [
        {
          id: "d4-accesscontrol-a1", type: "match", format: "Match",
          prompt: "Match each scenario to its access control model.",
          choices: ["MAC", "DAC", "RBAC", "Rule-based", "ABAC"],
          items: [
            { t: "A file labeled secret is readable only by users cleared for secret", a: "MAC", why: "Labels and clearances set by the administrator." },
            { t: "You share your own spreadsheet with two teammates", a: "DAC", why: "The owner controls access." },
            { t: "Anyone in the shipping group can use the shipping software", a: "RBAC", why: "Access comes from your role." },
            { t: "The lab network only works between 9 AM and 5 PM for everyone", a: "Rule-based", why: "A system rule on the object, not about who you are." },
            { t: "Access depends on IP, time, action and your relationship to the record together", a: "ABAC", why: "Combines many attributes with context." }
          ],
          hint: "Labels, owner, role, rule, many attributes.",
          explain: "The models differ in who decides and on what basis.",
          pages: [86]
        },
        {
          id: "d4-accesscontrol-a2", type: "choice", format: "Compare",
          prompt: "Which model is described as very flexible but with very weak security?",
          options: [
            { t: "Mandatory Access Control", why: "MAC is strict, and users can't change settings." },
            { t: "Discretionary Access Control", ok: true, why: "Owners can change access at any time." },
            { t: "Attribute-based access control", why: "ABAC is a next-generation, context-aware model." },
            { t: "Role-based access control", why: "Admins assign access by role." }
          ],
          hint: "The owner decides.",
          explain: "DAC is familiar from most OSes, flexible, and weak.",
          pages: [86]
        },
        {
          id: "d4-accesscontrol-a3", type: "choice", format: "Scenario",
          prompt: "A test automation service account has full admin rights 'just in case'. Which principle does this break?",
          options: [
            { t: "Least privilege", ok: true, why: "Applications should run with minimal privileges." },
            { t: "Time-of-day restrictions", why: "The issue is excess rights, not timing." },
            { t: "Discretionary access control", why: "That's a model, not the broken principle." },
            { t: "Federation", why: "Unrelated." }
          ],
          hint: "Bare minimum.",
          explain: "Limiting rights limits the scope of malicious behavior.",
          pages: [86]
        },
        {
          id: "d4-accesscontrol-a4", type: "recall", format: "Recall",
          front: "What's the difference between policy definition and policy enforcement in access control?",
          back: "Policy definition is determining what rights someone should have. Policy enforcement is ensuring only those authorized rights are actually exercised.",
          pages: [86]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.6 MFA
    {
      id: "d4-mfa",
      objective: "4.6",
      section: "Multifactor Authentication",
      title: "Multifactor authentication",
      pages: [87],
      lesson: {
        summary: [
          "Multifactor authentication proves who you are with different kinds of methods: something you know, something you have, something you are, somewhere you are (and other factors).",
          "Something you know: password, PIN (not usually stored on the smart card or ATM card), or a pattern only you know.",
          "Something you have: smart card (may need a PIN), USB security key with a certificate, hardware or software tokens generating pseudo-random codes, or your phone receiving an SMS code.",
          "Something you are: biometrics like fingerprint, iris or voice print, usually stored as a mathematical representation. You can't change your fingerprint, and it's not foolproof.",
          "Somewhere you are: the transaction completes only in a certain geography. IP address helps (works with IPv4, less so IPv6); mobile location services use GPS or nearby networks. Neither is a perfect identifier."
        ],
        more: [
          "Two passwords are still one factor. MFA needs different categories."
        ],
        pages: [87]
      },
      activities: [
        {
          id: "d4-mfa-a1", type: "match", format: "Match",
          prompt: "Match each authenticator to its factor.",
          choices: ["Something you know", "Something you have", "Something you are", "Somewhere you are"],
          items: [
            { t: "A swipe pattern on a lock screen", a: "Something you know", why: "Only you know the pattern." },
            { t: "A USB security key holding a certificate", a: "Something you have", why: "A physical device." },
            { t: "An iris scan", a: "Something you are", why: "Biometric." },
            { t: "A login allowed only from your country's IP range", a: "Somewhere you are", why: "Location-based." },
            { t: "A code from an authenticator app", a: "Something you have", why: "A software token on your device." }
          ],
          hint: "Memory, object, body, place.",
          explain: "MFA combines different factor categories.",
          pages: [87]
        },
        {
          id: "d4-mfa-a2", type: "choice", format: "Scenario",
          prompt: "A login asks for a password and then a security question. Is this multifactor?",
          options: [
            { t: "Yes, because there are two prompts", why: "Two prompts of the same kind are one factor." },
            { t: "No, both are something you know", ok: true, why: "MFA needs different methods." },
            { t: "Yes, because security questions are biometric", why: "They're knowledge, not biometrics." },
            { t: "No, because MFA requires exactly four factors", why: "Two different factors are enough." }
          ],
          hint: "Same category twice?",
          explain: "Count factor types, not prompts.",
          pages: [87]
        },
        {
          id: "d4-mfa-a3", type: "choice", format: "Compare",
          prompt: "What's a key drawback of biometrics compared with passwords?",
          options: [
            { t: "Your actual fingerprint image is always stored in plain text", why: "Usually a mathematical representation is stored." },
            { t: "You can't change your fingerprint if it's compromised", ok: true, why: "You can change a password, not your biometric." },
            { t: "Biometrics can't be used for authentication", why: "They're a factor: something you are." },
            { t: "Biometrics only work over IPv6", why: "That's unrelated. The IPv4 note is about location factors." }
          ],
          hint: "Can you reset it?",
          explain: "Biometrics are hard to change and not foolproof, so they're used in specific situations.",
          pages: [87]
        },
        {
          id: "d4-mfa-a4", type: "recall", format: "Recall",
          front: "Why is 'somewhere you are' not a perfect factor?",
          back: "IP addresses are imperfect (better with IPv4 than IPv6), and mobile location needs GPS or a known mobile/802.11 network. Neither is a perfect identifier of location.",
          pages: [87]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.6 Password security
    {
      id: "d4-passwords",
      objective: "4.6",
      section: "Password Security",
      title: "Password security",
      pages: [87, 88],
      lesson: {
        summary: [
          "Password complexity and length increase entropy to resist guessing and brute force: no single words or obvious passwords, mixed case and special characters, commonly at least 8 characters, and consider a phrase. Requirements grow as computers get faster.",
          "Password age is how long since it changed; expiration makes it stop working after 30, 60, 90 days or so, with history to prevent reuse. Critical systems may change every 15 days or weekly.",
          "Password managers store a different password for every account in one encrypted database, sometimes with MFA tokens. They're built into many OSes and browsers; enterprise versions add central management and recovery.",
          "Passwordless authentication (facial recognition, security keys) solves many password problems, but may be used alongside a password or other factors rather than as the primary method."
        ],
        more: [
          "Just-in-time permissions: instead of permanent admin rights, admins request access from a central clearinghouse that grants or denies by policy. A breached account never has standing elevated rights.",
          "Password vaulting: primary credentials stay in a vault that controls access. The just-in-time process creates a temporary account with ephemeral credentials used for one session, then deleted; primary passwords are never released."
        ],
        pages: [87, 88]
      },
      activities: [
        {
          id: "d4-passwords-a1", type: "choice", format: "Scenario",
          prompt: "IT admins have permanent domain admin rights, which makes their accounts prime targets. What do the notes recommend?",
          options: [
            { t: "Just-in-time permissions with ephemeral credentials from a vault", ok: true, why: "No permanent admin rights; access is time-limited." },
            { t: "Give the admins longer passwords and keep permanent rights", why: "Standing rights are still a great target." },
            { t: "Share one admin password across the team", why: "That weakens accountability." },
            { t: "Turn off logging for admin accounts", why: "That hides activity." }
          ],
          hint: "No permanent administrator rights.",
          explain: "JIT narrows the scope of a breach: a stolen account has no elevated rights.",
          pages: [88]
        },
        {
          id: "d4-passwords-a2", type: "order", format: "Order",
          prompt: "Put the just-in-time access flow in order.",
          steps: [
            { t: "The admin requests access from the central clearinghouse", why: "Requests go through one place." },
            { t: "Policy decides whether to grant or deny", why: "Based on predefined security policies." },
            { t: "A time-limited account with ephemeral credentials is created", why: "Primary passwords stay in the vault." },
            { t: "The credentials are used for one session, then deleted", why: "Accounts are temporary." }
          ],
          hint: "Ask, decide, issue, expire.",
          explain: "JIT plus vaulting means primary passwords are never released.",
          pages: [88]
        },
        {
          id: "d4-passwords-a3", type: "choice", format: "Compare",
          prompt: "What's the main reason to use a password manager?",
          options: [
            { t: "It lets you reuse one strong password everywhere", why: "The point is a different password per account." },
            { t: "It removes the need for any encryption", why: "The database is encrypted." },
            { t: "It makes different passwords for every account practical", ok: true, why: "Remembering them all would be impractical." },
            { t: "It replaces the need for password expiration in all cases", why: "The notes don't say that." }
          ],
          hint: "Different passwords, one database.",
          explain: "Password managers store unique passwords securely, and enterprise versions add recovery.",
          pages: [87]
        },
        {
          id: "d4-passwords-a4", type: "multi", format: "Investigate",
          prompt: "Which steps increase password entropy, per the notes? Select all that apply.",
          options: [
            { t: "Mixing upper and lower case with special characters", ok: true, why: "Listed." },
            { t: "Using a phrase or set of words", ok: true, why: "The notes suggest considering a phrase." },
            { t: "Avoiding single dictionary words", ok: true, why: "No single words, no obvious passwords." },
            { t: "Using your username as the password", why: "That's an obvious password." }
          ],
          hint: "One is the most obvious password of all.",
          explain: "Length and variety resist guessing and brute force.",
          pages: [87]
        },
        {
          id: "d4-passwords-a5", type: "recall", format: "Recall",
          front: "What's the difference between password age and password expiration?",
          back: "Age is how long since the password was last changed. Expiration is the point (say 30, 60 or 90 days) after which it stops working; history makes the new one unique.",
          pages: [87]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.7 Scripting and automation
    {
      id: "d4-automation",
      objective: "4.7",
      section: "Scripting and Automation",
      title: "Scripting and automation",
      pages: [88, 89],
      lesson: {
        summary: [
          "Scripting and automation solve problems while you sleep: as fast as the computer, no typing delays, no human error, and no mundane tasks for people.",
          "Benefits: save time, enforce baselines (install a missing patch automatically), standard infrastructure configurations (router configs, firewall rules), secure scaling of cloud resources, employee retention (less boring work), faster reaction time, and a 24/7 workforce multiplier.",
          "Cases for automation: user and resource provisioning (on-boarding and off-boarding), guard rails (automated validations that limit behavior and reduce errors), security group changes with constant audits, ticket creation from detected issues or emails, and escalation to the on-call tech only if a fix fails.",
          "More cases: enabling and disabling services automatically (no set and forget), continuous integration and testing, and integrations through APIs with cloud services, firewalls and OSes.",
          "Scripting considerations: complexity (many moving parts), cost to build and implement, single point of failure if the script stops, technical debt (patching around problems costs more later), and ongoing supportability (it works today, maybe not tomorrow)."
        ],
        more: [
          "QA analogy: guard rails are like pre-merge checks that block a bad change automatically, and a flaky CI pipeline is the single point of failure the notes warn about."
        ],
        pages: [88, 89]
      },
      activities: [
        {
          id: "d4-automation-a1", type: "match", format: "Match",
          prompt: "Match each automation to its use case from the notes.",
          choices: ["User provisioning", "Guard rails", "Ticket creation", "Escalation", "Continuous integration and testing"],
          items: [
            { t: "A new hire's accounts and access are created on day one", a: "User provisioning", why: "On-boarding." },
            { t: "A deploy is blocked because a validation found an open security group", a: "Guard rails", why: "Automated validations that limit behavior." },
            { t: "An email to the help desk becomes a ticket automatically", a: "Ticket creation", why: "Script email submissions into a ticket." },
            { t: "A script tries a fix, then pages the on-call tech if it fails", a: "Escalation", why: "Correct before involving a human." },
            { t: "Every commit is tested and securely deployed", a: "Continuous integration and testing", why: "Constant updates, tested." }
          ],
          hint: "Each one names the trigger and the action.",
          explain: "Automation fits wherever a task repeats and has clear rules.",
          pages: [88]
        },
        {
          id: "d4-automation-a2", type: "choice", format: "Scenario",
          prompt: "Every nightly security job depends on one script that only its author understands. Which consideration from the notes is the biggest worry?",
          options: [
            { t: "Employee retention", why: "That's a benefit of automation." },
            { t: "Single point of failure", ok: true, why: "What happens if the script stops working?" },
            { t: "Secure scaling", why: "That's a benefit." },
            { t: "Reaction time", why: "That's a benefit." }
          ],
          hint: "If it breaks, everything stops.",
          explain: "One fragile script can become a deal-breaker. Plan for supportability too.",
          pages: [89]
        },
        {
          id: "d4-automation-a3", type: "multi", format: "Investigate",
          prompt: "Which are automation benefits listed in the notes? Select all that apply.",
          options: [
            { t: "Enforcing baselines by installing a missing patch automatically", ok: true, why: "Listed." },
            { t: "Acting as a 24/7 workforce multiplier", ok: true, why: "Listed." },
            { t: "Scaling cloud resources while keeping security in step", ok: true, why: "Secure scaling." },
            { t: "Eliminating all cost and technical debt", why: "Cost and technical debt are listed as considerations." }
          ],
          hint: "One option is a consideration, not a benefit.",
          explain: "Automation saves time and errors, but it has real costs to plan for.",
          pages: [88, 89]
        },
        {
          id: "d4-automation-a4", type: "recall", format: "Recall",
          front: "What do the notes mean by technical debt in scripting?",
          back: "Patching problems may push the issue down the road, and it's going to be more expensive to fix later.",
          pages: [89]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.8 Incident response
    {
      id: "d4-ir",
      objective: "4.8",
      section: "Incident Response",
      title: "Incident response",
      pages: [89, 90],
      lesson: {
        summary: [
          "Security incidents include a user running a malicious attachment that contacts external servers, a botnet DDoS, stolen confidential data held for ransom, and a user installing peer-to-peer software that exposes internal servers.",
          "NIST SP800-61 Revision 2 (Computer Security Incident Handling Guide) defines the lifecycle: Preparation; Detection and Analysis; Containment, Eradication, and Recovery; Post-incident Activity.",
          "Preparing: communication methods and contacts, incident handling hardware and software (laptops, forensic tools, cameras), analysis resources (documentation, network diagrams, baselines, critical file hashes), clean OS and app images, and policies so everyone knows what to do.",
          "The challenge of detection: many sources with different detail, huge volume, and complex incidents. Precursors warn of future incidents (a vulnerability scanner in web logs, an exploit announcement, a direct threat). Analysis spots an attack underway (IPS sees a buffer overflow attempt, anti-virus finds malware, a host monitor sees a config change, traffic flows deviate).",
          "Isolation and containment: don't let it run its course. Sandboxes let you run and analyze malware in isolation. But isolation can backfire if malware notices lost connectivity and deletes or encrypts data."
        ],
        more: [
          "Recovery: eradicate (remove malware, disable breached accounts, fix vulnerabilities), then recover (restore backups, rebuild, replace compromised files, tighten the perimeter). Remove the bad, keep the good.",
          "Lessons learned: hold a post-incident meeting soon, with everyone affected, before memories fade. Answer: what happened exactly (timestamps)? How did the plans work? What would you change? Which indicators or precursors would you watch next time?",
          "Training for an incident: there's little on-the-job training during an event, so train the team beforehand on initial response, investigation plans and reporting. It can be expensive for large teams."
        ],
        pages: [89, 90]
      },
      activities: [
        {
          id: "d4-ir-a1", type: "order", format: "Order",
          prompt: "Put the NIST SP 800-61 incident response lifecycle in order.",
          steps: [
            { t: "Preparation", why: "Tools, contacts and policies come first." },
            { t: "Detection and Analysis", why: "Identify that an incident is happening." },
            { t: "Containment, Eradication, and Recovery", why: "Stop it, remove it, restore." },
            { t: "Post-incident Activity", why: "Lessons learned." }
          ],
          hint: "Get ready, notice, fix, learn.",
          explain: "The four phases of NIST's Computer Security Incident Handling Guide.",
          pages: [89]
        },
        {
          id: "d4-ir-a2", type: "choice", format: "Scenario",
          prompt: "Your web server logs show a vulnerability scanner probing your site, but nothing has been exploited. What is this?",
          options: [
            { t: "A precursor: a heads-up that an incident might occur", ok: true, why: "The notes list scanner activity in web logs as a heads-up." },
            { t: "Proof of a successful breach", why: "Nothing was exploited yet." },
            { t: "A false negative", why: "It was detected." },
            { t: "Post-incident activity", why: "There's been no incident yet." }
          ],
          hint: "Future, not present.",
          explain: "Precursors warn of what's coming; analysis deals with attacks underway.",
          pages: [89]
        },
        {
          id: "d4-ir-a3", type: "choice", format: "Compare",
          prompt: "Why can isolating an infected machine sometimes be risky?",
          options: [
            { t: "Isolation always spreads the malware further", why: "Not always; usually it contains it." },
            { t: "Some malware monitors connectivity and destroys or encrypts data when it's cut off", ok: true, why: "The notes warn about this." },
            { t: "Sandboxes can't run malware", why: "Running malware safely is what sandboxes are for." },
            { t: "NIST forbids isolation", why: "Containment is part of the lifecycle." }
          ],
          hint: "The malware is watching too.",
          explain: "Plan containment knowing some malware reacts to lost connectivity.",
          pages: [89]
        },
        {
          id: "d4-ir-a4", type: "match", format: "Match",
          prompt: "Sort each step into eradication or recovery.",
          choices: ["Eradicate", "Recover"],
          items: [
            { t: "Remove the malware", a: "Eradicate", why: "Remove the bad." },
            { t: "Disable breached user accounts", a: "Eradicate", why: "Remove the attacker's access." },
            { t: "Restore from backups", a: "Recover", why: "Get back to normal." },
            { t: "Replace compromised files and tighten the perimeter", a: "Recover", why: "Rebuild and harden." }
          ],
          hint: "Remove the bad, then rebuild.",
          explain: "Eradication removes the cause; recovery restores the system.",
          pages: [90]
        },
        {
          id: "d4-ir-a5", type: "multi", format: "Investigate",
          prompt: "Which belong in incident preparation, per the notes? Select all that apply.",
          options: [
            { t: "Clean OS and application images", ok: true, why: "Incident mitigation software." },
            { t: "Critical file hash values and network diagrams", ok: true, why: "Incident analysis resources." },
            { t: "Phones and contact information", ok: true, why: "Communication methods." },
            { t: "Waiting until an incident to write the policy", why: "Policies are needed before, so everyone knows what to do." }
          ],
          hint: "Have it ready before you need it.",
          explain: "Preparation means tools, references and policies in place ahead of time.",
          pages: [89]
        },
        {
          id: "d4-ir-a6", type: "recall", format: "Recall",
          front: "Why hold the post-incident meeting soon, and what questions should it answer?",
          back: "Memories fade over time. Answer: what exactly happened (with timestamps), how did the incident plans work, what would you do differently, and which indicators would you watch next time.",
          pages: [90]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.8 Incident planning
    {
      id: "d4-irplanning",
      objective: "4.8",
      section: "Incident Planning",
      title: "Incident planning",
      pages: [90],
      lesson: {
        summary: [
          "Exercising: test yourselves on a schedule (annual, semi-annual) with well-defined rules of engagement (don't touch production), a very specific scenario, limited time, and documented evaluation.",
          "Tabletop exercises: a full-scale drill is costly and slow, so get key players together and talk through a simulated disaster instead.",
          "Simulation: test with simulated events like phishing, password requests or data breaches. A phishing simulation sent to real users tests both the filter (did it get through?) and the users (who clicked, who needs training?).",
          "Root cause analysis: ask 'why' until you find the ultimate cause, draw fact-backed conclusions, and avoid tunnel vision, since there may be more than one root cause. Mistakes happen; the response is what matters.",
          "Threat hunting: find the attacker before they find you. Strategies keep changing (stronger firewalls lead to better phishing), and intelligence is reactive, so use technology to speed up reaction time."
        ],
        more: [
          "QA analogy: root cause analysis is the 'five whys' after a production bug. Fixing the symptom closes the ticket; fixing the cause stops the next one."
        ],
        pages: [90]
      },
      activities: [
        {
          id: "d4-irplanning-a1", type: "choice", format: "Scenario",
          prompt: "Leadership wants to test the disaster plan without the cost of a full drill. What fits?",
          options: [
            { t: "A tabletop exercise", ok: true, why: "Key players talk through a simulated disaster." },
            { t: "A live failover of production during business hours", why: "Exercises shouldn't touch production." },
            { t: "Threat hunting", why: "That's searching for attackers, not testing a plan." },
            { t: "A legal hold", why: "That's preserving evidence for litigation." }
          ],
          hint: "Talk it through.",
          explain: "Tabletops work out logistics through analysis instead of a costly drill.",
          pages: [90]
        },
        {
          id: "d4-irplanning-a2", type: "multi", format: "Investigate",
          prompt: "A simulated phishing email goes to all staff. What does it test? Select all that apply.",
          options: [
            { t: "Whether the email filter let it through", ok: true, why: "Test internal security." },
            { t: "Which users clicked", ok: true, why: "Test the users." },
            { t: "Who may need additional training", ok: true, why: "Clickers may need more training." },
            { t: "Whether backups restore correctly", why: "That's a recovery test, not a phishing simulation." }
          ],
          hint: "The filter and the people.",
          explain: "Phishing simulations test controls and users at once.",
          pages: [90]
        },
        {
          id: "d4-irplanning-a3", type: "choice", format: "Compare",
          prompt: "During root cause analysis, the team blames a single misconfigured rule and stops. What warning from the notes applies?",
          options: [
            { t: "Root cause analysis should be skipped for small incidents", why: "Not in the notes." },
            { t: "Don't get tunnel vision; there can be more than one root cause", ok: true, why: "Keep asking why." },
            { t: "Only intelligence data can find a root cause", why: "Not what the notes say." },
            { t: "Root causes are never backed by facts", why: "Conclusions should be backed by facts." }
          ],
          hint: "More than one.",
          explain: "Ask 'why' repeatedly and keep conclusions fact-based.",
          pages: [90]
        },
        {
          id: "d4-irplanning-a4", type: "recall", format: "Recall",
          front: "Why do the notes say threat hunting is needed when you already have threat intelligence?",
          back: "Intelligence data is reactive: you can't see the attack until it happens. Threat hunting tries to find attackers before they find you, using technology to speed up reaction time.",
          pages: [90]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.8 Digital forensics
    {
      id: "d4-forensics",
      objective: "4.8",
      section: "Digital Forensics",
      title: "Digital forensics",
      pages: [91],
      lesson: {
        summary: [
          "Digital forensics collects and protects information about an intrusion. RFC 3227 (Guidelines for Evidence Collection and Archiving) gives best practices. The standard process is acquisition, analysis and reporting. Be detail-oriented and take extensive notes.",
          "Legal hold: initiated by legal counsel to preserve information for impending litigation. Custodians get a hold notification; ESI goes to a separate repository; the obligation to preserve is ongoing.",
          "Chain of custody: control evidence and keep its integrity. Record everyone who touches it, use hashes and digital signatures, and label, catalog, seal and store everything.",
          "Acquisition: get disk, RAM, firmware and OS files, plus data on other systems (servers, network data, firewall logs). Snapshot VMs. Look for artifacts: logs, recycle bins, bookmarks, saved logins.",
          "Reporting: a summary, a step-by-step explanation of acquisition, the findings (analysis) and a professional conclusion, for internal use or legal proceedings."
        ],
        more: [
          "Preservation: isolate and protect data so it can be analyzed later without alteration. Work from copies. Live collection matters because data may be encrypted or lost after power-down. Follow best practices so evidence is admissible in court.",
          "E-discovery collects, prepares, reviews, interprets and produces electronic documents for the legal process. It generally doesn't involve analysis or consider intent. It works with forensics: e-discovery finds a drive with less data than expected; forensics finds it was deleted and tries to recover it."
        ],
        pages: [91]
      },
      activities: [
        {
          id: "d4-forensics-a1", type: "choice", format: "Scenario",
          prompt: "A laptop with suspected malware is still running, and its disk is encrypted. Why might investigators collect data before powering it off?",
          options: [
            { t: "Data may be encrypted or difficult to collect after powering down", ok: true, why: "That's why live collection is an important skill." },
            { t: "Powering off is always illegal", why: "Not the reason." },
            { t: "RAM contents are written to disk at shutdown", why: "Memory contents are lost, not saved." },
            { t: "Chain of custody only starts after shutdown", why: "Chain of custody covers all handling." }
          ],
          hint: "What's lost at power-off?",
          explain: "Live collection captures what disappears or locks when the system is off.",
          pages: [91]
        },
        {
          id: "d4-forensics-a2", type: "match", format: "Match",
          prompt: "Match each forensic concept to its description.",
          choices: ["Legal hold", "Chain of custody", "Acquisition", "E-discovery"],
          items: [
            { t: "Legal counsel tells custodians to preserve data for litigation", a: "Legal hold", why: "A hold notification starts ongoing preservation." },
            { t: "Every person who handles evidence is recorded, and hashes prove it's unchanged", a: "Chain of custody", why: "Controls evidence and integrity." },
            { t: "Collecting RAM, disk, firmware and VM snapshots", a: "Acquisition", why: "Obtaining the data." },
            { t: "Producing electronic documents for the legal process without analyzing intent", a: "E-discovery", why: "Gathers data, generally without analysis." }
          ],
          hint: "Preserve, track, collect, produce.",
          explain: "Each concept protects a different part of the evidence's life.",
          pages: [91]
        },
        {
          id: "d4-forensics-a3", type: "order", format: "Order",
          prompt: "Put the standard digital forensic process in order.",
          steps: [
            { t: "Acquisition", why: "Obtain the data first." },
            { t: "Analysis", why: "Then examine it." },
            { t: "Reporting", why: "Finally document findings and conclusions." }
          ],
          hint: "Collect, examine, document.",
          explain: "Acquisition, analysis and reporting, with extensive notes throughout.",
          pages: [91]
        },
        {
          id: "d4-forensics-a4", type: "choice", format: "Compare",
          prompt: "Why do forensic analysts work from copies of evidence?",
          options: [
            { t: "So the original can be analyzed later without any alterations", ok: true, why: "Preservation protects the original." },
            { t: "Because copies are always faster to read", why: "Speed isn't the reason given." },
            { t: "Because originals can't be hashed", why: "Originals can be hashed." },
            { t: "To skip the chain of custody", why: "Copies don't remove that requirement." }
          ],
          hint: "Admissible in court.",
          explain: "Preservation keeps evidence unaltered, which affects admissibility.",
          pages: [91]
        },
        {
          id: "d4-forensics-a5", type: "recall", format: "Recall",
          front: "Name four sections of a forensic report.",
          back: "Summary information (overview of the event), a detailed step-by-step explanation of data acquisition, the findings (analysis of the data), and a professional conclusion.",
          pages: [91]
        }
      ]
    },

    // ------------------------------------------------------------------ 4.9 Log data
    {
      id: "d4-logs",
      objective: "4.9",
      section: "Log Data",
      title: "Log data",
      pages: [92, 93],
      lesson: {
        summary: [
          "Security log files document blocked and allowed flows, exploit attempts, blocked URL categories and DNS sinkhole traffic, giving attack summaries to correlate with other logs.",
          "Firewall logs show source and destination IP, ports and disposition; NGFWs also log the application, URL categories and anomalies. IPS/IDS logs record known vulnerabilities and events with timestamp, attack type, and source and destination IP and port.",
          "Application logs vary by app: Windows Event Viewer (Application Log), Linux/macOS /var/log. Endpoint logs cover logons, policy changes, processes and account management. OS-specific security logs show brute force, file changes and authentication details. Parse and filter, then send to the SIEM.",
          "Network logs come from switches, routers, access points and VPN concentrators: routing updates, authentication issues and security issues.",
          "Metadata describes other data: email headers and sending servers, phone type and GPS location, web OS, browser and IP, and file details like name, address, phone number and title."
        ],
        more: [
          "Vulnerability scan logs show missing controls (no firewall, anti-virus or anti-spyware), misconfigurations (open shares, guest access) and real vulnerabilities, especially newer ones.",
          "Automated reports: most SIEMs generate them (third-party generators can also read the database). They can take huge storage and processing, and someone still has to read them.",
          "Dashboards give real-time summaries on one customizable screen, showing the most important data, but they aren't designed for long-term analysis.",
          "Packet captures gather packets on the network or in the air to solve complex issues: identify unknown traffic, verify filtering and security controls, and view a plain-language description of application data."
        ],
        pages: [92, 93]
      },
      activities: [
        {
          id: "d4-logs-a1", type: "match", format: "Match",
          prompt: "Match each piece of information to the log or data source that would hold it.",
          choices: ["Firewall log", "IPS/IDS log", "Endpoint log", "Network log", "Metadata"],
          items: [
            { t: "Source IP, destination port and allow/deny disposition", a: "Firewall log", why: "Traffic flows through the firewall." },
            { t: "Timestamp and class of a known attack", a: "IPS/IDS log", why: "Predefined vulnerabilities with common data points." },
            { t: "A policy change and a new process on a laptop", a: "Endpoint log", why: "Endpoint events." },
            { t: "A routing update on a core router", a: "Network log", why: "Infrastructure changes." },
            { t: "The sending servers listed in an email header", a: "Metadata", why: "Data describing other data." }
          ],
          hint: "Where would that event be recorded?",
          explain: "Each log type answers different questions, and the SIEM correlates them.",
          pages: [92]
        },
        {
          id: "d4-logs-a2", type: "choice", format: "Scenario",
          prompt: "An unknown application is generating odd traffic, and the logs don't explain it. Which tool shows the details?",
          options: [
            { t: "A dashboard", why: "Dashboards show summaries." },
            { t: "A packet capture", ok: true, why: "It identifies unknown traffic and shows application data." },
            { t: "An automated monthly report", why: "Too high-level and too slow." },
            { t: "A legal hold", why: "That preserves evidence for litigation." }
          ],
          hint: "Get into the details.",
          explain: "Packet captures solve complex application issues.",
          pages: [93]
        },
        {
          id: "d4-logs-a3", type: "choice", format: "Compare",
          prompt: "What are dashboards not designed for, according to the notes?",
          options: [
            { t: "Real-time status", why: "That's what they're for." },
            { t: "Showing the most important data on one screen", why: "That's what they're for." },
            { t: "Customization", why: "Most allow adding and removing information." },
            { t: "Long-term analysis", ok: true, why: "Use reports and archives for that." }
          ],
          hint: "Now vs. over time.",
          explain: "Dashboards are for at-a-glance real-time status.",
          pages: [93]
        },
        {
          id: "d4-logs-a4", type: "choice", format: "Next action",
          prompt: "Forwarding every OS event to the SIEM is flooding it. What do the notes suggest?",
          options: [
            { t: "Stop collecting OS logs entirely", why: "They help find problems like brute force before they happen." },
            { t: "Filter, and don't forward everything", ok: true, why: "OS logs may require filtering." },
            { t: "Only read logs after a breach", why: "That loses early detection." },
            { t: "Replace the SIEM with dashboards", why: "Dashboards depend on that data." }
          ],
          hint: "Parse and filter.",
          explain: "Filter out unneeded information before or in the SIEM.",
          pages: [92]
        },
        {
          id: "d4-logs-a5", type: "recall", format: "Recall",
          front: "Where are application logs found on Windows and on Linux/macOS?",
          back: "Windows: Event Viewer, Application Log. Linux and macOS: /var/log. Parse the details on the SIEM and filter out what isn't needed.",
          pages: [92]
        }
      ]
    }
  ]
});
