export interface JwtPayload {
  _id: string;
  email: string;
}

export type RequestExtended = Request & {
  user: JwtPayload;
};