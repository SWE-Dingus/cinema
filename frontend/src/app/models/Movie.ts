// src/app/models/Movie.ts

export interface Movie {
    id?: number;
    title: string;
    ageRating: string;
    reviewRating: number;
    cast: string[];
    director: string;
    synopsis: string;
    category: string[];
    childPrice: number;
    adultPrice: number;
    seniorPrice: number;
    onlineFee: number;
    posterUrl: string;
    trailerId: string;
    isRunning: boolean;
  }
  