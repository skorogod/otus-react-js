export const getPercent = (value: number, min: number, max: number) => Math.round(((value - min) / (max - min)) * 100);
