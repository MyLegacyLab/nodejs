import { Article } from '../entities/article';

export interface PublishArticleRepository {
  create(article: Article): Promise<void>;
}
