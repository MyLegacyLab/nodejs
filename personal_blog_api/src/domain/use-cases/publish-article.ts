import { Article } from '../entities/article';

interface PublishArticleUseCaseRequest {
  title: string;
  content: string;
  userId: string;
}

export class PublishArticleUseCase {
  execute({ title, content, userId }: PublishArticleUseCaseRequest) {
    const article = new Article({ title, content, userId });

    return article;
  }
}
