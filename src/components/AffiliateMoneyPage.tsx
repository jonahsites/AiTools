import React, { useState } from "react";
import { 
  ArrowLeft, 
  ExternalLink, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Check, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  MousePointerClick 
} from "lucide-react";
import { MoneyPage, AffiliateProduct, CategoryHub } from "../types";

interface AffiliateMoneyPageProps {
  page: MoneyPage;
  products: AffiliateProduct[];
  category: CategoryHub | undefined;
  onBackToHub: () => void;
  onNavigateToCategory?: (slug: string) => void;
  onNavigateToPage?: (slug: string) => void;
  allPages?: MoneyPage[];
}

export default function AffiliateMoneyPage({
  page,
  products,
  category,
  onBackToHub,
  onNavigateToCategory,
  onNavigateToPage,
  allPages = [],
}: AffiliateMoneyPageProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [referralAlert, setReferralAlert] = useState<string | null>(null);

  // Filter products featured on this page
  const reviewedProducts = products.filter(p => page.productReviewIds.includes(p.id));
  const featuredProduct = products.find(p => p.id === page.featuredProductId) || products[0];
  const bestFreeProduct = products.find(p => p.id === page.bestFreeProductId);

  const peerPages = allPages.filter(p => p.parentCategorySlug === page.parentCategorySlug && p.slug !== page.slug);

  const handleCtaClick = (productName: string, targetUrl: string) => {
    // Elegant toast trigger to simulate outbound referral link tracking!
    setReferralAlert(productName);
    setTimeout(() => setReferralAlert(null), 3000);
    
    // Open in new window safely
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  // Turn markdown links into beautiful local router links or styled outbound anchors
  const renderRichText = (text: string) => {
    if (!text) return null;
    
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      const linkText = match[1];
      const linkUrl = match[2];
      
      if (linkUrl.startsWith("/")) {
        const cleanSlug = linkUrl.substring(1);
        const isCategory = cleanSlug === "ai-writing-tools" || cleanSlug === "ai-study-homework" || cleanSlug === "ai-note-taking" || cleanSlug === "ai-productivity-tools";
        
        parts.push(
          <button
            key={`link-${match.index}`}
            onClick={(e) => {
              e.preventDefault();
              if (isCategory) {
                onNavigateToCategory?.(cleanSlug);
              } else {
                onNavigateToPage?.(cleanSlug);
              }
            }}
            className="text-[#B85C38] hover:underline font-bold cursor-pointer inline-block mx-1"
          >
            {linkText}
          </button>
        );
      } else {
        parts.push(
          <a
            key={`link-${match.index}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#B85C38] hover:underline font-bold inline-flex items-center gap-0.5"
          >
            {linkText}
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
      }
      
      lastIndex = linkRegex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? <>{parts}</> : text;
  };

  return (
    <div className="space-y-8 bg-[#1F1D1A] text-[#ECE9E2]">
      
      {/* Referral Link outbound tracking HUD */}
      {referralAlert && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#B85C38] text-[#1F1D1A] shadow-xl border border-[#ECE9E2] max-w-sm transition-all duration-300">
          <div className="flex items-start gap-2.5">
            <MousePointerClick className="w-5 h-5 shrink-0 mt-0.5 animate-bounce" />
            <div className="text-xs font-sans">
              <strong className="font-mono uppercase tracking-wider block text-[10px] text-[#1F1D1A]">Outbound Affiliate Referral Routing</strong>
              Redirecting via tracking path for <span className="font-bold underline">{referralAlert}</span>... Special student discount parameters loaded.
            </div>
          </div>
        </div>
      )}

      {/* Navigation Breadcrumbs */}
      <div className="flex items-center justify-between border-b border-[#3C3A36] pb-4">
        <button
          onClick={onBackToHub}
          className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#8C8678] hover:text-[#B85C38] transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#B85C38]" />
          Back to Directory
        </button>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] text-[#8C8678]">
          <span>PORTAL</span>
          <span>&rarr;</span>
          <span className="uppercase">{category ? category.title : "SEO CATEGORY"}</span>
          <span>&rarr;</span>
          <span className="text-[#B85C38] uppercase truncate max-w-[120px]">{page.slug}</span>
        </div>
      </div>

      {/* Hero display block */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="font-mono text-[10px] tracking-widest text-[#B85C38] uppercase block">
            Target Focus Keyword: "{page.targetKeyword}"
          </span>
          <h1 className="font-display italic text-4xl sm:text-6xl lg:text-7xl font-light text-[#E8E1D2] leading-tight tracking-tight">
            {page.title}
          </h1>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#8C8678]">
          <span>PUBLISHED: <strong className="text-[#ECE9E2]">{page.creationDate}</strong></span>
          <span>&bull;</span>
          <span>VERIFIED BY ACADEMIC COMPLIANCE TEAM</span>
          <span>&bull;</span>
          <span className="text-[#B85C38]">{page.views.toLocaleString()} MONITORED READERS</span>
        </div>

        {/* Introduction section */}
        <p className="font-sans text-[#E8E1D2]/80 text-base leading-relaxed max-w-4xl border-l border-[#B85C38] pl-4 italic">
          {renderRichText(page.introduction)}
        </p>
      </div>

      {/* Dynamic Comparison Matrix (High intent search widget) */}
      {page.comparisonTable && page.comparisonTable.length > 0 && (
        <div className="border border-[#3C3A36] p-4 bg-[#1F1D1A]/50">
          <span className="block mb-2 font-mono text-[9px] text-[#B85C38] tracking-widest uppercase">Student Quick-Comparison Matrix</span>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#3C3A36] text-[#8C8678] font-mono text-[10px] tracking-wider uppercase">
                  <th className="py-2">Tool Solution</th>
                  <th>Student Score</th>
                  <th>Accredited Level</th>
                  <th>Cost Plan</th>
                  <th>Optimized For</th>
                  <th className="text-right">Action Routing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3C3A36]/40">
                {page.comparisonTable.map((row, idx) => {
                  const matchedProd = products.find(p => p.name.toLowerCase().includes(row.productName.toLowerCase()) || row.productName.toLowerCase().includes(p.brand.toLowerCase()));
                  const targetUrl = matchedProd ? matchedProd.affiliateUrl : "#";
                  return (
                    <tr key={idx} className="hover:bg-[#ECE9E2]/5 transition-all">
                      <td className="py-2.5 font-medium text-[#ECE9E2]">{row.productName}</td>
                      <td className="font-mono text-[#B85C38] font-bold">{row.rating}</td>
                      <td className="text-[#8C8678]">{row.accuracy}</td>
                      <td className="font-mono font-light">{row.pricing}</td>
                      <td className="italic text-[#8C8678]">{row.bestFor}</td>
                      <td className="text-right">
                        <button
                          onClick={() => handleCtaClick(row.productName, targetUrl)}
                          className="font-mono text-[80%] uppercase tracking-wider text-[#B85C38] font-bold hover:underline py-1 px-1.5 cursor-pointer"
                        >
                          Check Discount
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* "RECOMMENDED STUDENT SELECTIONS" high-conversion affiliate panels */}
      <div className="space-y-4">
        <h3 className="font-mono text-[10px] tracking-widest text-[#B85C38] uppercase">
          Recommended Student Selections
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: Best Overall Pick */}
          {featuredProduct && (
            <div className="border border-[#B85C38] bg-[#ECE9E2] p-5 text-[#1F1D1A] flex flex-col justify-between space-y-4 relative">
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#B85C38] uppercase font-bold block">
                      BEST OVERALL PICK
                    </span>
                    <h4 className="font-serif text-2xl font-light text-[#1F1D1A]">
                      {featuredProduct.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 bg-[#B85C38] text-[#ECE9E2] px-2 py-0.5 font-mono text-[9px] uppercase font-semibold">
                    <Star className="w-3 h-3 fill-[#ECE9E2]" />
                    {featuredProduct.rating} / 5.0
                  </div>
                </div>

                <p className="font-sans text-xs text-[#6E695E] leading-relaxed line-clamp-3">
                  {featuredProduct.description}
                </p>

                <div className="space-y-1">
                  <span className="font-mono text-[8px] text-[#B85C38] tracking-widest uppercase block font-bold">Top Advantage:</span>
                  <p className="font-sans text-[11px] text-[#6E695E] leading-snug">
                    {featuredProduct.keyFeatures[0]}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <div className="font-mono text-[10px] text-[#6E695E] mb-2">
                  <span className="text-[#8C8678]">PRICING STRUCTURE:</span> <strong className="text-[#1F1D1A]">{featuredProduct.pricePlan}</strong>
                </div>
                <button
                  onClick={() => handleCtaClick(featuredProduct.name, featuredProduct.affiliateUrl)}
                  className="w-full py-2.5 bg-[#1F1D1A] hover:bg-[#B85C38] text-[#ECE9E2] font-mono text-[9px] tracking-widest uppercase cursor-pointer border-0 rounded-none transition-all duration-150 font-bold"
                >
                  Verify Student Discount &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Card 2: Best Free Option */}
          {bestFreeProduct ? (
            <div className="border border-[#3C3A36] bg-[#1a1816]/75 p-5 text-[#ECE9E2] flex flex-col justify-between space-y-4 relative">
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#B85C38] uppercase font-bold block">
                      BEST FREE OPTION
                    </span>
                    <h4 className="font-serif text-2xl font-light text-[#E8E1D2]">
                      {bestFreeProduct.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 bg-[#3C3A36] text-[#8C8678] px-2 py-0.5 font-mono text-[9px] uppercase font-semibold">
                    <Star className="w-3 h-3 fill-[#8C8678]" />
                    {bestFreeProduct.rating} / 5.0
                  </div>
                </div>

                <p className="font-sans text-xs text-[#8C8678] leading-relaxed line-clamp-3">
                  {bestFreeProduct.description}
                </p>

                <div className="space-y-1">
                  <span className="font-mono text-[8px] text-[#B85C38] tracking-widest uppercase block font-bold">Free Privilege:</span>
                  <p className="font-sans text-[11px] text-[#8C8678] leading-snug">
                    {bestFreeProduct.keyFeatures[0]}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <div className="font-mono text-[10px] text-[#8C8678] mb-2">
                  <span className="text-[#3C3A36]">COST TYPE:</span> <strong className="text-[#E8E1D2] font-bold">{bestFreeProduct.pricePlan}</strong>
                </div>
                <button
                  onClick={() => handleCtaClick(bestFreeProduct.name, bestFreeProduct.affiliateUrl)}
                  className="w-full py-2.5 bg-[#B85C38] hover:bg-[#ECE9E2] hover:text-[#1F1D1A] text-[#1F1D1A] font-mono text-[9px] tracking-widest uppercase cursor-pointer border-0 rounded-none transition-all duration-150 font-bold"
                >
                  Access Free Version &rarr;
                </button>
              </div>
            </div>
          ) : (
            // Fallback second panel in case there is no custom free product mapped
            <div className="border border-[#3C3A36] bg-[#1a1816]/30 p-5 text-[#8C8678] flex flex-col justify-center items-center text-center space-y-2">
              <span className="font-mono text-[8px] tracking-widest uppercase block text-[#B85C38]">Budget Strategy</span>
              <h4 className="font-serif text-lg italic font-light text-[#E8E1D2]">
                Maximize Zero-Cost Output
              </h4>
              <p className="font-sans text-xs max-w-xs leading-relaxed">
                Combine the free basic offerings of our listed tools to form a robust, multi-tier intelligence stack without paying external subscriptions.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Structured Content headings and bodies */}
      <div className="space-y-6">
        {page.contentSections.map((sec, sIdx) => {
          const isH2 = sec.level === 2;
          return (
            <div key={sIdx} className="space-y-2 max-w-4xl">
              {isH2 ? (
                <h2 className="font-serif text-3xl font-light tracking-wide text-[#E8E1D2] pt-4 border-b border-[#3C3A36]/40 pb-2">
                  {sec.heading}
                </h2>
              ) : (
                <h3 className="font-sans text-lg font-bold text-[#E8E1D2] pt-2">
                  {sec.heading}
                </h3>
              )}
              <p className="font-sans text-sm text-[#8C8678] font-normal leading-relaxed whitespace-pre-wrap">
                {renderRichText(sec.body)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Individual Product Review Cards */}
      {reviewedProducts.length > 0 && (
        <div className="space-y-8 pt-4">
          <h2 className="font-serif text-3xl font-light text-[#E8E1D2] border-b border-[#3C3A36] pb-2">
            In-Depth Software Breakdown
          </h2>

          <div className="space-y-6">
            {reviewedProducts.map((p) => (
              <div key={p.id} className="border border-[#3C3A36] p-6 space-y-4 bg-[#1F1D1A]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-[9px] text-[#8C8678] tracking-widest uppercase block">Verified Review Unit</span>
                    <h3 className="font-serif text-2xl font-light text-[#E8E1D2]">{p.name}</h3>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-mono text-xs text-[#E8E1D2] font-bold">{p.rating} / 5.0</span>
                  </div>
                </div>

                <p className="font-sans text-sm text-[#8C8678] leading-relaxed">
                  {p.description}
                </p>

                {/* What it does / Why it helps students breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-l-2 border-[#B85C38] pl-4 my-3 bg-[#1a1816]/40 p-3">
                  <div className="space-y-1">
                    <h5 className="font-mono text-[8px] uppercase tracking-widest text-[#B85C38] font-bold">What it does</h5>
                    <p className="font-sans text-xs text-[#8C8678] leading-relaxed">
                      {p.whatItDoes || p.description}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-mono text-[8px] uppercase tracking-widest text-[#B85C38] font-bold">Why it helps students</h5>
                    <p className="font-sans text-xs text-[#ECE9E2]/80 leading-relaxed font-light">
                      {p.whyItHelpsStudents || "Accelerates study times, organizes chaotic reference drafts, and protects academic integrity."}
                    </p>
                  </div>
                </div>

                {/* Pros & Cons Columns styled in cream surface contrast */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* PROS CARD (surface theme) */}
                  <div className="bg-[#ECE9E2] text-[#1F1D1A] p-4 rounded-none space-y-2">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#B85C38] tracking-wider uppercase font-bold">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Pros
                    </div>
                    <ul className="text-xs space-y-1.5 text-[#6E695E]">
                      {p.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <Check className="w-3 h-3 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CONS CARD (dark background with soft elements) */}
                  <div className="bg-[#3C3A36]/30 border border-[#3C3A36] p-4 rounded-none space-y-2">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#8C8678] tracking-wider uppercase font-bold">
                      <ThumbsDown className="w-3.5 h-3.5" />
                      Cons
                    </div>
                    <ul className="text-xs space-y-1.5 text-[#8C8678]">
                      {p.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-red-400 mt-0.5 shrink-0">&bull;</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="font-mono text-[10px] text-[#8C8678]">
                    COGNITIVE BENEFIT: <span className="text-[#E8E1D2] font-bold">{p.pricePlan}</span>
                  </div>

                  <button
                    onClick={() => handleCtaClick(p.name, p.affiliateUrl)}
                    className="py-2 px-5 bg-[#ECE9E2] text-[#1F1D1A] font-mono text-[10px] tracking-wider uppercase border-0 rounded-none transition-all hover:bg-[#B85C38] hover:text-[#ECE9E2] shrink-0"
                  >
                    Outbound Testing Link &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Socratic FAQ Accordion Panel */}
      {page.faqs && page.faqs.length > 0 && (
        <div className="border border-[#3C3A36] p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-[#B85C38]" />
            <h3 className="font-serif text-xl">Socratic Academic Answers (FAQ)</h3>
          </div>

          <div className="space-y-2">
            {page.faqs.map((faq, fIdx) => {
              const isExpanded = expandedFaq === fIdx;
              return (
                <div key={fIdx} className="border-b border-[#3C3A36]/50 pb-2.5">
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : fIdx)}
                    className="w-full flex justify-between items-center text-left py-2 hover:text-[#B85C38] transition-all focus:outline-none"
                  >
                    <span className="font-sans font-semibold text-sm text-[#ECE9E2]">{faq.question}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#B85C38]" /> : <ChevronDown className="w-4 h-4 text-[#8C8678]" />}
                  </button>

                  {isExpanded && (
                    <p className="text-xs text-[#8C8678] leading-relaxed pt-1.5 pl-1 bg-[#1a1816]/35 p-2 font-light">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Author Box */}
      <div className="border border-[#3C3A36] p-6 bg-[#1a1816]/50 flex items-start gap-5">
        <div className="w-16 h-16 rounded-full bg-[#3C3A36] overflow-hidden shrink-0 border border-[#B85C38]/50">
          <img 
            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${page.slug}&backgroundColor=1F1D1A`} 
            alt="Author portrait" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="space-y-2">
          <div className="space-y-0.5">
            <h4 className="font-serif text-lg text-[#E8E1D2] leading-none">Sarah Jenkins</h4>
            <span className="font-mono text-[9px] text-[#B85C38] uppercase tracking-widest block">Senior Student Academic Reporter</span>
          </div>
          <p className="font-sans text-xs text-[#8C8678] leading-relaxed max-w-2xl">
            Sarah is an educational software analyst who specializes in workflow tools for college students. 
            She holds a Master's in Educational Technology and spends her time testing studying apps to see which ones actually improve GPAs and which ones are just hype.
          </p>
        </div>
      </div>

      {/* Editorial Topic Cluster Silo Linking (P2P Navigation) */}
      {peerPages.length > 0 && (
        <div className="border border-[#3C3A36]/60 p-6 space-y-4 bg-[#1a1816]/30">
          <div className="space-y-1">
            <span className="font-mono text-[9px] tracking-widest text-[#B85C38] uppercase">Editorial Cluster Silo Navigation</span>
            <h4 className="font-serif text-lg text-[#E8E1D2]">More Guides in {category?.title || "This Category"}</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {peerPages.map((peer) => (
              <button
                key={peer.slug}
                onClick={() => onNavigateToPage?.(peer.slug)}
                className="text-left p-4.5 bg-[#1F1D1A] border border-[#3C3A36]/40 hover:border-[#B85C38] transition-all group flex flex-col justify-between h-full cursor-pointer"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[8.5px] text-[#B85C38] uppercase">Target Focus: {peer.targetKeyword}</span>
                  <p className="font-serif text-sm text-[#E8E1D2] group-hover:text-[#B85C38] transition-colors line-clamp-2">
                    {peer.title}
                  </p>
                </div>
                <span className="font-mono text-[9px] text-[#B85C38] mt-3 group-hover:underline block">Read Article &rarr;</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Final Summary/Verdict block */}
      <div className="bg-[#1F1D1A] border-t-2 border-[#B85C38] pt-6 pb-4">
        <h3 className="font-mono text-[10px] tracking-widest text-[#B85C38] uppercase mb-1">Honest Verdict Wrap-Up</h3>
        <p className="font-sans text-sm text-[#8C8678] leading-relaxed italic max-w-4xl">
          {renderRichText(page.conclusion)}
        </p>
      </div>

    </div>
  );
}
