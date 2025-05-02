import { ItemDictionary } from './+data';
import { ItemName } from './+enums';
import { Item } from './+types';

function getItems(...itemNames: ItemName[]): Item[] {
  return itemNames.map((itemName) => ItemDictionary[itemName]);
}
function getItemsIndexed(
  ...itemNames: ItemName[]
): Partial<Record<ItemName, Item>> {
  return getItems(...itemNames).reduce(
    (part, next) => ({ ...part, [next.name]: next }),
    {}
  );
}

export const ItemUtil = {
  getItems,
  getItemsIndexed,
} as const;
