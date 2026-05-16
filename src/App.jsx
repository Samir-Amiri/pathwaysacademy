import React, { useState } from "react";
import { motion } from "framer-motion";

function Card({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function IconBase({ children, className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

function GraduationCapIcon(props) {
  return <IconBase {...props}><path d="M3 8 12 4l9 4-9 4-9-4Z" /><path d="M7 10.5V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-4.5" /><path d="M21 8v6" /></IconBase>;
}

function GlobeIcon(props) {
  return <IconBase {...props}><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 0 20" /><path d="M12 2a15.3 15.3 0 0 0 0 20" /></IconBase>;
}

function FileCheckIcon(props) {
  return <IconBase {...props}><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z" /><path d="M14 2v5h5" /><path d="m9 15 2 2 4-5" /></IconBase>;
}

function ShieldCheckIcon(props) {
  return <IconBase {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></IconBase>;
}

function CalendarIcon(props) {
  return <IconBase {...props}><path d="M8 2v4" /><path d="M16 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" /></IconBase>;
}

function BuildingIcon(props) {
  return <IconBase {...props}><path d="M4 21V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v17" /><path d="M3 21h18" /><path d="M8 6h1" /><path d="M12 6h1" /><path d="M8 10h1" /><path d="M12 10h1" /><path d="M8 14h1" /><path d="M12 14h1" /></IconBase>;
}

function MessageIcon(props) {
  return <IconBase {...props}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /></IconBase>;
}

function PlaneIcon(props) {
  return <IconBase {...props}><path d="M22 16.5 2 12l20-4.5-5.5 4.5L22 16.5Z" /><path d="M2 12h14.5" /></IconBase>;
}

function PathwaysLogoMark({ className = "h-11 w-11" }) {
  return (
    <svg className={className} viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17 69C32 31 57 28 78 43C93 54 106 41 112 19" stroke="#F97343" strokeWidth="13" strokeLinecap="round" />
      <path d="M16 68C33 39 55 44 75 55C92 64 106 48 113 23" stroke="#F97343" strokeWidth="7" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

function Logo({ compact = false, dark = false }) {
  const textColor = dark ? "text-slate-950" : "text-white";
  const subColor = dark ? "text-slate-600" : "text-slate-300";

  return (
    <div className="flex items-center gap-3" aria-label="Pathways Academy logo">
      <PathwaysLogoMark className={compact ? "h-10 w-12" : "h-12 w-14"} />
      {!compact && (
        <div className="leading-none">
          <p className={`font-serif text-2xl font-semibold tracking-tight ${textColor}`}>Pathways</p>
          <p className={`mt-1 font-serif text-lg tracking-wide ${subColor}`}>Academy</p>
        </div>
      )}
    </div>
  );
}

const programmes = [
  {
    title: "International Foundation Programme",
    subtitle: "One-year pathway programme",
    description: "A structured pathway designed to strengthen academic English, study skills, and subject knowledge before progression to university-level study in the Netherlands.",
    facts: ["September intake", "Academic skills and English preparation", "Progression-focused study planning"],
  },
  {
    title: "English Academic Preparation",
    subtitle: "Academic English and readiness route",
    description: "Focused preparation for students who need stronger academic communication, study confidence, and readiness for English-taught higher education.",
    facts: ["English-language development", "Academic writing and presentation skills", "University study preparation"],
  },
];

const services = [
  { icon: GraduationCapIcon, title: "Academic Pathway Guidance", text: "Students receive guidance on pathway routes, entry requirements, progression options, and academic readiness for Dutch higher education." },
  { icon: FileCheckIcon, title: "Admissions Coordination", text: "Our admissions team supports application forms, document checklists, offer-letter guidance, and applicant communication." },
  { icon: ShieldCheckIcon, title: "Visa Preparation", text: "Students receive practical guidance for visa documentation, financial evidence, timelines, and appointment readiness." },
  { icon: PlaneIcon, title: "Pre-Departure Support", text: "We prepare students for travel, accommodation planning, insurance, arrival expectations, and student life in the Netherlands." },
];

const fees = [
  { item: "Pathway Programme Tuition Fee", amount: "€12,000", note: "Total tuition fee" },
  { item: "Initial Payment", amount: "€3,000", note: "Due before June 30, 2026" },
  { item: "Remaining Balance", amount: "€9,000", note: "Due by July 31, 2026" },
  { item: "Early Full-Payment Discount", amount: "5%", note: "For full tuition payment before June 30, 2026" },
];

const visaSteps = [
  "Receive conditional or final admission offer",
  "Pay the required tuition deposit or agreed programme payment",
  "Prepare passport, academic documents, financial evidence, and required forms",
  "Submit visa and residence-permit documentation through the academy process",
  "Complete embassy or appointment requirements when applicable",
  "Receive visa decision and prepare for travel to the Netherlands",
];

const universityPartners = [
  "Leiden University",
  "University of Amsterdam",
  "Erasmus University Rotterdam",
  "Vrije Universiteit Amsterdam",
  "Tilburg University",
  "The Hague University of Applied Sciences",
];

const process = [
  "Initial eligibility review",
  "Programme and intake selection",
  "Document checklist and application preparation",
  "Admission submission and offer follow-up",
  "Payment and visa-document guidance",
  "Pre-departure briefing and arrival planning",
];

export default function PathwaysAcademyWebsite() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
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
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (error) {
      setErrorMsg(error.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
            <button type="button" onClick={() => scrollToSection("about")} className="transition hover:text-white">About</button>
            <button type="button" onClick={() => scrollToSection("programmes")} className="transition hover:text-white">Programmes</button>
            <button type="button" onClick={() => scrollToSection("fees")} className="transition hover:text-white">Fees</button>
            <button type="button" onClick={() => scrollToSection("visa")} className="transition hover:text-white">Visa</button>
            <button type="button" onClick={() => scrollToSection("admissions")} className="transition hover:text-white">Admissions</button>
            <button type="button" onClick={() => scrollToSection("contact")} className="transition hover:text-white">Contact</button>
          </nav>
          <button type="button" onClick={() => scrollToSection("contact")} className="inline-flex items-center justify-center rounded-full bg-[#F97343] px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-[#FB8C66]">Apply Now</button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F97343]/20 via-slate-950 to-slate-950" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-32">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col justify-center">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#FB8C66]/30 bg-[#FB8C66]/10 px-4 py-2 text-sm text-[#FDB39A]">
                <GlobeIcon className="h-4 w-4" />
                International pathway academy in the Netherlands
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
                Prepare for university success in the Netherlands.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                Pathways Academy delivers pathway education, academic preparation, English-language readiness, and progression support for students entering higher education in the Netherlands.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <button type="button" onClick={() => scrollToSection("contact")} className="inline-flex h-12 items-center justify-center rounded-full bg-[#F97343] px-7 text-base font-semibold text-slate-950 transition hover:bg-[#FB8C66]">
                  Start Your Application <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
                <button type="button" onClick={() => scrollToSection("programmes")} className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-base text-white transition hover:bg-white/10">
                  View Programmes
                </button>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-2xl font-semibold text-white">NL</p><p>Netherlands focus</p></div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-2xl font-semibold text-white">2</p><p>Main pathway routes</p></div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-2xl font-semibold text-white">360</p><p>Student support</p></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-[#F97343]/20 blur-3xl" />
              <Card className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
                <CardContent className="p-0">
                  <div className="border-b border-white/10 bg-white/10 p-7">
                    <Logo compact />
                    <h2 className="mt-6 text-3xl font-semibold text-white">Your academic route from application to arrival.</h2>
                    <p className="mt-3 leading-7 text-slate-300">Clear admissions steps, pathway preparation, and practical guidance for studying in the Netherlands.</p>
                  </div>
                  <div className="space-y-4 p-6">
                    {process.slice(0, 4).map((item, index) => (
                      <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F97343] font-semibold text-slate-950">{index + 1}</div>
                        <p className="font-medium text-white">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="about" className="bg-white px-6 py-24 text-slate-950">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E86233]">About Pathways Academy</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">A pathway academy for university preparation in the Netherlands.</h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-slate-700">
              <p>Pathways Academy is an international academy based in the Netherlands, focused on pathway education and university preparation for students progressing into Dutch higher education institutions.</p>
              <p>Our academy model combines academic preparation, admissions coordination, English-language readiness, and student support to help learners transition confidently into university-level education in the Netherlands.</p>
            </div>
          </div>
        </section>

        <section id="programmes" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FB8C66]">Programmes</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Pathway and academic preparation options</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">Our programmes are designed to prepare students for university-level study through academic skills, English-language development, and progression-focused support.</p>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {programmes.map((programme) => (
                <Card key={programme.title} className="rounded-3xl border border-white/10 bg-white/5 text-white">
                  <CardContent className="p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FB8C66]">{programme.subtitle}</p>
                    <h3 className="mt-4 text-3xl font-semibold">{programme.title}</h3>
                    <p className="mt-5 leading-8 text-slate-300">{programme.description}</p>
                    <div className="mt-7 grid gap-3">
                      {programme.facts.map((fact) => (
                        <div key={fact} className="flex gap-3 rounded-2xl bg-white/5 p-4">
                          <CheckCircleIcon className="mt-1 h-5 w-5 shrink-0 text-[#FB8C66]" />
                          <p className="text-slate-200">{fact}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-6 py-20">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FB8C66]">University Network</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">Pathway preparation aligned with leading Dutch universities.</h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">Our academy prepares students for progression opportunities across the Dutch higher-education environment through pathway preparation, English-language readiness, and academic support.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {universityPartners.map((university) => (
                  <div key={university} className="flex min-h-[90px] items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-6 py-5 text-center text-sm font-semibold text-white backdrop-blur-sm">
                    {university}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-slate-100 px-6 py-24 text-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E86233]">Student Support</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Academic and student support before, during, and after application.</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {services.map(({ icon: Icon, title, text }) => (
                  <Card key={title} className="rounded-3xl border-0 bg-white shadow-sm">
                    <CardContent className="p-7">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F97343] text-slate-950"><Icon /></div>
                      <h3 className="text-xl font-semibold">{title}</h3>
                      <p className="mt-4 leading-7 text-slate-700">{text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="fees" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FB8C66]">Fees & Payment Plan</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Transparent pathway programme tuition.</h2>
                <p className="mt-6 text-lg leading-8 text-slate-300">The total tuition fee for the Pathway Programme is €12,000. Students should always confirm final payment instructions in their official offer letter.</p>
                <div className="mt-6 rounded-3xl border border-[#FB8C66]/30 bg-[#FB8C66]/10 p-6 text-[#FFD8CC]">
                  <p className="font-semibold">Payment plan</p>
                  <p className="mt-2 leading-7">Students pay an initial €3,000 before June 30, 2026. The remaining balance is due by July 31, 2026. Students who pay the full tuition before June 30, 2026 receive a 5% discount.</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
                {fees.map((fee, index) => (
                  <div key={fee.item} className={`grid gap-3 p-6 md:grid-cols-[1fr_140px_150px] ${index !== fees.length - 1 ? "border-b border-white/10" : ""}`}>
                    <p className="font-semibold text-white">{fee.item}</p>
                    <p className="text-2xl font-semibold text-[#FB8C66]">{fee.amount}</p>
                    <p className="text-sm text-slate-400">{fee.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="visa" className="bg-slate-100 px-6 py-24 text-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E86233]">Visa Process</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Clear guidance for the Netherlands student visa process.</h2>
                <p className="mt-6 text-lg leading-8 text-slate-700">Pathways Academy supports students with visa-document preparation, financial-document guidance, deadline planning, and pre-departure readiness. Final visa decisions are made by the relevant Dutch authorities.</p>
                <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
                  <p className="font-semibold text-slate-950">Important note</p>
                  <p className="mt-2 leading-7 text-slate-700">Visa requirements can vary by nationality, intake, and official regulations. Students should begin preparation early and follow the document checklist provided for their application.</p>
                </div>
              </div>
              <div className="grid gap-4">
                {visaSteps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-3xl bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-semibold text-white">{index + 1}</div>
                    <p className="pt-2 font-medium text-slate-800">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="admissions" className="bg-white px-6 py-24 text-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E86233]">Admissions Process</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">A clear step-by-step process from application to departure.</h2>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {process.map((item, index) => (
                <div key={item} className="rounded-3xl bg-slate-100 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-semibold text-white">{index + 1}</div>
                  <p className="mt-5 text-lg font-semibold text-slate-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
            <Card className="rounded-3xl border border-white/10 bg-white/5 text-white">
              <CardContent className="p-8">
                <BuildingIcon className="h-9 w-9 text-[#FB8C66]" />
                <h3 className="mt-5 text-2xl font-semibold">Study in The Hague</h3>
                <p className="mt-4 leading-7 text-slate-300">The Hague offers an international, student-friendly environment with access to business, law, governance, technology, and culture.</p>
              </CardContent>
            </Card>
            <Card className="rounded-3xl border border-white/10 bg-white/5 text-white">
              <CardContent className="p-8">
                <CalendarIcon className="h-9 w-9 text-[#FB8C66]" />
                <h3 className="mt-5 text-2xl font-semibold">Intakes & Deadlines</h3>
                <p className="mt-4 leading-7 text-slate-300">Students should plan carefully for intake dates, document preparation, payment deadlines, and visa timelines.</p>
              </CardContent>
            </Card>
            <Card className="rounded-3xl border border-white/10 bg-white/5 text-white">
              <CardContent className="p-8">
                <MessageIcon className="h-9 w-9 text-[#FB8C66]" />
                <h3 className="mt-5 text-2xl font-semibold">Admissions Support</h3>
                <p className="mt-4 leading-7 text-slate-300">Receive academic guidance, programme information, and pathway support from our admissions and student-success team.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="contact" className="bg-white px-6 py-24 text-slate-950">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#F97343] p-8 md:p-14">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-800">Apply Now</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Ready to begin your pathway to the Netherlands?</h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-800">Complete the application form and our admissions team will review your details and contact you within four business working days.</p>
                <p className="mt-4 text-sm font-medium text-slate-800">Prefer email? Write to <a href="mailto:admissions@pathwaysacademy.nl" className="underline decoration-slate-950/40 underline-offset-4 hover:text-slate-950">admissions@pathwaysacademy.nl</a></p>
              </div>

              <div className="rounded-[1.75rem] bg-white p-6 shadow-xl md:p-8">
                {status === "success" ? (
                  <div className="flex flex-col items-center py-10 text-center">
                    <CheckCircleIcon className="h-14 w-14 text-[#E86233]" />
                    <h3 className="mt-5 text-2xl font-semibold text-slate-950">Application received</h3>
                    <p className="mt-3 max-w-md leading-7 text-slate-600">
                      Thank you for applying. A confirmation email has been sent to you. Our admissions team will contact you within four business working days.
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
                        className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-[#F97343] focus:bg-white" />
                    </div>
                    <div className="grid gap-1.5">
                      <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email address</label>
                      <input id="email" name="email" type="email" required placeholder="you@example.com"
                        className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-[#F97343] focus:bg-white" />
                    </div>
                    <div className="grid gap-1.5">
                      <label htmlFor="whatsapp" className="text-sm font-semibold text-slate-700">WhatsApp number</label>
                      <input id="whatsapp" name="whatsapp" type="tel" required placeholder="+93 70 000 0000"
                        className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-[#F97343] focus:bg-white" />
                    </div>
                    <div className="grid gap-1.5">
                      <label htmlFor="programme" className="text-sm font-semibold text-slate-700">Programme</label>
                      <select id="programme" name="programme" required defaultValue=""
                        className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-[#F97343] focus:bg-white">
                        <option value="" disabled>Select a programme</option>
                        {programmes.map((programme) => (
                          <option key={programme.title} value={programme.title}>{programme.title}</option>
                        ))}
                        <option value="Not sure yet">Not sure yet — please advise</option>
                      </select>
                    </div>
                    <div className="grid gap-1.5">
                      <label htmlFor="message" className="text-sm font-semibold text-slate-700">Comment / message</label>
                      <textarea id="message" name="message" rows={4} placeholder="Tell us anything that will help us support your application"
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#F97343] focus:bg-white" />
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

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <Logo compact />
              <p className="mt-4 text-sm leading-7 text-slate-400">Academic pathway programmes and university preparation in the Netherlands.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FB8C66]">Contact</h4>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p>Johanna Westerdijkplein 75,<br />2521 EN The Hague</p>
                <p><a href="tel:+31703052786" className="hover:text-white">+31 703 052 786</a><span className="text-slate-500"> — General enquiries</span></p>
                <p><a href="tel:+31704457786" className="hover:text-white">+31 704 457 786</a><span className="text-slate-500"> — Current students</span></p>
                <p><a href="mailto:admissions@pathwaysacademy.nl" className="hover:text-white">admissions@pathwaysacademy.nl</a></p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FB8C66]">Quick Links</h4>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
                <button type="button" onClick={() => scrollToSection("about")} className="text-left hover:text-white">About Pathways Academy</button>
                <button type="button" onClick={() => scrollToSection("programmes")} className="text-left hover:text-white">Programmes</button>
                <button type="button" onClick={() => scrollToSection("fees")} className="text-left hover:text-white">Tuition Fees</button>
                <button type="button" onClick={() => scrollToSection("visa")} className="text-left hover:text-white">Visa Process</button>
                <button type="button" onClick={() => scrollToSection("admissions")} className="text-left hover:text-white">Admissions Process</button>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-500">© 2026 Pathways Academy. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
