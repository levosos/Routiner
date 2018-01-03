import { Base } from './base.model';
import { Type } from './type.enum';

export class PlaySong extends Base {
    constructor(public name: string) {
        super(Type.PlaySong);
    }
}
