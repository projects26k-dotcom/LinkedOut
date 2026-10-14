export const TRENDING_TOPICS = [
  { id: 't1', topic: '#TurnOffYourCamera', count: '14.8k vents', category: 'Meeting Fails', tag: 'Trending' },
  { id: 't2', topic: 'The 4:55 PM Friday Slack Ping', count: '11.2k roasts', category: 'Boss Memes', tag: 'Hot' },
  { id: 't3', topic: 'Return To Office Mandate 3.0', count: '24.6k rants', category: 'Office Gossip', tag: 'Exploding' },
  { id: 't4', topic: 'Per My Last Email', count: '9.3k quotes', category: 'Funny Thought', tag: 'Classic' },
  { id: 't5', topic: 'Pizza Party vs Actual Bonus', count: '18.1k memes', category: 'Salary Talk', tag: 'Viral' },
  { id: 't6', topic: '"Let\'s take this offline"', count: '7.5k chuckles', category: 'Meeting Fails', tag: 'Buzzword' },
];

export const BINGO_WORDS = [
  "Let's circle back",
  "Per my last email",
  "Touch base offline",
  "Move the needle",
  "Synergy",
  "Hard stop at :00",
  "Bandwidth issue",
  "Quick 5-min sync",
  "You're on mute!"
];

export const NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'laugh',
    actor: 'Anonymous VP of Panic',
    avatar: null,
    isAnonymous: true,
    action: 'reacted 😂 with tears to your post:',
    target: '"Focus Time is just staring at Zillow houses..."',
    time: '4m ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'gossip',
    actor: 'Sarah from Accounting',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    isAnonymous: false,
    action: 'voted in the watercooler poll:',
    target: '94% agree that standups could be Slack emojis',
    time: '28m ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'save',
    actor: '3 Colleagues from Fortune 500',
    avatar: null,
    isAnonymous: true,
    action: 'secretly bookmarked your salary negotiation advice',
    target: '"Always ask for base salary numbers in first 5 minutes"',
    time: '2h ago',
    read: true,
  },
  {
    id: 'n4',
    type: 'badge',
    actor: 'LinkedOut HR Bot',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    isAnonymous: false,
    action: 'awarded you the satirical badge:',
    target: '"Camera Off Hall of Fame 🏆"',
    time: '1d ago',
    read: true,
  }
];

export const MOCK_MESSAGES = [
  {
    id: 'chat-1',
    user: {
      name: 'Dave from IT',
      role: 'Chief Cable Untangler',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      online: true,
    },
    lastMessage: 'Have you tried turning the whole company off and on again?',
    time: '10:42 AM',
    unread: 2,
    conversation: [
      { sender: 'them', text: 'Hey, saw your ticket about the coffee machine.', time: '10:35 AM' },
      { sender: 'them', text: 'I classified it as Severity 1: Critical Business Outage.', time: '10:36 AM' },
      { sender: 'me', text: 'Thank god, without espresso the sprints will collapse.', time: '10:38 AM' },
      { sender: 'them', text: 'Have you tried turning the whole company off and on again?', time: '10:42 AM' }
    ]
  },
  {
    id: 'chat-2',
    user: {
      name: 'Anonymous Coworker #4',
      role: 'Secret Alliance Member',
      avatar: null,
      isAnonymous: true,
      online: false,
    },
    lastMessage: 'If they schedule another 8 AM town hall I am bringing a trombone.',
    time: 'Yesterday',
    unread: 0,
    conversation: [
      { sender: 'them', text: 'Did you hear what leadership said in the Q&A?', time: 'Yesterday' },
      { sender: 'me', text: 'I zoned out after "synergistic cost realignment".', time: 'Yesterday' },
      { sender: 'them', text: 'If they schedule another 8 AM town hall I am bringing a trombone.', time: 'Yesterday' }
    ]
  },
  {
    id: 'chat-3',
    user: {
      name: 'Corporate Wellness Bot',
      role: 'Automated Guilt Distributor',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
      online: true,
    },
    lastMessage: 'Reminder: Staring out the window counts as mindfulness!',
    time: '2d ago',
    unread: 0,
    conversation: [
      { sender: 'them', text: 'Friendly reminder: You have attended 37 back-to-back meetings.', time: '2d ago' },
      { sender: 'them', text: 'Reminder: Staring out the window counts as mindfulness!', time: '2d ago' }
    ]
  }
];
