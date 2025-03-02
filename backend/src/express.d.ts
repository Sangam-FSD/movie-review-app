type Tuser = {
  id: string;
  username: string;
  email: string;
};

declare namespace Express {
  export interface Request {
    user?: Tuser;
  }
}
