let x = [1, 2, 3]
x[9] = 4;

console.log('Actual array: ', x);

let str = 'Array values in .map(): [ ';

x.forEach((v, i) => str += (i ? ', ' : '') + v);

str += ' ]';

console.log(str);
