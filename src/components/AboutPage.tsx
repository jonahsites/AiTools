import React from "react";
import { Award, CheckCircle, ShieldAlert, BookOpen, Clock } from "lucide-react";

interface AboutPageProps {
  onBackToHub: () => void;
}

export default function AboutPage({ onBackToHub }: AboutPageProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6 animate-fade-in">
      
      {/* Editorial Navigation Breadcrumb */}
      <div className="flex items-center gap-2 border-b border-[#3C3A36]/40 pb-4">
        <button 
          onClick={onBackToHub}
          className="font-mono text-[10px] tracking-wider text-[#B85C38] hover:text-white uppercase font-bold"
        >
          &larr; Back to Platform Hub
        </button>
        <span className="font-mono text-[10px] text-[#8C8678]">&bull;</span>
        <span className="font-mono text-[10px] text-[#8C8678] uppercase">About Our Authority Portal</span>
      </div>

      {/* Hero Display Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#B85C38]" />
          <span className="font-mono text-[9px] tracking-widest text-[#B85C38] uppercase font-bold">PrairieSignal Field Report</span>
        </div>
        <h2 className="font-serif italic text-4xl sm:text-6xl text-[#E8E1D2] font-light leading-tight">
          Rigorous guides for students, built to simplify academic workloads.
        </h2>
        <p className="font-sans text-[#8C8678] text-base leading-relaxed max-w-2xl">
          At AI Tools for Students, we cut through the commercial marketing noise to deliver honest, hands-on reviews of educational software. We don't rate tools based on backroom cash payouts — we rate them based on classroom utility.
        </p>
      </div>

      {/* Grid: Pillars of our Evaluation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-b border-[#3C3A36]/40 py-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#E8E1D2]">
            <Award className="w-5 h-5 text-[#B85C38]" />
            <h4 className="font-serif text-lg font-light">Student-Centered Testing</h4>
          </div>
          <p className="font-sans text-xs text-[#8C8678] leading-relaxed">
            Every product review on this site undergoes a multi-day testing cycle. We simulate real student workflows like writing late-night essays, summarizing two-hour lecture audios, organizing fragmented review notes, and solving advanced STEM assignments under tight deadlines.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#E8E1D2]">
            <CheckCircle className="w-5 h-5 text-[#B85C38]" />
            <h4 className="font-serif text-lg font-light">Unbiased Rating Rubrics</h4>
          </div>
          <p className="font-sans text-xs text-[#8C8678] leading-relaxed">
            Our score totals are computed mathematically across five equal weight pillars: Accuracy, Writing Quality, Pricing plans, Offline durability, and Ease of Use. If a tool is overpriced or prone to extreme hallucinations, we say so directly. See our reviews of ChatGPT, Claude, Notion, and Otter.
          </p>
        </div>
      </div>

      {/* Team Profile Block */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl font-light text-[#E8E1D2]">The Editorial Team</h3>
        <div className="border border-[#3C3A36] p-6 bg-[#1a1816]/50 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-[#1F1D1A] overflow-hidden shrink-0 border border-[#B85C38]/50">
            <img 
              src="https://api.dicebear.com/7.x/notionists/svg?seed=best-ai-note-taking-tools-for-students&backgroundColor=1F1D1A" 
              alt="Sarah Jenkins portrait" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <div className="space-y-0.5">
              <h4 className="font-serif text-xl text-[#E8E1D2]">Sarah Jenkins</h4>
              <span className="font-mono text-[9px] text-[#B85C38] uppercase tracking-widest block">Chief Editor & Lead Analyst</span>
            </div>
            <p className="font-sans text-xs text-[#8C8678] leading-relaxed">
              Sarah completed her M.Ed. in Educational Technology from Stanford in 2021. For the last five years, she has explored how software and artificial intelligence can optimize learning outcomes. She has tested over 100 student productivity tools and believes that a structured digital environment is the best shield against university anxiety.
            </p>
          </div>
        </div>
      </div>

      {/* Integrity Pledge */}
      <div className="bg-[#B85C38]/5 border border-[#B85C38]/40 p-6 space-y-3">
        <div className="flex items-center gap-2 text-[#E8E1D2]">
          <ShieldAlert className="w-5 h-5 text-[#B85C38]" />
          <h4 className="font-mono text-xs tracking-wider uppercase font-bold text-[#E8E1D2]">Our Affiliate Funding Pledge</h4>
        </div>
        <p className="font-sans text-xs text-[#8C8678] leading-relaxed">
          Like many reviewers, we earn affiliate commissions when you purchase or register for services through some of our structured redirect links. However, this is funded entirely by the vendors at zero extra cost to you. Under no circumstances do we change our review outcomes or cover up glaring product issues in exchange for sponsorships. We value your grade, your trust, and academic integrity above all else.
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 flex justify-between items-center text-xs border-t border-[#3C3A36]/40">
        <span className="font-mono text-[#8C8678]">PrairieSignal Authority Platform</span>
        <button
          onClick={onBackToHub}
          className="px-5 py-2 hover:bg-[#B85C38] bg-transparent text-[#B85C38] hover:text-white font-mono text-[10px] tracking-wider uppercase border border-[#B85C38] rounded-none transition-all duration-150 font-bold"
        >
          Return to Platform Home
        </button>
      </div>

    </div>
  );
}
