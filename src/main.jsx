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
        className={`logo ${light ? "logo-light ![color:white]" : ""} inline-flex shrink-0 items-center gap-2 font-bold tracking-tight [font-size:24px] [color:#0a2349] [line-height:1] [&_img]:[width:76px] [&_img]:[height:52px] [&_img]:[object-fit:contain] max-[800px]:[&_img]:[width:60px] max-[800px]:[&_img]:[height:42px] max-[800px]:[font-size:21px]`}
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
    <header className="site-header relative z-30 bg-white shadow-sm">
      <div className="shell header-row mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px] flex items-center justify-between gap-6 [min-height:88px] max-[800px]:[min-height:72px]">
        <Logo />
        <nav
          className="desktop-nav flex items-center gap-8 [align-self:stretch] [&_>_a]:inline-flex [&_>_a]:items-center [&_>_a]:gap-1 [&_>_a]:text-sm [&_>_a]:font-semibold [&_>_a]:transition-colors [&_>_a]:[position:relative] [&_>_a]:[color:#102847] [&_>_a:hover]:[color:#0069d9] [&_.active]:[color:#006be8] [&_.active:after]:[content:''] [&_.active:after]:[position:absolute] [&_.active:after]:[bottom:-8px] [&_.active:after]:[left:0] [&_.active:after]:[right:0] [&_.active:after]:[height:2px] [&_.active:after]:[background:#0b71e9] max-[1100px]:[gap:16px] max-[1100px]:[&_>_a]:[font-size:12px] max-[800px]:[display:none]"
          aria-label="Main navigation"
        >
          <a className={page === "home" ? "active" : ""} href={routes.home}>
            Home
          </a>
          <div className="nav-dropdown [&_>_a]:inline-flex [&_>_a]:items-center [&_>_a]:gap-1 [&_>_a]:text-sm [&_>_a]:font-semibold [&_>_a]:transition-colors [&_>_a]:[position:relative] [&_>_a]:[color:#102847] [&_>_a:hover]:[color:#0069d9] relative flex items-center [&:hover_.dropdown-panel]:block [&:focus-within_.dropdown-panel]:block max-[1100px]:[&_>_a]:[font-size:12px]">
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
            <div className="dropdown-panel absolute left-0 top-full hidden min-w-[190px] rounded-xl bg-white p-2 shadow-xl [border:1px_solid_#e6edf5] [&_a]:block [&_a]:rounded-lg [&_a]:px-3 [&_a]:py-2 [&_a]:text-sm [&_a]:font-medium [&_a:hover]:[background:#edf6ff] [&_a:hover]:[color:#006be8]">
              {serviceLinks.map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="nav-dropdown [&_>_a]:inline-flex [&_>_a]:items-center [&_>_a]:gap-1 [&_>_a]:text-sm [&_>_a]:font-semibold [&_>_a]:transition-colors [&_>_a]:[position:relative] [&_>_a]:[color:#102847] [&_>_a:hover]:[color:#0069d9] relative flex items-center [&:hover_.dropdown-panel]:block [&:focus-within_.dropdown-panel]:block max-[1100px]:[&_>_a]:[font-size:12px]">
            <a
              className={page === "industries" ? "active" : ""}
              href={routes.industries}
            >
              Industries <ChevronDown size={12} />
            </a>
            <div className="dropdown-panel industry-dropdown-panel absolute left-0 top-full hidden min-w-[190px] rounded-xl bg-white p-2 shadow-xl [border:1px_solid_#e6edf5] [&_a]:block [&_a]:rounded-lg [&_a]:px-3 [&_a]:py-2 [&_a]:text-sm [&_a]:font-medium [&_a:hover]:[background:#edf6ff] [&_a:hover]:[color:#006be8] [min-width:270px] [max-height:70vh] [overflow-y:auto] [&_.dropdown-overview]:flex [&_.dropdown-overview]:items-center [&_.dropdown-overview]:justify-between [&_.dropdown-overview]:font-bold [&_.dropdown-overview]:[color:#006be8] [&_.dropdown-overview]:[border-bottom:1px_solid_#e6edf5] [&_.dropdown-overview]:[border-radius:0] [&_.dropdown-overview]:[margin-bottom:4px]">
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
        <a
          className="btn btn-primary header-quote inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)] px-5 max-[800px]:[display:none]"
          href={routes.estimate}
        >
          Get a Quote <ArrowRight size={15} />
        </a>
        <button
          className="menu-button hidden items-center justify-center rounded-lg p-2 [color:#0b2850] max-[800px]:[display:flex]"
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          className="mobile-nav absolute left-0 right-0 top-full grid gap-1 overflow-y-auto bg-white p-5 shadow-xl [max-height:calc(100vh_-_72px)] [&_a]:rounded-lg [&_a]:px-4 [&_a]:py-2 [&_a]:font-semibold [&_a:hover]:[background:#edf6ff] [&_.mobile-nav-submenu_a]:px-4 [&_.mobile-nav-submenu_a]:py-2 [&_.mobile-nav-submenu_a]:text-sm [&_.mobile-nav-submenu_a]:font-medium [&_.mobile-nav-submenu_a]:[color:#41617f]"
          aria-label="Mobile navigation"
        >
          <a href={routes.home}>Home</a>
          <div className="mobile-nav-group [min-width:0]">
            <div className="mobile-nav-heading flex items-center justify-between [&_.mobile-nav-toggle]:flex [&_.mobile-nav-toggle]:w-full [&_.mobile-nav-toggle]:items-center [&_.mobile-nav-toggle]:justify-between [&_.mobile-nav-toggle]:rounded-lg [&_.mobile-nav-toggle]:px-4 [&_.mobile-nav-toggle]:py-2 [&_.mobile-nav-toggle]:font-semibold [&_.mobile-nav-toggle]:[border:0] [&_.mobile-nav-toggle]:[background:transparent] [&_.mobile-nav-toggle]:[color:#0b2850] [&_.mobile-nav-toggle:hover]:[background:#edf6ff]">
              <button
                className="mobile-nav-toggle [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_160ms_ease] [&[aria-expanded='true']_svg]:[transform:rotate(180deg)]"
                type="button"
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-services-menu"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                Services <ChevronDown size={18} />
              </button>
            </div>
            {mobileServicesOpen && (
              <div
                className="mobile-nav-submenu grid gap-1 pl-4"
                id="mobile-services-menu"
              >
                {serviceLinks.map(([label, href]) => (
                  <a key={href} href={href}>
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="mobile-nav-group [min-width:0]">
            <div className="mobile-nav-heading flex items-center justify-between [&_.mobile-nav-toggle]:flex [&_.mobile-nav-toggle]:w-full [&_.mobile-nav-toggle]:items-center [&_.mobile-nav-toggle]:justify-between [&_.mobile-nav-toggle]:rounded-lg [&_.mobile-nav-toggle]:px-4 [&_.mobile-nav-toggle]:py-2 [&_.mobile-nav-toggle]:font-semibold [&_.mobile-nav-toggle]:[border:0] [&_.mobile-nav-toggle]:[background:transparent] [&_.mobile-nav-toggle]:[color:#0b2850] [&_.mobile-nav-toggle:hover]:[background:#edf6ff]">
              <button
                className="mobile-nav-toggle [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_160ms_ease] [&[aria-expanded='true']_svg]:[transform:rotate(180deg)]"
                type="button"
                aria-expanded={mobileIndustriesOpen}
                aria-controls="mobile-industries-menu"
                onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
              >
                Industries <ChevronDown size={18} />
              </button>
            </div>
            {mobileIndustriesOpen && (
              <div
                className="mobile-nav-submenu grid gap-1 pl-4"
                id="mobile-industries-menu"
              >
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
    <p className="section-label mb-2 flex items-center gap-2 text-xs font-bold tracking-[.09em] [color:#1173cf] [&_span]:[display:inline-block] [&_span]:[width:21px] [&_span]:[height:2px] [&_span]:[background:#1173cf]">
      <span /> {children}
    </p>
  );
}
function ServiceCard({ category, index }) {
  const Icon = icons[index];
  const href =
    index === 5 ? routes.routers : `${routes.rates}?category=${index}`;
  return (
    <a
      className="service-card relative flex min-h-[190px] flex-col rounded-lg border bg-white p-5 transition-all [border-color:#e7ecf1] [box-shadow:0_3px_14px_rgba(7,_33,_73,_0.055)] [&:hover]:[border-color:#a9d3fb] [&:hover]:[box-shadow:0_12px_28px_rgba(7,_69,_141,_0.12)] [&:hover]:[transform:translateY(-3px)] [&_h3]:mt-4 [&_h3]:mb-0 [&_h3]:text-sm [&_h3]:font-extrabold [&_h3]:leading-snug [&_h3]:[color:#0b2549] [&_p]:mt-2 [&_p]:mb-5 [&_p]:text-xs [&_p]:leading-relaxed [&_p]:[color:#68788f] max-[600px]:[min-height:200px] max-[600px]:[padding:15px] max-[600px]:[&_h3]:[font-size:13px] max-[600px]:[&_p]:[font-size:11px]"
      href={href}
    >
      <span className="card-icon flex items-center justify-center rounded-xl [width:48px] [height:48px] [color:#086bca] [background:#edf6ff]">
        <Icon size={28} strokeWidth={2.3} />
      </span>
      <h3>{category.title}</h3>
      <p>{descriptions[index]}</p>
      <span className="card-arrow absolute bottom-4 left-5 [color:#0873dc] max-[600px]:[left:15px]">
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
      <section className="hero [position:relative] [min-height:430px] [background:#041b39_url('/server-room-hero.png')_center_48%_/_cover_no-repeat] [color:white] [overflow:hidden] [&_h1]:m-0 [&_h1]:font-extrabold [&_h1]:leading-[1.06] [&_h1]:tracking-tight [&_h1]:[font-size:clamp(42px,_4.7vw,_68px)] [&_h1_span]:[color:#31acff] max-[800px]:[&_h1]:[font-size:clamp(38px,_8vw,_58px)] max-[600px]:[min-height:580px] max-[600px]:[&_h1]:[font-size:41px]">
        <div className="hero-shade [position:absolute] [inset:0] [background:linear-gradient(_90deg,_rgba(0,_14,_40,_0.88)_0%,_rgba(2,_21,_48,_0.69)_41%,_rgba(1,_18,_46,_0.33)_69%,_rgba(0,_17,_44,_0.46)_100%_)]" />
        <div className="shell hero-layout mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px] relative flex items-center justify-between [min-height:430px] [gap:50px] max-[800px]:[min-height:540px] max-[800px]:[align-items:flex-start] max-[800px]:[flex-direction:column] max-[800px]:[justify-content:center] max-[800px]:[gap:20px] max-[600px]:[min-height:580px] max-[600px]:[justify-content:flex-start]">
          <div className="hero-content [width:min(620px,_58%)] [padding:40px_0] max-[800px]:[width:100%] max-[800px]:[padding:40px_0_0] max-[600px]:[padding-top:56px]">
            <p className="hero-kicker mb-4 text-xs font-bold tracking-[.1em] [color:#d9f0ff] max-[600px]:[font-size:10px]">
              COMPLETE NETWORK INFRASTRUCTURE &amp; DATA CENTRE SOLUTIONS
            </p>
            <h1>
              Build a Smarter,
              <br />
              <span>More Connected</span>
              <br />
              Tomorrow
            </h1>
            <p className="hero-description mt-5 mb-0 max-w-[570px] text-base leading-relaxed [color:#edf5ff] max-[600px]:[font-size:14px]">
              We design, deploy and manage end-to-end network infrastructure and
              data centre solutions to keep your business secure, connected and
              future-ready.
            </p>
            <div className="hero-actions mt-7 flex flex-wrap gap-3">
              <a
                className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)]"
                href={routes.services}
              >
                Explore Our Services <ArrowRight size={17} />
              </a>
              <a
                className="btn btn-outline inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [border:1px_solid_rgba(255,_255,_255,_0.75)] [color:white] [background:rgba(3,_17,_38,_0.18)] [&:hover]:[background:rgba(255,_255,_255,_0.13)]"
                href={routes.contact}
              >
                Talk to Our Experts
              </a>
            </div>
          </div>
          <div
            className="hero-brand flex flex-col items-center text-center [min-width:340px] [margin-right:4%] [filter:drop-shadow(0_4px_12px_rgba(0,_8,_28,_0.7))] [&_img]:[width:270px] [&_img]:[height:170px] [&_img]:[object-fit:contain] [&_strong]:font-extrabold [&_strong]:tracking-tight [&_strong]:[font-size:49px] [&_strong]:[line-height:1.1] [&_em]:mt-2 [&_em]:text-xl [&_em]:font-medium max-[1100px]:[min-width:260px] max-[1100px]:[margin-right:0] max-[1100px]:[&_img]:[width:220px] max-[1100px]:[&_strong]:[font-size:40px] max-[800px]:[align-self:flex-end] max-[800px]:[margin-top:-20px] max-[800px]:[min-width:0] max-[800px]:[&_img]:[width:155px] max-[800px]:[&_img]:[height:95px] max-[800px]:[&_strong]:[font-size:29px] max-[800px]:[&_em]:[font-size:13px] max-[600px]:[margin-top:0] max-[600px]:[align-self:center] max-[600px]:[&_img]:[width:160px]"
            aria-label="RizzTech — The Standard for Performance"
          >
            <img src={withBase("/logo-mark.png")} alt="RizzTech icon" />
            <strong>RizzTech</strong>
            <em>The Standard for Performance</em>
          </div>
        </div>
      </section>

      <section
        className="services-section [padding:42px_0_60px] [background:#fff] max-[600px]:[padding:38px_0]"
        id="services"
      >
        <div className="shell mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px]">
          <div className="section-heading-row mb-5 flex items-end justify-between gap-6 [&_h2]:m-0 [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:[font-size:34px] [&_h2]:[line-height:1.14] [&_h2]:[color:#0b2241] [&_p:not(.section-label)]:mt-2 [&_p:not(.section-label)]:mb-0 [&_p:not(.section-label)]:max-w-[620px] [&_p:not(.section-label)]:text-sm [&_p:not(.section-label)]:leading-relaxed [&_p:not(.section-label)]:[color:#53647b] max-[600px]:[align-items:flex-start] max-[600px]:[flex-direction:column] max-[600px]:[&_h2]:[font-size:28px]">
            <div>
              <SectionLabel>OUR SERVICES</SectionLabel>
              <h2>End-to-End Network Solutions</h2>
              <p>
                From network setup to data centres, we deliver reliable,
                scalable and secure solutions for businesses of all sizes.
              </p>
            </div>
            <a
              className="text-link inline-flex shrink-0 items-center gap-2 text-sm font-bold [color:#006fdf] [&:hover]:[color:#004eac]"
              href={routes.services}
            >
              View All Services <ArrowRight size={16} />
            </a>
          </div>
          <div className="service-grid grid grid-cols-5 gap-4 max-[1100px]:[grid-template-columns:repeat(3,_1fr)] max-[600px]:[grid-template-columns:repeat(2,_1fr)] max-[600px]:[gap:10px]">
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

      <section
        className="partner-section [background:#fafcff] [padding:50px_0] max-[600px]:[padding:35px_0]"
        id="about"
      >
        <div
          className="shell partner-layout mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px] grid items-center gap-12 [grid-template-columns:46%_1fr] max-[800px]:[grid-template-columns:1fr]"
          id="projects"
        >
          <div className="partner-photo relative overflow-hidden rounded-xl [min-height:360px] [&_>_img]:[width:100%] [&_>_img]:[height:360px] [&_>_img]:[object-fit:cover] max-[800px]:[min-height:300px] max-[800px]:[height:300px] max-[800px]:[&_>_img]:[min-height:300px] max-[800px]:[&_>_img]:[height:300px]">
            <img
              src={withBase("/data-centre-corridor.png")}
              alt="Blue-lit data centre corridor"
            />
            <div className="photo-caption absolute bottom-0 left-0 right-0 flex items-center gap-3 px-5 py-4 text-sm font-bold text-white [background:linear-gradient(_90deg,_rgba(0,_35,_77,_0.88),_rgba(0,_39,_87,_0.4)_)] [&_svg]:[color:#4db5ff]">
              <ShieldCheck size={24} />
              <span>
                Reliable Infrastructure.
                <br />
                Lasting Partnerships.
              </span>
            </div>
          </div>
          <div className="partner-content [&_h2]:m-0 [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:[font-size:34px] [&_h2]:[line-height:1.14] [&_h2]:[color:#0b2241] [&_>_p:not(.section-label)]:mt-4 [&_>_p:not(.section-label)]:max-w-[590px] [&_>_p:not(.section-label)]:text-sm [&_>_p:not(.section-label)]:leading-relaxed [&_>_p:not(.section-label)]:[color:#53647b] [&_>_.btn]:[margin-top:8px] max-[600px]:[&_h2]:[font-size:28px]">
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
            <a
              className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)]"
              href={routes.about}
            >
              Learn More <ArrowRight size={16} />
            </a>
            <div className="benefit-grid mt-8 grid grid-cols-3 gap-x-5 gap-y-6 max-[1100px]:[grid-template-columns:repeat(2,_1fr)] max-[600px]:[gap:14px]">
              {benefits.map(([Icon, label]) => (
                <div
                  className="benefit flex items-center gap-3 [&_span]:flex [&_span]:shrink-0 [&_span]:items-center [&_span]:justify-center [&_span]:rounded-full [&_span]:[width:42px] [&_span]:[height:42px] [&_span]:[background:#e8f4ff] [&_span]:[color:#0871d8] [&_strong]:text-xs [&_strong]:font-bold [&_strong]:leading-snug [&_strong]:[color:#163458] max-[600px]:[gap:7px] max-[600px]:[&_span]:[width:36px] max-[600px]:[&_span]:[height:36px] max-[600px]:[&_strong]:[font-size:11px]"
                  key={label}
                >
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

      <section
        className="industry-section [background:#eaf6ff] [padding:42px_0]"
        id="industries"
      >
        <div className="shell industry-layout mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px] grid items-center gap-9 [grid-template-columns:31%_1fr] max-[800px]:[grid-template-columns:1fr]">
          <div className="industry-copy [&_h2]:m-0 [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:[font-size:34px] [&_h2]:[line-height:1.14] [&_h2]:[color:#0b2241] [&_p:not(.section-label)]:mt-3 [&_p:not(.section-label)]:mb-5 [&_p:not(.section-label)]:text-sm [&_p:not(.section-label)]:leading-relaxed [&_p:not(.section-label)]:[color:#526d83] max-[600px]:[&_h2]:[font-size:28px]">
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
            <a
              className="btn btn-line inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [border:1px_solid_#0a7add] [color:#0a72cf] [background:transparent] [&:hover]:[background:#fff]"
              href={routes.industries}
            >
              Explore Industries <ArrowRight size={16} />
            </a>
          </div>
          <div className="industry-grid grid grid-cols-4 gap-3 max-[800px]:[grid-template-columns:repeat(3,_1fr)] max-[600px]:[grid-template-columns:repeat(2,_1fr)]">
            {industries.map(([label, Icon, index]) => (
              <a
                href={`${routes.industries}#${industrySlug(label)}`}
                className="industry-tile relative block overflow-hidden rounded-lg bg-white [height:116px] [box-shadow:0_3px_10px_rgba(16,_79,_124,_0.08)] [&:hover_.industry-picture]:[transform:scale(1.06)] max-[600px]:[height:108px]"
                key={label}
              >
                <span
                  className="industry-picture [display:block] [position:absolute] [inset:0] [background-image:url('/industries-grid.png')] [background-size:400%_200%] [background-repeat:no-repeat] [transition:transform_0.25s]"
                  style={{
                    backgroundPosition: `${((index % 4) * 100) / 3}% ${Math.floor(index / 4) * 100}%`,
                  }}
                />
                <span className="industry-name absolute bottom-0 left-0 right-0 flex items-center gap-2 px-3 py-2 text-xs font-bold [min-height:38px] [color:#142e4f] [background:rgba(255,_255,_255,_0.94)] [&_svg]:[flex-shrink:0] [&_svg]:[color:#0a73d3]">
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
    <section className="stats [background:#032343] [color:#fff] [padding:27px_0] [background-image:radial-gradient(_circle_at_8%_27%,_rgba(36,_160,_235,_0.13),_transparent_35%_),_radial-gradient(_circle_at_93%_63%,_rgba(36,_160,_235,_0.15),_transparent_32%_)]">
      <div className="shell stats-grid mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px] grid grid-cols-4 [&_>_div]:flex [&_>_div]:flex-col [&_>_div]:items-center [&_>_div]:justify-center [&_>_div]:border-r [&_>_div]:text-center [&_>_div]:[border-color:rgba(255,_255,_255,_0.16)] [&_>_div:last-child]:[border:0] [&_svg]:[color:#52beff] [&_strong]:mt-1 [&_strong]:font-extrabold [&_strong]:[font-size:29px] [&_strong]:[line-height:1] [&_span]:mt-1 [&_span]:text-xs [&_span]:[color:#d7ebff] max-[600px]:[grid-template-columns:repeat(2,_1fr)] max-[600px]:[gap:22px] max-[600px]:[&_>_div:nth-child(2)]:[border:0] max-[600px]:[&_strong]:[font-size:24px]">
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
    <footer className="site-footer [background:#04182f] [color:#ecf6ff]">
      <div className="shell footer-top mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px] grid gap-10 py-12 [grid-template-columns:1.3fr_0.8fr_1fr_1fr] [&_h3]:mb-4 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:[color:white] [&_>_div:not(:first-child)_>_a]:mb-2 [&_>_div:not(:first-child)_>_a]:flex [&_>_div:not(:first-child)_>_a]:items-center [&_>_div:not(:first-child)_>_a]:gap-1 [&_>_div:not(:first-child)_>_a]:text-xs [&_>_div:not(:first-child)_>_a]:[color:#b7cadf] [&_>_div:not(:first-child)_>_a]:[overflow-wrap:anywhere] [&_.footer-email]:[font-size:11px] [&_.footer-email]:[white-space:nowrap] [&_a:hover]:[color:#6bc1ff] [&_>_div:not(:first-child)_>_p]:text-xs [&_>_div:not(:first-child)_>_p]:leading-relaxed [&_>_div:not(:first-child)_>_p]:[color:#b7cadf] max-[800px]:[grid-template-columns:repeat(2,_1fr)] max-[600px]:[gap:24px] max-[600px]:[padding:34px_20px] max-[600px]:[&_>_div:last-child]:[grid-column:1/-1] max-[600px]:[&_.footer-email]:[white-space:normal]">
        <div className="footer-about [&_.logo_img]:[width:94px] [&_.logo_img]:[height:62px] [&_.logo]:[font-size:25px] [&_p]:ml-[102px] [&_p]:text-xs [&_p]:italic [&_p]:[color:#b8cadf] [&_p]:[margin-top:-20px] max-[600px]:[grid-column:1/-1]">
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
      <div className="shell footer-bottom mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px] flex flex-wrap justify-between gap-2 border-t py-5 text-xs [border-color:rgba(255,_255,_255,_0.12)] [color:#8da9c2] max-[600px]:[font-size:10px]">
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
      className="page-hero [background-color:#061b38] [background-size:cover] [background-position:center] [color:white] [padding:74px_0_75px] [&_.section-label]:[color:#62bcff] [&_.section-label_span]:[background:#62bcff] [&_h1]:m-0 [&_h1]:max-w-[780px] [&_h1]:font-extrabold [&_h1]:leading-tight [&_h1]:tracking-tight [&_h1]:[font-size:clamp(38px,_4vw,_58px)] [&_p:not(.section-label)]:mt-4 [&_p:not(.section-label)]:mb-0 [&_p:not(.section-label)]:max-w-[690px] [&_p:not(.section-label)]:text-base [&_p:not(.section-label)]:leading-relaxed [&_p:not(.section-label)]:[color:#e5effb] max-[600px]:[padding:55px_0] max-[600px]:[&_h1]:[font-size:36px]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(2,17,43,.95), rgba(2,20,48,.78) 53%, rgba(2,20,48,.25)), url(${withBase(image)})`,
      }}
    >
      <div className="shell mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px]">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );
}
function PageIntro({ title, text }) {
  return (
    <div className="page-intro [&_h2]:m-0 [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:[font-size:34px] [&_h2]:[line-height:1.14] [&_h2]:[color:#0b2241] mb-8 [&_p]:mt-2 [&_p]:max-w-[760px] [&_p]:text-sm [&_p]:leading-relaxed [&_p]:[color:#5d6c7f] max-[600px]:[&_h2]:[font-size:28px]">
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
      <main className="page-body shell [padding-top:48px] [padding-bottom:70px] max-[600px]:[padding-top:35px] mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px]">
        <PageIntro
          title="What we do"
          text="Choose a service category to see the individual services and indicative labour rates."
        />
        <div className="service-grid interior-cards grid grid-cols-5 gap-4 max-[1100px]:[grid-template-columns:repeat(3,_1fr)] max-[600px]:[grid-template-columns:repeat(2,_1fr)] max-[600px]:[gap:10px]">
          {categories.map((category, index) => (
            <ServiceCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
        <div className="page-cta mt-11 rounded-xl p-8 [background:#eaf5ff] [&_h2]:m-0 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:[color:#08264a] [&_p]:mt-2 [&_p]:mb-5 [&_p]:text-sm [&_p]:[color:#536c83]">
          <h2>Planning a project?</h2>
          <p>
            Build an indicative labour estimate from the service rate guide.
          </p>
          <a
            className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)]"
            href={routes.estimate}
          >
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
      <main className="page-body shell [padding-top:48px] [padding-bottom:70px] max-[600px]:[padding-top:35px] mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px]">
        <PageIntro
          title="Built for your environment"
          text="Explore the sectors we serve and the services that support their day-to-day connectivity."
        />
        <div className="industry-detail-grid grid grid-cols-3 gap-6 max-[600px]:[grid-template-columns:1fr]">
          {industries.map(([label, Icon, index]) => (
            <section
              className="industry-detail-card overflow-hidden rounded-xl border bg-white [scroll-margin-top:110px] [border-color:#e1eaf3] [box-shadow:0_5px_20px_rgba(7,_33,_73,_0.06)]"
              id={industrySlug(label)}
              key={label}
            >
              <div
                className="industry-detail-photo [height:190px] [background-image:url('/industries-grid.png')] [background-size:400%_200%] [background-repeat:no-repeat]"
                style={{
                  backgroundPosition: `${((index % 4) * 100) / 3}% ${Math.floor(index / 4) * 100}%`,
                }}
                role="img"
                aria-label={`${label} infrastructure`}
              />
              <div className="industry-detail-content p-6 [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:[color:#0b2549] [&_>_p]:mt-0 [&_>_p]:mb-4 [&_>_p]:text-sm [&_>_p]:leading-relaxed [&_>_p]:[color:#647a90]">
                <span className="card-icon flex items-center justify-center rounded-xl [width:48px] [height:48px] [color:#086bca] [background:#edf6ff]">
                  <Icon size={25} />
                </span>
                <h2>{label}</h2>
                <p>{industryDetails[index][0]}</p>
                <div className="industry-service-links flex flex-wrap gap-2 [&_a]:inline-flex [&_a]:items-center [&_a]:gap-1 [&_a]:rounded-md [&_a]:px-3 [&_a]:py-2 [&_a]:text-xs [&_a]:font-semibold [&_a]:[color:#0b65bb] [&_a]:[background:#eaf5ff] [&_a:hover]:[background:#d7ebff]">
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
        <div className="page-cta mt-11 rounded-xl p-8 [background:#eaf5ff] [&_h2]:m-0 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:[color:#08264a] [&_p]:mt-2 [&_p]:mb-5 [&_p]:text-sm [&_p]:[color:#536c83]">
          <h2>Have a project in mind?</h2>
          <p>
            Start with an indicative estimate, then confirm the details for your
            site and scope.
          </p>
          <a
            className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)]"
            href={routes.estimate}
          >
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
      <main className="page-body shell [padding-top:48px] [padding-bottom:70px] max-[600px]:[padding-top:35px] mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px]">
        <PageIntro
          title="Project solutions"
          text="Select a project type to explore the related services and indicative labour rates."
        />
        <div className="project-grid grid grid-cols-3 gap-5 max-[1100px]:[grid-template-columns:repeat(2,_1fr)] max-[600px]:[grid-template-columns:1fr]">
          {projectTypes.map(
            ({
              title,
              text,
              icon: Icon,
              image,
              imagePosition,
              rateCategory,
            }) => (
              <article
                className="project-card overflow-hidden rounded-xl border bg-white [border-color:#e0eaf3] [box-shadow:0_5px_20px_rgba(7,_33,_73,_0.055)]"
                key={title}
              >
                <div
                  className={`project-photo ${imagePosition ? "project-photo-grid [background-size:400%_200%]" : "[background-size:cover]"} [height:180px] [background-position:center]`}
                  style={{
                    backgroundImage: `url(${withBase(image)})`,
                    backgroundPosition: imagePosition || "center",
                  }}
                />
                <div className="project-card-body p-5 [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:[color:#0b2549] [&_p]:mb-5 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:[color:#63788d] [&_.text-link]:[font-size:13px]">
                  <span className="card-icon flex items-center justify-center rounded-xl [width:48px] [height:48px] [color:#086bca] [background:#edf6ff]">
                    <Icon size={25} />
                  </span>
                  <h2>{title}</h2>
                  <p>{text}</p>
                  <a
                    className="text-link inline-flex shrink-0 items-center gap-2 text-sm font-bold [color:#006fdf] [&:hover]:[color:#004eac]"
                    href={`${routes.rates}?category=${rateCategory}`}
                  >
                    Explore services <ArrowRight size={15} />
                  </a>
                </div>
              </article>
            ),
          )}
        </div>
        <section className="project-process mt-14 rounded-2xl p-8 [background:#edf7ff] [&_h2]:mt-0 [&_h2]:mb-6 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:[color:#0b2549] max-[600px]:[padding:22px]">
          <SectionLabel>HOW WE WORK</SectionLabel>
          <h2>From first survey to final handover</h2>
          <div className="process-grid grid grid-cols-4 gap-5 [&_>_div]:rounded-xl [&_>_div]:bg-white [&_>_div]:p-5 [&_>_div]:[box-shadow:0_3px_12px_rgba(7,_33,_73,_0.05)] [&_span]:text-xs [&_span]:font-extrabold [&_span]:[color:#0873e6] [&_h3]:mt-3 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-bold [&_h3]:[color:#0b2549] [&_p]:m-0 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:[color:#61788d] max-[800px]:[grid-template-columns:repeat(2,_1fr)] max-[600px]:[grid-template-columns:1fr]">
            {projectSteps.map(([number, title, text]) => (
              <div key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="page-cta mt-11 rounded-xl p-8 [background:#eaf5ff] [&_h2]:m-0 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:[color:#08264a] [&_p]:mt-2 [&_p]:mb-5 [&_p]:text-sm [&_p]:[color:#536c83]">
          <h2>Tell us about your project</h2>
          <p>
            Share your site, scope and priorities in an enquiry draft or build a
            starting estimate.
          </p>
          <div className="cta-actions flex flex-wrap gap-3">
            <a
              className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)]"
              href={routes.contact}
            >
              Start an Enquiry <ArrowRight size={16} />
            </a>
            <a
              className="btn btn-line inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [border:1px_solid_#0a7add] [color:#0a72cf] [background:transparent] [&:hover]:[background:#fff]"
              href={routes.estimate}
            >
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
      <main className="page-body shell [padding-top:48px] [padding-bottom:70px] max-[600px]:[padding-top:35px] mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px]">
        <section className="about-intro grid items-center gap-10 [grid-template-columns:46%_1fr] [&_h2]:m-0 [&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:[color:#0b2549] [&_p:not(.section-label)]:mt-4 [&_p:not(.section-label)]:text-sm [&_p:not(.section-label)]:leading-relaxed [&_p:not(.section-label)]:[color:#5a7086] [&_.btn]:[margin-top:12px] max-[800px]:[grid-template-columns:1fr] max-[600px]:[&_h2]:[font-size:26px]">
          <div className="about-image overflow-hidden rounded-xl [&_img]:[width:100%] [&_img]:[height:390px] [&_img]:[object-fit:cover] max-[800px]:[&_img]:[height:300px]">
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
            <a
              className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)]"
              href={routes.services}
            >
              Explore Our Services <ArrowRight size={16} />
            </a>
          </div>
        </section>
        <section className="about-values [&_h2]:m-0 [&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:[color:#0b2549] mt-14 [&_h2]:mb-6 max-[600px]:[&_h2]:[font-size:26px]">
          <SectionLabel>OUR APPROACH</SectionLabel>
          <h2>Clear work. Reliable outcomes.</h2>
          <div className="value-grid grid grid-cols-4 gap-5 max-[1100px]:[grid-template-columns:repeat(2,_1fr)] max-[600px]:[grid-template-columns:1fr]">
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
              <div
                className="value-card rounded-xl border bg-white p-6 [border-color:#e0eaf3] [box-shadow:0_5px_20px_rgba(7,_33,_73,_0.055)] [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-bold [&_h3]:[color:#0b2549] [&_p]:m-0 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:[color:#62798d]"
                key={title}
              >
                <span className="card-icon flex items-center justify-center rounded-xl [width:48px] [height:48px] [color:#086bca] [background:#edf6ff]">
                  <Icon size={26} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="page-cta mt-11 rounded-xl p-8 [background:#eaf5ff] [&_h2]:m-0 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:[color:#08264a] [&_p]:mt-2 [&_p]:mb-5 [&_p]:text-sm [&_p]:[color:#536c83]">
          <h2>Let's plan the right solution</h2>
          <p>
            Explore the services or prepare the details of your next project.
          </p>
          <div className="cta-actions flex flex-wrap gap-3">
            <a
              className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)]"
              href={routes.contact}
            >
              Contact RizzTech <ArrowRight size={16} />
            </a>
            <a
              className="btn btn-line inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [border:1px_solid_#0a7add] [color:#0a72cf] [background:transparent] [&:hover]:[background:#fff]"
              href={routes.projects}
            >
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
      <main className="page-body shell [padding-top:48px] [padding-bottom:70px] max-[600px]:[padding-top:35px] mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px]">
        <div className="contact-layout [&_h2]:m-0 [&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:[color:#0b2549] grid items-start gap-9 [grid-template-columns:minmax(0,_1.5fr)_minmax(280px,_1fr)] max-[800px]:[grid-template-columns:1fr] max-[600px]:[&_h2]:[font-size:26px]">
          <section>
            <SectionLabel>YOUR PROJECT</SectionLabel>
            <h2>Share the details</h2>
            <p className="contact-intro mt-3 mb-7 text-sm leading-relaxed [color:#61788d]">
              Prepare your enquiry below, then open it in your email app to send
              to RizzTech.
            </p>
            <form
              className="contact-form grid gap-5 [&_label]:grid [&_label]:gap-2 [&_label]:text-sm [&_label]:font-bold [&_label]:[color:#183b60] [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:bg-white [&_input]:px-4 [&_input]:py-3 [&_input]:text-sm [&_input]:outline-none [&_input]:[border-color:#cfdde9] [&_input]:[color:#142f50] [&_select]:w-full [&_select]:rounded-lg [&_select]:border [&_select]:bg-white [&_select]:px-4 [&_select]:py-3 [&_select]:text-sm [&_select]:outline-none [&_select]:[border-color:#cfdde9] [&_select]:[color:#142f50] [&_textarea]:w-full [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:bg-white [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:text-sm [&_textarea]:outline-none [&_textarea]:[border-color:#cfdde9] [&_textarea]:[color:#142f50] [&_input:focus]:[border-color:#0873e6] [&_input:focus]:[box-shadow:0_0_0_3px_rgba(8,_115,_230,_0.12)] [&_select:focus]:[border-color:#0873e6] [&_select:focus]:[box-shadow:0_0_0_3px_rgba(8,_115,_230,_0.12)] [&_textarea:focus]:[border-color:#0873e6] [&_textarea:focus]:[box-shadow:0_0_0_3px_rgba(8,_115,_230,_0.12)] [&_textarea]:[resize:vertical] [&_.btn]:[justify-self:start]"
              onSubmit={prepare}
            >
              <div className="form-two grid grid-cols-2 gap-4 max-[600px]:[grid-template-columns:1fr]">
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
              <div className="form-two grid grid-cols-2 gap-4 max-[600px]:[grid-template-columns:1fr]">
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
              <button
                className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)]"
                type="submit"
              >
                Prepare Enquiry <ArrowRight size={16} />
              </button>
            </form>
          </section>
          <aside className="contact-side rounded-xl p-7 [background:#eaf5ff] [&_h2]:mt-5 [&_h2]:text-2xl [&_p]:mt-3 [&_p]:mb-6 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:[color:#5a7187] [&_>_.text-link]:mb-4 [&_>_.text-link]:flex [&_>_.text-link]:[overflow-wrap:anywhere] max-[600px]:[padding:22px]">
            <span className="card-icon flex items-center justify-center rounded-xl [width:48px] [height:48px] [color:#086bca] [background:#edf6ff]">
              <Headphones size={28} />
            </span>
            <h2>Start with the right information</h2>
            <p>
              Useful details include your site location, number of network
              points or devices, access conditions, expected timeline and
              support needs.
            </p>
            <a
              className="text-link inline-flex shrink-0 items-center gap-2 text-sm font-bold [color:#006fdf] [&:hover]:[color:#004eac]"
              href={`mailto:${contactEmail}`}
            >
              <Mail size={16} />
              {contactEmail}
            </a>
            <a
              className="text-link inline-flex shrink-0 items-center gap-2 text-sm font-bold [color:#006fdf] [&:hover]:[color:#004eac]"
              href={routes.estimate}
            >
              Build a labour estimate <ArrowRight size={15} />
            </a>
            <a
              className="text-link inline-flex shrink-0 items-center gap-2 text-sm font-bold [color:#006fdf] [&:hover]:[color:#004eac]"
              href={routes.terms}
            >
              Review quotation terms <ArrowRight size={15} />
            </a>
            {selected.length > 0 && (
              <div className="contact-estimate-note mt-7 flex items-start gap-2 rounded-lg bg-white p-4 text-xs font-semibold [color:#1d527e] [&_svg]:[flex-shrink:0] [&_svg]:[color:#0873e6]">
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
            className="draft-panel [&_h2]:m-0 [&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:[color:#0b2549] [&_textarea]:w-full [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:bg-white [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:text-sm [&_textarea]:outline-none [&_textarea]:[border-color:#cfdde9] [&_textarea]:[color:#142f50] mt-12 rounded-xl border p-7 [scroll-margin-top:20px] [border-color:#cbdfee] [background:#f4faff] [&_p:not(.section-label)]:mt-2 [&_p:not(.section-label)]:mb-5 [&_p:not(.section-label)]:text-sm [&_p:not(.section-label)]:[color:#61788d] [&_textarea]:[font-family:ui-monospace,_SFMono-Regular,_Consolas,_monospace] [&_textarea]:[line-height:1.6] [&_textarea]:[resize:vertical] max-[600px]:[&_h2]:[font-size:26px] max-[600px]:[padding:22px]"
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
            <div className="draft-actions mt-4 flex flex-wrap items-center gap-3 [&_span]:text-sm [&_span]:[font-weight:600] [&_span]:[color:#1b6b9e]">
              <a
                className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)]"
                href={emailHref}
              >
                <Mail size={16} /> Open Email to Send
              </a>
              <button
                className="btn btn-line inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [border:1px_solid_#0a7add] [color:#0a72cf] [background:transparent] [&:hover]:[background:#fff]"
                type="button"
                onClick={copyDraft}
              >
                <Copy size={16} /> Copy Draft
              </button>
              <button
                className="btn btn-line inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [border:1px_solid_#0a7add] [color:#0a72cf] [background:transparent] [&:hover]:[background:#fff]"
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
    <div className="rate-table-wrap [width:100%] [overflow:auto] [border:1px_solid_#d9e4ee] [border-radius:8px]">
      <table className="rate-table [width:100%] [border-collapse:collapse] [min-width:790px] [font-size:13px] [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-bold [&_th]:text-white [&_th]:[background:#143b6e] [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td]:[color:#153050] [&_td]:[border-top:1px_solid_#dce5ef] [&_tbody_tr:nth-child(even)]:[background:#f4f8fc] [&_tbody_tr:hover]:[background:#eaf5ff] [&_th:nth-child(1)]:[width:27%] [&_th:nth-child(2)]:[width:13%] [&_th:nth-child(3)]:[width:16%] [&_th:nth-child(4)]:[width:38%]">
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
              <td className="rate-cell whitespace-nowrap font-bold [color:#0a5bb5]">
                {item.rate === "Custom quotation" ||
                item.rate === "Site quotation"
                  ? item.rate
                  : `₹${item.rate}`}
              </td>
              <td>{item.note}</td>
              {onAdd && (
                <td>
                  <button
                    className="add-rate inline-flex items-center gap-1 rounded px-3 py-1 text-xs font-bold [color:#096bcf] [background:#e8f3ff] [&:hover]:[background:#d3eaff]"
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
      <main className="page-body shell [padding-top:48px] [padding-bottom:70px] max-[600px]:[padding-top:35px] mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px]">
        <PageIntro
          title="Find the work. See the range."
          text="Search the complete service list or filter by category. Add services to your browser-local estimate."
        />
        <div className="rate-controls mb-3 flex flex-wrap items-center gap-3">
          <label className="search-box flex items-center gap-2 rounded-lg border px-4 [height:46px] [border-color:#d4e1ed] [color:#3471ab] [background:#fff] [flex:1] [min-width:230px] [&_input]:w-full [&_input]:border-0 [&_input]:outline-none [&_input]:[color:#0b2443] [&_input]:[background:transparent]">
            <Search size={19} />
            <input
              aria-label="Search services"
              placeholder="Search services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="select-box flex items-center gap-2 rounded-lg border px-4 [height:46px] [border-color:#d4e1ed] [color:#3471ab] [background:#fff] [&_select]:border-0 [&_select]:outline-none [&_select]:[max-width:280px] [&_select]:[color:#0b2443] [&_select]:[background:transparent]">
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
          <a
            className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)]"
            href={routes.estimate}
          >
            Estimate ({Object.keys(estimate).length}) <ArrowRight size={15} />
          </a>
        </div>
        <p className="result-count mb-3 text-xs font-semibold [color:#66809b]">
          {results.length} services found
        </p>
        {results.length ? (
          <RateTable
            items={results}
            onAdd={(id) => update(id, (estimate[id] || 0) + 1)}
          />
        ) : (
          <div className="empty-state flex flex-col items-center rounded-xl border p-12 text-center [border-color:#dce9f4] [background:#f7fbff] [color:#577189] [&_h3]:mb-1 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:[color:#173858] [&_p]:mt-0 [&_p]:text-sm">
            <CircleHelp />
            <h3>No services found</h3>
            <p>Try a different search or category.</p>
          </div>
        )}
        <p className="rate-disclaimer mt-5 text-xs leading-relaxed [color:#647b92]">
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
      <main className="page-body shell [padding-top:48px] [padding-bottom:70px] max-[600px]:[padding-top:35px] mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px]">
        <PageIntro
          title="Router and network device services"
          text="Explore the router, switching and firewall work in the RizzTech rate guide."
        />
        <div className="router-feature-grid grid grid-cols-3 gap-5 max-[600px]:[grid-template-columns:1fr]">
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
            <div
              className="router-feature rounded-xl border p-6 [border-color:#e3eaf1] [background:#fff] [box-shadow:0_5px_18px_rgba(7,_33,_73,_0.045)] [&_h3]:mt-4 [&_h3]:mb-1 [&_h3]:text-base [&_h3]:font-bold [&_h3]:[color:#0b2549] [&_p]:m-0 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:[color:#65788c]"
              key={title}
            >
              <span className="card-icon flex items-center justify-center rounded-xl [width:48px] [height:48px] [color:#086bca] [background:#edf6ff]">
                <Icon size={27} />
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
        <h2 className="subheading mt-10 mb-4 text-2xl font-bold [color:#0b2549]">
          Suggested service rates
        </h2>
        <RateTable items={routerItems} />
        <div className="page-cta mt-11 rounded-xl p-8 [background:#eaf5ff] [&_h2]:m-0 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:[color:#08264a] [&_p]:mt-2 [&_p]:mb-5 [&_p]:text-sm [&_p]:[color:#536c83]">
          <h2>Need a tailored quotation?</h2>
          <p>
            Add router work to a budget estimate, then confirm the scope with
            RizzTech.
          </p>
          <a
            className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)]"
            href={`${routes.rates}?category=5`}
          >
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
      <main className="page-body shell [padding-top:48px] [padding-bottom:70px] max-[600px]:[padding-top:35px] mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px]">
        <PageIntro
          title="Your project, in one place"
          text="Choose services, set quantities and use the range as a starting point for a final quotation."
        />
        <div className="estimate-picker flex flex-wrap gap-3 rounded-xl p-4 [background:#eaf5ff] [&_select]:flex-1 [&_select]:rounded-lg [&_select]:border [&_select]:bg-white [&_select]:px-4 [&_select]:py-3 [&_select]:text-sm [&_select]:[min-width:250px] [&_select]:[border-color:#c7dceb] [&_select]:[color:#183858]">
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
            className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)]"
            type="button"
            onClick={() => update(pick, (estimate[pick] || 0) + 1)}
          >
            Add Service <ArrowRight size={15} />
          </button>
        </div>
        {selected.length ? (
          <>
            <div className="estimate-list mt-5 overflow-hidden rounded-xl border [border-color:#dfebf4]">
              {selected.map((item) => (
                <div
                  className="estimate-line flex items-center gap-4 border-b px-5 py-4 [border-color:#e4edf4] [&:last-child]:[border:0] [&_>_div]:flex [&_>_div]:flex-1 [&_>_div]:flex-col [&_>_div]:gap-1 [&_strong]:text-sm [&_strong]:[color:#102e51] [&_span]:text-xs [&_span]:[color:#687d90] [&_label]:flex [&_label]:items-center [&_label]:gap-2 [&_label]:text-xs [&_label]:font-bold [&_label]:[color:#516c82] [&_input]:[width:65px] [&_input]:[border:1px_solid_#d2e0eb] [&_input]:[border-radius:6px] [&_input]:[padding:7px] [&_input]:[color:#123050] [&_>_button]:[color:#69829a] [&_>_button:hover]:[color:#c32f4a] max-[600px]:[align-items:flex-start] max-[600px]:[flex-wrap:wrap] max-[600px]:[&_>_div]:[flex-basis:100%]"
                  key={item.id}
                >
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
            <div className="estimate-total mt-5 rounded-xl p-6 [color:white] [background:#0b3e76] [&_>_div]:flex [&_>_div]:flex-wrap [&_>_div]:items-baseline [&_>_div]:justify-between [&_>_div]:gap-3 [&_span]:text-sm [&_span]:font-medium [&_strong]:text-3xl [&_strong]:font-extrabold [&_small]:mt-2 [&_small]:block [&_small]:text-xs [&_small]:[color:#c4dff7]">
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
              className="clear-button mt-4 text-sm font-semibold [color:#b63e54] [&:hover]:[text-decoration:underline]"
              type="button"
              onClick={() => selected.forEach((item) => update(item.id, 0))}
            >
              Clear estimate
            </button>
          </>
        ) : (
          <div className="empty-state flex flex-col items-center rounded-xl border p-12 text-center [border-color:#dce9f4] [background:#f7fbff] [color:#577189] [&_h3]:mb-1 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:[color:#173858] [&_p]:mt-0 [&_p]:text-sm">
            <Boxes size={30} />
            <h3>No services added yet</h3>
            <p>Choose a service above or add one from the rate guide.</p>
            <a
              className="text-link inline-flex shrink-0 items-center gap-2 text-sm font-bold [color:#006fdf] [&:hover]:[color:#004eac]"
              href={routes.rates}
            >
              Browse rate guide <ArrowRight size={15} />
            </a>
          </div>
        )}
        <div className="page-cta mt-11 rounded-xl p-8 [background:#eaf5ff] [&_h2]:m-0 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:[color:#08264a] [&_p]:mt-2 [&_p]:mb-5 [&_p]:text-sm [&_p]:[color:#536c83]">
          <h2>Before you quote</h2>
          <p>
            Review the commercial terms and agree the scope, milestones, taxes
            and exclusions.
          </p>
          <a
            className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all [white-space:nowrap] [background:#0873e6] [color:#fff] [box-shadow:0_8px_22px_rgba(0,_100,_210,_0.18)] [&:hover]:[background:#005bc4] [&:hover]:[transform:translateY(-1px)]"
            href={routes.terms}
          >
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
      <main className="page-body shell [padding-top:48px] [padding-bottom:70px] max-[600px]:[padding-top:35px] mx-auto w-full max-w-[1680px] px-6 max-[600px]:[padding-left:20px] max-[600px]:[padding-right:20px]">
        <div className="terms-layout [&_h2]:m-0 [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:[font-size:34px] [&_h2]:[line-height:1.14] [&_h2]:[color:#0b2241] grid items-start gap-9 [grid-template-columns:1.5fr_1fr] max-[800px]:[grid-template-columns:1fr] max-[600px]:[gap:28px]">
          <section>
            <h2>Commercial Terms &amp; Conditions</h2>
            <div className="terms-list mt-5 overflow-hidden rounded-xl border [border-color:#e0eaf4] [&_>_div]:border-b [&_>_div]:px-5 [&_>_div]:py-4 [&_>_div]:[border-color:#e0eaf4] [&_>_div:last-child]:[border:0] [&_>_div:nth-child(even)]:[background:#f7faff] [&_h3]:mb-1 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:[color:#0e3561] [&_p]:m-0 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:[color:#506b83]">
              {terms.map(([title, desc]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </section>
          <aside className="checklist sticky top-5 rounded-xl p-7 [background:#edf7ff] [&_h2]:[font-size:25px] [&_>_p]:mt-2 [&_>_p]:mb-5 [&_>_p]:text-sm [&_>_p]:[color:#5b7186] [&_>_div]:flex [&_>_div]:gap-3 [&_>_div]:border-b [&_>_div]:py-3 [&_>_div]:text-sm [&_>_div]:[border-color:#d6e8f6] [&_>_div]:[color:#163b62] [&_>_div:last-child]:[border:0] [&_svg]:[flex-shrink:0] [&_svg]:[color:#0879de] max-[600px]:[position:static]">
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
    <div
      className={
        "[font-family:Inter,_Arial,_Helvetica,sans-serif] [color:#071c3b] [background-color:#fff] [font-synthesis:none] [scroll-behavior:smooth] [&_*]:[box-sizing:border-box] [&_body]:m-0 [&_button]:cursor-pointer [&_a]:[text-decoration:none] [&_a]:[color:inherit] [&_button]:[font:inherit] [&_input]:[font:inherit] [&_select]:[font:inherit] [&_img]:block [&_img]:[max-width:100%]"
      }
    >
      <Header />
      {content}
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
