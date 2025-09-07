export interface RequestWithUser extends Request {
  user: { name: string };
}
