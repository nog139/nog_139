export type Lang = "pt" | "en";

export const profile = {
  name: "Vinícius Nogueira",
  fullName: "Vinícius da Rocha Nogueira",
  email: "vininog139@gmail.com",
  linkedin: "https://www.linkedin.com/in/vin%C3%ADcius-nogueira139",
  location: "São Paulo, Brasil",
};

export type Job = {
  slug: string;
  company: string;
  role: Record<Lang, string>;
  period: Record<Lang, string>;
  summary: Record<Lang, string>;
  highlights: Record<Lang, string[]>;
  stack: string[];
};

export const jobs: Job[] = [
  {
    slug: "ux-group",
    company: "UX Group",
    role: { en: "Software Engineer", pt: "Engenheiro de Software" },
    period: { en: "Aug 2025 — Present", pt: "Ago 2025 — Atual" },
    summary: {
      en: "Designing and building high-performance iGaming platforms, leading the front-end of three brands.",
      pt: "Projeto e desenvolvo plataformas de iGaming de alta performance, liderando o front-end de três marcas.",
    },
    highlights: {
      en: [
        "Led the front-end creation of three brands: Reals, BingoBet and BetGo.",
        "Built two complete Sportsbooks from scratch — Reals and BetGo — fully integrated with Sportradar: events, markets, odds and betting flows.",
        "Worked on the backend real-time layer with NestJS and Socket.IO, streaming live odds and events to the front-end.",
        "Integrated gamification and betting systems such as Smartico and BetBy, contributing to backend services and APIs.",
        "Manage development tasks, run code reviews and approve pull requests to keep quality, consistency and scalability.",
        "Ship responsive, pixel-accurate interfaces from Figma with a focus on performance and maintainability.",
      ],
      pt: [
        "Liderei a criação do front-end de três marcas: Reals, BingoBet e BetGo.",
        "Construí dois Sportsbooks completos do zero — Reals e BetGo — integrados à Sportradar: eventos, mercados, odds e fluxos de aposta.",
        "Atuei no backend da camada em tempo real com NestJS e Socket.IO, transmitindo odds e eventos ao vivo para o front-end.",
        "Integrei sistemas de gamificação e apostas como Smartico e BetBy, contribuindo com serviços de backend e APIs.",
        "Gerencio tarefas, faço code reviews e aprovo pull requests garantindo qualidade, consistência e escalabilidade.",
        "Entrego interfaces responsivas e pixel-perfect a partir do Figma, com foco em performance e manutenibilidade.",
      ],
    },
    stack: ["React", "TypeScript", "Tailwind", "NestJS", "Socket.IO", "Node.js", "Sportradar", "Smartico", "BetBy", "Figma"],
  },
  {
    slug: "muevy",
    company: "Muevy",
    role: { en: "Software Engineer", pt: "Engenheiro de Software" },
    period: { en: "Jun 2024 — Aug 2025", pt: "Jun 2024 — Ago 2025" },
    summary: {
      en: "Cross-border payment solutions for Visa and Mastercard partners.",
      pt: "Soluções de pagamento cross-border para parceiros Visa e Mastercard.",
    },
    highlights: {
      en: [
        "Worked on cross-border payment solutions for Visa and Mastercard partners.",
        "Designed secure architectures using mTLS, MLE and PCI DSS compliance.",
        "Built services across Node.js and Java (Quarkus) with React front-ends, deployed on AWS with Docker.",
      ],
      pt: [
        "Atuei em soluções de pagamento cross-border para parceiros Visa e Mastercard.",
        "Projetei arquiteturas seguras com mTLS, MLE e conformidade PCI DSS.",
        "Desenvolvi serviços em Node.js e Java (Quarkus) com front-ends em React, publicados na AWS com Docker.",
      ],
    },
    stack: ["Node.js", "Java 11/17", "Quarkus", "React", "MySQL", "Prisma", "Maven", "Docker", "AWS"],
  },
  {
    slug: "fegit",
    company: "FegIT (BRETON)",
    role: { en: "Full Stack Developer", pt: "Desenvolvedor Full Stack" },
    period: { en: "Mar 2022 — Jun 2024", pt: "Mar 2022 — Jun 2024" },
    summary: {
      en: "Supplier Portal platform — scalable solutions and optimized workflows.",
      pt: "Plataforma Portal do Fornecedor — soluções escaláveis e fluxos otimizados.",
    },
    highlights: {
      en: [
        "Contributed to the Supplier Portal platform end to end.",
        "Developed scalable solutions and optimized workflows in a hybrid team.",
      ],
      pt: [
        "Contribuí de ponta a ponta com a plataforma Portal do Fornecedor.",
        "Desenvolvi soluções escaláveis e otimizei fluxos em um time híbrido.",
      ],
    },
    stack: ["AngularJS", "Node.js", "NestJS", "TypeScript", "Prisma", "AWS", "SQL Server", "MySQL"],
  },
  {
    slug: "itpower",
    company: "Itpower Software & Serviços",
    role: { en: "Full Stack Developer", pt: "Desenvolvedor Full Stack" },
    period: { en: "Mar 2021 — Jan 2022", pt: "Mar 2021 — Jan 2022" },
    summary: {
      en: "Started as Junior Front-End and got promoted to Full Stack.",
      pt: "Comecei como Front-End Júnior e fui promovido a Full Stack.",
    },
    highlights: {
      en: [
        "Promoted from Junior Front-End Developer to Full Stack Developer.",
        "Delivered for major clients such as SAS, AON and Zurich.",
      ],
      pt: [
        "Promovido de Desenvolvedor Front-End Júnior a Full Stack.",
        "Entregas para grandes clientes como SAS, AON e Zurich.",
      ],
    },
    stack: ["JavaScript", "HTML", "CSS", "SQL Server", "Python", "ColdFusion"],
  },
];

