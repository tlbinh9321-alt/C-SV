export type CardArchetype =
  | 'THE DREAMER'
  | 'THE EXPLORER'
  | 'THE CREATOR'
  | 'THE CONNECTOR'
  | 'THE LEADER'
  | 'THE BUILDER'
  | 'THE SEEKER'
  | 'THE STORYTELLER';

export type EnergyProfileType =
  | 'DREAMER'
  | 'EXPLORER'
  | 'CREATOR'
  | 'CONNECTOR'
  | 'LEADER'
  | 'BUILDER'
  | 'SEEKER'
  | 'STORYTELLER';

export type CardRarity = 'Phổ Biến' | 'Hiếm' | 'Thần Kỳ' | 'Huyền Thoại';

export interface CardStats {
  courage: number;     // Can đảm
  creativity: number;  // Sáng tạo
  connection: number;  // Kết nối
  adventure: number;   // Dấn thân / Phiêu lưu
  focus: number;       // Tập trung / Kiên định
}

export interface CardThemeColors {
  primary: string;    // CSS color/hex
  secondary: string;
  glow: string;
  accent: string;
  gradient: string;
}

export interface StarCardData {
  id: number;
  name: string;
  constellation: string;
  category: CardArchetype;
  keyword: string;
  shortMessage: string;
  longMessage: string;
  strength: string;
  challenge: string;
  advice: string;
  energy: string;
  rarity: CardRarity;
  starPower: number; // 75 - 99
  destinyQuote: string;
  symbol: string;
  illustrationMotif: string;
  stats: CardStats;
  colors: CardThemeColors;
}

export interface DrawnHistoryItem {
  id: string; // unique draw event id
  cardId: number;
  drawnAt: string; // ISO date string
  energyDetected?: EnergyProfileType;
}

export interface EnergyProfileInfo {
  type: EnergyProfileType;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  glowColor: string;
  icon: string;
}
