// reactivity doesn't exist in native JS
let product = { price: 5, quantity: 2 }
let total = product.price * product.quantity

product.quantity = 3
console.log(total)

// problem: duplicate logic
total = product.price * product.quantity

console.log(total)
