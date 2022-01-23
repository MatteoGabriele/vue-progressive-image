# vue-progressive-image

Vue progressive image loading plugin

![alt tag](https://raw.githubusercontent.com/MatteoGabriele/vue-progressive-image/master/example.gif)

## Installation

```bash
$ npm install vue-progressive-image
```

## Usage

```js
import { createApp } from "vue";
import App from "./App.vue";

import "vue-progressive-image/dist/style.css";
import VueProgressiveImage from "vue-progressive-image";

const app = createApp(App);

app.use(VueProgressiveImage);

app.mount("#app");
```

#### Progressive image

Instead of using the normal `img` tag to load images

```html
<img src="https://unsplash.it/1920/1080?image=10" />
```

use the `progressive-image` component already globally available after the plugin installation

```html
<progressive-image src="https://unsplash.it/1920/1080?image=10" />
```

## Placeholders

To be able to show some feedback to the user as soon as you can, make sure to pass a placeholder image, which could be also 1% the size of the main image: it will be blurred so you can go crazy with optimizations here.

in this example I have a 20x80 placeholder picture while waiting for a 1920x1080, you do you.

```html
<progressive-image
  src="https://unsplash.it/1920/1080?image=10"
  placeholder-src="https://unsplash.it/20/80?image=10"
/>
```

### The slot

If you need to display some content or even just a loader on top of the image, you can use the default slot. A prop called `isLoading` can be used to show/hide any content while the images are loading.

```html
<progressive-image src="https://unsplash.it/1920/1080?image=10">
  <template #default="{ isLoading }">
    <p v-if="isLoading">Loading...</p>
    <p v-else>lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </div>
</progressive-image>
```

### Blur

It is possible to adjust the level of blur applied to the placeholder image

```html
<progressive-image
  src="https://unsplash.it/1920/1080?image=10"
  placeholder-src="https://unsplash.it/1920/1080?image=10"
  blur="30"
/>
```

### Ratio

It is possible to manually specify the image aspact ratio when you know it. It allows the placeholder to be displayed in the correct aspect ratio. The ratio is calculated as `height / width`.

```html
<progressive-image
  src="https://unsplash.it/1920/1080?image=10"
  aspect-ratio="1.5"
/>
```

## Image fallback

In case of a loading error of the main image, it is possible to add a fallback image which can display an error image or just another image.

```html
<progressive-image
  src="https://this_url_should_cause_an_error"
  fallback-src="https://unsplash.it/1920/1080?image=10"
/>
```

## Events

When the image loads correctly or throws an error, an event is emitted.

```js
<progressive-image
  src="https://this_url_should_cause_an_error"
  fallback-src="https://unsplash.it/1920/1080?image=10"
  @success="mainImageLoaded"
  @error="placeholderImageError"
/>
```

### Component props

#### src

- type: String,
- required: true,

#### placeholder-src

- type: String

#### fallback-src

- type: String

#### delay

- type: [String, Number]
- default: 0

#### blur

- type: [String, Number]
- default: 20

#### alt

- type: String

#### circle

- type: Boolean
- default: false

#### object-cover

- type: Boolean
- default: false

#### object-contain

- type: Boolean
- default: false

#### select-none

- type: Boolean
- default: false

#### aspect-ratio

- type: [String, Number]
- default: 0.5625

#### poll-interval

- type: [String, Number]
- default: 10

# Issues and features requests

Please drop an issue, if you find something that doesn't work, or a feature request at https://github.com/MatteoGabriele/vue-progressive-image/issues

Follow me on twitter [@matteo_gabriele](https://twitter.com/matteo_gabriele)
