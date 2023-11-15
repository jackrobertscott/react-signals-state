# react-signals-state

> Wrapped Preact's signals library for better code consistency with React.

## Install

```sh
npm install react-signals-state
```

## Usage

Import and use the state management functions as follows:

```ts
import {
  createSignal,
  createComputed,
  createEffect,
  runUntracked,
  runBatch,
} from 'react-signals-state';

// Example usage of createSignal
const [getValue, setValue] = createSignal(0);
setValue(1); // Set a new value
console.log(getValue()); // Read the current value

// Example usage of createComputed
const [getComputedValue] = createComputed(() => getValue() * 2);
console.log(getComputedValue()); // Read the computed value

// Example usage of createEffect
createEffect(() => {
  console.log('Value changed:', getValue());
});

// Example usage of runUntracked
const result = runUntracked(() => {
  // Some untracked operation
  return 'result';
});

// Example usage of runBatch
runBatch(() => {
  // Batch multiple state updates
  setValue(2);
  setValue(3);
});
```

## API

- `createSignal(initial: T)`: Creates a signal with a given initial value.
- `createComputed(cb: () => T)`: Creates a computed signal that derives its value from other signals.
- `createEffect(cb: () => void)`: Creates an effect that runs when its dependencies change.
- `runUntracked<T>(cb: () => T)`: Runs a callback function without tracking its dependencies.
- `runBatch(cb: () => void)`: Batches multiple state updates into a single re-render.

## Contributing

Contributions are always welcome!

## License

This project is licensed under the MIT License.

## Support

If you have any questions or issues, feel free to open an issue on the [GitHub repository](https://github.com/jackrobertscott/react-signals-state).
