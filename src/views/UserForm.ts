import { User, IUserProps } from './../models/User';
import { View } from './View';

export class UserForm extends View<User, IUserProps> {
    eventsMap(): {[key: string]: () => void} {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
            'click:.save-model': this.onSaveClick,
        }
    }
    onSaveClick = (): void => {
        this.model.save()
    }
    onSetAgeClick = (): void => {
        this.model.setRandomAge();
        console.log(this.model.get('age'))
    }
    onSetNameClick = (): void => {
       const input = this.parent.querySelector('input');
       if (!input) {
           console.log('no input')
           return;
       }
       const name = input.value;
       this.model.set({ name });
    }

    template(): string {
        return `
            <div>
                <input placeholder="${this.model.get('name')}"/>
                <button class='set-name'>New Name</button>
                <button class='set-age'>Set random age</button>
                <button class='save-model'>Save User</button>
            </div>
        `
    }
    
}