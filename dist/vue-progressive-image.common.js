/*!
 * vue-progressive-image v1.0.0
 * (c) 2017 Matteo Gabriele
 * Released under the ISC License.
 */
'use strict';

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

var style = __$styleInject("._component_1rttq_1 {\n  position: relative;\n  overflow: hidden;\n}\n\n._image_1rttq_6 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 1;\n  transition: opacity 1s;\n  backface-visibility: hidden;\n}\n\n._before_1rttq_16 {\n  opacity: 1;\n}\n\n._enter_1rttq_20 {\n  opacity: 0;\n}\n\n._placeholder_1rttq_24 {\n  z-index: 0;\n\n  /* this is needed so Safari keeps sharp edges */\n  transform: scale(1)\n}\n", { "component": "_component_1rttq_1", "image": "_image_1rttq_6", "before": "_before_1rttq_16", "enter": "_enter_1rttq_20", "placeholder": "_placeholder_1rttq_24 _image_1rttq_6" });

var progressiveImage = function (Vue, options) {
  return {
    name: 'progressive-image',

    template: template,

    props: {
      source: {
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
        var blur = this.blur || this.options.blur || this.defaultBlur;

        if (blur === 0) {
          return {};
        }

        return {
          filter: 'blur(' + blur + 'px)'
        };
      }
    },

    created: function created() {
      this.handleImageLoading();
    },


    methods: {
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
        }, 100);
      },
      loadImage: function loadImage() {
        var _this2 = this;

        var image = new Image();

        this.defineAspectRatio(image);

        image.onload = function () {
          setTimeout(function () {
            _this2.image = _this2.source;
          }, 2000);
        };

        image.src = this.source;
      },
      loadPlaceholder: function loadPlaceholder() {
        var _this3 = this;

        if (!this.placeholder && !this.options.placeholder) {
          return;
        }

        var image = new Image();
        var source = this.placeholder;

        /**
         * It no local placeholder is provided and a global placeholder is passed in the plugin
         * options, then the global placeholder is loaded
         *
         * The local placeholder always wins
         */
        if (this.options.placeholder && !this.placeholder) {
          source = this.options.placeholder;
        }

        image.onload = function () {
          _this3.placeholderImage = source;
        };

        image.src = source;
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

  Vue.component('progressive-image', progressiveImage(Vue, options));
};

var index = {
  install: install
};

module.exports = index;
