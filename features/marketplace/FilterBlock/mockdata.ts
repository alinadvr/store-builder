export interface filterDataType {
  filter: string;
  options: { option: string; amount: number }[];
}

export const filters: filterDataType[] = [
  {
    filter: "Size",
    options: [
      { option: "S (32)", amount: 2 },
      { option: "M (34)", amount: 2 },
      { option: "L (36)", amount: 2 },
      { option: "XL (38)", amount: 1 },
      { option: "2XL (40)", amount: 0 },
      { option: "3XL (42)", amount: 0 },
    ],
  },
  {
    filter: "Color",
    options: [
      { option: "White", amount: 1 },
      { option: "Black", amount: 0 },
      { option: "Red", amount: 0 },
      { option: "Blue", amount: 2 },
      { option: "Green", amount: 0 },
    ],
  },
  {
    filter: "Season",
    options: [
      { option: "Summer", amount: 2 },
      { option: "Autumn", amount: 1 },
      { option: "Winter", amount: 0 },
      { option: "Spring", amount: 3 },
    ],
  },
  {
    filter: "Length",
    options: [
      { option: "Tall", amount: 3 },
      { option: "Short", amount: 0 },
    ],
  },
];
