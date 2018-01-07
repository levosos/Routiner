import { Base } from './base.model';
import { Type } from './type.enum';

export class PlaySong extends Base {
    constructor(public title: string, public artist: string) {
        super(Type.PlaySong);
    }
}
