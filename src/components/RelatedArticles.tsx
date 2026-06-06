import React from 'react';

interface ArticleLink {
  title: string;
  path: string;
  slug: string;
  description: string;
}

interface RelatedArticlesProps {
  currentPath: string;
  onNavigateToPage?: (slug: string) => void;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentPath, onNavigateToPage }) => {
  const articles: ArticleLink[] = [
    {
      title: "Best AI Homework Helper Tools",
      path: "/best-ai-homework-helper-tools",
      slug: "best-ai-homework-helper-tools",
      description: "Struggling with tough assignments? Check out the top AI tools for problem-solving."
    },
    {
      title: "Best AI Note-Taking Tools",
      path: "/best-ai-note-taking-tools-for-students",
      slug: "best-ai-note-taking-tools-for-students",
      description: "Can't keep up with lectures? Transform live audio into perfect study guides."
    },
    {
      title: "Best AI Productivity Tools",
      path: "/best-ai-productivity-tools-for-students",
      slug: "best-ai-productivity-tools-for-students",
      description: "Stop procrastinating. Optimize your calendar and crush your weekly tasks."
    }
  ];

  // Filter out the article the user is currently reading
  const filteredArticles = articles.filter(art => art.path !== currentPath && `/${art.slug}` !== currentPath);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (onNavigateToPage) {
      e.preventDefault();
      onNavigateToPage(slug);
    }
  };

  return (
    <div className="my-12 border-t border-[#3C3A36]/60 pt-8 space-y-4">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-[#B85C38]" />
        <h3 className="font-serif text-lg font-light text-[#E8E1D2]">Read Next to Level Up Your Studies</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map((art, index) => (
          <a 
            key={index} 
            href={art.path}
            onClick={(e) => handleClick(e, art.slug)}
            className="block p-4 border border-[#3C3A36] bg-[#1a1816]/30 hover:border-[#B85C38] hover:bg-[#1a1816]/60 transition-colors duration-150 rounded-none group"
          >
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#B85C38] group-hover:text-white font-bold mb-1">{art.title}</h4>
            <p className="font-sans text-xs text-[#8C8678] font-normal leading-relaxed">{art.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};
