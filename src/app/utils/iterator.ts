export class Iterator<T> {
    private index = 0;

    constructor(private readonly objects: T[]) {
    }

    public current(): T {
        return this.objects[this.index];
    }

    public more(): boolean {
        return this.index + 1 < this.objects.length;
    }

    public done(): boolean {
        return this.index >= this.objects.length;
    }

    public next(): void {
        ++this.index;
    }
}
