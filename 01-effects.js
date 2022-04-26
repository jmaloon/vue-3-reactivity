// saving code to run later
const product = { price: 5, quantity: 2 }
let total = 0

// storing logic in an anonymous function
const effect = () => {
  total = product.price * product.quantity
}

// initialize value
effect()

product.quantity = 3
console.log(total)

// problem: how do we track more than one effect?
effect()
console.log(total)
