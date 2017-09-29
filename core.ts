export * from './src/core/core';

// CustomEvent polyfill for IE9/10/11
(function () {

    if ( typeof window === "undefined" || typeof window['CustomEvent'] === "function" ) return false;

    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window['Event'].prototype;

    window['CustomEvent'] = CustomEvent;
})();
