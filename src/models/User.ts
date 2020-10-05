import { Eventing } from './Eventing';
import { Attributes } from './Attributes';
import { Model } from './Model';
import { ApiSync } from './ApiSync';

export interface IUserProps {
    name?: string;
    age?: number;
    id?: number;
};

const rootUrl = 'http://localhost:3000/users';

// type callback = function that returns nothing
export type Callback = () => void;

export class User extends Model<IUserProps> {
    static buildUser(att: IUserProps): User {
        return new User(
            new Attributes<IUserProps>(att),
            new Eventing(),
            new ApiSync<IUserProps>(rootUrl)
        )
    }
}