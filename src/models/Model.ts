import { AxiosPromise, AxiosResponse } from 'axios';
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

interface IhasId {
    id?: number;
}

export class Model<T extends IhasId> {
    constructor(
        private attributes: IModelAttributes<T>,
        private events: IEvents,
        private sync: ISync<T>,
    ) {}
    // return on method on eventing in order to call, eg user.on('event', () => {})
    // shorthand getters 
    on = this.events.on;
    trigger =  this.events.trigger;
    get = this.attributes.get;
    set(update: T): void {
        this.attributes.set(update);
        this.events.trigger('change');
    }
    fetch(): void {
        const id = this.attributes.get('id');
        if (typeof id !== 'number') {
            throw new Error('No id found')
        }
        this.sync.fetch(id).then((res: AxiosResponse): void => {
            this.set(res.data);
        })
        .catch(err => console.log('error fetching user', err))
    }
    save(): void {
        const allData = this.attributes.getAll();
        this.sync.save(allData)
            .then((res: AxiosResponse) => {
                this.trigger('saveSuccess')
            })
            .catch((err) => this.trigger('saveError'))
    }
}