import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import pagesJson from "@/content/pages.json";

export default function NotFound() {
  const { code, title, description, button } = pagesJson.notFound;

  return (
    <section className="section-padding min-h-[60vh] flex items-center justify-center bg-white">
      <Container className="text-center">
        <p className="text-8xl md:text-9xl font-heading font-extrabold text-primary-100 mb-4 select-none">
          {code}
        </p>
        <h1 className="font-heading text-3xl font-bold mb-3 text-neutral-900">
          {title}
        </h1>
        <p className="text-neutral-500 mb-8 max-w-md mx-auto text-base">
          {description}
        </p>
        <Button href="/" size="lg">
          {button}
        </Button>
      </Container>
    </section>
  );
}
