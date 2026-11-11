/**
 * Parse the outline string from the backend into an ordered list of items.
 * Handles markdown headings (##, ###), numbered lists, and bullet lists.
 */
export function parseOutlineItems(outline: string): string[] {
  const lines = outline.split("\n");
  const items: string[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    // Skip the title heading (#  or #  Title)
    if (/^#\s/.test(line)) continue;

    // ## Heading → strip ##
    const headingMatch = line.match(/^#{1,6}\s+(.+)/);
    if (headingMatch) {
      items.push(headingMatch[1].trim());
      continue;
    }

    // Numbered list: "1. Item" or "1) Item"
    const numberedMatch = line.match(/^\d+[.)]\s+(.+)/);
    if (numberedMatch) {
      items.push(numberedMatch[1].trim());
      continue;
    }

    // Bullet list: "- Item" or "* Item"
    const bulletMatch = line.match(/^[-*+]\s+(.+)/);
    if (bulletMatch) {
      items.push(bulletMatch[1].trim());
      continue;
    }
  }

  return items;
}

/**
 * Extract only H2-level headings from the rendered markdown content
 * so we can drive the Outline Nav panel from the article body.
 */
export function parseArticleHeadings(content: string): string[] {
  return content
    .split("\n")
    .filter((l) => /^##\s/.test(l.trim()))
    .map((l) => l.replace(/^##\s+/, "").trim());
}

/** Slugify a heading for use as an id attribute */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
