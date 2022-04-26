// tracking effects for (multiple) properties
// https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1580763787347_4.opt.jpg?alt=media&token=cc2f2262-86f7-41e1-bc74-03d8da51cb75

const depsMap = new Map()

function track(key) {
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  dep.add(effect)
}

function trigger(key) {
  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach((effect) => effect())
  }
}

const product = { price: 5, quantity: 2 }
let total = 0

const effect = () => {
  total = product.price * product.quantity
}

track('quantity')
effect()

product.quantity = 3
console.log(total)
trigger('quantity')
console.log(total)

// problem: how do we scale this pattern across multiple objects?
