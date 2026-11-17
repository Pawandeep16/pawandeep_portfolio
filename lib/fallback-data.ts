// Last-known Sanity snapshot — 5 Nov 2026.
// Used ONLY if a Sanity fetch fails or returns empty. This is a copy of the
// real content in Sanity (project 0yo7qjoj, dataset production) at that date.
// It is NOT a source of truth: edit content in Sanity Studio at /studio and
// the live site will use Sanity. Never invent fallback content here —
// if Sanity changes, update this snapshot from Sanity, don't make things up.
import type { Artwork, Certification, Education, Experience, Hero, Project, SkillCategory, SocialLink, Testimonial } from "./types";

export const FALLBACK_SNAPSHOT_DATE = "2026-11-05";

export const fallbackHero: Hero = {
  "backgroundImage": null,
  "description": "Transforming ideas into stunning digital experiences through innovative design and cutting-edge development.",
  "email": "thandipawandeep@gmail.com",
  "location": "Toronto,Ontario",
  "name": "Pawandeep Singh Thandi",
  "phone": "(416)-884-0993",
  "profileImage": null,
  "roles": [
    "Full Stack Developer",
    "UI/UX Designer",
    "Graphics Designer"
  ],
  "title": "Full Stack Developer"
};

export const fallbackSkills: SkillCategory[] = [
  {
    "_id": "7fae1156-7648-4297-8973-8676422639c6",
    "bgColor": "from-yellow-500/10 to-orange-500/10",
    "color": "from-yellow-500 to-orange-500",
    "icon": "Image",
    "order": 3,
    "skills": [
      {
        "level": 5,
        "name": "Adobe Photoshop"
      },
      {
        "level": 5,
        "name": "Adobe Illustrator"
      },
      {
        "level": 5,
        "name": "After Effects (basic animation)"
      },
      {
        "level": 4,
        "name": "Branding & Visual Identity"
      },
      {
        "level": 5,
        "name": "Social Media Design"
      }
    ],
    "title": " Graphic & Motion Design"
  },
  {
    "_id": "3e67f7bc-8276-4493-860f-cd3da1c02ed8",
    "bgColor": "from-green-500/10 to-emerald-500/10",
    "color": "from-green-500 to-emerald-500",
    "icon": "Database",
    "order": 4,
    "skills": [
      {
        "level": 4,
        "name": "Node.js"
      },
      {
        "level": 4,
        "name": "Express.js"
      },
      {
        "level": 4,
        "name": "MongoDB"
      },
      {
        "level": 4,
        "name": "API Integration"
      },
      {
        "level": 4,
        "name": "RESTful Services"
      }
    ],
    "title": " Backend & Database 📟"
  },
  {
    "_id": "c39e9eb3-68ff-4d97-b3da-3af8d527b160",
    "bgColor": "from-red-500/10 to-orange-500/10",
    "color": "from-red-500 to-pink-500",
    "icon": "Brush",
    "order": 4,
    "skills": [
      {
        "level": 5,
        "name": "Figma"
      },
      {
        "level": 5,
        "name": "Adobe XD"
      },
      {
        "level": 5,
        "name": "Wireframing & Prototyping"
      },
      {
        "level": 5,
        "name": "Responsive Design"
      },
      {
        "level": 5,
        "name": "UX Research"
      },
      {
        "level": 4,
        "name": "Design Systems"
      }
    ],
    "title": "UI/UX Design 🎀"
  },
  {
    "_id": "e1a91ee2-c2d1-4ebc-a0da-140eb302e158",
    "bgColor": "from-blue-500/10 to-cyan-500/10",
    "color": "from-indigo-500 via-purple-500 to-pink-500",
    "icon": "Bug",
    "order": 6,
    "skills": [
      {
        "level": 4,
        "name": "Next.js"
      },
      {
        "level": 5,
        "name": "HTML5 & CSS3"
      },
      {
        "level": 4,
        "name": "React.js"
      },
      {
        "level": 4,
        "name": "JavaScript (ES6+)"
      },
      {
        "level": 4,
        "name": "Framer Motion"
      },
      {
        "level": 4,
        "name": "TypeScript"
      }
    ],
    "title": "Frontend Development "
  },
  {
    "_id": "6bf77195-62e3-4229-807f-1f92e5e2c745",
    "bgColor": "from-purple-500/10 to-fuchsia-500/10",
    "color": "from-purple-500 to-fuchsia-500",
    "icon": "Zap",
    "order": 7,
    "skills": [
      {
        "level": 5,
        "name": "OpenAI API"
      },
      {
        "level": 5,
        "name": "Document Summarization"
      },
      {
        "level": 5,
        "name": "PDF-to-Word Automation"
      },
      {
        "level": 5,
        "name": "AI-driven UI Enhancements"
      },
      {
        "level": 5,
        "name": "AI Coding 🧑🏻‍💻"
      }
    ],
    "title": "AI & Automation 🧠"
  },
  {
    "_id": "19d8d62f-accb-4f2b-86e2-40403bee6755",
    "bgColor": "from-blue-500/30 to-sky-500/30",
    "color": "from-blue-500 to-cyan-500",
    "icon": "Calendar",
    "order": 9,
    "skills": [
      {
        "level": 5,
        "name": "Agile & Scrum"
      },
      {
        "level": 5,
        "name": "Task Delegation"
      },
      {
        "level": 5,
        "name": "Version Control (Git, GitHub)"
      },
      {
        "level": 5,
        "name": "Communication & Collaboration"
      },
      {
        "level": 5,
        "name": "Team Leadership"
      }
    ],
    "title": "Project & Team Management 🎗️"
  }
];

