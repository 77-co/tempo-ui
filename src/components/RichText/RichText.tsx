import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { PayloadRichTextNode } from '../../types/payload';

export interface RichTextProps {
  content: PayloadRichTextNode[];
  className?: string;
  /** Custom renderer for specific node types */
  overrides?: Partial<Record<string, (node: PayloadRichTextNode, children: ReactNode) => ReactNode>>;
}

/**
 * Renders PayloadCMS Lexical/Slate rich text output to styled HTML.
 * Applies consistent typography styling from the theme tokens.
 */
export function RichText({ content, className, overrides }: RichTextProps) {
  return (
    <div className={cn('prose prose-neutral dark:prose-invert max-w-none', 'text-body text-foreground', className)}>
      {content.map((node, i) => renderNode(node, i, overrides))}
    </div>
  );
}

function renderNode(
  node: PayloadRichTextNode,
  key: number | string,
  overrides?: RichTextProps['overrides']
): ReactNode {
  // Text node
  if (!('type' in node) || node.type === undefined) {
    const textNode = node as { text: string; bold?: boolean; italic?: boolean; underline?: boolean; strikethrough?: boolean; code?: boolean };
    let el: ReactNode = textNode.text;
    if (textNode.bold) el = <strong key={key}>{el}</strong>;
    if (textNode.italic) el = <em key={key}>{el}</em>;
    if (textNode.underline) el = <u key={key}>{el}</u>;
    if (textNode.strikethrough) el = <s key={key}>{el}</s>;
    if (textNode.code) el = <code key={key} className="rounded bg-muted px-1 py-0.5 text-body-sm font-mono">{el}</code>;
    return el;
  }

  // Check for custom override
  if (overrides && node.type && overrides[node.type]) {
    const children = 'children' in node ? (node.children as PayloadRichTextNode[]).map((c, i) => renderNode(c, i, overrides)) : null;
    return overrides[node.type]!(node, children);
  }

  const children = 'children' in node
    ? (node.children as PayloadRichTextNode[]).map((c, i) => renderNode(c, i, overrides))
    : null;

  switch (node.type) {
    case 'paragraph':
      return <p key={key} className="mb-4 last:mb-0">{children}</p>;
    case 'heading': {
      const h = node as { tag: string; children: PayloadRichTextNode[] };
      const Tag = h.tag as keyof JSX.IntrinsicElements;
      const headingClasses: Record<string, string> = {
        h1: 'text-heading-xl font-heading font-bold mt-8 mb-4',
        h2: 'text-heading-lg font-heading font-bold mt-6 mb-3',
        h3: 'text-heading font-heading font-semibold mt-5 mb-2',
        h4: 'text-heading-sm font-heading font-semibold mt-4 mb-2',
        h5: 'text-body-lg font-heading font-medium mt-3 mb-1',
        h6: 'text-body font-heading font-medium mt-3 mb-1',
      };
      return <Tag key={key} className={headingClasses[h.tag] || ''}>{children}</Tag>;
    }
    case 'list': {
      const list = node as { listType: string; children: PayloadRichTextNode[] };
      return list.listType === 'number'
        ? <ol key={key} className="mb-4 ml-6 list-decimal">{children}</ol>
        : <ul key={key} className="mb-4 ml-6 list-disc">{children}</ul>;
    }
    case 'listitem':
      return <li key={key} className="mb-1">{children}</li>;
    case 'quote':
      return <blockquote key={key} className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">{children}</blockquote>;
    case 'link': {
      const link = node as { url?: string; newTab?: boolean; children: PayloadRichTextNode[] };
      return <a key={key} href={link.url} target={link.newTab ? '_blank' : undefined} rel={link.newTab ? 'noopener noreferrer' : undefined} className="text-primary underline underline-offset-2 hover:text-primary/80">{children}</a>;
    }
    case 'upload': {
      const upload = node as { value: { url: string; alt?: string } };
      return <img key={key} src={upload.value.url} alt={upload.value.alt || ''} className="my-4 rounded-md" loading="lazy" />;
    }
    default:
      return <span key={key}>{children}</span>;
  }
}
