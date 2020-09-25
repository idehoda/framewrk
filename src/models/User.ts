interface IUserProps {
    name?: string;
    age?: number
};

// type callback = function that returns nothing
type Callback = () => void;

export class User {
    events: { [key: string] : Callback[]} = {};
    constructor(private data: IUserProps){}
    get (propName: string): (string | number) {
        return this.data[propName];
    }
    set (update: IUserProps): void {
        Object.assign(this.data, update)
    }
    on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }
    trigger(eventName: string): void {
        const handlers = this.events[eventName];
        if (!handlers || handlers.length === 0) {
            return;
        }
        handlers.forEach(eventHandler => eventHandler());
    }
}