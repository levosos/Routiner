import { Block } from './block.model';

export interface Technique extends Block {
    description: string;
    bpm: number;
}
