import * as utils from '../utils/utils';

export class ErrorableComponent {

    public error: Error = undefined;

    protected async trap(closure: () => Promise<void>): Promise<void> {
        this.error = await utils.trap(async() => {
            const task: Promise<void> = closure();
            await task;
        });
    }
}
