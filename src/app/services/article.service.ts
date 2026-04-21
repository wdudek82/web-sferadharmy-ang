import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly http = inject(HttpClient);

  getArticle(id: string): Observable<string> {
    const basePath = `/texts/${id}/`;
    const url = `${basePath}text.md`;

    return this.http.get(url, { responseType: 'text' }).pipe(
      map((markdown) => this.rewriteRelativeUrls(this.stripFrontmatter(markdown), basePath)),
    );
  }

  private stripFrontmatter(markdown: string): string {
    if (!markdown.startsWith('---')) {
      return markdown;
    }

    const endIndex = markdown.indexOf('\n---', 3);
    if (endIndex === -1) {
      return markdown;
    }

    return markdown.slice(endIndex + 4).replace(/^\s+/, '');
  }

  private rewriteRelativeUrls(markdown: string, basePath: string): string {
    const normalizeUrl = (url: string) => {
      if (url.startsWith('./')) {
        return `${basePath}${url.slice(2)}`;
      }

      return url;
    };

    let content = markdown;

    content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
      if (!url.startsWith('./')) {
        return match;
      }

      return `![${alt}](${normalizeUrl(url)})`;
    });

    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      if (!url.startsWith('./')) {
        return match;
      }

      return `[${text}](${normalizeUrl(url)})`;
    });

    content = content.replace(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi, (match, url) => {
      if (!url.startsWith('./')) {
        return match;
      }

      return match.replace(url, normalizeUrl(url));
    });

    return content;
  }
}
