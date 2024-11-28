export interface GlucoseLog {
  userName: string; // Nome do usuário
  createdAt: Date; // Data e hora da postagem
  glucose: number; // Valor da glicose
  insulinUsed: string; // Tipo de insulina utilizada (ou pode ser number, se for quantitativo)
  insulinAmount: number; // Quantidade de insulina utilizada
  userId: string;
}

export interface AppUser {
  email: string;
  password: string;
  displayName?: string;
}
