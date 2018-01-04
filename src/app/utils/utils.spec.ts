import { $it } from 'jasmine-ts-async';
import * as utils from './utils';

describe('Utils', () => {
    describe('delay()', () => {
        $it('sanity', async () => {
            const ms = 2000;

            const before = Date.now();
            await utils.delay(ms);
            const after = Date.now();

            const duration = after - before;
            expect(duration).toBeGreaterThanOrEqual(ms);
            expect(duration).toBeLessThanOrEqual(ms + 20);
        });
    });

    describe('trap()', () => {
        $it('sanity', async () => {
            const error: Error = await utils.trap(async () => {});
            expect(error).toBeUndefined();
        });

        $it('delay', async () => {
            const ms = 2000;

            const before = Date.now();

            await utils.trap(async () => {
                await utils.delay(ms);
            });

            const after = Date.now();

            const duration = after - before;
            expect(duration).toBeGreaterThanOrEqual(ms);
            expect(duration).toBeLessThanOrEqual(ms + 20);
        });

        $it('error', async () => {
            const msg = 'errormessage';

            const error: Error = await utils.trap(async () => {
                throw Error(msg);
            });

            expect(error).toBeDefined();
            expect(error.message).toEqual(msg);
        });
    });
});
