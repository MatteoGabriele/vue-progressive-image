/*!
 * vue-progressive-image v1.2.3
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
var template = "<div :class=\"style.component\">\n  <div :style=\"wrapperStyle\">\n    <transition :enter-class=\"style.enter\" :enter-active-class=\"style.before\">\n      <img v-if=\"shouldImageRender\" :class=\"style.image\" :src=\"image\" :alt=\"alt\">\n    </transition>\n    <img v-if=\"shouldPlaceholderRender\" :class=\"style.placeholder\" :style=\"placeholderStyle\" :src=\"placeholderImage\">\n  </div>\n</div>\n";

var style = __$styleInject("._component_16a4v_1 {\n  position: relative;\n  overflow: hidden;\n}\n\n._image_16a4v_6 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 1;\n  transition: opacity 1s;\n  transform: translateZ(0) scale(1);\n}\n\n._before_16a4v_16 {\n  opacity: 1;\n}\n\n._enter_16a4v_20 {\n  opacity: 0;\n}\n\n._placeholder_16a4v_24 {\n  z-index: 0;\n\n  /* this is needed so Safari keeps sharp edges */\n  transform: scale(1);\n}\n", { "component": "_component_16a4v_1", "image": "_image_16a4v_6", "before": "_before_16a4v_16", "enter": "_enter_16a4v_20", "placeholder": "_placeholder_16a4v_24 _image_16a4v_6" });

/**
 * Whining helper
 * @param  {String} message
 */


var is = function is(value) {
  return typeof value !== 'undefined' && value !== null;
};

var progressiveImg = function (Vue, options) {
  return {
    name: 'progressive-img',

    template: template,

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
      },
      alt: {
        type: String,
        required: false
      }
    },

    data: function data() {
      return {
        options: options,
        style: style,
        defaultBlur: 5,
        image: null,
        placeholderImage: null,
        aspectRatio: 56.25
      };
    },


    computed: {
      shouldPlaceholderRender: function shouldPlaceholderRender() {
        return this.placeholderImage;
      },
      shouldImageRender: function shouldImageRender() {
        return this.image;
      },
      wrapperStyle: function wrapperStyle() {
        return {
          paddingBottom: this.aspectRatio + '%'
        };
      },
      placeholderStyle: function placeholderStyle() {
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
          return {};
        }

        return {
          filter: 'blur(' + amount + 'px)'
        };
      },
      defineAspectRatio: function defineAspectRatio(img) {
        var _this = this;

        var interval = setInterval(function () {
          if (!img.naturalWidth) {
            return;
          }

          clearInterval(interval);

          var naturalHeight = img.naturalHeight,
              naturalWidth = img.naturalWidth;


          _this.aspectRatio = naturalHeight / naturalWidth * 100;
        }, 20);
      },
      loadImage: function loadImage() {
        var _this2 = this;

        var image = new Image();

        this.defineAspectRatio(image);

        image.onload = function () {
          setTimeout(function () {
            _this2.image = _this2.src;
          }, _this2.options.delay || 0);
        };

        image.src = this.src;
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
};

var install = function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var component = progressiveImg(Vue, options);

  /**
   * The component will have both suffix for better usability
   */
  Vue.component('progressive-img', component);
  Vue.component('progressive-image', component);
};

var index = {
  install: install
};

return index;

})));
