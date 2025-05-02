import { ClassProps } from '../../generics';
import { Rate } from '../common';
import { ItemDictionary } from './+data';
import { ItemName } from './+enums';

export class Item {
  readonly name!: ItemName;
  readonly display!: string;
  readonly stackSize!: number;
  readonly icon!: string;

  constructor(props: ClassProps<Item>) {
    Object.assign(this, props);
  }
}

export class ItemRate {
  readonly name!: ItemName;
  readonly rate!: Rate;

  constructor(props: ClassProps<ItemRate>) {
    Object.assign(this, props);
  }

  public getItem(): Item {
    return ItemDictionary[this.name];
  }
  public getDisplay(): string {
    return this.getItem().display;
  }
  public getIcon(): string {
    return this.getItem().icon;
  }
}
