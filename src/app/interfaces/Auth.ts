export interface IUser {
  id?: string | number;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}
