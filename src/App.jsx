import React, { useState } from "react";
import { motion } from "framer-motion";
import { Routes, Route, Link } from "react-router-dom";

function IconBase({ children, className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function ArrowRightIcon(props) {
  return <IconBase {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></IconBase>;
}

function CheckCircleIcon(props) {
  return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></IconBase>;
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <svg className="h-12 w-14" viewBox="0 0 120 90" fill="none">
        <path d="M17 69C32 31 57 28 78 43C93 54 106 41 112 19" stroke="#F97343" strokeWidth="13" strokeLinecap="round" />
        <path d="M16 68C33 39 55 44 75 55C92 64 106 48 113 23" stroke="#F97343" strokeWidth="7" strokeLinecap="round" opacity="0.65" />
      </svg>
      <div>
        <p className="font-serif text-2xl font-semibold text-white">Pathways</p>
        <p className="font-serif text-lg text-slate-300">Academy</p>
      </div>
    </Link>
  );
}

const programmes = [
  {
    title: "International Foundation Programme",
    path: "/programmes/international-foundation-programme",
    subtitle: "One-year pathway programme",
    description: "Academic preparation, English support, study skills, and university readiness for students planning bachelor-level study in the Netherlands.",
    facts: ["September intake", "Academic English", "Study skills", "University progression guidance"],
  },
  {
    title: "English Academic Preparation",
    path: "/programmes/english-academic-preparation",
    subtitle: "Academic English and readiness route",
    description: "Focused preparation for students who need stronger academic communication, writing, speaking, and classroom confidence.",
    facts: ["Academic writing", "Presentation skills", "IELTS readiness", "University study preparation"],
  },
];

const process = [
  "Initial eligibility review",
  "Programme and intake selection",
  "Document checklist and application preparation",
  "Admission submission and offer follow-up",
];

function scrollToSection(sectionId) {
  if (window.location.pathname !== "/") {
    window.location.href = `/#${sectionId}`;
    return;
  }

  const section = document.getElementById(sectionId);
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />

        <nav className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
          <Link to="/" className="hover:text-white">Home</Link>
          <button onClick={() => scrollToSection("about")} className="hover:text-white">About</button>
          <button onClick={() => scrollToSection("programmes")} className="hover:text-white">Programmes</button>
          <button onClick={() => scrollToSection("fees")} className="hover:text-white">Fees</button>
          <Link to="/visa-residence-permit" className="hover:text-white">Visa Guide</Link>
          <Link to="/student-finance" className="hover:text-white">Student Finance</Link>
          <Link to="/living-in-netherlands" className="hover:text-white">Living in NL</Link>
          <button onClick={() => scrollToSection("contact")} className="hover:text-white">Contact</button>
        </nav>

        <button onClick={() => scrollToSection("contact")} className="rounded-full bg-[#F97343] px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-[#FB8C66]">
          Apply Now
        </button>
      </div>
    </header>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  setStatus("");

  const form = new FormData(e.currentTarget);

  const payload = {
    fullName: form.get("fullName"),
    email: form.get("email"),
    phone: form.get("phone"),
    country: form.get("country"),
    programme: form.get("programme"),
    message: form.get("message"),
  };

try {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data = {};

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(text.slice(0, 120));
  }

  if (!res.ok) {
    throw new Error(data.details || data.error || "Message failed");
  }

  setStatus("success");
  e.currentTarget.reset();
} catch (error) {
  console.error("FORM ERROR:", error);
  alert(error.message);
  setStatus("error");
finally {
  setLoading(false);
}
    console.error("FORM ERROR:", error);
    alert(error.message);
    setStatus("error");
  } finally {
    setLoading(false);
  }
}

  return (
    <section id="contact" className="bg-white px-6 py-24 text-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-[#F97343] p-10 md:p-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-800">Apply Now</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Ready to begin your pathway to the Netherlands?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-800">
            Complete the form and our admissions team will contact you by email.
          </p>
          <p className="mt-6 text-sm font-semibold text-slate-900">
            Email: admissions@pathwaysacademy.nl
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-xl">
          <div className="grid gap-4 md:grid-cols-2">
            <input name="fullName" required placeholder="Full name" className="rounded-xl border border-slate-300 px-4 py-3" />
            <input name="email" required type="email" placeholder="Email address" className="rounded-xl border border-slate-300 px-4 py-3" />
            <input name="phone" placeholder="Phone / WhatsApp" className="rounded-xl border border-slate-300 px-4 py-3" />
            <input name="country" placeholder="Country" className="rounded-xl border border-slate-300 px-4 py-3" />
          </div>

          <select name="programme" required className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3">
            <option value="">Select programme</option>
            <option>International Foundation Programme</option>
            <option>English Academic Preparation</option>
            <option>General admissions question</option>
          </select>

          <textarea name="message" required placeholder="Tell us about your study plan..." rows="5" className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3" />

          <button disabled={loading} className="mt-5 w-full rounded-full bg-slate-950 px-6 py-3 font-semibold text-white hover:bg-slate-800">
            {loading ? "Sending..." : "Submit Application"}
          </button>

  {status === "success" && (
  <p className="mt-4 rounded-xl bg-green-100 p-3 text-sm font-semibold text-green-800">
    Thank you. Your enquiry has been sent successfully.
  </p>
)}

{status === "error" && (
  <p className="mt-4 rounded-xl bg-red-100 p-3 text-sm font-semibold text-red-800">
    Message failed. Please email admissions@pathwaysacademy.nl.
  </p>
)}
        </form>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F97343]/20 via-slate-950 to-slate-950" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-32">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6 inline-flex rounded-full border border-[#FB8C66]/30 bg-[#FB8C66]/10 px-4 py-2 text-sm text-[#FDB39A]">
              International pathway academy in the Netherlands
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Prepare for university success in the Netherlands.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Pathways Academy delivers pathway education, academic preparation, English-language readiness, and progression support for students entering higher education in the Netherlands.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => scrollToSection("contact")} className="inline-flex h-12 items-center justify-center rounded-full bg-[#F97343] px-7 font-semibold text-slate-950 hover:bg-[#FB8C66]">
                Start Your Application <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>

              <button onClick={() => scrollToSection("programmes")} className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-white hover:bg-white/10">
                View Programmes
              </button>
            </div>
          </motion.div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-7 shadow-2xl">
            <h2 className="text-3xl font-semibold text-white">
              Your academic route from application to arrival.
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Clear admissions steps, pathway preparation, and practical guidance for studying in the Netherlands.
            </p>

            <div className="mt-6 space-y-4">
              {process.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F97343] font-semibold text-slate-950">
                    {index + 1}
                  </div>
                  <p className="font-medium text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-white px-6 py-24 text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E86233]">About Pathways Academy</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              A pathway academy for university preparation in the Netherlands.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-700">
            <p>Pathways Academy supports international students with academic preparation, admissions guidance, English-language readiness, visa preparation, and arrival support.</p>
            <p>Students completing our academy preparation can progress toward bachelor or master programmes with our partner university network and wider Dutch higher education opportunities.</p>
          </div>
        </div>
      </section>

      <section id="programmes" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FB8C66]">Programmes</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Pathway and academic preparation options
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {programmes.map((programme) => (
              <Link key={programme.title} to={programme.path} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white transition hover:-translate-y-1 hover:bg-white/10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FB8C66]">{programme.subtitle}</p>
                <h3 className="mt-4 text-3xl font-semibold">{programme.title}</h3>
                <p className="mt-5 leading-8 text-slate-300">{programme.description}</p>
                <div className="mt-7 grid gap-3">
                  {programme.facts.map((fact) => (
                    <div key={fact} className="flex gap-3 rounded-2xl bg-white/5 p-4">
                      <CheckCircleIcon className="h-5 w-5 text-[#FB8C66]" />
                      <p>{fact}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 font-semibold text-[#FB8C66]">View programme details →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="fees" className="bg-white px-6 py-24 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E86233]">Fees</p>
          <h2 className="mt-4 text-4xl font-semibold">Transparent pathway programme tuition.</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              ["Tuition Fee", "€12,000"],
              ["Initial Payment", "€3,000"],
              ["Remaining Balance", "€9,000"],
              ["Early Payment Discount", "5%"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl bg-slate-100 p-6">
                <p className="text-sm text-slate-600">{label}</p>
                <p className="mt-2 text-3xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}

function VisaPage() {
  return (
    <main className="bg-white px-6 py-24 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="font-semibold text-[#E86233]">← Back to Home</Link>
        <h1 className="mt-8 text-5xl font-semibold">Netherlands Student Visa & Residence Permit</h1>
        <p className="mt-8 text-lg leading-8 text-slate-700">
          Students may need an MVV and residence permit depending on nationality, study duration, and official Dutch immigration requirements.
        </p>
      </div>
    </main>
  );
}

function FinancePage() {
  return (
    <main className="bg-white px-6 py-24 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="font-semibold text-[#E86233]">← Back to Home</Link>
        <h1 className="mt-8 text-5xl font-semibold">Student Finance in the Netherlands</h1>
        <p className="mt-8 text-lg leading-8 text-slate-700">
          Students should prepare for tuition, accommodation, insurance, transport, food, study materials, and personal expenses before arrival.
        </p>
      </div>
    </main>
  );
}

function LivingPage() {
  return (
    <main className="bg-white px-6 py-24 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="font-semibold text-[#E86233]">← Back to Home</Link>
        <h1 className="mt-8 text-5xl font-semibold">Living in the Netherlands</h1>
        <p className="mt-8 text-lg leading-8 text-slate-700">
          Prepare for accommodation, insurance, municipality registration, transportation, and student life.
        </p>
      </div>
    </main>
  );
}

function InternationalFoundationPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="font-semibold text-[#FB8C66]">← Back to Home</Link>
        <h1 className="mt-8 text-5xl font-bold">International Foundation Programme</h1>
        <p className="mt-8 text-xl leading-8 text-slate-300">
          This programme prepares students for bachelor-level study through academic English, study skills, subject preparation, and progression guidance.
        </p>
      </div>
    </main>
  );
}

function EnglishPreparationPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="font-semibold text-[#FB8C66]">← Back to Home</Link>
        <h1 className="mt-8 text-5xl font-bold">English Academic Preparation</h1>
        <p className="mt-8 text-xl leading-8 text-slate-300">
          This programme helps students improve academic English, IELTS readiness, writing, speaking, and confidence for university study.
        </p>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto max-w-7xl text-sm text-slate-400">
        © 2026 Pathways Academy. All rights reserved.
      </div>
    </footer>
  );
}

export default function PathwaysAcademyWebsite() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visa-residence-permit" element={<VisaPage />} />
        <Route path="/student-finance" element={<FinancePage />} />
        <Route path="/living-in-netherlands" element={<LivingPage />} />
        <Route path="/programmes/international-foundation-programme" element={<InternationalFoundationPage />} />
        <Route path="/programmes/english-academic-preparation" element={<EnglishPreparationPage />} />
      </Routes>

      <Footer />
    </div>
  );
}