export const fallbackEducation: Education[] = [
  {
    "_id": "c5a6c84d-4da9-4188-a516-45c2a9bb8c14",
    "achievements": [
      "Dean's List – All Semesters",
      "Capstone Project Lead – AI Document Analysis Tool",
      "Graduated with a 3.7 GPA"
    ],
    "current": false,
    "degree": "Ontario College Graduate Certificate",
    "description": "Completed a Four-semester intensive program focused on full-stack web and mobile development, database management, and cloud-based solutions. Gained hands-on experience in React, Node.js, MongoDB, and modern DevOps practices.",
    "endDate": "2024-12-30",
    "field": "Computer Software and Database Development",
    "gpa": "3.7",
    "institution": "Loyalist College",
    "location": "Toronto, ON",
    "startDate": "2023-05-01"
  },
  {
    "_id": "d4222e16-a190-4d7d-bc50-5e9863fa27cf",
    "achievements": [
      "Final Year Project on Intelligent Web Applications",
      "Top 10% of class",
      "Active member of the coding & design club"
    ],
    "current": false,
    "degree": "Bachelor of Technology (B.Tech)",
    "description": "Four-year engineering program with a strong foundation in algorithms, data structures, operating systems, and software development. Specialized in web development and gained early experience with full-stack projects and design tools.",
    "endDate": "2022-07-24",
    "field": "Computer Science and Engineering",
    "gpa": "3.8",
    "institution": "I.K. Gujral Punjab Technical University",
    "location": "Punjab, India",
    "startDate": "2018-07-16"
  }
];

export const fallbackExperience: Experience[] = [
  {
    "_id": "99b46fd5-9aa6-4758-a0a6-06beb8248058",
    "achievements": [
      "📦Make the efficient Routes for the effective delivery of package every single day.",
      "Analyzed data from TMS and internal tools to identify recurring issues and collaborated with engineering teams to improve workflows and system reliability. ",
      "👥 Used dashboards and Google Sheets to track KPIs, identify bottlenecks, and support data-driven decision-making. ",
      "Ensure the proper OLM update for  every single unit from initial phase scan till the end delivery of the package."
    ],
    "company": "GoBolt",
    "current": true,
    "description": "As a Parcel Team Lead at GoBolt, I oversee the daily parcel operations, ensuring accurate sorting, dispatching, and timely deliveries. I lead a team of parcel associates and drivers, maintain workflow efficiency, and coordinate closely with warehouse and logistics teams to meet operational targets. My focus is on team performance, process improvement, and delivering high-quality service to customers.\n\n",
    "endDate": null,
    "location": "Markham, ON",
    "startDate": "2024-08-01",
    "technologies": [
      "Warehouse Management Systems (WMS)",
      "Google Workspace.",
      "Zebra Printers & Scanners.",
      "Excel & Data Entry Tools",
      "Slack & Trello",
      "Windows OS & IT Support Tools",
      "Looker Studio",
      "Transport Management System",
      "Manpower Management "
    ],
    "title": "Team Lead,Parcel"
  },
  {
    "_id": "b1cae2b0-2216-48fe-86d1-7d91685182b5",
    "achievements": [
      "Designed and developed a responsive, SEO-optimized website that improved customer engagement and lead generation.",
      "Built an internal dashboard for managing inventory and sales data.",
      "Introduced component-based design systems to speed up development and improve consistency."
    ],
    "company": "Obsidian Glass Industries",
    "current": false,
    "description": "Led the design and development of the company’s digital infrastructure, including their official website and internal tools. Worked end-to-end on full-stack development while applying modern UI/UX principles to ensure usability and visual appeal. Collaborated directly with management to gather requirements, design wireframes, implement front-end interfaces, and integrate with backend systems.",
    "endDate": "2025-05-05",
    "location": "Mississauga,ON",
    "startDate": "2025-01-01",
    "technologies": [
      "React.js, Node.js",
      "MongoDB, Express.js",
      "Tailwind CSS, Figma, Adobe XD",
      "HTML5, CSS3, JavaScript",
      "Git, GitHub"
    ],
    "title": "Full Stack Developer "
  },
  {
    "_id": "25534b22-f675-4e8f-8b0d-b7235338e355",
    "achievements": [
      "Successfully delivered over 30+ branding projects.",
      "Designed print/digital ads for Fortune 500 clients in the telecom and retail sectors.",
      "Improved internal team productivity by introducing project tracking dashboards."
    ],
    "company": "Catalyst Channel Marketing",
    "current": null,
    "description": "Developed responsive websites using HTML, CSS, JavaScript, and modern UI practices. Translated Figma designs into functional, accessible, and performant interfaces. Collaborated with developers and marketing teams to deliver consistent and scalable digital experiences. Applied UI/UX best practices with focus on usability, accessibility, and performance. Maintained and enhanced existing websites, ensuring cross-browser compatibility and responsiveness. ",
    "endDate": "2024-07-30",
    "location": "Oakville, Ontario",
    "startDate": "2023-05-03",
    "technologies": [
      "Adobe Creative Suite (Illustrator, InDesign, Photoshop)",
      "Slack",
      "Microsoft Office Suite",
      "Google Slides & Docs",
      "Asana"
    ],
    "title": "Web Designer / Frontend Developer "
  }
];

