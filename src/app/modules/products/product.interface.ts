export type Variants = {
  type: string;
  value: string;
};

export type Inventory = {
  quantity: number;
  inStock: boolean;
};
export type Product = {
  name: string;
  description: string;
  price: number;
  category:
    | 'Electronics'
    | 'Fitness'
    | 'Footwear'
    | 'Kitchen'
    | 'Wearable'
    | 'Kitchen'
    | 'Audio';
  tags: string[];
  variants: Variants[];
  inventory: Inventory;
};
