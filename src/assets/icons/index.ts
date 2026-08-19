import brainImg from './brain.png'
import bookImg from './book.png'
import computerImg from './computer.png'
import studentImg from './student.png'

export type JourneyIcon = {
  id: string
  label: string
  src: string
}

export const JOURNEY_ICONS: JourneyIcon[] = [
  { id: 'brain', label: 'Brain', src: brainImg },
  { id: 'book', label: 'Book', src: bookImg },
  { id: 'computer', label: 'Computer', src: computerImg },
  { id: 'student', label: 'Student', src: studentImg },
]
