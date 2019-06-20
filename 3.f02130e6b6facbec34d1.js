(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

(function (global) {
  /**
   * Polyfill URLSearchParams
   *
   * Inspired from : https://github.com/WebReflection/url-search-params/blob/master/src/url-search-params.js
   */
  var checkIfIteratorIsSupported = function () {
    try {
      return !!Symbol.iterator;
    } catch (error) {
      return false;
    }
  };

  var iteratorSupported = checkIfIteratorIsSupported();

  var createIterator = function (items) {
    var iterator = {
      next: function () {
        var value = items.shift();
        return {
          done: value === void 0,
          value: value
        };
      }
    };

    if (iteratorSupported) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  };
  /**
   * Search param name and values should be encoded according to https://url.spec.whatwg.org/#urlencoded-serializing
   * encodeURIComponent() produces the same result except encoding spaces as `%20` instead of `+`.
   */


  var serializeParam = function (value) {
    return encodeURIComponent(value).replace(/%20/g, '+');
  };

  var deserializeParam = function (value) {
    return decodeURIComponent(value).replace(/\+/g, ' ');
  };

  var polyfillURLSearchParams = function () {
    var URLSearchParams = function (searchString) {
      Object.defineProperty(this, '_entries', {
        writable: true,
        value: {}
      });
      var typeofSearchString = typeof searchString;
      if (typeofSearchString === 'undefined') ;else if (typeofSearchString === 'string') {
        if (searchString !== '') {
          this._fromString(searchString);
        }
      } else if (searchString instanceof URLSearchParams) {
        var _this = this;

        searchString.forEach(function (value, name) {
          _this.append(name, value);
        });
      } else if (searchString !== null && typeofSearchString === 'object') {
        if (Object.prototype.toString.call(searchString) === '[object Array]') {
          for (var i = 0; i < searchString.length; i++) {
            var entry = searchString[i];

            if (Object.prototype.toString.call(entry) === '[object Array]' || entry.length !== 2) {
              this.append(entry[0], entry[1]);
            } else {
              throw new TypeError('Expected [string, any] as entry at index ' + i + ' of URLSearchParams\'s input');
            }
          }
        } else {
          for (var key in searchString) {
            if (searchString.hasOwnProperty(key)) {
              this.append(key, searchString[key]);
            }
          }
        }
      } else {
        throw new TypeError('Unsupported input\'s type for URLSearchParams');
      }
    };

    var proto = URLSearchParams.prototype;

    proto.append = function (name, value) {
      if (name in this._entries) {
        this._entries[name].push(String(value));
      } else {
        this._entries[name] = [String(value)];
      }
    };

    proto.delete = function (name) {
      delete this._entries[name];
    };

    proto.get = function (name) {
      return name in this._entries ? this._entries[name][0] : null;
    };

    proto.getAll = function (name) {
      return name in this._entries ? this._entries[name].slice(0) : [];
    };

    proto.has = function (name) {
      return name in this._entries;
    };

    proto.set = function (name, value) {
      this._entries[name] = [String(value)];
    };

    proto.forEach = function (callback, thisArg) {
      var entries;

      for (var name in this._entries) {
        if (this._entries.hasOwnProperty(name)) {
          entries = this._entries[name];

          for (var i = 0; i < entries.length; i++) {
            callback.call(thisArg, entries[i], name, this);
          }
        }
      }
    };

    proto.keys = function () {
      var items = [];
      this.forEach(function (value, name) {
        items.push(name);
      });
      return createIterator(items);
    };

    proto.values = function () {
      var items = [];
      this.forEach(function (value) {
        items.push(value);
      });
      return createIterator(items);
    };

    proto.entries = function () {
      var items = [];
      this.forEach(function (value, name) {
        items.push([name, value]);
      });
      return createIterator(items);
    };

    if (iteratorSupported) {
      proto[Symbol.iterator] = proto.entries;
    }

    proto.toString = function () {
      var searchArray = [];
      this.forEach(function (value, name) {
        searchArray.push(serializeParam(name) + '=' + serializeParam(value));
      });
      return searchArray.join('&');
    };

    global.URLSearchParams = URLSearchParams;
  };

  if (!('URLSearchParams' in global) || new URLSearchParams('?a=1').toString() !== 'a=1') {
    polyfillURLSearchParams();
  }

  var proto = URLSearchParams.prototype;

  if (typeof proto.sort !== 'function') {
    proto.sort = function () {
      var _this = this;

      var items = [];
      this.forEach(function (value, name) {
        items.push([name, value]);

        if (!_this._entries) {
          _this.delete(name);
        }
      });
      items.sort(function (a, b) {
        if (a[0] < b[0]) {
          return -1;
        } else if (a[0] > b[0]) {
          return +1;
        } else {
          return 0;
        }
      });

      if (_this._entries) {
        // force reset because IE keeps keys index
        _this._entries = {};
      }

      for (var i = 0; i < items.length; i++) {
        this.append(items[i][0], items[i][1]);
      }
    };
  }

  if (typeof proto._fromString !== 'function') {
    Object.defineProperty(proto, '_fromString', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function (searchString) {
        if (this._entries) {
          this._entries = {};
        } else {
          var keys = [];
          this.forEach(function (value, name) {
            keys.push(name);
          });

          for (var i = 0; i < keys.length; i++) {
            this.delete(keys[i]);
          }
        }

        searchString = searchString.replace(/^\?/, '');
        var attributes = searchString.split('&');
        var attribute;

        for (var i = 0; i < attributes.length; i++) {
          attribute = attributes[i].split('=');
          this.append(deserializeParam(attribute[0]), attribute.length > 1 ? deserializeParam(attribute[1]) : '');
        }
      }
    });
  } // HTMLAnchorElement

})(typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : commonjsGlobal);

