import React, { useState } from "react";
import { 
  Sparkles, 
  Search, 
  Settings, 
  TrendingUp, 
  Database, 
  RefreshCw, 
  Link as LinkIcon, 
  Plus, 
  CheckCircle2, 
  FileText, 
  AlertCircle 
} from "lucide-react";
import { KeywordPlanItem, ContentTemplate, AffiliateProduct, MoneyPage } from "../types";

interface GeneratorDashboardProps {
  keywordPlan: KeywordPlanItem[];
  templates: ContentTemplate[];
  affiliateProducts: AffiliateProduct[];
  moneyPages: MoneyPage[];
  onAddGeneratedPage: (page: MoneyPage) => void;
  onUpdateKeywordStatus: (kwId: string, status: "Targeted" | "Planned" | "Generating", pageSlug?: string) => void;
  onUpdateProducts: (products: AffiliateProduct[]) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function GeneratorDashboard({
  keywordPlan,
  templates,
  affiliateProducts,
  moneyPages,
  onAddGeneratedPage,
  onUpdateKeywordStatus,
  onUpdateProducts,
}: GeneratorDashboardProps) {
  // Generation state
  const [selectedKeywordId, setSelectedKeywordId] = useState<string>(keywordPlan[3]?.id || "");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0]?.id || "");
  const [selectedCategory, setSelectedCategory] = useState<string>("ai-writing-tools");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // New Keyword input state
  const [newKeyword, setNewKeyword] = useState<string>("");
  const [newVolume, setNewVolume] = useState<number>(3100);
  const [newIntent, setNewIntent] = useState<"Informational" | "Commercial" | "Comparison">("Commercial");
  const [newCategory, setNewCategory] = useState<string>("ai-writing-tools");

  // Affiliate Products config state
  const [editingProducts, setEditingProducts] = useState<AffiliateProduct[]>([...affiliateProducts]);
  const [productSavedAlert, setProductSavedAlert] = useState<boolean>(false);

  // Filter keyword state
  const [intentFilter, setIntentFilter] = useState<string>("ALL");

  // Log function helper
  const addLog = (msg: string) => {
    setGenerationLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleGeneratePage = async () => {
    const targetKwItem = keywordPlan.find((item) => item.id === selectedKeywordId);
    if (!targetKwItem) return;

    setIsGenerating(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    setGenerationLogs([]);

    addLog(`Initiating programmatic generation pipeline for query: "${targetKwItem.keyword}"`);
    addLog(`Applying template pattern: "${selectedTemplateId}"`);
    addLog(`Contextual Category Mapping: "${selectedCategory}"`);

    try {
      addLog("Sending API payload to Express server endpoint: POST /api/generate-page...");
      
      const selectedTemplateObj = templates.find(t => t.id === selectedTemplateId);

      const response = await fetch("/api/generate-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: targetKwItem.keyword,
          categorySlug: selectedCategory,
          templateName: selectedTemplateObj?.name || "Best General",
          pattern: selectedTemplateObj?.pattern || "Listicle",
          optionalNotes: additionalNotes
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error code: ${response.status}`);
      }

      const resData = await response.json();
      
      if (resData.success && resData.page) {
        addLog("Server response approved.");
        if (resData.isMock) {
          addLog("Notice: Running in adaptive developer preview. Real model template used.");
        } else {
          addLog("Gemini 3.5-flash generated response successfully parsed.");
        }
        
        const generatedPage: MoneyPage = resData.page;
        
        // Add artificial delay to give realistic professional programmatic feel
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        onAddGeneratedPage(generatedPage);
        onUpdateKeywordStatus(selectedKeywordId, "Targeted", generatedPage.slug);
        
        addLog(`Successfully registered new Money Page at route /${generatedPage.slug}`);
        setSuccessMessage(`Success! New SEO page generated: "${generatedPage.title}" targeting "${targetKwItem.keyword}".`);
      } else {
        throw new Error(resData.error || "Generation query resulted in an invalid structure.");
      }
    } catch (err: any) {
      console.error(err);
      addLog(`Failed to process generation query: ${err.message}`);
      setErrorMessage(`Generation pipeline error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateKeyword = () => {
    if (!newKeyword.trim()) return;
    const item: KeywordPlanItem = {
      id: `kw-${Date.now()}`,
      keyword: newKeyword.trim(),
      searchVolume: newVolume,
      difficulty: Math.floor(Math.random() * 45) + 15,
      intent: newIntent,
      suggestedTitle: `Best ${newKeyword} for College Students: Complete guide`,
      categorySlug: newCategory,
      status: "Planned"
    };

    keywordPlan.push(item);
    setNewKeyword("");
    addLog(`Manually queued new keyword to target list: "${item.keyword}"`);
  };

  const handleUpdateProductLink = (index: number, val: string) => {
    const updated = [...editingProducts];
    updated[index].affiliateUrl = val;
    setEditingProducts(updated);
  };

  const handleSaveProductConfig = () => {
    onUpdateProducts(editingProducts);
    setProductSavedAlert(true);
    setTimeout(() => setProductSavedAlert(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* 2-Column top section: Interactive Generator Controls + Monetization Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Generator Controls */}
        <div className="lg:col-span-7 bg-[#1F1D1A] text-[#ECE9E2] border border-[#3C3A36] p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#3C3A36]/60">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B85C38]" />
              <h3 className="font-serif text-xl">Programmatic Generation Pipeline</h3>
            </div>
            <span className="font-mono text-[9px] bg-[#B85C38]/10 text-[#B85C38] px-2 py-0.5 border border-[#B85C38]/30">
              SYSTEM ENGINE
            </span>
          </div>

          <p className="text-xs text-[#8C8678] mb-4">
            Convert organic keyword research into production-grade student money pages. 
            Runs on the backend using <strong className="text-[#E8E1D2]">gemini-3.5-flash</strong> to organize outlines, ratings, comparison tables, and FAQs directly.
          </p>

          <div className="space-y-4 text-xs">
            {/* Choose Keyword */}
            <div>
              <label className="block mb-1.5 text-[#8C8678] font-mono tracking-wider uppercase text-[10px]">
                1. Select Keyword Target (Volume & Intent mapped)
              </label>
              <select 
                value={selectedKeywordId}
                onChange={(e) => {
                  const kwId = e.target.value;
                  setSelectedKeywordId(kwId);
                  const matchedKw = keywordPlan.find((item) => item.id === kwId);
                  if (matchedKw) {
                    setSelectedCategory(matchedKw.categorySlug);
                  }
                }}
                className="w-full bg-[#1F1D1A] text-[#ECE9E2] border border-[#3C3A36] p-2.5 focus:border-[#B85C38] focus:outline-none font-mono text-[11px]"
              >
                {keywordPlan.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.status === "Targeted" ? "✓ " : "⌛ "} {k.keyword} ({k.intent} - Vol: {k.searchVolume})
                  </option>
                ))}
              </select>
            </div>

            {/* Choose Template & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 text-[#8C8678] font-mono tracking-wider uppercase text-[10px]">
                  2. Reusable Template Pattern
                </label>
                <select 
                  value={selectedTemplateId}
                  onChange={(e) => setSelectedTemplateId(e.target.value)}
                  className="w-full bg-[#1F1D1A] text-[#ECE9E2] border border-[#3C3A36] p-2.5 focus:border-[#B85C38] focus:outline-none font-mono text-[11px]"
                >
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.pattern})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1.5 text-[#8C8678] font-mono tracking-wider uppercase text-[10px]">
                  3. Topical Category Hub
                </label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#1F1D1A] text-[#ECE9E2] border border-[#3C3A36] p-2.5 focus:border-[#B85C38] focus:outline-none font-sans text-[11px]"
                >
                  <option value="ai-writing-tools">AI Writing Tools</option>
                  <option value="ai-study-homework">AI Study & Homework Tools</option>
                  <option value="ai-note-taking">AI Note-Taking Tools</option>
                  <option value="ai-productivity-tools">AI Productivity Tools</option>
                </select>
              </div>
            </div>

            {/* Context/Notes option */}
            <div>
              <label className="block mb-1 text-[#8C8678] font-mono tracking-wider uppercase text-[10px]">
                4. Custom Insights / Brand Directives (Optional)
              </label>
              <input 
                type="text"
                placeholder="e.g., Focus heavily on college discounts, emphasize Grammarly citation tool..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full bg-[#1F1D1A] text-[#ECE9E2] border border-[#3C3A36] p-2.5 text-xs placeholder-[#8C8678]/50 focus:border-[#B85C38] focus:outline-none"
              />
            </div>

            {/* Generation Actions */}
            <div className="pt-2">
              <button
                onClick={handleGeneratePage}
                disabled={isGenerating || !selectedKeywordId}
                className="w-full py-3 bg-[#B85C38] hover:bg-[#8C8B7F]/20 hover:text-[#ECE9E2] border border-transparent hover:border-[#C9C4B8] text-[#1F1D1A] block font-mono text-[11px] tracking-widest uppercase transition-all duration-150 disabled:opacity-40"
              >
                {isGenerating ? "Executing Programmatic Generation..." : "Run AI Generation Pipeline"}
              </button>
            </div>
          </div>

          {/* Success Alerts */}
          {successMessage && (
            <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-950/40 border border-red-500/50 text-red-300 flex items-start gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Generation Logs console block */}
          {generationLogs.length > 0 && (
            <div className="mt-4">
              <span className="block mb-1.5 font-mono text-[9px] text-[#8C8678] tracking-widest uppercase">Pipeline Output Console:</span>
              <div className="bg-[#1a1816]/70 border border-[#3C3A36] p-3 rounded-none h-32 overflow-y-auto font-mono text-[10px] text-[#8C8678] scrollbar-thin">
                {generationLogs.map((log, index) => (
                  <div key={index} className="py-0.5 leading-normal">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Affiliate Product Strategy config */}
        <div className="lg:col-span-5 bg-[#1F1D1A] text-[#ECE9E2] border border-[#3C3A36] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#3C3A36]/60">
              <LinkIcon className="w-4 h-4 text-[#B85C38]" />
              <h3 className="font-serif text-xl">Affiliate Monetization Strategy</h3>
            </div>

            <p className="text-xs text-[#8C8678] mb-4">
              Configure product credentials. Every generated article parses these link parameters to build automatic **Call-To-Actions** with custom student referral IDs.
            </p>

            <div className="space-y-3">
              {editingProducts.map((product, pIdx) => (
                <div key={product.id} className="p-2.5 border border-[#3C3A36]/60 bg-[#1F1D1A]/50">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-sans font-medium text-[#ECE9E2]">{product.name}</span>
                    <span className="text-[10px] bg-[#ECE9E2]/10 text-[#8C8678] px-1 px-1.5 font-mono">{product.badge || "SaaS Partner"}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] text-[#8C8678] shrink-0">URL Parameter:</span>
                    <input 
                      type="text"
                      value={product.affiliateUrl}
                      onChange={(e) => handleUpdateProductLink(pIdx, e.target.value)}
                      className="w-full bg-[#1F1D1A] border-b border-[#3C3A36] focus:border-[#B85C38] text-[10px] font-mono py-1 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#3C3A36] flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#8C8678]">
              {productSavedAlert ? "✓ Configuration Updated" : "5 Active Providers Linked"}
            </span>
            <button
              onClick={handleSaveProductConfig}
              className="px-4 py-2 bg-[#ECE9E2] text-[#1F1D1A] font-mono text-[10px] tracking-wider uppercase transition-all hover:bg-[#B85C38] hover:text-[#ECE9E2]"
            >
              Update Referral Paths
            </button>
          </div>
        </div>
      </div>

      {/* Structured Keyword Management & Intent Mapping */}
      <div className="bg-[#1F1D1A] text-[#ECE9E2] border border-[#3C3A36] p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 pb-3 border-b border-[#3C3A36]/60">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#B85C38]" />
              <h3 className="font-serif text-lg">SEO Intent Matrix & Keyword Planner</h3>
            </div>
            <p className="text-xs text-[#8C8678] mt-0.5">Define high search value patterns (Commercial, comparison, informational clusters)</p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8C8678] font-mono">Filter Category:</span>
            <div className="flex bg-[#1F1D1A] border border-[#3C3A36]">
              {["ALL", "Commercial", "Comparison", "Informational"].map((intent) => (
                <button
                  key={intent}
                  onClick={() => setIntentFilter(intent)}
                  className={`px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase ${
                    intentFilter === intent ? "bg-[#B85C38] text-black" : "text-[#8C8678] hover:text-white"
                  }`}
                >
                  {intent}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Existing Keyword Plan table */}
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#3C3A36] text-[#8C8678] text-[10px] font-mono tracking-wider uppercase">
                <th className="py-2.5">Target Keyword</th>
                <th>Sitemap Category</th>
                <th>Search Vol.</th>
                <th>Difficulty</th>
                <th>Intent Role</th>
                <th>Generation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3C3A36]/40">
              {keywordPlan
                .filter(k => intentFilter === "ALL" || k.intent === intentFilter)
                .map((kw) => (
                  <tr key={kw.id} className="hover:bg-[#ECE9E2]/5 font-sans">
                    <td className="py-2.5 font-medium text-[#E8E1D2]">{kw.keyword}</td>
                    <td className="text-xs text-[#8C8678] font-mono font-light">/{kw.categorySlug}</td>
                    <td className="font-mono text-[#E8E1D2]">{kw.searchVolume.toLocaleString()} / mo</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] w-6">{kw.difficulty}</span>
                        <div className="w-16 bg-[#3C3A36] h-1">
                          <div 
                            className="bg-[#B85C38] h-1" 
                            style={{ width: `${kw.difficulty}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`px-1.5 py-0.5 text-[8px] font-mono tracking-wider uppercase border ${
                        kw.intent === "Commercial" 
                          ? "bg-amber-950/20 border-amber-500/50 text-amber-300"
                          : kw.intent === "Comparison"
                          ? "bg-purple-950/20 border-purple-500/50 text-purple-300"
                          : "bg-blue-950/20 border-blue-500/50 text-blue-300"
                      }`}>
                        {kw.intent}
                      </span>
                    </td>
                    <td>
                      {kw.status === "Targeted" ? (
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="font-mono text-[9px] tracking-wider uppercase font-bold">Active / Live</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[#8C8678]">
                          <div className="w-2 h-2 rounded-full bg-[#8C8678] animate-pulse" />
                          <span className="p-0 font-mono text-[9px] uppercase">Queued</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Quick add new target keyword form */}
        <div className="mt-5 pt-4 border-t border-[#3C3A36] text-xs">
          <h4 className="font-mono font-medium text-[10px] text-[#8C8678] tracking-widest uppercase mb-3">Add Custom Keyword Target</h4>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-5">
              <input 
                type="text"
                placeholder="e.g. best AI paraphraser tools, logic homework solvers..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className="w-full bg-[#1F1D1A] text-[#ECE9E2] border border-[#3C3A36] p-2 focus:border-[#B85C38] focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <input 
                type="number"
                placeholder="Search Volume"
                value={newVolume}
                onChange={(e) => setNewVolume(Number(e.target.value))}
                className="w-full bg-[#1F1D1A] text-[#ECE9E2] border border-[#3C3A36] p-2 focus:border-[#B85C38] focus:outline-none font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <select 
                value={newIntent}
                onChange={(e) => setNewIntent(e.target.value as any)}
                className="w-full bg-[#1F1D1A] text-[#ECE9E2] border border-[#3C3A36] p-2 focus:border-[#B85C38] focus:outline-none font-sans"
              >
                <option value="Commercial">Commercial</option>
                <option value="Comparison">Comparison</option>
                <option value="Informational">Informational</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <select 
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-[#1F1D1A] text-[#ECE9E2] border border-[#3C3A36] p-2 focus:border-[#B85C38] focus:outline-none font-sans"
              >
                <option value="ai-writing-tools">Writing Hub</option>
                <option value="ai-study-homework">Study Hub</option>
                <option value="ai-note-taking">Note Hub</option>
                <option value="ai-productivity-tools">Productivity Hub</option>
              </select>
            </div>
            <div className="sm:col-span-1">
              <button 
                onClick={handleCreateKeyword}
                className="w-full bg-[#E8E1D2] text-black h-full py-2 font-mono hover:bg-[#B85C38] hover:text-black hover:font-bold transition-all"
              >
                <Plus className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
