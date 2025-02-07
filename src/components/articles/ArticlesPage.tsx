// src/components/articles/ArticlesPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArticleMetadata, ArticlesPageProps } from '../../types/article';
import { ArticleCard } from './ArticleCard'


const ArticlesPage: React.FC<ArticlesPageProps> = ({ articles }) => {
  return (
    <div className="creative-portfolio__articles">
      <div className="container">
        <h1>Articles</h1>
        <p className="subtitle">
          Sharing insights and experiences from my journey in software development
        </p>
        
        <div className="articles-grid">
          {articles.map(({ metadata }) => (
            <ArticleCard key={metadata.id} article={metadata} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;