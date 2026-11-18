/**
 * Church and sample content shown in the app.
 *
 * Keep the verified church details current. Replace sample sermon, event,
 * ministry and staff content as the church provides updates.
 * Later, move this data behind an API (Node/Express + PostgreSQL) so the
 * pastor can edit it from an admin screen instead of in code.
 */

export interface OfficeHour {
  day: string;
  hours: string;
}

export interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  scripture: string;
  description: string;
  /** YouTube watch URL or audio MP3 URL — leave '' until the church provides one. */
  mediaUrl: string;
}

export interface ChurchEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
}

export interface Ministry {
  name: string;
  leader: string;
  meetingTime: string;
  description: string;
}

export interface StaffMember {
  name: string;
  role: string;
  bio: string;
}

export interface GivingFund {
  id: string;
  label: string;
  description: string;
}

export const CHURCH_INFO = {
  name: 'Antioch Church of Colorado',
  tagline: 'Welcome to Antioch Church of Colorado',
  address: '14100 East Jewell Avenue, Aurora, Colorado 80012, United States',
  phones: [
    { label: '(720) 434-1126', href: 'tel:+17204341126' },
    { label: '(720) 207-7720', href: 'tel:+17202077720' },
  ],
  website: 'https://antiochcolorado.com/',
  visionTitle: 'ራዕያችን Our Vision',
  vision:
    '“የክርስቶስ ቤተስብ ሁሉ\nበፍቅር ተያይዞ በእውነት አድጎ\nበትህትና ሲያገለግል ማየት”',
  missionTitle: 'ተልዕኮአችን Our Mission',
  mission:
    'በኮሎራዶ በአካባቢውና በዓለም ዙሪያ ለሰው ልጆች ሁሉ የክርስቶስን ወንጌል በማሰራጨትና በማስታጠቅ መንግስቱን በማስፋት እግዚአብሔርን ማክበር ነው።',
};

export const OFFICE_HOURS: OfficeHour[] = [
  { day: 'Monday', hours: 'Closed' },
  { day: 'Tuesday', hours: '09:00 AM – 12:00 PM' },
  { day: 'Wednesday', hours: 'Closed' },
  { day: 'Thursday', hours: '06:30 PM – 08:00 PM' },
  { day: 'Friday', hours: 'Closed' },
  { day: 'Saturday', hours: 'Closed' },
  { day: 'Sunday', hours: '02:30 PM – 04:30 PM' },
];

export const SAMPLE_SERMONS: Sermon[] = [
  {
    id: 1,
    title: 'Faith That Moves',
    speaker: 'Pastor [Last Name]',
    date: 'Nov 16, 2026',
    duration: '38 min',
    scripture: 'Hebrews 11:1',
    description: 'What it looks like to trust God before you see the outcome.',
    mediaUrl: '',
  },
  {
    id: 2,
    title: 'The God Who Provides',
    speaker: 'Pastor [Last Name]',
    date: 'Nov 9, 2026',
    duration: '41 min',
    scripture: 'Philippians 4:19',
    description: 'God’s provision in seasons of waiting and in seasons of plenty.',
    mediaUrl: '',
  },
  {
    id: 3,
    title: 'Love Your Neighbour',
    speaker: 'Guest Speaker',
    date: 'Nov 2, 2026',
    duration: '35 min',
    scripture: 'Mark 12:31',
    description: 'Practical love — in our homes, our streets, and our city.',
    mediaUrl: '',
  },
];

export const SAMPLE_EVENTS: ChurchEvent[] = [
  {
    id: 1,
    title: 'Sunday Worship Service',
    date: 'Sun, Nov 22, 2026',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    category: 'Worship',
    description: 'Join us for worship, teaching, and communion.',
  },
  {
    id: 2,
    title: 'Community Thanksgiving Dinner',
    date: 'Thu, Nov 26, 2026',
    time: '5:00 PM',
    location: 'Fellowship Hall',
    category: 'Community',
    description: 'A free meal for neighbours, friends, and families. All are welcome.',
  },
  {
    id: 3,
    title: 'Youth Night',
    date: 'Fri, Nov 27, 2026',
    time: '6:30 PM',
    location: 'Youth Room',
    category: 'Youth',
    description: 'Games, worship, and a short message for middle & high schoolers.',
  },
  {
    id: 4,
    title: 'Christmas Choir Rehearsal',
    date: 'Wed, Dec 2, 2026',
    time: '7:00 PM',
    location: 'Choir Room',
    category: 'Music',
    description: 'All singers welcome — no audition needed.',
  },
];

export const MINISTRIES: Ministry[] = [
  {
    name: 'Kids Church',
    leader: '[Leader Name]',
    meetingTime: 'Sundays, 10:00 AM',
    description: 'Safe, joyful teaching for kids ages 3–11 during the service.',
  },
  {
    name: 'Youth Group',
    leader: '[Leader Name]',
    meetingTime: 'Fridays, 6:30 PM',
    description: 'Middle & high schoolers — friendship, worship, and real talk.',
  },
  {
    name: 'Outreach & Food Pantry',
    leader: '[Leader Name]',
    meetingTime: 'Saturdays, 9:00 AM',
    description: 'Serving neighbours with groceries, prayer, and practical help.',
  },
  {
    name: 'Worship Team',
    leader: '[Leader Name]',
    meetingTime: 'Thursdays, 7:00 PM',
    description: 'Musicians and singers leading the church in worship.',
  },
];

export const STAFF: StaffMember[] = [
  {
    name: 'Pastor [First Last]',
    role: 'Lead Pastor',
    bio: '[Short bio — replace with the real pastor’s story and photo.]',
  },
  {
    name: '[First Last]',
    role: 'Worship Leader',
    bio: '[Short bio.]',
  },
  {
    name: '[First Last]',
    role: 'Kids Ministry Director',
    bio: '[Short bio.]',
  },
];

export const GIVING_FUNDS: GivingFund[] = [
  { id: 'tithe', label: 'Tithe', description: 'Regular giving to the church' },
  { id: 'offering', label: 'Offering', description: 'General offering' },
  { id: 'missions', label: 'Missions', description: 'Local & global missions' },
  { id: 'building', label: 'Building Fund', description: 'Facility & building needs' },
];

export const GIVING_AMOUNTS = [10, 25, 50, 100];