export const fallbackProjects: Project[] = [
  {
    "_id": "1edd4869-4ccf-44a7-832c-c073b98bc699",
    "description": "A streamlined employee time-tracking system that accurately records work hours, improves productivity, and ensures transparent payroll and reporting.",
    "featured": true,
    "githubUrl": null,
    "gradient": "from-sky-500 to-cyan-500",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-7feae5fda5ffa8751f0ac3cfd4a6c53ea3cebab5-2559x1273-png",
        "_type": "reference"
      }
    },
    "liveUrl": "https://hour-track-system.vercel.app/",
    "order": 1,
    "tags": [
      "Firebase",
      "Node.js",
      "Next JS",
      "Tailwind CSS"
    ],
    "title": "Employee Time Tracker",
    "category": "software",
    "internal": false,
    "problem": null,
    "solution": null,
    "features": [],
    "contribution": null,
    "challenges": [],
    "journey": null
  },
  {
    "_id": "3ce91704-2d1e-4d91-b0d7-2c12423ffe4b",
    "description": "A modern portfolio website with dark mode and animations.",
    "featured": true,
    "githubUrl": "https://github.com/Pawandeep16/advanced_legal_doc_analysis_tool",
    "gradient": "from-blue-500 to-indigo-500",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-03487c43f7ddefc33d563f03bcc3cb414c9bc557-8000x5333-webp",
        "_type": "reference"
      }
    },
    "liveUrl": "https://doc-analysis-tool.vercel.app/",
    "order": 1,
    "tags": [
      "React",
      "Framer Motion",
      "Tailwind CSS",
      "nodeJs",
      "API",
      "OPEN AI"
    ],
    "title": "Advanced Analysis Tool",
    "category": "software",
    "internal": false,
    "problem": null,
    "solution": null,
    "features": [],
    "contribution": null,
    "challenges": [],
    "journey": null
  },
  {
    "_id": "df1d5780-f6fe-4b39-b6a8-8718c4a0d777",
    "description": "A comprehensive web application that combines a robust e-commerce platform with a global COVID-19 patient tracking dashboard",
    "featured": false,
    "githubUrl": "https://github.com/Pawandeep16",
    "gradient": "from-purple-500 to-pink-500",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-0b5b69d26d37710ce29bf851fa46eda64d5fd3da-300x168-jpg",
        "_type": "reference"
      }
    },
    "liveUrl": "https://tracker-6f237.web.app/",
    "order": 1,
    "tags": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma"
    ],
    "title": "Covid-19 Tracker",
    "category": "software",
    "internal": false,
    "problem": null,
    "solution": null,
    "features": [],
    "contribution": null,
    "challenges": [],
    "journey": null
  },
  {
    "_id": "df78dd88-6af1-4699-ac20-c4b3ca798fd1",
    "description": "A modern portfolio website with dark mode and animations.",
    "featured": true,
    "githubUrl": "https://github.com/Pawandeep16",
    "gradient": "from-blue-900 to-cyan-500",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-06745a20d9756b11686c9dc77e40745c78e5c5a9-1731x980-jpg",
        "_type": "reference"
      }
    },
    "liveUrl": "https://pawandeep-portfolio.vercel.app/",
    "order": 3,
    "tags": [
      "nextJS,",
      " Framer Motion",
      "Tailwind CSS",
      "Email Js"
    ],
    "title": "Portfolio Website",
    "category": "design",
    "internal": false,
    "problem": null,
    "solution": null,
    "features": [],
    "contribution": null,
    "challenges": [],
    "journey": null
  },
  {
    "_id": "70e22a4c-cbb3-4bc3-98d3-ea6105d0c864",
    "description": "A Full Stack Application which is the Replica of the Amazon.",
    "featured": false,
    "githubUrl": "https://github.com/Pawandeep16",
    "gradient": "from-yellow-500 to-orange-500",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-b51001b49dc9d404d933d12aac8c24df5fa9d59c-512x250-png",
        "_type": "reference"
      }
    },
    "liveUrl": "https://amazoon-1325.web.app/",
    "order": 4,
    "tags": [
      "React",
      " Ant Icons",
      "Firebase",
      "Socket.io",
      "Node.js",
      "Redux JS"
    ],
    "title": "Amazon Clone",
    "category": "software",
    "internal": false,
    "problem": null,
    "solution": null,
    "features": [],
    "contribution": null,
    "challenges": [],
    "journey": null
  },
  {
    "_id": "d4ecd318-0056-48b1-b380-74673f427fdc",
    "description": "A Full Stack Application for educational institutions with real-time features.",
    "featured": true,
    "githubUrl": "https://github.com/Pawandeep16",
    "gradient": "from-green-900 to-teal-500",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-96de2886322ee325d84bc6ce5ca544152c62daf4-310x163-jpg",
        "_type": "reference"
      }
    },
    "liveUrl": "https://guru.gndec.ac.in/guru/",
    "order": 5,
    "tags": [
      "Frappe Frame Work",
      "LInux",
      "HTML",
      "SCSS",
      "Funnel",
      "JIRA",
      "Javascript"
    ],
    "title": "ERP Next - Educational Institute Application",
    "category": "software",
    "internal": false,
    "problem": null,
    "solution": null,
    "features": [],
    "contribution": null,
    "challenges": [],
    "journey": null
  },
  {
    "_id": "005f2cfe-e5c5-4978-bd26-9f0865dc8841",
    "description": "Manage college events efficiently with real-time notifications.",
    "featured": true,
    "githubUrl": "https://github.com/Pawandeep16/Major-Project-EventManager",
    "gradient": "from-pink-500 to-red-500",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-27745a87f721654755257bce1013485472ec95db-1280x720-png",
        "_type": "reference"
      }
    },
    "liveUrl": "https://chaterr.netlify.app/",
    "order": 7,
    "tags": [
      "ReactNative",
      "Node.js",
      "Firebase",
      "Push Notificatiosn",
      "Netlify"
    ],
    "title": "Event Notifier - College Project",
    "category": "software",
    "internal": false,
    "problem": null,
    "solution": null,
    "features": [],
    "contribution": null,
    "challenges": [],
    "journey": null
  }
];

