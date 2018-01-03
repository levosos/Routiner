import { Base } from './base.model';
import { Type } from './type.enum';

describe('Base', () => {
  it('should create an instance', () => {
    expect(new Base(Type.PlaySong)).toBeTruthy();
  });
});
