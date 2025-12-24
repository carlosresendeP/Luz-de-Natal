export type Language = "pt" | "en" | "es";

export interface Message {
  id: number;
  text: string;
  category: "motivation" | "spiritual" | "gratitude";
}

export interface TranslatedMessage extends Message {
  translations: {
    pt: string;
    en: string;
    es: string;
  };
}

export interface SnowParticle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
}
