import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MMHero } from "../../components/projects/mustang-motion/MMHero";
import { MMSpecPanel } from "../../components/projects/mustang-motion/MMSpecPanel";
import { MMClinicalPanel } from "../../components/projects/mustang-motion/MMClinicalPanel";
import { MMTechSpecs } from "../../components/projects/mustang-motion/MMTechSpecs";
import { Navbar } from "../../components/layout/Navbar";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/content/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7FB] flex items-center justify-center font-sans">
        <p className="text-gray-500 font-medium font-serif">Loading project details...</p>
      </div>
    );
  }

  // Find project
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8F7FB] flex flex-col items-center justify-center font-sans">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-serif">Project Not Found</h2>
        <p className="text-gray-500 mb-6">The project you are looking for does not exist or has been moved.</p>
        <Link to="/projects" className="px-4 py-2 bg-wu-purple text-white text-sm font-semibold rounded hover:bg-wu-purple-light transition-colors">
          Back to Projects
        </Link>
      </div>
    );
  }

  // Render specific layout for MustangMotion
  const isMustangMotion = project.id === "mustangmotion";

  // Helper to extract YouTube/Vimeo embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const youtubeReg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const ytMatch = url.match(youtubeReg);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    const vimeoReg = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|showcase\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
    const vimeoMatch = url.match(vimeoReg);
    if (vimeoMatch && vimeoMatch[4]) {
      return `https://player.vimeo.com/video/${vimeoMatch[4]}`;
    }
    return url;
  };

  // Simple Markdown to HTML parser supporting clinical tables and lists
  const renderMarkdown = (mdText) => {
    if (!mdText) return "";
    
    const lines = mdText.replace(/\r\n/g, "\n").split("\n");
    const blocks = [];
    let currentBlock = null;

    const parseInline = (text) => {
      let t = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      t = t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      t = t.replace(/__(.*?)__/g, "<strong>$1</strong>");
      t = t.replace(/\*(.*?)\*/g, "<em>$1</em>");
      t = t.replace(/_(.*?)_/g, "<em>$1</em>");
      return t;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!trimmed) {
        if (currentBlock) {
          blocks.push(currentBlock);
          currentBlock = null;
        }
        continue;
      }

      if (trimmed.startsWith("#")) {
        if (currentBlock) {
          blocks.push(currentBlock);
          currentBlock = null;
        }
        let level = 0;
        while (trimmed[level] === "#") {
          level++;
        }
        const text = trimmed.slice(level).trim();
        const inlineText = parseInline(text);
        if (level === 1) {
          blocks.push({ type: "h1", html: `<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-950 font-serif">${inlineText}</h2>` });
        } else if (level === 2) {
          blocks.push({ type: "h2", html: `<h3 class="text-xl font-bold mt-6 mb-3 text-gray-950 font-serif">${inlineText}</h3>` });
        } else {
          blocks.push({ type: "h3", html: `<h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800 font-serif">${inlineText}</h4>` });
        }
        continue;
      }

      if (trimmed.startsWith("|")) {
        if (currentBlock && currentBlock.type !== "table") {
          blocks.push(currentBlock);
          currentBlock = null;
        }
        if (!currentBlock) {
          currentBlock = { type: "table", lines: [] };
        }
        currentBlock.lines.push(trimmed);
        continue;
      }

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        if (currentBlock && currentBlock.type !== "list") {
          blocks.push(currentBlock);
          currentBlock = null;
        }
        if (!currentBlock) {
          currentBlock = { type: "list", lines: [] };
        }
        currentBlock.lines.push(trimmed);
        continue;
      }

      if (currentBlock && currentBlock.type !== "paragraph") {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      if (!currentBlock) {
        currentBlock = { type: "paragraph", lines: [] };
      }
      currentBlock.lines.push(line);
    }

    if (currentBlock) {
      blocks.push(currentBlock);
    }

    const formattedBlocks = blocks.map((b) => {
      if (b.type === "h1" || b.type === "h2" || b.type === "h3") {
        return b.html;
      }
      
      if (b.type === "list") {
        const items = b.lines.map((l) => {
          const content = l.replace(/^[-*]\s+/, "");
          return `<li class="ml-4 list-disc text-sm text-gray-600 leading-relaxed">${parseInline(content)}</li>`;
        });
        return `<ul class="mb-4 space-y-1">${items.join("\n")}</ul>`;
      }

      if (b.type === "table") {
        const rows = b.lines;
        if (rows.length < 2) return rows.map(r => `<p class="mb-4 leading-relaxed text-sm text-gray-600">${parseInline(r)}</p>`).join("\n");
        
        const headerCols = rows[0]
          .split("|")
          .map(c => c.trim())
          .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
        
        const sepCols = rows[1]
          .split("|")
          .map(c => c.trim())
          .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
        
        const alignments = sepCols.map(col => {
          if (col.startsWith(":") && col.endsWith(":")) return "center";
          if (col.endsWith(":")) return "right";
          return "left";
        });

        let tableHtml = '<div class="overflow-x-auto my-6 border border-[#E8E4F0] rounded-none"><table class="w-full text-sm text-left border-collapse">';
        tableHtml += '<thead><tr class="bg-[#FDFCFF] border-b border-[#E8E4F0]">';
        headerCols.forEach((col, idx) => {
          const align = alignments[idx] || "left";
          tableHtml += `<th class="px-8 py-3.5 text-${align} text-xs font-semibold uppercase tracking-widest text-gray-400 border-r border-[#E8E4F0] last:border-r-0">${parseInline(col)}</th>`;
        });
        tableHtml += '</tr></thead>';

        tableHtml += '<tbody>';
        for (let r = 2; r < rows.length; r++) {
          const cols = rows[r]
            .split("|")
            .map(c => c.trim())
            .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
          
          tableHtml += '<tr class="border-b border-[#E8E4F0] last:border-b-0 hover:bg-[#FDFCFF]/30 transition-colors">';
          cols.forEach((col, idx) => {
            const align = alignments[idx] || "left";
            const weightClass = idx === 0 ? "font-semibold text-gray-800" : "text-gray-600";
            tableHtml += `<td class="px-8 py-4 ${weightClass} text-${align} border-r border-[#E8E4F0] last:border-r-0">${parseInline(col)}</td>`;
          });
          tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table></div>';
        return tableHtml;
      }

      const content = b.lines.join("\n");
      return `<p class="mb-4 leading-relaxed text-sm text-gray-600">${parseInline(content)}</p>`;
    });

    return formattedBlocks.join("\n");
  };

  const renderContentBlocks = () => {
    if (!project.content_blocks || !Array.isArray(project.content_blocks)) return null;

    return project.content_blocks.map((block, index) => {
      switch (block.type) {
        case "text_block":
          return (
            <section key={index} className="bg-white rounded-none p-8 border border-[#E8E4F0] mb-8 shadow-[0_1px_4px_rgba(79,38,131,0.02)]">
              {block.title && (
                <h2 className="text-2xl font-bold mb-4 font-serif text-gray-900 break-words text-left">
                  {block.title}
                </h2>
              )}
              <div 
                className="text-sm text-gray-600 leading-relaxed break-words text-left"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(block.text) }} 
              />
            </section>
          );
        case "gallery_block": {
          const hasImages = block.images && block.images.length > 0;
          if (!hasImages) return null;
          const isSingle = block.images.length === 1;

          return (
            <section key={index} className="bg-white rounded-none p-8 border border-[#E8E4F0] mb-8 shadow-[0_1px_4px_rgba(79,38,131,0.02)]">
              <div className={`grid gap-6 ${isSingle ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                {block.images.map((item, imgIdx) => (
                  <div key={imgIdx} className="flex flex-col border border-[#E8E4F0] p-1 bg-[#FDFCFF] rounded-none">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.caption || `Gallery item ${imgIdx + 1}`}
                        className="w-full h-auto object-cover rounded-none"
                      />
                    )}
                    {item.caption && (
                      <p className="mt-3 text-xs text-gray-500 font-mono uppercase tracking-wider text-left border-l-2 border-wu-purple pl-3">
                        {item.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        }
        case "video_block": {
          const embedUrl = getEmbedUrl(block.video_url);
          return (
            <section key={index} className="bg-white rounded-none p-8 border border-[#E8E4F0] mb-8 shadow-[0_1px_4px_rgba(79,38,131,0.02)]">
              {embedUrl ? (
                <div className="aspect-video w-full border border-[#E8E4F0] rounded-none bg-[#FDFCFF] p-1">
                  <iframe
                    src={embedUrl}
                    title="Project Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full rounded-none"
                  />
                </div>
              ) : (
                <div className="p-6 text-center text-sm text-gray-400 border border-dashed border-gray-200">
                  Invalid video URL provided.
                </div>
              )}
            </section>
          );
        }
        case "pdf_block": {
          const hasFile = block && block.file;
          if (!hasFile) return null;

          return (
            <section key={index} className="bg-white rounded-none p-8 border border-[#E8E4F0] mb-8 shadow-[0_1px_4px_rgba(79,38,131,0.02)] flex justify-center">
              <a 
                href={block.file}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 p-4 border border-gray-300 rounded-none hover:bg-gray-50 hover:border-gray-400 transition-colors w-full max-w-xl text-left"
              >
                <div className="flex-shrink-0 bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 text-xs font-mono font-bold tracking-wider rounded-none">
                  PDF
                </div>
                <div className="flex-grow min-w-0 pr-4">
                  <span className="block text-sm font-semibold text-gray-900 truncate">
                    {block.title || "Technical Document"}
                  </span>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mt-0.5">
                    Click to view attachment
                  </span>
                </div>
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </section>
          );
        }
        default:
          return null;
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F7FB] font-sans antialiased text-gray-800">
      {/* ── Navbar ─────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Hero Header ────────────────────────────────────────── */}
      {isMustangMotion ? (
        <MMHero project={project} />
      ) : (
        <header 
          className="relative py-14 px-6 text-white bg-wu-purple bg-cover bg-center"
          style={project.hero_background ? { backgroundImage: `url(${project.hero_background})` } : {}}
        >
          {project.hero_background && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B1A6A]/95 via-[#4F2683]/90 to-[#4F2683]/75 pointer-events-none" />
          )}
          <div className="relative z-10 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{project.title}</h1>
            <p className="text-lg leading-relaxed max-w-2xl opacity-80">{project.tagline}</p>
          </div>
        </header>
      )}

      {/* ── Main Content ───────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-14">
        {/* The Problem Section */}
        <section className="bg-white rounded-xl p-8 border border-[#E8E4F0] mb-8">
          <h2 className="text-2xl font-bold mb-4 font-serif text-gray-900">The Problem</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {project.detail.problem}
          </p>
        </section>

        {/* Dynamic Blocks */}
        {renderContentBlocks()}

        {/* MustangMotion Specific Sections */}
        {isMustangMotion && (
          <>
            {(!project.content_blocks || project.content_blocks.length === 0) && (
              <>
                <MMSpecPanel mechanical={project.detail.mechanical} />
                <MMClinicalPanel clinical={project.detail.clinical} />
                <MMTechSpecs specs={project.detail.specs} />
              </>
            )}

            {/* Competition Highlight */}
            <section className="bg-white rounded-xl p-8 border border-[#E8E4F0] mb-8">
              <h2 className="text-2xl font-bold mb-4 font-serif text-gray-900">Competition Highlight</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                MustangMotion was WE-BMC's entry into the 2024 True North Biomedical Competition — where the device earned <strong className="text-gray-800 font-semibold">1st place provincially</strong> and <strong className="text-gray-800 font-semibold">4th place nationally</strong> among all Canadian university teams.
              </p>
              <Link to="/competitions" className="inline-flex items-center gap-1 text-sm font-semibold text-wu-purple hover:text-wu-purple-light transition-colors">
                View competition details & achievements →
              </Link>
            </section>
          </>
        )}

        {/* Back Link */}
        <div className="mt-12">
          <Link to="/projects" className="text-sm font-semibold text-wu-purple hover:text-wu-purple-light transition-colors inline-flex items-center gap-1">
            ← Back to all projects
          </Link>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-[#E8E4F0]">
        © 2024 Western Engineering Biomedical Engineering Club · Western University, London, Ontario
      </footer>
    </div>
  );
}