export const fallbackCertifications: Certification[] = [
  {
    "_id": "a794bf05-6ed6-43bc-9505-71ca2f0d1f43",
    "badgeColor": "bg-[#0EA5E9]/10 text-[#0EA5E9]",
    "credentialUrl": "https://gndec.ac.in/",
    "date": "2023-04-01",
    "description": "Comprehensive training in building modern web applications using HTML, CSS, JavaScript, Node.js, Express, React, and MongoDB. Included hands-on projects and version control with Git.",
    "gradient": "from-sky-500 to-cyan-500",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-0410f7d3df4979b9457d979aaef043f77b6b8a00-1056x814-png",
        "_type": "reference"
      }
    },
    "issuer": "Punjab Technical Uiversity",
    "skills": [
      "HTML",
      "CSS",
      "JS",
      "React",
      " Node.js",
      "MongoDB"
    ],
    "title": "Full Stack Development using Web Technologies"
  },
  {
    "_id": "8b549b1a-3821-4822-a93c-c09f8313a30b",
    "badgeColor": "bg-[#f89820]/10 text-[#f89820]",
    "credentialUrl": "https://www.iitb.ac.in/",
    "date": "2023-03-04",
    "description": "Trained in object-oriented programming with Java, covering core concepts, data structures, exception handling, GUI development, and file I/O.",
    "gradient": "from-yellow-600 to-orange-400",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-c2a2f552da294e489a1a697ebbf7856f5a06e5f6-1120x794-png",
        "_type": "reference"
      }
    },
    "issuer": "IIT BOMBAY",
    "skills": [
      "Java",
      "SpringBoot",
      "OOPS",
      "Swing",
      "Exception Handling"
    ],
    "title": "Java Development"
  },
  {
    "_id": "67819f85-aa15-4cf2-bcc1-ae9b4b569c87",
    "badgeColor": "bg-[#3DDC84]/10 text-[#3DDC84]",
    "credentialUrl": "https://trainings.internshala.com/verify_certificate",
    "date": "2020-05-31",
    "description": "Hands-on training in developing Android applications using Java and XML. Covered UI components, activity lifecycle, backend integration, and deployment to the Play Store.",
    "gradient": "from-green-500 to-emerald-500",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-1727f5fab6c2e2cc891aebfb84407506acec722b-1119x791-png",
        "_type": "reference"
      }
    },
    "issuer": "InternShalla Training",
    "skills": [
      "Android",
      "Kotlin",
      "Java",
      "Mobile UI Design",
      "Firebase"
    ],
    "title": "Android Application Development"
  },
  {
    "_id": "8ec08fb0-e86e-4b10-82df-3a7efbe75015",
    "badgeColor": "bg-[#6366F1]/10 text-[#6366F1]",
    "credentialUrl": "https://www.iitb.ac.in/",
    "date": " 2021-06-15",
    "description": "Learned to use LaTeX for structured academic and technical documentation including mathematical typesetting, tables, citations, and document classes.",
    "gradient": "from-indigo-500 to-violet-500",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-3ba1d10c7d65a3c4db8cbce93eb49cfbea8a8c56-1123x794-png",
        "_type": "reference"
      }
    },
    "issuer": "IIT BOMBAY",
    "skills": [
      "LaTeX",
      "Document Formatting",
      "Scientific Writing"
    ],
    "title": "LaTeX for Scientific Writing"
  }
];

