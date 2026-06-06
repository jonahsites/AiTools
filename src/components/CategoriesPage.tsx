import React from "react";
import { CategoryHub, MoneyPage } from "../types";
import { ArrowRight, Tag, BookOpen, Layers } from "lucide-react";

interface CategoriesPageProps {
  categories: CategoryHub[];
  moneyPages: MoneyPage[];
  onSelectCategory: (categorySlug: string) => void;
  onSelectPage: (pageSlug: string) => void;
  onBackToHub: () => void;
}

export default function CategoriesPage({
  categories,
  moneyPages,
  onSelectCategory,
  onSelectPage,
  onBackToHub
}: CategoriesPageProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 animate-fade-in">
      
      {/* Editorial Navigation Breadcrumb */}
      <div className="flex items-center gap-2 border-b border-[#3C3A36]/40 pb-4">
        <button 
          onClick={onBackToHub}
          className="font-mono text-[10px] tracking-wider text-[#B85C38] hover:text-white uppercase font-bold"
        >
          &larr; Back to Platform Hub
        </button>
        <span className="font-mono text-[10px] text-[#8C8678]">&bull;</span>
        <span className="font-mono text-[10px] text-[#8C8678] uppercase">Categories Directory Index</span>
      </div>

      {/* Hero Display Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#B85C38]" />
          <span className="font-mono text-[9px] tracking-widest text-[#B85C38] uppercase font-bold">Topical Authority Silos</span>
        </div>
        <h2 className="font-serif italic text-4xl sm:text-6xl text-[#E8E1D2] font-light leading-tight">
          Sitemap categories. Learn precisely where we build authority juice.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#8C8678] leading-relaxed max-w-2xl">
          We organize our research into specialized categories. Each category contains a broad keyword base and supports a network of deep product-review articles interlinked internally to guide search engine crawls.
        </p>
      </div>

      {/* Primary Category List Grid */}
      <div className="space-y-8">
        {categories.map((cat) => {
          // Find all articles living under this category
          const matchingPages = moneyPages.filter(p => p.parentCategorySlug === cat.slug);

          return (
            <div 
              key={cat.id} 
              className="border border-[#3C3A36] bg-[#1a1816]/30 p-6 md:p-8 space-y-6 flex flex-col justify-between hover:border-[#8C8678] transition-all"
            >
              
              {/* Category Header Info */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#3C3A36]/50 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#B85C38]" />
                    <h3 className="font-serif text-2xl text-[#E8E1D2] font-light">{cat.title}</h3>
                  </div>
                  <span className="font-mono text-[9px] text-[#B85C38] uppercase tracking-wider bg-[#B85C38]/10 px-2.5 py-0.5">
                    KEYWORD: "{cat.broadKeyword}"
                  </span>
                </div>
                
                <p className="font-sans text-xs sm:text-sm text-[#8C8678] leading-relaxed max-w-3xl">
                  {cat.description}
                </p>
              </div>

              {/* Sub-Pages Under Category */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#E8E1D2] uppercase tracking-widest font-bold">
                  <BookOpen className="w-3.5 h-3.5 text-[#B85C38]" />
                  <span>Articles in this Group ({matchingPages.length})</span>
                </div>

                {matchingPages.length === 0 ? (
                  <p className="font-mono text-[10px] text-[#8C8678] italic">No live articles published under this cluster yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchingPages.map((page) => (
                      <div 
                        key={page.id}
                        className="p-4 bg-[#1F1D1A] border border-[#3C3A36]/60 hover:border-[#B85C38] transition-all flex flex-col justify-between group"
                      >
                        <div className="space-y-1">
                          <h4 
                            onClick={() => onSelectPage(page.slug)}
                            className="cursor-pointer font-serif text-base text-[#ECE9E2] group-hover:text-[#B85C38] transition-colors line-clamp-1"
                          >
                            {page.title}
                          </h4>
                          <p className="font-sans text-[11px] text-[#8C8678] line-clamp-2 leading-relaxed">
                            {page.introduction.replace(/(?:[^.?!]+[.?!]){0,2}/g, '$&')}
                          </p>
                        </div>
                        <div className="pt-3 mt-3 border-t border-[#3C3A36]/30 flex justify-between items-center text-[10px] font-mono">
                          <span className="text-[#8C8678]">/{page.slug}</span>
                          <button 
                            onClick={() => onSelectPage(page.slug)}
                            className="text-[#B85C38] hover:text-[#ECE9E2] font-bold flex items-center gap-1"
                          >
                            Read guide <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Link to the specific visitor category filter */}
              <div className="pt-4 flex justify-between items-center border-t border-[#3C3A36]/40 text-xs">
                <span className="font-mono text-[10px] text-[#8C8678]">DIRECTORY: /{cat.slug}</span>
                <button
                  onClick={() => onSelectCategory(cat.slug)}
                  className="px-4 py-2 hover:bg-[#B85C38] bg-transparent text-[#B85C38] hover:text-white font-mono text-[10px] tracking-wider uppercase border border-[#B85C38] rounded-none transition-all duration-150 font-bold"
                >
                  View Category Feed
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Directory Disclaimer */}
      <div className="bg-[#1a1816]/50 border border-[#3C3A36] p-6 space-y-2 text-center">
        <h4 className="font-serif text-lg text-[#E8E1D2] font-light">Autogenerated Resource Directory</h4>
        <p className="font-sans text-xs text-[#8C8678] max-w-xl mx-auto leading-relaxed">
          This category map coordinates structured semantic clusters. Linking strategies are compiled dynamically in real-time inside our visual site architecture dashboard.
        </p>
      </div>

    </div>
  );
}
