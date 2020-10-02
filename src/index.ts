import { User } from './models/User';

const user = new User({ name: 'new', age: 0 });

user.events.on('qwe', () => {
    console.log('qwe triggered')
})
user.events.trigger('qwe')
// user.save();
