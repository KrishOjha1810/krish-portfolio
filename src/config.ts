// ============================================================================
// SITE CONFIG: edit everything about you here in one place.
// ============================================================================

export const SITE = {
  name: 'Krish Ojha',
  firstName: 'krish',
  title: 'Full-Stack & Web3 Engineer',
  // Hero one-liner (left of the contact button)
  heroBlurb: 'full-stack engineer building cross-chain infrastructure, smart contracts, and Rust backends',
  location: 'Indore, India',

  // ---- CONTACT --------------------------------------------------------------
  email: '11krishojha08@gmail.com',
  github: 'https://github.com/KrishOjha1810',
  githubUser: 'KrishOjha1810',
  linkedin: 'https://www.linkedin.com/in/krish-ojha/',
  leetcode: 'https://leetcode.com/u/KrishOjha_1810/',
  leetcodeUser: 'KrishOjha_1810',

  // ---- HERO PHOTO -----------------------------------------------------------
  // Drop your photo into /public (e.g. public/krish.jpg) and set the path here.
  // A styled monogram placeholder shows until then.
  // heroVisual: 'monogram' | 'photo' | 'avatar' | 'pro-avatar'
  heroVisual: 'pro-avatar' as 'monogram' | 'photo' | 'avatar' | 'pro-avatar',
  photo: '/krish-hero.jpg',
  // Pixel-art PFP (DiceBear). Tweak seed / glasses / beard / mouth / colors in the URL.
  avatarUrl:
    'https://api.dicebear.com/9.x/pixel-art/svg?seed=KrishO&glasses=dark02&glassesProbability=100&mouth=happy01&beardProbability=0&hair=short02&hairColor=2c1b18&skinColor=eeb592&backgroundColor=8b7fd6',
  // false = framed photo card (works with any normal photo).
  // true  = floating cut-out (use only for a transparent-background PNG).
  photoCutout: false,
  // object-position for the framed photo (bias toward the face).
  photoFocus: '42% 22%',
} as const

// Scroll-reveal bio paragraph (About section)
export const ABOUT_TEXT =
  "I'm a full-stack engineer with a strong focus on Web3. Over the past year, I've worked on production smart contracts, Rust and Node backends, and cross-chain infrastructure spanning 20+ bridges across EVM, Cosmos, and Move ecosystems. My B.Tech in Computer Science & Data Science sits at the intersection of protocol engineering, backend systems, and data. I enjoy digging into systems from first principles, especially when the contract tells a clearer story than the documentation."

// ---- TECH MARQUEE -----------------------------------------------------------
export const MARQUEE_ROW_1 = [
  'Solidity', 'Rust', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Foundry', 'Python', 'Docker', 'Axum', 'MongoDB',
]
export const MARQUEE_ROW_2 = [
  'Smart Contracts', 'Cross-Chain', 'LayerZero', 'DeFi', 'Account Abstraction', 'ETL Pipelines', 'Microservices', 'Permit2', 'Uniswap V3', 'RFQ', 'MEV-aware',
]

// ---- EXPERTISE (numbered list) ---------------------------------------------
export const EXPERTISE = [
  {
    name: 'Smart Contracts & DeFi',
    desc: 'Building Solidity applications with Foundry and 95%+ test coverage. Experience with UniswapX-style reactors, Uniswap V3 concentrated liquidity, Permit2 flows, governance systems, and timelocks.',
  },
  {
    name: 'Cross-Chain Engineering',
    desc: 'LayerZero from the whitepaper to implementation. OFT, message lifecycle, and the oracle/relayer model. Bridge integrations and monitoring across EVM, Cosmos, and Move ecosystems.',
  },
  {
    name: 'Rust & Backend Systems',
    desc: 'Building Axum microservices around event-driven architectures, circuit breakers, idempotency, and retry mechanisms. Focused on reliable APIs and services that scale cleanly.',
  },
  {
    name: 'Full-Stack Development',
    desc: 'React and TypeScript front ends backed by Node/Express and Rust services. Experience with PostgreSQL and MongoDB schema design, indexing strategies, and query optimization.',
  },
  {
    name: 'Data & ML Foundations',
    desc: 'Python-based ETL pipelines using pandas and numpy, backed by machine learning and statistics fundamentals from a Computer Science & Data Science degree.',
  },
]

// ---- EXPERIENCE -------------------------------------------------------------
export const EXPERIENCE = {
  company: 'Ancilar',
  role: 'Associate System Analyst / Backend Developer',
  period: 'Feb 2025 - Present',
  place: 'Indore, India',
  bullets: [
    'Built backend microservices in Rust (Axum) and Node.js/TypeScript for distributed cross-chain transaction processing, quote lifecycles, and state management.',
    'Deployed and configured real-time monitoring agents for cross-chain transaction surveillance, identifying abnormal execution patterns and cross-chain risk vectors.',
    'Built and shipped production smart contracts in Solidity with Foundry, maintaining 95%+ test coverage for DeFi execution workflows.',
    'Integrated 20+ external bridge platforms with retry logic, idempotency, and real-time event-driven synchronization.',
    'Reduced database latency by 30-40% through query tuning, compound indexing, caching, and connection pooling.',
  ],
}