export type Project = {
  title: string;
  tag: Record<Lang, string>;
  description: Record<Lang, string>;
  stack: string[];
  hue: number;
  wide?: boolean;
  big?: boolean;
};

export const projects: Project[] = [
  {
    title: "Reals Sportsbook",
    tag: { en: "Sportsbook · built from scratch", pt: "Sportsbook · feito do zero" },
    description: {
      en: "A complete sportsbook front-end built from the ground up and integrated with Sportradar: live events, markets, real-time odds, bet slip and the whole betting UX.",
      pt: "Front-end de sportsbook completo, construído do zero e integrado à Sportradar: eventos ao vivo, mercados, odds em tempo real, bet slip e toda a UX de apostas.",
    },
    stack: ["React", "TypeScript", "Sportradar", "Socket.IO"],
    hue: 300,
    big: true,
  },
  {
    title: "BetGo Sportsbook",
    tag: { en: "Sportsbook · built from scratch", pt: "Sportsbook · feito do zero" },
    description: {
      en: "The second sportsbook built from zero — same real-time core, its own brand identity, layouts and flows, pixel-accurate from Figma.",
      pt: "O segundo sportsbook feito do zero — o mesmo núcleo em tempo real, com identidade, layouts e fluxos próprios da marca, pixel-perfect a partir do Figma.",
    },
    stack: ["React", "TypeScript", "Sportradar", "Socket.IO"],
    hue: 200,
    big: true,
  },
  {
    title: "Real-time backend",
    tag: { en: "Backend · WebSockets", pt: "Backend · WebSockets" },
    description: {
      en: "Backend work on the real-time layer with NestJS and Socket.IO — pushing live odds, markets and events to the sportsbooks as they change.",
      pt: "Atuação no backend da camada em tempo real com NestJS e Socket.IO — levando odds, mercados e eventos ao vivo para os sportsbooks no momento em que mudam.",
    },
    stack: ["NestJS", "Socket.IO", "Node.js", "TypeScript"],
    hue: 140,
    wide: true,
    big: true,
  },
  {
    title: "BingoBet",
    tag: { en: "iGaming brand", pt: "Marca iGaming" },
    description: {
      en: "Brand front-end with gamification powered by Smartico and sports betting by BetBy.",
      pt: "Front-end da marca com gamificação via Smartico e apostas esportivas via BetBy.",
    },
    stack: ["React", "BetBy", "Smartico"],
    hue: 30,
  },
  {
    title: "Cross-border Payments",
    tag: { en: "Fintech · Visa & Mastercard", pt: "Fintech · Visa & Mastercard" },
    description: {
      en: "Secure payment architecture with mTLS, message-level encryption and PCI DSS compliance.",
      pt: "Arquitetura de pagamentos segura com mTLS, criptografia em nível de mensagem e conformidade PCI DSS.",
    },
    stack: ["Java", "Quarkus", "Node.js", "AWS"],
    hue: 250,
  },
];

export const skills = [
  "React", "TypeScript", "Node.js", "NestJS", "Socket.IO", "Java", "Angular", "React Native", "Tailwind",
  "Prisma", "AWS", "Docker", "SQL Server", "MySQL", "Python", "SCSS", "Git", "Figma", "Quarkus",
];

export const psalm = {
  ref: { en: "Psalm 139:11–12", pt: "Salmos 139:11–12" },
  verse: {
    en: [
      "If I say, Surely the darkness shall cover me;",
      "even the night shall be light about me.",
      "Yea, the darkness hideth not from thee;",
      "but the night shineth as the day:",
      "the darkness and the light are both alike to thee.",
    ],
    pt: [
      "Se eu disser: “Certamente as trevas me encobrirão,",
      "e a luz ao meu redor se tornará noite”,",
      "nem mesmo as trevas serão escuras para ti;",
      "a noite brilhará como o dia,",
      "pois para ti as trevas são luz.",
    ],
  },
  hint: { en: "type 1 · 3 · 9", pt: "digite 1 · 3 · 9" },
  close: { en: "Close", pt: "Fechar" },
};

