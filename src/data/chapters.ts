export type ChapterLeader = {
  name: string
  role: string
  imageUrl: string | null
}

export type Chapter = {
  name: string
  city: string
  lat: number
  lng: number
  studentCount?: number
  featured?: boolean
  leaders: ChapterLeader[]
}

// Swap in real cities, student counts, and leaders without touching
// map, list, or leadership layout code.
export const CHAPTERS: Chapter[] = [
  {
    name: 'BizQuest Memphis',
    city: 'Memphis, TN',
    lat: 35.149,
    lng: -90.049,
    studentCount: 209,
    featured: true,
    leaders: [
      { name: 'Jordan Blake', role: 'Chapter Lead', imageUrl: null },
      { name: 'Sam Okonkwo', role: 'Assistant Lead', imageUrl: null },
      { name: 'Maya Chen', role: 'Outreach Lead', imageUrl: null },
    ],
  },
  {
    name: 'BizQuest Houston',
    city: 'Houston, TN',
    lat: 36.326,
    lng: -87.671,
    studentCount: 118,
    leaders: [],
  },
  {
    name: 'BizQuest New Jersey',
    city: 'New Jersey',
    lat: 40.058,
    lng: -74.406,
    studentCount: 97,
    leaders: [],
  },
  {
    name: 'BizQuest Delhi',
    city: 'Delhi, India',
    lat: 28.614,
    lng: 77.209,
    studentCount: 88,
    leaders: [],
  },
]
