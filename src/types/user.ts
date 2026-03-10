export interface User {
  /** full display name */
  name: string;
  email: string;
  /** stored password (in a real app this would be hashed) */
  password: string;
}