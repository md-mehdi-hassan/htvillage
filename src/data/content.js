const img = {
  aerialMaster: '/assets/stockimages/aerial_master_plan_1782373833113.jpg',
  biophilic: '/assets/stockimages/biophilic_towers_1782373861637.jpg',
  aiLab: '/assets/stockimages/htv_ai_ecosystem_lab.jpg',
  cityAerial: '/assets/stockimages/htv_city_aerial_dhaka.jpg',
  workspace: '/assets/stockimages/htv_corporate_workspace.jpg',
  robotics: '/assets/stockimages/htv_robotics_rd_lab.jpg',
  campus: '/assets/stockimages/htv_tech_campus_masterplan.jpg',
  solar: '/assets/stockimages/solar_clean_grid_1782373876098.jpg',
  waterfront: '/assets/stockimages/waterfront_spine_1782373847969.jpg',
}

export const siteMeta = {
  name: 'High-Tech Village Dhaka',
  shortName: 'HTVillage',
  tagline: 'South Asia’s most advanced smart city hub',
}

export const navbar = {
  logo: 'HTVILLAGE',
  darkLabel: 'DARK',
  lightLabel: 'LIGHT',
  menuLabel: 'MENU',
  closeLabel: 'CLOSE',
  searchPlaceholder: 'Search Projects',
  links: [
    { label: 'Home', href: '#hero' },
    {
      label: 'About HTV',
      href: '#about',
      children: [
        { label: 'Our Mission', href: '#about' },
        { label: 'Sustainable Living', href: '#ecosystem' },
        { label: 'Data Insights', href: '#insights' },
      ],
    },
    {
      label: 'Projects',
      href: '#featured',
      children: [
        { label: 'Featured Projects', href: '#featured' },
        { label: 'Facilities', href: '#innovation' },
        { label: 'Workspace Map', href: '#workspace' },
      ],
    },
    { label: 'Life At HTV', href: '#ecosystem' },
    { label: 'Technology', href: '#innovation' },
    { label: 'News & Insights', href: '#insights' },
    {
      label: 'Contact Us',
      href: '#connect',
      children: [
        { label: 'Join Our Network', href: '#connect' },
        { label: 'Get In Touch', href: '#footer' },
      ],
    },
    { label: 'Privacy Policy', href: '#footer' },
  ],
  followUs: 'Follow Us',
  socials: [
    { label: 'Facebook', href: '#', icon: 'facebook' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'TikTok', href: '#', icon: 'tiktok' },
  ],
}

export const hero = {
  headline: 'The Blueprint of Luxury',
  imageAlt: 'High-Tech Village Dhaka',
  images: [
    { src: img.campus, alt: 'Tech campus masterplan' },
    { src: img.aerialMaster, alt: 'Aerial master plan' },
    { src: img.cityAerial, alt: 'Dhaka digital capital skyline' },
    { src: img.biophilic, alt: 'Biophilic towers' },
    { src: img.waterfront, alt: 'Waterfront spine' },
  ],
}

export const featured = {
  id: 'featured',
  eyebrow: 'FEATURED PROJECTS',
  /** Continuous background (YouTube id) */
  backgroundVideoId: 'cpbU0qMlIWk',
  slides: [
    {
      id: 'masterplan',
      category: 'MASTER PLAN',
      title: 'HI-TECH CAMPUS',
      location: 'Purbachal Growth Corridor, Dhaka',
      cta: 'View Project',
      image: img.aerialMaster,
      inset: img.campus,
    },
    {
      id: 'ai-hub',
      category: 'TECHNOLOGY',
      title: 'AI & R&D HUB',
      location: 'Innovation Spine, HTV Dhaka',
      cta: 'View Project',
      image: img.aiLab,
      inset: img.robotics,
    },
    {
      id: 'urban-forest',
      category: 'RESIDENTIAL',
      title: 'URBAN FOREST',
      location: 'Bio-Architecture District',
      cta: 'View Project',
      image: img.biophilic,
      inset: img.waterfront,
    },
    {
      id: 'digital-capital',
      category: 'INFRASTRUCTURE',
      title: 'DIGITAL CAPITAL',
      location: 'Modern Engineering Core, Dhaka',
      cta: 'View Project',
      image: img.cityAerial,
      inset: img.solar,
    },
  ],
}

export const about = {
  id: 'about',
  image: img.workspace,
  paragraph:
    'Our campus portfolio is a mark of distinction. Featuring South Asia’s most selective smart-city developments, we promise investors and partners an unmatched level of infrastructure and service. Our success is built on strong standards and a keen eye for detail — embodying technology, luxury, and excellence.',
  marquee:
    'PRIME LOCATIONS · LEADING CAMPUS · AI ECOSYSTEM · SMART BANGLADESH 2041 · RENEWABLE GRID · ',
}

export const projectsStrip = {
  id: 'innovation',
  heading: 'PROJECTS',
  items: [
    {
      id: 'robotics',
      title: 'ROBOTICS LAB',
      image: img.robotics,
    },
    {
      id: 'ai-infra',
      title: 'AI ECOSYSTEM',
      image: img.aiLab,
    },
    {
      id: 'shared',
      title: 'SMART OFFICES',
      image: img.workspace,
    },
    {
      id: 'campus',
      title: 'TECH CAMPUS',
      image: img.campus,
    },
    {
      id: 'biophilic',
      title: 'BIO TOWERS',
      image: img.biophilic,
    },
  ],
}

