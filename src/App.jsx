import React from "react";
import { motion } from "framer-motion";
import { Routes, Route, Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-bold text-white">
            Pathways Academy
          </Link>

          <nav className="hidden items-center gap-6 text-sm lg:flex">
            <Link to="/" className="hover:text-[#FB8C66]">Home</Link>
            <Link to="/visa-residence-permit" className="hover:text-[#FB8C66]">
              Visa Guide
            </Link>
            <Link to="/student-finance" className="hover:text-[#FB8C66]">
              Student Finance
            </Link>
            <Link to="/living-in-netherlands" className="hover:text-[#FB8C66]">
              Living in NL
            </Link>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto max-w-7xl text-sm text-slate-400">
          © 2026 Pathways Academy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F97343]/20 via-slate-950 to-slate-950" />

        <div className="relative mx-auto max-w-7xl px-6 py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Prepare for university success in the Netherlands.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
              Pathways Academy supports international students with academic
              preparation, admissions guidance, visa readiness, and student
              support for studying in the Netherlands.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/visa-residence-permit"
                className="rounded-full bg-[#F97343] px-6 py-3 font-semibold text-slate-950 hover:bg-[#FB8C66]"
              >
                Visa Information
              </Link>

              <Link
                to="/student-finance"
                className="rounded-full border border-white/20 px-6 py-3 hover:bg-white/10"
              >
                Student Finance
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-100 p-8">
              <h3 className="text-2xl font-semibold">
                Visa & Residence Permit
              </h3>

              <p className="mt-4 leading-7 text-slate-700">
                Learn about Dutch student visa requirements, residence permits,
                financial proof, and arrival preparation.
              </p>

              <Link
                to="/visa-residence-permit"
                className="mt-6 inline-block font-semibold text-[#E86233]"
              >
                Read More →
              </Link>
            </div>

            <div className="rounded-3xl bg-slate-100 p-8">
              <h3 className="text-2xl font-semibold">
                Student Finance
              </h3>

              <p className="mt-4 leading-7 text-slate-700">
                Understand tuition fees, living costs, scholarships, budgeting,
                and financial planning in the Netherlands.
              </p>

              <Link
                to="/student-finance"
                className="mt-6 inline-block font-semibold text-[#E86233]"
              >
                Read More →
              </Link>
            </div>

            <div className="rounded-3xl bg-slate-100 p-8">
              <h3 className="text-2xl font-semibold">
                Living in the Netherlands
              </h3>

              <p className="mt-4 leading-7 text-slate-700">
                Explore accommodation, insurance, transport, BSN registration,
                and international student life.
              </p>

              <Link
                to="/living-in-netherlands"
                className="mt-6 inline-block font-semibold text-[#E86233]"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function VisaPage() {
  return (
    <main className="bg-white px-6 py-24 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-semibold">
          Netherlands Student Visa & Residence Permit
        </h1>

        <p className="mt-8 text-lg leading-8 text-slate-700">
          International students planning to study in the Netherlands may need
          a student visa (MVV) and residence permit. Requirements depend on
          nationality and study duration.
        </p>

        <div className="mt-12 space-y-8">
          <div className="rounded-3xl bg-slate-100 p-8">
            <h2 className="text-2xl font-semibold">
              Required Documents
            </h2>

            <ul className="mt-6 space-y-3 text-slate-700">
              <li>✓ Valid passport</li>
              <li>✓ Admission letter</li>
              <li>✓ Financial proof</li>
              <li>✓ Health insurance</li>
              <li>✓ Academic documents</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-slate-100 p-8">
            <h2 className="text-2xl font-semibold">
              Visa Process
            </h2>

            <ol className="mt-6 space-y-3 text-slate-700">
              <li>1. Apply to university</li>
              <li>2. Receive admission offer</li>
              <li>3. Submit visa documents</li>
              <li>4. Embassy appointment</li>
              <li>5. Travel to the Netherlands</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}

function FinancePage() {
  return (
    <main className="bg-white px-6 py-24 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-semibold">
          Student Finance in the Netherlands
        </h1>

        <p className="mt-8 text-lg leading-8 text-slate-700">
          Students should carefully prepare for tuition fees, accommodation,
          insurance, transport, and monthly living expenses before arrival.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-100 p-8">
            <h2 className="text-2xl font-semibold">
              Estimated Monthly Costs
            </h2>

            <ul className="mt-6 space-y-3 text-slate-700">
              <li>Accommodation: €500–€1200</li>
              <li>Food: €200–€350</li>
              <li>Insurance: €100–€150</li>
              <li>Transport: €50–€100</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-slate-100 p-8">
            <h2 className="text-2xl font-semibold">
              Financial Planning
            </h2>

            <ul className="mt-6 space-y-3 text-slate-700">
              <li>✓ Tuition planning</li>
              <li>✓ Scholarship guidance</li>
              <li>✓ Student budgeting</li>
              <li>✓ Health insurance advice</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

function LivingPage() {
  return (
    <main className="bg-white px-6 py-24 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-semibold">
          Living in the Netherlands
        </h1>

        <p className="mt-8 text-lg leading-8 text-slate-700">
          International students should prepare for accommodation, insurance,
          municipality registration, transportation, and student life.
        </p>

        <div className="mt-12 space-y-6">
          <div className="rounded-3xl bg-slate-100 p-8">
            <h2 className="text-2xl font-semibold">
              Accommodation
            </h2>

            <p className="mt-4 leading-7 text-slate-700">
              Students can choose university housing, shared apartments,
              student residences, or private rentals.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-100 p-8">
            <h2 className="text-2xl font-semibold">
              BSN & Registration
            </h2>

            <p className="mt-4 leading-7 text-slate-700">
              After arrival, students usually register with the municipality
              and receive a BSN number for official services.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PathwaysAcademyWebsite() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/visa-residence-permit"
          element={<VisaPage />}
        />
        <Route
          path="/student-finance"
          element={<FinancePage />}
        />
        <Route
          path="/living-in-netherlands"
          element={<LivingPage />}
        />
      </Routes>
    </Layout>
  );
}
