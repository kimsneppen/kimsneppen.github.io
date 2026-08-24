import { useEffect, useState } from "react";
import portraitUrl from "@/assets/kim-sneppen-portrait.jpg";
import lectureUrl from "@/assets/kim-sneppen-lecture.jpg";
import complexPhysicsPdf from "@/assets/complex-physics.pdf.asset.json";

export default function App() {
  return <Index />;
}

const SCHOLAR_URL = "https://scholar.google.com/citations?user=LIBL6nQAAAAJ";

const NAV = [
  { href: "about", label: "About" },
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
  id: "Evolution",
  title: "Extinction Explorer",
  description:
    "Deep time exploration of life forms on earth",
  file: "/models/Extinction_Explorer_v95.html",
  image: "/images/btw.png",
  status: "live",
},  
  {
  id: "btw-sandpile",
  title: "BTW Sandpile + Game",
  description:
    "Self Organized Criticality: Office visualization, Variants and Game",
  file: "/models/btw_sandpile_v58.html",
  image: "/images/btw.png",
  status: "live",
},  
  {
  id: "Bak-Sneppen",
  title: "Bak-Sneppen model for punctuated equilibrium",
  description:
    "Co-evolving fitness landscapes: Change least fit and change its neighbors",
  file: "/models/bak_sneppen_10.html",
  image: "/images/btw.png",
  status: "live",
},
  {
    id: "talker-listener",
    title: "Talker Listener dynamics",
    description:
      "People networking by talking about each other and themselves.",
    file: "/models/talker_listener_applet_v54.html",
    status: "live",
  },
    {
    id: "Paradigm shift",
    title: "Kuhn on computer",
    description:
      "Paradigmshift in an evolutionary ecology of wrong ideas",
    file: "/models/rise_and_fall_of_wrong_ideas_v12.html",
    status: "live",
  },
  {
    id: "rabbit-fox-snake-plant",
    title: "Rabbit, Fox, Snake & Plant",
    description:
      "Plants in Predator–Prey systems open for increased diversity.",
    file: "/models/Rabbit-mobile.html",
    status: "live",
  },
  {
    id: "spatial-ecosystem",
    title: "Spatial Ecosystem",
    description:
      "Local competition in 2 dimension opens for high species diversity",
    file: "/models/Lichen19_activity.html",
    status: "live",
  },
  {
    id: "colony-phage",
    title: "Colony & Phage",
    description:
      "Phage infection of a growing bacterial colony.",
    file: "/models/phage_colony_v26_final.html",
    status: "live",
  },
  {
    id: "cell-polarity",
    title: "Cell Polarity Morphogenesis",
    description:
      "Random Baby Model: Morphology from polarity & sheets & tubes",
    file: "/models/cell-polarity-model-mobile.html",
    status: "live",
  },
  {
    id: "nucleosome-swi6",
    title: "Nucleosome & Swi6",
    description:
      "Epigenetics from nucleosome & Swi6 condensate",
    file: "/models/nucleosome_swi6-19.html",
    status: "live",
  },
  {
    id: "two-state-gillespie",
    title: "Mean field dynamics of condensate mediated epigenetics",
    description:
      "Equations for two-state epigenetics with nucleosomes & Swi6 condensate",
    file: "/models/two-state-gillespie.html",
    status: "live",
  },
    {
    id: "Merging-creation",
    title: "Merging-Creation network",
    description:
      "Dynamical Network with nodes added and nodes merging",
    file: "/models/merging-creation.html",
    status: "live",
  },    
  {
    id: "KS",
    title: "Kuramoto-Sivashinsky",
    description:
      "A Large dynamical system with deterministic chaos",
    file: "/models/kuramoto_sivashinsky_19.html",
    status: "live",
  },    
  {
    id: "Trimurti",
    title: "Trimurti dynamics",
    description:
      "Creation, growth and destruction in analogy with mythology and Phage-Bacteria systems",
    file: "/models/trimurti_12.html",
    status: "live",
  },
];


