// src/components/articles/mdx-components/index.tsx
import React from 'react';
import type { HTMLAttributes, ImgHTMLAttributes, AnchorHTMLAttributes } from 'react';


export const CodeExample: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="code-example">
    {children}
  </div>
);

// Add other MDX-specific components here if needed
export const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="note">
    <div className="note-icon">💡</div>
    <div className="note-content">{children}</div>
  </div>
);

export const Warning: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div className="article-warning" {...props}>
    <div className="warning-icon">⚠️</div>
    <div className="warning-content">{children}</div>
  </div>
);

export const Tip: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div className="article-tip" {...props}>
    <div className="tip-icon">💪</div>
    <div className="tip-content">{children}</div>
  </div>
);

interface DemoProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const Demo: React.FC<DemoProps> = ({ title, children, ...props }) => (
  <div className="article-demo" {...props}>
    {title && <div className="demo-title">{title}</div>}
    <div className="demo-content">{children}</div>
  </div>
);

export const H1: React.FC<HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h1 className="article-h1" {...props} />
);

export const H2: React.FC<HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h2 className="article-h2" {...props} />
);

export const H3: React.FC<HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h3 className="article-h3" {...props} />
);

export const InlineCode: React.FC<HTMLAttributes<HTMLElement>> = (props) => (
  <code className="inline-code" {...props} />
);

export const ArticleLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, ...props }) => (
  <a
    className="article-link"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
);

interface ArticleImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  caption?: string;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({ caption, alt, ...props }) => (
  <figure className="article-figure">
    <img className="article-image" alt={alt} {...props} />
    {caption && <figcaption className="article-caption">{caption}</figcaption>}
  </figure>
);