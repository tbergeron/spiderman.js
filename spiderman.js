var globalEval = this.execScript || eval;

// Dynamically require files
// files = []
var require = function(files, callback){
  var requireCount = 0;

  var requireFile = function(filePath) {
    requireCount++;

        xhr({ uri: filePath + '.js?r=' + Math.random(), method: 'get' }, function(response){
      globalEval(response);

      requireCount--;

      if (requireCount === 0){
        callback();
      }
    });   
  };

  files.forEach(function(file){
    requireFile(file);
  });
};

// XmlHttpRequest
// Options: uri, method(get/post), jsonData, data
function xhr(options, callback) {
    var xhr = new XMLHttpRequest(),
        method = options.method || 'get';

    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            var response = this.response || this.responseText || this.responseXML;
            callback((isJsonString(response)) ? JSON.parse(response) : response);
        }
    }

    xhr.onerror = function() {
        callback(null);
    }

    xhr.open(method, options.uri);

    if (options.headers) {
        Object.keys(options.headers).forEach(function(key) {
            xhr.setRequestHeader(key, options.headers[key]);
        });
    }

    if (method == 'post') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    if (options.jsonData) {
        xhr.send(urlstringify(options.jsonData));
    } else if (options.data) {
        xhr.send(options.data);
    } else {
        xhr.send(null);
    }

    return xhr;
};

// https://github.com/Titani/SO-ChatBot/blob/ccf6cfe827aee2af7b2832e48720a8e24a8feeed/source/bot.js#L110
var urlstringify = (function() {
    var simplies = { number : true, string : true, boolean : true };

    var singularStringify = function ( thing ) {
        if ( typeof thing in simplies ) {
            return encodeURIComponent( thing.toString() );
        }
        return '';
    };

    var arrayStringify = function ( key, array ) {
        key = singularStringify( key );

        return array.map(function ( val ) {
            return pair( key, val, true );
        });
    };

    var pair = function ( key, val, dontStringifyKey ) {
        if ( !dontStringifyKey ) {
            key = singularStringify( key );
        }

        return key + '=' + singularStringify( val );
    };

    return function urlstringify( obj ) {

        return Object.keys( obj ).map(function ( key ) {
            var val = obj[ key ];

            if ( Array.isArray(val) ) {
                return arrayStringify( key, val );
            } else {
                return pair( key, val );
            }
        }).join( '&' );
    };
}());

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}