import axios, { AxiosResponse } from 'axios';

interface IUserProps {
    name?: string;
    age?: number;
    id?: number;
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
    fetch(): void {
        axios.get(`http://localhost:3000/users/${this.get('id')}`)
            .then((response: AxiosResponse): void => {
                console.log('received!')
                this.set(response.data);
            })
    }
    save(): void {
        const id = this.get('id');
        if (id) {
            axios.put(`http://localhost:3000/users/${id}`, this.data)
        } else {
            axios.post(`http://localhost:3000/users`, this.data)
        }
    }
}