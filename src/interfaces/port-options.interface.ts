export interface IPortOptions {
  path: string;
  name: string;
  actions: {
    [key: string]: string,
  };
  replies: [];
}
