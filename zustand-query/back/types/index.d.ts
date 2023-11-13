import IUser from '../models/user';

declare global {
  namespace Express {
    export interface User extends IUser {}
  }
}
declare module '*json' {
  const value: any;
  export default value;
}

declare global {
  interface Error {}
}

export {};
