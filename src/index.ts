import { User } from './models/User';

const user = new User({ id: 1, name: '111', age: 111});

// "id": 1,
// "name": "BBB",
// "age": 345546

user.on('change', () => console.log('change event triggered', user));
user.on('saveSuccess', () => console.log('saveSuccess event triggered', user.attributes));
user.save();
