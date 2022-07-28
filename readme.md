# inertia-roll
Inertial scrolling under dragging scene.
When the mouse moves into the upper or lower part of the container, it will scroll automatically


## Installing
```bash
npm i -S inertia-roll
```

## Usage
```javascript
import { initScroll, setScroll, release } from 'inertia-roll';
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
| `allow` | `Boolean` | true | No | This initial value represents whether scrolling is allowed |

### Instance methods
| Method | Description |
| ------- | ---------------------------------------- |
| `setScroll()` | Set allowed scrolling status. |
| `release()` | Restore state. |
