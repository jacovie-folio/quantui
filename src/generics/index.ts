export type ClassProps<ClassT> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof ClassT as ClassT[K] extends (...args: any[]) => any
    ? never
    : K]: ClassT[K];
};

export class DataClass<ClassT> {
  constructor(props: ClassProps<ClassT>) {
    Object.assign(this, props);
  }
}
