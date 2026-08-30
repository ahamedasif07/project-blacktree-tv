import { User, Session } from "../generated";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session;
    }
  }
}
