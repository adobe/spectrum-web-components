# sp-dropzone

A sp-dropzone is an area on the screen into which an object can be dragged and dropped to accomplish a task.

```js
import '@spectrum-web-components/dropzone/sp-dropzone.js';
// <sp-dropzone></sp-dropzone>
```

## Attributes

| Name         | Type                                | Default | Description                                                                                 |
| ------------ | ----------------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `dropEffect` | `'copy' | 'move' | 'link' | 'none'` | -       | Controls the feedback (typically visual) the user is given during a drag and drop operation |
| `dragged`    | `boolean`                           | `false` | Indicates that files are currently being dragged over the dropzone.                         |
| `filled`     | `boolean`                           | `false` | Set this property to indicate that the component is in a filled state.                      |

## Slots

| Name        | Description                                                                                                                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `(default)` | The default slot on an `sp-dropzone` is a great place to place upload instructions built with an `sp-illustrated-message` or other information, possibly even built from data provided by the upload,... |

## Events

| Name                        | Description                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| `sp-dropzone-dragover`      | Announces when files have been dragged over the UI, but not yet dropped.                      |
| `sp-dropzone-dragleave`     | Announces when dragged files have been moved out of the UI without having been dropped.       |
| `sp-dropzone-drop`          | Announces when dragged files have been dropped on the UI.                                     |
| `sp-dropzone-should-accept` | A cancellable event that confirms whether or not a file dropped on the UI should be accepted. |
