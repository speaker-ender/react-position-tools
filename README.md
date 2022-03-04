# React-Position-Tools

### React Hooks and Contexts for DOM Positions
### [DEMO](https://js-position-helpers.vercel.app)

## Included Tools

### `<WindowContextProvider>`
This element can be used to provide window element measurements to any of it's chidlren

### `useWindowContext()`
This will allow you to hook into the WindowContext so you can get the current height and width of the viewport
### `useCursorPosition()`
This is a hook for tracking the current cursor position relative to the viewport
  
### `useCursorPercent()`
This hook tracks the current cursor position but returns the values in percentage of the viewport instead of px  
  
### `useIsCursorActive()`
This is a hook that keeps track how long it has been since the cursor has moved and will return false if the cursor has not been moved in more than 1 second  
