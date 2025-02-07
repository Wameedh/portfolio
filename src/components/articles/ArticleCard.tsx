import React from 'react';
import { Link } from 'react-router-dom';
// import { ArticleMetadata } from '../../data/articles';
import { ArticleMetadata, ArticlesPageProps } from '../../types/article';
interface ArticleCardProps {
    article: ArticleMetadata;
  }
  
  const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    return (
      <Link to={`/articles/${article.slug}`} className="article-card">
        <div className="card-content">
          <div className="meta">
            <span>{article.date}</span>
            <span>{article.readTime} min read</span>
          </div>
          <h3>{article.title}</h3>
          <p className="excerpt">{article.excerpt}</p>
          <div className="tags">
            {article.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </Link>
    );
  };

export { ArticleCard };
// export default ArticleCard;