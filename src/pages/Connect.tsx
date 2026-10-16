import ContactInfo from '../components/connect/ContactInfo'
import ContactForm from '../components/connect/ContactForm'

export default function Connect() {
  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  )
}
