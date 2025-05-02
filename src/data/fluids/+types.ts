import { ClassProps } from '../../generics';
import { Rate } from '../common';
import { FluidDictionary } from './+data';
import { FluidName } from './+enums';

export class Fluid {
  readonly name!: FluidName;
  readonly display!: string;
  readonly icon!: string;

  constructor(props: ClassProps<Fluid>) {
    Object.assign(this, props);
  }
}

export class FluidRate {
  readonly name!: FluidName;
  readonly rate!: Rate;

  constructor(props: ClassProps<FluidRate>) {
    Object.assign(this, props);
  }
  public getFluid(): Fluid {
    return FluidDictionary[this.name];
  }

  public getDisplay(): string {
    return this.getFluid().display;
  }
  public getIcon(): string {
    return this.getFluid().icon;
  }
}
