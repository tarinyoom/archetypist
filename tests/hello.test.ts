import { sayHello } from '../lib/hello';

test('sayHello should return a greeting with the provided name', () => {
  expect(sayHello('World')).toBe('Hello, World!');
});
