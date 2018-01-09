import { Base } from './base.model';
import { Type } from './type.enum';

export class LearnSong extends Base {
    constructor(public title: string, public artist: string, public level: number) {
        super(Type.LearnSong);
    }
}
