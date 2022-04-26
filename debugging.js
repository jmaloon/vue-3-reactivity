var { reactive, toRefs } = require('./reactivity.cjs')
const store = reactive({
  items: [
    { value: 1, name: 'A' },
    { value: 2, name: 'B' },
    { value: 3, name: 'C' },
  ],
  get getItemIds() {
    return this.items.map((item) => item.value)
  },
})

const { getItemIds: itemIdsToRef } = toRefs(store)
const itemIds = store.getItemIds

console.log(store.getItemIds)
console.log(itemIds)
console.log(itemIdsToRef.value)

store.items.push({ value: 4, name: 'D' })

console.log(store.getItemIds)
console.log(itemIds)
console.log(itemIdsToRef.value)
