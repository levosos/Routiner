import * as utils from '../../utils/utils';

export class ErrorableComponent {

    public error: Error = undefined;

    public async trap(closure: () => Promise<void>, message?: string): Promise<void> {
        this.error = await utils.trap(async() => {
            const task: Promise<void> = closure();
            await task;
        });

        if (this.error && message) {
            this.error = new Error(message);
        }
    }
}
