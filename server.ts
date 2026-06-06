import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini Client safely
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      console.log("Gemini API Client initialized successfully.");
    } catch (err) {
      console.error("Failed to initialize Gemini client:", err);
    }
  } else {
    console.warn("WARNING: GEMINI_API_KEY is not defined or is placeholder. Server-side AI generation will run with mock fallbacks.");
  }

  // --- API ROUTES ---

  // SEO Crawling Fallbacks
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *\nAllow: /\n\nSitemap: https://ai-tools-ten-mu.vercel.app/sitemap.xml`);
  });

  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ai-tools-ten-mu.vercel.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ai-tools-ten-mu.vercel.app/best-ai-homework-helper-tools</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ai-tools-ten-mu.vercel.app/best-ai-note-taking-tools-for-students</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ai-tools-ten-mu.vercel.app/best-ai-productivity-tools-for-students</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
  });

  app.get("/googlea8cef84cd47f0db0.html", (_req, res) => {
    res.type("html");
    res.send("google-site-verification: googlea8cef84cd47f0db0.html");
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Programmatic Page Generation Endpoint
  app.post("/api/generate-page", async (req, res) => {
    const { keyword, categorySlug, templateName, pattern, optionalNotes } = req.body;

    if (!keyword || !categorySlug) {
      return res.status(400).json({ error: "Missing required parameters: keyword and categorySlug are mandatory." });
    }

    const categoryTitle = categorySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

    // If Gemini client is not initialized, generate a gorgeous mock article with delay
    if (!ai) {
      console.log("Gemini client is not active. Using mock programmatic generator pattern...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const generatedPage = createMockProgrammaticPage(keyword, categorySlug, categoryTitle, pattern, optionalNotes);
      return res.json({ success: true, page: generatedPage, isMock: true });
    }

    try {
      const prompt = `
        You are an elite programmatic SEO content architect and technical assistant for our authority site: "AI Tools for Students" (PrairieSignal visual context).
        Task: Create a highly structured, SEO-optimized, engaging, human-readable SEO money article page targeting the student search intent for the keyword: "${keyword}".
        Category of target: ${categoryTitle} (${categorySlug}).
        Template Mode: "${templateName}" (Pattern style: "${pattern}").
        Additional notes or insights from author: "${optionalNotes || 'None'}".

        Guidelines:
        1. Write engaging, high-intent academic or student productivity styled content (Inter body, Instrument Serif feeling). No fluff or obvious AI filler words, no redundant intros. Use clear headers.
        2. Make sure you structure a title that is optimized for Google click rates (e.g. "Best AI X for Students of 2026: Tried & Ranked").
        3. Formulate a comprehensive comparison table comparing 2-3 top tools (such as Grammarly Premium, Notion AI, Quizlet Plus, ChatGPT, Copy.ai etc.). Give accurate pros/cons feel in the description.
        4. Organize the breakdown into structured headings (H2 or H3).
        5. Build 2-3 logical, frequently asked student search questions in the FAQs.
        6. End with an authority conclusion that recommends a primary affiliate product from the test suite.
      `;

      console.log("Sending generate content request to gemini-3.5-flash...");
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an expert copywriter specialized in student-grade academic SaaS reviews. You output fully compliant JSON objects that represent a perfectly structured study review money page.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Descriptive click-worthy optimized page heading" },
              introduction: { type: Type.STRING, description: "SEO intro matching search intent (approx 80-120 words)." },
              contentSections: {
                type: Type.ARRAY,
                description: "Array of body breakdown blocks",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    heading: { type: Type.STRING },
                    level: { type: Type.INTEGER, description: "Must be 2 or 3" },
                    body: { type: Type.STRING, description: "Highly engaging paragraph analyzing tools or workflows. Use markdown-style double-asterisk formatting for bolding occasionally." }
                  },
                  required: ["heading", "level", "body"]
                }
              },
              comparisonTable: {
                type: Type.ARRAY,
                description: "Matrix of compared products",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    productName: { type: Type.STRING },
                    rating: { type: Type.STRING, description: "Rating score e.g. 4.8/5" },
                    accuracy: { type: Type.STRING, description: "Accuracy or quality grade (e.g. Excellent, Very Good, Decent)" },
                    pricing: { type: Type.STRING, description: "Shorthand pricing description (e.g. Free, $8.00/mo)" },
                    bestFor: { type: Type.STRING, description: "A brief phrase representing best use case (e.g. Bullet outlines)" }
                  },
                  required: ["productName", "rating", "accuracy", "pricing", "bestFor"]
                }
              },
              faqs: {
                type: Type.ARRAY,
                description: "2-3 dynamic questions and direct student answers",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    answer: { type: Type.STRING }
                  },
                  required: ["question", "answer"]
                }
              },
              conclusion: { type: Type.STRING, description: "Dynamic final verdict advising students on budget and efficiency (approx 60-90 words)." }
            },
            required: ["title", "introduction", "contentSections", "comparisonTable", "faqs", "conclusion"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Received empty response from Gemini model.");
      }

      const parsedJSON = JSON.parse(responseText.trim());

      // Map dynamic JSON payload to MoneyPage format
      const pageId = keyword.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-");
      const generatedPage = {
        id: pageId,
        slug: pageId,
        title: parsedJSON.title || `Best ${keyword} Tools for Students`,
        targetKeyword: keyword,
        parentCategorySlug: categorySlug,
        introduction: parsedJSON.introduction || "This guide helps students parse the top options in modern university software assistance.",
        contentSections: parsedJSON.contentSections || [],
        featuredProductId: "grammarly", // fallback to global review
        productReviewIds: ["grammarly", "quillbot", "notion-ai"],
        comparisonTable: parsedJSON.comparisonTable || [],
        faqs: parsedJSON.faqs || [],
        conclusion: parsedJSON.conclusion || "Review the specs above and configure your custom workflow.",
        views: Math.floor(Math.random() * 50) + 12,
        isCustomGenerated: true,
        creationDate: new Date().toISOString().split("T")[0]
      };

      return res.json({ success: true, page: generatedPage, isMock: false });
    } catch (error: any) {
      console.error("Gemini page generation failed:", error);
      // Fallback to high-quality mock on error to maintain robust flow
      const pageId = keyword.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-");
      const generatedPage = createMockProgrammaticPage(keyword, categorySlug, categoryTitle, pattern, optionalNotes);
      return res.json({
        success: true,
        page: generatedPage,
        isMock: true,
        warning: "Gemini server failed or was rate limited. Standard program templates were used to generate the page details instead.",
        errorTrace: error.message
      });
    }
  });

  // Serve static assets and handle client-side fallback
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Generates high quality templated layouts in case API keys are pending or hit queries limit
function createMockProgrammaticPage(keyword: string, categorySlug: string, categoryTitle: string, pattern: string, notes?: string) {
  const pageId = keyword.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-");

  let intro = `Finding the absolute best ${keyword} can determine how quickly you draft your coursework. With the rapid evolution of technology in 2026, students need reliable, budget-friendly choices to write, parse, and study. Our team analyzed standard solutions specifically targeting student efficiency.`;
  if (notes) {
    intro += ` In line with your parameters (${notes}), we focused heavily on customizable features and student discounts.`;
  }

  return {
    id: pageId,
    slug: pageId,
    title: `Best ${keyword && keyword.charAt(0).toUpperCase() + keyword.slice(1)}: Tested Student Guide (2026)`,
    targetKeyword: keyword,
    parentCategorySlug: categorySlug,
    introduction: intro,
    contentSections: [
      {
        heading: `Evaluating Contemporary ${keyword} Alternatives`,
        level: 2,
        body: `Our benchmark checks took place over multiple intensive semester courses. We analyzed accuracy (eliminating false citations and grammar bugs), speed of outline drafting, and cost accessibility. Modern SaaS software should allow you to automate standard outlines without locking essential grammar corrections behind expensive payment plans.`
      },
      {
        heading: "Crucial Features for College Study Scenarios",
        level: 3,
        body: "Ensure your selected tool features robust cloud storage, easy word count exports, and custom templates. Using these assistants allows you to save hours of raw manual text re-formatting weekly."
      },
      {
        heading: `Which Student Workspace Pick Fits Your Intent?`,
        level: 2,
        body: "Look at your typical workload. If you are drafting multiple weekly history papers or law abstracts, a long-form rewriting assistant is indispensable. If you are memorizing chemistry formulas, opt for flashcard-based smart Q-Chat blocks."
      }
    ],
    featuredProductId: "grammarly",
    productReviewIds: ["grammarly", "quillbot", "notion-ai"],
    comparisonTable: [
      { productName: "Grammarly Premium", rating: "4.9/5", accuracy: "Outstanding", pricing: "$12.00/mo", bestFor: "Refining Essays" },
      { productName: "Quillbot Premium", rating: "4.8/5", accuracy: "Very Good", pricing: "$9.95/mo", bestFor: "Paraphrasing Research" },
      { productName: "Notion AI Student", rating: "4.7/5", accuracy: "Excellent", pricing: "$8.00/mo", bestFor: "Organization Hub" }
    ],
    faqs: [
      { question: `Is using ${keyword} safe for my academic record?`, answer: "Absolutely. When used as a research, outlining, or editing platform, this software enhances overall composition quality without producing ethical concerns." },
      { question: "Are student discounts available?", answer: "Yes, many of these providers offer a 20% to 50% discount on college student email verification." }
    ],
    conclusion: `Pairing an organizing notebook like Notion Student with an automated spelling corrector is the ultimate setup. Select a primary tool matching your most common study bottlenecks to maximize your grades while protecting your wallet.`,
    views: Math.floor(Math.random() * 30) + 10,
    isCustomGenerated: true,
    creationDate: new Date().toISOString().split("T")[0]
  };
}

startServer().catch((err) => {
  console.error("Critical server startup crash:", err);
});
