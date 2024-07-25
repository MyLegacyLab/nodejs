import { test, expect } from 'vitest';
import { PublishArticleUseCase } from './publish-article';
import { PublishArticleRepository } from '../repositories/publish-article-repository';
import { Article } from '../entities/article';

const fakePublishArticleRepository: PublishArticleRepository = {
  create: async (article: Article) => {
    return;
  },
};

test('publish an article', async () => {
  const publishArticle = new PublishArticleUseCase(
    fakePublishArticleRepository,
  );

  const title = 'Exploring TypeScript: A Modern JavaScript Alternative';
  const content = `TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
    It offers static type-checking along with the latest ECMAScript features.
    In this article, we explore the benefits of using TypeScript, its core features, and how it can improve your development workflow.`;
  const userId = 'user12345';

  const article = await publishArticle.execute({
    title: title,
    content: content,
    userId: userId,
  });

  expect(article.content).toEqual(content);
});
