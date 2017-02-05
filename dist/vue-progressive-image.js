/*!
 * vue-progressive-image v1.3.0
 * (c) 2017 Matteo Gabriele
 * Released under the ISC License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueProgressiveImage = factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}
/**
 * Whining helper
 * @param  {String} message
 */


var is = function is(value) {
  return typeof value !== 'undefined' && value !== null;
};

var image = {
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    },
    blur: {
      type: Number,
      required: false
    }
  },

  data: function data() {
    return {
      applyRatio: true,
      options: {},
      defaultBlur: 5,
      image: null,
      placeholderImage: null,
      aspectRatio: 0.5625,
      isPollingKilled: false,
      cached: false
    };
  },


  computed: {
    shouldPlaceholderRender: function shouldPlaceholderRender() {
      return !!this.placeholderImage;
    },
    shouldImageRender: function shouldImageRender() {
      return !!this.image;
    },
    wrapperStyle: function wrapperStyle() {
      if (!this.applyRatio) {
        return;
      }

      return {
        paddingBottom: this.aspectRatio * 100 + '%'
      };
    },
    blurStyle: function blurStyle() {
      var blur = this.defaultBlur;

      if (is(this.blur)) {
        return this.getBlurStyle(this.blur);
      }

      if (is(this.options.blur)) {
        return this.getBlurStyle(this.options.blur);
      }

      return this.getBlurStyle(blur);
    }
  },

  created: function created() {
    this.handleImageLoading();
  },


  methods: {
    getBlurStyle: function getBlurStyle(amount) {
      if (amount === 0) {
        return;
      }

      return {
        filter: 'blur(' + amount + 'px)'
      };
    },
    defineAspectRatio: function defineAspectRatio(img) {
      var _this = this;

      var delay = this.options.timeout || 2500;
      var pollInterval = this.options.pollInterval || 80;

      var poll = setInterval(function () {
        if (!img.naturalWidth) {
          return;
        }

        clearInterval(poll);

        var naturalHeight = img.naturalHeight,
            naturalWidth = img.naturalWidth;


        _this.aspectRatio = naturalHeight / naturalWidth;
      }, pollInterval);

      setTimeout(function () {
        if (img.naturalWidth) {
          return;
        }

        clearInterval(poll);
        _this.isPollingKilled = true;
      }, delay);
    },
    loadImage: function loadImage() {
      var _this2 = this;

      var image = new Image();
      var delay = this.options.delay || 0;

      this.defineAspectRatio(image);

      // The onload function can be triggered with a delay
      // so that the animation between a placeholder and the
      // final image is easier to see
      image.onload = setTimeout(function () {
        if (_this2.image) {
          return;
        }

        if (_this2.isPollingKilled) {
          _this2.defineAspectRatio(image);
        }

        _this2.image = image.src;
      }, delay);

      image.src = this.src;

      // Check if the image is cached
      this.cached = image.complete;
    },
    loadPlaceholder: function loadPlaceholder() {
      var _this3 = this;

      if (!this.placeholder && !this.options.placeholder) {
        return;
      }

      var image = new Image();
      var src = this.placeholder;

      if (this.options.placeholder && !this.placeholder) {
        src = this.options.placeholder;
      }

      image.onload = function () {
        _this3.placeholderImage = src;
      };

      image.src = src;
    },
    handleImageLoading: function handleImageLoading() {
      this.loadPlaceholder();
      this.loadImage();
    }
  }
};

var template = "<div :class=\"style.component\">\n  <div :style=\"wrapperStyle\">\n    <transition :enter-class=\"style.enter\" :enter-active-class=\"style.before\">\n      <img v-if=\"shouldImageRender\" :class=\"style.image\" :src=\"image\" :alt=\"alt\">\n    </transition>\n    <transition :enter-class=\"style.enter\" :enter-active-class=\"style.before\">\n      <img v-if=\"shouldPlaceholderRender\" :class=\"style.placeholder\" :style=\"blurStyle\" :src=\"placeholderImage\">\n    </transition>\n  </div>\n</div>\n";

var style = __$styleInject("._component_14i8g_1 {\n  position: relative;\n  overflow: hidden;\n}\n\n._image_14i8g_6 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 1;\n  transition: all 1s ease-out;\n  transform: translateZ(0);\n}\n\n._before_14i8g_16 {\n  opacity: 1;\n}\n\n._enter_14i8g_20 {\n  opacity: 0;\n}\n\n._placeholder_14i8g_24 {\n  z-index: 0;\n  overflow: hidden;\n  transition: all 500ms ease-out;\n  backface-visibility: hidden;\n  transform: scale(1);\n}\n", { "component": "_component_14i8g_1", "image": "_image_14i8g_6", "before": "_before_14i8g_16", "enter": "_enter_14i8g_20", "placeholder": "_placeholder_14i8g_24 _image_14i8g_6" });

var pImg = function (options) {
  return {
    name: 'progressive-img',

    template: template,

    props: {
      alt: {
        type: String,
        required: false
      }
    },

    mixins: [image],

    data: function data() {
      return { options: options, style: style };
    }
  };
};

var template$1 = "<div :class=\"style.component\" :style=\"wrapperStyle\">\n  <transition :enter-class=\"style.enter\" :enter-active-class=\"style.before\">\n    <div v-if=\"shouldImageRender\" :class=\"style.image\" :style=\"imageStyle\"></div>\n  </transition>\n\n  <transition :enter-class=\"style.enter\" :enter-active-class=\"style.before\">\n    <div v-if=\"shouldPlaceholderRender\" :class=\"style.placeholder\" :style=\"placeholderStyle\"></div>\n  </transition>\n</div>\n";

var style$1 = __$styleInject("._component_1q63l_1 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n\n._image_1q63l_8 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n  transition: all 1s ease-out;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  transform: translateZ(0);\n}\n\n._placeholder_1q63l_22 {\n  transform: scale(1);\n  z-index: 0;\n}\n\n._before_1q63l_28 {\n  opacity: 1;\n}\n\n._enter_1q63l_32 {\n  opacity: 0;\n}\n", { "component": "_component_1q63l_1", "image": "_image_1q63l_8", "placeholder": "_placeholder_1q63l_22 _image_1q63l_8", "before": "_before_1q63l_28", "enter": "_enter_1q63l_32" });

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var pBackground = function (options) {
  return {
    name: 'progressive-background',

    template: template$1,

    props: {
      noRatio: {
        type: Boolean,
        required: false
      }
    },

    mixins: [image],

    data: function data() {
      return {
        style: style$1,
        options: options,
        applyRatio: !this.noRatio
      };
    },


    computed: {
      imageStyle: function imageStyle() {
        return {
          backgroundImage: 'url(' + this.image + ')'
        };
      },
      placeholderStyle: function placeholderStyle() {
        return _extends({}, this.blurStyle, {
          backgroundImage: 'url(' + this.placeholderImage + ')'
        });
      }
    }
  };
};

var install = function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // The component will have both suffix for better usability
  Vue.component('progressive-img', pImg(options));
  Vue.component('progressive-image', pImg(options));
  Vue.component('progressive-background', pBackground(options));
};

var index = {
  install: install
};

return index;

})));