export const t = {
  nav: {
    about: { en: "About", pt: "Sobre" },
    work: { en: "Experience", pt: "Experiência" },
    projects: { en: "Projects", pt: "Projetos" },
    contact: { en: "Contact", pt: "Contato" },
  },
  hero: {
    hello: { en: "Hi, I'm", pt: "Oi, eu sou o" },
    role: { en: "Software Engineer", pt: "Engenheiro de Software" },
    tagline: {
      en: "I build fast, pixel-accurate interfaces and the systems behind them — from iGaming platforms to cross-border payments.",
      pt: "Construo interfaces rápidas e pixel-perfect e os sistemas por trás delas — de plataformas de iGaming a pagamentos internacionais.",
    },
    taglineGlow: { en: "the systems behind them", pt: "os sistemas por trás delas" },
    cta: { en: "Let's talk", pt: "Vamos conversar" },
    cv: { en: "See my work", pt: "Ver meu trabalho" },
    scroll: { en: "Scroll", pt: "Scroll" },
    status: { en: "Currently at UX Group", pt: "Atualmente na UX Group" },
  },
  about: {
    title: { en: "About", pt: "Sobre" },
    lead: {
      en: "Full stack developer passionate about crafting robust web apps with a strong focus on user experience.",
      pt: "Desenvolvedor full stack apaixonado por criar aplicações web robustas com forte foco em experiência do usuário.",
    },
    leadGlow: { en: "user experience", pt: "experiência do usuário" },
    body: {
      en: "I started programming in 2019 at the Barueri Technical Institute, and since then I've shipped software for insurance giants, fintechs moving money across borders and iGaming brands serving thousands of players. Today I lead front-end at UX Group, review code, mentor and keep pixels honest. I'm also finishing a degree in Systems Analysis at Universidade São Judas Tadeu (2027).",
      pt: "Comecei a programar em 2019 no Instituto Técnico de Barueri e, desde então, entreguei software para grandes seguradoras, fintechs que movimentam dinheiro entre países e marcas de iGaming com milhares de jogadores. Hoje lidero o front-end na UX Group, faço code review e cuido de cada pixel. Também estou concluindo Análise de Sistemas na Universidade São Judas Tadeu (2027).",
    },
    stats: [
      { value: "5+", label: { en: "years shipping", pt: "anos entregando" } },
      { value: "3", label: { en: "brands led", pt: "marcas lideradas" } },
      { value: "2", label: { en: "sportsbooks from 0", pt: "sportsbooks do zero" } },
    ],
    soft: {
      en: ["Leadership", "Communication", "Problem-solving", "Time management", "Creativity", "Adaptability", "Teamwork"],
      pt: ["Liderança", "Comunicação", "Resolução de problemas", "Gestão de tempo", "Criatividade", "Adaptabilidade", "Trabalho em equipe"],
    },
    languages: { en: "Portuguese (native) · English (intermediate) · Spanish (basic)", pt: "Português (nativo) · Inglês (intermediário) · Espanhol (básico)" },
    education: { en: "Education", pt: "Formação" },
  },
  statement: {
    text: {
      en: "Fast interfaces, precise pixels and real-time systems — from Figma to socket.",
      pt: "Interfaces rápidas, pixels precisos e sistemas em tempo real — do Figma ao socket.",
    },
    glow: { en: "from Figma to socket.", pt: "do Figma ao socket." },
  },
  work: {
    title: { en: "Where I've worked", pt: "Onde trabalhei" },
    details: { en: "Read more", pt: "Ver detalhes" },
    back: { en: "Back", pt: "Voltar" },
  },
  projects: {
    title: { en: "Selected work", pt: "Trabalhos em destaque" },
    note: {
      en: "Most of my work lives behind NDAs — here's what I can show.",
      pt: "Boa parte do meu trabalho está sob NDA — aqui está o que posso mostrar.",
    },
  },
  contact: {
    title: { en: "Let's build something", pt: "Vamos construir algo" },
    body: {
      en: "Open to new challenges, collaborations or just a good conversation about front-end, products and performance.",
      pt: "Aberto a novos desafios, colaborações ou só uma boa conversa sobre front-end, produto e performance.",
    },
    copy: { en: "Copy email", pt: "Copiar email" },
    copied: { en: "Copied!", pt: "Copiado!" },
  },
  palette: {
    hint: { en: "Press", pt: "Aperte" },
    placeholder: { en: "Type a command or search…", pt: "Digite um comando ou busque…" },
    empty: { en: "Nothing found.", pt: "Nada encontrado." },
  },
  footer: {
    made: { en: "Designed & built by Vinícius — React, TanStack Router, Tailwind & HeroUI.", pt: "Desenhado e desenvolvido por Vinícius — React, TanStack Router, Tailwind e HeroUI." },
  },
} as const;
