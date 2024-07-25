import { randomUUID } from 'node:crypto';

interface UserProps {
  name: string;
  email: string;
}

export class User {
  public id: string;
  public name: string;
  public email: string;

  constructor(props: UserProps, id?: string) {
    this.name = props.name;
    this.email = props.email;
    this.id = id ?? randomUUID();
  }
}
