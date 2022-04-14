# React-Position-Tools

### React Hooks and Contexts for DOM Positions

### [DEMO](https://react-position-tools.vercel.app/)

## Included Tools

### `<WindowContextProvider />`

This element can be used to provide window element measurements to any of it's chidlren

### `useWindowContext()`

This will allow you to hook into the WindowContext so you can get the current height and width of the viewport

### `<CursorContextProvider />`

This will allow you to hook into the CursorContext so you can track the cursor from anywhere

### `useCursorContext()`

This is a hook for tracking the current cursor position relative to the viewport

### `useCursorTracking()`

This is a hook for tracking the current cursor position relative to any element

### `useIsCursorActive()`

This is a hook that keeps track how long it has been since the cursor has moved and will return false if the cursor has not been moved in more than 1 second

### `useElementTracking()`

Keeps track of an element's position attributes with callbacks for when it updates

### `useElementTrackingState()`

Manage an element's position in state instead of just through callbacks
