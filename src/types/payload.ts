/**
 * PayloadCMS media object type.
 * Compatible with PayloadCMS upload field output.
 */
export interface PayloadMedia {
  id?: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  sizes?: Record<string, PayloadMediaSize>;
}

export interface PayloadMediaSize {
  url: string;
  width: number;
  height: number;
  filename?: string;
  mimeType?: string;
  filesize?: number;
}

/**
 * PayloadCMS link type for internal/external links.
 */
export interface PayloadLink {
  type?: 'reference' | 'custom';
  url?: string;
  reference?: {
    relationTo: string;
    value: string | { slug: string; [key: string]: unknown };
  };
  label?: string;
  newTab?: boolean;
}

/**
 * PayloadCMS rich text node types.
 */
export type PayloadRichTextNode =
  | PayloadRichTextParagraph
  | PayloadRichTextHeading
  | PayloadRichTextList
  | PayloadRichTextListItem
  | PayloadRichTextQuote
  | PayloadRichTextUpload
  | PayloadRichTextLink
  | PayloadRichTextTextNode;

export interface PayloadRichTextTextNode {
  type?: undefined;
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface PayloadRichTextParagraph {
  type: 'paragraph';
  children: PayloadRichTextNode[];
}

export interface PayloadRichTextHeading {
  type: 'heading';
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: PayloadRichTextNode[];
}

export interface PayloadRichTextList {
  type: 'list';
  listType: 'number' | 'bullet';
  children: PayloadRichTextNode[];
}

export interface PayloadRichTextListItem {
  type: 'listitem';
  children: PayloadRichTextNode[];
}

export interface PayloadRichTextQuote {
  type: 'quote';
  children: PayloadRichTextNode[];
}

export interface PayloadRichTextUpload {
  type: 'upload';
  value: PayloadMedia;
  relationTo: string;
  children: PayloadRichTextNode[];
}

export interface PayloadRichTextLink {
  type: 'link';
  url?: string;
  newTab?: boolean;
  children: PayloadRichTextNode[];
  fields?: {
    linkType?: 'custom' | 'internal';
    doc?: {
      relationTo: string;
      value: string | { slug: string };
    };
  };
}
