import { randomUUID } from 'node:crypto';

interface ArticleProps {
  title: string;
  content: string;
  userId: string;
}

export class Article {
  public id: string;
  public title: string;
  public content: string;
  public userId: string;

  constructor(props: ArticleProps, id?: string) {
    this.title = props.title;
    this.content = props.content;
    this.userId = props.userId;
    this.id = id ?? randomUUID();
  }
}
