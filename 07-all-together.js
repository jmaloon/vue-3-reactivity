// targetMap stores the effects that each object should re-run when it's updated
const targetMap = new WeakMap()

function track(target, key) {
  console.log(`track: key = ${key}`)
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  dep.add(effect)
}

function trigger(target, key) {
  console.log(`trigger: key = ${key}`)
  const depsMap = targetMap.get(target)

  if (!depsMap) {
    return
  }

  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach((effect) => effect())
  }
}

function reactive(target) {
  const handlers = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      // Track when we accessing the key!
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (result && oldValue != value) {
        // Trigger when the value changes!
        trigger(target, key)
      }
      return result
    },
  }
  return new Proxy(target, handlers)
}

const product = reactive({ price: 5, quantity: 2 })
let total = 0

// problem: how do we make the effects more dynamic?
const effect = () => {
  total = product.price * product.quantity
}
effect()

console.log(total)
product.quantity = 3
console.log(total)
product.quantity = 4
console.log(total)
// problem: we only want to track within an effect
// console.log('Updated quantity to =', product.quantity)
