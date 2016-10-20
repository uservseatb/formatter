function bc2(elements, _index) {

    var index = _index || 0;

    if (!elements) {
        return bc2(document);
    }

    var current = {};
    if (!elements.length) {
        current = elements;
    } else if (elements.length > 0) {
        current = elements[index];
    }

    return {
        byClass: function (className) {
            if (current.getElementsByClassName) {
                return bc2(current.getElementsByClassName(className) || {});
            }
            return bc2({});
        },
        byId: function (idName) {
            if (current.getElementById) {
                return bc2([current.getElementById(idName) || {}]);
            }
            return bc2({});
        },
        elements: function () {
            return elements;
        },
        events: function (domEventName, handler) {
            eachElement(function (element) {
                element[domEventName] = handler;
            });
        },
        addClass: function (className) {
            eachElement(function (element) {
                hProp(element, undefined, "classList").add(className);
            });
        },
        removeClass: function (className) {
            eachElement(function (element) {
                hProp(element, undefined, "classList").remove(className);
            });
        },
        val: function (arg) {
            return hProp(firstElement(), arg, "value");
        },
        text: function (arg) {
            return hProp(firstElement(), arg, "innerText");
        },
        loadDocument: function onLoad(callBack) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", function () {
                    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                    callBack();
                }, false);
            } else {
                document.body.innerText = "your browser does not support DOMContentLoaded event. Please use one of modern browsers";
            }
        }
    };

    function firstElement() {
        return elements.length ? elements[0] : elements;
    }

    function eachElement(callBack) {
        if (!elements.length) {
            callBack(elements);
            return;
        }
        for (var i = 0; i < elements.length; i++) {
            callBack(elements[i]);
        }
    }

    function hProp(element, arg, prop) {
        if (arg) {
            element[prop] = arg;
        } else {
            return element[prop];
        }
    }
}