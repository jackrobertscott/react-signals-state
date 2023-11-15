import {
  batch,
  computed,
  effect,
  signal,
  untracked,
} from "@preact/signals-react"

/**
 * Creates a signal with a given initial value.
 * @param initial The initial value of the signal.
 * @returns A tuple containing: a getter function for the signal's current value,
 * a setter function to update the signal's value, and the signal itself.
 */
export function createSignal<T>(initial: T) {
  const state = signal<T>(initial)
  const getState = () => state.value
  const setState = (value: T) => (state.value = value)
  return [getState, setState, state] as const
}

/**
 * Creates a computed signal that derives its value from other signals.
 * @param cb The callback function that returns the computed value.
 * @returns A tuple containing: a getter function for the computed value,
 * and the computed signal itself.
 */
export function createComputed<T>(cb: () => T) {
  const state = computed(cb)
  const getState = () => state.value
  return [getState, state] as const
}

/**
 * Creates an effect that runs when its dependencies change.
 * @param cb The callback function that is executed as the effect.
 * @returns A dispose function that can be called to stop the effect.
 */
export function createEffect(cb: () => void): () => void {
  return effect(cb) // returns a dispose (unlisten) function
}

/**
 * Runs a callback function without tracking its dependencies.
 * @param cb The callback function to run.
 * @returns The return value of the callback function.
 */
export function runUntracked<T>(cb: () => T) {
  return untracked(cb)
}

/**
 * Batches multiple state updates into a single re-render.
 * @param cb The callback function containing state updates.
 */
export function runBatch(cb: () => void) {
  return batch(cb)
}
