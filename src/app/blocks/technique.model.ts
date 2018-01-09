import { Base } from './base.model';
import { Type } from './type.enum';

export class Technique extends Base {
    constructor(public description: string, public bpm: number) {
        super(Type.Technique);
    }
}
