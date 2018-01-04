import { $it } from 'jasmine-ts-async';
import { ErrorableComponent } from './errorable.component';
import * as utils from '../utils/utils';

describe('ErrorableComponent', () => {
  it('should create', () => {
    const component: ErrorableComponent = new ErrorableComponent();

    expect(component).toBeTruthy();
    expect(component.error).toBeUndefined();
  });

  describe('trap()', () => {
    $it('sanity', async () => {
        const component: ErrorableComponent = new ErrorableComponent();

        await component.trap(async () => {});
        expect(component.error).toBeUndefined();
    });

    $it('delay', async () => {
        const ms = 2000;

        const before = Date.now();

        const component: ErrorableComponent = new ErrorableComponent();

        await component.trap(async () => {
            await utils.delay(ms);
        });

        const after = Date.now();

        const duration = after - before;
        expect(duration).toBeGreaterThanOrEqual(ms);
        expect(duration).toBeLessThanOrEqual(ms + 20);
    });

    $it('error', async () => {
        const msg = 'errormessage';

        const component: ErrorableComponent = new ErrorableComponent();

        await component.trap(async () => {
            throw Error(msg);
        });

        expect(component.error).toBeDefined();
        expect(component.error.message).toEqual(msg);
    });

    $it('error is reset', async () => {
        const msg = 'errormessage';

        const component: ErrorableComponent = new ErrorableComponent();

        await component.trap(async () => {
            throw Error(msg);
        });

        expect(component.error).toBeDefined();
        expect(component.error.message).toEqual(msg);

        await component.trap(async () => {});
        expect(component.error).toBeUndefined();
    });
  });
});
