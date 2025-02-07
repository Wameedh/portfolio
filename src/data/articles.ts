// src/data/articles.ts
import React, { lazy } from 'react';

// Import all article metadata
// // import { metadata as reactContextMetadata } from '../articles/react-context-guide.mdx';
import { metadata as reactContextMetadata } from '../articles/react-context-guide.metadata';


import type { ComponentType } from 'react';

import { ArticleModule } from '../types/article';


const ReactContextArticle = lazy(() => import('../articles/react-context-guide.mdx'));

export const articles: ArticleModule[] = [
  {
    metadata: reactContextMetadata,
    component: ReactContextArticle
  }
  // Add more articles here as you create them
];


export const sortArticlesByDate = (articleModules: ArticleModule[]): ArticleModule[] => {
  return [...articleModules].sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });
};

// Helper functions
export const getArticleBySlug = (slug: string): ArticleModule | undefined => {
  return articles.find(article => article.metadata.slug === slug);
};

export const getArticleById = (id: string): ArticleModule | undefined => {
  return articles.find(article => article.metadata.id === id);
};

export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>();
  articles.forEach(article => {
    article.metadata.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
};

export const getArticlesByTag = (tag: string): ArticleModule[] => {
  return articles.filter(article => article.metadata.tags.includes(tag));
};

// Sort articles by date (newest first)
// export const sortArticlesByDate = (articleModules: ArticleModule[]): ArticleModule[] => {
//   return [...articleModules].sort((a, b) => {
//     const dateA = new Date(a.metadata.date);
//     const dateB = new Date(b.metadata.date);
//     return dateB.getTime() - dateA.getTime();
//   });
// };

// Get featured articles (could be based on any criteria you choose)
export const getFeaturedArticles = (count: number = 3): ArticleModule[] => {
  return sortArticlesByDate(articles).slice(0, count);
};

// Search articles by title, excerpt, or tags
export const searchArticles = (query: string): ArticleModule[] => {
  const searchTerm = query.toLowerCase();
  return articles.filter(article => {
    const { title, excerpt, tags } = article.metadata;
    return (
      title.toLowerCase().includes(searchTerm) ||
      excerpt.toLowerCase().includes(searchTerm) ||
      tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });
};

// Get related articles based on tags
export const getRelatedArticles = (currentArticle: ArticleModule, count: number = 3): ArticleModule[] => {
  return articles
    .filter(article => 
      article.metadata.id !== currentArticle.metadata.id && // Exclude current article
      article.metadata.tags.some(tag => currentArticle.metadata.tags.includes(tag)) // Has common tags
    )
    .sort((a, b) => {
      // Sort by number of matching tags
      const aMatchingTags = a.metadata.tags.filter(tag => currentArticle.metadata.tags.includes(tag)).length;
      const bMatchingTags = b.metadata.tags.filter(tag => currentArticle.metadata.tags.includes(tag)).length;
      return bMatchingTags - aMatchingTags;
    })
    .slice(0, count);
};

// Get pagination data
export const getPaginatedArticles = (page: number = 1, perPage: number = 6): {
  articles: ArticleModule[];
  totalPages: number;
  currentPage: number;
} => {
  const sortedArticles = sortArticlesByDate(articles);
  const totalPages = Math.ceil(sortedArticles.length / perPage);
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return {
    articles: sortedArticles.slice(start, end),
    totalPages,
    currentPage
  };
};