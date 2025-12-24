
export interface Message {
  id: number;
  text: string;
  category: 'motivation' | 'spiritual' | 'gratitude';
}

export interface SnowParticle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
}
