import { Injectable } from '@angular/core';
import * as utils from '../utils/utils';

export enum Test {
    Sanity,
    Await,
    Error,
    Fail,
}

@Injectable()
export class Router {

    public __test: Test;
    public __url: string;

    async navigateByUrl(url: string): Promise<boolean> {
        if (this.__test === Test.Sanity) {
            this.__url = url;
            return true;
        } else if (this.__test === Test.Await) {
            await utils.delay(2000);
            return true;
        } else if (this.__test === Test.Error) {
            throw Error();
        } else if (this.__test === Test.Fail) {
            return false;
        }
    }
}
