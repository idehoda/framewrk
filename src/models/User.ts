import { Sync } from './Sync';
import { Eventing } from './Eventing';
import { Attributes } from './Attributes';

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
}