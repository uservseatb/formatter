$(function () {

    var textinput = $("#textinput");
    var buttons = $(".menu ul li.but");
    var errorField = $("#error-field");

    bindEvents();

    function bindEvents() {

        buttons.on("click", function () {
            buttons.removeClass('selected');
            $(this).addClass('selected');

            reformat(this.value);
        });

        textinput.on("input", function () {
            reformat(buttons.parent().find(".selected")[0].value);
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
});


