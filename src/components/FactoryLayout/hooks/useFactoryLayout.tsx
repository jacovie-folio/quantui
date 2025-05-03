import { XYPosition } from '@xyflow/react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  CraftingEntityDictionary,
  CraftingEntityName,
  ItemName,
  RecipeCategory,
  RecipeName,
} from '../../../data';
import { GRID_SIZE, roundPosition } from '../const';
import { FactoryLayoutEdge } from '../edges';
import { Segment } from '../edges/FigmaEdge';
import { FactoryLayoutNode } from '../nodes';

export type OnOpenDialogEvent =
  | {
      type: 'machine-selector';
      initialPosition: { x: number; y: number };
      recipesOnly?: boolean;
    }
  | {
      type: 'recipe-selector';
      categories: Set<RecipeCategory>;
      id: string;
    };

export interface FactoryLayoutContext {
  currentDialog: OnOpenDialogEvent | null;
  onOpenDialog: (event: OnOpenDialogEvent, initialSearchTerm?: string) => void;
  onCloseDialog: () => void;

  dialogSearchTerm: string;
  onChangeDialogSearchTerm: (newSearchTerm: string) => void;

  onAddMachine: (
    machine: CraftingEntityName,
    initialPosition: XYPosition,
    recipe?: RecipeName
  ) => void;
  onSetMachineRecipe: (id: string, recipe: RecipeName) => void;
  onUpdateMachineMultiplier: (id: string, multiplier: number) => void;

  onAddItem: (item: ItemName, initialPosition: XYPosition) => void;

  onChangeEdgeSegments: (edgeId: string, segments: Segment[]) => void;
}

const FactoryLayoutContext = React.createContext<FactoryLayoutContext>({
  currentDialog: null,
  onOpenDialog: () => null,
  onCloseDialog: () => null,
  dialogSearchTerm: '',
  onChangeDialogSearchTerm: () => null,
  onAddMachine: () => null,
  onSetMachineRecipe: () => null,
  onUpdateMachineMultiplier: () => null,

  onAddItem: () => null,

  onChangeEdgeSegments: () => null,
});

export const FactoryLayoutProvider: React.FC<{
  setNodes: React.Dispatch<React.SetStateAction<FactoryLayoutNode[]>>;
  setEdges: React.Dispatch<React.SetStateAction<FactoryLayoutEdge[]>>;
  children: React.ReactNode;
}> = ({ setNodes, setEdges, children }) => {
  const [dialog, setDialog] = React.useState<
    Pick<FactoryLayoutContext, 'currentDialog' | 'dialogSearchTerm'>
  >({
    currentDialog: null,
    dialogSearchTerm: '',
  });

  const onOpenDialog = React.useCallback(
    (event: OnOpenDialogEvent, initialSearchTerm: string = '') =>
      setDialog({ currentDialog: event, dialogSearchTerm: initialSearchTerm }),
    [setDialog]
  );

  const onCloseDialog = React.useCallback(
    () =>
      setDialog({
        currentDialog: null,
        dialogSearchTerm: '',
      }),
    [setDialog]
  );

  const onChangeDialogSearchTerm = React.useCallback(
    (newSearchTerm: string) =>
      setDialog((prior) => ({ ...prior, dialogSearchTerm: newSearchTerm })),
    [setDialog]
  );

  const onAddMachine = React.useCallback(
    (
      machine: CraftingEntityName,
      initialPosition: XYPosition,
      recipe?: RecipeName
    ) =>
      setNodes((priorNodes) => [
        ...priorNodes,
        {
          id: uuidv4(),
          type: 'machine',
          ...CraftingEntityDictionary[machine].getDimensions(GRID_SIZE),
          position: roundPosition(initialPosition),
          data: {
            machine,
            recipe,
            multiplier: 1,
          },
        },
      ]),
    [setNodes]
  );

  const onSetMachineRecipe = React.useCallback(
    (id: string, recipe: RecipeName) =>
      setNodes((priorNodes) =>
        priorNodes.map((node) =>
          node.id !== id || node.type !== 'machine'
            ? node
            : {
                ...node,
                data: {
                  ...node.data,
                  recipe,
                },
              }
        )
      ),
    [setNodes]
  );
  const onUpdateMachineMultiplier = React.useCallback(
    (id: string, multiplier: number) =>
      setNodes((priorNodes) =>
        priorNodes.map((node) =>
          node.id !== id || node.type !== 'machine'
            ? node
            : {
                ...node,
                data: {
                  ...node.data,
                  multiplier,
                },
              }
        )
      ),
    [setNodes]
  );

  const onAddItem = React.useCallback(
    (item: ItemName, initialPosition: XYPosition) => {
      setNodes((priorNodes) => [
        ...priorNodes,
        {
          id: uuidv4(),
          type: 'item',
          height: GRID_SIZE,
          width: GRID_SIZE,
          position: roundPosition(initialPosition),
          data: {
            item,
            inputRate: 0,
            outputRate: 0,
          },
        },
      ]);
    },
    [setNodes]
  );

  const onChangeEdgeSegments = React.useCallback(
    (edgeId: string, segments: Segment[]) => {
      setEdges((edges) =>
        edges.map((edge) => ({
          ...edge,
          ...(edge.id === edgeId
            ? {
                data: {
                  ...edge.data,
                  segments,
                },
              }
            : {}),
        }))
      );
    },
    [setEdges]
  );

  return (
    <FactoryLayoutContext.Provider
      value={{
        currentDialog: dialog.currentDialog,
        onOpenDialog,
        onCloseDialog,
        dialogSearchTerm: dialog.dialogSearchTerm,
        onChangeDialogSearchTerm,
        onAddMachine,
        onSetMachineRecipe,
        onUpdateMachineMultiplier,
        onAddItem,
        onChangeEdgeSegments,
      }}
    >
      {children}
    </FactoryLayoutContext.Provider>
  );
};

export const useFactoryLayout = () => {
  const context = React.useContext(FactoryLayoutContext);

  if (!context) {
    throw new Error(
      'useFactoryLayout must be used within a FactoryLayoutProvider'
    );
  }

  return context;
};
