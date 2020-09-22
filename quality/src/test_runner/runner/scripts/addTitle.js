var css = 'body::before ' +
    '{' +
        'content: "%s"; ' +
        'font-size: 14px; ' +
        'font-family: "DejaVu Sans Mono", monospace; ' +
        'background: yellow; ' +
        'pointer-events: none; ' +
        'position: fixed; ' +
        'z-index: 999;' +
        'top: 1px;' +
        'left: 1px;'
    '}';

var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);
