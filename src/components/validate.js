const showInputError = (formElement, inputElement, errorMessage, validateConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validateConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, validateConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validateConfig.inputErrorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validateConfig) => {

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validateConfig);
  } else {
    hideInputError(formElement, inputElement, validateConfig);
  }
};

const setEventListeners = (formElement, validateConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector));
  const buttonSubmit = formElement.querySelector(validateConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonSubmit, validateConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {

      checkInputValidity(formElement, inputElement, validateConfig);
      toggleButtonState(inputList, buttonSubmit, validateConfig);
    });
  });
};

const enableValidation = (validateConfig) => {
  const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validateConfig);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, validateConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validateConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(validateConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};

export { enableValidation }


