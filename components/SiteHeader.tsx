import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="JIET Exam Prep home">
          <span className="brand-mark">
            <GraduationCap size={21} strokeWidth={2.5} />
          </span>
          <span>
            <strong>JIET Exam Prep</strong>
            <small>Academic Resource Portal</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/#semesters">Semesters</Link>
          <Link href="/#branches">Branches</Link>
          <Link href="/#resources">Resources</Link>
        </nav>

        <Link href="/#semesters" className="header-cta">
          Browse library <ArrowRight size={15} />
        </Link>
      </div>
    </header>
  );
}
