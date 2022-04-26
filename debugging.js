var { computed, effect, reactive, toRefs } = require('./reactivity.cjs')

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

const itemIds = store.getItemIds
const { getItemIds: itemIdsToRef } = toRefs(store)
const computedItemIds = computed(() => store.getItemIds)

effect(() => {
  // track the deps
  console.log(store.getItemIds)
  //   console.log(itemIdsToRef.value)
  //   console.log(computedItemIds.value)
  //   console.log(itemIds) // reactivity breaks!!
})

// trigger changes
store.items.push({ value: 4, name: 'D' })