const CV = [
  { years: "2005–present", role: "Professor, Niels Bohr Institute, University of Copenhagen" },
  { years: "2006–present", role: "Member of the Royal Danish Academy of Sciences" },
  { years: "2023–present", role: "Participating PI in PANDEMIX center of excellence" },
  { years: "2017–2023", role: "PI at ERC advanced grant \"SOURCE\"" },
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
      {label && <span className="eyebrow">{label}</span>}
      <h2 className={`${label ? "mt-3" : ""} text-3xl md:text-4xl lg:text-[2.6rem]`}>{title}</h2>
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
              Professor of Biocomplexity, Niels Bohr Institute.
            </p>
            <p className="mt-7">
              <a
                href={SCHOLAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-md border border-accent/70 px-6 py-3 text-sm font-medium text-accent no-underline transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Publications on Google Scholar →
              </a>
            </p>
          </div>
          <div className="reveal mt-12 flex justify-center md:mt-16 md:justify-start">
            <Portrait />
          </div>
        </section>
        
        <section id="about" className={sectionClass}>
          <div className="reveal mt-10 measure space-y-6 text-[17px] leading-[1.75] text-foreground/85">
            <p>
            An observer of the small and the big in the living world, 
            attempting to catch life's universality in the language of physics. 
            Perhaps life's great richness comes not from battle, but from barriers? 
            This tale is explored five times over: In the genome, where chromatin marks are fenced in lest they wander; 
            in the sheets of cells that fold into our organs; 
            in colonies of bacteria protecting each other against viruses; 
            in the body's interferon signaling, providing self organized lockdowns to trap infection; 
            and in the plants of field and forest, giving hidings to animals. 
            In each, the same wonder occurs: behind living walls, 
            the winner does not take all, and many kinds may live where one alone would remain witout protection. 
            </p>
          </div>
        </section>

        {/* INTERACTIVE MODELS */}
        <section id="models" className={sectionClass}>
          <SectionHeading label="" title="Interactive models" />
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
          <SectionHeading label="" title="Career" />
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
          <SectionHeading label="" title="Work & book" />
          <div className="reveal mt-12 grid gap-12 md:grid-cols-[1.25fr_1fr] md:gap-16">
            <div className="space-y-10">
              <div>
                <h3 className="font-serif text-[1.3rem]">Physics in Molecular Biology</h3>
                <p className="mt-1 text-[12.5px] uppercase tracking-[0.14em] text-muted-foreground">
                  Co-authored with G. Zocchi, Cambridge University Press, 2005
                </p>
                <p className="mt-5 text-[15.5px] leading-[1.75] text-foreground/85">
                  A graduate-level synthesis of basic concepts in Biophysics, including polymer physics, random walks, 
                  helix-coil transition, protein folding, 
                  and Genetic regulation motivated by model organisms from the world of bacteriophages.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-[1.3rem]">Models of Life</h3>
                <p className="mt-1 text-[12.5px] uppercase tracking-[0.14em] text-muted-foreground">
                  Cambridge University Press, 2014
                </p>
                <p className="mt-5 text-[15.5px] leading-[1.75] text-foreground/85">
                  A graduate-level approach to model building in living systems. Focusses on within cell noise, gene regulation and epigenetics
                  but also includes introduction to networks,
                  organisms, and ecosystems. The book gathers two decades of teaching and
                  research at the interface of physics and biology.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-[1.3rem]">Complex Physics</h3>
                <p className="mt-1 text-[12.5px] uppercase tracking-[0.14em] text-muted-foreground">
                  Lecture notes
                </p>
                <p className="mt-5 text-[15.5px] leading-[1.75] text-foreground/85">
                  Lecture notes from my course on complex physics, covering topics of
                  statistical mechanics, percolation, self-organization,
                  networks, agent based models and econophysics.{" "}
                  <a
                    href={complexPhysicsPdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF →
                  </a>
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
          <SectionHeading label="" title="Contact" />
          <div className="reveal mt-12 grid max-w-3xl gap-12 md:grid-cols-2">
            <dl className="space-y-6 text-[15px]">
              <div>
                <dt className="eyebrow text-[0.65rem]">Email</dt>
                <dd className="mt-2">
                  <a href="mailto:ksneppen@gmail.com">ksneppen@gmail.com</a>
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
                    href: SCHOLAR_URL,
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
