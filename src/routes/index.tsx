import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kim Sneppen — Professor of Biocomplexity, Niels Bohr Institute" },
      {
        name: "description",
        content:
          "Kim Sneppen is Professor of Biocomplexity at the Niels Bohr Institute, University of Copenhagen, modeling living systems with the tools of theoretical physics.",
      },
      { property: "og:title", content: "Kim Sneppen — Professor of Biocomplexity" },
      {
        property: "og:description",
        content:
          "Research profile of Kim Sneppen: biophysics, complex systems, epigenetics, phage–bacteria co-evolution, and statistical mechanics of life.",
      },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#about", label: "About" },
  { href: "#research", label: "Research" },
  { href: "#publications", label: "Publications" },
  { href: "#grants", label: "Grants" },
  { href: "#models", label: "Interactive Models" },
  { href: "#cv", label: "CV" },
  { href: "#contact", label: "Contact" },
];

type Model = {
  id: string;
  title: string;
  description: string;
  file: string;
  embed: boolean;
};

const MODELS: Model[] = [
  {
    id: "bak-sneppen",
    title: "Bak–Sneppen Evolution Model",
    description:
      "An interactive simulation of self-organized criticality and punctuated equilibrium in a model ecology.",
    file: "/models/bak-sneppen.html",
    embed: false,
  },
  {
    id: "example",
    title: "Example Model",
    description: "Placeholder — replace with one of Kim's HTML simulations.",
    file: "/models/example.html",
    embed: false,
  },
];

const RESEARCH = [
  {
    title: "Biocomplexity & biophysics",
    body: "Physical principles underlying the organization and behavior of living matter.",
  },
  {
    title: "Computational systems biology",
    body: "Mathematical and simulation models of regulatory and metabolic networks.",
  },
  {
    title: "Epigenetics & gene regulation",
    body: "Dynamics of histone modifications, bistability, and inheritance of chromatin states.",
  },
  {
    title: "Phage biology & co-evolution",
    body: "Ecological and evolutionary dynamics of bacteriophage–bacteria communities.",
  },
  {
    title: "Biological networks & agent-based models",
    body: "Emergent structure in interacting populations, from molecules to ecosystems.",
  },
  {
    title: "Nonlinear dynamics & statistical mechanics",
    body: "Self-organized criticality, punctuated equilibria, and far-from-equilibrium systems.",
  },
];

const PUBLICATIONS = [
  "Bak, P. & Sneppen, K. (1993). Punctuated equilibrium and criticality in a simple model of evolution. Physical Review Letters, 71, 4083–4086.",
  "Sneppen, K., Bak, P., Flyvbjerg, H. & Jensen, M. H. (1995). Evolution as a self-organized critical phenomenon. PNAS, 92(11), 5209–5213.",
  "Sneppen, K. & Dodd, I. B. (2012). A simple histone code opens many paths to epigenetics. PLoS Computational Biology, 8(8).",
  "[Placeholder] SARS-CoV-2 superspreading / overdispersion paper — citation to confirm.",
  "[Placeholder] 2025 PNAS paper — citation to confirm.",
];

const CV = [
  { years: "2005–present", role: "Professor, Niels Bohr Institute, University of Copenhagen" },
  { years: "2005–2015", role: "Founding Director, Center for Models of Life (CMOL)" },
  { years: "2014–present", role: "Divisional Associate Editor, Physical Review Letters" },
  { years: "2002–2005", role: "Research Professor, NORDITA" },
  { years: "2001–2002", role: "Professor, NTNU, Trondheim" },
  { years: "1995–2001", role: "Assistant Professor, NORDITA" },
  {
    years: "1989–1995",
    role: "Postdoc / visiting scientist — NORDITA, Rockefeller, Princeton, Weizmann Institute, NBI",
  },
  { years: "1989", role: "PhD (Lic. Scient.) in Nuclear Physics, University of Copenhagen" },
];

