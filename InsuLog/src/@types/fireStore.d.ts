export interface GlucoseLog {
  uid?: string,
  userName: string;
  createdAt?: Timestamp; 
  glucose: number;
  insulinUsed: string;
  insulinAmount: number;
  userId: string;
}

export interface AppUser {
  email: string;
  password: string;
  displayName?: string;
}
