import Certificates from "@/components/certificates";
import Comments from "@/components/comments";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Price from "@/components/price";
import Questions from "@/components/questions";
import Superior from "@/components/superior";
import Whom from "@/components/whom";
import Why from "@/components/why";

export default function HomePage() {
  return (
    <main>
      <section>
        <Hero />
      </section>
      <section>
        <Why />
      </section>
      <section>
        <Superior />
      </section>
      <section>
        <Certificates />
      </section>
      <section>
        <Price />
      </section>
      <section>
        <Whom />
      </section>
      <section>
        <Comments />
      </section>
      <section>
        <Questions />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}
