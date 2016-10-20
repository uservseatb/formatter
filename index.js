$(function () {

    var textinput = $("#textinput");
    var buttons = $(".menu ul li.but");
    var errorField = $("#error-field");

    bindEvents();

    function bindEvents() {

        buttons.click(function () {
            buttons.removeClass('selected');
            $(this).addClass('selected');

            var input = textinput.val();

            var processResult = process(input, {
                indentCount: this.value
            });

            if (processResult.errorText == undefined) {
                hideError();
                textinput.val(processResult.output);
            } else {
                showError(processResult.errorText + " " + processResult.errorDetail);
            }

        });

    }

    function process(input, params) {
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


