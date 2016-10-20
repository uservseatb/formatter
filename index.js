
bc2().loadDocument(app);

function app() {

    var errorField = bc2().byId("error-field");
    var buttons = bc2().byClass("menu").byClass("but");
    var textinput = bc2().byId("textinput");


    bindEvents();

    function bindEvents() {

        buttons.events("onclick", function () {
            buttons.removeClass('selected');
            bc2(this).addClass('selected');

            reformat(this.value);
        });

        textinput.events("oninput", function () {
            reformat(bc2().byClass("menu").byClass("selected").elements()[0].value);
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




