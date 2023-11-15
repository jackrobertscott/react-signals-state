import {
  createComputed,
  createEffect,
  createSignal,
  runBatch,
  runUntracked,
} from "." // adjust the import path as needed

describe("signals", () => {
  describe("createSignal", () => {
    it("should create a signal with initial value", () => {
      const [getState, setState] = createSignal(10)
      expect(getState()).toBe(10)
      setState(20)
      expect(getState()).toBe(20)
    })
  })

  describe("createComputed", () => {
    it("should create a computed value based on signals", () => {
      const [getCount, setCount] = createSignal(1)
      const [getDoubleCount] = createComputed(() => getCount() * 2)
      expect(getDoubleCount()).toBe(2)
      setCount(2)
      expect(getDoubleCount()).toBe(4)
    })
  })

  describe("createEffect", () => {
    it("should run effect when dependency changes", () => {
      const [getCount, setCount] = createSignal(0)
      let effectRunCount = 0
      createEffect(() => {
        getCount()
        effectRunCount++
      })
      expect(effectRunCount).toBe(1)
      setCount(1)
      expect(effectRunCount).toBe(2)
    })
  })

  describe("runUntracked", () => {
    it("should run a function without tracking", () => {
      const [getCount, setCount] = createSignal(0)
      let outsideValue = 10
      const untrackedValue = runUntracked(() => getCount() + outsideValue)
      expect(untrackedValue).toBe(10)
      setCount(5) // This should not affect untrackedValue
      expect(untrackedValue).toBe(10)
    })
  })

  describe("runBatch", () => {
    it("should batch multiple state updates", () => {
      const [getCount, setCount] = createSignal(0)
      let renderCount = 0
      createEffect(() => {
        getCount()
        renderCount++
      })
      runBatch(() => {
        setCount(1)
        setCount(2)
        setCount(3)
      })
      expect(renderCount).toBe(2) // One for initial, one for batched updates
    })
  })
})
