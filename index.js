if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function () {
        document.removeEventListener("DOMContentLoaded", arguments.callee, false);
        app();
    }, false);
} else {
    document.body.innerText = "your browser does not support DOMContentLoaded event. Please use one of modern browsers";
}

function bc(elements, _index) {

    var index = _index || 0;

    if (!elements) {
        return bc(document);
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
                return bc(current.getElementsByClassName(className) || {});
            }
            return bc({});
        },
        byId: function (idName) {
            if (current.getElementById) {
                return bc([current.getElementById(idName) || {}]);
            }
            return bc({});
        },
        elements: function () {
            return elements;
        },
        events: function (domEventName, handler) {
            if (!elements.length) {
                elements[domEventName] = handler;
                return;
            }
            for (var i = 0; i < elements.length; i++) {
                elements[i][domEventName] = handler;
            }
        },
        addClass: function (className) {
            $(elements).addClass(className);
        },
        removeClass: function (className) {
            $(elements).removeClass(className);
        },
        val: function (arg) {
            return h(arg, "val");
        },
        text: function (arg) {
            return h(arg, "text");
        }
    };

    function h(arg, func) {
        if (arg) {
            $(elements)[func](arg);
        } else {
            return $(elements)[func]();
        }
    }
}

function app() {

    var errorField = bc().byId("error-field");
    var buttons = bc().byClass("menu").byClass("but");
    var textinput = bc().byId("textinput");


    bindEvents();

    function bindEvents() {

        buttons.events("onclick", function () {
            buttons.removeClass('selected');
            bc(this).addClass('selected');

            reformat(this.value);
        });

        textinput.events("oninput", function () {
            reformat(bc().byClass("menu").byClass("selected").elements()[0].value);
        });

    }

    function reformat(indent) {

        var input = textinput.val();

        var processResult = process(input, {
            indentCount: indent
        });

        if (processResult.errorText == undefined) {
            hideError();
            textinput.val(processResult.output);
        } else {
            showError(processResult.errorText + " " + processResult.errorDetail);
        }
    }

    function process(input, params) {
        if (input.trim() === '') {
            return {
                output: ''
            }
        }
        try {
            return {
                output: JSON.stringify(JSON.parse(input), null, params.indentCount)
            }
        } catch (e) {
            return {
                errorText: "Cannot parse the given string into JSON. Please enter a JSON string.",
                errorDetail: e
            }
        }
    }

    function showError(message) {
        errorField.text(message);
        errorField.addClass("show");
        textinput.addClass("error");
    }

    function hideError() {
        errorField.removeClass("show");
        textinput.removeClass("error");
    }
}




