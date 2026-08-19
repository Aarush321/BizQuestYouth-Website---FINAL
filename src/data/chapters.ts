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
    studentCount: 84,
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
    leaders: [],
  },
  {
    name: 'BizQuest New Jersey',
    city: 'New Jersey',
    lat: 40.058,
    lng: -74.406,
    leaders: [],
  },
  {
    name: 'BizQuest India',
    city: 'India',
    lat: 20.594,
    lng: 78.963,
    leaders: [],
  },
]
