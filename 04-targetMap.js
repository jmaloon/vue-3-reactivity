// tracking effects for (multiple) properties across (multiple) objects
// https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1580763789885_5.opt.jpg?alt=media&token=110bf30c-3b78-482f-bac2-30ca8403bfe0

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

  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach((effect) => effect())
  }
}

let product = { price: 5, quantity: 2 }
let total = 0
let effect = () => {
  total = product.price * product.quantity
}
// problem: manually calling 'track' and 'trigger'
track(product, 'quantity')
effect()

console.log(total)
product.quantity = 3
trigger(product, 'quantity')
console.log(total)
