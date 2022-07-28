# wheel-indicator
Inertial scrolling under dragging scene.
When the mouse moves into the upper or lower part of the container, it will scroll automatically


## Installing
```bash
npm i -S inertia-scroll
```

## Usage
```javascript
import { initScroll, setScroll, release } from 'inertia-scroll';
// init
initScroll(el,false)
// Set whether scrolling is allowed
setScroll(allow)
// release
release() // true
```

## API

### Options
| Field | Type | Default value | Mutable (by `initScroll()`) | Description |
| ------- | --------- | ----------- | ---- | ---------------------------------------- |
| `el` | `Object` (dom node) | null | No | DOM node to listen `mouse` event on. |
| `allow` | `Boolean` | true | No | 这个初始值代表是否允许滚动 |

### Instance methods
| Method | Description |
| ------- | ---------------------------------------- |
| `setScroll()` | Set allowed scrolling status. |
| `release()` | Restore state. |
