// Notice our get/set has an additional parameter called receiver which we’re
// sending as an argument into `Reflect.get/set`. This ensures that the proper value
// of `this` is used when our object has inherited values / functions from
// another object. This is why we always use `Reflect` inside of a `Proxy`, so
// we can keep the original behavior we are customizing.

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      console.log(`Get was called with key: ${key}`)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      console.log(`Set was called with key: ${key}, value: ${value}`)
      return Reflect.set(target, key, value, receiver)
    },
  }
  return new Proxy(target, handler)
}

const product = reactive({ price: 5, quantity: 2 })

console.log(product.quantity)
product.quantity = 4
console.log(product.quantity)
