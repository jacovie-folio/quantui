import { ClassProps } from '../../generics';
import { Dimensions } from '../common';
import { RecipeCategory } from '../recipes';
import { CraftingEntityName } from './+enums';

export class CraftingEntity {
  name!: CraftingEntityName;
  display!: string;
  icon!: string;
  dimensions!: Dimensions;
  craftingSpeed!: number;
  craftingCategories!: Set<RecipeCategory>;

  constructor(props: ClassProps<CraftingEntity>) {
    Object.assign(this, props);
  }

  public getDimensions(scale: number = 1) {
    return this.dimensions.scale(scale).toObject();
  }
}
