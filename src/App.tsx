import Layout from "./components/Layout";
import Hero from "./components/Hero";
import StatsActivity from "./components/StatsActivity";
import Expertise from "./components/Expertise";
import ThePath from "./components/ThePath";
import Testimonials from "./components/Testimonials";
import TeamSection from "./components/TeamSection";
import ServiceAreas from "./components/ServiceAreas";
import ContactForm from "./components/ContactForm";

import TrustedBy from "./components/TrustedBy";

function App() {
  return (
    <Layout>
      <Hero />
      <TrustedBy />
      <Expertise />
      <StatsActivity />
      <ThePath />
      <Testimonials />
      <TeamSection />
      <ServiceAreas />
      <ContactForm />
    </Layout>
  );
}

export default App;
