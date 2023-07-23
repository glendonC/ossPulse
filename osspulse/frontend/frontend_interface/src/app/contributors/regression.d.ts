declare module 'regression' {
    type DataPoint = [number, number];
  
    interface RegressionResult {
      equation: number[];
      points: DataPoint[];
      string: string;
      r2: number;
      predict: (x: number) => number;
    }
  
    export function linear(data: DataPoint[]): RegressionResult;
    export function exponential(data: DataPoint[]): RegressionResult;
    export function logarithmic(data: DataPoint[]): RegressionResult;
    export function power(data: DataPoint[]): RegressionResult;
    export function polynomial(data: DataPoint[], options: { order: number }): RegressionResult;
  }
  