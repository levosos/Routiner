import { Observable } from 'rxjs/Observable';

export async function delay(ms: number): Promise<void> {
    const promise: Promise<void> = new Promise(resolve => setTimeout(resolve, ms));
    await promise;
}

export async function trap(closure: () => Promise<void>): Promise<Error> {
    try {
        const task: Promise<void> = closure();
        await task;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export function snap<T>(observable: Observable<T>): Promise<T> {
    return new Promise<T>(resolve => {
        observable.subscribe(result => resolve(result));
    });
}
