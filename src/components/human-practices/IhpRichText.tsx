import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Cite } from "../article/References";

const CITATION_KEYS: Record<string, string> = {
  ISO14040_2006: "ISO14040",
  ISO14044_2006: "ISO14044",
  KeAi2026GreenCarbon: "KeAiGreenCarbon2026",
  Liu2023CBS: "liu2023cornbioconversion",
};

const TOKEN_PATTERN =
  /(\*\*[\s\S]+?\*\*|\*[^*\n]+?\*|\[[^\]]+\]\([^)]+\)|\{\{cite:[^}]+\}\})/g;

function citationKey(key: string) {
  return CITATION_KEYS[key] ?? key;
}

function renderInline(text: string, prefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let tokenIndex = 0;

  for (const match of text.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    const token = match[0];
    if (index > cursor) {
      nodes.push(text.slice(cursor, index));
    }

    const key = `${prefix}-${tokenIndex}`;
    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={key}>
          {renderInline(token.slice(2, -2), `${key}-strong`)}
        </strong>,
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      nodes.push(
        <em key={key}>{renderInline(token.slice(1, -1), `${key}-em`)}</em>,
      );
    } else if (token.startsWith("{{cite:")) {
      const keys = token
        .slice("{{cite:".length, -2)
        .split(",")
        .map((entry) => citationKey(entry.trim()))
        .filter(Boolean);
      nodes.push(<Cite key={key} k={keys} />);
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const [, label, href] = link;
        nodes.push(
          href.startsWith("/") ? (
            <Link to={href} key={key}>
              {renderInline(label, `${key}-link`)}
            </Link>
          ) : (
            <a href={href} key={key}>
              {renderInline(label, `${key}-link`)}
            </a>
          ),
        );
      }
    }

    cursor = index + token.length;
    tokenIndex += 1;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }
  return nodes;
}

interface IhpRichTextProps {
  children: string;
  inline?: boolean;
}

export function IhpRichText({ children, inline = false }: IhpRichTextProps) {
  if (inline) {
    return <>{renderInline(children.replace(/\s+/g, " ").trim(), "inline")}</>;
  }

  const paragraphs = children
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={`paragraph-${index}`}>
          {renderInline(paragraph, `paragraph-${index}`)}
        </p>
      ))}
    </>
  );
}
