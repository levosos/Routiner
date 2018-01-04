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
