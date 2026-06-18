import { useEffect, useState } from "react";
import portraitUrl from "@/assets/kim-sneppen-portrait.jpg";
import lectureUrl from "@/assets/kim-sneppen-lecture.jpg";

export default function App() {
  return <Index />;
}

const NAV = [
  { href: "about", label: "About" },
  { href: "research", label: "Research" },
  { href: "publications", label: "Publications" },
  
  { href: "models", label: "Interactive Models" },
  { href: "cv", label: "CV" },
  { href: "contact", label: "Contact" },
];

type Model = {
  id: string;
  title: string;
  description: string;
  file: string;
  embed?: boolean;
  status: "live" | "coming_soon";
};

const MODELS: Model[] = [
  {
    id: "spatial-ecosystem",
    title: "Spatial Ecosystem",
    description:
      "A spatial simulation of how local interactions on a lattice let many species coexist, illustrating the emergence of diversity in a model ecosystem (after Mitarai, Mathiesen & Sneppen, 2012).",
    file: "/models/spatial-ecosystem.html",
    status: "live",
  },
  {
    id: "colony-phage",
    title: "Colony & Phage",
    description:
      "An interactive model of bacteriophage infection spreading through a growing bacterial colony, showing how lysis dynamics shape the colony over time.",
    file: "/models/colony-phage.html",
    status: "live",
  },
  {
    id: "cell-polarity",
    title: "Cell Polarity Morphogenesis",
    description:
      "A 3D model of how polar interactions between cells fold tissues into sheets, tubes, and invaginations during embryo development (after Nissen et al., 2018).",
    file: "/models/cell-polarity.html",
    status: "live",
  },
  {
    id: "rabbit-fox-snake-plant",
    title: "Rabbit, Fox, Snake & Plant",
    description:
      "An agent-based ecosystem on a lattice with plants, rabbits, foxes, and snakes — exploring how predator–prey interactions sustain coexistence and diversity.",
    file: "/models/rabbit-fox-snake-plant.html",
    status: "live",
  },
  {
    id: "nucleosome-swi6",
    title: "Nucleosome & Swi6",
    description:
      "A turntable visualization of nucleosomes and Swi6-mediated spreading of histone modifications, illustrating how epigenetic states are established and maintained along chromatin.",
    file: "/models/nucleosome-swi6.html",
    status: "live",
  },
  {
    id: "two-state-gillespie",
    title: "Two-State Gillespie Dynamics",
    description:
      "A stochastic Gillespie simulation of a nucleosome two-state system, showing how noisy molecular reactions give rise to bistability and switching between epigenetic states.",
    file: "/models/two-state-gillespie.html",
    status: "live",
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
  "Bak, P. & Sneppen, K. (1993). Punctuated equilibrium and criticality in a simple model of evolution. Physical Review Letters, 71(24), 4083–4086.",
  "J. Mathiesen, N. Mitarai, K. Sneppen, & A. Trusina (2011). Ecosystems with mutually exclusive interactions self-organize to a state of high diversity. Physical review letters, 107(18), 188101.",
  
  "Dodd, I. B., Micheelsen, M. A., Sneppen, K., & Thon, G. (2007). Theoretical analysis of epigenetic cell memory by nucleosome modification. Cell, 129(4), 813–822.",
  "Nissen, S. B., Rønhild, S., Trusina, A., & Sneppen, K. (2018). Theoretical tool bridging cell polarities with development of robust morphologies. eLife, 7, e38407.",
  "Maslov, S., & Sneppen, K. (2015). Diversity waves in collapse-driven population dynamics. PLoS Computational Biology, 11(9), e1004440.",
  "Maslov, S., Krishna, S., Pang, T. Y., & Sneppen, K. (2009). Toolbox model of evolution of prokaryotic metabolic networks and their regulation. Proceedings of the National Academy of Sciences, 106(24), 9743–9748.",
  "Bornholdt, S., Jensen, M. H., & Sneppen, K. (2011). Emergence and decline of scientific paradigms. Physical Review Letters, 106(5), 058701.",
  "Nielsen, B. F., Simonsen, L. & Sneppen, K. (2021). Overdispersion in COVID-19 increases the effectiveness of limiting nonrepetitive contacts for transmission control. Proceedings of the National Academy of Sciences, 118(14), e2016623118.",
  
];

const CV = [
  { years: "2005–present", role: "Professor, Niels Bohr Institute, University of Copenhagen" },
  { years: "2014–2020", role: "Divisional Associate Editor, Physical Review Letters" },
  { years: "2005–2015", role: "Founding Director, Center for Models of Life (CMOL)" },
  { years: "2002–2005", role: "Research Professor, NORDITA" },
  { years: "2001–2002", role: "Professor, NTNU, Trondheim" },
  { years: "1995–2001", role: "Assistant Professor, NORDITA" },
  {
    years: "1989–1995",
    role: "Postdoc / visiting scientist — NORDITA, Rockefeller, Princeton, Weizmann Institute, NBI",
  },
  { years: "1989", role: "PhD (Lic. Scient.) in Nuclear Physics, University of Copenhagen" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

const NAV_IDS = NAV.map((n) => n.href);

function useActiveSection() {
  const [active, setActive] = useState<string>(NAV_IDS[0]);
  useEffect(() => {
    const sections = NAV_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}

function Portrait() {
  return (
    <figure className="flex flex-col items-center md:items-start">
      <div className="h-44 w-44 overflow-hidden rounded-full border border-border shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(15,23,42,0.18)] md:h-52 md:w-52">
        <img
          src={portraitUrl}
          alt="Portrait of Professor Kim Sneppen"
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-[50%_25%]"
        />
      </div>
      <figcaption className="mt-3 text-[11px] italic text-muted-foreground">
        Photo: Ola Jakup Joensen, NBI
      </figcaption>
    </figure>
  );
}

function LectureFrame() {
  return (
    <figure className="w-full">
      <div className="aspect-[3/2] w-full overflow-hidden rounded-lg border border-border bg-muted">
        <img
          src={lectureUrl}
          alt="Professor Kim Sneppen presenting his research"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="mt-3 text-[11px] italic text-muted-foreground">
        Courtesy of Center for Interdisciplinary Studies, Westlake University
      </figcaption>
    </figure>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <header className="reveal">
      <span className="eyebrow">{label}</span>
      <h2 className="mt-3 text-3xl md:text-4xl lg:text-[2.6rem]">{title}</h2>
      <span
        aria-hidden
        className="mt-5 block h-px w-12 bg-accent/60"
      />
    </header>
  );
}

function Index() {
  const year = new Date().getFullYear();
  const scrolled = useScrolled(120);
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const sectionClass = "scroll-mt-24 py-20 md:py-22";

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      {/* NAV */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300",
          scrolled || menuOpen
            ? "border-b border-rule bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:gap-6 md:px-6 md:py-4"
        >
          <a
            href="#top"
            className="font-serif text-base tracking-tight text-foreground no-underline hover:text-accent"
          >
            Kim Sneppen
          </a>
          <ul className="hidden items-center gap-7 text-[13px] md:flex">
            {NAV.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={`#${item.href}`}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "no-underline transition-colors",
                      isActive
                        ? "text-accent"
                        : "text-foreground/70 hover:text-foreground",
                    ].join(" ")}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:hidden"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="13" x2="20" y2="13" />
                  <line x1="4" y1="19" x2="20" y2="19" />
                </>
              )}
            </svg>
          </button>
        </nav>
        {menuOpen && (
          <div
            id="mobile-nav"
            className="border-t border-rule bg-background/95 backdrop-blur md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2 text-[15px]">
              {NAV.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={`#${item.href}`}
                      onClick={() => setMenuOpen(false)}
                      className={[
                        "block py-3 no-underline",
                        isActive ? "text-accent" : "text-foreground/80",
                      ].join(" ")}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>

      <main id="top" className="mx-auto max-w-6xl px-5 md:px-6">
        {/* HERO */}
        <section className="pb-12 pt-24 md:pb-14 md:pt-28">
          <div className="reveal max-w-4xl">
            <p className="eyebrow">
              Niels Bohr Institute · University of Copenhagen
            </p>
            <h1 className="mt-5 text-[2.5rem] leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Kim Sneppen
            </h1>
            <p className="mt-5 max-w-2xl text-base text-foreground/80 sm:text-lg md:text-xl">
              Professor of Biocomplexity, Niels Bohr Institute, University of Copenhagen.
            </p>
            <p className="mt-7 max-w-2xl border-l-2 border-accent/60 pl-4 font-serif text-lg italic text-foreground/75 sm:pl-5 sm:text-xl md:text-2xl">
              “Modeling living systems with the tools of theoretical physics.”
            </p>
          </div>
          <div className="reveal mt-12 flex justify-center md:mt-16 md:justify-start">
            <Portrait />
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className={sectionClass}>
          <SectionHeading label="About" title="About" />
          <div className="reveal mt-10 measure space-y-6 text-[17px] leading-[1.75] text-foreground/85">
            <p>
              Kim Sneppen is a professor of biocomplexity at the Niels Bohr Institute,
              University of Copenhagen. He builds quantitative, physics-based theories
              of different biological phenomena including how cells hold stable epigenetic states,
              how growth and collapse dynamics inspired by Indian mythology may provide waves
              of diversity, how bacteria exploit spatial organization to hide from viruses,
              and how polar interactions between cells shapes sheets and tubes during
              embryo development.
            </p>
            <p>
            </p>
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research" className={sectionClass}>
          <SectionHeading label="Research" title="Research interests" />
          <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RESEARCH.map((r) => (
              <article
                key={r.title}
                className="rounded-lg border border-border bg-card p-7 transition-colors hover:border-accent/40"
              >
                <h3 className="font-serif text-[1.2rem] leading-snug">{r.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* PUBLICATIONS */}
        <section id="publications" className={sectionClass}>
          <SectionHeading label="Publications" title="Selected publications" />
          <p className="reveal mt-6 measure text-[15px] text-muted-foreground">
            Author of more than 250 peer-reviewed articles.
          </p>
          <ol className="reveal mt-12 measure space-y-6">
            {PUBLICATIONS.map((p, i) => (
              <li
                key={i}
                className="grid grid-cols-[2rem_1fr] gap-3 text-[15.5px] leading-[1.7] text-foreground/85"
              >
                <span className="font-serif text-muted-foreground tabular-nums">{i + 1}.</span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
          <div className="reveal mt-12">
            <a
              href="https://scholar.google.com/citations?user=LIBL6nQAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md border border-accent/70 px-6 py-3 text-sm font-medium text-accent no-underline transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View full publication list on Google Scholar →
            </a>
          </div>
        </section>


        {/* INTERACTIVE MODELS */}
        <section id="models" className={sectionClass}>
          <SectionHeading label="Interactive Models" title="Interactive models" />
          <p className="reveal mt-6 measure text-[15px] text-muted-foreground">
            Interactive simulations of the models developed in Kim Sneppen's research. Open
            each to explore it in your browser.
          </p>
          <div className="reveal mt-12 grid gap-6 sm:grid-cols-2">
            {MODELS.map((m) => (
              <article
                key={m.id}
                className="flex flex-col rounded-lg border border-border bg-card p-7 transition-colors hover:border-accent/40 md:p-8"
              >
                <h3 className="font-serif text-[1.3rem] leading-snug">{m.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                  {m.description}
                </p>
                {m.embed && m.status === "live" ? (
                  <div className="mt-6">
                    <div className="overflow-hidden rounded-md border border-border">
                      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                        <iframe
                          src={m.file}
                          title={m.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full"
                        />
                      </div>
                    </div>
                    <a
                      href={m.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-[13px] text-accent"
                    >
                      Open full screen ↗
                    </a>
                  </div>
                ) : m.status === "live" ? (
                  <div className="mt-auto pt-6">
                    <a
                      href={m.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-md border border-accent/70 px-5 py-2.5 text-[13px] font-medium text-accent no-underline transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Launch model →
                    </a>
                  </div>
                ) : (
                  <div className="mt-auto pt-6">
                    <span
                      aria-label="Coming soon"
                      className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      Coming soon
                    </span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* CV */}
        <section id="cv" className={sectionClass}>
          <SectionHeading label="Career" title="Career" />
          <ol className="reveal mt-12 max-w-3xl">
            {CV.map((c, i) => (
              <li
                key={c.years}
                className="relative grid grid-cols-1 gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:py-5"
              >
                {i !== CV.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-full h-px w-full bg-rule/70"
                  />
                )}
                <span className="font-serif text-[13px] font-medium tracking-tight text-accent tabular-nums sm:text-[13.5px]">
                  {c.years}
                </span>
                <span className="text-[15px] leading-relaxed text-foreground/85">
                  {c.role}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* WORK & BOOK */}
        <section id="work" className={sectionClass}>
          <SectionHeading label="Work & Book" title="Work & book" />
          <div className="reveal mt-12 grid gap-12 md:grid-cols-[1.25fr_1fr] md:gap-16">
            <div className="space-y-10">
              <div>
                <h3 className="font-serif text-[1.3rem]">Models of Life</h3>
                <p className="mt-1 text-[12.5px] uppercase tracking-[0.14em] text-muted-foreground">
                  Cambridge University Press, 2014
                </p>
                <p className="mt-5 text-[15.5px] leading-[1.75] text-foreground/85">
                  A graduate-level synthesis of how concepts from statistical physics — phase
                  transitions, noise, feedback, networks — illuminate the dynamics of cells,
                  organisms, and ecosystems. The book gathers two decades of teaching and
                  research at the interface of physics and biology.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-[1.3rem]">Research group</h3>
                <p className="mt-5 text-[15.5px] leading-[1.75] text-foreground/85">
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
            <LectureFrame />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className={sectionClass}>
          <SectionHeading label="Contact" title="Contact" />
          <div className="reveal mt-12 grid max-w-3xl gap-12 md:grid-cols-2">
            <dl className="space-y-6 text-[15px]">
              <div>
                <dt className="eyebrow text-[0.65rem]">Email</dt>
                <dd className="mt-2">
                  <a href="mailto:ksneppen@gmail.com">ksneppen@gmail.com</a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-[0.65rem]"></dt>
                <dd className="mt-2 text-foreground/85">
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-[0.65rem]">Address</dt>
                <dd className="mt-2 leading-[1.75] text-foreground/85">
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
              <p className="eyebrow text-[0.65rem]">Academic profiles</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {[
                  {
                    label: "Google Scholar",
                    href: "https://scholar.google.com/citations?user=LIBL6nQAAAAJ",
                  },
                  {
                    label: "ORCID",
                    href: "https://orcid.org/0000-0001-9820-3567",
                  },
                  {
                    label: "ResearchGate",
                    href: "https://www.researchgate.net/profile/Kim-Sneppen",
                  },
                ].map((p) => (
                  <li key={p.href}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-md border border-accent/70 px-4 py-2 text-[13px] font-medium text-accent no-underline transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {p.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-8 border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-[12px] text-muted-foreground">
          © {year} Kim Sneppen
        </div>
      </footer>
    </div>
  );
}
