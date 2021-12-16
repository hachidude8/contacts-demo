import { Entity } from '../../entity';


export interface Contact extends Entity {
  name: string;
  nickname: string;
  role: string;
}
