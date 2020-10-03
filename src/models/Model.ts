import { AxiosPromise } from 'axios';
import { Callback } from './User';

// should be greneric - Attributes in class are generic
interface IModelAttributes<T> {
    set(update: T): void;
    getAll(): T;
    get<K extends keyof T>(key: K): T[K];
}
interface ISync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}
interface IEvents {
    on(name: string, cb: Callback): void;
    trigger(name: string): void
}

export class Model {

}