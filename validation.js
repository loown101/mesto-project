const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('pop-up__profile-input_error');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('pop-up__profile-input_error');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.pop-up__profile-input'));
  const buttonSave = formElement.querySelector('.pop-up__btn-save');

  toggleButtonState(inputList, buttonSave);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement)
      toggleButtonState(inputList, buttonSave);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.pop-up__forms'));


  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('pop-up__btn-save_inactive');
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove('pop-up__btn-save_inactive');
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};

enableValidation();


