export type { Channel, Video } from './youtube';

export type UnionKey<Obj, Extract> = {[P in keyof Obj]: Obj[P] extends Extract ? P : never}[keyof Obj];
export type SubObj<Obj, Extract> = {[P in UnionKey<Obj, Extract>]: Obj[P]};
