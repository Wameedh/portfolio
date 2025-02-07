// src/components/articles/ArticlePage.tsx
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'react-router-dom';
import { CodeExample, Note } from './mdx-components';

interface ArticleMetadata {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  slug: string;
}

interface ArticlePageProps {
  metadata: ArticleMetadata;
  children: React.ReactNode;
}

const components = {
  h1: (props: any) => <h1 className="article-h1" {...props} />,
  h2: (props: any) => <h2 className="article-h2" {...props} />,
  h3: (props: any) => <h3 className="article-h3" {...props} />,
  p: (props: any) => <p className="article-paragraph" {...props} />,
  blockquote: (props: any) => <blockquote className="article-blockquote" {...props} />,
  code: (props: any) => <code className="article-code" {...props} />,
  pre: (props: any) => <pre className="article-pre" {...props} />,
  CodeExample,
  Note
};

const ArticlePage: React.FC<ArticlePageProps> = ({ metadata, children }) => {
  return (
    <div className="creative-portfolio__article-detail">
      <div className="container">
        <Link to="/articles" className="back-link">
          ← Back to Articles
        </Link>
        
        <header className="article-header">
          <h1>{metadata.title}</h1>
          <div className="meta">
            <span>{metadata.date}</span>
            <span>{metadata.readTime} min read</span>
            <span>{metadata.author}</span>
          </div>
          <div className="tags">
            {metadata.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </header>

        <MDXProvider components={components}>
          <article className="article-content">
            {children}
          </article>
        </MDXProvider>
      </div>
    </div>
  );
};

export default ArticlePage;