setTimeout(function () {
    // var cpf = document.getElementsByName("ui_cpf_text_label");
    var cpf = document.getElementsByName("guestUser.fieldValues.ui_cpf_text");
    var button = document.querySelector("#ui_self_reg_submit_button");
    var buttonParent = button.parentElement;
    button.remove();

    // Function that handle each key pressed in the text box
    try {
        cpf[0].addEventListener("focusout", function () {

            // Check the CPF using regular expression.
            if (cpf[0].value.match(/^\d{11,14}$/g) || cpf[0].value.match(/(\d{3}\.\d{3}\.\d{3}-\d{2})/g)) {
                cpf = cpf[0].value.replace(/[^\d]/g, "");
                var v1 = valida_cpf(cpf);
                cpf = document.getElementsByName("guestUser.fieldValues.ui_cpf_text");
            } else if (cpf[0].value.match(/[^\d.-]/g)) {
                alert("Permitido somente números ou formato CPF");
                cpf = document.getElementsByName("guestUser.fieldValues.ui_cpf_text");
            } else {
                alert("CPF deve conter 11 dígitos");
            }

            // Validate if function valida_cpf is true then enable the button.
            if (v1) {
                buttonParent.append(button);
            } else {
                // If valida_cpf is false, the button will continue disabled
                button.remove();
            }
        });
    } catch (e) {
        console.log(e);
    }

}, 3000);

function valida_cpf(cpf) {
    var numeros, digitos, soma, resultado, digitos_iguais;
    digitos_iguais = 1;
    for (var i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
        }
    }

    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (let i = 10; i > 1; i--) {
            soma += numeros.charAt(10 - i) * i;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            // valido = false;
            alert("Primeiro dígito verificador inválido!");
            return false;
        }
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (let i = 11; i > 1; i--) {
            soma += numeros.charAt(11 - i) * i;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            // valido = false;
            alert("Segundo dígito verificador inválido!");
            return false;
        }
        // valido = true;
        // alert('CPF Válido');
        return true;
    }
    else {
        // valido = false;
        alert("CPF Inválido. Números iguais não permitidos.");
        return false;
    }
};