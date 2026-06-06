import React from "react";
import { 
  Compass, 
  Target, 
  CheckSquare, 
  Volume2, 
  Link2, 
  Calendar, 
  TrendingUp, 
  FileText, 
  ShieldCheck, 
  Search, 
  ArrowRight
} from "lucide-react";

interface SEOStrategyPageProps {
  onBackToHub?: () => void;
}

export default function SEOStrategyPage({ onBackToHub }: SEOStrategyPageProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 animate-fade-in">
      
      {/* Editorial Navigation Breadcrumb */}
      {onBackToHub && (
        <div className="flex items-center gap-2 border-b border-[#3C3A36]/40 pb-4">
          <button 
            onClick={onBackToHub}
            className="font-mono text-[10px] tracking-wider text-[#B85C38] hover:text-white uppercase font-bold"
          >
            &larr; Back to Platform Hub
          </button>
          <span className="font-mono text-[10px] text-[#8C8678]">&bull;</span>
          <span className="font-mono text-[10px] text-[#8C8678] uppercase">Topical Authority &amp; SEO Playbook</span>
        </div>
      )}

      {/* Hero Display Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#B85C38]" />
          <span className="font-mono text-[9px] tracking-widest text-[#B85C38] uppercase font-bold">PrairieSignal Site Architecture</span>
        </div>
        <h2 className="font-serif italic text-4xl sm:text-6xl text-[#E8E1D2] font-light leading-tight">
          The 2026 Student AI SEO Playbook &amp; Strategy
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#8C8678] leading-relaxed max-w-3xl">
          Below is our complete, production-grade tactical framework for ranking high-volume clusters in 2026. This blueprint addresses modern user intent, voice search natural phonetics, structured entity relations, and multi-layered link acquisition.
        </p>
      </div>

      {/* 1. Executive Summary of Key Findings */}
      <div className="border border-[#B85C38]/40 bg-[#B85C38]/5 p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-[#E8E1D2]">
          <span className="w-1.5 h-1.5 bg-[#B85C38]" />
          <h3 className="font-serif text-xl sm:text-2xl font-light">Executive Summary of Key Findings</h3>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#8C8678] leading-relaxed">
          The AI writing tools for students industry is experiencing a transformation driven by recent Google algorithm updates that emphasize user intent matching and content quality. Key strategies in 2026 focus on producing high-quality, relevant content, optimizing for mobile and voice search, and leveraging AI-driven solutions to enhance user engagement. By utilizing a combination of conversational keywords, structured data, and diverse content formats, businesses can effectively increase visibility and achieve higher rankings in search results.
        </p>
      </div>

      {/* 2. Prioritized Keyword Targeting Strategy */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[#3C3A36]/60">
          <Target className="w-5 h-5 text-[#B85C38]" />
          <h3 className="font-serif text-2xl font-light text-[#E8E1D2]">Prioritized Keyword Targeting Strategy</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Primary Target Keywords */}
          <div className="border border-[#3C3A36] p-5 space-y-3 bg-[#1a1816]/30">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#B85C38] font-bold">1. Primary Target Keywords</h4>
            <ul className="space-y-2 font-sans text-xs text-[#8C8678]">
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>AI writing tools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>AI writing software for students</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>Best AI writing tools 2026</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>AI tools for student writing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>AI essay writing tools</span>
              </li>
            </ul>
          </div>

          {/* Long-Tail Opportunities */}
          <div className="border border-[#3C3A36] p-5 space-y-3 bg-[#1a1816]/30">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#B85C38] font-bold">2. Long-Tail Opportunities</h4>
            <ul className="space-y-2 font-sans text-xs text-[#8C8678]">
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>How AI writing tools can help students improve their writing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>Best AI writing tools for college students in 2026</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>Affordable AI writing software for high school students</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>AI writing assistance for academic success</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>Top AI solutions for student essay writing</span>
              </li>
            </ul>
          </div>

          {/* Voice Search Phrases */}
          <div className="border border-[#3C3A36] p-5 space-y-3 bg-[#1a1816]/30">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#B85C38] font-bold">3. Voice Search Phrases</h4>
            <ul className="space-y-2 font-sans text-xs text-[#8C8678]">
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>What are the best AI writing tools for students?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>How can AI help me with my essays?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>Are AI writing tools effective for student learning?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>Which AI writing software is best for high school?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>How do I choose an AI writing tool for my studies?</span>
              </li>
            </ul>
          </div>

          {/* Semantic Keywords */}
          <div className="border border-[#3C3A36] p-5 space-y-3 bg-[#1a1816]/30">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#B85C38] font-bold">4. Semantic Keywords</h4>
            <ul className="space-y-2 font-sans text-xs text-[#8C8678]">
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>AI-powered writing assistance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>Intelligent writing software for students</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>Educational writing tools using AI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>Technology for student writing support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>AI-driven writing solutions</span>
              </li>
            </ul>
          </div>

          {/* Trending Terms */}
          <div className="border border-[#3C3A36] p-5 space-y-3 bg-[#1a1816]/30">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#B85C38] font-bold">5. Trending Terms</h4>
            <ul className="space-y-2 font-sans text-xs text-[#8C8678]">
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>AI writing tools for academic success</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>Advances in AI writing technology for students</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>Impact of AI on student writing skills</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>Educational innovations in AI writing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B85C38]">&bull;</span>
                <span>Future of AI-assisted writing in education</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 3. 2026 Technical SEO Checklist & Content Pattern */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#3C3A36]/65">
        
        {/* Technical List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#E8E1D2]">
            <CheckSquare className="w-5 h-5 text-[#B85C38]" />
            <h4 className="font-serif text-xl font-light">2026 Technical SEO Checklist</h4>
          </div>
          <div className="space-y-3 font-sans text-xs text-[#8C8678]">
            <div className="border-l border-[#B85C38] pl-3 py-1">
              <strong className="text-[#ECE9E2] block font-medium">Mobile-Responsiveness</strong>
              <span>Ensure the website is responsive and optimized for mobile-first indexing.</span>
            </div>
            <div className="border-l border-[#B85C38] pl-3 py-1">
              <strong className="text-[#ECE9E2] block font-medium">Site Speed</strong>
              <span>Optimize loading time and Core Web Vitals (LCP, FID, CLS).</span>
            </div>
            <div className="border-l border-[#B85C38] pl-3 py-1">
              <strong className="text-[#ECE9E2] block font-medium">HTTPS Protocol</strong>
              <span>Ensure all pages are secured with HTTPS.</span>
            </div>
            <div className="border-l border-[#B85C38] pl-3 py-1">
              <strong className="text-[#ECE9E2] block font-medium">Structured Data</strong>
              <span>Implement schema markup for articles, FAQs, and products to enhance search visibility.</span>
            </div>
            <div className="border-l border-[#B85C38] pl-3 py-1">
              <strong className="text-[#ECE9E2] block font-medium">XML Sitemap</strong>
              <span>Maintain an updated XML sitemap to help search engines crawl the site efficiently.</span>
            </div>
            <div className="border-l border-[#B85C38] pl-3 py-1">
              <strong className="text-[#ECE9E2] block font-medium">Fix Broken Links</strong>
              <span>Regularly check for and fix any broken links on the website.</span>
            </div>
            <div className="border-l border-[#B85C38] pl-3 py-1">
              <strong className="text-[#ECE9E2] block font-medium">Meta Tags</strong>
              <span>Review and optimize title tags and meta descriptions for all pages.</span>
            </div>
          </div>
        </div>

        {/* Content Plan */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#E8E1D2]">
            <Volume2 className="w-5 h-5 text-[#B85C38]" />
            <h4 className="font-serif text-xl font-light">AI and Voice Search Content Plan</h4>
          </div>
          <div className="space-y-4 text-xs font-sans text-[#8C8678]">
            <p className="leading-relaxed">
              Our content architecture is tuned specifically to parse natural phonetics, question syntax, and structured informational headings.
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-[#1a1816]/40 p-3.5 border border-[#3C3A36]">
                <strong className="text-[#ECE9E2] block mb-1">1. Quality Content Creation</strong>
                <span>Focus on producing in-depth articles that address specific student user queries logically and in complete detail.</span>
              </div>
              <div className="bg-[#1a1816]/40 p-3.5 border border-[#3C3A36]">
                <strong className="text-[#ECE9E2] block mb-1">2. Conversational Language</strong>
                <span>Adopt a natural, conversational tone in writing to align with direct vocalized inquiries.</span>
              </div>
              <div className="bg-[#1a1816]/40 p-3.5 border border-[#3C3A36]">
                <strong className="text-[#ECE9E2] block mb-1">3. Content Formats</strong>
                <span>Diversify content types (structured listicle guides, step guides, and comparison tables) to satisfy searchers.</span>
              </div>
              <div className="bg-[#1a1816]/40 p-3.5 border border-[#3C3A36]">
                <strong className="text-[#ECE9E2] block mb-1">4. FAQ Sections</strong>
                <span>Develop comprehensive, question-headed target units to feed snippet engines and voice answers.</span>
              </div>
              <div className="bg-[#1a1816]/40 p-3.5 border border-[#3C3A36]">
                <strong className="text-[#ECE9E2] block mb-1">5. Regular Content Updates</strong>
                <span>Continuously refresh rating matrices, pricing changes, and feature additions based on student tests.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Link Building Plan */}
      <div className="space-y-4 border-t border-[#3C3A36]/65 pt-6">
        <div className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-[#B85C38]" />
          <h3 className="font-serif text-2xl font-light text-[#E8E1D2]">Modern Link Building Plan</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          <div className="border border-[#3C3A36] p-4 bg-[#1a1816]/35 space-y-1">
            <span className="font-mono text-[10px] text-[#B85C38] font-bold uppercase block">Pillar 01</span>
            <strong className="text-[#ECE9E2] block font-serif text-sm font-light">Content Collaboration</strong>
            <p className="font-sans text-[#8C8678] text-[11px] leading-relaxed">Partner with educational institutions or influencers in student circles to craft co-branded study content.</p>
          </div>
          <div className="border border-[#3C3A36] p-4 bg-[#1a1816]/35 space-y-1">
            <span className="font-mono text-[10px] text-[#B85C38] font-bold uppercase block">Pillar 02</span>
            <strong className="text-[#ECE9E2] block font-serif text-sm font-light">Guest Blogging</strong>
            <p className="font-sans text-[#8C8678] text-[11px] leading-relaxed">Contribute high-quality educational columns on highly reputable university platforms and EdTech blogs.</p>
          </div>
          <div className="border border-[#3C3A36] p-4 bg-[#1a1816]/35 space-y-1">
            <span className="font-mono text-[10px] text-[#B85C38] font-bold uppercase block">Pillar 03</span>
            <strong className="text-[#ECE9E2] block font-serif text-sm font-light">Resource Pages</strong>
            <p className="font-sans text-[#8C8678] text-[11px] leading-relaxed">Get our reviews indexed on official high-authority reference pages and digital tools indexes of schools.</p>
          </div>
          <div className="border border-[#3C3A36] p-4 bg-[#1a1816]/35 space-y-1">
            <span className="font-mono text-[10px] text-[#B85C38] font-bold uppercase block">Pillar 04</span>
            <strong className="text-[#ECE9E2] block font-serif text-sm font-light">Case Studies</strong>
            <p className="font-sans text-[#8C8678] text-[11px] leading-relaxed">Publish and spread numeric case studies proving classroom performance gains using AI writing assistants.</p>
          </div>
          <div className="border border-[#3C3A36] p-4 bg-[#1a1816]/35 space-y-1">
            <span className="font-mono text-[10px] text-[#B85C38] font-bold uppercase block">Pillar 05</span>
            <strong className="text-[#ECE9E2] block font-serif text-sm font-light">Social Credibility</strong>
            <p className="font-sans text-[#8C8678] text-[11px] leading-relaxed">Use validated community feedback and study group recommendations to seed viral links across student spaces.</p>
          </div>
        </div>
      </div>

      {/* 5. Implementation Timeline */}
      <div className="space-y-4 border-t border-[#3C3A36]/65 pt-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#B85C38]" />
          <h3 className="font-serif text-2xl font-light text-[#E8E1D2]">Implementation Timeline</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          
          <div className="p-5 border border-[#B85C38]/40 bg-[#B85C38]/5 space-y-3">
            <div className="flex justify-between items-center border-b border-[#B85C38]/30 pb-2">
              <span className="font-mono text-[10px] text-[#B85C38] uppercase font-bold">Quick Wins</span>
              <span className="font-mono text-[9px] bg-[#B85C38] text-white px-1.5 py-0.5 font-bold uppercase">0-3 Months</span>
            </div>
            <ul className="space-y-2 text-xs text-[#8C8678] list-disc list-inside">
              <li>Optimize website for mobile-friendliness.</li>
              <li>Implement basic technical SEO checklist items (HTTPS, sitemap, speed optimization).</li>
              <li>Publish at least one high-quality blog post targeting long-tail keywords monthly.</li>
              <li>Set up social media campaigns to engage with students.</li>
            </ul>
          </div>

          <div className="p-5 border border-[#3C3A36] bg-[#1a1816]/20 space-y-3">
            <div className="flex justify-between items-center border-b border-[#3C3A36] pb-2">
              <span className="font-mono text-[10px] text-[#E8E1D2] uppercase font-bold">Mid-Range Goals</span>
              <span className="font-mono text-[9px] bg-[#3C3A36] text-[#8C8678] px-1.5 py-0.5 uppercase">4-6 Months</span>
            </div>
            <ul className="space-y-2 text-xs text-[#8C8678] list-disc list-inside">
              <li>Launch a series of videos explaining the advantages of AI writing tools.</li>
              <li>Create and optimize FAQ sections to enhance voice search readiness.</li>
              <li>Secure at least 5 guest posts on reputable educational blogs.</li>
              <li>Begin regular social proof campaigns to showcase user testimonials.</li>
            </ul>
          </div>

          <div className="p-5 border border-[#3C3A36] bg-[#1a1816]/20 space-y-3">
            <div className="flex justify-between items-center border-b border-[#3C3A36] pb-2">
              <span className="font-mono text-[10px] text-[#E8E1D2] uppercase font-bold">Long-Term Goals</span>
              <span className="font-mono text-[9px] bg-[#3C3A36] text-[#8C8678] px-1.5 py-0.5 uppercase">7-12 Months</span>
            </div>
            <ul className="space-y-2 text-xs text-[#8C8678] list-disc list-inside">
              <li>Establish partnerships for content collaborations and webinars.</li>
              <li>Assess and update all existing content for quality, relevance, and engagement.</li>
              <li>Expand link-building efforts, targeting high DA sites for outreach.</li>
              <li>Develop seasonal content strategies aligned with academic calendars and events.</li>
            </ul>
          </div>

        </div>
      </div>

      {/* 6. Success Metrics and Tracking Recommendations */}
      <div className="bg-[#1a1816]/70 border border-[#3C3A36] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#B85C38]" />
          <h4 className="font-serif text-lg text-[#E8E1D2] font-light">Success Metrics and Tracking Recommendations</h4>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs font-sans text-[#8C8678]">
          <div className="space-y-1">
            <strong className="text-[#ECE9E2] font-medium block">Organic Traffic &amp; Users</strong>
            <p className="leading-relaxed text-[11px]">Monitor web traffic analytics regularly to quantify unique entry growth patterns, specifically inside target category silos.</p>
          </div>
          <div className="space-y-1">
            <strong className="text-[#ECE9E2] font-medium block">Keyword Authority Rankings</strong>
            <p className="leading-relaxed text-[11px]">Continuous tracking of target keyword positions and search engine snippet share using industry suites like SEMrush/Ahrefs.</p>
          </div>
          <div className="space-y-1">
            <strong className="text-[#ECE9E2] font-medium block">User Core Engagement</strong>
            <p className="leading-relaxed text-[11px]">Assess user session metrics, specifically scroll depth, click metrics, bounce percentage, and student tool affiliate exit conversions.</p>
          </div>
          <div className="space-y-1">
            <strong className="text-[#ECE9E2] font-medium block">Acquired Backlink Density</strong>
            <p className="leading-relaxed text-[11px]">Log domain referrals, editorial mentions, and check referring domain authority over a weekly rhythm.</p>
          </div>
          <div className="space-y-1">
            <strong className="text-[#ECE9E2] font-medium block">Search Console Health Checks</strong>
            <p className="leading-relaxed text-[11px]">Maintain healthy page crawls, detect indexing warnings, and check mobile usability scores within Google Search Console.</p>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      {onBackToHub && (
        <div className="pt-4 flex justify-between items-center text-xs border-t border-[#3C3A36]/40">
          <span className="font-mono text-[#8C8678]">PrairieSignal Structured SEO Portal</span>
          <button
            onClick={onBackToHub}
            className="px-5 py-2 hover:bg-[#B85C38] bg-transparent text-[#B85C38] hover:text-white font-mono text-[10px] tracking-wider uppercase border border-[#B85C38] rounded-none transition-all duration-150 font-bold"
          >
            Return to Platform Home
          </button>
        </div>
      )}

    </div>
  );
}
