import { IUserProps } from './User';

export class Attributes<T> {
    constructor(private data: T){}
    // Dynamic get() method:
    // 'K' can be only key of generic 'T' object
    // eg: we can call method only with name/age/id parameter from 
    // IUserProps {name: string, age: number, id: number}
    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    }
    set = (update: T): void => {
        Object.assign(this.data, update)
    }
    getAll(): T {
        return this.data;
    }
}