export const fallbackGallery: Artwork[] = [
  {
    "_id": "7ff2e6fa-0d44-4d77-8a42-12c3616a4428",
    "category": [
      "digital-art",
      "illustration",
      "ui-ux",
      "print-design"
    ],
    "client": "Art",
    "description": "Potrairt fo sahib Shri Guru Hargobind Sahib Ji",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-a171420216d22984f7e6d1e5978e5ee3013e1a9f-3217x4060-png",
        "_type": "reference"
      }
    },
    "imageHeight": 4060,
    "imageWidth": 3217,
    "order": 1,
    "tags": null,
    "title": "Potrairt",
    "tools": [
      "Illustrator ",
      "Photoshop"
    ],
    "year": "2020"
  },
  {
    "_id": "bd5c6a9e-ef14-45ed-ae96-9b41e9194d4a",
    "category": [
      "digital-art",
      "illustration"
    ],
    "client": null,
    "description": "Digital portrait of Arthur Shelby form Peaky Blinders",
    "featured": true,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-8a505e9d7393f779c6b6626187dd53f8af8337f9-2500x1667-png",
        "_type": "reference"
      }
    },
    "imageHeight": 1667,
    "imageWidth": 2500,
    "order": 1,
    "tags": [
      "Illustrator",
      "Artwork"
    ],
    "title": "Portrait",
    "tools": null,
    "year": "2020"
  },
  {
    "_id": "bd515c82-0037-4ede-8e16-33d9ef7b4c73",
    "category": [
      "digital-art",
      "photography",
      "branding",
      "print-design"
    ],
    "client": "Sarah Asare",
    "description": "A timeless and elegant wedding card design crafted to beautifully capture the essence of love and celebration.",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-f65efdd511b4cb125cf4fe1588e129282d1308ab-3084x2392-png",
        "_type": "reference"
      },
      "crop": {
        "_type": "sanity.imageCrop",
        "bottom": 0,
        "left": 0,
        "right": 0,
        "top": 0.12545810960538653
      },
      "hotspot": {
        "_type": "sanity.imageHotspot",
        "height": 0.8745418903946135,
        "width": 1,
        "x": 0.5,
        "y": 0.5627290548026933
      }
    },
    "imageHeight": 2392,
    "imageWidth": 3084,
    "order": 2,
    "tags": [
      "Digital Design"
    ],
    "title": "Wedding Card Design",
    "tools": [
      "Illustrator ",
      "Photoshop"
    ],
    "year": "2025"
  },
  {
    "_id": "8ed52c6d-319c-492b-a8ef-8f41c6043991",
    "category": [
      "digital-art",
      "illustration"
    ],
    "client": "Art",
    "description": "Emma Watson in beautiful lovely environment, with flowers in hairs",
    "featured": true,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-be5ec08c89ecb09001ddc26fa3f546e794db6b76-5980x3701-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 3701,
    "imageWidth": 5980,
    "order": 3,
    "tags": [
      "Illustrator"
    ],
    "title": "Portrait",
    "tools": [
      "Adobe Illustator "
    ],
    "year": "2018"
  },
  {
    "_id": "cb9907ca-da96-4482-91d4-2863d4ecb525",
    "category": [
      "digital-art",
      "illustration",
      "print-design"
    ],
    "client": "Art",
    "description": "Portrait of Harley Quin form DC universe.",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-c83c7aec0ecb457bc63f527214e18164f306c406-3034x3825-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 3825,
    "imageWidth": 3034,
    "order": 4,
    "tags": [
      "Illustrator"
    ],
    "title": "Portrait",
    "tools": [
      "Illustrator ",
      ""
    ],
    "year": "2018"
  },
  {
    "_id": "47f2f9c9-8f1d-4be3-839f-c0ef52093237",
    "category": [
      "digital-art",
      "illustration"
    ],
    "client": "Art",
    "description": "Portrait of Anne Marie in a stunning pose",
    "featured": true,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-694f4d5833973c411d1311975ef91cf68ba57ce6-4466x8022-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 8022,
    "imageWidth": 4466,
    "order": 5,
    "tags": [
      "Illustrator"
    ],
    "title": "Portrait",
    "tools": [
      "Adobe Illustator "
    ],
    "year": "2019"
  },
  {
    "_id": "820258dc-b450-4a01-8018-3470c165e715",
    "category": [
      "digital-art",
      "photography",
      "illustration",
      "print-design"
    ],
    "client": "Art",
    "description": "Beautiful Landsacpe poteraying a Punjabi girl in beautiful suit.",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-8fa0dc0c6810004bd6f326f273a615908b3bfea9-3961x2627-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 2627,
    "imageWidth": 3961,
    "order": 6,
    "tags": null,
    "title": "Landscape",
    "tools": [
      "Illustrator ",
      "Photoshop"
    ],
    "year": "2022"
  },
  {
    "_id": "b9731d9a-aae4-4ca4-a401-8b56a5ff7486",
    "category": [
      "digital-art",
      "photography",
      "illustration",
      "print-design"
    ],
    "client": "Art",
    "description": "Artwork of Billie Eilish\n",
    "featured": true,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-74b85672e8e8124efc9d0bb6130876fd1b98061f-4228x2160-png",
        "_type": "reference"
      }
    },
    "imageHeight": 2160,
    "imageWidth": 4228,
    "order": 6,
    "tags": [
      "Photoshop",
      "Illustrator"
    ],
    "title": "Artwork",
    "tools": [
      "Illustrator",
      "Photoshop"
    ],
    "year": "2021"
  },
  {
    "_id": "eed0ada8-17aa-48e2-94b9-8cec82a9f66c",
    "category": [
      "digital-art",
      "photography",
      "illustration"
    ],
    "client": "Art",
    "description": "Artowork of a Punjabi Singer Tarsem Jassar",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-3bbe585208f2e891d26e16b7c3ab9f46bca13076-3188x3632-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 3632,
    "imageWidth": 3188,
    "order": 8,
    "tags": [
      "Digital Design",
      "Artwork",
      ""
    ],
    "title": "Artwork",
    "tools": [
      "Illustrator ",
      "Photoshop"
    ],
    "year": "2020"
  },
  {
    "_id": "5a641ab2-b518-42d6-a794-953b41f3a55a",
    "category": [
      "digital-art",
      "photography",
      "illustration",
      "print-design"
    ],
    "client": "Art",
    "description": "Drawing an Imagination Landscape poteraying a man and women thoughts",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-32880b5bfe1922c2a2e2618382cb233eea034d44-5148x3411-jpg",
        "_type": "reference"
      },
      "crop": {
        "_type": "sanity.imageCrop",
        "bottom": 0.052159645392714026,
        "left": 0,
        "right": 0,
        "top": 0
      },
      "hotspot": {
        "_type": "sanity.imageHotspot",
        "height": 0.947840354607286,
        "width": 1,
        "x": 0.5,
        "y": 0.473920177303643
      }
    },
    "imageHeight": 3411,
    "imageWidth": 5148,
    "order": 9,
    "tags": [
      "Illustrator",
      "Artwork",
      "digital Design"
    ],
    "title": "Artwork",
    "tools": [
      "Illustrator ",
      "Photoshop"
    ],
    "year": "2018"
  },
  {
    "_id": "03e91c79-29f6-4b1e-9adf-bd85cbd34623",
    "category": [
      "digital-art",
      "illustration",
      "print-design"
    ],
    "client": null,
    "description": "Portrait of Sahib Shri Guru Nanak Dev Ji ",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-ffc1b4faa2ffc8bafbc4d0098a54c12431d34b1f-1920x1080-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 1080,
    "imageWidth": 1920,
    "order": 10,
    "tags": [
      "Illustrator"
    ],
    "title": "Religious",
    "tools": [
      "Illustrator "
    ],
    "year": "2018"
  },
  {
    "_id": "44fa053d-1cdd-497e-a840-ca2ecafb1102",
    "category": [
      "digital-art"
    ],
    "client": null,
    "description": null,
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-3101fcd136a7fee9762caacfa5a94ed40937a405-11503x16406-jpg",
        "_type": "reference"
      },
      "crop": {
        "_type": "sanity.imageCrop",
        "bottom": 0.025250552978611323,
        "left": 0.03201188188229652,
        "right": 0.18806980605849197,
        "top": 0.00635947273249768
      },
      "hotspot": {
        "_type": "sanity.imageHotspot",
        "height": 0.968389974288891,
        "width": 0.7799183120592115,
        "x": 0.42197103791190227,
        "y": 0.4905544598769432
      }
    },
    "imageHeight": 16406,
    "imageWidth": 11503,
    "order": 10,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "5dc65c2d-6635-486d-b2e1-b726e17adfdb",
    "category": [
      "digital-art",
      "photography",
      "illustration"
    ],
    "client": null,
    "description": "gta",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-44ea79247ea6951cfa7702eb05333d7aede60309-3608x2155-png",
        "_type": "reference"
      }
    },
    "imageHeight": 2155,
    "imageWidth": 3608,
    "order": 10,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "5ea72db0-24c5-4497-a186-76c962cb9be5",
    "category": [
      "branding",
      "web-design",
      "print-design"
    ],
    "client": "Sekhon",
    "description": "Logo Design",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-3f7383d5b08b29546044d2b4583a909f7654fa46-5241x5095-png",
        "_type": "reference"
      }
    },
    "imageHeight": 5095,
    "imageWidth": 5241,
    "order": 10,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "77aa173d-262c-4005-8fa9-367f7c3e5a0c",
    "category": [
      "digital-art",
      "illustration"
    ],
    "client": null,
    "description": "Logo Design",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-a1c876bd5df63e05fda66892598f3a7b4df2386c-1482x1539-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 1539,
    "imageWidth": 1482,
    "order": 10,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "81426eee-36cb-44af-91f4-21f3a6b263ab",
    "category": null,
    "client": "Art",
    "description": "artowkr of amazon",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-a666f6439f72decd9af1477c2885348bc2652ec4-4267x3193-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 3193,
    "imageWidth": 4267,
    "order": 10,
    "tags": [
      "Photoshop"
    ],
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "8763275c-9039-48d7-9591-dfb1961c504e",
    "category": [
      "digital-art",
      "illustration"
    ],
    "client": "Art",
    "description": "Punjabi Culture",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-f4f7b0f5b5e526eadc765d4db5ce5e4ccea4e0c0-12851x8943-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 8943,
    "imageWidth": 12851,
    "order": 10,
    "tags": [
      "Photoshop"
    ],
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "9043db6c-9b1f-4a76-b2c0-0004dad68d43",
    "category": [
      "digital-art",
      "illustration",
      "print-design"
    ],
    "client": "Art",
    "description": "Ragnar Lauthbrook",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-a235e286beade234e31aa6f3a4a695521da46e79-2538x3241-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 3241,
    "imageWidth": 2538,
    "order": 10,
    "tags": [
      "Photoshop"
    ],
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "99f6819c-5906-4794-b08b-93a76cc70813",
    "category": [
      "digital-art",
      "photography",
      "print-design"
    ],
    "client": "Art",
    "description": "Romance in Night ",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-d12e81ef28811b8155576bcc3a4d94b685b5a229-3816x2153-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 2153,
    "imageWidth": 3816,
    "order": 10,
    "tags": null,
    "title": "artwork",
    "tools": [
      "Illustrator ",
      "Photoshop"
    ],
    "year": "2018"
  },
  {
    "_id": "a67cd832-df39-4945-bd01-73788d2bd729",
    "category": [
      "digital-art",
      "illustration"
    ],
    "client": "Art",
    "description": "Potrait ",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-4365a115dde164d15e4e2b935b6484aedfe93114-1973x1926-png",
        "_type": "reference"
      }
    },
    "imageHeight": 1926,
    "imageWidth": 1973,
    "order": 10,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "b781de88-c2ec-42ff-b415-d963374608fa",
    "category": [
      "digital-art",
      "illustration",
      "ui-ux"
    ],
    "client": "Art",
    "description": "Artwork of a Punjabi Singer Nimrat Kehra  ",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-6ee116764a141c5ddc6747d65e056803f54003fa-3946x2232-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 2232,
    "imageWidth": 3946,
    "order": 10,
    "tags": null,
    "title": "Artwork",
    "tools": [
      "Adobe Illustator ",
      "Photoshop"
    ],
    "year": "2019"
  },
  {
    "_id": "cbb8eb7c-6216-4372-bab3-94aea0a7844a",
    "category": [
      "digital-art",
      "illustration"
    ],
    "client": null,
    "description": null,
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-8a528c3b72c2ea68dadcc7a7f45e4ea116b5328e-1798x992-jpg",
        "_type": "reference"
      },
      "crop": {
        "_type": "sanity.imageCrop",
        "bottom": 0.023388071173223182,
        "left": 0.011059907834101376,
        "right": 0,
        "top": 0
      },
      "hotspot": {
        "_type": "sanity.imageHotspot",
        "height": 0.9766119288267768,
        "width": 0.9889400921658986,
        "x": 0.5055299539170507,
        "y": 0.4883059644133884
      }
    },
    "imageHeight": 992,
    "imageWidth": 1798,
    "order": 10,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "e2fcbbe5-1a38-4dfa-9914-7773281198a1",
    "category": [
      "digital-art"
    ],
    "client": null,
    "description": "jack the sarrow\n",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-472412c812e892d0588223b6ad88bc2dd9bf2fb7-7995x4936-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 4936,
    "imageWidth": 7995,
    "order": 10,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "3c81bea1-b40e-4149-ac51-b9b9a53d66a1",
    "category": [
      "digital-art",
      "illustration",
      "print-design"
    ],
    "client": "Art",
    "description": "Landscape of beautiful environmenr",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-700e396fed7e7d5fd3ae115ccf49fa2c8b31ae2f-2639x3508-png",
        "_type": "reference"
      },
      "crop": {
        "_type": "sanity.imageCrop",
        "bottom": 0,
        "left": 0.06669738208737629,
        "right": 0,
        "top": 0
      },
      "hotspot": {
        "_type": "sanity.imageHotspot",
        "height": 1,
        "width": 0.9333026179126237,
        "x": 0.5333486910436881,
        "y": 0.5
      }
    },
    "imageHeight": 3508,
    "imageWidth": 2639,
    "order": 11,
    "tags": [
      "Illustrator"
    ],
    "title": "LandScape",
    "tools": [
      "Illustrator ",
      "Photoshop"
    ],
    "year": "2023"
  },
  {
    "_id": "1d2d6678-49be-4d79-80a4-cd668150d66d",
    "category": [
      "digital-art",
      "photography",
      "illustration"
    ],
    "client": "Art",
    "description": "Sunset with love ",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-e8143373c578891985ca92bd0676cdaf77250df9-2290x2320-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 2320,
    "imageWidth": 2290,
    "order": 12,
    "tags": null,
    "title": "love Birds",
    "tools": [
      "Illustrator "
    ],
    "year": "2018"
  },
  {
    "_id": "74c4b87f-cc79-44ed-87ab-05a37acf5cc3",
    "category": [
      "digital-art",
      "illustration",
      "print-design"
    ],
    "client": "Art",
    "description": "bahngra step design",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-2b8b50c521ca9076bda99c4eee696dcfd0774246-1859x2929-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 2929,
    "imageWidth": 1859,
    "order": 13,
    "tags": null,
    "title": "design",
    "tools": [
      "Illustrator ",
      "Photoshop"
    ],
    "year": "2018"
  },
  {
    "_id": "dd07bd5b-aeb8-4ce1-9e3b-a65987366da8",
    "category": [
      "digital-art",
      "photography",
      "illustration"
    ],
    "client": null,
    "description": "Gorgeous Gidha girl Posing for a photo",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-50d4cea37e6741d943f36d2d3fcfd3ff624ba156-6738x3935-png",
        "_type": "reference"
      }
    },
    "imageHeight": 3935,
    "imageWidth": 6738,
    "order": 13,
    "tags": [
      "Illustrator"
    ],
    "title": "Gidha Girl",
    "tools": null,
    "year": "2022"
  },
  {
    "_id": "2c810562-b1c0-4fb8-8f81-ee33b623b0ec",
    "category": [
      "digital-art",
      "illustration"
    ],
    "client": "Art",
    "description": "game of thrones",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-583cf7eee8d25e025f11885d933ecc4ed11666de-5994x3746-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 3746,
    "imageWidth": 5994,
    "order": 15,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "c62089b4-c962-4aad-8642-fa8ba45409cd",
    "category": [
      "digital-art",
      "illustration",
      "print-design"
    ],
    "client": "Art",
    "description": "Design for a bhangra group",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-151d0cb1072f41564d60e0b4edde26cbb72b8cb6-11020x7659-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 7659,
    "imageWidth": 11020,
    "order": 15,
    "tags": [
      "Illustrator"
    ],
    "title": "Artwork",
    "tools": [
      "Illustrator ",
      "Photoshop"
    ],
    "year": "2020"
  },
  {
    "_id": "1483c3b8-2fea-458d-9448-0b59f200a0ff",
    "category": [
      "digital-art"
    ],
    "client": "Art",
    "description": "Karna Aujla Artwork",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-17e5c4a2d02c1ab5fd6cc19af5a9e2d27a3463cb-2856x2297-jpg",
        "_type": "reference"
      },
      "crop": {
        "_type": "sanity.imageCrop",
        "bottom": 0,
        "left": 0.008774266218971411,
        "right": 0,
        "top": 0.005454700417625501
      },
      "hotspot": {
        "_type": "sanity.imageHotspot",
        "height": 0.9945452995823745,
        "width": 0.9912257337810286,
        "x": 0.5043871331094857,
        "y": 0.5027273502088128
      }
    },
    "imageHeight": 2297,
    "imageWidth": 2856,
    "order": 16,
    "tags": [
      "Photoshop"
    ],
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "02c820d2-9745-4781-b4bb-a0567a9f38e9",
    "category": [
      "digital-art",
      "illustration"
    ],
    "client": "Art",
    "description": null,
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-d00648bc3a3dbd466bcbdc6f0730672f4628c45a-4910x6857-png",
        "_type": "reference"
      }
    },
    "imageHeight": 6857,
    "imageWidth": 4910,
    "order": 20,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2022"
  },
  {
    "_id": "5bdb071f-1b93-49f9-aaf8-40aefa3ba4a0",
    "category": [
      "ui-ux",
      "print-design"
    ],
    "client": "Art",
    "description": "logo",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-eb6d15e9ea9f22ac59e45b55221bd9a274e9b3b0-1956x1487-png",
        "_type": "reference"
      }
    },
    "imageHeight": 1487,
    "imageWidth": 1956,
    "order": 20,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "92e3efd8-f80d-4134-9404-775465ee2f0b",
    "category": [
      "digital-art"
    ],
    "client": "Art",
    "description": "Amrinder Gill",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-af23772d791b6de0df07eec253d8b88287a492c8-3972x2626-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 2626,
    "imageWidth": 3972,
    "order": 20,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  },
  {
    "_id": "9a60ffe3-52f0-4e28-8f26-2d4d6d6fc8b7",
    "category": [
      "digital-art",
      "illustration"
    ],
    "client": "Art",
    "description": null,
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-5f0c850dc69597d002001b72b4b5a9805bf2800e-3005x3017-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 3017,
    "imageWidth": 3005,
    "order": 20,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2022"
  },
  {
    "_id": "aaa23634-6d2a-428a-bf54-ae1346792ef1",
    "category": [
      "digital-art",
      "illustration",
      "print-design"
    ],
    "client": "Art",
    "description": null,
    "featured": true,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-e62e2f42aee4b37c0091b31a8fc402f5da9fcc14-2930x2936-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 2936,
    "imageWidth": 2930,
    "order": 20,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2022"
  },
  {
    "_id": "d7624571-8ea7-4222-b8a4-4a6a2223a34d",
    "category": [
      "digital-art",
      "illustration"
    ],
    "client": "Art",
    "description": "Hercules",
    "featured": false,
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-ed1298697a09e17179ee0d9a792302e573b6e255-2572x1430-jpg",
        "_type": "reference"
      }
    },
    "imageHeight": 1430,
    "imageWidth": 2572,
    "order": 20,
    "tags": null,
    "title": "Artwork",
    "tools": null,
    "year": "2021"
  }
];

