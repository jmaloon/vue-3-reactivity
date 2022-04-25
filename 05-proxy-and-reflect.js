let product = { price: 5, quantity: 2 }

// REFLECT
console.log('quantity is ' + product.quantity)
// or
console.log('quantity is ' + product['quantity'])
// or
console.log('quantity is ' + Reflect.get(product, 'quantity'))

// PROXIES
let proxiedProduct = new Proxy(product, {})
console.log(proxiedProduct.quantity)

const interceptedProduct = new Proxy(product, {
  get() {
    console.log('Get was called')
    return 'Not the value'
  },
})
console.log(interceptedProduct.quantity)

const realProxiedProduct = new Proxy(product, {
  get(target, key) {
    console.log('Get was called with key = ', key)
    return target[key]
  },
})
console.log(realProxiedProduct.quantity)

// Bringing it together
proxiedProduct = new Proxy(product, {
  get(target, key, receiver) {
    console.log('Get was called with key = ' + key)
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    console.log('Set was called with key = ' + key + ' and value = ' + value)
    return Reflect.set(target, key, value, receiver)
  },
})
proxiedProduct.quantity = 4
console.log(proxiedProduct.quantity)

// Notice our get has an additional parameter called receiver which we’re
// sending as an argument into `Reflect.get`. This ensures that the proper value
// of `this` is used when our object has inherited values / functions from
// another object. This is why we always use `Reflect` inside of a `Proxy`, so
// we can keep the original behavior we are customizing.
