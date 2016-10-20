if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function () {
        document.removeEventListener("DOMContentLoaded", arguments.callee, false);
        app();
    }, false);
} else {
    document.body.innerText = "your browser does not support DOMContentLoaded event. Please use one of modern browsers";
}

function finder(elements, _index) {

    var index = _index || 0;

    if (!elements) {
        return finder(document);
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
                return finder(current.getElementsByClassName(className) || {});
            }
            return finder({});
        },
        byId: function (idName) {
            if (current.getElementById) {
                return finder([current.getElementById(idName) || {}]);
            }
            return finder({});
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
        }
    }
}

function app() {

    var textinput = $("#textinput");
    var jButtons = $(".menu ul li.but");
    var errorField = $("#error-field");

    bindEvents();

    function bindEvents() {

        finder()
            .byClass("menu")
            .byClass("but")
            .events("onclick", function () {
                jButtons.removeClass('selected');
                $(this).addClass('selected');

                reformat(this.value);
            });

        textinput.on("input", function () {
            reformat(jButtons.parent().find(".selected")[0].value);
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




