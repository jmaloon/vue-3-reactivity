// multiple reactive objects

// targetMap stores the effects that each object should re-run when it's updated
const targetMap = new WeakMap()

function track(target, key) {
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

let product = reactive({ price: 5, quantity: 2 })
let total = 0

let effect = () => {
  total = product.price * product.quantity
}
effect()

console.log(total)
product.quantity = 3
console.log(total)
