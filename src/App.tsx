import Layout from "./components/Layout";
import Hero from "./components/Hero";
import StatsActivity from "./components/StatsActivity";
import Expertise from "./components/Expertise";
import ThePath from "./components/ThePath";
import Testimonials from "./components/Testimonials";
import TeamSection from "./components/TeamSection";
import ServiceAreas from "./components/ServiceAreas";
import ContactForm from "./components/ContactForm";
import LocalSeoContent from "./components/LocalSeoContent";

import TrustedBy from "./components/TrustedBy";

import BookingCTA from "./components/BookingCTA";

function App() {
  return (
    <Layout>
      <Hero />
      <TrustedBy />
      <Expertise />
      <StatsActivity />
      <BookingCTA variant="light" text="Numbers Don't Lie. Neither Do Results." buttonText="Start Your Success Story" />
      <ThePath />
      <Testimonials />
      <BookingCTA variant="dark" text="Join Our List of Satisfied Clients." buttonText="Book Your Strategy Session" />
      <TeamSection />
      <ServiceAreas />
      <LocalSeoContent />
      <ContactForm />
    </Layout>
  );
}

export default App;
