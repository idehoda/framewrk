import { User } from './models/User';

const us = new User({ name: 'test', age: 1234})
us.on('customEvent', () => console.log('customEvent 1 triggered'))
us.on('customEvent', () => console.log('customEvent 2 triggered'))
us.trigger('df[l,pg')