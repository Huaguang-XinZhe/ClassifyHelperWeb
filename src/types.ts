export interface Input {
  id: number;
  content: string;
  tags?: string[];
}

export interface Result {
  code: number;
  data: any;
  msg: string;
}
