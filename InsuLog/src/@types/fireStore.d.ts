export interface GlucoseLog {
  userName: string;
  createdAt?: Timestamp; 
  glucose: string;
  insulinUsed: string;
  insulinAmount: string;
  userId: string;
}

export interface AppUser {
  email: string;
  password: string;
  displayName?: string;
}
