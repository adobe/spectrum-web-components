(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 27:
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ 30:
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(27)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYnVuZGxlZC1lcy1tb2R1bGVzL3VybC1wb2x5ZmlsbC91cmwtcG9seWZpbGwuanMiXSwibmFtZXMiOlsiZyIsIkZ1bmN0aW9uIiwiZSIsIndpbmRvdyIsIm1vZHVsZSIsImV4cG9ydHMiLCJjb21tb25qc0dsb2JhbCIsImdsb2JhbCIsInNlbGYiLCJjaGVja0lmSXRlcmF0b3JJc1N1cHBvcnRlZCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiZXJyb3IiLCJpdGVyYXRvclN1cHBvcnRlZCIsImNyZWF0ZUl0ZXJhdG9yIiwiaXRlbXMiLCJuZXh0IiwidmFsdWUiLCJzaGlmdCIsImRvbmUiLCJzZXJpYWxpemVQYXJhbSIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlcGxhY2UiLCJkZXNlcmlhbGl6ZVBhcmFtIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicG9seWZpbGxVUkxTZWFyY2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJzZWFyY2hTdHJpbmciLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsIndyaXRhYmxlIiwidHlwZW9mU2VhcmNoU3RyaW5nIiwiX2Zyb21TdHJpbmciLCJfdGhpcyIsImZvckVhY2giLCJuYW1lIiwiYXBwZW5kIiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiaSIsImxlbmd0aCIsImVudHJ5IiwiVHlwZUVycm9yIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJwcm90byIsIl9lbnRyaWVzIiwicHVzaCIsIlN0cmluZyIsImRlbGV0ZSIsImdldCIsImdldEFsbCIsInNsaWNlIiwiaGFzIiwic2V0IiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwiZW50cmllcyIsImtleXMiLCJ2YWx1ZXMiLCJzZWFyY2hBcnJheSIsImpvaW4iLCJzb3J0IiwiYSIsImIiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiYXR0cmlidXRlcyIsInNwbGl0IiwiYXR0cmlidXRlIiwiY2hlY2tJZlVSTElzU3VwcG9ydGVkIiwidSIsIlVSTCIsInBhdGhuYW1lIiwiaHJlZiIsInNlYXJjaFBhcmFtcyIsInBvbHlmaWxsVVJMIiwiX1VSTCIsInVybCIsImJhc2UiLCJkb2MiLCJkb2N1bWVudCIsImJhc2VFbGVtZW50IiwibG9jYXRpb24iLCJpbXBsZW1lbnRhdGlvbiIsImNyZWF0ZUhUTUxEb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJpbmRleE9mIiwiRXJyb3IiLCJlcnIiLCJhbmNob3JFbGVtZW50IiwiYm9keSIsInByb3RvY29sIiwidGVzdCIsInNlYXJjaCIsImVuYWJsZVNlYXJjaFVwZGF0ZSIsImVuYWJsZVNlYXJjaFBhcmFtc1VwZGF0ZSIsIm1ldGhvZE5hbWUiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsImxpbmtVUkxXaXRoQW5jaG9yQXR0cmlidXRlIiwiYXR0cmlidXRlTmFtZSIsIl9hbmNob3JFbGVtZW50IiwiX3VwZGF0ZVNlYXJjaFBhcmFtcyIsImRlZmluZVByb3BlcnRpZXMiLCJleHBlY3RlZFBvcnQiLCJhZGRQb3J0VG9PcmlnaW4iLCJwb3J0IiwiaG9zdG5hbWUiLCJjcmVhdGVPYmplY3RVUkwiLCJibG9iIiwicmV2b2tlT2JqZWN0VVJMIiwiZ2V0T3JpZ2luIiwic2V0SW50ZXJ2YWwiLCJvcmlnaW4iLCJ1cmxQb2x5ZmlsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFJQSxDQUFKLEMsQ0FFQTs7QUFDQUEsQ0FBQyxHQUFJLFlBQVc7QUFDZixTQUFPLElBQVA7QUFDQSxDQUZHLEVBQUo7O0FBSUEsSUFBSTtBQUNIO0FBQ0FBLEdBQUMsR0FBR0EsQ0FBQyxJQUFJLElBQUlDLFFBQUosQ0FBYSxhQUFiLEdBQVQ7QUFDQSxDQUhELENBR0UsT0FBT0MsQ0FBUCxFQUFVO0FBQ1g7QUFDQSxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0NILENBQUMsR0FB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LElBQTlDLEdBQXNELEVBQXBILENBQVA7QUFDRCxLQUZEOztBQUlBLFFBQUk7QUFDRm5GLFlBQU0sQ0FBQ0MsY0FBUCxDQUFzQnRCLE1BQU0sQ0FBQzZFLFFBQTdCLEVBQXVDLFFBQXZDLEVBQWlEO0FBQy9DakMsV0FBRyxFQUFFaUUsU0FEMEM7QUFFL0NsRCxrQkFBVSxFQUFFO0FBRm1DLE9BQWpEO0FBSUQsS0FMRCxDQUtFLE9BQU9oRSxDQUFQLEVBQVU7QUFDVm1ILGlCQUFXLENBQUMsWUFBVztBQUNyQjlHLGNBQU0sQ0FBQzZFLFFBQVAsQ0FBZ0JrQyxNQUFoQixHQUF5QkYsU0FBUyxFQUFsQztBQUNELE9BRlUsRUFFUixHQUZRLENBQVg7QUFHRDtBQUNGO0FBRUYsQ0FsT0QsRUFtT0csT0FBTzlHLGNBQVAsS0FBMEIsV0FBM0IsR0FBMENBLGNBQTFDLEdBQ00sT0FBT0gsTUFBUCxLQUFrQixXQUFuQixHQUFrQ0EsTUFBbEMsR0FDQyxPQUFPSyxJQUFQLEtBQWdCLFdBQWpCLEdBQWdDQSxJQUFoQyxHQUF1Q0YsY0FyTzlDOztBQXdPQSxJQUFJaUgsV0FBVyxHQUFHLEVBQWxCO0FBSWVBLDBFQUFmLEUiLCJmaWxlIjoiMy45MTY3MWE4MDI1ZTMyNTMyYzZiYi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsInZhciBjb21tb25qc0dsb2JhbCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDoge307XG5cbihmdW5jdGlvbihnbG9iYWwpIHtcclxuICAvKipcclxuICAgKiBQb2x5ZmlsbCBVUkxTZWFyY2hQYXJhbXNcclxuICAgKlxyXG4gICAqIEluc3BpcmVkIGZyb20gOiBodHRwczovL2dpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi91cmwtc2VhcmNoLXBhcmFtcy9ibG9iL21hc3Rlci9zcmMvdXJsLXNlYXJjaC1wYXJhbXMuanNcclxuICAgKi9cclxuXHJcbiAgdmFyIGNoZWNrSWZJdGVyYXRvcklzU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gISFTeW1ib2wuaXRlcmF0b3I7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIHZhciBpdGVyYXRvclN1cHBvcnRlZCA9IGNoZWNrSWZJdGVyYXRvcklzU3VwcG9ydGVkKCk7XHJcblxyXG4gIHZhciBjcmVhdGVJdGVyYXRvciA9IGZ1bmN0aW9uKGl0ZW1zKSB7XHJcbiAgICB2YXIgaXRlcmF0b3IgPSB7XHJcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KCk7XHJcbiAgICAgICAgcmV0dXJuIHsgZG9uZTogdmFsdWUgPT09IHZvaWQgMCwgdmFsdWU6IHZhbHVlIH07XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGl0ZXJhdG9yU3VwcG9ydGVkKSB7XHJcbiAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGl0ZXJhdG9yO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBwYXJhbSBuYW1lIGFuZCB2YWx1ZXMgc2hvdWxkIGJlIGVuY29kZWQgYWNjb3JkaW5nIHRvIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsZW5jb2RlZC1zZXJpYWxpemluZ1xyXG4gICAqIGVuY29kZVVSSUNvbXBvbmVudCgpIHByb2R1Y2VzIHRoZSBzYW1lIHJlc3VsdCBleGNlcHQgZW5jb2Rpbmcgc3BhY2VzIGFzIGAlMjBgIGluc3RlYWQgb2YgYCtgLlxyXG4gICAqL1xyXG4gIHZhciBzZXJpYWxpemVQYXJhbSA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKS5yZXBsYWNlKC8lMjAvZywgJysnKTtcclxuICB9O1xyXG5cclxuICB2YXIgZGVzZXJpYWxpemVQYXJhbSA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcclxuICB9O1xyXG5cclxuICB2YXIgcG9seWZpbGxVUkxTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgVVJMU2VhcmNoUGFyYW1zID0gZnVuY3Rpb24oc2VhcmNoU3RyaW5nKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2VudHJpZXMnLCB7IHdyaXRhYmxlOiB0cnVlLCB2YWx1ZToge30gfSk7XHJcbiAgICAgIHZhciB0eXBlb2ZTZWFyY2hTdHJpbmcgPSB0eXBlb2Ygc2VhcmNoU3RyaW5nO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZlNlYXJjaFN0cmluZyA9PT0gJ3VuZGVmaW5lZCcpIDsgZWxzZSBpZiAodHlwZW9mU2VhcmNoU3RyaW5nID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlmIChzZWFyY2hTdHJpbmcgIT09ICcnKSB7XHJcbiAgICAgICAgICB0aGlzLl9mcm9tU3RyaW5nKHNlYXJjaFN0cmluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHNlYXJjaFN0cmluZyBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgc2VhcmNoU3RyaW5nLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcclxuICAgICAgICAgIF90aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoKHNlYXJjaFN0cmluZyAhPT0gbnVsbCkgJiYgKHR5cGVvZlNlYXJjaFN0cmluZyA9PT0gJ29iamVjdCcpKSB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzZWFyY2hTdHJpbmcpID09PSAnW29iamVjdCBBcnJheV0nKSB7XHJcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlYXJjaFN0cmluZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgZW50cnkgPSBzZWFyY2hTdHJpbmdbaV07XHJcbiAgICAgICAgICAgIGlmICgoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVudHJ5KSA9PT0gJ1tvYmplY3QgQXJyYXldJykgfHwgKGVudHJ5Lmxlbmd0aCAhPT0gMikpIHtcclxuICAgICAgICAgICAgICB0aGlzLmFwcGVuZChlbnRyeVswXSwgZW50cnlbMV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFtzdHJpbmcsIGFueV0gYXMgZW50cnkgYXQgaW5kZXggJyArIGkgKyAnIG9mIFVSTFNlYXJjaFBhcmFtc1xcJ3MgaW5wdXQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VhcmNoU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2hTdHJpbmcuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuYXBwZW5kKGtleSwgc2VhcmNoU3RyaW5nW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vuc3VwcG9ydGVkIGlucHV0XFwncyB0eXBlIGZvciBVUkxTZWFyY2hQYXJhbXMnKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcHJvdG8gPSBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xyXG5cclxuICAgIHByb3RvLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgIGlmIChuYW1lIGluIHRoaXMuX2VudHJpZXMpIHtcclxuICAgICAgICB0aGlzLl9lbnRyaWVzW25hbWVdLnB1c2goU3RyaW5nKHZhbHVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fZW50cmllc1tuYW1lXSA9IFtTdHJpbmcodmFsdWUpXTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5kZWxldGUgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLl9lbnRyaWVzW25hbWVdO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgIHJldHVybiAobmFtZSBpbiB0aGlzLl9lbnRyaWVzKSA/IHRoaXMuX2VudHJpZXNbbmFtZV1bMF0gOiBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5nZXRBbGwgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgIHJldHVybiAobmFtZSBpbiB0aGlzLl9lbnRyaWVzKSA/IHRoaXMuX2VudHJpZXNbbmFtZV0uc2xpY2UoMCkgOiBbXTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uaGFzID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICByZXR1cm4gKG5hbWUgaW4gdGhpcy5fZW50cmllcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2VudHJpZXNbbmFtZV0gPSBbU3RyaW5nKHZhbHVlKV07XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xyXG4gICAgICB2YXIgZW50cmllcztcclxuICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLl9lbnRyaWVzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2VudHJpZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICAgIGVudHJpZXMgPSB0aGlzLl9lbnRyaWVzW25hbWVdO1xyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgZW50cmllc1tpXSwgbmFtZSwgdGhpcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmtleXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGl0ZW1zID0gW107XHJcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xyXG4gICAgICAgIGl0ZW1zLnB1c2gobmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3IoaXRlbXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by52YWx1ZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGl0ZW1zID0gW107XHJcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGl0ZW1zLnB1c2godmFsdWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yKGl0ZW1zKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uZW50cmllcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvcihpdGVtcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChpdGVyYXRvclN1cHBvcnRlZCkge1xyXG4gICAgICBwcm90b1tTeW1ib2wuaXRlcmF0b3JdID0gcHJvdG8uZW50cmllcztcclxuICAgIH1cclxuXHJcbiAgICBwcm90by50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgc2VhcmNoQXJyYXkgPSBbXTtcclxuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgc2VhcmNoQXJyYXkucHVzaChzZXJpYWxpemVQYXJhbShuYW1lKSArICc9JyArIHNlcmlhbGl6ZVBhcmFtKHZhbHVlKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gc2VhcmNoQXJyYXkuam9pbignJicpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgZ2xvYmFsLlVSTFNlYXJjaFBhcmFtcyA9IFVSTFNlYXJjaFBhcmFtcztcclxuICB9O1xyXG5cclxuICBpZiAoISgnVVJMU2VhcmNoUGFyYW1zJyBpbiBnbG9iYWwpIHx8IChuZXcgVVJMU2VhcmNoUGFyYW1zKCc/YT0xJykudG9TdHJpbmcoKSAhPT0gJ2E9MScpKSB7XHJcbiAgICBwb2x5ZmlsbFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHByb3RvID0gVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZTtcclxuXHJcbiAgaWYgKHR5cGVvZiBwcm90by5zb3J0ICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBwcm90by5zb3J0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgIHZhciBpdGVtcyA9IFtdO1xyXG4gICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcclxuICAgICAgICBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xyXG4gICAgICAgIGlmICghX3RoaXMuX2VudHJpZXMpIHtcclxuICAgICAgICAgIF90aGlzLmRlbGV0ZShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdGVtcy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICBpZiAoYVswXSA8IGJbMF0pIHtcclxuICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFbMF0gPiBiWzBdKSB7XHJcbiAgICAgICAgICByZXR1cm4gKzE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChfdGhpcy5fZW50cmllcykgeyAvLyBmb3JjZSByZXNldCBiZWNhdXNlIElFIGtlZXBzIGtleXMgaW5kZXhcclxuICAgICAgICBfdGhpcy5fZW50cmllcyA9IHt9O1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmFwcGVuZChpdGVtc1tpXVswXSwgaXRlbXNbaV1bMV0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBwcm90by5fZnJvbVN0cmluZyAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnX2Zyb21TdHJpbmcnLCB7XHJcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihzZWFyY2hTdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5fZW50cmllcykge1xyXG4gICAgICAgICAgdGhpcy5fZW50cmllcyA9IHt9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIga2V5cyA9IFtdO1xyXG4gICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgICAgIGtleXMucHVzaChuYW1lKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlKGtleXNbaV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VhcmNoU3RyaW5nID0gc2VhcmNoU3RyaW5nLnJlcGxhY2UoL15cXD8vLCAnJyk7XHJcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBzZWFyY2hTdHJpbmcuc3BsaXQoJyYnKTtcclxuICAgICAgICB2YXIgYXR0cmlidXRlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgdGhpcy5hcHBlbmQoXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplUGFyYW0oYXR0cmlidXRlWzBdKSxcclxuICAgICAgICAgICAgKGF0dHJpYnV0ZS5sZW5ndGggPiAxKSA/IGRlc2VyaWFsaXplUGFyYW0oYXR0cmlidXRlWzFdKSA6ICcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBIVE1MQW5jaG9yRWxlbWVudFxyXG5cclxufSkoXHJcbiAgKHR5cGVvZiBjb21tb25qc0dsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpID8gY29tbW9uanNHbG9iYWxcclxuICAgIDogKCh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3dcclxuICAgIDogKCh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpID8gc2VsZiA6IGNvbW1vbmpzR2xvYmFsKSlcclxuKTtcclxuXHJcbihmdW5jdGlvbihnbG9iYWwpIHtcclxuICAvKipcclxuICAgKiBQb2x5ZmlsbCBVUkxcclxuICAgKlxyXG4gICAqIEluc3BpcmVkIGZyb20gOiBodHRwczovL2dpdGh1Yi5jb20vYXJ2L0RPTS1VUkwtUG9seWZpbGwvYmxvYi9tYXN0ZXIvc3JjL3VybC5qc1xyXG4gICAqL1xyXG5cclxuICB2YXIgY2hlY2tJZlVSTElzU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgdSA9IG5ldyBVUkwoJ2InLCAnaHR0cDovL2EnKTtcclxuICAgICAgdS5wYXRobmFtZSA9ICdjJTIwZCc7XHJcbiAgICAgIHJldHVybiAodS5ocmVmID09PSAnaHR0cDovL2EvYyUyMGQnKSAmJiB1LnNlYXJjaFBhcmFtcztcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICB2YXIgcG9seWZpbGxVUkwgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBfVVJMID0gZ2xvYmFsLlVSTDtcclxuXHJcbiAgICB2YXIgVVJMID0gZnVuY3Rpb24odXJsLCBiYXNlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykgdXJsID0gU3RyaW5nKHVybCk7XHJcblxyXG4gICAgICAvLyBPbmx5IGNyZWF0ZSBhbm90aGVyIGRvY3VtZW50IGlmIHRoZSBiYXNlIGlzIGRpZmZlcmVudCBmcm9tIGN1cnJlbnQgbG9jYXRpb24uXHJcbiAgICAgIHZhciBkb2MgPSBkb2N1bWVudCwgYmFzZUVsZW1lbnQ7XHJcbiAgICAgIGlmIChiYXNlICYmIChnbG9iYWwubG9jYXRpb24gPT09IHZvaWQgMCB8fCBiYXNlICE9PSBnbG9iYWwubG9jYXRpb24uaHJlZikpIHtcclxuICAgICAgICBkb2MgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoJycpO1xyXG4gICAgICAgIGJhc2VFbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2Jhc2UnKTtcclxuICAgICAgICBiYXNlRWxlbWVudC5ocmVmID0gYmFzZTtcclxuICAgICAgICBkb2MuaGVhZC5hcHBlbmRDaGlsZChiYXNlRWxlbWVudCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGlmIChiYXNlRWxlbWVudC5ocmVmLmluZGV4T2YoYmFzZSkgIT09IDApIHRocm93IG5ldyBFcnJvcihiYXNlRWxlbWVudC5ocmVmKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVVJMIHVuYWJsZSB0byBzZXQgYmFzZSAnICsgYmFzZSArICcgZHVlIHRvICcgKyBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGFuY2hvckVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICBhbmNob3JFbGVtZW50LmhyZWYgPSB1cmw7XHJcbiAgICAgIGlmIChiYXNlRWxlbWVudCkge1xyXG4gICAgICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKGFuY2hvckVsZW1lbnQpO1xyXG4gICAgICAgIGFuY2hvckVsZW1lbnQuaHJlZiA9IGFuY2hvckVsZW1lbnQuaHJlZjsgLy8gZm9yY2UgaHJlZiB0byByZWZyZXNoXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhbmNob3JFbGVtZW50LnByb3RvY29sID09PSAnOicgfHwgIS86Ly50ZXN0KGFuY2hvckVsZW1lbnQuaHJlZikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFVSTCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19hbmNob3JFbGVtZW50Jywge1xyXG4gICAgICAgIHZhbHVlOiBhbmNob3JFbGVtZW50XHJcbiAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgIC8vIGNyZWF0ZSBhIGxpbmtlZCBzZWFyY2hQYXJhbXMgd2hpY2ggcmVmbGVjdCBpdHMgY2hhbmdlcyBvbiBVUkxcclxuICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXModGhpcy5zZWFyY2gpO1xyXG4gICAgICB2YXIgZW5hYmxlU2VhcmNoVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgdmFyIGVuYWJsZVNlYXJjaFBhcmFtc1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgIFsnYXBwZW5kJywgJ2RlbGV0ZScsICdzZXQnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICB2YXIgbWV0aG9kID0gc2VhcmNoUGFyYW1zW21ldGhvZE5hbWVdO1xyXG4gICAgICAgIHNlYXJjaFBhcmFtc1ttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgbWV0aG9kLmFwcGx5KHNlYXJjaFBhcmFtcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgIGlmIChlbmFibGVTZWFyY2hVcGRhdGUpIHtcclxuICAgICAgICAgICAgZW5hYmxlU2VhcmNoUGFyYW1zVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIF90aGlzLnNlYXJjaCA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBlbmFibGVTZWFyY2hQYXJhbXNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzZWFyY2hQYXJhbXMnLCB7XHJcbiAgICAgICAgdmFsdWU6IHNlYXJjaFBhcmFtcyxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdmFyIHNlYXJjaCA9IHZvaWQgMDtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfdXBkYXRlU2VhcmNoUGFyYW1zJywge1xyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICh0aGlzLnNlYXJjaCAhPT0gc2VhcmNoKSB7XHJcbiAgICAgICAgICAgIHNlYXJjaCA9IHRoaXMuc2VhcmNoO1xyXG4gICAgICAgICAgICBpZiAoZW5hYmxlU2VhcmNoUGFyYW1zVXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgZW5hYmxlU2VhcmNoVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuX2Zyb21TdHJpbmcodGhpcy5zZWFyY2gpO1xyXG4gICAgICAgICAgICAgIGVuYWJsZVNlYXJjaFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcHJvdG8gPSBVUkwucHJvdG90eXBlO1xyXG5cclxuICAgIHZhciBsaW5rVVJMV2l0aEFuY2hvckF0dHJpYnV0ZSA9IGZ1bmN0aW9uKGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCBhdHRyaWJ1dGVOYW1lLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JFbGVtZW50W2F0dHJpYnV0ZU5hbWVdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5fYW5jaG9yRWxlbWVudFthdHRyaWJ1dGVOYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgWydoYXNoJywgJ2hvc3QnLCAnaG9zdG5hbWUnLCAncG9ydCcsICdwcm90b2NvbCddXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgICBsaW5rVVJMV2l0aEFuY2hvckF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnc2VhcmNoJywge1xyXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JFbGVtZW50WydzZWFyY2gnXTtcclxuICAgICAgfSxcclxuICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2FuY2hvckVsZW1lbnRbJ3NlYXJjaCddID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlU2VhcmNoUGFyYW1zKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgIH0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHByb3RvLCB7XHJcblxyXG4gICAgICAndG9TdHJpbmcnOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5ocmVmO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAnaHJlZic6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckVsZW1lbnQuaHJlZi5yZXBsYWNlKC9cXD8kLywgJycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5fYW5jaG9yRWxlbWVudC5ocmVmID0gdmFsdWU7XHJcbiAgICAgICAgICB0aGlzLl91cGRhdGVTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgICdwYXRobmFtZSc6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckVsZW1lbnQucGF0aG5hbWUucmVwbGFjZSgvKF5cXC8/KS8sICcvJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLl9hbmNob3JFbGVtZW50LnBhdGhuYW1lID0gdmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAnb3JpZ2luJzoge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAvLyBnZXQgZXhwZWN0ZWQgcG9ydCBmcm9tIHByb3RvY29sXHJcbiAgICAgICAgICB2YXIgZXhwZWN0ZWRQb3J0ID0geyAnaHR0cDonOiA4MCwgJ2h0dHBzOic6IDQ0MywgJ2Z0cDonOiAyMSB9W3RoaXMuX2FuY2hvckVsZW1lbnQucHJvdG9jb2xdO1xyXG4gICAgICAgICAgLy8gYWRkIHBvcnQgdG8gb3JpZ2luIGlmLCBleHBlY3RlZCBwb3J0IGlzIGRpZmZlcmVudCB0aGFuIGFjdHVhbCBwb3J0XHJcbiAgICAgICAgICAvLyBhbmQgaXQgaXMgbm90IGVtcHR5IGYuZSBodHRwOi8vZm9vOjgwODBcclxuICAgICAgICAgIC8vIDgwODAgIT0gODAgJiYgODA4MCAhPSAnJ1xyXG4gICAgICAgICAgdmFyIGFkZFBvcnRUb09yaWdpbiA9IHRoaXMuX2FuY2hvckVsZW1lbnQucG9ydCAhPSBleHBlY3RlZFBvcnQgJiZcclxuICAgICAgICAgICAgdGhpcy5fYW5jaG9yRWxlbWVudC5wb3J0ICE9PSAnJztcclxuXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYW5jaG9yRWxlbWVudC5wcm90b2NvbCArXHJcbiAgICAgICAgICAgICcvLycgK1xyXG4gICAgICAgICAgICB0aGlzLl9hbmNob3JFbGVtZW50Lmhvc3RuYW1lICtcclxuICAgICAgICAgICAgKGFkZFBvcnRUb09yaWdpbiA/ICgnOicgKyB0aGlzLl9hbmNob3JFbGVtZW50LnBvcnQpIDogJycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ3Bhc3N3b3JkJzogeyAvLyBUT0RPXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgICd1c2VybmFtZSc6IHsgLy8gVE9ET1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBVUkwuY3JlYXRlT2JqZWN0VVJMID0gZnVuY3Rpb24oYmxvYikge1xyXG4gICAgICByZXR1cm4gX1VSTC5jcmVhdGVPYmplY3RVUkwuYXBwbHkoX1VSTCwgYXJndW1lbnRzKTtcclxuICAgIH07XHJcblxyXG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICByZXR1cm4gX1VSTC5yZXZva2VPYmplY3RVUkwuYXBwbHkoX1VSTCwgYXJndW1lbnRzKTtcclxuICAgIH07XHJcblxyXG4gICAgZ2xvYmFsLlVSTCA9IFVSTDtcclxuXHJcbiAgfTtcclxuXHJcbiAgaWYgKCFjaGVja0lmVVJMSXNTdXBwb3J0ZWQoKSkge1xyXG4gICAgcG9seWZpbGxVUkwoKTtcclxuICB9XHJcblxyXG4gIGlmICgoZ2xvYmFsLmxvY2F0aW9uICE9PSB2b2lkIDApICYmICEoJ29yaWdpbicgaW4gZ2xvYmFsLmxvY2F0aW9uKSkge1xyXG4gICAgdmFyIGdldE9yaWdpbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZSArIChnbG9iYWwubG9jYXRpb24ucG9ydCA/ICgnOicgKyBnbG9iYWwubG9jYXRpb24ucG9ydCkgOiAnJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShnbG9iYWwubG9jYXRpb24sICdvcmlnaW4nLCB7XHJcbiAgICAgICAgZ2V0OiBnZXRPcmlnaW4sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZ2xvYmFsLmxvY2F0aW9uLm9yaWdpbiA9IGdldE9yaWdpbigpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pKFxyXG4gICh0eXBlb2YgY29tbW9uanNHbG9iYWwgIT09ICd1bmRlZmluZWQnKSA/IGNvbW1vbmpzR2xvYmFsXHJcbiAgICA6ICgodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93XHJcbiAgICA6ICgodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSA/IHNlbGYgOiBjb21tb25qc0dsb2JhbCkpXHJcbik7XG5cbnZhciB1cmxQb2x5ZmlsbCA9IHtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgdXJsUG9seWZpbGw7XG4iXSwic291cmNlUm9vdCI6IiJ9