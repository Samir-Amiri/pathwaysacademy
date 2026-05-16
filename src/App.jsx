import React, { useState } from "react";
import { motion } from "framer-motion";

/* ----------------------------------------------------------------------------
   IMAGERY — free-licensed Unsplash photography.
   To swap any image, replace the URL below. If a URL ever fails to load,
   the layout gracefully falls back to a branded gradient.
---------------------------------------------------------------------------- */
const photos = {
  hero: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
  netherlands: "https://images.unsplash.com/photo-1558369981-f9ca78462e61?auto=format&fit=crop&w=1200&q=80",
  study: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  campus: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
  students: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
  support: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
};

/* ---------------------------------- Icons --------------------------------- */
function IconBase({ children, className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
const ArrowRightIcon = (p) => <IconBase {...p}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></IconBase>;
const CheckIcon = (p) => <IconBase {...p}><path d="M20 6 9 17l-5-5" /></IconBase>;
const CheckCircleIcon = (p) => <IconBase {...p}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></IconBase>;
const GlobeIcon = (p) => <IconBase {...p}><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 0 20" /><path d="M12 2a15.3 15.3 0 0 0 0 20" /></IconBase>;
const GraduationIcon = (p) => <IconBase {...p}><path d="M3 8 12 4l9 4-9 4-9-4Z" /><path d="M7 10.5V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-4.5" /><path d="M21 8v6" /></IconBase>;
const FileCheckIcon = (p) => <IconBase {...p}><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z" /><path d="M14 2v5h5" /><path d="m9 15 2 2 4-5" /></IconBase>;
const ShieldIcon = (p) => <IconBase {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></IconBase>;
const CompassIcon = (p) => <IconBase {...p}><circle cx="12" cy="12" r="10" /><path d="m16 8-4 8-4-4 8-4Z" /></IconBase>;
const HeartIcon = (p) => <IconBase {...p}><path d="M19 14c1.5-1.5 3-3.2 3-5.5A4.5 4.5 0 0 0 12 6 4.5 4.5 0 0 0 2 8.5C2 10.8 3.5 12.5 5 14l7 7Z" /></IconBase>;
const HomeIcon = (p) => <IconBase {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9 21v-6h6v6" /></IconBase>;
const SparkleIcon = (p) => <IconBase {...p}><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /><path d="m6 6 3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" /></IconBase>;
const StarIcon = (p) => <IconBase {...p}><path d="m12 3 2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.8 6.7 19.6l1-5.8L3.5 9.7l5.9-.9L12 3Z" /></IconBase>;
const PlusIcon = (p) => <IconBase {...p}><path d="M12 5v14M5 12h14" /></IconBase>;
const MinusIcon = (p) => <IconBase {...p}><path d="M5 12h14" /></IconBase>;
const MailIcon = (p) => <IconBase {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></IconBase>;
const PhoneIcon = (p) => <IconBase {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7A2 2 0 0 1 22 16.9Z" /></IconBase>;

/* --------------------------------- Helpers -------------------------------- */
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Photo({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#F97343]/35 via-[#1B2438] to-[#0B1120] ${className}`}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LogoMark className="h-24 w-28 opacity-20" />
        </div>
      )}
    </div>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${dark ? "text-[#E8552B]" : "text-[#FB8C66]"}`}>
      {children}
    </p>
  );
}

/* ---------------------------------- Logo ---------------------------------- */
function LogoMark({ className = "h-11 w-12" }) {
  return (
    <svg className={className} viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17 69C32 31 57 28 78 43C93 54 106 41 112 19" stroke="#F97343" strokeWidth="13" strokeLinecap="round" />
      <path d="M16 68C33 39 55 44 75 55C92 64 106 48 113 23" stroke="#F97343" strokeWidth="7" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
function Logo({ compact = false, dark = false }) {
  return (
    <div className="flex items-center gap-3" aria-label="Pathways Academy">
      <LogoMark className={compact ? "h-9 w-10" : "h-11 w-12"} />
      <div className="leading-none">
        <p className={`font-display text-xl font-semibold tracking-tight ${dark ? "text-slate-950" : "text-white"}`}>Pathways</p>
        <p className={`mt-0.5 text-[0.7rem] font-medium uppercase tracking-[0.25em] ${dark ? "text-slate-500" : "text-slate-400"}`}>Academy</p>
      </div>
    </div>
  );
}

/* ----------------------------------- Data --------------------------------- */
const navLinks = [
  { id: "netherlands", label: "Why the Netherlands" },
  { id: "programmes", label: "Programmes" },
  { id: "process", label: "How It Works" },
  { id: "fees", label: "Fees" },
  { id: "faq", label: "FAQ" },
];

const heroStats = [
  { value: "NL", label: "Dutch higher-education focus" },
  { value: "2", label: "Structured pathway routes" },
  { value: "360°", label: "Support to arrival" },
];

const whyNetherlands = [
  { icon: GraduationIcon, title: "Globally respected universities", text: "Dutch institutions are known worldwide for academic quality, research, and graduate outcomes." },
  { icon: GlobeIcon, title: "Taught in English", text: "A wide range of English-taught programmes makes the Netherlands accessible to international students." },
  { icon: SparkleIcon, title: "Strong value for tuition", text: "High academic standards combined with reasonable living and study costs compared to other destinations." },
  { icon: HeartIcon, title: "Safe and welcoming", text: "An open, multicultural society where international students feel supported and at home." },
];

const programmes = [
  {
    title: "International Foundation Programme",
    subtitle: "One-year pathway",
    description: "A structured year that builds academic English, study skills, and subject knowledge so you progress with confidence into university-level study in the Netherlands.",
    facts: ["September intake", "Academic English & study skills", "Progression-focused planning"],
  },
  {
    title: "English Academic Preparation",
    subtitle: "Academic readiness route",
    description: "Focused preparation for students who need stronger academic communication and the confidence to thrive in English-taught higher education.",
    facts: ["Academic writing & speaking", "University readiness coaching", "Flexible start"],
  },
];

const valueProps = [
  { icon: CompassIcon, title: "Personalised guidance", text: "Every student receives a clear, individual plan — not a generic checklist." },
  { icon: FileCheckIcon, title: "Admissions coordination", text: "We help with applications, documents, offer letters, and every deadline." },
  { icon: ShieldIcon, title: "End-to-end visa support", text: "Practical guidance through visa documentation, financial evidence, and timelines." },
  { icon: HomeIcon, title: "Accommodation & arrival", text: "Help planning housing, insurance, and a smooth first arrival in the Netherlands." },
  { icon: HeartIcon, title: "One-to-one mentoring", text: "A real person who knows your case and answers your questions, start to finish." },
  { icon: CheckCircleIcon, title: "Transparent process", text: "Clear stages, honest advice, and no hidden fees — confirmed in your offer letter." },
];

const processSteps = [
  { title: "Eligibility review", text: "We review your background and goals and confirm the right pathway for you." },
  { title: "Programme selection", text: "Choose your programme and intake with guidance from our admissions team." },
  { title: "Application preparation", text: "We prepare your documents, checklist, and application together." },
  { title: "Admission & offer", text: "We submit your application and support you through to your offer letter." },
  { title: "Payment & visa guidance", text: "Clear guidance on tuition payment and visa documentation." },
  { title: "Pre-departure & arrival", text: "A briefing and arrival plan so you land in the Netherlands prepared." },
];

const stats = [
  { value: "2", label: "Pathway programmes" },
  { value: "6", label: "Dutch universities in our network" },
  { value: "4 days", label: "Admissions response commitment" },
  { value: "360°", label: "Support — application to arrival" },
];

/* PLACEHOLDER — replace with REAL, verified student testimonials before relying on this section. */
const testimonials = [
  { quote: "[Add a real student testimonial here once you have permission to publish it.]", name: "Student name", detail: "Programme · Country" },
  { quote: "[Add a real student testimonial here once you have permission to publish it.]", name: "Student name", detail: "Programme · Country" },
  { quote: "[Add a real student testimonial here once you have permission to publish it.]", name: "Student name", detail: "Programme · Country" },
];

const faqs = [
  { q: "Who are the pathway programmes for?", a: "They are designed for international students who want to strengthen their academic English and study skills before progressing into higher education in the Netherlands." },
  { q: "Do you guarantee a university place or a visa?", a: "No organisation can guarantee admission or a visa — final decisions rest with universities and the Dutch authorities. We prepare you thoroughly and support every step to give you the strongest possible application." },
  { q: "What does the tuition fee cover?", a: "The pathway programme tuition is €12,000. Your official offer letter always confirms the final payment details and what is included." },
  { q: "When can I start?", a: "The International Foundation Programme has a September intake. English Academic Preparation offers flexible start points — contact our admissions team for current dates." },
  { q: "Will you help with my visa and accommodation?", a: "Yes. We provide practical guidance for visa documentation and financial evidence, and help you plan accommodation and arrival." },
  { q: "How quickly will you respond to my application?", a: "Our admissions team reviews new applications and aims to contact you within four business working days." },
];

const universities = [
  "Leiden University", "University of Amsterdam", "Erasmus University Rotterdam",
  "Vrije Universiteit Amsterdam", "Tilburg University", "The Hague University of Applied Sciences",
];

const fees = [
  { item: "Pathway Programme Tuition", amount: "€12,000", note: "Total programme tuition fee" },
  { item: "Initial Payment", amount: "€3,000", note: "Due before 30 June 2026" },
  { item: "Remaining Balance", amount: "€9,000", note: "Due by 31 July 2026" },
  { item: "Early Full-Payment Discount", amount: "5%", note: "Full payment before 30 June 2026" },
];

const visaBasics = [
  {
    title: "The MVV — your entry visa",
    text: "For most non-EU students, the MVV is a sticker placed in your passport that allows you to travel to the Netherlands. It is valid for 90 days from entry.",
  },
  {
    title: "The VVR — your residence permit",
    text: "The VVR (residence permit) is the card that allows you to live and study in the Netherlands for the duration of your programme.",
  },
  {
    title: "The TEV procedure",
    text: "Most students apply for both at once through the combined TEV procedure. Your recognised education institution submits the application to the IND on your behalf.",
  },
  {
    title: "Proof of financial means",
    text: "You will need to show sufficient funds for your stay — for the 2025–2026 year this is roughly €1,094 per month. Always confirm the current amount with the IND.",
  },
];

const visaSteps = [
  "Receive your conditional or final admission offer from your education institution",
  "Pay the required tuition deposit or agreed programme payment",
  "Gather your passport, academic documents, and proof of financial means",
  "Your recognised institution submits the combined TEV application (MVV + VVR) to the IND",
  "The IND assesses the application; collect your MVV at the Dutch embassy or consulate when approved",
  "Travel to the Netherlands, register, and collect your residence permit (VVR) card",
];

/* ------------------------------ FAQ accordion ----------------------------- */
function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-lg font-semibold text-slate-900 md:text-xl">{faq.q}</span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-900">
          {isOpen ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-6 pr-14 leading-7 text-slate-600">{faq.a}</p>
      </motion.div>
    </div>
  );
}

/* =============================== MAIN PAGE ================================ */
export default function PathwaysAcademyWebsite() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = {
      fullName: form.fullName.value.trim(),
      email: form.email.value.trim(),
      whatsapp: form.whatsapp.value.trim(),
      programme: form.programme.value,
      message: form.message.value.trim(),
    };
    setStatus("loading");
    setErrorMsg("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("success");
      form.reset();
    } catch (error) {
      setErrorMsg(error.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#060A16] text-white">
      {/* ------------------------------- Header ------------------------------ */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060A16]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button type="button" onClick={() => scrollTo("top")} aria-label="Pathways Academy home">
            <Logo />
          </button>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
            {navLinks.map((link) => (
              <button key={link.id} type="button" onClick={() => scrollTo(link.id)} className="transition hover:text-white">
                {link.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => scrollTo("apply")}
            className="inline-flex items-center gap-2 rounded-full bg-[#F97343] px-5 py-2.5 text-sm font-semibold text-[#060A16] shadow-lg shadow-[#F97343]/20 transition hover:-translate-y-0.5 hover:bg-[#FB8C66]"
          >
            Apply Now
          </button>
        </div>
      </header>

      <main id="top">
        {/* -------------------------------- Hero ------------------------------ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(249,115,67,0.22),_transparent_55%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FB8C66]/30 bg-[#FB8C66]/10 px-4 py-2 text-sm text-[#FDB39A]"
              >
                <GlobeIcon className="h-4 w-4" />
                International pathway academy · The Netherlands
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl"
              >
                Your pathway to a future <span className="text-[#FB8C66]">in the Netherlands.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 }}
                className="mt-7 max-w-xl text-lg leading-8 text-slate-300"
              >
                For ambitious students from around the world, Pathways Academy turns the dream of a European education into a clear, guided journey — from your first question to your arrival on campus.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.19 }}
                className="mt-9 flex flex-col gap-4 sm:flex-row"
              >
                <button
                  type="button"
                  onClick={() => scrollTo("apply")}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#F97343] px-8 py-3.5 text-base font-semibold text-[#060A16] shadow-xl shadow-[#F97343]/25 transition hover:-translate-y-0.5 hover:bg-[#FB8C66]"
                >
                  Start your application
                  <ArrowRightIcon className="h-5 w-5 transition group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo("programmes")}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-base text-white transition hover:bg-white/10"
                >
                  Explore programmes
                </button>
              </motion.div>
              <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
                {heroStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="font-display text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[2.5rem] bg-[#F97343]/20 blur-3xl" />
              <Photo src={photos.hero} alt="International students celebrating graduation" className="relative h-[30rem] w-full rounded-[2rem] border border-white/10 shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-[#0B1120]/95 p-5 shadow-xl backdrop-blur-xl sm:block">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97343] text-[#060A16]">
                    <CheckCircleIcon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Guided every step</p>
                    <p className="text-xs text-slate-400">From application to arrival</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ----------------------- University network bar --------------------- */}
        <section className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Preparing students for progression across leading Dutch universities
            </p>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-center md:grid-cols-3 lg:grid-cols-6">
              {universities.map((u) => (
                <p key={u} className="text-sm font-medium text-slate-300">{u}</p>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------- Why Netherlands ------------------------ */}
        <section id="netherlands" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <Reveal>
                <Photo src={photos.netherlands} alt="A city in the Netherlands" className="h-[26rem] w-full rounded-[2rem] border border-white/10" />
              </Reveal>
              <div>
                <Reveal>
                  <Eyebrow>Why the Netherlands</Eyebrow>
                  <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                    A place to study, grow, and belong.
                  </h2>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                    The Netherlands is one of the world's most welcoming destinations for international students — combining academic excellence with a safe, open, English-friendly society.
                  </p>
                </Reveal>
                <div className="mt-9 grid gap-4 sm:grid-cols-2">
                  {whyNetherlands.map((item, i) => (
                    <Reveal key={item.title} delay={i * 0.07}>
                      <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-[#F97343]/40">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97343]/15 text-[#FB8C66]">
                          <item.icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-4 font-display text-lg font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------ Programmes -------------------------- */}
        <section id="programmes" className="bg-white/[0.03] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow>Programmes</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Two routes, one destination.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Whichever route fits your goals, every programme is built to prepare you for university-level study with confidence.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {programmes.map((programme, i) => (
                <Reveal key={programme.title} delay={i * 0.1}>
                  <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-[#0B1120] p-8 transition hover:-translate-y-1 hover:border-[#F97343]/40">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FB8C66]">{programme.subtitle}</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">{programme.title}</h3>
                    <p className="mt-4 leading-7 text-slate-300">{programme.description}</p>
                    <div className="mt-6 grid gap-2.5">
                      {programme.facts.map((fact) => (
                        <div key={fact} className="flex items-center gap-3 text-sm text-slate-200">
                          <CheckIcon className="h-4 w-4 shrink-0 text-[#FB8C66]" />
                          {fact}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollTo("apply")}
                      className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#FB8C66]"
                    >
                      Apply for this programme
                      <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------- Why Pathways --------------------------- */}
        <section id="why" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow>Why Pathways Academy</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Studying abroad is a big step. You won't take it alone.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                We combine academic preparation with genuine, personal support — so every student feels informed, prepared, and confident.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {valueProps.map((prop, i) => (
                <Reveal key={prop.title} delay={(i % 3) * 0.07}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-[#F97343]/40">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F97343] text-[#060A16]">
                      <prop.icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-white">{prop.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{prop.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ Process ----------------------------- */}
        <section id="process" className="bg-[#FBF8F3] px-6 py-24 text-slate-950">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow dark>How it works</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                A clear journey, from first question to first day.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                No confusion, no guesswork. Six guided steps take you from your application to your arrival in the Netherlands.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step, i) => (
                <Reveal key={step.title} delay={(i % 3) * 0.07}>
                  <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 font-display text-lg font-semibold text-white">
                      {i + 1}
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-2 leading-6 text-slate-600">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------- Student support ------------------------- */}
        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <Reveal>
                <Eyebrow>Student support</Eyebrow>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                  Real people, beside you the whole way.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                  Behind every application is a student with hopes, questions, and a family counting on them. Our team treats your journey with the care it deserves — before, during, and after you apply.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-3">
                {[
                  "Academic guidance on pathways and entry requirements",
                  "Admissions coordination, documents, and deadlines",
                  "Visa documentation and financial-evidence preparation",
                  "Accommodation planning and pre-departure briefing",
                ].map((item, i) => (
                  <Reveal key={item} delay={i * 0.06}>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <CheckCircleIcon className="h-5 w-5 shrink-0 text-[#FB8C66]" />
                      <span className="text-sm text-slate-200">{item}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={0.1}>
              <Photo src={photos.support} alt="Pathways Academy advisor supporting a student" className="h-[28rem] w-full rounded-[2rem] border border-white/10" />
            </Reveal>
          </div>
        </section>

        {/* ------------------------------- Stats ------------------------------ */}
        <section className="px-6 pb-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#F97343]/15 via-[#0B1120] to-[#0B1120] p-10 md:p-14">
            <Reveal className="max-w-2xl">
              <Eyebrow>At a glance</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Focused entirely on your route to the Netherlands.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.07}>
                  <div>
                    <p className="font-display text-4xl font-semibold text-[#FB8C66] md:text-5xl">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------- Testimonials -------------------------- */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow>Student voices</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Stories from our students.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Real experiences from students who began their journey with Pathways Academy.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                    <div className="flex gap-1 text-[#FB8C66]">
                      {[0, 1, 2, 3, 4].map((s) => <StarIcon key={s} className="h-4 w-4" />)}
                    </div>
                    <p className="mt-5 flex-1 leading-7 text-slate-200">{t.quote}</p>
                    <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F97343]/20 font-display font-semibold text-[#FB8C66]">PA</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-slate-400">{t.detail}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------- Fees ------------------------------ */}
        <section id="fees" className="bg-white/[0.03] px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <Eyebrow>Fees & payment</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                Transparent tuition. No surprises.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                The total tuition for the Pathway Programme is €12,000. Final payment instructions are always confirmed in your official offer letter.
              </p>
              <div className="mt-6 rounded-2xl border border-[#FB8C66]/25 bg-[#FB8C66]/10 p-6">
                <p className="font-semibold text-[#FFD8CC]">Payment plan</p>
                <p className="mt-2 leading-7 text-[#FFD8CC]/85">
                  Pay €3,000 before 30 June 2026, with the balance due by 31 July 2026. Pay your full tuition before 30 June 2026 and receive a 5% discount.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B1120]">
                {fees.map((fee, i) => (
                  <div key={fee.item} className={`grid items-center gap-3 p-6 sm:grid-cols-[1fr_auto] ${i !== fees.length - 1 ? "border-b border-white/10" : ""}`}>
                    <div>
                      <p className="font-semibold text-white">{fee.item}</p>
                      <p className="mt-1 text-sm text-slate-400">{fee.note}</p>
                    </div>
                    <p className="font-display text-2xl font-semibold text-[#FB8C66]">{fee.amount}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------- Visa ------------------------------ */}
        <section id="visa" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow>Visa & residence permit</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Understanding your route to the Netherlands.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                The Dutch student immigration process is well-defined. Here is how it works — and how Pathways Academy helps you prepare for every part of it.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {visaBasics.map((item, i) => (
                <Reveal key={item.title} delay={(i % 4) * 0.07}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                    <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <Reveal>
                <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">The step-by-step journey</h3>
                <p className="mt-4 leading-7 text-slate-300">
                  We guide you through documentation, financial evidence, and deadlines at every stage. Final visa decisions are always made by the Dutch authorities — our role is to make sure you are fully prepared.
                </p>
                <div className="mt-6 rounded-2xl border border-[#FB8C66]/25 bg-[#FB8C66]/10 p-6">
                  <p className="font-semibold text-[#FFD8CC]">Always verify official requirements</p>
                  <p className="mt-2 leading-7 text-[#FFD8CC]/85">
                    Immigration rules and amounts change. Confirm the current requirements for your nationality on the official IND website before you apply.
                  </p>
                  <a
                    href="https://ind.nl/en"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#FB8C66] hover:text-[#FDB39A]"
                  >
                    Visit the official IND website
                    <ArrowRightIcon className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
              <div className="grid gap-4">
                {visaSteps.map((step, i) => (
                  <Reveal key={step} delay={i * 0.05}>
                    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F97343] font-display font-semibold text-[#060A16]">
                        {i + 1}
                      </div>
                      <p className="pt-1.5 font-medium text-slate-200">{step}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------- FAQ ------------------------------- */}
        <section id="faq" className="bg-[#FBF8F3] px-6 py-24 text-slate-950">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Eyebrow dark>FAQ</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Questions, answered honestly.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Still unsure about something? Our admissions team is always happy to help.
              </p>
              <a
                href="mailto:admissions@pathwaysacademy.nl"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#E8552B]"
              >
                <MailIcon className="h-4 w-4" />
                admissions@pathwaysacademy.nl
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-[2rem] border border-slate-200 bg-white px-7 md:px-9">
                {faqs.map((faq, i) => (
                  <FaqItem
                    key={faq.q}
                    faq={faq}
                    isOpen={openFaq === i}
                    onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------- Apply / contact -------------------------- */}
        <section id="apply" className="px-6 py-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#F97343] via-[#F97343] to-[#E8552B] p-8 md:p-14">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-900/70">Apply now</p>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">
                  Begin your pathway today.
                </h2>
                <p className="mt-5 max-w-md text-lg leading-8 text-slate-900/85">
                  Tell us a little about yourself. Our admissions team will review your details and contact you within four business working days.
                </p>
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900">
                    <MailIcon className="h-5 w-5" />
                    <a href="mailto:admissions@pathwaysacademy.nl" className="font-medium hover:underline">admissions@pathwaysacademy.nl</a>
                  </div>
                  <div className="flex items-center gap-3 text-slate-900">
                    <PhoneIcon className="h-5 w-5" />
                    <a href="tel:+31703052786" className="font-medium hover:underline">+31 703 052 786</a>
                  </div>
                  <div className="flex items-center gap-3 text-slate-900">
                    <HomeIcon className="h-5 w-5" />
                    <span className="font-medium">Johanna Westerdijkplein 75, 2521 EN The Hague</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-white p-6 shadow-2xl md:p-8">
                {status === "success" ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F97343]/15 text-[#E8552B]">
                      <CheckCircleIcon className="h-9 w-9" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-slate-950">Application received</h3>
                    <p className="mt-3 max-w-md leading-7 text-slate-600">
                      Thank you for applying. A confirmation email is on its way to you, and our admissions team will be in touch within four business working days.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Submit another application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-1.5">
                      <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">Full name</label>
                      <input id="fullName" name="fullName" type="text" required placeholder="Your full name"
                        className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-[#F97343] focus:bg-white focus:ring-4 focus:ring-[#F97343]/15" />
                    </div>
                    <div className="grid gap-1.5">
                      <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email address</label>
                      <input id="email" name="email" type="email" required placeholder="you@example.com"
                        className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-[#F97343] focus:bg-white focus:ring-4 focus:ring-[#F97343]/15" />
                    </div>
                    <div className="grid gap-1.5">
                      <label htmlFor="whatsapp" className="text-sm font-semibold text-slate-700">WhatsApp number</label>
                      <input id="whatsapp" name="whatsapp" type="tel" required placeholder="+93 70 000 0000"
                        className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-[#F97343] focus:bg-white focus:ring-4 focus:ring-[#F97343]/15" />
                    </div>
                    <div className="grid gap-1.5">
                      <label htmlFor="programme" className="text-sm font-semibold text-slate-700">Programme</label>
                      <select id="programme" name="programme" required defaultValue=""
                        className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-[#F97343] focus:bg-white focus:ring-4 focus:ring-[#F97343]/15">
                        <option value="" disabled>Select a programme</option>
                        {programmes.map((p) => <option key={p.title} value={p.title}>{p.title}</option>)}
                        <option value="Not sure yet">Not sure yet — please advise</option>
                      </select>
                    </div>
                    <div className="grid gap-1.5">
                      <label htmlFor="message" className="text-sm font-semibold text-slate-700">Comment / message</label>
                      <textarea id="message" name="message" rows={4} placeholder="Tell us anything that will help us support your application"
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#F97343] focus:bg-white focus:ring-4 focus:ring-[#F97343]/15" />
                    </div>
                    {status === "error" && (
                      <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{errorMsg}</p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="mt-1 inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-7 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "loading" ? "Sending application…" : "Submit Application"}
                    </button>
                    <p className="text-center text-xs text-slate-500">
                      You will receive a confirmation email once your application is submitted.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------- Footer ------------------------------ */}
      <footer className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <Logo />
              <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
                Academic pathway programmes and university preparation for international students in the Netherlands.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FB8C66]">Contact</h4>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p>Johanna Westerdijkplein 75,<br />2521 EN The Hague</p>
                <p><a href="tel:+31703052786" className="hover:text-white">+31 703 052 786</a><span className="text-slate-500"> · General enquiries</span></p>
                <p><a href="tel:+31704457786" className="hover:text-white">+31 704 457 786</a><span className="text-slate-500"> · Current students</span></p>
                <p><a href="mailto:admissions@pathwaysacademy.nl" className="hover:text-white">admissions@pathwaysacademy.nl</a></p>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FB8C66]">Explore</h4>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
                {navLinks.map((link) => (
                  <button key={link.id} type="button" onClick={() => scrollTo(link.id)} className="text-left hover:text-white">
                    {link.label}
                  </button>
                ))}
                <button type="button" onClick={() => scrollTo("apply")} className="text-left hover:text-white">Apply Now</button>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Pathways Academy. All rights reserved.</p>
            <p>The Hague · The Netherlands</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
