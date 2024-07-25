import { Article } from '../entities/article';
import { PublishArticleRepository } from '../repositories/publish-article-repository';

interface PublishArticleUseCaseRequest {
  title: string;
  content: string;
  userId: string;
}

export class PublishArticleUseCase {
  constructor(private publishArticleRepository: PublishArticleRepository) {}

  async execute({ title, content, userId }: PublishArticleUseCaseRequest) {
    const article = new Article({ title, content, userId });

    await this.publishArticleRepository.create(article);

    return article;
  }
}
