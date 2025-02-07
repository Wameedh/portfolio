// src/types/article.ts
import { ComponentType } from 'react';

export interface ArticleMetadata {
  id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export interface ArticleModule {
  metadata: ArticleMetadata;
  component: ComponentType;
}

export interface ArticlesPageProps {
  articles: ArticleModule[];
}