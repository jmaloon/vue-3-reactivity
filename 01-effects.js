// saving code to run later
let product = { price: 5, quantity: 2 }
let total = product.price * product.quantity

// storing logic in anonymous function
let effect = () => {
  total = product.price * product.quantity
}

effect()

product.quantity = 3
console.log(total)

// problem: need dynamic way to track effects
effect()

console.log(total)