function PhotoFrame({ caption, label }: { caption: string; label: string }) {
  return (
    <figure className="w-full">
      <div
        className="aspect-[4/5] w-full overflow-hidden border border-border bg-muted"
        role="img"
        aria-label={label}
      >
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,oklch(0.93_0.01_85)_0%,oklch(0.88_0.015_85)_100%)]">
          <span className="font-serif text-6xl text-muted-foreground/60">KS</span>
        </div>
      </div>
      <figcaption className="mt-3 text-xs italic text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

function Index() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-rule bg-background/85 backdrop-blur">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        >
          <a
            href="#top"
            className="font-serif text-lg text-foreground no-underline hover:text-accent"
          >
            Kim Sneppen
          </a>
          <ul className="hidden gap-7 text-sm md:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-foreground/75 no-underline hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex gap-4 text-xs md:hidden">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-foreground/75 no-underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-6">
        {/* HERO */}
        <section className="grid gap-12 py-16 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-24">
          <div className="mx-auto w-full max-w-xs md:max-w-none">
            <PhotoFrame
              caption="Photo: Ola Jakup Joensen, NBI"
              label="Formal portrait of Professor Kim Sneppen"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Niels Bohr Institute · University of Copenhagen
            </p>
            <h1 className="text-4xl leading-tight md:text-5xl lg:text-6xl">Kim Sneppen</h1>
            <p className="mt-4 text-lg text-foreground/85">
              Professor of Biocomplexity, Niels Bohr Institute, University of Copenhagen
            </p>
            <p className="mt-6 max-w-xl font-serif text-xl italic text-foreground/80 md:text-2xl">
              “Modeling living systems with the tools of theoretical physics.”
            </p>
          </div>
        </section>

        <hr className="border-rule" />

        {/* ABOUT */}
        <section id="about" className="py-20">
          <SectionHeading eyebrow="01" title="About" />
          <div className="mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-foreground/85">
            <p>
              Kim Sneppen is a professor of complex systems and biophysics at the Niels Bohr
              Institute, University of Copenhagen. His research bridges physics and biology,
              using methods from statistical physics and complex-systems theory to model
              biological processes — from gene regulation and epigenetics at the molecular
              scale, through phage–bacteria co-evolution, to large-scale population and
              ecosystem dynamics.
            </p>
            <p>
              He founded and directed the Center for Models of Life (CMOL) and is the author of{" "}
              <em>Models of Life</em> (Cambridge University Press, 2014). His work has been
              recognized with an ERC Advanced Grant.
            </p>
          </div>
        </section>

        <hr className="border-rule" />

        {/* RESEARCH */}
        <section id="research" className="py-20">
          <SectionHeading eyebrow="02" title="Research interests" />
          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {RESEARCH.map((r) => (
              <article key={r.title} className="bg-background p-7">
                <h3 className="text-xl">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              </article>
            ))}
          </div>
        </section>

        <hr className="border-rule" />

        {/* PUBLICATIONS */}
        <section id="publications" className="py-20">
          <SectionHeading eyebrow="03" title="Selected publications" />
          <p className="mt-6 max-w-2xl text-base text-muted-foreground">
            Author of 500+ peer-reviewed articles, cited over 22,000 times.
          </p>
          <ol className="mt-10 max-w-3xl space-y-5">
            {PUBLICATIONS.map((p, i) => (
              <li
                key={i}
                className="grid grid-cols-[2rem_1fr] gap-3 text-[15px] leading-relaxed text-foreground/85"
              >
                <span className="font-serif text-muted-foreground tabular-nums">{i + 1}.</span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <a
              href="https://scholar.google.com/citations?user=LIBL6nQAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-accent px-6 py-3 text-sm font-medium text-accent no-underline transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View full publication list on Google Scholar →
            </a>
          </div>
        </section>

        <hr className="border-rule" />

        {/* GRANTS */}
        <section id="grants" className="py-20">
          <SectionHeading eyebrow="04" title="Grants & awards" />
          <article className="mt-10 max-w-3xl border-l-2 border-accent pl-6">
            <h3 className="text-2xl">ERC Advanced Grant — SOURCE</h3>
            <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
              Self-organization in Competition and Diversity · DKK 16.5 million
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/85">
              Investigating how diversity emerges and is maintained in complex biological
              systems, from microbial communities to multi-species ecosystems.
            </p>
          </article>
        </section>

        <hr className="border-rule" />

        {/* CV */}
        <section id="cv" className="py-20">
          <SectionHeading eyebrow="05" title="Career" />
          <ol className="mt-10 max-w-3xl">
            {CV.map((c) => (
              <li
                key={c.years}
                className="grid grid-cols-[10rem_1fr] gap-6 border-b border-rule py-5 last:border-b-0"
              >
                <span className="font-serif text-sm text-muted-foreground tabular-nums">
                  {c.years}
                </span>
                <span className="text-[15px] text-foreground/90">{c.role}</span>
              </li>
            ))}
          </ol>
        </section>

        <hr className="border-rule" />

        {/* WORK & BOOK */}
        <section id="work" className="py-20">
          <SectionHeading eyebrow="06" title="Work & book" />
          <div className="mt-10 grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
            <div className="space-y-6 text-[15px] leading-relaxed text-foreground/85">
              <div>
                <h3 className="text-xl">Models of Life</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Cambridge University Press, 2014
                </p>
                <p className="mt-4">
                  A graduate-level synthesis of how concepts from statistical physics — phase
                  transitions, noise, feedback, networks — illuminate the dynamics of cells,
                  organisms, and ecosystems. The book gathers two decades of teaching and
                  research at the interface of physics and biology.
                </p>
              </div>
              <div>
                <h3 className="text-xl">Research group</h3>
                <p className="mt-4">
                  <a
                    href="https://nbi.ku.dk/english/research/biocomplexity/cmol/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Center for Models of Life (CMOL)
                  </a>{" "}
                  at the Niels Bohr Institute brings together theoretical physicists, biologists,
                  and computer scientists to build mechanistic models of living systems.
                </p>
              </div>
            </div>
            <PhotoFrame
              caption="Courtesy of Center for Interdisciplinary Studies, Westlake University"
              label="Kim Sneppen lecturing"
            />
          </div>
        </section>

        <hr className="border-rule" />

        {/* CONTACT */}
        <section id="contact" className="py-20">
          <SectionHeading eyebrow="07" title="Contact" />
          <div className="mt-10 grid max-w-3xl gap-10 md:grid-cols-2">
            <dl className="space-y-4 text-[15px]">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Email</dt>
                <dd className="mt-1">
                  <a href="mailto:sneppen@nbi.ku.dk">sneppen@nbi.ku.dk</a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Phone</dt>
                <dd className="mt-1 text-foreground/85">+45 35 32 53 52</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Address
                </dt>
                <dd className="mt-1 leading-relaxed text-foreground/85">
                  Niels Bohr Institute
                  <br />
                  University of Copenhagen
                  <br />
                  Jagtvej 155A, 2200 Copenhagen N
                  <br />
                  Denmark
                </dd>
              </div>
            </dl>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Academic profiles
              </p>
              <ul className="mt-3 space-y-2 text-[15px]">
                <li>
                  <a
                    href="https://scholar.google.com/citations?user=LIBL6nQAAAAJ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Scholar
                  </a>
                </li>
                <li>
                  <a
                    href="https://orcid.org/0000-0001-9820-3567"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ORCID
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.researchgate.net/profile/Kim-Sneppen"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ResearchGate
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-xs text-muted-foreground">
          © {year} Kim Sneppen
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex items-baseline gap-5">
      <span className="font-serif text-sm text-accent tabular-nums">{eyebrow}</span>
      <h2 className="text-3xl md:text-4xl">{title}</h2>
    </div>
  );
}
