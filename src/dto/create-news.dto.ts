export class CreateNewsDto {
  readonly likes: number;
  readonly title: string;
  readonly description?: string;
  readonly date: string;
  readonly name: string;
  readonly image: string;
  readonly _id?: string;
}

export class ItemNewsDto {
  readonly likes: number;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly _id?: string;
}
