export const INITIAL_USER = {
  id: 'user-001',
  name: 'Taylor Rivera',
  title: 'Senior Synergy Orchestrator & Meeting Attendee',
  company: 'Global Conglomerate Corp',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  banner: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=80',
  bio: 'Turning 15-minute quick syncs into 60-minute philosophical debates since 2018. Certified Outlook Calendar Tetris Grandmaster.',
  location: 'Home Office (Bed to Desk: 12 seconds)',
  quietQuittingScore: 89,
  postCount: 14,
  coffeeCount: 1420,
  badges: [
    { label: 'Camera Off Legend', icon: '📹', desc: 'Kept video off for 42 consecutive calls' },
    { label: 'Per My Last Email', icon: '✉️', desc: 'Sent passive aggressive email with deadly precision' },
    { label: 'Double Mute Survivor', icon: '🎙️', desc: 'Spoke for 5 minutes while on mute twice' },
    { label: 'Calendar Block Ninja', icon: '🛡️', desc: 'Blocked "Focus Time" to secretly nap' },
  ]
};

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    author: {
      name: 'Marcus Chen',
      title: 'Principal Slide Rearranger',
      company: 'Deloitte-adjacent Consulting',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isCurrentUser: false,
    },
    isAnonymous: false,
    createdAt: '15m ago',
    timestamp: Date.now() - 15 * 60 * 1000,
    category: 'Meeting Fails',
    content: `Just survived a 55-minute meeting where the VP of Operations presented 48 slides explaining that "we have too many meetings and need to reclaim our productivity." 

The meeting ended with: "I'll schedule a follow-up series on Tuesday to establish our anti-meeting working committee." 

I can't make this up. Send help and caffeine. ☕🤡`,
    likesCount: 342,
    commentsCount: 28,
    sharesCount: 54,
    hasLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c-101',
        author: {
          name: 'Sarah Jenkins',
          title: 'Director of Pretending to Pay Attention',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        },
        isAnonymous: false,
        createdAt: '10m ago',
        text: 'Did anyone say "let us give you 5 minutes back of your day" when ending 2 minutes late?'
      },
      {
        id: 'c-102',
        author: {
          name: 'Anonymous Employee',
          title: 'Senior Lurker',
          avatar: null,
        },
        isAnonymous: true,
        createdAt: '5m ago',
        text: 'The anti-meeting committee will inevitably spawn 3 sub-taskforces and a weekly standup.'
      }
    ]
  },
  {
    id: 'post-2',
    author: {
      name: 'Anonymous Employee',
      title: 'Product Manager at Stealth Burnout Inc.',
      company: 'Top Tech Unicorn',
      avatar: null,
    },
    isAnonymous: true,
    createdAt: '42m ago',
    timestamp: Date.now() - 42 * 60 * 1000,
    category: 'Salary Talk',
    content: `Recruiter: "Our compensation package is heavily weighted on stock equity and high-velocity exposure!"

Translation: "We will pay you in unvested Monopoly money and 11 PM Slack messages from our founder."

Always ask for base salary numbers in the first 5 minutes, folks. Don't let them romance you with cold brew on tap. 📉💸`,
    likesCount: 891,
    commentsCount: 94,
    sharesCount: 142,
    hasLiked: true,
    isSaved: true,
    comments: [
      {
        id: 'c-201',
        author: {
          name: 'Jordan Bell',
          title: 'Lead Compensation Skeptic',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        },
        isAnonymous: false,
        createdAt: '30m ago',
        text: '"Exposure doesn\'t pay my rent or student loans" — tattooed on my forehead.'
      }
    ]
  },
  {
    id: 'post-3',
    author: {
      name: 'Priya Sharma',
      title: 'Senior Jira Ticket Mover',
      company: 'Fintech Solutions Ltd',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      isCurrentUser: false,
    },
    isAnonymous: false,
    createdAt: '1h ago',
    timestamp: Date.now() - 60 * 60 * 1000,
    category: 'Office Gossip',
    content: `Overheard in the 4th floor micro-kitchen: 

Management is preparing an announcement about "exciting cultural enhancements" next Monday.

Veteran employees know that phrase only means one of two things:
1. Return to Office mandate increasing to 4 days/week
2. Replacing the organic almond milk with tap water powder

Place your bets below. 🍿👀`,
    likesCount: 529,
    commentsCount: 67,
    sharesCount: 38,
    hasLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c-301',
        author: {
          name: 'Dave K.',
          title: 'Scrum Master / Ping Pong Champ',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
        },
        isAnonymous: false,
        createdAt: '45m ago',
        text: '3. A mandatory wellness webinar hosted during lunch hour with cameras on.'
      }
    ]
  },
  {
    id: 'post-4',
    author: {
      name: 'Liam O\'Connor',
      title: 'Full Stack Stack-Overflow Browser',
      company: 'CloudScale DevOps',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    },
    isAnonymous: false,
    createdAt: '2h ago',
    timestamp: Date.now() - 120 * 60 * 1000,
    category: 'Funny Thought',
    content: `My toxic workplace trait is sending an email with "Per my last email" when in reality, I am vibrating with pure celestial rage. 

The corporate world really normalized saying "You cannot read and you are wasting my life" in just four polite words. 

Masterpiece of passive aggression. ✍️🔥`,
    likesCount: 1420,
    commentsCount: 112,
    sharesCount: 305,
    hasLiked: true,
    isSaved: true,
    comments: [
      {
        id: 'c-401',
        author: {
          name: 'Elena Rostova',
          title: 'Chief Email Dissector',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        },
        isAnonymous: false,
        createdAt: '1h ago',
        text: 'Close second: "Re-attaching for your convenience" = "I know you didn\'t open the attachment you lazy potato."'
      }
    ]
  },
  {
    id: 'post-5',
    author: {
      name: 'Anonymous Employee',
      title: 'Underpaid Code Architect',
      company: 'Enterprise Software Giants',
      avatar: null,
    },
    isAnonymous: true,
    createdAt: '3h ago',
    timestamp: Date.now() - 180 * 60 * 1000,
    category: 'Boss Memes',
    content: `Boss: "We need everyone to display extreme ownership, hustle hard, and treat this company like it\'s your own baby!"

Me: "Great! Can I have equity shares like an owner?"

Boss: "No, treat it like an owner in terms of working on Saturday, not the money part silly." 👶🏃💨`,
    likesCount: 980,
    commentsCount: 81,
    sharesCount: 165,
    hasLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c-501',
        author: {
          name: 'Anonymous Drone',
          title: 'Specialist in Nodding Solemnly',
          avatar: null,
        },
        isAnonymous: true,
        createdAt: '2h ago',
        text: 'Family culture when they want extra hours, strictly corporate hierarchy when bonus distribution arrives.'
      }
    ]
  },
  {
    id: 'post-6',
    author: {
      name: 'Chloe Bennett',
      title: 'Customer Success Empathy Machine',
      company: 'SaaS Platform Inc',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    },
    isAnonymous: false,
    createdAt: '4h ago',
    timestamp: Date.now() - 240 * 60 * 1000,
    category: 'Meeting Fails',
    content: `Nothing builds team camaraderie quite like the 30-second silence that follows:

"Does anyone have any questions before we wrap up?"

Everyone staring at their unmute button like it\'s a live grenade, silently praying nobody says "Actually, just one quick thought..." ⏱️💣`,
    likesCount: 754,
    commentsCount: 49,
    sharesCount: 88,
    hasLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c-601',
        author: {
          name: 'Kevin Vance',
          title: 'QA Destroyer of Worlds',
          avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
        },
        isAnonymous: false,
        createdAt: '3h ago',
        text: 'There is always that one guy who asks a 14-part question at 4:59 PM. Instant enemy of the people.'
      }
    ]
  },
  {
    id: 'post-7',
    author: {
      name: 'Anonymous Employee',
      title: 'Senior Spreadsheet Magician',
      company: 'Fortune 100 Retail',
      avatar: null,
    },
    isAnonymous: true,
    createdAt: '5h ago',
    timestamp: Date.now() - 300 * 60 * 1000,
    category: 'Office Gossip',
    content: `Rumor confirmed: Our division spent $450,000 hiring an external management consulting firm to tell us why employee retention dropped 30%.

Their 120-page final deck concluded: "Employees would like higher wages and flexible work hours."

Leadership gave the consultants a standing ovation and ordered a pizza party on a Friday as the corrective action plan. 🍕📉`,
    likesCount: 1680,
    commentsCount: 154,
    sharesCount: 420,
    hasLiked: true,
    isSaved: false,
    comments: [
      {
        id: 'c-701',
        author: {
          name: 'Zack Morris',
          title: 'Associate Synergy Analyst',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        },
        isAnonymous: false,
        createdAt: '4h ago',
        text: 'The pizza was probably 2 cold slices of plain cheese cut into smaller triangles.'
      }
    ]
  },
  {
    id: 'post-8',
    author: {
      name: 'Aisha Diallo',
      title: 'Talent Acquisition Ghost Hunter',
      company: 'ScaleUp Ventures',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
    },
    isAnonymous: false,
    createdAt: '7h ago',
    timestamp: Date.now() - 420 * 60 * 1000,
    category: 'Funny Thought',
    content: `My calendar currently has "Focus Time" blocked from 2 PM to 4 PM.

What leadership thinks I am doing:
• Deep strategic roadmap architecture
• High-level cross-functional alignment

What I am actually doing:
• Staring blankly at Zillow houses I cannot afford
• Cleaning my desktop trash folder
• Drinking my 4th lukewarm oat milk latte ☕🏡`,
    likesCount: 1104,
    commentsCount: 73,
    sharesCount: 189,
    hasLiked: false,
    isSaved: true,
    comments: []
  },
  {
    id: 'post-9',
    author: {
      name: 'Anonymous Employee',
      title: 'Staff Meeting Surviving Specialist',
      company: 'Big Tech',
      avatar: null,
    },
    isAnonymous: true,
    createdAt: '9h ago',
    timestamp: Date.now() - 540 * 60 * 1000,
    category: 'Boss Memes',
    content: `When the CEO sends an all-company memo saying: 

"This is not a layoff, this is a strategic recalibration of our organizational matrix towards hyper-efficient operational velocity."

Babe, pack your desk. The matrix just calibrated you out of the building. 🏃📦🚪`,
    likesCount: 2150,
    commentsCount: 188,
    sharesCount: 512,
    hasLiked: true,
    isSaved: false,
    comments: [
      {
        id: 'c-901',
        author: {
          name: 'Tara Higgins',
          title: 'Ex-VP of Synergy',
          avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80',
        },
        isAnonymous: false,
        createdAt: '8h ago',
        text: 'LMAO the corporate thesaurus working overtime to avoid the L-word.'
      }
    ]
  },
  {
    id: 'post-10',
    author: {
      name: 'Tomás Morales',
      title: 'Lead PowerPoint Visualizer',
      company: 'Legacy Enterprise Brand',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    },
    isAnonymous: false,
    createdAt: '12h ago',
    timestamp: Date.now() - 720 * 60 * 1000,
    category: 'Salary Talk',
    content: `Year-end performance review:
Rating: "Exceeds all expectations! Single-handedly delivered Q3 and saved key client accounts!"

Merit Increase: 1.8%

Inflation: 4.2%

HR: "Be proud, Tomás! That\'s an extra $24.50 every two weeks before taxes! Treat yourself to half of an avocado toast!" 🥑🧾📉`,
    likesCount: 1840,
    commentsCount: 142,
    sharesCount: 390,
    hasLiked: false,
    isSaved: false,
    comments: []
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Feeds', icon: '🔥', color: 'coral' },
  { id: 'Funny Thought', label: 'Funny Thought', icon: '💭', color: 'amber' },
  { id: 'Office Gossip', label: 'Office Gossip', icon: '🤫', color: 'purple' },
  { id: 'Meeting Fails', label: 'Meeting Fails', icon: '📉', color: 'red' },
  { id: 'Boss Memes', label: 'Boss Memes', icon: '🤡', color: 'blue' },
  { id: 'Salary Talk', label: 'Salary Talk', icon: '💸', color: 'emerald' },
];
