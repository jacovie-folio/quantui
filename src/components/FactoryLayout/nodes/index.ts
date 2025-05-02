import { ItemNode, ItemNodeCard } from './ItemNode';
import { MachineNode, MachineNodeCard } from './MachineNode';

export type FactoryLayoutNode = MachineNode | ItemNode;

export const NODE_RENDERERS = {
  machine: MachineNodeCard,
  item: ItemNodeCard,
};
