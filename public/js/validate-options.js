function getOptions () {
  return {
    // Classes and Selectors
    selector: '[data-validate]', // The selector for forms to validate
    fieldClass: 'error', // The class to apply to fields with errors
    errorClass: 'error-message', // The class to apply to error messages

    // Messages
    messageValueMissing: '* Obrigatório!', // Displayed when a required field is left empty
    messageTypeMismatchEmail: '* Email inválido!', // Displayed when a `type="email"` field isn't a valid email
    messageTypeMismatchURL: '* URL inválida!', // Displayed when a `type="url"` field isn't a valid URL
    messageTooShort:
      '* Este campo aceita no mínimo {minLength} caracteres. Você digitou apenas {length} caracteres.', // Displayed with the `minLength` attribute is used and the input value is too short
    messageTooLong:
      '* Este campo aceita no máximo {maxLength} caracteres. Você digitou {length} caracteres.', // Displayed with the `maxLength` attribute is used and the input value is too long
    messagePatternMismatch: '* Formato inválido', // Displayed with the `pattern` attribute is used and the pattern doesn't match (if a `title` attribute is used, that's displayed instead)
    messageBadInput: '* Por favor digite um número válido!', // Displayed when the field is numeric (ex. `type="number"`) but the value is not a number
    messageStepMismatch: '* Por favor digite um valor válido!', // Displayed when the `step` attribute is used and the value doesn't adhere to it
    messageRangeOverflow: '* Por favor selecione um valor que não seja maior que {max}!', // Displayed with the `max` attribute is used and the input value is too hight
    messageRangeUnderflow: '* Por favor selecione um valor que não seja menor que {min}!', // Displayed with the `mind` attribute is used and the input value is too low
    messageGeneric: '* O valor digitado neste campo é inválido!', // A catchall error, displayed when the field fails validation and none of the other conditions apply

    // Form Submission
    disableSubmit: false, // If true, don't submit the form to the server (for Ajax for submission)
    onSubmit: function (form, fields) {}, // Function to run if the form successfully validates

    // Callbacks
    beforeShowError: function (field, error) {}, // Function to run before an error is display
    afterShowError: function (field, error) {}, // Function to run after an error is display
    beforeRemoveError: function (field) {}, // Function to run before an error is removed
    afterRemoveError: function (field) {} // Function to run after an error is removed
  }
}