(function (global) {
  /**
   * Polyfill URL
   *
   * Inspired from : https://github.com/arv/DOM-URL-Polyfill/blob/master/src/url.js
   */
  var checkIfURLIsSupported = function () {
    try {
      var u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      return u.href === 'http://a/c%20d' && u.searchParams;
    } catch (e) {
      return false;
    }
  };

  var polyfillURL = function () {
    var _URL = global.URL;

    var URL = function (url, base) {
      if (typeof url !== 'string') url = String(url); // Only create another document if the base is different from current location.

      var doc = document,
          baseElement;

      if (base && (global.location === void 0 || base !== global.location.href)) {
        doc = document.implementation.createHTMLDocument('');
        baseElement = doc.createElement('base');
        baseElement.href = base;
        doc.head.appendChild(baseElement);

        try {
          if (baseElement.href.indexOf(base) !== 0) throw new Error(baseElement.href);
        } catch (err) {
          throw new Error('URL unable to set base ' + base + ' due to ' + err);
        }
      }

      var anchorElement = doc.createElement('a');
      anchorElement.href = url;

      if (baseElement) {
        doc.body.appendChild(anchorElement);
        anchorElement.href = anchorElement.href; // force href to refresh
      }

      if (anchorElement.protocol === ':' || !/:/.test(anchorElement.href)) {
        throw new TypeError('Invalid URL');
      }

      Object.defineProperty(this, '_anchorElement', {
        value: anchorElement
      }); // create a linked searchParams which reflect its changes on URL

      var searchParams = new URLSearchParams(this.search);
      var enableSearchUpdate = true;
      var enableSearchParamsUpdate = true;

      var _this = this;

      ['append', 'delete', 'set'].forEach(function (methodName) {
        var method = searchParams[methodName];

        searchParams[methodName] = function () {
          method.apply(searchParams, arguments);

          if (enableSearchUpdate) {
            enableSearchParamsUpdate = false;
            _this.search = searchParams.toString();
            enableSearchParamsUpdate = true;
          }
        };
      });
      Object.defineProperty(this, 'searchParams', {
        value: searchParams,
        enumerable: true
      });
      var search = void 0;
      Object.defineProperty(this, '_updateSearchParams', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function () {
          if (this.search !== search) {
            search = this.search;

            if (enableSearchParamsUpdate) {
              enableSearchUpdate = false;

              this.searchParams._fromString(this.search);

              enableSearchUpdate = true;
            }
          }
        }
      });
    };

    var proto = URL.prototype;

    var linkURLWithAnchorAttribute = function (attributeName) {
      Object.defineProperty(proto, attributeName, {
        get: function () {
          return this._anchorElement[attributeName];
        },
        set: function (value) {
          this._anchorElement[attributeName] = value;
        },
        enumerable: true
      });
    };

    ['hash', 'host', 'hostname', 'port', 'protocol'].forEach(function (attributeName) {
      linkURLWithAnchorAttribute(attributeName);
    });
    Object.defineProperty(proto, 'search', {
      get: function () {
        return this._anchorElement['search'];
      },
      set: function (value) {
        this._anchorElement['search'] = value;

        this._updateSearchParams();
      },
      enumerable: true
    });
    Object.defineProperties(proto, {
      'toString': {
        get: function () {
          var _this = this;

          return function () {
            return _this.href;
          };
        }
      },
      'href': {
        get: function () {
          return this._anchorElement.href.replace(/\?$/, '');
        },
        set: function (value) {
          this._anchorElement.href = value;

          this._updateSearchParams();
        },
        enumerable: true
      },
      'pathname': {
        get: function () {
          return this._anchorElement.pathname.replace(/(^\/?)/, '/');
        },
        set: function (value) {
          this._anchorElement.pathname = value;
        },
        enumerable: true
      },
      'origin': {
        get: function () {
          // get expected port from protocol
          var expectedPort = {
            'http:': 80,
            'https:': 443,
            'ftp:': 21
          }[this._anchorElement.protocol]; // add port to origin if, expected port is different than actual port
          // and it is not empty f.e http://foo:8080
          // 8080 != 80 && 8080 != ''

          var addPortToOrigin = this._anchorElement.port != expectedPort && this._anchorElement.port !== '';
          return this._anchorElement.protocol + '//' + this._anchorElement.hostname + (addPortToOrigin ? ':' + this._anchorElement.port : '');
        },
        enumerable: true
      },
      'password': {
        // TODO
        get: function () {
          return '';
        },
        set: function (value) {},
        enumerable: true
      },
      'username': {
        // TODO
        get: function () {
          return '';
        },
        set: function (value) {},
        enumerable: true
      }
    });

    URL.createObjectURL = function (blob) {
      return _URL.createObjectURL.apply(_URL, arguments);
    };

    URL.revokeObjectURL = function (url) {
      return _URL.revokeObjectURL.apply(_URL, arguments);
    };

    global.URL = URL;
  };

  if (!checkIfURLIsSupported()) {
    polyfillURL();
  }

  if (global.location !== void 0 && !('origin' in global.location)) {
    var getOrigin = function () {
      return global.location.protocol + '//' + global.location.hostname + (global.location.port ? ':' + global.location.port : '');
    };

    try {
      Object.defineProperty(global.location, 'origin', {
        get: getOrigin,
        enumerable: true
      });
    } catch (e) {
      setInterval(function () {
        global.location.origin = getOrigin();
      }, 100);
    }
  }
})(typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : commonjsGlobal);

