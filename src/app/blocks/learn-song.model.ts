import { Block } from './block.model';

export interface LearnSong extends Block {
    title: string;
    artist: string;
    level: number;
}
