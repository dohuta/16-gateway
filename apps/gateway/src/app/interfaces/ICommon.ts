export interface IAuthorizedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}
