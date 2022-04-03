export interface Particle {
  x: number;
  y: number;
  xOrientate: '-' | '+';
  yOrientate: '-' | '+';
  size: number;
  yVelocity: number;
  xVelocity: number;
  color: string;
  opacity: number;
}

export type Particles = Particle[];
