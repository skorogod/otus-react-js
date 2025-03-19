export enum TAccountTypeName {
  Standard = "Standard",
  Premium = "Premium",
  Gold = "Gold",
  Free = "Free",
}

export type TAccountType = {
  id: string;
  name: TAccountTypeName;
  discount: number;
};