export const exploreMap = {
  id: 'workspace',
  heading: 'PROJECTS',
  exploreLabel: 'EXPLORE',
  filters: [
    { id: 'all', label: 'All Locations' },
    { id: 'active', label: 'Project Status' },
    { id: 'type', label: 'Project Type' },
  ],
  filterOptions: {
    all: null,
    active: 'active',
    type: null,
  },
  markers: [
    { id: 1, label: '3', x: 42, y: 38, status: 'active', type: 'campus', title: 'Campus Core' },
    { id: 2, label: '5', x: 55, y: 45, status: 'active', type: 'office', title: 'Smart Offices' },
    { id: 3, label: '2', x: 48, y: 58, status: 'planned', type: 'lab', title: 'R&D Cluster' },
    { id: 4, label: '4', x: 62, y: 36, status: 'active', type: 'campus', title: 'Innovation Spine' },
    { id: 5, label: '1', x: 35, y: 52, status: 'active', type: 'living', title: 'Bio Towers' },
    { id: 6, label: '6', x: 58, y: 62, status: 'planned', type: 'office', title: 'HQ District' },
    { id: 7, label: '2', x: 70, y: 48, status: 'active', type: 'lab', title: 'Robotics Bay' },
    { id: 8, label: '3', x: 40, y: 68, status: 'planned', type: 'living', title: 'Waterfront' },
  ],
}

export const ecosystem = {
  id: 'ecosystem',
  heading: 'ECOSYSTEM',
  cards: [
    {
      id: 'energy',
      title: 'RENEWABLE',
      image: img.solar,
    },
    {
      id: 'water',
      title: 'WATER GRID',
      image: img.waterfront,
    },
    {
      id: 'mobility',
      title: 'MOBILITY',
      image: img.cityAerial,
    },
  ],
}

export const insights = {
  id: 'insights',
  eyebrow: 'DATA INSIGHTS & DIAGNOSTICS',
  heading: 'Data Integration & AI Analytics',
  paragraph:
    'Empowering businesses through real-time analytics — a unified view of total power consumption, grid load, and district diagnostics across High-Tech Village Dhaka.',
  leftCard: {
    image: img.solar,
    title: 'Total Power Consumption & Grid Load',
    description:
      'Grid Reliability Monitor tracks campus energy performance so operators can optimize renewable output and network resilience in real time.',
  },
  stats: [
    { value: 5000, prefix: '', suffix: '+', decimals: 0, label: 'Smart Homes' },
    { value: 25, prefix: '', suffix: 'k+', decimals: 0, label: 'Tech Talent' },
    { value: 300, prefix: '', suffix: '%', decimals: 0, label: 'Renewable Energy' },
    { value: 50, prefix: '', suffix: '', decimals: 0, label: 'Global Partners' },
  ],
}

export const connect = {
  id: 'connect',
  heading: "LET'S CONNECT",
  image: img.workspace,
  categories: [
    {
      title: 'Investors',
      description:
        'Capital partners seeking exposure to Bangladesh’s flagship AI campus and mixed-use district yield.',
      href: '#footer',
    },
    {
      title: 'Partners',
      description:
        'Universities, corporates, and operators looking to co-locate R&D talent and workspace.',
      href: '#footer',
    },
  ],
}

export const footer = {
  id: 'footer',
  brand: 'HTVillage',
  description:
    'The heart of South Asia’s digital revolution — a high-tech campus integrating innovation, sustainable living, and world-class workspace in Dhaka, Bangladesh.',
  quickLinks: {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'Featured Projects', href: '#featured' },
      { label: 'Facilities', href: '#innovation' },
      { label: 'Workspace', href: '#workspace' },
      { label: 'Insights', href: '#insights' },
      { label: 'Contact', href: '#connect' },
    ],
  },
  projects: {
    title: 'Our Projects',
    links: [
      { label: 'Masterplan', href: '#featured' },
      { label: 'Research Hub', href: '#innovation' },
      { label: 'Smart Living', href: '#ecosystem' },
      { label: 'Sustainability', href: '#about' },
    ],
  },
  hotline: { label: 'Hotline', value: '+880 1711 000 000' },
  sales: { label: 'Sales', value: '+880 1711 000 000' },
  email: { label: 'Email', value: 'hello@htvillage.bd' },
  address: {
    label: 'Address',
    lines: ['High-Tech Village Dhaka', 'Purbachal Growth Corridor', 'Dhaka, Bangladesh'],
  },
  copyright: '© 2026. High-Tech Village Dhaka. All Rights Reserved.',
  socials: [
    { label: 'Facebook', href: '#', icon: 'facebook' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'TikTok', href: '#', icon: 'tiktok' },
  ],
  whatsapp: 'https://wa.me/8801711000000',
  backToTop: 'Back to top',
}

export const sustainable = {
  id: 'sustainability',
  eyebrow: 'Sustainable Infrastructure',
  heading: 'Sustainable Infrastructure',
  paragraph: '',
  imageCards: [],
  features: [],
}

export const innovation = {
  id: 'innovation-legacy',
  eyebrow: '',
  heading: '',
  paragraph: '',
  imageCards: [],
  challenges: { title: '', progress: { label: '', value: 0, note: '' }, benchmark: { title: '', note: '', peers: [] } },
}

export const collaboration = {
  id: 'workspace-legacy',
  eyebrow: '',
  heading: '',
  paragraph: '',
  filters: [],
  cards: [],
  stats: [],
}

export const dataInsights = {
  id: 'ecosystem-legacy',
  eyebrow: '',
  heading: '',
  paragraph: '',
  leftCard: { image: '', title: '', description: '' },
  chart: { tabs: [], series: {}, labels: [], controllerLabel: '', cta: '', footerNote: '' },
}
