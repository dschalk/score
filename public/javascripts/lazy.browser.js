
<!-- saved from url=(0058)https://raw.github.com/dtao/lazy.js/master/lazy.browser.js -->
<html hc="a3" hcx="3"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>13:12:08PM THUR FEB 13</title></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">(function(Lazy) {

  /**
   * A seqence of DOM nodes.
   *
   * You can get a `DomSequence` by wrapping a `NodeList` or `HTMLCollection`
   * with `Lazy`:
   *
   *     var paragraphs = Lazy(document.querySelectorAll('p'));
   *
   * @public
   * @constructor
   * @param {NodeList|HTMLCollection} source The underlying collection of DOM
   *     nodes.
   */
  function DomSequence(source) {
    this.source = source;
  }

  DomSequence.prototype = new Lazy.ArrayLikeSequence();

  DomSequence.prototype.get = function(i) {
    return this.source[i];
  };

  DomSequence.prototype.length = function() {
    return this.source.length;
  };

  /**
   * Provides a sequence comprising all of this sequence's nodes and their
   * descendents (children, grandchildren, etc.).
   *
   * @public
   * @returns {Sequence}
   */
  DomSequence.prototype.flatten = function() {
    return new FlattenedDomSequence(this.source);
  };

  function FlattenedDomSequence(source) {
    this.source = source;
  }

  FlattenedDomSequence.prototype = new Lazy.Sequence();

  FlattenedDomSequence.prototype.each = function(fn) {
    var i    = 0,
        done = false;

    Lazy(this.source).each(function(child) {
      if (fn(child, i++) === false) {
        return false;
      }

      Lazy(child.children).flatten().each(function(descendent) {
        if (fn(descendent, i++) === false) {
          done = true;
          return false;
        }
      });

      if (done) {
        return false;
      }
    });
  };

  /**
   * Creates a sequence comprising all of the `Event` objects from the given
   * event propagating through the node(s) in the current sequence.
   *
   * @public
   * @param {string} eventName The name of the event to catch.
   * @returns {AsyncSequence}
   */
  DomSequence.prototype.on = function(eventName) {
    return new DomEventSequence(this.source, eventName);
  };

  function DomEventSequence(element, eventName) {
    this.element = element;
    this.eventName = eventName;
  }

  DomEventSequence.prototype = new Lazy.Sequence();

  /**
   * Handles every event in this sequence.
   *
   * @param {function(Event):*} fn The function to call on each event in the
   *     sequence. Return false from the function to stop handling the events.
   */
  DomEventSequence.prototype.each = function(fn) {
    var element = this.element,
        eventName = this.eventName;

    var listener = function(e) {
      if (fn(e) === false) {
        element.removeEventListener(eventName, listener);
      }
    };

    this.element.addEventListener(this.eventName, listener);
  };

  /**
   * Creates a {@link Sequence} from the specified DOM events triggered on the
   * given element. This sequence works asynchronously, so synchronous methods
   * such as {@code indexOf}, {@code any}, and {@code toArray} won't work.
   *
   * @param {Element} element The DOM element to capture events from.
   * @param {string} eventName The name of the event type (e.g., 'keypress')
   *     that will make up this sequence.
   * @return {Sequence} The sequence of events.
   */
  Lazy.events = Lazy.deprecate(
    "Lazy.events is deprecated. Use Lazy('selector').on('event') instead",
    function(element, eventName) {
      return new DomEventSequence(element, eventName);
    }
  );

  /**
   * A `StreamingHttpSequence` is a {@link StreamLikeSequence} comprising the
   * chunks of data that are streamed in response to an HTTP request.
   *
   * @public
   * @param {string} url The URL of the HTTP request.
   * @constructor
   */
  function StreamingHttpSequence(url) {
    this.url = url;
  }

  StreamingHttpSequence.prototype = new Lazy.StreamLikeSequence();

  StreamingHttpSequence.prototype.each = function each(fn) {
    var request = new XMLHttpRequest(),
        index   = 0,
        aborted = false;

    request.open("GET", this.url);

    var listener = function listener(data) {
      if (!aborted) {
        data = request.responseText.substring(index);
        if (fn(data) === false) {
          request.removeEventListener("progress", listener, false);
          request.abort();
          aborted = true;
        }
        index += data.length;
      }
    };

    request.addEventListener("progress", listener, false);

    request.send();
  };

  /*
   * Add support for `Lazy(NodeList)` and `Lazy(HTMLCollection)`.
   */
  Lazy.extensions || (Lazy.extensions = []);

  Lazy.extensions.push(function(source) {
    if (source instanceof NodeList || source instanceof HTMLCollection) {
      return new DomSequence(source);
    }
  });

}(window.Lazy));
</pre><span id="hc_extension_svg_filters" hidden=""><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter id="hc_extension_off"><fecomponenttransfer><fefuncr type="table" tableValues="0 1"></fefuncr><fefuncg type="table" tableValues="0 1"></fefuncg><fefuncb type="table" tableValues="0 1"></fefuncb></fecomponenttransfer></filter><filter id="hc_extension_highcontrast"><fecomponenttransfer><fefuncr type="gamma" exponent="3.0"></fefuncr><fefuncg type="gamma" exponent="3.0"></fefuncg><fefuncb type="gamma" exponent="3.0"></fefuncb></fecomponenttransfer></filter><filter id="hc_extension_highcontrast_back"><fecomponenttransfer><fefuncr type="gamma" exponent="0.33"></fefuncr><fefuncg type="gamma" exponent="0.33"></fefuncg><fefuncb type="gamma" exponent="0.33"></fefuncb></fecomponenttransfer></filter><filter id="hc_extension_grayscale"><fecolormatrix type="matrix" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0"></fecolormatrix><fecomponenttransfer><fefuncr type="gamma" exponent="3"></fefuncr><fefuncg type="gamma" exponent="3"></fefuncg><fefuncb type="gamma" exponent="3"></fefuncb></fecomponenttransfer></filter><filter id="hc_extension_grayscale_back"><fecomponenttransfer><fefuncr type="gamma" exponent="0.33"></fefuncr><fefuncg type="gamma" exponent="0.33"></fefuncg><fefuncb type="gamma" exponent="0.33"></fefuncb></fecomponenttransfer></filter><filter id="hc_extension_invert"><fecomponenttransfer><fefuncr type="gamma" amplitude="-1" exponent="3" offset="1"></fefuncr><fefuncg type="gamma" amplitude="-1" exponent="3" offset="1"></fefuncg><fefuncb type="gamma" amplitude="-1" exponent="3" offset="1"></fefuncb></fecomponenttransfer></filter><filter id="hc_extension_invert_back"><fecomponenttransfer><fefuncr type="table" tableValues="1 0"></fefuncr><fefuncg type="table" tableValues="1 0"></fefuncg><fefuncb type="table" tableValues="1 0"></fefuncb></fecomponenttransfer><fecomponenttransfer><fefuncr type="gamma" exponent="1.7"></fefuncr><fefuncg type="gamma" exponent="1.7"></fefuncg><fefuncb type="gamma" exponent="1.7"></fefuncb></fecomponenttransfer></filter><filter id="hc_extension_invert_grayscale"><fecolormatrix type="matrix" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0"></fecolormatrix><fecomponenttransfer><fefuncr type="gamma" amplitude="-1" exponent="3" offset="1"></fefuncr><fefuncg type="gamma" amplitude="-1" exponent="3" offset="1"></fefuncg><fefuncb type="gamma" amplitude="-1" exponent="3" offset="1"></fefuncb></fecomponenttransfer></filter><filter id="hc_extension_yellow_on_black"><fecomponenttransfer><fefuncr type="gamma" amplitude="-1" exponent="3" offset="1"></fefuncr><fefuncg type="gamma" amplitude="-1" exponent="3" offset="1"></fefuncg><fefuncb type="gamma" amplitude="-1" exponent="3" offset="1"></fefuncb></fecomponenttransfer><fecolormatrix type="matrix" values="0.3 0.5 0.2 0 0 0.3 0.5 0.2 0 0 0 0 0 0 0 0 0 0 1 0"></fecolormatrix></filter><filter id="hc_extension_yellow_on_black_back"><fecomponenttransfer><fefuncr type="table" tableValues="1 0"></fefuncr><fefuncg type="table" tableValues="1 0"></fefuncg><fefuncb type="table" tableValues="1 0"></fefuncb></fecomponenttransfer><fecomponenttransfer><fefuncr type="gamma" exponent="0.33"></fefuncr><fefuncg type="gamma" exponent="0.33"></fefuncg><fefuncb type="gamma" exponent="0.33"></fefuncb></fecomponenttransfer></filter></defs></svg></span></body></html>