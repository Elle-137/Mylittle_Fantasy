//字符串、数字
// let message;
// message = "hello";
// alert(message);
// alert(Infinity);
// alert(NaN);
// message = "John";
// alert(`Hello,${message}`);
// alert(`the result is ${1+1}`);

//布尔
// let Check_1 = true;
// let Check_2 = false;
// let isGreater = 4>1;
// alert(isGreater);

//object、symbol
//类结构体、共用体
//typeof 
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

typeof Math // "object"  (1)内含的object

typeof null // "object"  (2)调用会返回object，这个属于js的错误

typeof alert // "function"  (3)调用会返回function，也是bug

console.log(typeof 10n);