// ---- PROJECTS (sticky stacking cards) --------------------------------------
export type Project = {
  num: string
  category: string
  name: string
  blurb: string
  stack: string[]
  highlights: string[]
  liveUrl?: string
  repoUrl: string
  accent: string // gradient used on the visual panel
}

export const PROJECTS: Project[] = [
  {
    num: '01',
    category: 'AI · Backend',
    name: 'JobHunt',
    blurb:
      'A free, multi-user job-search engine. Upload a resume once and it aggregates roles from free sources, ranks them for real selection probability, tailors your resume per job, and pings you on Telegram, email or WhatsApp.',
    stack: ['FastAPI', 'Python', 'PostgreSQL', 'Groq / Llama 3.3', 'SQLAlchemy'],
    highlights: [
      'Aggregates 8+ free job sources into one fresh, deduplicated catalog',
      'Per-user preference model that learns from every applied / saved / dismissed action',
      'Per-job resume tailoring with ATS-safe DOCX export',
    ],
    liveUrl: 'https://jobhunt-8i1m.onrender.com',
    repoUrl: 'https://github.com/KrishOjha1810/jobhunt',
    accent: 'linear-gradient(135deg, #B600A8 0%, #7621B0 55%, #18011F 100%)',
  },
  {
    num: '02',
    category: 'Security · Dev Tools',
    name: 'PromptGuard',
    blurb:
      'A local-first MCP server, plus browser and VS Code extensions, that scans developer prompts for leaked secrets and PII, previews token cost, and tightens bloated prompts, entirely on your machine, with zero telemetry.',
    stack: ['TypeScript', 'Model Context Protocol', 'Node ≥20', 'js-tiktoken'],
    highlights: [
      '27 secret & PII patterns with Luhn / Verhoeff validation to kill false positives',
      'Token + dollar cost estimates across Claude and OpenAI models',
      'One detection engine behind MCP server, browser and VS Code extensions',
    ],
    repoUrl: 'https://github.com/KrishOjha1810/promptguard-mcp',
    accent: 'linear-gradient(135deg, #1E9E6A 0%, #0E5C7E 55%, #061726 100%)',
  },
  {
    num: '03',
    category: 'Smart Contracts',
    name: 'Solidity / Foundry Suite',
    blurb:
      'A collection of fully-tested on-chain systems built with Foundry: an NFT marketplace, a crowdfunding protocol, and on-chain games, each with deploy scripts, tests and CI.',
    stack: ['Solidity', 'Foundry', 'ERC-721 / ERC-20', 'CI'],
    highlights: [
      'NFT marketplace: list, buy and manage ERC-721 listings with full test coverage',
      'Crowdfunding protocol with goal tracking, refunds and deploy scripts',
      'On-chain games: Bingo (ERC-20 game token) and a Decentralized Treasure Hunt',
    ],
    repoUrl: 'https://github.com/KrishOjha1810?tab=repositories',
    accent: 'linear-gradient(135deg, #BE4C00 0%, #7621B0 55%, #18011F 100%)',
  },
]

// ---- SKILLS (categorized grid) ---------------------------------------------
export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: 'Blockchain & Web3',
    items: ['Solidity', 'Foundry', 'Hardhat', 'LayerZero', 'UniswapX', 'Uniswap V3', 'Permit2', 'ERC-4337', 'OFT', 'EVM', 'MEV-aware', 'Tenderly'],
  },
  {
    group: 'Rust & Backend',
    items: ['Rust', 'Axum', 'Node.js', 'Express', 'TypeScript', 'REST APIs', 'Microservices', 'Event-Driven', 'JWT', 'Circuit Breakers'],
  },
  {
    group: 'Full-Stack',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'PostgreSQL', 'MongoDB', 'MySQL', 'Redux Toolkit'],
  },
  {
    group: 'Data & ML',
    items: ['Python', 'pandas', 'numpy', 'scikit-learn', 'ETL Pipelines', 'EDA', 'Feature Engineering'],
  },
  {
    group: 'Tooling',
    items: ['Docker', 'Git', 'GitHub', 'Postman', 'Vite', 'CI/CD', 'Linux'],
  },
]

// ---- MORE PROJECTS (grid below the featured stack) -------------------------
export type RepoCard = {
  name: string
  desc: string
  tags: string[]
  repoUrl: string
  liveUrl?: string
}

