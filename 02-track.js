// tracking (multiple) effects
// https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1580763775378_2.opt.jpg?alt=media&token=8fb9b10b-c3f8-4075-9b17-c2dd263419f9

const product = { price: 5, quantity: 2 }
let total = 0

// object for tracking a list of effects
const dep = new Set()

const effect = () => {
  total = product.price * product.quantity
}

// store the current effect
function track() {
  dep.add(effect)
}

// run all the effects
function trigger() {
  dep.forEach((effect) => effect())
}

// problem: how do we track effects for a specific property?
track()
effect()

product.quantity = 3
console.log(total)
trigger()
console.log(total)
