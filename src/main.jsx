import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Building2,
  Cable,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  CloudCog,
  Copy,
  Download,
  Factory,
  GraduationCap,
  Headphones,
  HeartPulse,
  LifeBuoy,
  Mail,
  Menu,
  Network,
  Router,
  Search,
  Server,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Users,
  Wifi,
  Wrench,
  X,
} from "lucide-react";
import { categories, terms, checklist } from "./catalog.js";
import "./styles.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const withBase = (path) => `${basePath}${path}`;
const routes = Object.fromEntries(
  Object.entries({
    home: "/",
    services: "/services/",
    industries: "/industries/",
    projects: "/projects/",
    about: "/about/",
    contact: "/contact/",
    routers: "/routers/",
    rates: "/rates/",
    estimate: "/estimate/",
    terms: "/terms/",
  }).map(([name, path]) => [name, withBase(path)]),
);
const contactEmail = "sandipsharma0206@gmail.com";
const industrySlug = (label) =>
  label
    .toLowerCase()
    .replaceAll("&", "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const page =
  location.pathname.slice(basePath.length).split("/").filter(Boolean)[0] ||
  "home";
const icons = [
  Network,
  Wifi,
  Cable,
  Server,
  Server,
  Router,
  SlidersHorizontal,
  Cable,
  Wrench,
  CloudCog,
];
const descriptions = [
  "Structured and scalable network solutions.",
  "Seamless connectivity across your premises.",
  "High-speed, high-reliability fiber solutions.",
  "Powerful, secure and always-ready infrastructure.",
  "Optimized for performance and security.",
  "Stronger security, better control.",
  "Monitor, protect and stay in control.",
  "Clean, organized, future-ready cabling.",
  "Maximum uptime, minimum disruptions.",
  "Smart design. Seamless execution.",
];
const serviceBanners = [
  "/network-infrastructure",
  "/connecting-network-cables-in-server-room.jpg",
  "/fiberlan",
  "/data-centre-corridor.png",
  "/server-installation-configuration-service.webp",
  "/switches-routeers.webp",
  "/CCTV-Surveillance-Networking.webp",
  "/cable-tray-fitted.jpg",
  "/Annual-Maintenance-Contracts-alimtedad.webp",
  "/router-hero.png",
];
const catalogue = categories.flatMap((category, categoryIndex) =>
  category.rows.map((row, rowIndex) => ({
    id: `${categoryIndex}-${rowIndex}`,
    categoryIndex,
    category: category.title,
    name: row[0],
    unit: row[1],
    rate: row[2],
    note: row[3],
  })),
);
const itemMap = new Map(catalogue.map((item) => [item.id, item]));
const money = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const range = (value) => {
  const v = (value.match(/[\d,]+/g) || []).map((x) =>
    Number(x.replaceAll(",", "")),
  );
  return v.length === 2 ? v : null;
};
const readEstimate = () => {
  try {
    const stored = JSON.parse(
      localStorage.getItem("rizztech-estimate-v1") || "{}",
    );
    return Object.fromEntries(
      Object.entries(stored).filter(
        ([id, qty]) => itemMap.has(id) && Number.isFinite(+qty) && +qty > 0,
      ),
    );
  } catch {
    return {};
  }
};

function Logo({ light = false, compact = false }) {
  return (
    <>
      <a
        className={`logo ${light ? "logo-light" : ""}`}
        href={routes.home}
        aria-label="RizzTech home"
      >
        <img src={withBase("/logo-mark.png")} alt="" />
        {!compact && <span>RizzTech</span>}
      </a>
      <p>The Standard for Performance</p>
    </>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const previousBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);
  const serviceLinks = [
    ["All services", routes.services],
    ["Routers", routes.routers],
    ["Rate guide", routes.rates],
    ["Estimate", routes.estimate],
    ["Terms", routes.terms],
  ];
  const industryLinks = industries.map(([label]) => [
    label,
    `${routes.industries}#${industrySlug(label)}`,
  ]);
  return (
    <header className="site-header">
      <div className="shell header-row">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          <a className={page === "home" ? "active" : ""} href={routes.home}>
            Home
          </a>
          <div className="nav-dropdown">
            <a
              className={
                page === "services" || page === "routers" || page === "rates"
                  ? "active"
                  : ""
              }
              href={routes.services}
            >
              Services <ChevronDown size={12} />
            </a>
            <div className="dropdown-panel">
              {serviceLinks.map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="nav-dropdown">
            <a
              className={page === "industries" ? "active" : ""}
              href={routes.industries}
            >
              Industries <ChevronDown size={12} />
            </a>
            <div className="dropdown-panel industry-dropdown-panel">
              <a className="dropdown-overview" href={routes.industries}>
                All Industries <ArrowRight size={14} />
              </a>
              {industryLinks.map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <a
            className={page === "projects" ? "active" : ""}
            href={routes.projects}
          >
            Projects
          </a>
          <a className={page === "about" ? "active" : ""} href={routes.about}>
            About Us
          </a>
          <a
            className={page === "contact" ? "active" : ""}
            href={routes.contact}
          >
            Contact
          </a>
        </nav>
        <a className="btn btn-primary header-quote" href={routes.estimate}>
          Get a Quote <ArrowRight size={15} />
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href={routes.home}>Home</a>
          <div className="mobile-nav-group">
            <div className="mobile-nav-heading">
              <button
                className="mobile-nav-toggle"
                type="button"
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-services-menu"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                Services <ChevronDown size={18} />
              </button>
            </div>
            {mobileServicesOpen && (
              <div className="mobile-nav-submenu" id="mobile-services-menu">
                {serviceLinks.map(([label, href]) => (
                  <a key={href} href={href}>
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="mobile-nav-group">
            <div className="mobile-nav-heading">
              <button
                className="mobile-nav-toggle"
                type="button"
                aria-expanded={mobileIndustriesOpen}
                aria-controls="mobile-industries-menu"
                onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
              >
                Industries <ChevronDown size={18} />
              </button>
            </div>
            {mobileIndustriesOpen && (
              <div className="mobile-nav-submenu" id="mobile-industries-menu">
                <a href={routes.industries}>All Industries</a>
                {industryLinks.map(([label, href]) => (
                  <a key={href} href={href}>
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>
          {[
            ["Projects", routes.projects],
            ["About Us", routes.about],
            ["Contact", routes.contact],
            ["Get a Quote", routes.estimate],
          ].map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="section-label">
      <span /> {children}
    </p>
  );
}
function ServiceCard({ category, index }) {
  const Icon = icons[index];
  const href =
    index === 5 ? routes.routers : `${routes.rates}?category=${index}`;
  return (
    <a className="service-card" href={href}>
      <span className="card-icon">
        <Icon size={28} strokeWidth={2.3} />
      </span>
      <h3>{category.title}</h3>
      <p>{descriptions[index]}</p>
      <span className="card-arrow">
        <ArrowRight size={18} />
      </span>
    </a>
  );
}

const benefits = [
  [Users, "Experienced Team"],
  [ShieldCheck, "Quality Assurance"],
  [Headphones, "24/7 Support"],
  [Clock3, "On-Time Delivery"],
  [Network, "Scalable Solutions"],
  [Server, "Cost-Effective Services"],
];
const industries = [
  ["Corporate Offices", Building2, 0],
  ["Data Centres", Server, 1],
  ["Banking & Financial Services", Building2, 2],
  ["Manufacturing", Factory, 3],
  ["Education", GraduationCap, 4],
  ["Healthcare", HeartPulse, 5],
  ["Retail", ShoppingBag, 6],
];
const industryDetails = [
  [
    "Connected workspaces with dependable LAN, Wi-Fi and day-to-day support.",
    [0, 1, 8],
  ],
  [
    "Organized racks, server rooms and infrastructure built for reliable operation.",
    [3, 4, 9],
  ],
  [
    "Secure, resilient networks for essential financial systems and surveillance.",
    [5, 6, 8],
  ],
  [
    "Reliable connectivity across production floors, offices and connected equipment.",
    [0, 1, 5],
  ],
  [
    "Campus-wide connectivity for learning spaces, staff and shared resources.",
    [0, 1, 6],
  ],
  [
    "Dependable networks for care teams, facilities and critical communications.",
    [0, 1, 8],
  ],
  [
    "Flexible connectivity for stores, devices and customer-facing systems.",
    [0, 1, 6],
  ],
];

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-shade" />
        <div className="shell hero-layout">
          <div className="hero-content">
            <p className="hero-kicker">
              COMPLETE NETWORK INFRASTRUCTURE &amp; DATA CENTRE SOLUTIONS
            </p>
            <h1>
              Build a Smarter,
              <br />
              <span>More Connected</span>
              <br />
              Tomorrow
            </h1>
            <p className="hero-description">
              We design, deploy and manage end-to-end network infrastructure and
              data centre solutions to keep your business secure, connected and
              future-ready.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={routes.services}>
                Explore Our Services <ArrowRight size={17} />
              </a>
              <a className="btn btn-outline" href={routes.contact}>
                Talk to Our Experts
              </a>
            </div>
          </div>
          <div
            className="hero-brand"
            aria-label="RizzTech — The Standard for Performance"
          >
            <img src={withBase("/logo-mark.png")} alt="RizzTech icon" />
            <strong>RizzTech</strong>
            <em>The Standard for Performance</em>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <SectionLabel>OUR SERVICES</SectionLabel>
              <h2>End-to-End Network Solutions</h2>
              <p>
                From network setup to data centres, we deliver reliable,
                scalable and secure solutions for businesses of all sizes.
              </p>
            </div>
            <a className="text-link" href={routes.services}>
              View All Services <ArrowRight size={16} />
            </a>
          </div>
          <div className="service-grid">
            {categories.map((category, index) => (
              <ServiceCard
                key={category.title}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="partner-section" id="about">
        <div className="shell partner-layout" id="projects">
          <div className="partner-photo">
            <img
              src={withBase("/data-centre-corridor.png")}
              alt="Blue-lit data centre corridor"
            />
            <div className="photo-caption">
              <ShieldCheck size={24} />
              <span>
                Reliable Infrastructure.
                <br />
                Lasting Partnerships.
              </span>
            </div>
          </div>
          <div className="partner-content">
            <SectionLabel>WHY CHOOSE US</SectionLabel>
            <h2>
              Your Trusted Network
              <br />
              Infrastructure Partner
            </h2>
            <p>
              At RizzTech, we combine technical expertise, quality solutions and
              dedicated support to deliver networks and data centre
              infrastructure that meets your business goals.
            </p>
            <a className="btn btn-primary" href={routes.about}>
              Learn More <ArrowRight size={16} />
            </a>
            <div className="benefit-grid">
              {benefits.map(([Icon, label]) => (
                <div className="benefit" key={label}>
                  <span>
                    <Icon size={23} />
                  </span>
                  <strong>{label}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="industry-section" id="industries">
        <div className="shell industry-layout">
          <div className="industry-copy">
            <SectionLabel>INDUSTRIES WE SERVE</SectionLabel>
            <h2>
              Tailored Solutions for
              <br />
              Every Industry
            </h2>
            <p>
              We work with businesses across various sectors to build robust and
              secure network infrastructures.
            </p>
            <a className="btn btn-line" href={routes.industries}>
              Explore Industries <ArrowRight size={16} />
            </a>
          </div>
          <div className="industry-grid">
            {industries.map(([label, Icon, index]) => (
              <a
                href={`${routes.industries}#${industrySlug(label)}`}
                className="industry-tile"
                key={label}
              >
                <span
                  className="industry-picture"
                  style={{
                    backgroundPosition: `${((index % 4) * 100) / 3}% ${Math.floor(index / 4) * 100}%`,
                  }}
                />
                <span className="industry-name">
                  <Icon size={17} />
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Stats />
    </>
  );
}

function Stats() {
  return (
    <section className="stats">
      <div className="shell stats-grid">
        {[
          [Boxes, "100+", "Successful Projects"],
          [Users, "50+", "Happy Clients"],
          [Network, "99.9%", "Network Uptime"],
          [LifeBuoy, "24/7", "Support & Maintenance"],
        ].map(([Icon, value, label]) => (
          <div key={label}>
            <Icon size={27} />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div className="footer-about">
          <Logo light />
        </div>
        <div>
          <h3>Quick Links</h3>
          <a href={routes.home}>Home</a>
          <a href={routes.services}>Services</a>
          <a href={routes.industries}>Industries</a>
          <a href={routes.projects}>Projects</a>
          <a href={routes.about}>About Us</a>
          <a href={routes.contact}>Contact</a>
        </div>
        <div>
          <h3>Our Services</h3>
          <a href={`${routes.rates}?category=0`}>
            Network Infrastructure &amp; LAN
          </a>
          <a href={`${routes.rates}?category=1`}>
            Wi-Fi &amp; Wireless Networking
          </a>
          <a href={`${routes.rates}?category=3`}>
            Data Centre &amp; Server Room
          </a>
          <a href={routes.routers}>Switches, Routers &amp; Firewalls</a>
          <a href={`${routes.rates}?category=8`}>AMC &amp; Support</a>
        </div>
        <div>
          <h3>Get in Touch</h3>
          <a href={routes.contact}>
            Contact RizzTech <ArrowUpRight size={14} />
          </a>
          <a className="footer-email" href={`mailto:${contactEmail}`}>
            {contactEmail} <ArrowUpRight size={14} />
          </a>
          <a href={routes.estimate}>
            Request a quotation <ArrowUpRight size={14} />
          </a>
          <p>
            Network Infrastructure &amp;
            <br />
            Data Centre Solutions
          </p>
          <a href={routes.rates}>
            Explore rates <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} RizzTech. All rights reserved.</span>
        <span>
          Indicative rates in Indian Rupees. Final pricing follows the agreed
          quotation.
        </span>
      </div>
    </footer>
  );
}

function PageHero({ eyebrow, title, intro, image = "/server-room-hero.png" }) {
  return (
    <section
      className="page-hero"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(2,17,43,.95), rgba(2,20,48,.78) 53%, rgba(2,20,48,.25)), url(${withBase(image)})`,
      }}
    >
      <div className="shell">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );
}
function PageIntro({ title, text }) {
  return (
    <div className="page-intro">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR SERVICES"
        title="End-to-End Network Solutions"
        intro="Explore the work behind connected, secure and dependable business infrastructure."
      />
      <main className="page-body shell">
        <PageIntro
          title="What we do"
          text="Choose a service category to see the individual services and indicative labour rates."
        />
        <div className="service-grid interior-cards">
          {categories.map((category, index) => (
            <ServiceCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
        <div className="page-cta">
          <h2>Planning a project?</h2>
          <p>
            Build an indicative labour estimate from the service rate guide.
          </p>
          <a className="btn btn-primary" href={routes.estimate}>
            Create an Estimate <ArrowRight size={16} />
          </a>
        </div>
      </main>
    </>
  );
}

function IndustriesPage() {
  useEffect(() => {
    const scrollToIndustry = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (id) document.getElementById(id)?.scrollIntoView();
    };
    requestAnimationFrame(scrollToIndustry);
    window.addEventListener("hashchange", scrollToIndustry);
    return () => window.removeEventListener("hashchange", scrollToIndustry);
  }, []);
  return (
    <>
      <PageHero
        eyebrow="INDUSTRIES WE SERVE"
        title="Tailored Solutions for Every Industry"
        intro="Network infrastructure, data centre and support services shaped around the places you work."
      />
      <main className="page-body shell">
        <PageIntro
          title="Built for your environment"
          text="Explore the sectors we serve and the services that support their day-to-day connectivity."
        />
        <div className="industry-detail-grid">
          {industries.map(([label, Icon, index]) => (
            <section
              className="industry-detail-card"
              id={industrySlug(label)}
              key={label}
            >
              <div
                className="industry-detail-photo"
                style={{
                  backgroundPosition: `${((index % 4) * 100) / 3}% ${Math.floor(index / 4) * 100}%`,
                }}
                role="img"
                aria-label={`${label} infrastructure`}
              />
              <div className="industry-detail-content">
                <span className="card-icon">
                  <Icon size={25} />
                </span>
                <h2>{label}</h2>
                <p>{industryDetails[index][0]}</p>
                <div className="industry-service-links">
                  {industryDetails[index][1].map((categoryIndex) => (
                    <a
                      key={categoryIndex}
                      href={`${routes.rates}?category=${categoryIndex}`}
                    >
                      {categories[categoryIndex].title}{" "}
                      <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
        <div className="page-cta">
          <h2>Have a project in mind?</h2>
          <p>
            Start with an indicative estimate, then confirm the details for your
            site and scope.
          </p>
          <a className="btn btn-primary" href={routes.estimate}>
            Build an Estimate <ArrowRight size={16} />
          </a>
        </div>
      </main>
    </>
  );
}

const projectTypes = [
  {
    title: "Office Network Rollout",
    text: "Structured cabling, network points, racks and Wi-Fi for a connected workplace.",
    icon: Network,
    image: "/industries-grid.png",
    imagePosition: "0% 0%",
    rateCategory: 0,
  },
  {
    title: "Data Centre & Server Room",
    text: "Rack planning, installation, cable management and server room connectivity.",
    icon: Server,
    image: "/data-centre-corridor.png",
    rateCategory: 3,
  },
  {
    title: "Wireless Coverage",
    text: "Coverage surveys, access point deployment and reliable guest or staff Wi-Fi.",
    icon: Wifi,
    image: "/industries-grid.png",
    imagePosition: "33.333% 0%",
    rateCategory: 1,
  },
  {
    title: "Network Security Upgrade",
    text: "Switch, router and firewall work that gives your network a stronger foundation.",
    icon: ShieldCheck,
    image: "/router-hero.png",
    rateCategory: 5,
  },
  {
    title: "Fiber Backbone",
    text: "Fiber pulling, splicing, termination and link testing across your site.",
    icon: Cable,
    image: "/server-room-hero.png",
    rateCategory: 2,
  },
  {
    title: "Surveillance Network",
    text: "IP camera connectivity, recorder setup and troubleshooting for site visibility.",
    icon: SlidersHorizontal,
    image: "/industries-grid.png",
    imagePosition: "100% 0%",
    rateCategory: 6,
  },
];
const projectSteps = [
  ["01", "Survey", "Understand the site, access conditions and scope."],
  ["02", "Design", "Plan equipment, routes and work quantities."],
  ["03", "Deploy", "Install, configure and test the solution."],
  ["04", "Handover", "Document the work and agree support needs."],
];

function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="PROJECTS & DELIVERY"
        title="Projects Built to Perform"
        intro="From a single network upgrade to a complete site rollout, explore the project work RizzTech can plan and deliver."
        image="/data-centre-corridor.png"
      />
      <main className="page-body shell">
        <PageIntro
          title="Project solutions"
          text="Select a project type to explore the related services and indicative labour rates."
        />
        <div className="project-grid">
          {projectTypes.map(
            ({
              title,
              text,
              icon: Icon,
              image,
              imagePosition,
              rateCategory,
            }) => (
              <article className="project-card" key={title}>
                <div
                  className={`project-photo ${imagePosition ? "project-photo-grid" : ""}`}
                  style={{
                    backgroundImage: `url(${withBase(image)})`,
                    backgroundPosition: imagePosition || "center",
                  }}
                />
                <div className="project-card-body">
                  <span className="card-icon">
                    <Icon size={25} />
                  </span>
                  <h2>{title}</h2>
                  <p>{text}</p>
                  <a
                    className="text-link"
                    href={`${routes.rates}?category=${rateCategory}`}
                  >
                    Explore services <ArrowRight size={15} />
                  </a>
                </div>
              </article>
            ),
          )}
        </div>
        <section className="project-process">
          <SectionLabel>HOW WE WORK</SectionLabel>
          <h2>From first survey to final handover</h2>
          <div className="process-grid">
            {projectSteps.map(([number, title, text]) => (
              <div key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="page-cta">
          <h2>Tell us about your project</h2>
          <p>
            Share your site, scope and priorities in an enquiry draft or build a
            starting estimate.
          </p>
          <div className="cta-actions">
            <a className="btn btn-primary" href={routes.contact}>
              Start an Enquiry <ArrowRight size={16} />
            </a>
            <a className="btn btn-line" href={routes.estimate}>
              Build an Estimate
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT RIZZTECH"
        title="The Standard for Performance"
        intro="Network infrastructure and data centre solutions designed around reliable connections, clear delivery and lasting support."
      />
      <main className="page-body shell">
        <section className="about-intro">
          <div className="about-image">
            <img
              src={withBase("/data-centre-corridor.png")}
              alt="Modern data centre aisle"
            />
          </div>
          <div>
            <SectionLabel>WHO WE ARE</SectionLabel>
            <h2>Connecting the systems that keep business moving</h2>
            <p>
              RizzTech focuses on the practical infrastructure behind secure,
              dependable operations: LAN, Wi-Fi, fiber, server rooms, network
              devices, surveillance networking and ongoing maintenance.
            </p>
            <p>
              Every project begins with the site and its requirements. We plan
              the work, agree the scope, then install, configure, test and
              document the result.
            </p>
            <a className="btn btn-primary" href={routes.services}>
              Explore Our Services <ArrowRight size={16} />
            </a>
          </div>
        </section>
        <section className="about-values">
          <SectionLabel>OUR APPROACH</SectionLabel>
          <h2>Clear work. Reliable outcomes.</h2>
          <div className="value-grid">
            {[
              [
                ShieldCheck,
                "Quality First",
                "Testing, documentation and handover follow the agreed scope.",
              ],
              [
                Network,
                "Built to Scale",
                "Infrastructure plans account for the way your network may grow.",
              ],
              [
                Headphones,
                "Support Mindset",
                "Maintenance and response terms are defined before work begins.",
              ],
              [
                Clock3,
                "Defined Delivery",
                "Scope, milestones and expectations are made clear in the quotation.",
              ],
            ].map(([Icon, title, text]) => (
              <div className="value-card" key={title}>
                <span className="card-icon">
                  <Icon size={26} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="page-cta">
          <h2>Let's plan the right solution</h2>
          <p>
            Explore the services or prepare the details of your next project.
          </p>
          <div className="cta-actions">
            <a className="btn btn-primary" href={routes.contact}>
              Contact RizzTech <ArrowRight size={16} />
            </a>
            <a className="btn btn-line" href={routes.projects}>
              View Project Types
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "General enquiry",
    message: "",
  });
  const [draft, setDraft] = useState("");
  const [copyState, setCopyState] = useState("");
  useEffect(() => {
    if (draft)
      document
        .getElementById("enquiry-draft")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [draft]);
  const selected = Object.entries(readEstimate())
    .map(([id, quantity]) => ({ item: itemMap.get(id), quantity }))
    .filter(({ item }) => item);
  const update = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setDraft("");
    setCopyState("");
  };
  const prepare = (event) => {
    event.preventDefault();
    const lines = [
      "RizzTech Project Enquiry",
      "",
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      form.phone.trim() ? `Phone: ${form.phone.trim()}` : null,
      `Service interest: ${form.service}`,
      "",
      "Project details:",
      form.message.trim(),
      selected.length
        ? "\nServices in estimate:\n" +
          selected
            .map(
              ({ item, quantity }) =>
                `- ${item.name} (${quantity} × ${item.unit}; ${range(item.rate) ? `₹${item.rate}` : item.rate})`,
            )
            .join("\n")
        : null,
    ].filter((line) => line !== null);
    setDraft(lines.join("\n"));
    setCopyState("");
  };
  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopyState("Copied to clipboard");
    } catch {
      setCopyState(
        "Copy unavailable in this browser. Select the draft text below.",
      );
    }
  };
  const downloadDraft = () => {
    const url = URL.createObjectURL(
      new Blob([draft], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "rizztech-enquiry.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const emailHref = `mailto:${contactEmail}?subject=${encodeURIComponent(`RizzTech Project Enquiry — ${form.service}`)}&body=${encodeURIComponent(draft)}`;
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Let's Build What's Next"
        intro="Tell us about your site, the services you need and what you want to achieve."
      />
      <main className="page-body shell">
        <div className="contact-layout">
          <section>
            <SectionLabel>YOUR PROJECT</SectionLabel>
            <h2>Share the details</h2>
            <p className="contact-intro">
              Prepare your enquiry below, then open it in your email app to send
              to RizzTech.
            </p>
            <form className="contact-form" onSubmit={prepare}>
              <div className="form-two">
                <label>
                  Full name{" "}
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={update}
                    placeholder="Your name"
                  />
                </label>
                <label>
                  Email address{" "}
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={update}
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <div className="form-two">
                <label>
                  Phone (optional){" "}
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={update}
                    placeholder="Your phone number"
                  />
                </label>
                <label>
                  Service interest{" "}
                  <select name="service" value={form.service} onChange={update}>
                    <option>General enquiry</option>
                    {categories.map((category) => (
                      <option key={category.title}>{category.title}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Project details{" "}
                <textarea
                  name="message"
                  required
                  rows="6"
                  value={form.message}
                  onChange={update}
                  placeholder="Tell us about your site, timeline and what you need..."
                />
              </label>
              <button className="btn btn-primary" type="submit">
                Prepare Enquiry <ArrowRight size={16} />
              </button>
            </form>
          </section>
          <aside className="contact-side">
            <span className="card-icon">
              <Headphones size={28} />
            </span>
            <h2>Start with the right information</h2>
            <p>
              Useful details include your site location, number of network
              points or devices, access conditions, expected timeline and
              support needs.
            </p>
            <a className="text-link" href={`mailto:${contactEmail}`}>
              <Mail size={16} />
              {contactEmail}
            </a>
            <a className="text-link" href={routes.estimate}>
              Build a labour estimate <ArrowRight size={15} />
            </a>
            <a className="text-link" href={routes.terms}>
              Review quotation terms <ArrowRight size={15} />
            </a>
            {selected.length > 0 && (
              <div className="contact-estimate-note">
                <Check size={17} />
                {selected.length} estimated service
                {selected.length === 1 ? "" : "s"} will be included in your
                enquiry draft.
              </div>
            )}
          </aside>
        </div>
        {draft && (
          <section
            className="draft-panel"
            id="enquiry-draft"
            aria-live="polite"
          >
            <div>
              <SectionLabel>READY TO SEND</SectionLabel>
              <h2>Your enquiry draft</h2>
              <p>
                Review the text, then open your email app to send it to{" "}
                {contactEmail}.
              </p>
            </div>
            <textarea
              aria-label="Prepared enquiry draft"
              readOnly
              value={draft}
              rows="12"
            />
            <div className="draft-actions">
              <a className="btn btn-primary" href={emailHref}>
                <Mail size={16} /> Open Email to Send
              </a>
              <button
                className="btn btn-line"
                type="button"
                onClick={copyDraft}
              >
                <Copy size={16} /> Copy Draft
              </button>
              <button
                className="btn btn-line"
                type="button"
                onClick={downloadDraft}
              >
                <Download size={16} /> Download .txt
              </button>
              {copyState && <span role="status">{copyState}</span>}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

function RateTable({ items, onAdd }) {
  return (
    <div className="rate-table-wrap">
      <table className="rate-table">
        <thead>
          <tr>
            <th>Service / Work Description</th>
            <th>Unit</th>
            <th>Suggested Rate</th>
            <th>Notes / Included Work</th>
            {onAdd && <th>Estimate</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.unit}</td>
              <td className="rate-cell">
                {item.rate === "Custom quotation" ||
                item.rate === "Site quotation"
                  ? item.rate
                  : `₹${item.rate}`}
              </td>
              <td>{item.note}</td>
              {onAdd && (
                <td>
                  <button
                    className="add-rate"
                    type="button"
                    onClick={() => onAdd(item.id)}
                  >
                    Add <ArrowRight size={14} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function useEstimate() {
  const [estimate, setEstimate] = useState(readEstimate);
  const update = (id, quantity) =>
    setEstimate((current) => {
      const next = { ...current };
      if (quantity > 0) next[id] = quantity;
      else delete next[id];
      localStorage.setItem("rizztech-estimate-v1", JSON.stringify(next));
      return next;
    });
  return [estimate, update];
}

function RatesPage() {
  const initial = new URLSearchParams(location.search).get("category");
  const [category, setCategory] = useState(
    initial !== null && categories[+initial] ? initial : "all",
  );
  const [query, setQuery] = useState("");
  const [estimate, update] = useEstimate();
  const results = useMemo(
    () =>
      catalogue.filter(
        (item) =>
          (category === "all" || item.categoryIndex === +category) &&
          `${item.name} ${item.note} ${item.category}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [category, query],
  );
  const selectedCategory = category === "all" ? null : categories[+category];
  const selectedBanner = category === "all" ? null : serviceBanners[+category];
  return (
    <>
      <PageHero
        eyebrow={selectedCategory ? "SERVICE CATEGORY" : "RATE GUIDE"}
        title={selectedCategory?.title || "Service Rate Guide"}
        intro="Browse indicative labour and service rates in Indian Rupees. Confirm final pricing after a site survey and scope review."
        image={selectedBanner || "/server-room-hero.png"}
      />
      <main className="page-body shell">
        <PageIntro
          title="Find the work. See the range."
          text="Search the complete service list or filter by category. Add services to your browser-local estimate."
        />
        <div className="rate-controls">
          <label className="search-box">
            <Search size={19} />
            <input
              aria-label="Search services"
              placeholder="Search services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="select-box">
            <SlidersHorizontal size={18} />
            <select
              aria-label="Filter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((c, i) => (
                <option key={c.title} value={i}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>
          <a className="btn btn-primary" href={routes.estimate}>
            Estimate ({Object.keys(estimate).length}) <ArrowRight size={15} />
          </a>
        </div>
        <p className="result-count">{results.length} services found</p>
        {results.length ? (
          <RateTable
            items={results}
            onAdd={(id) => update(id, (estimate[id] || 0) + 1)}
          />
        ) : (
          <div className="empty-state">
            <CircleHelp />
            <h3>No services found</h3>
            <p>Try a different search or category.</p>
          </div>
        )}
        <p className="rate-disclaimer">
          Rates are suggested starting estimates for budgeting and quotation
          preparation. Equipment, material, GST, transport and other expenses
          are separate unless stated in writing.
        </p>
      </main>
    </>
  );
}

function RoutersPage() {
  const routerItems = catalogue.filter((item) => item.categoryIndex === 5);
  return (
    <>
      <PageHero
        eyebrow="ROUTER SERVICES"
        title="Switches, Routers & Firewalls"
        intro="Practical installation, configuration and troubleshooting services for your business network."
        image="/router-hero.png"
      />
      <main className="page-body shell">
        <PageIntro
          title="Router and network device services"
          text="Explore the router, switching and firewall work in the RizzTech rate guide."
        />
        <div className="router-feature-grid">
          {[
            [
              Router,
              "Router configuration",
              "Configure dependable routing for your network.",
            ],
            [
              ShieldCheck,
              "Firewall setup",
              "Protect your network with clear access rules.",
            ],
            [
              Network,
              "Switching & VLANs",
              "Connect people, devices and locations with control.",
            ],
          ].map(([Icon, title, desc]) => (
            <div className="router-feature" key={title}>
              <span className="card-icon">
                <Icon size={27} />
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
        <h2 className="subheading">Suggested service rates</h2>
        <RateTable items={routerItems} />
        <div className="page-cta">
          <h2>Need a tailored quotation?</h2>
          <p>
            Add router work to a budget estimate, then confirm the scope with
            RizzTech.
          </p>
          <a className="btn btn-primary" href={`${routes.rates}?category=5`}>
            Explore Router Rates <ArrowRight size={16} />
          </a>
        </div>
      </main>
    </>
  );
}

function EstimatePage() {
  const [estimate, update] = useEstimate();
  const [pick, setPick] = useState(catalogue[0].id);
  const selected = Object.entries(estimate)
    .map(([id, qty]) => ({ ...itemMap.get(id), qty: +qty }))
    .filter((item) => item.id);
  const priced = selected.filter((item) => range(item.rate));
  const low = priced.reduce(
    (sum, item) => sum + range(item.rate)[0] * item.qty,
    0,
  );
  const high = priced.reduce(
    (sum, item) => sum + range(item.rate)[1] * item.qty,
    0,
  );
  return (
    <>
      <PageHero
        eyebrow="QUOTATION PLANNER"
        title="Build an Estimate"
        intro="Prepare an indicative labour budget from the RizzTech service rate guide. Your selections stay in this browser."
      />
      <main className="page-body shell">
        <PageIntro
          title="Your project, in one place"
          text="Choose services, set quantities and use the range as a starting point for a final quotation."
        />
        <div className="estimate-picker">
          <select
            aria-label="Choose a service"
            value={pick}
            onChange={(e) => setPick(e.target.value)}
          >
            {categories.map((c, ci) => (
              <optgroup key={c.title} label={c.title}>
                {c.rows.map((row, ri) => (
                  <option key={`${ci}-${ri}`} value={`${ci}-${ri}`}>
                    {row[0]} — {row[2]}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => update(pick, (estimate[pick] || 0) + 1)}
          >
            Add Service <ArrowRight size={15} />
          </button>
        </div>
        {selected.length ? (
          <>
            <div className="estimate-list">
              {selected.map((item) => (
                <div className="estimate-line" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>
                      {item.category} · {item.unit} ·{" "}
                      {item.rate === "Custom quotation" ||
                      item.rate === "Site quotation"
                        ? item.rate
                        : `₹${item.rate}`}
                    </span>
                  </div>
                  <label>
                    Qty{" "}
                    <input
                      type="number"
                      min="1"
                      max="9999"
                      value={item.qty}
                      onChange={(e) =>
                        update(
                          item.id,
                          Math.max(1, Number(e.target.value) || 1),
                        )
                      }
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => update(item.id, 0)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="estimate-total">
              <div>
                <span>Indicative labour range</span>
                <strong>
                  {money(low)} – {money(high)}
                </strong>
              </div>
              <small>
                {selected.length - priced.length > 0
                  ? `${selected.length - priced.length} site or custom quotation item(s) excluded from total. `
                  : ""}
                Materials, taxes and other expenses are excluded.
              </small>
            </div>
            <button
              className="clear-button"
              type="button"
              onClick={() => selected.forEach((item) => update(item.id, 0))}
            >
              Clear estimate
            </button>
          </>
        ) : (
          <div className="empty-state">
            <Boxes size={30} />
            <h3>No services added yet</h3>
            <p>Choose a service above or add one from the rate guide.</p>
            <a className="text-link" href={routes.rates}>
              Browse rate guide <ArrowRight size={15} />
            </a>
          </div>
        )}
        <div className="page-cta">
          <h2>Before you quote</h2>
          <p>
            Review the commercial terms and agree the scope, milestones, taxes
            and exclusions.
          </p>
          <a className="btn btn-primary" href={routes.terms}>
            Review Terms <ArrowRight size={16} />
          </a>
        </div>
      </main>
    </>
  );
}

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="COMMERCIAL TERMS"
        title="Clear Terms. Clear Handover."
        intro="Use the commercial terms and quotation checklist to agree what is included, what is excluded and what happens next."
      />
      <main className="page-body shell">
        <div className="terms-layout">
          <section>
            <h2>Commercial Terms &amp; Conditions</h2>
            <div className="terms-list">
              {terms.map(([title, desc]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </section>
          <aside className="checklist">
            <h2>Customer Quotation Checklist</h2>
            <p>Make sure each item is covered before confirming the project.</p>
            {checklist.map((item) => (
              <div key={item}>
                <Check size={17} />
                <span>{item}</span>
              </div>
            ))}
          </aside>
        </div>
      </main>
    </>
  );
}

function App() {
  const content = {
    home: <Home />,
    services: <ServicesPage />,
    industries: <IndustriesPage />,
    projects: <ProjectsPage />,
    about: <AboutPage />,
    contact: <ContactPage />,
    routers: <RoutersPage />,
    rates: <RatesPage />,
    estimate: <EstimatePage />,
    terms: <TermsPage />,
  }[page] || <Home />;
  return (
    <>
      <Header />
      {content}
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
