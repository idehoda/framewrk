import { User } from './models/User';

const us = new User({ name: 'test', age: 1234})
console.log(us.get('name'))
console.log(us.get('age'))

us.set({ name: 'qwer'})
console.log(us.get('name'))
console.log(us.get('age'))