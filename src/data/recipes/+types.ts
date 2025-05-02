import { ClassProps } from '../../generics';
import { Duration, Range, Rate } from '../common';
import { FluidDictionary, FluidName, FluidRate } from '../fluids';
import { ItemDictionary, ItemName, ItemRate } from '../items';
import { RecipeCategory, RecipeName } from './+enums';

export class ItemIngredient {
  readonly name!: ItemName;
  readonly amount!: number;

  constructor(props: ClassProps<ItemIngredient>) {
    Object.assign(this, props);
  }

  public getRate(duration: Duration) {
    return new ItemRate({
      name: this.name,
      rate: Rate.fromDuration(this.amount, duration),
    });
  }
  public getIcon() {
    return ItemDictionary[this.name].icon;
  }
  public getDisplay() {
    return ItemDictionary[this.name].display;
  }
}
export class FluidIngredient {
  readonly name!: FluidName;
  readonly amount!: number;

  constructor(props: ClassProps<FluidIngredient>) {
    Object.assign(this, props);
  }

  public getRate(duration: Duration) {
    return new FluidRate({
      name: this.name,
      rate: Rate.fromDuration(this.amount, duration),
    });
  }

  public getIcon() {
    return FluidDictionary[this.name].icon;
  }
  public getDisplay() {
    return FluidDictionary[this.name].display;
  }
}

export class ItemProduct {
  readonly name!: ItemName;
  readonly amount!: number | Range;
  readonly probability?: number;

  constructor(props: ClassProps<ItemProduct>) {
    Object.assign(this, props);
  }

  public getAmount() {
    const baseAmount =
      typeof this.amount === 'number' ? this.amount : this.amount.getAverage();
    return baseAmount * (this.probability ?? 1);
  }

  public getRate(duration: Duration) {
    return new ItemRate({
      name: this.name,
      rate: Rate.fromDuration(this.getAmount(), duration),
    });
  }

  public getIcon() {
    return ItemDictionary[this.name].icon;
  }
  public getDisplay() {
    return ItemDictionary[this.name].display;
  }
}
export class FluidProduct {
  readonly name!: FluidName;
  readonly amount!: number | Range;
  readonly probability?: number;

  constructor(props: ClassProps<FluidProduct>) {
    Object.assign(this, props);
  }

  public getAmount() {
    const baseAmount =
      typeof this.amount === 'number' ? this.amount : this.amount.getAverage();
    return baseAmount * (this.probability ?? 1);
  }

  public getRate(duration: Duration) {
    return new FluidRate({
      name: this.name,
      rate: Rate.fromDuration(this.getAmount(), duration),
    });
  }

  public getIcon() {
    return FluidDictionary[this.name].icon;
  }
  public getDisplay() {
    return FluidDictionary[this.name].display;
  }
}

export type Ingredient = ItemIngredient | FluidIngredient;
export type Product = ItemProduct | FluidProduct;

export class Recipe {
  name!: RecipeName;
  display!: string;
  icon!: string;
  category!: RecipeCategory;
  duration!: Duration;
  ingredients!: Ingredient[];
  products!: Product[];

  constructor(props: ClassProps<Recipe>) {
    Object.assign(this, props);
  }
}
