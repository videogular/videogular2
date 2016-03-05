export class VgUtils {
    /**
     * Inspired by Paul Irish
     * https://gist.github.com/paulirish/211209
     * @returns {number}
     */
    static getZIndex():number {
        var zIndex:number = 1;
        var elementZIndex:number;

        var tags = document.getElementsByTagName('*');

        for (var i:number = 0, l:number = tags.length; i < l; i++) {
            elementZIndex = parseInt(window.getComputedStyle(tags[i])["z-index"]);

            if (elementZIndex > zIndex) {
                zIndex = elementZIndex + 1;
            }
        }

        return zIndex;
    }

    // Very simple mobile detection, not 100% reliable
    static isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf("IEMobile") !== -1);
    };

    static isiOSDevice() {
        return (navigator.userAgent.match(/ip(hone|ad|od)/i) && !navigator.userAgent.match(/(iemobile)[\/\s]?([\w\.]*)/i));
    };

    static isCordova() {
        return document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    };
}
