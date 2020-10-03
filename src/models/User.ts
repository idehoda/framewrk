import { Sync } from './Sync';
import { Eventing } from './Eventing';
import { Attributes } from './Attributes';
import { AxiosPromise, AxiosResponse } from 'axios';

export interface IUserProps {
    name?: string;
    age?: number;
    id?: number;
};

const rootUrl = 'http://localhost:3000/users';

// type callback = function that returns nothing
type Callback = () => void;

export class User {
    public events: Eventing = new Eventing();
    public sync: Sync<IUserProps> = new Sync<IUserProps>(rootUrl);
    public attributes: Attributes<IUserProps>;
    constructor(arrributes: IUserProps) {
        this.attributes = new  Attributes<IUserProps>(arrributes);
    }
    // return on method on eventing in order to call, eg user.on('event', () => {})
    get on() {
        return this.events.on;
    }
    get trigger() {
        return this.events.trigger;
    }
    get get() {
        return this.attributes.get;
    }
    set(update: IUserProps): void {
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