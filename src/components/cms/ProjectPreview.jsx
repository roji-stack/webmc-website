import React from 'react';
import { Link } from 'react-router-dom';

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

export default function ProjectPreview({ entry, getAsset }) {
  const rawData = entry.getIn(['data']);
  if (!rawData) return <div className="p-8 text-center text-gray-500 font-serif">Loading preview data...</div>;

  const data = rawData.toJS();
  
  // Detect if the data is the file data (contains a projects array) or a single project
  let projectsList = [];
  if (data && Array.isArray(data.projects)) {
    projectsList = data.projects;
  } else if (data && data.title) {
    projectsList = [data];
  } else {
    projectsList = [];
  }

  if (projectsList.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 font-serif border border-dashed border-gray-200 bg-white">
        No projects available in the list. Add a project on the left panel to begin.
      </div>
    );
  }

  // Status Badge representation
  const renderStatusBadge = (statusVal) => {
    let styles = "bg-gray-100 text-gray-600 border-gray-200";
    if (statusVal === "active") styles = "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (statusVal === "completed") styles = "bg-indigo-50 text-indigo-700 border-indigo-200";
    
    return (
      <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-none font-semibold border ${styles}`}>
        {statusVal || "draft"}
      </span>
    );
  };

  return (
    <div className="space-y-16 bg-[#F8F7FB] min-h-screen p-4">
      {projectsList.map((project, pIdx) => {
        if (!project) return null;
        
        const { 
          title = "Untitled Project", 
          tagline = "Project tagline placeholder", 
          status = "draft", 
          year = 2026, 
          disciplines = [], 
          hero_background, 
          detail = {}, 
          content_blocks = [] 
        } = project;

        // Resolve background asset
        const resolvedBg = hero_background ? getAsset(hero_background)?.toString() : null;
        const headerStyle = resolvedBg ? { backgroundImage: `url(${resolvedBg})` } : {};

        return (
          <div key={pIdx} className="border-b-4 border-gray-300 pb-16 last:border-0 last:pb-0">
            {/* Hero Header */}
            <header 
              className="relative py-14 px-6 text-white bg-wu-purple bg-cover bg-center"
              style={headerStyle}
            >
              {resolvedBg && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#3B1A6A]/95 via-[#4F2683]/90 to-[#4F2683]/75 pointer-events-none" />
              )}
              <div className="relative z-10 max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-none bg-[#EEEDFE] text-wu-purple">
                    {year}
                  </span>
                  {renderStatusBadge(status)}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
                  {title}
                </h1>
                <p className="text-lg leading-relaxed max-w-2xl opacity-80 mb-6">
                  {tagline}
                </p>
                <div className="flex flex-wrap gap-2">
                  {disciplines && disciplines.map((d) => (
                    <span
                      key={d}
                      className="text-xs px-3 py-1 rounded-none bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-medium"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-14">
              {/* Problem Section */}
              {detail && detail.problem && (
                <section className="bg-white rounded-none p-8 border border-[#E8E4F0] mb-8 shadow-[0_1px_4px_rgba(79,38,131,0.02)]">
                  <h2 className="text-2xl font-bold mb-4 font-serif text-gray-900">The Problem</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {detail.problem}
                  </p>
                </section>
              )}

              {/* Dynamic Blocks */}
              {content_blocks && content_blocks.map((block, index) => {
                if (!block) return null;
                
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
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(block.text || "") }} 
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
                          {block.images.map((item, imgIdx) => {
                            if (!item) return null;
                            const imgSrc = item.image ? getAsset(item.image)?.toString() || item.image : '';
                            return (
                              <div key={imgIdx} className="flex flex-col border border-[#E8E4F0] p-1 bg-[#FDFCFF] rounded-none">
                                {imgSrc && (
                                  <img
                                    src={imgSrc}
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
                            );
                          })}
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
                            No video URL provided.
                          </div>
                        )}
                      </section>
                    );
                  }
                  default:
                    return null;
                }
              })}

              {/* Back Link Simulation */}
              <div className="mt-12">
                <Link to="/projects" className="text-sm font-semibold text-wu-purple hover:text-wu-purple-light transition-colors inline-flex items-center gap-1">
                  ← Back to all projects (Preview Mode)
                </Link>
              </div>
            </main>
          </div>
        );
      })}
    </div>
  );
}
