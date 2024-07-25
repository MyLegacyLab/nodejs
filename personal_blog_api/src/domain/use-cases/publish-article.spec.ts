import { test, expect } from 'vitest';
import { PublishArticleUseCase } from './publish-article';

test('publish an article', () => {
  const publishArticle = new PublishArticleUseCase();

  const title = 'Exploring TypeScript: A Modern JavaScript Alternative';
  const content =
    'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It offers static type-checking along with the latest ECMAScript features. In this article, we explore the benefits of using TypeScript, its core features, and how it can improve your development workflow.';
  const userId = 'user12345';

  const article = publishArticle.execute({
    title: title,
    content: content,
    userId: userId,
  });

  expect(article.content).toEqual(content);
});
