import { Collection } from './Collection';
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
    static buildUserCollection(): Collection<User, IUserProps> {
        return new Collection<User, IUserProps>(
            rootUrl,
            (json: IUserProps) => User.buildUser(json)
        );
    }
    setRandomAge(): void {
        const age = Math.round(Math.random() * 9999);
        this.set({ age });
    }
}