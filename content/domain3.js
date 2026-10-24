/*
 * Domain 3.0 - Security Architecture
 * Source: Professor Messer SY0-701 Course Notes v1.07, PDF pages 51-67 (printed pages 42-58).
 * All lessons and questions are original wording. "pages" are PDF page numbers
 * (printed page = PDF page - 9).
 *
 * Activity types: choice | multi | match | order | recall  (see content/README.md)
 */
window.SECPLUS = window.SECPLUS || {};
(window.SECPLUS.content = window.SECPLUS.content || []).push({
  domain: "d3",
  topics: [
    // ------------------------------------------------------------------ 3.1 Cloud
    {
      id: "d3-cloud",
      objective: "3.1",
      section: "Cloud Infrastructures",
      title: "Cloud infrastructures",
      pages: [51, 52],
      lesson: {
        summary: [
          "Cloud responsibility matrix: for IaaS, PaaS and SaaS, providers publish who secures what. The split can vary by provider and contract, so check it up front.",
          "Hybrid considerations: mixing public and private clouds adds complexity. Watch for network protection mismatches (authentication across platforms, firewall configs, server settings), different security monitoring with cloud-specific logs, and data leakage across the public Internet.",
          "Third-party vendors in the cloud: you, the provider and other vendors all share the infrastructure. Do ongoing vendor risk assessments, include them in incident response, and monitor constantly.",
          "Infrastructure as code (IaC) defines servers, networks and apps as versioned code, so you can build the same perfect environment every time."
        ],
        more: [
          "In the notes' responsibility matrix, information and data, devices, and accounts and identities stay customer-managed even in SaaS. With IaaS the customer also manages applications, network controls and operating systems. The provider always manages physical hosts, network and datacenter, except on-prem, where you manage everything.",
          "Serverless architecture (Function as a Service, FaaS): the app is split into autonomous functions that run in stateless, often event-triggered and ephemeral containers. A third party manages the OS, so OS security concerns sit with them, but developers still write the server-side logic.",
          "Microservices and APIs: a monolithic application does everything in one large codebase, which makes change control hard. Microservices are joined by APIs (the 'glue'), so you can scale just the services you need, contain outages, and get containment for security and compliance built in.",
          "QA analogy: IaC is like a test fixture for whole environments. Run it again and you get an identical stack, which fixes 'works on staging, breaks on prod' drift."
        ],
        pages: [51, 52]
      },
      activities: [
        {
          id: "d3-cloud-a1", type: "match", format: "Match",
          prompt: "Based on the notes' responsibility matrix, who manages each layer in a SaaS deployment?",
          choices: ["Customer", "Provider", "Shared"],
          items: [
            { t: "Information and data", a: "Customer", why: "Your data is always yours to protect, even in SaaS." },
            { t: "Accounts and identities", a: "Customer", why: "You still manage who has accounts." },
            { t: "Identity and directory infrastructure", a: "Shared", why: "The matrix shows this split between provider and customer for SaaS." },
            { t: "Operating systems", a: "Provider", why: "In SaaS the provider runs the whole stack below the app." },
            { t: "Physical datacenter", a: "Provider", why: "Only on-prem puts the datacenter on you." }
          ],
          hint: "In SaaS you rent the finished app. What's still yours?",
          explain: "Even with SaaS, data, devices and accounts stay with the customer.",
          pages: [52]
        },
        {
          id: "d3-cloud-a2", type: "choice", format: "Scenario",
          prompt: "Your team rebuilds the staging environment by hand each sprint, and it never quite matches production. Which approach fixes this most directly?",
          options: [
            { t: "Infrastructure as code", ok: true, why: "Defining the environment as versioned code builds it the same way every time." },
            { t: "A monolithic application", why: "That's an app architecture and doesn't help rebuild environments consistently." },
            { t: "A hybrid cloud with a second provider", why: "Adding another cloud adds complexity without fixing drift." },
            { t: "More detailed manual runbooks for each rebuild", why: "Manual steps still drift. The notes' point is building from code." }
          ],
          hint: "Build it the same way every time based on…?",
          explain: "IaC lets you version infrastructure the way you version application code.",
          pages: [52]
        },
        {
          id: "d3-cloud-a3", type: "multi", format: "Investigate",
          prompt: "You're reviewing a move to a hybrid cloud. Which concerns do the notes call out? Select all that apply.",
          options: [
            { t: "Authentication that doesn't line up across platforms", ok: true, why: "This is a network protection mismatch." },
            { t: "Logs that are diverse and cloud-specific", ok: true, why: "Security monitoring differs per cloud." },
            { t: "Data leaking as it crosses the public Internet", ok: true, why: "Data shared between clouds travels over the Internet." },
            { t: "Hybrid clouds remove the need for firewalls", why: "The opposite: firewall configs become another mismatch risk." }
          ],
          hint: "One option is too good to be true.",
          explain: "Hybrid adds complexity: mismatched protections, different monitoring and data leakage.",
          pages: [51]
        },
        {
          id: "d3-cloud-a4", type: "choice", format: "Compare",
          prompt: "A payment feature is built as small autonomous functions that only run when an event fires, and the provider manages the OS. What is this?",
          options: [
            { t: "Serverless (Function as a Service)", ok: true, why: "Stateless, event-triggered, ephemeral functions with the OS managed by a third party." },
            { t: "A monolithic application on one VM", why: "A monolith is one big app that does everything." },
            { t: "Infrastructure as code", why: "IaC describes infrastructure. It isn't a runtime model." },
            { t: "On-premises virtualization", why: "With your own VMs, you'd manage the OS." }
          ],
          hint: "No OS for you to manage, and it runs per event.",
          explain: "FaaS removes the OS from your responsibilities, but you still own the code.",
          pages: [52]
        },
        {
          id: "d3-cloud-a5", type: "recall", format: "Recall",
          front: "Name three benefits of microservices plus APIs over a monolithic application.",
          back: "Scalable (scale only the services you need), resilient (outages are contained), and security and compliance containment built in. APIs are the glue that makes the services act as one application.",
          pages: [52]
        },
        {
          id: "d3-cloud-a6", type: "choice", format: "Next action",
          prompt: "A third-party monitoring appliance now runs inside your cloud tenant. According to the notes, what should happen next?",
          options: [
            { t: "Add it to ongoing vendor risk assessments and incident response", ok: true, why: "Third parties are part of vendor risk management and the IR process." },
            { t: "Trust it fully, since the cloud provider vetted it", why: "Vendor risk assessments are ongoing and owned by you." },
            { t: "Turn off monitoring of that vendor to save cost", why: "The notes stress constant monitoring for changes and unusual activity." },
            { t: "Move all of its data on-premises immediately", why: "That isn't the guidance. Assess and monitor the vendor." }
          ],
          hint: "Everyone is part of the process.",
          explain: "Treat cloud vendors as part of your risk and incident response program.",
          pages: [52]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.1 Network infrastructure
    {
      id: "d3-netinfra",
      objective: "3.1",
      section: "Network Infrastructure Concepts",
      title: "Network infrastructure concepts",
      pages: [53],
      lesson: {
        summary: [
          "Physical isolation (an air gap): devices are physically separate and can't talk unless you connect them directly or through another switch or router. Example: customer A on one switch, customer B on another.",
          "Physical segmentation means separate devices and separate infrastructure, such as web servers in one rack and databases in another.",
          "Logical segmentation with VLANs separates networks in software on shared hardware. Traffic between VLANs needs a Layer 3 device (a router).",
          "SDN (software defined networking) splits a device's functions into planes: the infrastructure layer or data plane (forwarding, trunking, encryption, NAT), the control layer or control plane (routing and session tables, dynamic routing updates) and the application layer or management plane (configure through SSH, a browser or an API)."
        ],
        more: [
          "SDN is described as 'perfectly built for the cloud' because the functions are logical units you can extend and manage centrally.",
          "QA analogy: separate VLANs for test and prod mean a test runner can't reach a prod database unless a router rule explicitly allows it."
        ],
        pages: [53]
      },
      activities: [
        {
          id: "d3-netinfra-a1", type: "match", format: "Match",
          prompt: "Match each SDN function to its plane.",
          choices: ["Data plane (infrastructure layer)", "Control plane (control layer)", "Management plane (application layer)"],
          items: [
            { t: "Forwarding, trunking, encrypting and NAT on frames and packets", a: "Data plane (infrastructure layer)", why: "This is the actual traffic processing." },
            { t: "Routing tables, session tables and dynamic routing updates", a: "Control plane (control layer)", why: "The control plane manages the data plane." },
            { t: "An admin configuring the device through SSH or an API", a: "Management plane (application layer)", why: "Configuration and management happen here." }
          ],
          hint: "Move packets, decide how to move them, configure the box.",
          explain: "SDN separates these functions so they can be managed and extended independently.",
          pages: [53]
        },
        {
          id: "d3-netinfra-a2", type: "choice", format: "Scenario",
          prompt: "Two VLANs share a switch, and hosts in VLAN 10 can't reach VLAN 20. What's needed for them to talk?",
          options: [
            { t: "A Layer 3 device such as a router", ok: true, why: "VLANs are logically separated and need routing between them." },
            { t: "A longer patch cable between the ports", why: "Cabling doesn't cross a logical VLAN boundary." },
            { t: "An air gap between the two VLANs", why: "An air gap removes connectivity entirely." },
            { t: "Nothing, since VLANs on one switch always talk", why: "The point of VLANs is that they don't by default." }
          ],
          hint: "Logical separation, Layer 3 bridge.",
          explain: "Communication between VLANs requires a router or other Layer 3 device.",
          pages: [53]
        },
        {
          id: "d3-netinfra-a3", type: "choice", format: "Compare",
          prompt: "A hosting company puts customer A's servers on one switch and customer B's on a completely separate switch with no connection. What is this?",
          options: [
            { t: "Physical isolation (air gap)", ok: true, why: "The devices are physically separate with no path between them." },
            { t: "Logical segmentation with VLANs", why: "VLANs share hardware and separate logically." },
            { t: "Software defined networking", why: "SDN is about splitting device functions into planes." },
            { t: "A single shared VLAN with ACLs", why: "That's shared infrastructure, not isolation." }
          ],
          hint: "No shared hardware, no link.",
          explain: "Physical isolation gives no opportunity for data to mix.",
          pages: [53]
        },
        {
          id: "d3-netinfra-a4", type: "recall", format: "Recall",
          front: "What's the difference between physical segmentation and logical segmentation?",
          back: "Physical segmentation uses separate devices and infrastructure. Logical segmentation (VLANs) separates networks in configuration on shared hardware, with a router needed between segments.",
          pages: [53]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.1 Other infrastructure
    {
      id: "d3-otherinfra",
      objective: "3.1",
      section: "Other Infrastructure Concepts",
      title: "Other infrastructure concepts",
      pages: [53, 54],
      lesson: {
        summary: [
          "Attacks can happen anywhere. Cloud security is centralized and cheaper, while on-premises security gives full control and a local team but costs more and is slower to change. Attackers don't care where your data is.",
          "Centralized vs. decentralized: most organizations are decentralized, so central security management gives correlated alerts, consolidated log analysis and full status and patching views. The trade-off is a single point of failure and possible performance issues.",
          "Virtualization runs many full operating systems on the same hardware, which adds overhead. Application containerization packages code and dependencies into a standard, isolated unit that shares the host kernel and is lightweight and portable.",
          "Specialized systems: IoT devices (sensors, smart devices, wearables, facility automation) often have weak defaults. Embedded systems are built for one function. SCADA/ICS runs industrial equipment and needs extensive segmentation. An RTOS has a deterministic schedule and is very sensitive to security issues."
        ],
        more: [
          "Embedded examples: traffic light controllers, digital watches, medical imaging systems.",
          "SCADA (Supervisory Control and Data Acquisition) is large-scale, multi-site industrial control for power, refining, manufacturing and logistics. It should allow no access from the outside.",
          "RTOS examples: industrial equipment, cars, military. They need to always be available, and it's hard to tell what security they have.",
          "High availability (HA) means always on, always available, often with active/active components. Higher availability almost always means higher cost. The notes repeat this exact section in 3.4 Resiliency.",
          "QA analogy: Docker test containers spin up in seconds because they share the host kernel. A full VM per test environment carries a whole guest OS."
        ],
        pages: [53, 54]
      },
      activities: [
        {
          id: "d3-otherinfra-a1", type: "choice", format: "Compare",
          prompt: "What's the key architectural difference between virtualized and containerized applications?",
          options: [
            { t: "Containers share the host kernel; VMs each carry a guest OS", ok: true, why: "That's why containers are lightweight and VMs add overhead." },
            { t: "Containers each need their own guest operating system", why: "Reversed. VMs have guest OSes, containers don't." },
            { t: "VMs can't isolate apps from each other", why: "VMs isolate strongly. The difference is overhead and the OS layer." },
            { t: "Containers only run on physical hardware", why: "Containers run on a host OS, physical or virtual." }
          ],
          hint: "Look at what's under each app in the notes' diagram.",
          explain: "VMs sit on a hypervisor with full guest OSes. Containers run on a container engine using the host kernel.",
          pages: [53, 54]
        },
        {
          id: "d3-otherinfra-a2", type: "match", format: "Match",
          prompt: "Match each system to its description.",
          choices: ["IoT", "Embedded system", "SCADA / ICS", "RTOS"],
          items: [
            { t: "Smart thermostat and video doorbell with weak default passwords", a: "IoT", why: "Consumer and facility smart devices, often with weak defaults." },
            { t: "A traffic light controller built only for that job", a: "Embedded system", why: "Hardware and software designed for one function." },
            { t: "Multi-site control of a power plant and refinery", a: "SCADA / ICS", why: "Large-scale industrial control that needs heavy segmentation." },
            { t: "An OS in a car's braking system with a deterministic schedule", a: "RTOS", why: "There's no time to wait for other processes." }
          ],
          hint: "Smart gadget, single-purpose, industrial, deterministic timing.",
          explain: "All four are hard to secure and often can't be patched easily.",
          pages: [53, 54]
        },
        {
          id: "d3-otherinfra-a3", type: "choice", format: "Next action",
          prompt: "A manufacturing company's SCADA network is reachable from the corporate office network. What does the notes' guidance call for?",
          options: [
            { t: "Extensive segmentation with no outside access", ok: true, why: "SCADA/ICS requires extensive segmentation." },
            { t: "Expose it to the Internet for remote vendors", why: "That increases exposure. The notes say no access from the outside." },
            { t: "Move it to a public cloud SaaS", why: "That's not the guidance for industrial control." },
            { t: "Leave it as is, since SCADA is self-protecting", why: "Industrial systems are a high-value, sensitive target." }
          ],
          hint: "What do industrial controls need around them?",
          explain: "Segment SCADA/ICS heavily and block outside access.",
          pages: [54]
        },
        {
          id: "d3-otherinfra-a4", type: "multi", format: "Investigate",
          prompt: "Your org is moving security monitoring to one central console. Which items do the notes list as trade-offs or benefits of centralizing? Select all that apply.",
          options: [
            { t: "Correlated alerts", ok: true, why: "Correct, a benefit: with everything in one console, related alerts from different systems can be linked together." },
            { t: "Consolidated log file analysis", ok: true, why: "Correct, a benefit: all logs are analyzed in one place instead of on every system separately." },
            { t: "A possible single point of failure", ok: true, why: "The notes say 'it's not perfect' for this reason." },
            { t: "Guaranteed lower latency for every site", why: "The notes warn of potential performance issues, not guaranteed speed." }
          ],
          hint: "Three are from the notes, and one is an overpromise.",
          explain: "Centralizing helps visibility but adds a single point of failure and possible performance costs.",
          pages: [53]
        },
        {
          id: "d3-otherinfra-a5", type: "recall", format: "Recall",
          front: "On-premises security: give one advantage and one drawback from the notes.",
          back: "Advantages: full control, a customized posture, a local team that can maintain uptime, and no support calls needed. Drawbacks: a local team is expensive and hard to staff, security changes take time and money, and the client carries the data center burden.",
          pages: [53]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.1 Infrastructure considerations
    {
      id: "d3-infracons",
      objective: "3.1",
      section: "Infrastructure Considerations",
      title: "Infrastructure considerations",
      pages: [54, 55],
      lesson: {
        summary: [
          "Availability (uptime, but only for the right people) and resilience (how fast you recover, measured as MTTR, mean time to repair) are core design factors.",
          "Cost covers installation, ongoing maintenance, replacement or repair, and tax implications (operating vs. capital expense). Responsiveness is how fast requests are answered, and the weakest link sets the speed.",
          "Scalability (elasticity) is how easily capacity grows and shrinks. Security monitoring must scale with it. Ease of deployment and ease of recovery (reload from a corporate image in about 10 minutes vs. about 1 hour from original media) matter from the design phase.",
          "Risk transference shifts risk to a third party, for example cybersecurity insurance. Watch patch availability and the inability to patch (embedded systems like HVAC or time clocks), which may need extra controls. Also plan power (UPS, generators) and compute (single CPU vs. multi-cloud)."
        ],
        more: [
          "Resilience depends on the root cause, replacement hardware, patch availability and redundant systems.",
          "Insurance can cover attacks and downtime, recover internal losses and limit legal costs from customers. It became popular with the rise of ransomware.",
          "Patching is often the first task after installation. Some vendors patch on a schedule (Microsoft's monthly cycle), and some rarely patch, which is a concern.",
          "The notes' fix for an unpatchable time clock: put a firewall in front of it.",
          "QA analogy: responsiveness is your p95 latency budget, and ease of recovery is how fast you can redeploy from a known-good image."
        ],
        pages: [54, 55]
      },
      activities: [
        {
          id: "d3-infracons-a1", type: "match", format: "Match",
          prompt: "Match each concern to the consideration it belongs to.",
          choices: ["Resilience", "Scalability", "Risk transference", "Inability to patch", "Ease of recovery"],
          items: [
            { t: "How quickly can we repair after a failure (MTTR)?", a: "Resilience", why: "Resilience is about recovering and how fast." },
            { t: "Capacity must grow and shrink many times a day", a: "Scalability", why: "Scaling up and down quickly, many times a day, is elasticity, which is part of scalability." },
            { t: "Buy cybersecurity insurance to cover ransomware downtime", a: "Risk transference", why: "This moves the risk to a third party." },
            { t: "The HVAC controller has no update mechanism", a: "Inability to patch", why: "Embedded systems often can't be updated by users." },
            { t: "Reimage from the corporate image in 10 minutes", a: "Ease of recovery", why: "The notes compare a 1-hour media reload to a 10-minute image." }
          ],
          hint: "Each item has a keyword: repair, grow, insure, can't update, reimage.",
          explain: "Resilience is repair speed, scalability is growing and shrinking, insurance transfers risk, some devices can't be patched, and recovery should be easy.",
          pages: [54, 55]
        },
        {
          id: "d3-infracons-a2", type: "choice", format: "Next action",
          prompt: "A badge time clock on the office network has known vulnerabilities, and the vendor offers no updates. What's the best next step?",
          options: [
            { t: "Add compensating controls like a firewall in front of it", ok: true, why: "The notes suggest extra controls, even a firewall for your time clock." },
            { t: "Wait for the vendor to release a patch", why: "The point is that patching isn't an option." },
            { t: "Ignore it, since time clocks hold no data", why: "Any networked device is part of the attack surface." },
            { t: "Turn on its auto-update setting", why: "It isn't designed for end-user updates." }
          ],
          hint: "No patch exists, so what surrounds the device?",
          explain: "When you can't patch, add security controls around the device.",
          pages: [55]
        },
        {
          id: "d3-infracons-a3", type: "choice", format: "Compare",
          prompt: "What does MTTR stand for, and which consideration is it tied to?",
          options: [
            { t: "Mean time to repair, a resilience metric", ok: true, why: "The notes reference MTTR for resilience." },
            { t: "Maximum transfer throughput rate, a responsiveness metric", why: "That's invented and not the notes' term." },
            { t: "Mean time to replicate, a backup metric", why: "The R stands for repair: how long it takes on average to fix something. That's a resilience measure." },
            { t: "Managed tenant trust rating, a cloud metric", why: "Made-up term. MTTR is mean time to repair, used to measure resilience." }
          ],
          hint: "Something will eventually break. How long to fix it?",
          explain: "MTTR measures how quickly you can recover.",
          pages: [54]
        },
        {
          id: "d3-infracons-a4", type: "recall", format: "Recall",
          front: "List four cost elements the notes mention when evaluating infrastructure.",
          back: "Initial installation, ongoing (annual) maintenance, replacement or repair, and tax implications (operating vs. capital expense).",
          pages: [55]
        },
        {
          id: "d3-infracons-a5", type: "multi", format: "Investigate",
          prompt: "You're planning power and compute for a new data hall. Which statements match the notes? Select all that apply.",
          options: [
            { t: "Primary power can come from one or more providers", ok: true, why: "Correct: main power can come from one utility or several for redundancy." },
            { t: "Backup power includes a UPS and generators", ok: true, why: "Correct: a UPS covers the first minutes, and generators run longer outages." },
            { t: "Using multiple CPUs across clouds adds complexity but scales better", ok: true, why: "Correct: spreading compute across clouds scales better but is harder to manage." },
            { t: "A single processor is always the most scalable option", why: "A single processor is easier to develop for, not more scalable." }
          ],
          hint: "Watch for 'always'.",
          explain: "Power and compute are foundational design considerations.",
          pages: [55]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.2 Secure infrastructures
    {
      id: "d3-secureinfra",
      objective: "3.2",
      section: "Secure Infrastructures",
      title: "Secure infrastructures",
      pages: [56],
      lesson: {
        summary: [
          "Device placement: firewalls separate trusted from untrusted networks. Other services such as honeypots, jump servers, load balancers and sensors need their own placement.",
          "Security zones (trusted and untrusted, internal and external, or inside, Internet, servers, databases and screened) are more flexible and secure than IP ranges, and they simplify policy. Example: untrusted to screened.",
          "Attack surface is every way in: application code, open ports, authentication, human error. Minimize it by auditing code, blocking ports and monitoring traffic in real time.",
          "Connectivity matters too: secure the physical cabling, and use application-level encryption or network-level encryption (IPsec tunnels, VPNs)."
        ],
        more: [
          "The notes' zone diagram puts the directory server and RADIUS in the Inside zone, puts database, FTP and mail servers plus honeypots in a Screened zone behind its own firewall, and reaches the Internet through a perimeter firewall.",
          "QA analogy: every public API endpoint and debug port you leave on is attack surface. Removing unused routes shrinks it."
        ],
        pages: [56]
      },
      activities: [
        {
          id: "d3-secureinfra-a1", type: "multi", format: "Investigate",
          prompt: "You're asked to shrink the attack surface of a web app. Which actions do the notes list? Select all that apply.",
          options: [
            { t: "Audit the application code", ok: true, why: "Code is part of the attack surface." },
            { t: "Block unneeded ports on the firewall", ok: true, why: "Correct: every open port is a possible way in, so close the ones you don't need." },
            { t: "Monitor network traffic in real time", ok: true, why: "Listed as a way to minimize the surface." },
            { t: "Publish the admin interface publicly so it's easy to monitor", why: "That adds surface instead of reducing it." }
          ],
          hint: "How many ways are there into your home?",
          explain: "Reduce entry points and watch the ones that remain.",
          pages: [56]
        },
        {
          id: "d3-secureinfra-a2", type: "choice", format: "Compare",
          prompt: "Why do the notes prefer zone-based security policies over IP address ranges?",
          options: [
            { t: "Zones are more flexible and simplify the rules", ok: true, why: "Policies like untrusted-to-screened are easier to manage." },
            { t: "IP ranges can't be used in firewalls at all", why: "They can be used. Zones are just more flexible." },
            { t: "Zones encrypt traffic automatically", why: "Zones classify traffic and don't encrypt it." },
            { t: "Zones remove the need for a firewall", why: "Firewalls enforce zone policies." }
          ],
          hint: "Think about writing rules for many subnets.",
          explain: "Each network area maps to a zone, and rules refer to zones.",
          pages: [56]
        },
        {
          id: "d3-secureinfra-a3", type: "choice", format: "Scenario",
          prompt: "In the notes' security zone diagram, where do the public-facing mail and FTP servers sit?",
          options: [
            { t: "In a screened zone behind its own firewall", ok: true, why: "The screened zone holds servers reachable from outside." },
            { t: "In the Inside zone next to RADIUS", why: "The Inside zone holds internal devices and directory services." },
            { t: "Directly on the Internet with no firewall", why: "Every zone boundary passes through a firewall." },
            { t: "Inside the honeypot", why: "The honeypot is a separate decoy in the screened zone." }
          ],
          hint: "The 'normal traffic' and 'attacker traffic' arrows both end up in one zone.",
          explain: "Screened zones isolate externally reachable services from internal systems.",
          pages: [56]
        },
        {
          id: "d3-secureinfra-a4", type: "recall", format: "Recall",
          front: "Name two ways the notes say connectivity contributes to security.",
          back: "Secure network cabling (protect the physical drops), application-level encryption, and network-level encryption such as IPsec tunnels or VPNs.",
          pages: [56]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.2 Intrusion prevention
    {
      id: "d3-ips",
      objective: "3.2",
      section: "Intrusion Prevention",
      title: "Intrusion prevention",
      pages: [57],
      lesson: {
        summary: [
          "Failure modes: fail-open means traffic keeps flowing when the device fails. Fail-closed means traffic stops.",
          "Device connections: active monitoring is inline and can block in real time, which is common for an IPS. Passive monitoring looks at a copy of traffic from a tap or port monitor and can't block, which is common for an IDS.",
          "An Intrusion Prevention System (IPS) watches for exploits against OSes and apps, such as buffer overflows and XSS. An IDS alarms or alerts. An IPS stops the traffic before it gets into the network."
        ],
        more: [
          "The notes' diagrams: inline, traffic from the Internet passes through the IPS on its way to the core switch, so it can be allowed or denied in real time. Passive, the switch sends a copy of client-server traffic to the IDS/IPS.",
          "QA analogy: fail-open vs. fail-closed is like a feature flag service going down. Does the app default to 'feature on' or 'feature off'?"
        ],
        pages: [57]
      },
      activities: [
        {
          id: "d3-ips-a1", type: "choice", format: "Scenario",
          prompt: "The inline IPS crashes and all Internet traffic stops reaching the servers. Which failure mode is configured?",
          options: [
            { t: "Fail-closed", ok: true, why: "When the device fails, data does not flow." },
            { t: "Fail-open", why: "Fail-open would keep traffic flowing without inspection." },
            { t: "Passive monitoring", why: "That's a connection type, and a passive sensor failing wouldn't stop traffic." },
            { t: "Active/passive load balancing", why: "That's a load balancer design, not an IPS failure mode." }
          ],
          hint: "Did the data keep flowing?",
          explain: "Fail-closed favors security, and fail-open favors availability.",
          pages: [57]
        },
        {
          id: "d3-ips-a2", type: "choice", format: "Compare",
          prompt: "A sensor receives a copy of traffic from a switch port monitor. What can it do?",
          options: [
            { t: "Detect and alert, but not block in real time", ok: true, why: "Passive monitoring sees copies, so it can't stop the original packets." },
            { t: "Block each malicious packet inline", why: "Blocking requires being inline (active monitoring)." },
            { t: "Encrypt the traffic for the servers", why: "Monitors don't encrypt traffic." },
            { t: "Fail closed and stop all traffic", why: "A passive sensor isn't in the path, so its failure doesn't stop traffic." }
          ],
          hint: "It's looking at a copy.",
          explain: "IDS is commonly passive, and IPS is commonly active (inline).",
          pages: [57]
        },
        {
          id: "d3-ips-a3", type: "match", format: "Match",
          prompt: "Match each phrase to the term.",
          choices: ["IDS", "IPS", "Fail-open", "Fail-closed"],
          items: [
            { t: "Raises an alarm when it sees an exploit", a: "IDS", why: "Detection is an alarm or alert." },
            { t: "Stops the exploit before it enters the network", a: "IPS", why: "Prevention blocks in real time." },
            { t: "Device dies and traffic continues uninspected", a: "Fail-open", why: "Fail-open: if the device fails, traffic keeps flowing but isn't checked. Available, but less secure." },
            { t: "Device dies and nothing gets through", a: "Fail-closed", why: "Fail-closed: if the device fails, nothing gets through. Secure, but the network is down." }
          ],
          hint: "Detect vs. prevent, and flow vs. no flow.",
          explain: "An IDS only alerts; an IPS sits inline and blocks. If a device fails, fail-open lets traffic through and fail-closed stops it.",
          pages: [57]
        },
        {
          id: "d3-ips-a4", type: "recall", format: "Recall",
          front: "Give two examples of intrusions an IPS watches for, according to the notes.",
          back: "Exploits against operating systems and applications, such as buffer overflows, cross-site scripting and other vulnerabilities.",
          pages: [57]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.2 Network appliances
    {
      id: "d3-appliances",
      objective: "3.2",
      section: "Network Appliances",
      title: "Network appliances",
      pages: [57, 58, 59],
      lesson: {
        summary: [
          "Jump server: a hardened, monitored host you connect to first (SSH, tunnel or VPN) to reach a protected zone. If it's compromised, that's a significant breach.",
          "Proxies make requests on users' behalf for caching, access control, URL filtering and content scanning. They can be explicit (apps are configured to use them) or transparent (invisible). NAT is the simplest, network-level proxy. Most are application proxies (one app like HTTP, or multipurpose).",
          "Forward proxy: an internal proxy that controls users going out to the Internet. Reverse proxy: handles inbound Internet traffic to your internal service. Open proxy: a third-party, uncontrolled proxy, often used to get around security controls.",
          "Load balancers spread load across servers, invisibly to users. Active/active handles TCP and SSL offload, caching, prioritization (QoS) and content switching. Active/passive keeps standby servers that take over if an active one fails. Sensors and collectors feed logs to consoles and SIEMs."
        ],
        more: [
          "Load balancing also gives fault tolerance: server outages have no effect, with very fast convergence.",
          "Sensors include IPS, firewall, authentication, web server access, database transaction and email logs. Collectors include proprietary consoles, SIEM consoles and syslog servers, and many SIEMs correlate the diverse data.",
          "QA analogy: a reverse proxy in front of your test API (TLS termination, routing to services) is what an ingress controller does."
        ],
        pages: [57, 58, 59]
      },
      activities: [
        {
          id: "d3-appliances-a1", type: "match", format: "Match",
          prompt: "Match each proxy type to the scenario.",
          choices: ["Forward proxy", "Reverse proxy", "Open proxy"],
          items: [
            { t: "Employees' web browsing goes through a filter before reaching the Internet", a: "Forward proxy", why: "An internal proxy controlling outbound user access." },
            { t: "Internet users hit a proxy that passes requests to your internal web server", a: "Reverse proxy", why: "It handles inbound traffic to your service." },
            { t: "A free public proxy someone uses to get around the corporate URL filter", a: "Open proxy", why: "Third-party and uncontrolled, often used to circumvent controls." }
          ],
          hint: "Which direction is the traffic going, and who controls the proxy?",
          explain: "Direction (out vs. in) and control (yours vs. a stranger's) decide the type.",
          pages: [58]
        },
        {
          id: "d3-appliances-a2", type: "choice", format: "Next action",
          prompt: "Admins need SSH access to servers in a locked-down zone. What's the recommended pattern?",
          options: [
            { t: "Connect through a hardened, monitored jump server", ok: true, why: "A jump server gives controlled access into the protected zone." },
            { t: "Open SSH on every server to the Internet", why: "That widens the attack surface massively." },
            { t: "Use an open proxy to reach the zone", why: "Open proxies are uncontrolled and a security concern." },
            { t: "Disable authentication inside the zone", why: "That removes protection from a sensitive zone." }
          ],
          hint: "One tightly controlled door into the zone.",
          explain: "Jump servers centralize access. Protect them well, because a compromised one is a big breach.",
          pages: [57]
        },
        {
          id: "d3-appliances-a3", type: "choice", format: "Compare",
          prompt: "Two of four web servers handle traffic while two wait on standby until one fails. What is this?",
          options: [
            { t: "Active/passive load balancing", ok: true, why: "Standby servers take over when an active server fails." },
            { t: "Active/active load balancing", why: "With active/active, all servers share the load." },
            { t: "A reverse proxy cache", why: "Caching isn't the same as standby failover." },
            { t: "Passive monitoring", why: "That's about IDS traffic copies." }
          ],
          hint: "Some are waiting.",
          explain: "Active/passive gives failover. Active/active spreads load and adds offload features.",
          pages: [59]
        },
        {
          id: "d3-appliances-a4", type: "multi", format: "Investigate",
          prompt: "Which features do the notes list for active/active load balancers? Select all that apply.",
          options: [
            { t: "SSL offload (encryption and decryption)", ok: true, why: "Correct: the load balancer does the encryption work so the servers don't have to." },
            { t: "Caching for fast responses", ok: true, why: "Correct: it can keep common responses ready and answer them instantly." },
            { t: "Content switching (application-centric balancing)", ok: true, why: "Correct: it can send requests to different servers based on the application or content." },
            { t: "Issuing digital certificates to clients", why: "That's a CA's job, not a load balancer feature." }
          ],
          hint: "One belongs to PKI.",
          explain: "The other listed features are configurable load, TCP offload and prioritization (QoS).",
          pages: [59]
        },
        {
          id: "d3-appliances-a5", type: "choice", format: "Scenario",
          prompt: "A browser on a corporate laptop must be configured with a proxy address before it can reach the web. What kind of proxy is that?",
          options: [
            { t: "An explicit proxy", ok: true, why: "Applications need to know how to use an explicit proxy." },
            { t: "A transparent proxy", why: "Transparent proxies are invisible to the application." },
            { t: "An open proxy", why: "Open proxies are third-party and uncontrolled." },
            { t: "A network-level NAT proxy", why: "NAT works without app configuration." }
          ],
          hint: "The app has to know about it.",
          explain: "Explicit means configured in the app, and transparent means invisible.",
          pages: [57]
        },
        {
          id: "d3-appliances-a6", type: "recall", format: "Recall",
          front: "What's the difference between a sensor and a collector?",
          back: "Sensors generate data, such as IPS, firewall, authentication, web, database and email logs. Collectors gather it, such as proprietary consoles, SIEM consoles and syslog servers. SIEMs often add a correlation engine.",
          pages: [59]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.2 Port security
    {
      id: "d3-portsec",
      objective: "3.2",
      section: "Port Security",
      title: "Port security (802.1X and EAP)",
      pages: [59],
      lesson: {
        summary: [
          "Port security controls who can use a network port, wired or wireless, usually with a username, password and other factors.",
          "EAP (Extensible Authentication Protocol) is an authentication framework with many RFC-based methods. Manufacturers can build their own.",
          "IEEE 802.1X is port-based Network Access Control (NAC). You get no network access until authentication succeeds. It uses EAP and a back-end database like RADIUS, LDAP, TACACS+ or Kerberos.",
          "The three roles: the supplicant (the client), the authenticator (the switch or AP that provides access) and the authentication server (which validates the credentials)."
        ],
        more: [
          "QA analogy: in a lab with 802.1X, a new test device plugged into a wall jack gets no network until it authenticates, which is why lab devices need certificates or credentials set up first."
        ],
        pages: [59]
      },
      activities: [
        {
          id: "d3-portsec-a1", type: "match", format: "Match",
          prompt: "Match each 802.1X role.",
          choices: ["Supplicant", "Authenticator", "Authentication server"],
          items: [
            { t: "The laptop asking to join the network", a: "Supplicant", why: "The supplicant is the device asking for access, here the laptop." },
            { t: "The switch port that grants or withholds access", a: "Authenticator", why: "The authenticator provides access." },
            { t: "The RADIUS server checking the credentials", a: "Authentication server", why: "It validates the client's credentials." }
          ],
          hint: "Client, door, judge.",
          explain: "The supplicant talks to the authenticator, which checks with the authentication server.",
          pages: [59]
        },
        {
          id: "d3-portsec-a2", type: "choice", format: "Scenario",
          prompt: "A contractor plugs into a conference room jack and gets no IP address until they log in with company credentials. What's in place?",
          options: [
            { t: "IEEE 802.1X port-based NAC", ok: true, why: "No network access until authentication succeeds." },
            { t: "A reverse proxy", why: "Proxies handle requests, not port access." },
            { t: "Active/passive load balancing", why: "Load balancing spreads traffic across servers. Blocking a port until the user logs in is 802.1X." },
            { t: "A VLAN with no router", why: "VLANs segment but don't authenticate a port." }
          ],
          hint: "Port-based access control.",
          explain: "802.1X blocks the port until EAP authentication succeeds.",
          pages: [59]
        },
        {
          id: "d3-portsec-a3", type: "recall", format: "Recall",
          front: "What is EAP, and which back-end databases can 802.1X use?",
          back: "EAP is an extensible authentication framework with many methods. 802.1X can use RADIUS, LDAP, TACACS+ or Kerberos.",
          pages: [59]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.2 Firewall types
    {
      id: "d3-firewalls",
      objective: "3.2",
      section: "Firewall Types",
      title: "Firewall types",
      pages: [59, 60],
      lesson: {
        summary: [
          "The firewall is the universal security control. It controls traffic flow, inbound and outbound data, inappropriate content, and adds anti-malware protection.",
          "Network-based firewalls filter by port (OSI layer 4, traditional) or by application (layer 7, NGFW). They often sit at the network edge, act as layer 3 routers, do NAT, authenticate dynamic routing and build site-to-site VPNs.",
          "UTM (unified threat management, or all-in-one security appliance) bundles URL filtering, content and malware inspection, spam filtering, routing and switching, firewall, IDS/IPS, bandwidth shaping and a VPN endpoint.",
          "An NGFW inspects every packet at the application layer (also called an application layer gateway, stateful multilayer inspection or deep packet inspection). A WAF applies rules to HTTP/HTTPS conversations and blocks unexpected input like SQL injection. WAFs are a major focus of PCI DSS."
        ],
        more: [
          "NGFWs control flows by application (for example SQL Server, Twitter or YouTube), apply app-specific IPS signatures, and filter content by URL category.",
          "A UTM can also include a CSU/DSU for WAN connections.",
          "QA analogy: a WAF rule that rejects a request body with ' OR 1=1 -- is input validation enforced in front of your app."
        ],
        pages: [59, 60]
      },
      activities: [
        {
          id: "d3-firewalls-a1", type: "choice", format: "Scenario",
          prompt: "You need to block SQL injection attempts against a public web app without changing its code today. Which control fits best?",
          options: [
            { t: "A web application firewall", ok: true, why: "WAFs apply rules to HTTP/HTTPS and block unexpected input like SQLi." },
            { t: "A layer 4 port-based firewall", why: "It sees ports, not the SQL inside the HTTP request." },
            { t: "A forward proxy for employee browsing", why: "That controls outbound users, not inbound attacks." },
            { t: "A UPS on the web server", why: "A UPS keeps power on during outages. It can't inspect web requests for SQL injection; a WAF can." }
          ],
          hint: "The rules need to understand HTTP conversations.",
          explain: "A WAF inspects web requests and allows or denies them based on expected input.",
          pages: [60]
        },
        {
          id: "d3-firewalls-a2", type: "match", format: "Compare",
          prompt: "Match each description to the firewall type.",
          choices: ["Traditional (layer 4)", "NGFW", "WAF", "UTM"],
          items: [
            { t: "Allows TCP port 443 and blocks everything else", a: "Traditional (layer 4)", why: "A traditional firewall decides by port number (layer 4), without understanding the application." },
            { t: "Allows Microsoft SQL Server but blocks YouTube, whatever the port", a: "NGFW", why: "It identifies applications at layer 7." },
            { t: "Rejects a form post containing script tags", a: "WAF", why: "It applies rules to HTTP conversations." },
            { t: "One box with spam filter, VPN endpoint, IPS and bandwidth shaper", a: "UTM", why: "All-in-one security appliance." }
          ],
          hint: "Ports, apps, web requests, everything in one box.",
          explain: "Exam questions often hinge on port vs. application vs. HTTP awareness.",
          pages: [59, 60]
        },
        {
          id: "d3-firewalls-a3", type: "multi", format: "Investigate",
          prompt: "Which other names do the notes give for a next-generation firewall? Select all that apply.",
          options: [
            { t: "Application layer gateway", ok: true, why: "Correct: an NGFW is also called an application layer gateway, because it understands applications." },
            { t: "Stateful multilayer inspection", ok: true, why: "Correct: it's also called stateful multilayer inspection." },
            { t: "Deep packet inspection", ok: true, why: "Correct: it's also called deep packet inspection, because it looks inside packets." },
            { t: "Port-based Network Access Control", why: "Port-based NAC is 802.1X, which controls who can join the network. It isn't a firewall." }
          ],
          hint: "One option belongs to port security.",
          explain: "NGFWs analyze and categorize every packet before deciding.",
          pages: [60]
        },
        {
          id: "d3-firewalls-a4", type: "recall", format: "Recall",
          front: "Which compliance standard do the notes link to WAFs?",
          back: "PCI DSS (Payment Card Industry Data Security Standard). WAFs are a major focus of it.",
          pages: [60]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.2 Secure communication
    {
      id: "d3-securecomm",
      objective: "3.2",
      section: "Secure Communication",
      title: "Secure communication (VPN, SD-WAN, SASE)",
      pages: [60, 61],
      lesson: {
        summary: [
          "VPNs send encrypted data across a public network through an encrypted tunnel. The data gets encrypted with new headers and trailers, then decrypted on the other side. A concentrator does the encryption and decryption, often inside a firewall.",
          "SSL/TLS VPN uses tcp/443 (almost no firewall issues), needs no big client, authenticates users without certificates or shared passwords, and runs from a browser or a light client. It's usually for remote access, on demand or always-on.",
          "Site-to-site IPsec VPNs are (almost) always on, with firewalls acting as concentrators at each end.",
          "SD-WAN is a WAN built for the cloud: sites talk directly to cloud apps instead of hopping through a data center. SASE (Secure Access Service Edge) is a 'next generation VPN' that puts security services in the cloud near cloud apps, with SASE clients on all devices."
        ],
        more: [
          "Selection of effective controls: SSL/TLS VPN for user access, IPsec for site-to-site, SD-WAN to manage connectivity to the cloud (it doesn't adequately address security on its own), and SASE as a complete network and security solution that needs planning.",
          "The notes' SASE diagram lists network-as-a-service pieces (SD-WAN, VPNs, QoS, routing, SaaS acceleration) and security-as-a-service pieces (Zero Trust Network Access, cloud secure web gateway, CASB, firewall as a service, DLP, DNS security, threat prevention).",
          "QA analogy: connecting to a remote test lab from a browser on port 443 is the SSL/TLS VPN model."
        ],
        pages: [60, 61]
      },
      activities: [
        {
          id: "d3-securecomm-a1", type: "match", format: "Match",
          prompt: "Pick the best control for each need, following the notes' 'selection of effective controls'.",
          choices: ["SSL/TLS VPN", "Site-to-site IPsec VPN", "SD-WAN", "SASE"],
          items: [
            { t: "Remote employees reach internal apps from a browser", a: "SSL/TLS VPN", why: "It's for user access over tcp/443." },
            { t: "Branch office permanently connected to headquarters", a: "Site-to-site IPsec VPN", why: "It's always on between firewalls." },
            { t: "Sites need efficient direct routes to cloud apps (security handled elsewhere)", a: "SD-WAN", why: "It manages connectivity, but not adequate security on its own." },
            { t: "A complete cloud-delivered network and security service for every device", a: "SASE", why: "A complete solution with clients on all devices." }
          ],
          hint: "User, site, connectivity only, everything.",
          explain: "Match the tool to the job, and remember that SD-WAN alone doesn't solve security.",
          pages: [60, 61]
        },
        {
          id: "d3-securecomm-a2", type: "choice", format: "Compare",
          prompt: "Why does the notes say an SSL/TLS VPN has '(almost) no firewall issues'?",
          options: [
            { t: "It uses the common SSL/TLS port tcp/443", ok: true, why: "Port 443 is almost always allowed outbound." },
            { t: "It turns off the firewall while connected", why: "It never turns the firewall off. It uses tcp/443, the same port as normal HTTPS, which is almost always allowed." },
            { t: "It needs certificates on every firewall", why: "It doesn't require certificates or shared passwords." },
            { t: "It only works inside the local network", why: "It's for remote access across the Internet." }
          ],
          hint: "Which port does every network already allow?",
          explain: "Using tcp/443 lets SSL/TLS VPNs pass through most networks.",
          pages: [60]
        },
        {
          id: "d3-securecomm-a3", type: "order", format: "Order",
          prompt: "Put the remote-access VPN flow in order (based on the notes' diagram).",
          steps: [
            { t: "The remote user creates a tunnel to the VPN concentrator", why: "The encrypted tunnel is set up first." },
            { t: "The concentrator decrypts the traffic", why: "The original data is recovered on the corporate side." },
            { t: "It routes the traffic into the corporate network", why: "Now it reaches internal resources." },
            { t: "Return traffic is encrypted back through the tunnel", why: "The process is reversed for responses." }
          ],
          hint: "Tunnel, decrypt, route, reverse.",
          explain: "The concentrator encrypts and decrypts at the corporate edge.",
          pages: [61]
        },
        {
          id: "d3-securecomm-a4", type: "recall", format: "Recall",
          front: "What does a VPN concentrator do, and where does it often live?",
          back: "It encrypts and decrypts VPN traffic. It's often built into a firewall, and can be specialized hardware or software.",
          pages: [60]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.3 Data types
    {
      id: "d3-datatypes",
      objective: "3.3",
      section: "Data Types and Classifications",
      title: "Data types and classifications",
      pages: [62],
      lesson: {
        summary: [
          "Data types: regulated (governed by laws and third parties), trade secrets, intellectual property (may be public but protected by copyright and trademark), legal information, and financial information.",
          "Human-readable data is easy for people to understand. Non-human readable data is encoded, like barcodes and images. Formats like CSV, XML and JSON are a hybrid.",
          "Classifying sensitive data: different levels need different handling, such as extra permissions, a different viewing process or restricted network access. License plates and health records aren't equally sensitive.",
          "Classifications: proprietary, PII, PHI, sensitive, confidential (must be approved to view), public or unclassified, private, classified or restricted (may need an NDA), and critical (must always be available)."
        ],
        more: [
          "PII (personally identifiable information) can identify a person: name, date of birth, mother's maiden name, biometrics.",
          "PHI (protected health information) is health data tied to a person: health status, care records, payments.",
          "Legal information often includes PII and lives in many systems. Financial information includes internal financials, customer financials, payment records and card data.",
          "QA analogy: JSON test fixtures are hybrid-readable data. If they contain real customer PII, they need the same classification as production."
        ],
        pages: [62]
      },
      activities: [
        {
          id: "d3-datatypes-a1", type: "match", format: "Match",
          prompt: "Classify each piece of data.",
          choices: ["PII", "PHI", "Trade secret", "Intellectual property", "Financial information"],
          items: [
            { t: "Customer's full name, birth date and mother's maiden name", a: "PII", why: "Name, birth date and maiden name together identify one person: personally identifiable information (PII)." },
            { t: "A patient's diagnosis and treatment payments", a: "PHI", why: "Health information tied to a person." },
            { t: "The company's secret formula for a product", a: "Trade secret", why: "A secret unique to the organization." },
            { t: "A published logo and copyrighted user manual", a: "Intellectual property", why: "May be public but protected by copyright and trademark." },
            { t: "Card numbers and bank records in the payments table", a: "Financial information", why: "Card numbers and bank records are financial information." }
          ],
          hint: "Identity, health, secret recipe, copyrighted, money.",
          explain: "PII identifies a person, PHI is health data, trade secrets are hidden know-how, IP is protected creative work, and financial data covers money.",
          pages: [62]
        },
        {
          id: "d3-datatypes-a2", type: "choice", format: "Compare",
          prompt: "Which classification means 'very sensitive, must be approved to view'?",
          options: [
            { t: "Confidential", ok: true, why: "Correct: confidential means very sensitive, and you need approval to see it." },
            { t: "Public / unclassified", why: "Public has no viewing restrictions." },
            { t: "Critical", why: "Critical is about availability: the data should always be available." },
            { t: "Proprietary", why: "Proprietary means owned by the organization, which is a different axis." }
          ],
          hint: "Approval required.",
          explain: "Confidential = very sensitive, approval needed to view. Private = restricted, often PII. Public = anyone can see it.",
          pages: [62]
        },
        {
          id: "d3-datatypes-a3", type: "choice", format: "Scenario",
          prompt: "A QA engineer exports API responses as JSON. How do the notes categorize formats like JSON, XML and CSV?",
          options: [
            { t: "A hybrid of human and non-human readable", ok: true, why: "The notes list CSV, XML and JSON as hybrids." },
            { t: "Purely non-human readable, like barcodes", why: "People can read JSON, though it's structured for machines too." },
            { t: "Regulated data by definition", why: "The format says nothing about regulation." },
            { t: "Always public and unclassified", why: "The format doesn't decide classification. The contents do." }
          ],
          hint: "Both people and programs can read it.",
          explain: "Readability and classification are separate questions.",
          pages: [62]
        },
        {
          id: "d3-datatypes-a4", type: "recall", format: "Recall",
          front: "What does 'regulated' data mean in the notes?",
          back: "Data managed by a third party and governed by government laws and statutes.",
          pages: [62]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.3 States of data
    {
      id: "d3-datastates",
      objective: "3.3",
      section: "States of Data",
      title: "States of data",
      pages: [62, 63],
      lesson: {
        summary: [
          "Data at rest sits on storage. Protect it with whole disk, database, or file and folder encryption, plus permissions (ACLs).",
          "Data in transit (in motion) crosses the network. Protect it with network controls (firewall, IPS) and transport encryption (TLS, IPsec).",
          "Data in use is in memory (RAM, CPU registers, cache) and is almost always decrypted, so attackers try to read it from RAM. The 2013 Target breach (110 million cards) took card numbers from point-of-sale RAM, even though data at rest and in transit were encrypted.",
          "Data sovereignty means data is subject to the laws of the country where it resides. GDPR, for example, requires EU citizens' data to be stored in the EU. Geolocation (802.11, mobile providers, GPS) can restrict access by location."
        ],
        more: [
          "Geolocation can prevent access from other countries, or limit admin tasks unless you're in a secure area such as inside the building.",
          "QA analogy: a memory dump from a crashed test process can contain decrypted secrets. That's data in use leaking."
        ],
        pages: [62, 63]
      },
      activities: [
        {
          id: "d3-datastates-a1", type: "match", format: "Match",
          prompt: "Match each scenario to the state of data.",
          choices: ["Data at rest", "Data in transit", "Data in use"],
          items: [
            { t: "Customer records on an encrypted SSD", a: "Data at rest", why: "Data sitting on a drive is at rest, even when it's encrypted." },
            { t: "An API response travelling over TLS", a: "Data in transit", why: "Data moving across a network is in transit; TLS protects it on the way." },
            { t: "Card numbers being processed in a POS terminal's RAM", a: "Data in use", why: "Actively processing in memory, usually decrypted." }
          ],
          hint: "Stored, moving, processing.",
          explain: "At rest = stored, in transit = moving across a network, in use = in memory being processed.",
          pages: [62]
        },
        {
          id: "d3-datastates-a2", type: "choice", format: "Scenario",
          prompt: "A retailer encrypted card data at rest and in transit, but attackers still stole cards from the checkout terminals. Which state was exploited?",
          options: [
            { t: "Data in use (in memory)", ok: true, why: "As in the Target breach, data is decrypted in RAM while it's processed." },
            { t: "Data at rest", why: "Stored card data was encrypted, so it wasn't the weak point. The cards were read from memory while in use." },
            { t: "Data in transit", why: "Network traffic was encrypted." },
            { t: "Data sovereignty", why: "That's about legal jurisdiction, not a technical state." }
          ],
          hint: "Where must the data be decrypted?",
          explain: "Data must be decrypted to be used, which makes RAM an attractive target.",
          pages: [62]
        },
        {
          id: "d3-datastates-a3", type: "choice", format: "Next action",
          prompt: "Your company wants to move EU customer data to a US-only data center. What should you check first?",
          options: [
            { t: "Data sovereignty laws such as GDPR", ok: true, why: "GDPR requires data on EU citizens to stay in the EU." },
            { t: "Whether the US servers have faster CPUs", why: "Performance doesn't override legal requirements." },
            { t: "Whether the data is human-readable", why: "Readability doesn't change jurisdiction." },
            { t: "The backup rotation schedule", why: "Relevant later, but legality comes first." }
          ],
          hint: "Where data lives decides which laws apply.",
          explain: "Compliance laws may prohibit moving data out of a country.",
          pages: [63]
        },
        {
          id: "d3-datastates-a4", type: "recall", format: "Recall",
          front: "Name the two transport encryption protocols the notes give for data in transit.",
          back: "TLS (Transport Layer Security) and IPsec (Internet Protocol Security).",
          pages: [62]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.3 Protecting data
    {
      id: "d3-protectdata",
      objective: "3.3",
      section: "Protecting Data",
      title: "Protecting data",
      pages: [63, 64],
      lesson: {
        summary: [
          "Geographic restrictions use network location (IP subnet) or geolocation: GPS is very accurate, 802.11 less so, and IP address isn't very accurate. Geofencing allows or blocks access automatically based on where the user is.",
          "Protecting data is a primary job task. Tools include encryption (plaintext to ciphertext and back with the key, with confusion making ciphertext look nothing like plaintext), hashing (one-way, for integrity and passwords), obfuscation, masking and tokenization.",
          "Code obfuscation turns readable code into nonsense that behaves the same. It makes hunting for security holes harder, but not impossible.",
          "Segmentation splits data across locations so one breach doesn't expose everything, with the most sensitive data most secure. Permission restrictions cover authentication policies (passwords, factors) plus permissions after login."
        ],
        more: [
          "The notes repeat the hashing, masking and tokenization material from 1.4 here. See the Domain 1 topics on hashing and obfuscation for more practice.",
          "Geofencing example from the notes: don't let this app run unless you're near the office.",
          "QA analogy: minified, obfuscated front-end bundles are code obfuscation. The source is kept privately, and the shipped JS works the same."
        ],
        pages: [63, 64]
      },
      activities: [
        {
          id: "d3-protectdata-a1", type: "choice", format: "Scenario",
          prompt: "A field-service app should only unlock admin features when the technician's phone is physically at a customer site. Which technique fits?",
          options: [
            { t: "Geofencing", ok: true, why: "It automatically allows or restricts access based on location." },
            { t: "Tokenization", why: "That replaces sensitive values with placeholders." },
            { t: "Segmentation", why: "Segmentation separates data or networks. Unlocking features based on location is geofencing." },
            { t: "Hashing", why: "That's for integrity and password storage." }
          ],
          hint: "Location-based allow or deny.",
          explain: "Geofencing uses geolocation (often GPS on mobile) to enforce access rules.",
          pages: [63]
        },
        {
          id: "d3-protectdata-a2", type: "choice", format: "Compare",
          prompt: "Rank the location methods from most to least accurate, per the notes. Which order is right?",
          options: [
            { t: "GPS, then 802.11 wireless, then IP address", ok: true, why: "GPS is very accurate, 802.11 less, IP not very accurate." },
            { t: "IP address, then GPS, then 802.11 wireless", why: "IP address is the least accurate, so it can't come first. The order is GPS, 802.11, then IP." },
            { t: "802.11 wireless, then IP address, then GPS", why: "GPS is the most accurate, so it can't come last. The order is GPS, 802.11, then IP." },
            { t: "All three are equally accurate", why: "The notes rank them differently." }
          ],
          hint: "Satellites beat IP lookups.",
          explain: "Choose the method by how precise the control needs to be.",
          pages: [63]
        },
        {
          id: "d3-protectdata-a3", type: "match", format: "Match",
          prompt: "Match each protection to its description.",
          choices: ["Encryption", "Hashing", "Code obfuscation", "Segmentation", "Permission restrictions"],
          items: [
            { t: "Two-way: plaintext to ciphertext and back with the key", a: "Encryption", why: "It's reversible with the proper key." },
            { t: "One-way digest used to verify integrity", a: "Hashing", why: "You can't recover the original." },
            { t: "Shipped code is unreadable but behaves identically", a: "Code obfuscation", why: "It makes finding security holes harder." },
            { t: "Splitting one big database so a single breach exposes less", a: "Segmentation", why: "Separate the data into different locations." },
            { t: "Password and MFA policies plus access rights after login", a: "Permission restrictions", why: "They control access to an account and what it can do." }
          ],
          hint: "Reversible, one-way, scrambled code, split, controlled access.",
          explain: "Encryption is two-way, hashing is one-way, obfuscation makes code unreadable, segmentation splits data up, and permissions limit access.",
          pages: [63, 64]
        },
        {
          id: "d3-protectdata-a4", type: "recall", format: "Recall",
          front: "In encryption, what does 'confusion' mean?",
          back: "The encrypted data is drastically different from the plaintext, so there's no obvious relationship between them.",
          pages: [63]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.4 Resiliency
    {
      id: "d3-resiliency",
      objective: "3.4",
      section: "Resiliency",
      title: "Resiliency and recovery sites",
      pages: [64, 65],
      lesson: {
        summary: [
          "High availability (HA) means always on. Redundancy alone may need manual power-on. More availability almost always costs more.",
          "Server clustering makes several servers (usually the same OS) act as one large server. Load balancing spreads load across servers that may not know about each other and may run different OSes, adding or removing servers as needed.",
          "Site resiliency means failing over to a prepared recovery site, then reverting, with the process documented both ways. A hot site is an exact, constantly updated replica. A warm site has racks and some hardware, and you bring the software and data. A cold site is an empty building, and you bring hardware, data and people.",
          "Spread the risk: geographic dispersion (away from shared disasters like hurricanes), platform diversity (vulnerabilities are often OS-specific) and multi-cloud systems. Continuity of operations planning (COOP) documents and tests manual fallbacks like paper receipts and phone approvals."
        ],
        more: [
          "Hot sites mean buying two of everything with automated replication, then flipping a switch (maybe quite a few switches) to move.",
          "Geographic dispersion has logistics costs: moving equipment and getting employees on site and back.",
          "QA analogy: running your test suite on Windows, Linux and macOS agents is platform diversity. A bug in one OS doesn't take down all coverage."
        ],
        pages: [64, 65]
      },
      activities: [
        {
          id: "d3-resiliency-a1", type: "match", format: "Compare",
          prompt: "Match each recovery site to its description.",
          choices: ["Hot site", "Warm site", "Cold site"],
          items: [
            { t: "Exact replica with constantly updated hardware, software and data", a: "Hot site", why: "Flip a switch and everything moves." },
            { t: "Rack space and some ready hardware; you bring software and data", a: "Warm site", why: "Somewhere between hot and cold." },
            { t: "Empty building with no hardware, no data and no people", a: "Cold site", why: "Bring it all yourself, including your team." }
          ],
          hint: "Ready now, partly ready, empty.",
          explain: "Faster recovery costs more, from hot (most) to cold (least).",
          pages: [64, 65]
        },
        {
          id: "d3-resiliency-a2", type: "choice", format: "Compare",
          prompt: "What's a key difference between server clustering and load balancing in the notes?",
          options: [
            { t: "Clusters act as one server; balanced servers can be unaware of each other", ok: true, why: "Clusters appear as a single device, usually on the same OS. Balanced servers can differ." },
            { t: "Load balancing requires every server to run the same OS", why: "Reversed. Load-balanced servers can run different OSes." },
            { t: "Clustering can't increase capacity", why: "Adding servers to a cluster increases capacity and availability." },
            { t: "They're two names for the same thing", why: "The notes describe them separately with different traits." }
          ],
          hint: "One big server vs. many independent ones.",
          explain: "Both improve availability, but in different ways.",
          pages: [64]
        },
        {
          id: "d3-resiliency-a3", type: "choice", format: "Next action",
          prompt: "Your primary data center and recovery site are 5 miles apart in a hurricane zone. What do the notes suggest?",
          options: [
            { t: "Increase geographic dispersion between sites", ok: true, why: "Recovery sites should be physically distant from the primary site." },
            { t: "Switch the recovery site from warm to hot", why: "A hot site in the same disaster zone fails with the primary." },
            { t: "Add more servers to the cluster", why: "That doesn't help against a regional disaster." },
            { t: "Turn off continuity planning to save cost", why: "Continuity planning is essential." }
          ],
          hint: "Many disruptions affect a large area.",
          explain: "Geographic dispersion protects against regional events.",
          pages: [65]
        },
        {
          id: "d3-resiliency-a4", type: "order", format: "Order",
          prompt: "Put the site resiliency process in order.",
          steps: [
            { t: "Prepare the recovery site and synchronize data", why: "It must be ready before anything happens." },
            { t: "A disaster is called", why: "Someone officially declares a disaster, which starts the move to the recovery site." },
            { t: "Business processes fail over to the alternate site", why: "Operations continue elsewhere." },
            { t: "The problem is addressed at the primary", why: "This may take hours, weeks or longer." },
            { t: "Revert back to the primary location", why: "Coming back to the main site is the last step, and it needs its own documented plan too." }
          ],
          hint: "Prep, declare, move, fix, return.",
          explain: "Document and practice both directions of the move.",
          pages: [64]
        },
        {
          id: "d3-resiliency-a5", type: "recall", format: "Recall",
          front: "What is COOP, and give an example from the notes.",
          back: "Continuity of operations planning: documented, tested alternatives for when systems fail, such as manual transactions, paper receipts or phone calls to approve transactions.",
          pages: [65]
        },
        {
          id: "d3-resiliency-a6", type: "choice", format: "Scenario",
          prompt: "A company stores replicas of its data with AWS, Azure and Google Cloud so one provider's outage or breach doesn't take everything. What is this?",
          options: [
            { t: "Multi-cloud systems", ok: true, why: "Data is dispersed across cloud providers." },
            { t: "Platform diversity", why: "That's about mixing OSes and applications." },
            { t: "A cold site", why: "A cold site is an empty building." },
            { t: "Server clustering", why: "Clustering joins servers into one logical server." }
          ],
          hint: "Several providers.",
          explain: "Multi-cloud plans for outages and breaches at any single provider.",
          pages: [65]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.4 Capacity planning
    {
      id: "d3-capacity",
      objective: "3.4",
      section: "Capacity Planning",
      title: "Capacity planning",
      pages: [65],
      lesson: {
        summary: [
          "Capacity planning matches supply to demand. Too much demand causes slowdowns and outages, and too much supply wastes money.",
          "People: some services need humans, like call centers. Too few means recruiting (slow), and too many means redeploying or downsizing.",
          "Technology: choose things that scale, such as distributing web services, clustering or splitting SQL databases, and on-demand cloud services.",
          "Infrastructure: the underlying CPU, network and storage. Physical devices must be bought and installed, and cloud devices are easier to deploy for unexpected changes."
        ],
        more: [
          "QA analogy: load testing before a launch is capacity planning. You find where demand outruns supply before customers do."
        ],
        pages: [65]
      },
      activities: [
        {
          id: "d3-capacity-a1", type: "match", format: "Match",
          prompt: "Match each capacity action to its area.",
          choices: ["People", "Technology", "Infrastructure"],
          items: [
            { t: "Hire more call center agents for launch week", a: "People", why: "More staff for a busy week is people capacity." },
            { t: "Split the database across clustered SQL servers", a: "Technology", why: "Choosing technology that scales." },
            { t: "Add cloud-based storage and network capacity for a spike", a: "Infrastructure", why: "The underlying CPU, network and storage." }
          ],
          hint: "Humans, software choices, underlying resources.",
          explain: "Capacity planning balances people, technology and infrastructure against demand.",
          pages: [65]
        },
        {
          id: "d3-capacity-a2", type: "choice", format: "Scenario",
          prompt: "The app slows down and times out at peak hours. What's the capacity problem?",
          options: [
            { t: "Demand exceeds supply", ok: true, why: "Too much demand causes slowdowns and outages." },
            { t: "Supply exceeds demand", why: "That just costs too much. It doesn't cause slowdowns." },
            { t: "Data sovereignty", why: "That's a legal location issue." },
            { t: "Fail-closed IPS", why: "That's a failure mode, not capacity." }
          ],
          hint: "Too many requests, not enough resources.",
          explain: "Capacity planning keeps demand and supply in balance.",
          pages: [65]
        },
        {
          id: "d3-capacity-a3", type: "recall", format: "Recall",
          front: "Why are cloud-based devices useful for capacity planning?",
          back: "They're easier to deploy than physical devices, so they help with unexpected capacity changes. Resources are on demand and seemingly unlimited, if you pay.",
          pages: [65]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.4 Recovery testing
    {
      id: "d3-recoverytest",
      objective: "3.4",
      section: "Recovery Testing",
      title: "Recovery testing",
      pages: [66],
      lesson: {
        summary: [
          "Recovery testing exercises your plans before a real event, on a schedule, with well-defined rules of engagement (don't touch production), a specific scenario and limited time. Afterwards, evaluate, document and discuss.",
          "Tabletop exercises get key players together to talk through a simulated disaster. They're cheaper than a full-scale drill.",
          "Fail over: build redundant infrastructure (multiple routers, firewalls, switches) so service moves to a working unit, often automatically.",
          "Simulation tests with a fake event, like a phishing campaign against your real users, to see if the filter caught it and who clicked. Parallel processing splits work across CPUs for performance and recovery, because a faulty processor can be removed while the rest keep running."
        ],
        more: [
          "QA analogy: a chaos engineering game day is recovery testing. A tabletop is like a test plan review where nobody runs anything."
        ],
        pages: [66]
      },
      activities: [
        {
          id: "d3-recoverytest-a1", type: "match", format: "Compare",
          prompt: "Match each recovery test to its description.",
          choices: ["Tabletop exercise", "Simulation", "Fail over test", "Parallel processing"],
          items: [
            { t: "Managers talk through a ransomware scenario around a table", a: "Tabletop exercise", why: "Talk through a disaster without performing it." },
            { t: "Send a fake phishing email to staff and see who clicks", a: "Simulation", why: "A simulated event tests filters and users." },
            { t: "Pull the primary firewall's cable and confirm the backup takes over", a: "Fail over test", why: "Checks redundant infrastructure." },
            { t: "Remove a faulty CPU from the pool and keep processing", a: "Parallel processing", why: "Improved recovery by dropping the bad processor." }
          ],
          hint: "Talk, fake event, switch over, split work.",
          explain: "Tabletop = talk it through, simulation = a realistic fake event, fail over = actually switch to backup, parallel processing = many CPUs sharing work.",
          pages: [66]
        },
        {
          id: "d3-recoverytest-a2", type: "choice", format: "Next action",
          prompt: "Leadership wants to rehearse disaster response, but a full-scale drill is too costly. What do the notes suggest?",
          options: [
            { t: "Run a tabletop exercise", ok: true, why: "Key players talk through a simulated disaster cheaply." },
            { t: "Wait for a real disaster to test the plan", why: "The point is testing before an actual event." },
            { t: "Test directly on production systems", why: "Rules of engagement say don't touch production." },
            { t: "Skip testing and buy cyber insurance", why: "Insurance transfers risk. It doesn't test response." }
          ],
          hint: "Analysis instead of a physical drill.",
          explain: "Tabletops answer many logistics questions without the cost of a drill.",
          pages: [66]
        },
        {
          id: "d3-recoverytest-a3", type: "recall", format: "Recall",
          front: "Name two 'rules' of a recovery test from the notes.",
          back: "Well-defined rules of engagement (don't touch production), a very specific scenario, limited time to run it, and then evaluating, documenting and discussing the response.",
          pages: [66]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.4 Backups
    {
      id: "d3-backups",
      objective: "3.4",
      section: "Backups",
      title: "Backups",
      pages: [66, 67],
      lesson: {
        summary: [
          "Onsite vs. offsite backups: onsite is fast, needs no Internet link and is cheaper. Offsite survives a disaster and can be restored from anywhere. Many organizations use both.",
          "Frequency depends on how much a system changes (daily, weekly or monthly sets), which takes planning and media management. Encrypt backups, especially offsite and cloud copies, since they hold your history in one place.",
          "Snapshots are instant whole-system backups (popular for VMs and cloud). Later snapshots store only the changes, and you can revert to any one quickly. Replication keeps an ongoing, near real-time synced copy in multiple locations.",
          "Journaling writes a journal entry before writing data, so a power loss mid-write doesn't corrupt storage. A backup only counts if you can restore it, so do recovery testing: simulate a disaster, restore, confirm the app and data work, and audit regularly."
        ],
        more: [
          "Journaling steps: write the journal entry, write the data to storage, then clear the journal entry.",
          "Backup planning variables: amount of data, backup type, media, storage location, software, and day of the week.",
          "QA analogy: 'test the restore, not the backup' is the same as testing the rollback path, not just the deploy."
        ],
        pages: [66, 67]
      },
      activities: [
        {
          id: "d3-backups-a1", type: "order", format: "Order",
          prompt: "Put the journaling write process in order.",
          steps: [
            { t: "Write a journal entry describing the change", why: "Step 1: write what you're about to change into the journal first." },
            { t: "Write the data to storage", why: "Step 2: now actually write the data. If power fails mid-write, the journal shows what to fix." },
            { t: "Clear the journal entry", why: "The write finished, so get ready for the next." }
          ],
          hint: "Note it, do it, clear the note.",
          explain: "If power fails mid-write, the journal shows what to finish or roll back.",
          pages: [67]
        },
        {
          id: "d3-backups-a2", type: "choice", format: "Scenario",
          prompt: "The backup job reports 'success' every night, but nobody has ever restored from it. What's missing?",
          options: [
            { t: "Recovery testing that actually restores and checks the data", ok: true, why: "It's not enough to back up. You must be able to restore." },
            { t: "More frequent backups", why: "Frequency doesn't prove restorability." },
            { t: "Switching from snapshots to journaling", why: "Journaling protects writes. It isn't a restore test." },
            { t: "Turning off encryption so restores are easier", why: "Encryption should stay. Test restores with the recovery key." }
          ],
          hint: "A green job isn't proof.",
          explain: "Simulate a disaster, restore, and confirm the application and data.",
          pages: [67]
        },
        {
          id: "d3-backups-a3", type: "match", format: "Match",
          prompt: "Match each technique to its description.",
          choices: ["Snapshot", "Replication", "Offsite backup", "Onsite backup"],
          items: [
            { t: "Instant VM backup; later ones hold only the changes", a: "Snapshot", why: "A snapshot captures a VM instantly; later snapshots store only what changed. Easy to roll back." },
            { t: "Near real-time synced copies at every remote site", a: "Replication", why: "An ongoing, almost real-time backup." },
            { t: "Copy sent over a WAN and available after a building fire", a: "Offsite backup", why: "A copy stored at another site (offsite) survives if the building burns down." },
            { t: "Local copy available immediately without an Internet link", a: "Onsite backup", why: "A local (onsite) copy is fast to restore and needs no Internet, but it's lost if the site is." }
          ],
          hint: "Point in time, continuous, far away, close by.",
          explain: "Snapshots roll back quickly, replication keeps live copies in sync, offsite copies survive disasters, and onsite copies restore fast.",
          pages: [66, 67]
        },
        {
          id: "d3-backups-a4", type: "choice", format: "Compare",
          prompt: "Why do the notes recommend encrypting backups?",
          options: [
            { t: "Backups hold a history of data in one place", ok: true, why: "Easy pickings for an attacker, especially offsite or in the cloud." },
            { t: "Encryption makes backups smaller", why: "Encryption doesn't compress data." },
            { t: "Encrypted backups don't need a recovery key", why: "The recovery key is required to restore." },
            { t: "It removes the need for offsite copies", why: "Encryption protects copies. It doesn't replace them." }
          ],
          hint: "All the data is in one place.",
          explain: "Backup media is a concentrated target, so protect it.",
          pages: [66]
        },
        {
          id: "d3-backups-a5", type: "recall", format: "Recall",
          front: "Give one advantage each of onsite and offsite backups.",
          back: "Onsite: immediately available, no Internet link needed, usually cheaper. Offsite: available after a disaster, restorable from anywhere.",
          pages: [66]
        }
      ]
    },

    // ------------------------------------------------------------------ 3.4 Power
    {
      id: "d3-power",
      objective: "3.4",
      section: "Power Resiliency",
      title: "Power resiliency",
      pages: [67],
      lesson: {
        summary: [
          "Power resiliency: power is the foundation, and it usually comes from third parties you can't control, so plan for both short and long outages.",
          "A UPS (uninterruptible power supply) gives short-term backup power for blackouts, brownouts and surges. Types are offline/standby, line-interactive and online/double-conversion. Features include auto shutdown, battery capacity, outlets and phone line suppression.",
          "Generators provide long-term backup for a whole building and need fuel storage. They take a few minutes to get up to speed, so a UPS bridges the gap."
        ],
        more: [
          "Some outlets may be marked as generator-powered.",
          "QA analogy: a UPS is like a retry buffer that holds things up until the real fallback (the generator) is ready."
        ],
        pages: [67]
      },
      activities: [
        {
          id: "d3-power-a1", type: "order", format: "Order",
          prompt: "Utility power fails at a data center with a UPS and a generator. Put the events in order.",
          steps: [
            { t: "Utility power drops", why: "Step 1: the utility power goes out." },
            { t: "The UPS batteries carry the load immediately", why: "Short-term backup with no interruption." },
            { t: "The generator starts and gets up to speed", why: "The generator takes a few minutes to start and get up to speed. The UPS covers that gap." },
            { t: "The generator takes over long-term power", why: "With fuel, it can power the building for a long time." }
          ],
          hint: "Batteries bridge the gap.",
          explain: "Use the UPS while the generator starts.",
          pages: [67]
        },
        {
          id: "d3-power-a2", type: "choice", format: "Compare",
          prompt: "Which is a UPS type listed in the notes?",
          options: [
            { t: "Line-interactive", ok: true, why: "Listed with offline/standby and online/double-conversion." },
            { t: "Active/passive", why: "Active/passive describes load balancers, not UPS types. Line-interactive is a UPS type." },
            { t: "Fail-closed", why: "That's a security device failure mode." },
            { t: "Site-to-site", why: "Site-to-site is a VPN type. Line-interactive is a UPS type." }
          ],
          hint: "Offline, line-…, online.",
          explain: "The three UPS types are offline/standby, line-interactive and online/double-conversion.",
          pages: [67]
        },
        {
          id: "d3-power-a3", type: "recall", format: "Recall",
          front: "UPS vs. generator: which is short-term and which is long-term?",
          back: "A UPS is short-term (blackouts, brownouts, surges). A generator is long-term and needs fuel, and can power a whole building.",
          pages: [67]
        }
      ]
    }
  ]
});
