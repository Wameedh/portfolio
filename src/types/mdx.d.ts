// src/types/mdx.d.ts
declare module '*.mdx' {
    import type { ComponentType } from 'react';
    import type { ArticleMetadata } from '../data/articles';
  
    export const metadata: ArticleMetadata;
    const MDXComponent: ComponentType;
    export default MDXComponent;
  }