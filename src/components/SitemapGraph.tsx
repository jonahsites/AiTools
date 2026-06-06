import React, { useState } from "react";
import { Link, Network, FileText, ArrowRight, CornerDownRight, Tag } from "lucide-react";
import { CategoryHub, MoneyPage } from "../types";

interface SitemapGraphProps {
  categories: CategoryHub[];
  moneyPages: MoneyPage[];
  onSelectPage: (slug: string) => void;
}

export default function SitemapGraph({
  categories,
  moneyPages,
  onSelectPage,
}: SitemapGraphProps) {
  const [activeNode, setActiveNode] = useState<string | null>("home");

  return (
    <div className="bg-[#1F1D1A] text-[#ECE9E2] p-6 border border-[#3C3A36] h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#B85C38]/20 border border-[#B85C38] text-[#B85C38]">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-xs text-[#8C8678] tracking-widest uppercase">Internal Linking Design</h3>
            <span className="font-serif text-2xl font-light">Topical Authority & Link Juice flow</span>
          </div>
        </div>

        <p className="text-xs text-[#8C8678] mb-6 leading-relaxed">
          Google ranks sites with tight **Topic Clusters**. Homepage link value flows to Category Hubs, 
          which delegate structural authority down to Money Pages. Supporting Money Pages pass cross-linking value back.
        </p>

        {/* Network Diagram mapping */}
        <div className="space-y-4">
          {/* Root node */}
          <div 
            onClick={() => setActiveNode("home")}
            className={`cursor-pointer p-3 border transition-all ${
              activeNode === "home" 
                ? "border-[#B85C38] bg-[#B85C38]/10" 
                : "border-[#3C3A36] bg-[#1F1D1A] hover:border-[#8C8678]"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] tracking-widest text-[#B85C38] uppercase">Homepage Portal (PR: 10)</span>
              <span className="text-[10px] font-mono text-[#8C8678]">100% Flow</span>
            </div>
            <div className="text-sm font-serif mt-1">ai-tools-for-students.com/</div>
          </div>

          {/* Links from homepage */}
          <div className="pl-4 space-y-3 border-l border-[#3C3A36] mt-2">
            {categories.map((cat) => {
              const childrenPages = moneyPages.filter(p => p.parentCategorySlug === cat.slug);
              const isActive = activeNode === cat.slug;

              return (
                <div key={cat.id} className="space-y-2">
                  <div 
                    onClick={() => setActiveNode(cat.slug)}
                    className={`cursor-pointer p-2.5 border transition-all ${
                      isActive 
                        ? "border-[#B85C38] bg-[#B85C38]/10" 
                        : "border-[#3C3A36] bg-[#1F1D1A]/50 hover:border-[#8C8678]"
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-mono font-bold text-[#ECE9E2] uppercase tracking-wider">SEO Hub (PR: 6.5)</span>
                      <span className="text-[#8C8678] font-mono">/{cat.slug}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Tag className="w-3.5 h-3.5 text-[#B85C38]" />
                      <span className="font-serif text-base text-[#E8E1D2]">{cat.title}</span>
                    </div>
                  </div>

                  {/* Money pages within category */}
                  <div className="pl-4 space-y-1.5 border-l border-[#B85C38]/30">
                    {childrenPages.map((page) => {
                      const isPageActive = activeNode === page.slug;
                      return (
                        <div 
                          key={page.id}
                          className="flex items-center gap-2 group"
                        >
                          <CornerDownRight className="w-3.5 h-3.5 text-[#8C8678]" />
                          <div
                            onClick={() => {
                              setActiveNode(page.slug);
                              onSelectPage(page.slug);
                            }}
                            className={`flex-1 cursor-pointer p-2 border text-left transition-all ${
                              isPageActive 
                                ? "border-[#B85C38] bg-[#B85C38]/5" 
                                : "border-[#3C3A36]/60 bg-[#1F1D1A]/30 hover:border-[#8C8678] group-hover:border-[#8C8678]"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-mono text-[8px] text-[#8C8678]">MONEY PAGE (PR: 4.2)</span>
                              {page.isCustomGenerated && (
                                <span className="bg-[#B85C38]/20 text-[#B85C38] px-1 text-[8px] tracking-wider uppercase font-mono">Programmatic</span>
                              )}
                            </div>
                            <div className="text-xs font-sans mt-0.5 text-[#ECE9E2] truncate max-w-[200px]">
                              {page.title}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#3C3A36] space-y-2">
        <h4 className="font-mono text-[9px] text-[#B85C38] tracking-widest uppercase">Internal Link Strategy Rule:</h4>
        <p className="text-[11px] text-[#8C8678] leading-relaxed">
          Each generated Money Page matches a strict **Breadcrumb anchor flow** to pass ranking juice back to the homepage. 
          When we run our **AI Generation Pipeline**, the links are instantly injected into our program sitemap!
        </p>
      </div>
    </div>
  );
}