var urlPolyfill = {};
/* harmony default export */ __webpack_exports__["default"] = (urlPolyfill);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJ1bmRsZWQtZXMtbW9kdWxlcy91cmwtcG9seWZpbGwvdXJsLXBvbHlmaWxsLmpzIl0sIm5hbWVzIjpbImNvbW1vbmpzR2xvYmFsIiwid2luZG93IiwiZ2xvYmFsIiwic2VsZiIsImNoZWNrSWZJdGVyYXRvcklzU3VwcG9ydGVkIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJlcnJvciIsIml0ZXJhdG9yU3VwcG9ydGVkIiwiY3JlYXRlSXRlcmF0b3IiLCJpdGVtcyIsIm5leHQiLCJ2YWx1ZSIsInNoaWZ0IiwiZG9uZSIsInNlcmlhbGl6ZVBhcmFtIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmVwbGFjZSIsImRlc2VyaWFsaXplUGFyYW0iLCJkZWNvZGVVUklDb21wb25lbnQiLCJwb2x5ZmlsbFVSTFNlYXJjaFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsInNlYXJjaFN0cmluZyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid3JpdGFibGUiLCJ0eXBlb2ZTZWFyY2hTdHJpbmciLCJfZnJvbVN0cmluZyIsIl90aGlzIiwiZm9yRWFjaCIsIm5hbWUiLCJhcHBlbmQiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJpIiwibGVuZ3RoIiwiZW50cnkiLCJUeXBlRXJyb3IiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInByb3RvIiwiX2VudHJpZXMiLCJwdXNoIiwiU3RyaW5nIiwiZGVsZXRlIiwiZ2V0IiwiZ2V0QWxsIiwic2xpY2UiLCJoYXMiLCJzZXQiLCJjYWxsYmFjayIsInRoaXNBcmciLCJlbnRyaWVzIiwia2V5cyIsInZhbHVlcyIsInNlYXJjaEFycmF5Iiwiam9pbiIsInNvcnQiLCJhIiwiYiIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJhdHRyaWJ1dGVzIiwic3BsaXQiLCJhdHRyaWJ1dGUiLCJjaGVja0lmVVJMSXNTdXBwb3J0ZWQiLCJ1IiwiVVJMIiwicGF0aG5hbWUiLCJocmVmIiwic2VhcmNoUGFyYW1zIiwiZSIsInBvbHlmaWxsVVJMIiwiX1VSTCIsInVybCIsImJhc2UiLCJkb2MiLCJkb2N1bWVudCIsImJhc2VFbGVtZW50IiwibG9jYXRpb24iLCJpbXBsZW1lbnRhdGlvbiIsImNyZWF0ZUhUTUxEb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJpbmRleE9mIiwiRXJyb3IiLCJlcnIiLCJhbmNob3JFbGVtZW50IiwiYm9keSIsInByb3RvY29sIiwidGVzdCIsInNlYXJjaCIsImVuYWJsZVNlYXJjaFVwZGF0ZSIsImVuYWJsZVNlYXJjaFBhcmFtc1VwZGF0ZSIsIm1ldGhvZE5hbWUiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsImxpbmtVUkxXaXRoQW5jaG9yQXR0cmlidXRlIiwiYXR0cmlidXRlTmFtZSIsIl9hbmNob3JFbGVtZW50IiwiX3VwZGF0ZVNlYXJjaFBhcmFtcyIsImRlZmluZVByb3BlcnRpZXMiLCJleHBlY3RlZFBvcnQiLCJhZGRQb3J0VG9PcmlnaW4iLCJwb3J0IiwiaG9zdG5hbWUiLCJjcmVhdGVPYmplY3RVUkwiLCJibG9iIiwicmV2b2tlT2JqZWN0VVJMIiwiZ2V0T3JpZ2luIiwic2V0SW50ZXJ2YWwiLCJvcmlnaW4iLCJ1cmxQb2x5ZmlsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBQSxrREFBSUEsY0FBYyxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NBLE1BQWhDLEdBQXlDLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NBLE1BQWhDLEdBQXlDLE9BQU9DLElBQVAsS0FBZ0IsV0FBaEIsR0FBOEJBLElBQTlCLEdBQXFDLEVBQTVJOztBQUVBLENBQUMsVUFBU0QsTUFBVCxFQUFpQjtBQUNoQjs7Ozs7QUFNQSxNQUFJRSwwQkFBMEIsR0FBRyxZQUFXO0FBQzFDLFFBQUk7QUFDRixhQUFPLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxRQUFoQjtBQUNELEtBRkQsQ0FFRSxPQUFPQyxLQUFQLEVB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QUFQLEtBQWtCLFdBQW5CLEdBQWtDQSxNQUFsQyxHQUNDLE9BQU9FLElBQVAsS0FBZ0IsV0FBakIsR0FBZ0NBLElBQWhDLEdBQXVDSCxjQXJPOUM7O0FBd09BLElBQUltSCxXQUFXLEdBQUcsRUFBbEI7QUFJZUEsMEVBQWYsRSIsImZpbGUiOiIzLmYwMjEzMGU2YjZmYWNiZWMzNGQxLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbW1vbmpzR2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB7fTtcblxuKGZ1bmN0aW9uKGdsb2JhbCkge1xyXG4gIC8qKlxyXG4gICAqIFBvbHlmaWxsIFVSTFNlYXJjaFBhcmFtc1xyXG4gICAqXHJcbiAgICogSW5zcGlyZWQgZnJvbSA6IGh0dHBzOi8vZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uL3VybC1zZWFyY2gtcGFyYW1zL2Jsb2IvbWFzdGVyL3NyYy91cmwtc2VhcmNoLXBhcmFtcy5qc1xyXG4gICAqL1xyXG5cclxuICB2YXIgY2hlY2tJZkl0ZXJhdG9ySXNTdXBwb3J0ZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiAhIVN5bWJvbC5pdGVyYXRvcjtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgdmFyIGl0ZXJhdG9yU3VwcG9ydGVkID0gY2hlY2tJZkl0ZXJhdG9ySXNTdXBwb3J0ZWQoKTtcclxuXHJcbiAgdmFyIGNyZWF0ZUl0ZXJhdG9yID0gZnVuY3Rpb24oaXRlbXMpIHtcclxuICAgIHZhciBpdGVyYXRvciA9IHtcclxuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKTtcclxuICAgICAgICByZXR1cm4geyBkb25lOiB2YWx1ZSA9PT0gdm9pZCAwLCB2YWx1ZTogdmFsdWUgfTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoaXRlcmF0b3JTdXBwb3J0ZWQpIHtcclxuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBpdGVyYXRvcjtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaXRlcmF0b3I7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHBhcmFtIG5hbWUgYW5kIHZhbHVlcyBzaG91bGQgYmUgZW5jb2RlZCBhY2NvcmRpbmcgdG8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmxlbmNvZGVkLXNlcmlhbGl6aW5nXHJcbiAgICogZW5jb2RlVVJJQ29tcG9uZW50KCkgcHJvZHVjZXMgdGhlIHNhbWUgcmVzdWx0IGV4Y2VwdCBlbmNvZGluZyBzcGFjZXMgYXMgYCUyMGAgaW5zdGVhZCBvZiBgK2AuXHJcbiAgICovXHJcbiAgdmFyIHNlcmlhbGl6ZVBhcmFtID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xyXG4gIH07XHJcblxyXG4gIHZhciBkZXNlcmlhbGl6ZVBhcmFtID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xyXG4gIH07XHJcblxyXG4gIHZhciBwb2x5ZmlsbFVSTFNlYXJjaFBhcmFtcyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBVUkxTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbihzZWFyY2hTdHJpbmcpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfZW50cmllcycsIHsgd3JpdGFibGU6IHRydWUsIHZhbHVlOiB7fSB9KTtcclxuICAgICAgdmFyIHR5cGVvZlNlYXJjaFN0cmluZyA9IHR5cGVvZiBzZWFyY2hTdHJpbmc7XHJcblxyXG4gICAgICBpZiAodHlwZW9mU2VhcmNoU3RyaW5nID09PSAndW5kZWZpbmVkJykgOyBlbHNlIGlmICh0eXBlb2ZTZWFyY2hTdHJpbmcgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgaWYgKHNlYXJjaFN0cmluZyAhPT0gJycpIHtcclxuICAgICAgICAgIHRoaXMuX2Zyb21TdHJpbmcoc2VhcmNoU3RyaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoc2VhcmNoU3RyaW5nIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBzZWFyY2hTdHJpbmcuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xyXG4gICAgICAgICAgX3RoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmICgoc2VhcmNoU3RyaW5nICE9PSBudWxsKSAmJiAodHlwZW9mU2VhcmNoU3RyaW5nID09PSAnb2JqZWN0JykpIHtcclxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNlYXJjaFN0cmluZykgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VhcmNoU3RyaW5nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHNlYXJjaFN0cmluZ1tpXTtcclxuICAgICAgICAgICAgaWYgKChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZW50cnkpID09PSAnW29iamVjdCBBcnJheV0nKSB8fCAoZW50cnkubGVuZ3RoICE9PSAyKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuYXBwZW5kKGVudHJ5WzBdLCBlbnRyeVsxXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgW3N0cmluZywgYW55XSBhcyBlbnRyeSBhdCBpbmRleCAnICsgaSArICcgb2YgVVJMU2VhcmNoUGFyYW1zXFwncyBpbnB1dCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzZWFyY2hTdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHNlYXJjaFN0cmluZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5hcHBlbmQoa2V5LCBzZWFyY2hTdHJpbmdba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5zdXBwb3J0ZWQgaW5wdXRcXCdzIHR5cGUgZm9yIFVSTFNlYXJjaFBhcmFtcycpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBwcm90byA9IFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGU7XHJcblxyXG4gICAgcHJvdG8uYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgaWYgKG5hbWUgaW4gdGhpcy5fZW50cmllcykge1xyXG4gICAgICAgIHRoaXMuX2VudHJpZXNbbmFtZV0ucHVzaChTdHJpbmcodmFsdWUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9lbnRyaWVzW25hbWVdID0gW1N0cmluZyh2YWx1ZSldO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmRlbGV0ZSA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgZGVsZXRlIHRoaXMuX2VudHJpZXNbbmFtZV07XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgcmV0dXJuIChuYW1lIGluIHRoaXMuX2VudHJpZXMpID8gdGhpcy5fZW50cmllc1tuYW1lXVswXSA6IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmdldEFsbCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgcmV0dXJuIChuYW1lIGluIHRoaXMuX2VudHJpZXMpID8gdGhpcy5fZW50cmllc1tuYW1lXS5zbGljZSgwKSA6IFtdO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgIHJldHVybiAobmFtZSBpbiB0aGlzLl9lbnRyaWVzKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgdGhpcy5fZW50cmllc1tuYW1lXSA9IFtTdHJpbmcodmFsdWUpXTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XHJcbiAgICAgIHZhciBlbnRyaWVzO1xyXG4gICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMuX2VudHJpZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5fZW50cmllcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgZW50cmllcyA9IHRoaXMuX2VudHJpZXNbbmFtZV07XHJcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBlbnRyaWVzW2ldLCBuYW1lLCB0aGlzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8ua2V5cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgaXRlbXMucHVzaChuYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvcihpdGVtcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgaXRlbXMucHVzaCh2YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3IoaXRlbXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBpdGVtcyA9IFtdO1xyXG4gICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcclxuICAgICAgICBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yKGl0ZW1zKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGl0ZXJhdG9yU3VwcG9ydGVkKSB7XHJcbiAgICAgIHByb3RvW1N5bWJvbC5pdGVyYXRvcl0gPSBwcm90by5lbnRyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBzZWFyY2hBcnJheSA9IFtdO1xyXG4gICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcclxuICAgICAgICBzZWFyY2hBcnJheS5wdXNoKHNlcmlhbGl6ZVBhcmFtKG5hbWUpICsgJz0nICsgc2VyaWFsaXplUGFyYW0odmFsdWUpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBzZWFyY2hBcnJheS5qb2luKCcmJyk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBnbG9iYWwuVVJMU2VhcmNoUGFyYW1zID0gVVJMU2VhcmNoUGFyYW1zO1xyXG4gIH07XHJcblxyXG4gIGlmICghKCdVUkxTZWFyY2hQYXJhbXMnIGluIGdsb2JhbCkgfHwgKG5ldyBVUkxTZWFyY2hQYXJhbXMoJz9hPTEnKS50b1N0cmluZygpICE9PSAnYT0xJykpIHtcclxuICAgIHBvbHlmaWxsVVJMU2VhcmNoUGFyYW1zKCk7XHJcbiAgfVxyXG5cclxuICB2YXIgcHJvdG8gPSBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xyXG5cclxuICBpZiAodHlwZW9mIHByb3RvLnNvcnQgIT09ICdmdW5jdGlvbicpIHtcclxuICAgIHByb3RvLnNvcnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgdmFyIGl0ZW1zID0gW107XHJcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xyXG4gICAgICAgIGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSk7XHJcbiAgICAgICAgaWYgKCFfdGhpcy5fZW50cmllcykge1xyXG4gICAgICAgICAgX3RoaXMuZGVsZXRlKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGl0ZW1zLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIGlmIChhWzBdIDwgYlswXSkge1xyXG4gICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYVswXSA+IGJbMF0pIHtcclxuICAgICAgICAgIHJldHVybiArMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKF90aGlzLl9lbnRyaWVzKSB7IC8vIGZvcmNlIHJlc2V0IGJlY2F1c2UgSUUga2VlcHMga2V5cyBpbmRleFxyXG4gICAgICAgIF90aGlzLl9lbnRyaWVzID0ge307XHJcbiAgICAgIH1cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuYXBwZW5kKGl0ZW1zW2ldWzBdLCBpdGVtc1tpXVsxXSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIHByb3RvLl9mcm9tU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdfZnJvbVN0cmluZycsIHtcclxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgdmFsdWU6IGZ1bmN0aW9uKHNlYXJjaFN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLl9lbnRyaWVzKSB7XHJcbiAgICAgICAgICB0aGlzLl9lbnRyaWVzID0ge307XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBrZXlzID0gW107XHJcbiAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcclxuICAgICAgICAgICAga2V5cy5wdXNoKG5hbWUpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGUoa2V5c1tpXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWFyY2hTdHJpbmcgPSBzZWFyY2hTdHJpbmcucmVwbGFjZSgvXlxcPy8sICcnKTtcclxuICAgICAgICB2YXIgYXR0cmlidXRlcyA9IHNlYXJjaFN0cmluZy5zcGxpdCgnJicpO1xyXG4gICAgICAgIHZhciBhdHRyaWJ1dGU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgICB0aGlzLmFwcGVuZChcclxuICAgICAgICAgICAgZGVzZXJpYWxpemVQYXJhbShhdHRyaWJ1dGVbMF0pLFxyXG4gICAgICAgICAgICAoYXR0cmlidXRlLmxlbmd0aCA+IDEpID8gZGVzZXJpYWxpemVQYXJhbShhdHRyaWJ1dGVbMV0pIDogJydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIEhUTUxBbmNob3JFbGVtZW50XHJcblxyXG59KShcclxuICAodHlwZW9mIGNvbW1vbmpzR2xvYmFsICE9PSAndW5kZWZpbmVkJykgPyBjb21tb25qc0dsb2JhbFxyXG4gICAgOiAoKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSA/IHdpbmRvd1xyXG4gICAgOiAoKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgPyBzZWxmIDogY29tbW9uanNHbG9iYWwpKVxyXG4pO1xyXG5cclxuKGZ1bmN0aW9uKGdsb2JhbCkge1xyXG4gIC8qKlxyXG4gICAqIFBvbHlmaWxsIFVSTFxyXG4gICAqXHJcbiAgICogSW5zcGlyZWQgZnJvbSA6IGh0dHBzOi8vZ2l0aHViLmNvbS9hcnYvRE9NLVVSTC1Qb2x5ZmlsbC9ibG9iL21hc3Rlci9zcmMvdXJsLmpzXHJcbiAgICovXHJcblxyXG4gIHZhciBjaGVja0lmVVJMSXNTdXBwb3J0ZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciB1ID0gbmV3IFVSTCgnYicsICdodHRwOi8vYScpO1xyXG4gICAgICB1LnBhdGhuYW1lID0gJ2MlMjBkJztcclxuICAgICAgcmV0dXJuICh1LmhyZWYgPT09ICdodHRwOi8vYS9jJTIwZCcpICYmIHUuc2VhcmNoUGFyYW1zO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIHZhciBwb2x5ZmlsbFVSTCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIF9VUkwgPSBnbG9iYWwuVVJMO1xyXG5cclxuICAgIHZhciBVUkwgPSBmdW5jdGlvbih1cmwsIGJhc2UpIHtcclxuICAgICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB1cmwgPSBTdHJpbmcodXJsKTtcclxuXHJcbiAgICAgIC8vIE9ubHkgY3JlYXRlIGFub3RoZXIgZG9jdW1lbnQgaWYgdGhlIGJhc2UgaXMgZGlmZmVyZW50IGZyb20gY3VycmVudCBsb2NhdGlvbi5cclxuICAgICAgdmFyIGRvYyA9IGRvY3VtZW50LCBiYXNlRWxlbWVudDtcclxuICAgICAgaWYgKGJhc2UgJiYgKGdsb2JhbC5sb2NhdGlvbiA9PT0gdm9pZCAwIHx8IGJhc2UgIT09IGdsb2JhbC5sb2NhdGlvbi5ocmVmKSkge1xyXG4gICAgICAgIGRvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnJyk7XHJcbiAgICAgICAgYmFzZUVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnYmFzZScpO1xyXG4gICAgICAgIGJhc2VFbGVtZW50LmhyZWYgPSBiYXNlO1xyXG4gICAgICAgIGRvYy5oZWFkLmFwcGVuZENoaWxkKGJhc2VFbGVtZW50KTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgaWYgKGJhc2VFbGVtZW50LmhyZWYuaW5kZXhPZihiYXNlKSAhPT0gMCkgdGhyb3cgbmV3IEVycm9yKGJhc2VFbGVtZW50LmhyZWYpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVUkwgdW5hYmxlIHRvIHNldCBiYXNlICcgKyBiYXNlICsgJyBkdWUgdG8gJyArIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgYW5jaG9yRWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgIGFuY2hvckVsZW1lbnQuaHJlZiA9IHVybDtcclxuICAgICAgaWYgKGJhc2VFbGVtZW50KSB7XHJcbiAgICAgICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoYW5jaG9yRWxlbWVudCk7XHJcbiAgICAgICAgYW5jaG9yRWxlbWVudC5ocmVmID0gYW5jaG9yRWxlbWVudC5ocmVmOyAvLyBmb3JjZSBocmVmIHRvIHJlZnJlc2hcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGFuY2hvckVsZW1lbnQucHJvdG9jb2wgPT09ICc6JyB8fCAhLzovLnRlc3QoYW5jaG9yRWxlbWVudC5ocmVmKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVVJMJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2FuY2hvckVsZW1lbnQnLCB7XHJcbiAgICAgICAgdmFsdWU6IGFuY2hvckVsZW1lbnRcclxuICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgLy8gY3JlYXRlIGEgbGlua2VkIHNlYXJjaFBhcmFtcyB3aGljaCByZWZsZWN0IGl0cyBjaGFuZ2VzIG9uIFVSTFxyXG4gICAgICB2YXIgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh0aGlzLnNlYXJjaCk7XHJcbiAgICAgIHZhciBlbmFibGVTZWFyY2hVcGRhdGUgPSB0cnVlO1xyXG4gICAgICB2YXIgZW5hYmxlU2VhcmNoUGFyYW1zVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgWydhcHBlbmQnLCAnZGVsZXRlJywgJ3NldCddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kTmFtZSkge1xyXG4gICAgICAgIHZhciBtZXRob2QgPSBzZWFyY2hQYXJhbXNbbWV0aG9kTmFtZV07XHJcbiAgICAgICAgc2VhcmNoUGFyYW1zW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBtZXRob2QuYXBwbHkoc2VhcmNoUGFyYW1zLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgaWYgKGVuYWJsZVNlYXJjaFVwZGF0ZSkge1xyXG4gICAgICAgICAgICBlbmFibGVTZWFyY2hQYXJhbXNVcGRhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgX3RoaXMuc2VhcmNoID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGVuYWJsZVNlYXJjaFBhcmFtc1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3NlYXJjaFBhcmFtcycsIHtcclxuICAgICAgICB2YWx1ZTogc2VhcmNoUGFyYW1zLFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB2YXIgc2VhcmNoID0gdm9pZCAwO1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ191cGRhdGVTZWFyY2hQYXJhbXMnLCB7XHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2VhcmNoICE9PSBzZWFyY2gpIHtcclxuICAgICAgICAgICAgc2VhcmNoID0gdGhpcy5zZWFyY2g7XHJcbiAgICAgICAgICAgIGlmIChlbmFibGVTZWFyY2hQYXJhbXNVcGRhdGUpIHtcclxuICAgICAgICAgICAgICBlbmFibGVTZWFyY2hVcGRhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5fZnJvbVN0cmluZyh0aGlzLnNlYXJjaCk7XHJcbiAgICAgICAgICAgICAgZW5hYmxlU2VhcmNoVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBwcm90byA9IFVSTC5wcm90b3R5cGU7XHJcblxyXG4gICAgdmFyIGxpbmtVUkxXaXRoQW5jaG9yQXR0cmlidXRlID0gZnVuY3Rpb24oYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sIGF0dHJpYnV0ZU5hbWUsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckVsZW1lbnRbYXR0cmlidXRlTmFtZV07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLl9hbmNob3JFbGVtZW50W2F0dHJpYnV0ZU5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBbJ2hhc2gnLCAnaG9zdCcsICdob3N0bmFtZScsICdwb3J0JywgJ3Byb3RvY29sJ11cclxuICAgICAgLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICAgIGxpbmtVUkxXaXRoQW5jaG9yQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdzZWFyY2gnLCB7XHJcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckVsZW1lbnRbJ3NlYXJjaCddO1xyXG4gICAgICB9LFxyXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fYW5jaG9yRWxlbWVudFsnc2VhcmNoJ10gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl91cGRhdGVTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgfSxcclxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMocHJvdG8sIHtcclxuXHJcbiAgICAgICd0b1N0cmluZyc6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmhyZWY7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuXHJcbiAgICAgICdocmVmJzoge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYW5jaG9yRWxlbWVudC5ocmVmLnJlcGxhY2UoL1xcPyQvLCAnJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLl9hbmNob3JFbGVtZW50LmhyZWYgPSB2YWx1ZTtcclxuICAgICAgICAgIHRoaXMuX3VwZGF0ZVNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ3BhdGhuYW1lJzoge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYW5jaG9yRWxlbWVudC5wYXRobmFtZS5yZXBsYWNlKC8oXlxcLz8pLywgJy8nKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMuX2FuY2hvckVsZW1lbnQucGF0aG5hbWUgPSB2YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgICdvcmlnaW4nOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIC8vIGdldCBleHBlY3RlZCBwb3J0IGZyb20gcHJvdG9jb2xcclxuICAgICAgICAgIHZhciBleHBlY3RlZFBvcnQgPSB7ICdodHRwOic6IDgwLCAnaHR0cHM6JzogNDQzLCAnZnRwOic6IDIxIH1bdGhpcy5fYW5jaG9yRWxlbWVudC5wcm90b2NvbF07XHJcbiAgICAgICAgICAvLyBhZGQgcG9ydCB0byBvcmlnaW4gaWYsIGV4cGVjdGVkIHBvcnQgaXMgZGlmZmVyZW50IHRoYW4gYWN0dWFsIHBvcnRcclxuICAgICAgICAgIC8vIGFuZCBpdCBpcyBub3QgZW1wdHkgZi5lIGh0dHA6Ly9mb286ODA4MFxyXG4gICAgICAgICAgLy8gODA4MCAhPSA4MCAmJiA4MDgwICE9ICcnXHJcbiAgICAgICAgICB2YXIgYWRkUG9ydFRvT3JpZ2luID0gdGhpcy5fYW5jaG9yRWxlbWVudC5wb3J0ICE9IGV4cGVjdGVkUG9ydCAmJlxyXG4gICAgICAgICAgICB0aGlzLl9hbmNob3JFbGVtZW50LnBvcnQgIT09ICcnO1xyXG5cclxuICAgICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JFbGVtZW50LnByb3RvY29sICtcclxuICAgICAgICAgICAgJy8vJyArXHJcbiAgICAgICAgICAgIHRoaXMuX2FuY2hvckVsZW1lbnQuaG9zdG5hbWUgK1xyXG4gICAgICAgICAgICAoYWRkUG9ydFRvT3JpZ2luID8gKCc6JyArIHRoaXMuX2FuY2hvckVsZW1lbnQucG9ydCkgOiAnJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAncGFzc3dvcmQnOiB7IC8vIFRPRE9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ3VzZXJuYW1lJzogeyAvLyBUT0RPXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIFVSTC5jcmVhdGVPYmplY3RVUkwgPSBmdW5jdGlvbihibG9iKSB7XHJcbiAgICAgIHJldHVybiBfVVJMLmNyZWF0ZU9iamVjdFVSTC5hcHBseShfVVJMLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgIHJldHVybiBfVVJMLnJldm9rZU9iamVjdFVSTC5hcHBseShfVVJMLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBnbG9iYWwuVVJMID0gVVJMO1xyXG5cclxuICB9O1xyXG5cclxuICBpZiAoIWNoZWNrSWZVUkxJc1N1cHBvcnRlZCgpKSB7XHJcbiAgICBwb2x5ZmlsbFVSTCgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKChnbG9iYWwubG9jYXRpb24gIT09IHZvaWQgMCkgJiYgISgnb3JpZ2luJyBpbiBnbG9iYWwubG9jYXRpb24pKSB7XHJcbiAgICB2YXIgZ2V0T3JpZ2luID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBnbG9iYWwubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lICsgKGdsb2JhbC5sb2NhdGlvbi5wb3J0ID8gKCc6JyArIGdsb2JhbC5sb2NhdGlvbi5wb3J0KSA6ICcnKTtcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGdsb2JhbC5sb2NhdGlvbiwgJ29yaWdpbicsIHtcclxuICAgICAgICBnZXQ6IGdldE9yaWdpbixcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICBnbG9iYWwubG9jYXRpb24ub3JpZ2luID0gZ2V0T3JpZ2luKCk7XHJcbiAgICAgIH0sIDEwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoXHJcbiAgKHR5cGVvZiBjb21tb25qc0dsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpID8gY29tbW9uanNHbG9iYWxcclxuICAgIDogKCh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3dcclxuICAgIDogKCh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpID8gc2VsZiA6IGNvbW1vbmpzR2xvYmFsKSlcclxuKTtcblxudmFyIHVybFBvbHlmaWxsID0ge1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cmxQb2x5ZmlsbDtcbiJdLCJzb3VyY2VSb290IjoiIn0=