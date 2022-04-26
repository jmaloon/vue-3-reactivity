// Proxy and Reflect
const product = { price: 5, quantity: 2 }

// REFLECT
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
console.log('quantity is ' + product.quantity) // dot notation
// or
console.log('quantity is ' + product['quantity']) // bracket notation
// or
console.log('quantity is ' + Reflect.get(product, 'quantity'))

// PROXY
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
const proxiedProduct = new Proxy(product, {
  get(target, key) {
    console.log(`Get was called with key: ${key}`)
    return target[key]
  },
  set(target, key, value) {
    console.log(`Set was called with key: ${key}, value: ${value}`)
    return (target[key] = value)
  },
})

proxiedProduct.price = 20
console.log(proxiedProduct.price)
