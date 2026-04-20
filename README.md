# React Dead Code Elimination Babel Plugin

## Overview

This Babel plugin performs **compile-time dead code elimination** for React codebases based on predefined feature flags. It statically evaluates certain patterns and removes unreachable branches, improving bundle size and runtime efficiency.

The plugin operates on a **flag set provided via configuration**, resolving conditional logic and pruning unused JSX or function branches accordingly.

---

## Core Concept

You provide a `flagSet`:

```js
{
  TEST_FLAG: true,
  internalflag: false
}
```

The plugin evaluates expressions using these flags and eliminates dead branches.

---

## Supported Patterns

The plugin currently supports the following patterns:

### 1. Logical AND (`&&`) Gating

```jsx
{FLAG && <Component />}
```

* If `FLAG = true` → `<Component />`
* If `FLAG = false` → removed

---

### 2. Conditional (Ternary) Expressions

```jsx
{FLAG ? <A /> : <B />}
```

* If `FLAG = true` → `<A />`
* If `FLAG = false` → `<B />`

---

### 3. Function-Based Conditional Rendering

#### Function Declaration

```js
function getLayout() {
  if (FLAG) return <A />;
  else return <B />;
}
```

#### Function Expression / Arrow Function

```js
const getLayout = () => {
  if (FLAG) return <A />;
  else return <B />;
};
```

* Evaluates the function at compile-time when used in JSX:

```jsx
{getLayout()}
```

---

### 4. JSX Stored in Variables

```js
const component = <div>Hello</div>;
{FLAG && component}
```

---

### 5. Conditional Rendering Inside `.map()`

Supports both:

#### Implicit Return

```jsx
array.map(item =>
  FLAG ? <A /> : <B />
)
```

#### Block Body

```jsx
array.map(item => {
  return FLAG ? <A /> : <B />;
})
```

---

## Plugin Configuration

```js
pluginOptions: {
  flagSet: {
    TEST_FLAG: true,
    internalflag: false
  }
}
```

* Only flags defined here are evaluated.
* Unknown flags are ignored (left untouched).

---


## Test Coverage

The plugin includes comprehensive tests using `babel-plugin-tester` and `Jest` covering:

| Test Case | Description                                |
| --------- | ------------------------------------------ |
| Test1–2   | Logical AND gating                         |
| Test3–4   | Ternary expressions                        |
| Test5–8   | Function-based conditions                  |
| Test9     | JSX variables                              |
| Test10–11 | Unknown flag handling                      |
| Test12–13 | Complex nested expressions (skip behavior) |
| Test14–16 | `.map()` conditional rendering             |

---

## Example Transformation

### Input

```jsx
{TEST_FLAG && <Component />}
```

### Output (TEST_FLAG = true)

```jsx
<Component />
```

### Output (TEST_FLAG = false)

```jsx
null
```


## Usage

Integrate into your Babel config:

```js
plugins: [
  [yourPlugin, { flagSet }]
]
```

---

## Summary

This plugin acts as a **build-time feature flag optimizer**, enabling:

* Cleaner production bundles
* Removal of unused UI branches
* Predictable static transformations

It is particularly useful in **feature-flag-driven React architectures**.
