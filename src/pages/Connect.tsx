import ContactInfo from '../components/connect/ContactInfo'
import ContactForm from '../components/connect/ContactForm'
import SocialLinks from '../components/connect/SocialLinks'

export default function Connect() {
  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28">
        {/* Desktop: info + social on the left. Mobile: info first, social after form. */}
        <div className="flex flex-col lg:gap-14">
          <ContactInfo />
          <div className="mt-14 hidden lg:block">
            <SocialLinks />
          </div>
        </div>

        <ContactForm />

        <div className="lg:hidden">
          <SocialLinks />
        </div>
      </div>
    </section>
  )
}
