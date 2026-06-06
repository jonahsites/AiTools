import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  Bookmark, 
  ExternalLink, 
  Eye, 
  Network, 
  Tag, 
  CheckCircle, 
  Plus, 
  Zap, 
  Sliders, 
  FolderLock, 
  Award,
  Globe
} from "lucide-react";

import { 
  initialProducts, 
  initialCategories, 
  initialMoneyPages, 
  initialKeywords, 
  initialTemplates,
  linkingStrategies
} from "./data";
import { MoneyPage, AffiliateProduct, CategoryHub, KeywordPlanItem } from "./types";
import GeneratorDashboard from "./components/GeneratorDashboard";
import SitemapGraph from "./components/SitemapGraph";
import AffiliateMoneyPage from "./components/AffiliateMoneyPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import CategoriesPage from "./components/CategoriesPage";

export default function App() {
  // Application Data States (retains generated content in real-time)
  const [moneyPages, setMoneyPages] = useState<MoneyPage[]>(initialMoneyPages);
  const [keywordPlan, setKeywordPlan] = useState<KeywordPlanItem[]>(initialKeywords);
  const [products, setProducts] = useState<AffiliateProduct[]>(initialProducts);
  const [categories] = useState<CategoryHub[]>(initialCategories);
  const [templates] = useState(initialTemplates);

  // Interaction Navigation States
  const [activeMainTab, setActiveMainTab] = useState<"visitor" | "cluster">("visitor");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("all");
  const [selectedMoneyPageSlug, setSelectedMoneyPageSlug] = useState<string | null>(() => {
    // Detect page slug directly from URL sub-path on first load
    const path = window.location.pathname.replace(/^\//, "");
    if (path && path !== "cluster" && path !== "visitor" && path !== "all") {
      return path;
    }
    return null;
  });

  // Programmatic URL routing synchronizer
  const navigateToPage = (slug: string | null) => {
    setSelectedMoneyPageSlug(slug);
    if (slug) {
      window.history.pushState({ slug }, "", `/${slug}`);
    } else {
      window.history.pushState({}, "", "/");
    }
  };

  // Sync state with browser backward/forward navigation buttons (popstate events)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, "");
      if (path && path !== "cluster" && path !== "visitor" && path !== "all") {
        setSelectedMoneyPageSlug(path);
      } else {
        setSelectedMoneyPageSlug(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Active view statistics
  const [sessionViews, setSessionViews] = useState<number>(10450);

  // Auto-scroller on page selection
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedMoneyPageSlug, activeMainTab, selectedCategorySlug]);

  // Push programmatically generated page safely into app state
  const handleAddGeneratedPage = (newPage: MoneyPage) => {
    setMoneyPages((prev) => {
      // Avoid duplicates
      const exists = prev.some((p) => p.slug === newPage.slug);
      if (exists) {
        return prev.map((p) => (p.slug === newPage.slug ? newPage : p));
      }
      return [newPage, ...prev];
    });

    // Auto-view the generated content
    navigateToPage(newPage.slug);
    setActiveMainTab("visitor");
  };

  const handleUpdateKeywordStatus = (
    kwId: string, 
    status: "Targeted" | "Planned" | "Generating", 
    pageSlug?: string
  ) => {
    setKeywordPlan((prev) => 
      prev.map((k) => 
        k.id === kwId 
          ? { ...k, status, targetedPageSlug: pageSlug || k.targetedPageSlug } 
          : k
      )
    );
  };

  const handleUpdateProducts = (updatedProducts: AffiliateProduct[]) => {
    setProducts(updatedProducts);
  };

  // Helper selectors
  const activeCategoryObj = categories.find((c) => c.slug === selectedCategorySlug);
  
  const filteredPages = selectedCategorySlug === "all"
    ? moneyPages
    : moneyPages.filter((p) => p.parentCategorySlug === selectedCategorySlug);

  return (
    <div className="min-h-screen bg-[#1F1D1A] text-[#ECE9E2] font-sans selection:bg-[#B85C38] selection:text-white flex flex-col">
      
      {/* Structural Hairline Header Section */}
      <header className="border-b border-[#3C3A36] bg-[#1F1D1A] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo with strict aesthetic tag */}
          <div 
            onClick={() => { navigateToPage(null); setSelectedCategorySlug("all"); }}
            className="cursor-pointer space-y-0.5 group"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#B85C38] block" />
              <div className="font-mono text-[10px] tracking-widest text-[#B85C38] uppercase font-bold">
                Affiliate Authority Platform
              </div>
            </div>
            <h1 className="font-serif italic text-2xl font-light text-[#E8E1D2] group-hover:text-[#B85C38] transition-colors">
              AI Tools for Students
            </h1>
          </div>

          {/* Main Visitor Navigation Bar */}
          {activeMainTab === "visitor" && (
            <nav className="flex items-center gap-5 font-mono text-[11px] tracking-wider uppercase font-bold text-[#8C8678]">
              <button 
                onClick={() => { navigateToPage("homepage"); setSelectedCategorySlug("all"); }}
                className={`hover:text-white transition-colors duration-150 ${
                  (selectedMoneyPageSlug === null || selectedMoneyPageSlug === "homepage") ? "text-[#B85C38]" : ""
                }`}
              >
                Homepage
              </button>
              <button 
                onClick={() => { navigateToPage("categories"); }}
                className={`hover:text-white transition-colors duration-150 ${
                  selectedMoneyPageSlug === "categories" ? "text-[#B85C38]" : ""
                }`}
              >
                Categories
              </button>
              <button 
                onClick={() => { navigateToPage("about"); }}
                className={`hover:text-white transition-colors duration-150 ${
                  selectedMoneyPageSlug === "about" ? "text-[#B85C38]" : ""
                }`}
              >
                About
              </button>
              <button 
                onClick={() => { navigateToPage("contact"); }}
                className={`hover:text-white transition-colors duration-150 ${
                  selectedMoneyPageSlug === "contact" ? "text-[#B85C38]" : ""
                }`}
              >
                Contact
              </button>
            </nav>
          )}

          {/* High Contrast Mode Nav Switch UI */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveMainTab("visitor")}
              className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-150 ${
                activeMainTab === "visitor"
                  ? "bg-[#B85C38] text-black font-bold"
                  : "bg-transparent text-[#8C8678] border border-[#3C3A36] hover:text-white hover:border-[#8C8678]"
              }`}
            >
              Public Site Hub
            </button>

            <button
              onClick={() => setActiveMainTab("cluster")}
              className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-150 flex items-center gap-1.5 ${
                activeMainTab === "cluster"
                  ? "bg-[#B85C38] text-black font-bold"
                  : "bg-transparent text-[#8C8678] border border-[#3C3A36] hover:text-white hover:border-[#8C8678]"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              SEO System & Pipeline
            </button>
          </div>
        </div>
      </header>

      {/* Main Core Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: VISITOR HUB (The actual SEO monetized authority site look & feel) */}
        {activeMainTab === "visitor" && (
          <div className="space-y-8">
            
            {/* Breadcrumb back links inside specific money page details */}
            {selectedMoneyPageSlug && selectedMoneyPageSlug !== "homepage" ? (
              <div>
                {(() => {
                  if (selectedMoneyPageSlug === "about") {
                    return <AboutPage onBackToHub={() => navigateToPage(null)} />;
                  }
                  if (selectedMoneyPageSlug === "contact") {
                    return <ContactPage onBackToHub={() => navigateToPage(null)} />;
                  }
                  if (selectedMoneyPageSlug === "categories") {
                    return (
                      <CategoriesPage
                        categories={categories}
                        moneyPages={moneyPages}
                        onSelectCategory={(slug) => {
                          setSelectedCategorySlug(slug);
                          navigateToPage(null);
                        }}
                        onSelectPage={(slug) => {
                          navigateToPage(slug);
                        }}
                        onBackToHub={() => navigateToPage(null)}
                      />
                    );
                  }

                  const currPage = moneyPages.find((p) => p.slug === selectedMoneyPageSlug);
                  const parentCat = categories.find((c) => c.slug === currPage?.parentCategorySlug);
                  return currPage ? (
                    <AffiliateMoneyPage
                      page={currPage}
                      products={products}
                      category={parentCat}
                      allPages={moneyPages}
                      onBackToHub={() => navigateToPage(null)}
                      onNavigateToCategory={(slug) => {
                        setSelectedCategorySlug(slug);
                        navigateToPage(null);
                      }}
                      onNavigateToPage={(slug) => {
                        navigateToPage(slug);
                      }}
                    />
                  ) : (
                    <div className="text-center p-8 font-mono text-xs">Article not found.</div>
                  );
                })()}
              </div>
            ) : (
              // HOMEPAGE VIEW OR CATEGORY HUB VIEW
              <div className="space-y-12">
                
                {/* Visual Accent Display Hero Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#3C3A36] pb-10">
                  <div className="lg:col-span-8 space-y-4">
                    <span className="font-mono text-[10px] tracking-widest text-[#B85C38] uppercase block">
                      Find the best AI tools for studying, writing, and productivity
                    </span>
                    <h2 className="font-display italic text-5xl sm:text-7xl lg:text-8xl font-light text-[#E8E1D2] leading-none tracking-tight">
                      Find the ultimate intelligence edge.
                    </h2>
                    <p className="font-sans text-[#8C8678] text-base leading-relaxed max-w-2xl">
                      A rigorously tested, student-first database targeting academic software. 
                      Compare paraphrasers, homework helpers, flashcard AI, and notebook integrations to maximize grades with zero friction.
                    </p>
                  </div>

                  {/* System statistics card on side */}
                  <div className="lg:col-span-4 bg-[#1a1816]/70 border border-[#3C3A36] p-5 space-y-3">
                    <h4 className="font-mono text-[10px] text-[#B85C38] tracking-widest uppercase">Live SEO Metrics Dashboard</h4>
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <span className="font-mono text-[9px] text-[#8C8678] block uppercase">Monthly Traffic</span>
                        <span className="font-serif text-2xl text-[#E8E1D2] font-light">42.8k+</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-[#8C8678] block uppercase">CTR Revenue</span>
                        <span className="font-serif text-2xl text-[#E8E1D2] font-light">12.5%</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-[#3C3A36]/60 text-[10px] font-mono text-[#8C8678] flex items-center justify-between">
                      <span>Authority Hub Status:</span>
                      <span className="text-emerald-400 font-bold">HEALTHY</span>
                    </div>
                  </div>
                </div>

                {/* Categories Navigation Hubs (BROAD keywords focused semantic blocks) */}
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline border-b border-[#3C3A36]/40 pb-2">
                    <h3 className="font-serif text-2xl font-light text-[#E8E1D2]">Directory Categories</h3>
                    <span className="font-mono text-[9px] text-[#8C8678] uppercase">Filter authority clusters</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <button
                      onClick={() => setSelectedCategorySlug("all")}
                      className={`p-3 text-left border transition-all duration-150 ${
                        selectedCategorySlug === "all"
                          ? "border-[#B85C38] bg-[#B85C38]/10 text-white"
                          : "border-[#3C3A36] bg-[#1a1816]/40 text-[#8C8678] hover:border-[#8C8678] hover:text-white"
                      }`}
                    >
                      <span className="font-mono text-[9px] tracking-widest block uppercase text-[#B85C38] mb-1">ALL TOPICS</span>
                      <span className="font-serif text-base font-light">View All Articles</span>
                    </button>

                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategorySlug(c.slug)}
                        className={`p-3 text-left border transition-all duration-150 ${
                          selectedCategorySlug === c.slug
                            ? "border-[#B85C38] bg-[#B85C38]/10 text-white"
                            : "border-[#3C3A36] bg-[#1a1816]/40 text-[#8C8678] hover:border-[#8C8678] hover:text-white"
                        }`}
                      >
                        <span className="font-mono text-[8rpx] tracking-widest block uppercase text-[#B85C38] mb-1 truncate">HUB</span>
                        <span className="font-serif text-base font-light line-clamp-1">{c.title.replace(" Tools", "")}</span>
                      </button>
                    ))}
                  </div>

                  {/* Active filtered Category Insight intro */}
                  {selectedCategorySlug !== "all" && activeCategoryObj && (
                    <div className="p-4 bg-[#ECE9E2] text-[#1F1D1A]">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-2">
                        <span className="font-mono text-[10px] text-[#B85C38] tracking-widest uppercase font-bold">
                          Active Authority Hub Keyword: "{activeCategoryObj.broadKeyword}"
                        </span>
                        <span className="text-[10px] font-mono text-[#6E695E] uppercase bg-[#1F1D1A]/10 px-2 py-0.5">Sitemap Directory: /{activeCategoryObj.slug}</span>
                      </div>
                      <h4 className="font-serif text-2xl font-light text-[#1F1D1A] mb-1">{activeCategoryObj.title}</h4>
                      <p className="font-sans text-xs text-[#6E695E] leading-relaxed max-w-4xl">{activeCategoryObj.description}</p>
                    </div>
                  )}
                </div>

                {/* Featured Guides Section (Fulfilling SEO internal linking request) */}
                {selectedCategorySlug === "all" && (
                  <div className="border border-[#B85C38] bg-[#1a1816] p-6 lg:p-8 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <span className="font-mono text-[9px] tracking-widest text-[#B85C38] uppercase font-bold px-2 py-0.5 bg-[#B85C38]/10">
                        ⭐ Highlighted Editorial Feature
                      </span>
                      <span className="font-mono text-[9px] text-[#8C8678] uppercase">
                        ESTIMATED READ TIME: 12 MINUTES
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 
                        onClick={() => navigateToPage("best-ai-essay-writer-tools")}
                        className="cursor-pointer font-display text-2xl sm:text-4xl font-light text-[#E8E1D2] hover:text-[#B85C38] transition-colors leading-tight tracking-tight max-w-4xl"
                      >
                        Best AI Writing Tools for Students (2026): Write Better Essays, Papers, and Assignments in Half the Time
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#8C8678] leading-relaxed max-w-4xl">
                        Struggling to draft long research papers, outline complex academic literature reviews, or format your bibliography correctly? For most students, getting started on a blank essay draft causes severe analysis paralysis. Read our deep evaluation of Grammarly, ChatGPT, Jenni AI, QuillBot, Notion AI, Wordtune, and Copy.ai.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#3C3A36]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-[#8C8678]">
                        <span>FOCUS: <strong className="text-[#ECE9E2]">best AI essay writer tools</strong></span>
                        <span>&bull;</span>
                        <span>UNITS: <strong className="text-[#ECE9E2]">7 REVIEWED</strong></span>
                        <span>&bull;</span>
                        <span className="text-[#B85C38]">18K+ READERS</span>
                      </div>
                      
                      <button 
                        onClick={() => navigateToPage("best-ai-essay-writer-tools")}
                        className="px-5 py-2.5 bg-[#B85C38] hover:bg-[#ECE9E2] text-white hover:text-[#1F1D1A] font-mono text-[10px] tracking-wider uppercase border-0 rounded-none transition-all duration-150 font-bold"
                      >
                        Read the Free Guide &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* Featured Products Section (Most Popular Tools) */}
                {selectedCategorySlug === "all" && (
                  <div className="space-y-6 pt-8 border-t border-[#3C3A36]/40">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif text-2xl font-light text-[#E8E1D2]">Most Popular Tools</h3>
                      <span className="font-mono text-[10px] text-[#8C8678] uppercase">Student Favorites</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {products.slice(0, 5).map(prod => (
                        <a
                          key={prod.id}
                          href={prod.affiliateUrl}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="block border border-[#3C3A36] bg-[#1a1816]/30 p-4 hover:border-[#B85C38] transition-all group group relative flex flex-col items-center text-center space-y-3"
                        >
                          <div className="w-12 h-12 rounded-full bg-[#1F1D1A] border border-[#3C3A36] flex items-center justify-center font-display text-xl text-[#ECE9E2]">
                            {prod.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-sans text-sm text-[#E8E1D2] font-medium group-hover:text-[#B85C38] transition-colors">{prod.brand}</h4>
                            <div className="font-mono text-[9px] text-[#8C8678] mt-1">{prod.badge}</div>
                          </div>
                          <span className="absolute top-2 right-2 text-[10px]">⭐ {prod.rating}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary Money Pages Content Grid (Attracts Google search traffic) */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-2xl font-light text-[#E8E1D2]">
                      {selectedCategorySlug === "all" ? "Core Article Clusters" : `Active Cluster Pages (${filteredPages.length})`}
                    </h3>
                    <span className="font-mono text-[10px] text-[#8C8678] uppercase">Structured for conversions</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPages.map((page) => {
                      const pageCategory = categories.find((c) => c.slug === page.parentCategorySlug);
                      const featuredProd = products.find((p) => p.id === page.featuredProductId);
                      
                      return (
                        <div 
                          key={page.id}
                          className="border border-[#3C3A36] hover:border-[#8C8678] bg-[#1a1816]/50 p-5 flex flex-col justify-between transition-all duration-150 group"
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-[9px] font-mono text-[#8C8678]">
                              <span className="text-[#B85C38] uppercase">/{pageCategory?.slug || "general"}</span>
                              <span>VOL: {keywordPlan.find(k => k.keyword === page.targetKeyword)?.searchVolume?.toLocaleString() || "High"} / MO</span>
                            </div>

                            <div className="space-y-1">
                              <h4 
                                onClick={() => navigateToPage(page.slug)}
                                className="cursor-pointer font-serif text-xl tracking-wide text-[#ECE9E2] group-hover:text-[#B85C38] transition-colors line-clamp-2"
                              >
                                {page.title}
                              </h4>
                              <p className="font-sans text-xs text-[#8C8678] line-clamp-3 leading-relaxed">
                                {page.introduction}
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-[#3C3A36]/40 mt-4 flex items-center justify-between text-xs">
                            <span className="text-[10px] font-mono text-[#8C8678] uppercase">
                              TOP PICK: <strong className="text-[#E8E1D2]">{featuredProd?.brand || "Grammarly"}</strong>
                            </span>
                            
                            <button
                              onClick={() => navigateToPage(page.slug)}
                              className="font-mono text-[10px] tracking-wider text-[#B85C38] hover:text-white uppercase font-bold"
                            >
                              Explore specs &rarr;
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Affiliate choice promo bar */}
                <div className="bg-[#1F1D1A] border-t border-[#3C3A36] pt-12 flex flex-col items-center justify-center text-center space-y-4">
                  <span className="font-mono text-[10px] text-[#B85C38] tracking-widest uppercase">Student AI Partner Network</span>
                  <div className="flex flex-wrap justify-center gap-6 text-[#8C8678] font-serif text-lg italic">
                    <span>Grammarly GO</span>
                    <span>&bull;</span>
                    <span>Notion Student AI</span>
                    <span>&bull;</span>
                    <span>Quizlet Q-Chat</span>
                    <span>&bull;</span>
                    <span>Quillbot Rewriter</span>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 2: SYSTEM ADMIN CONSOLE (Programmatic Pipeline Generator & Sitemap Graph mapping) */}
        {activeMainTab === "cluster" && (
          <div className="space-y-6">
            
            {/* Header layout describing the system paradigm */}
            <div className="border border-[#3C3A36] p-6 bg-[#ECE9E2] text-[#1F1D1A]">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[10px] text-[#B85C38] tracking-widest uppercase font-bold">SYSTEM CONTROL PANEL</span>
                <span className="font-mono text-[9px] bg-[#1F1D1A]/10 text-[#6E695E] px-2 py-0.5 font-bold">STATUS: READY TO DELEGATE</span>
              </div>
              <h2 className="font-serif text-3xl font-light text-[#1F1D1A] mb-1">Sitemap Automation & Generation Blueprint</h2>
              <p className="font-sans text-xs text-[#6E695E] leading-relaxed max-w-4xl">
                This dashboard coordinates our **Programmatic SEO** flow. Test keyword trends, edit direct affiliate tracking metrics, 
                and run the generator which connects to the server-side LLM model to instantly produce structured money review pages with custom ratings, FAQ structures, and comparisons.
              </p>
            </div>

            {/* Split Grid: Generator Console + Topology mapping */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Generator control inputs (Left column) */}
              <div className="lg:col-span-8">
                <GeneratorDashboard
                  keywordPlan={keywordPlan}
                  templates={templates}
                  affiliateProducts={products}
                  moneyPages={moneyPages}
                  onAddGeneratedPage={handleAddGeneratedPage}
                  onUpdateKeywordStatus={handleUpdateKeywordStatus}
                  onUpdateProducts={handleUpdateProducts}
                  activeTab="generation"
                  setActiveTab={() => {}}
                />
              </div>

              {/* Dynamic visual graph tree / passing of topical juice (Right column) */}
              <div className="lg:col-span-4 h-full">
                <SitemapGraph
                  categories={categories}
                  moneyPages={moneyPages}
                  onSelectPage={(slug) => {
                    navigateToPage(slug);
                    setActiveMainTab("visitor");
                  }}
                />
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Aesthetic Footer block based on design guidelines */}
      <footer className="border-t border-[#3C3A36] bg-[#1F1D1A] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#8C8678]">
          <div className="space-y-1">
            <span className="text-[#ECE9E2] text-sm font-serif italic block">AI Tools for Students &bull; Niche Authority Portal</span>
            <p className="text-[10px]">PrairieSignal Field System &bull; Structured Programmatic SEO Affiliate Engine &copy; 2026</p>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6">
            <button onClick={() => { navigateToPage("homepage"); setSelectedCategorySlug("all"); }} className="hover:text-white transition-all uppercase font-mono text-left">Homepage</button>
            <button onClick={() => { navigateToPage("categories"); }} className="hover:text-white transition-all uppercase font-mono text-left">Categories</button>
            <button onClick={() => { navigateToPage("about"); }} className="hover:text-white transition-all uppercase font-mono text-left">About Us</button>
            <button onClick={() => { navigateToPage("contact"); }} className="hover:text-white transition-all uppercase font-mono text-left">Contact</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