export const fallbackTestimonials: Testimonial[] = [
  {
    "_id": "601dddaf-2402-4be2-8d43-da287074f100",
    "company": "Glasgow Caledonian University",
    "content": "\"Working with Pawandeep was an absolute pleasure. Their attention to detail and creative solutions helped transform our vision into reality.\"",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-00f5f6b2949ee03cefe3d2b6a5a82a762b2cb687-800x800-jpg",
        "_type": "reference"
      }
    },
    "name": "Sukhjit Singh Ahluwalia",
    "order": 1,
    "rating": 5,
    "role": "Professor"
  },
  {
    "_id": "37a7779c-aea0-47c9-b5e1-3b47e043f57e",
    "company": "CBC",
    "content": "Exceptional design skills and a great eye for aesthetics. Pawandeep consistently delivered beyond our expectations.",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-c11c1d6066c9f171fef4bd8ba9d7cc49d5564d8a-800x800-jpg",
        "_type": "reference"
      }
    },
    "name": "Manjodh Singh Saran",
    "order": 2,
    "rating": 4,
    "role": "Senior Full Satck Developer"
  },
  {
    "_id": "7e2ac5fb-49a0-45d6-b2f8-61831d21e28e",
    "company": "Honda Motors",
    "content": "\"A talented developer who brings both technical expertise and creative flair to every project. It was a joy collaborating with them.\"",
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-4c892af95b53d619f2863cc25b3d8afa76eabc62-800x800-jpg",
        "_type": "reference"
      }
    },
    "name": "Pooja Rani",
    "order": 3,
    "rating": 5,
    "role": "Executive"
  }
];

export const fallbackSocialLinks: SocialLink[] = [
  {
    "_id": "f37cc9f6-8e1a-490b-b6ff-b0520b5b06f1",
    "bgColor": "hover:bg-gradient-to-r from-gray-700 via-gray-900 to-black/80",
    "color": "hover:text-white",
    "icon": "Github",
    "name": "Github",
    "order": 1,
    "url": "https://github.com/Pawandeep16"
  },
  {
    "_id": "20aa92dd-5843-4190-b8be-8078289ec827",
    "bgColor": "hover:bg-[#0077B5]/10",
    "color": "hover:text-[#0077B5]",
    "icon": "LinkedIn",
    "name": "LinkedIn",
    "order": 2,
    "url": "https://www.linkedin.com/in/pawandeep-thandi-2432031ab/"
  },
  {
    "_id": "6e274d2c-64fd-456e-9b2d-527a934d547b",
    "bgColor": "hover:bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600/20",
    "color": "hover:text-pink-500",
    "icon": "Instagram",
    "name": "Instagram",
    "order": 3,
    "url": "https://www.instagram.com/thandipawandeep16/"
  }
];