export const MORE_PROJECTS: RepoCard[] = [
  {
    name: 'WanderLust',
    desc: 'Airbnb-style stay listing & booking app with auth, Cloudinary uploads and Mapbox maps.',
    tags: ['Node', 'Express', 'MongoDB', 'EJS'],
    repoUrl: 'https://github.com/KrishOjha1810/WanderLust',
    liveUrl: 'https://hostlers.vercel.app',
  },
  {
    name: 'Analytics Dashboard',
    desc: 'Next.js App Router dashboard with theme toggle, stat cards and Chart.js visualisations.',
    tags: ['Next.js', 'TypeScript', 'Chart.js', 'Redux'],
    repoUrl: 'https://github.com/KrishOjha1810/Analytics-Dashboard',
  },
  {
    name: 'NFT Marketplace',
    desc: 'List, buy and manage ERC-721 listings, with Solidity contracts, tests and CI.',
    tags: ['Solidity', 'Foundry', 'ERC-721'],
    repoUrl: 'https://github.com/KrishOjha1810/nft-marketplace-foundry',
  },
  {
    name: 'Crowdfunding',
    desc: 'On-chain crowdfunding protocol with goal tracking, refunds, tests and a deploy script.',
    tags: ['Solidity', 'Foundry'],
    repoUrl: 'https://github.com/KrishOjha1810/crowdfunding-foundry',
  },
  {
    name: 'Bingo (on-chain)',
    desc: 'On-chain Bingo game: an ERC-20 game token, board logic and a fully tested contract.',
    tags: ['Solidity', 'Foundry', 'ERC-20'],
    repoUrl: 'https://github.com/KrishOjha1810/bingo-game-foundry',
  },
  {
    name: 'Treasure Hunt',
    desc: 'Decentralised on-chain treasure-hunt game smart contract, with tests.',
    tags: ['Solidity', 'Foundry'],
    repoUrl: 'https://github.com/KrishOjha1810/Decentralized-Tresure-Hunt-Foundry',
  },
  {
    name: 'Food Delivery',
    desc: 'Full-stack MERN food-delivery app: storefront, admin panel and ordering backend.',
    tags: ['React', 'Node', 'MongoDB', 'MERN'],
    repoUrl: 'https://github.com/KrishOjha1810/Food-Delivery',
  },
  {
    name: 'uBlog',
    desc: 'Full-stack blogging platform with auth and posts over an Express / MongoDB API.',
    tags: ['React', 'Express', 'MongoDB'],
    repoUrl: 'https://github.com/KrishOjha1810/uBlog',
    liveUrl: 'https://u-blog-mu.vercel.app',
  },
  {
    name: 'OFT Token Transfer',
    desc: 'LayerZero Omnichain Fungible Token: wrapped USDC transferred cross-chain across testnets.',
    tags: ['Solidity', 'LayerZero', 'OFT'],
    repoUrl: 'https://github.com/KrishOjha1810/OFT-Token-Transfer',
  },
  {
    name: 'Single-Tx NFT Minter',
    desc: 'Mint multiple NFTs in a single transaction, built with Solidity and Hardhat.',
    tags: ['Solidity', 'Hardhat', 'ERC-721'],
    repoUrl: 'https://github.com/KrishOjha1810/qlt-minter-single-tx',
  },
  {
    name: 'Book Barter',
    desc: 'Book store with catalog, cart, checkout, orders and an admin sales dashboard.',
    tags: ['MERN', 'Firebase'],
    repoUrl: 'https://github.com/KrishOjha1810/Book-Barter',
  },
  {
    name: 'WeatherWise',
    desc: 'React weather app for current conditions and daily forecasts.',
    tags: ['React', 'Vite', 'MUI'],
    repoUrl: 'https://github.com/KrishOjha1810/WeatherWise',
    liveUrl: 'https://weather-wise-five-iota.vercel.app',
  },
]

// ---- BEYOND THE CODE --------------------------------------------------------
export const BEYOND = {
  philosophy:
    "Outside of engineering, I follow the same process I use at work: practice, feedback, repeat. Staying active helps me think more clearly and stay consistent.",
  interests: [
    { title: 'Dance', blurb: 'Where rhythm, discipline and a bit of showmanship meet. My reset button after long build sessions.' },
    { title: 'Cricket', blurb: 'Strategy, timing and reading the game, the team sport I grew up on and still chase.' },
    { title: 'Badminton', blurb: 'Fast, reflex-heavy and endlessly competitive. Perfect for a quick high-intensity break.' },
  ],
}

// ---- EDUCATION --------------------------------------------------------------
export const EDUCATION = {
  school: 'Acropolis Institute of Technology and Research',
  degree: 'B.Tech, Computer Science & Data Science',
  period: 'Nov 2021 - May 2025',
  place: 'Indore, MP',
  score: '75.6%',
}
