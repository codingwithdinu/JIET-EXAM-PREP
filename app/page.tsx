"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  FileQuestion,
  FolderOpen,
  GraduationCap,
  Layers3,
  Search,
  Sparkles,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { getBranches, getSubjects, semesters } from "@/lib/data";

const semesterTones = [
  "tone-indigo",
  "tone-sky",
  "tone-violet",
  "tone-cyan",
  "tone-blue",
  "tone-purple",
];

export default function Home() {
  const [query, setQuery] = useState("");

  const allSubjects = useMemo(() => {
    const common = [1, 2].flatMap((n) =>
      getSubjects(n).map((subject) => ({
        subject,
        href: `/semester/${n}/${subject.slug}`,
        meta: `Semester ${n}`,
      }))
    );

    const branchSubjects = semesters.slice(2).flatMap((s) =>
      getBranches().flatMap((b) =>
        getSubjects(s.number, b.slug).map((subject) => ({
          subject,
          href: `/semester/${s.number}/branch/${b.slug}/${subject.slug}`,
          meta: `${s.title} · ${b.code}`,
        }))
      )
    );

    return [...common, ...branchSubjects];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allSubjects
      .filter(({ subject }) =>
        [subject.name, subject.code, subject.shortName].some((value) =>
          value.toLowerCase().includes(q)
        )
      )
      .slice(0, 7);
  }, [query, allSubjects]);

  const branchCount = getBranches().length;

  return (
    <main className="site-shell">
      <SiteHeader />

      <div className="hero-stage">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-grid" />

        <div className="hero-wrap">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              JIET academic resource library
              <Sparkles size={13} />
            </div>

            <h1>
              Study the syllabus.
              <br />
              <span>Not the clutter.</span>
            </h1>

            <p className="hero-lead">
              A structured home for JIET semester subjects, study notes,
              important questions and previous-year papers.
            </p>

            <div className="hero-search-wrap">
              <div className="hero-search">
                <Search size={20} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search a subject, code or topic..."
                  aria-label="Search subjects"
                />
                <kbd>⌘ K</kbd>
              </div>

              {query.trim() && (
                <div className="search-results">
                  {results.length ? (
                    results.map(({ subject, href, meta }) => (
                      <a
                        key={href}
                        href={
                          subject.driveUrl ||
                          `https://drive.google.com/drive/u/0/search?q=${encodeURIComponent(subject.name)}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setQuery("")}
                        className="search-result"
                      >
                        <span className="search-result-icon">
                          <BookOpen size={16} />
                        </span>
                        <span className="search-result-copy">
                          <strong>{subject.name}</strong>
                          <small>
                            {subject.code} · {meta}
                          </small>
                        </span>
                        <ChevronRight size={17} />
                      </a>
                    ))
                  ) : (
                    <div className="search-empty">
                      No matching subject found in the current library.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="hero-meta">
              <span><strong>{semesters.length}</strong> semesters</span>
              <i />
              <span><strong>{branchCount}</strong> branches</span>
              <i />
              <span><strong>{allSubjects.length}</strong> indexed subjects</span>
            </div>
          </div>

          <div className="student-preview">
            <div className="student-preview-head">
              <div>
                <span className="preview-kicker">JIET STUDY COMMUNITY</span>
                <h2>Study together. Grow together.</h2>
              </div>
              <span className="preview-badge">STUDENT LIFE</span>
            </div>

            <div className="student-photo-grid">
              <div className="student-photo student-photo-large">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=85"
                  alt="Students studying together"
                />
                <div className="student-photo-overlay">
                  <span>01</span>
                  <strong>Collaborative learning</strong>
                </div>
              </div>

              <div className="student-photo">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=85"
                  alt="College students studying"
                />
                <div className="student-photo-overlay compact">
                  <span>02</span>
                  <strong>Campus study</strong>
                </div>
              </div>

              <div className="student-photo">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=85"
                  alt="Student working on a laptop"
                />
                <div className="student-photo-overlay compact">
                  <span>03</span>
                  <strong>Focused preparation</strong>
                </div>
              </div>
            </div>

            <div className="student-preview-footer">
              <div>
                <span className="student-status-dot" />
                <strong>Made for everyday study</strong>
              </div>
              <span>Semester · Branch · Subject</span>
            </div>
          </div>
        </div>
      </div>

      <section className="section-block section-tight">
        <div className="section-heading">
          <div>
            <span className="section-label">01 / Browse</span>
            <h2>Start with your semester.</h2>
          </div>
          <p>
            One clear route from your semester to the exact subject resources
            you need.
          </p>
        </div>

        <div className="semester-grid">
          <Link href="/semester/1-2" className="semester-feature">
            <div className="feature-glow" />
            <div className="semester-number">01—02</div>
            <div className="semester-feature-content">
              <span>COMMON FOUNDATION</span>
              <h3>Semester 1 & 2</h3>
              <p>Start with the common foundation subjects.</p>
            </div>
            <div className="card-arrow"><ArrowUpRight size={18} /></div>
          </Link>

          {semesters.slice(2).map((semester, index) => (
            <Link
              href={`/semester/${semester.number}`}
              key={semester.number}
              className={`semester-card ${semesterTones[index]}`}
            >
              <div className="semester-card-top">
                <span>0{semester.number}</span>
                <ArrowUpRight size={17} />
              </div>
              <div>
                <small>SEMESTER</small>
                <h3>{semester.number}</h3>
              </div>
              <p>Browse branch-wise subjects</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="branches" className="section-block branch-section">
        <div className="section-heading">
          <div>
            <span className="section-label">02 / Branches</span>
            <h2>Choose a branch when you need it.</h2>
          </div>
          <p>
            Semester 3 onwards, the library opens into branch-specific subject
            collections.
          </p>
        </div>

        <div className="branch-grid">
          {getBranches().map((branch, index) => (
            <Link
              key={branch.slug}
              href={`/branch/${branch.slug}`}
              className="branch-card"
              aria-label={`Open all ${branch.name} subjects`}
            >
              <div className="branch-index">0{index + 1}</div>
              <div className="branch-monogram">{branch.code.split("-")[0]}</div>
              <div className="branch-copy">
                <span>{branch.code}</span>
                <h3>{branch.name}</h3>
              </div>
              <Layers3 size={17} className="branch-icon" />
            </Link>
          ))}
        </div>
      </section>

      <section id="resources" className="section-block resource-section">
        <div className="resource-intro">
          <span className="section-label">03 / Inside a subject</span>
          <h2>Everything important,<br /><span>right where you expect it.</span></h2>
          <p>
            No hunting through random folders. Every subject follows the same
            resource structure so you can build a familiar study flow.
          </p>
        </div>

        <div className="resource-stack">
          <div className="resource-card resource-notes">
            <div className="resource-card-number">01</div>
            <div className="resource-icon"><BookOpen size={21} /></div>
            <div>
              <small>LEARN</small>
              <h3>Notes</h3>
              <p>Class notes and study material, organized by subject.</p>
            </div>
            <ArrowUpRight size={18} />
          </div>

          <div className="resource-card resource-questions">
            <div className="resource-card-number">02</div>
            <div className="resource-icon"><FileQuestion size={21} /></div>
            <div>
              <small>PRACTICE</small>
              <h3>Important Questions</h3>
              <p>High-value questions to focus your revision.</p>
            </div>
            <ArrowUpRight size={18} />
          </div>

          <div className="resource-card resource-pyq">
            <div className="resource-card-number">03</div>
            <div className="resource-icon"><GraduationCap size={21} /></div>
            <div>
              <small>REVISE</small>
              <h3>Previous-Year Papers</h3>
              <p>Past papers to understand the exam pattern.</p>
            </div>
            <ArrowUpRight size={18} />
          </div>
        </div>
      </section>

      <section className="closing-cta">
        <div>
          <span className="section-label light">JIET EXAM PREP</span>
          <h2>Your next study session starts with one click.</h2>
          <p>Pick a semester and go straight to the material.</p>
        </div>
        <Link href="/#semesters" className="closing-button">
          Browse semesters <ArrowUpRight size={17} />
        </Link>
      </section>

      <footer className="site-footer">
        <div>
          <strong>JIET Exam Prep</strong>
          <span>Academic Resource Portal</span>
        </div>
        <p>Semester-wise · Branch-wise · Resource-first</p>
      </footer>
    </main>
  );
}
