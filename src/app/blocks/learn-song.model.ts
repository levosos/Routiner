import { Base } from './base.model';
import { Type } from './type.enum';

export enum Level {
    NeverTried,
    LookedAtIt,
    Practicing,
    AlmostThere,
}

export class LearnSong extends Base {
    constructor(public title: string, public artist: string, public level: Level) {
        super(Type.LearnSong);
    }
}
