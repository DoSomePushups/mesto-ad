const showInputError = (inputElement, errorElement, errorMessage, settings) => {
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (inputElement, errorElement, settings) => {
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (inputElement, settings) => {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);

  inputElement.setCustomValidity("");

  if (
    inputElement.classList.contains("popup__input_type_name") ||
    inputElement.classList.contains("popup__input_type_card-name")
  ) {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;

    if (inputElement.value.length > 0 && !nameRegex.test(inputElement.value)) {
      inputElement.setCustomValidity(
        inputElement.getAttribute("data-error-message")
      );
    }
  }

  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      errorElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(inputElement, errorElement, settings);
  }
};

const hasInvalidInput = (inputElements) => {
  return Array.from(inputElements).some(
    (inputElement) => !inputElement.validity.valid
  );
};

const disableSubmitButton = (buttonElement, settings) => {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "");
};

const enableSubmitButton = (buttonElement, settings) => {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
};

const toggleButtonState = (inputElements, buttonElement, settings) => {
  if (hasInvalidInput(inputElements)) {
    disableSubmitButton(buttonElement, settings);
  } else {
    enableSubmitButton(buttonElement, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputElements = formElement.querySelectorAll(settings.inputSelector);
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, settings);
      toggleButtonState(inputElements, buttonElement, settings);
    });
  });
};

const clearValidation = (formElement, settings) => {
  const inputElements = formElement.querySelectorAll(settings.inputSelector);
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  inputElements.forEach((inputElement) => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.setCustomValidity("");
    hideInputError(inputElement, errorElement, settings);
  });

  disableSubmitButton(buttonElement, settings);
};

const enableValidation = (settings) => {
  const formElements = document.querySelectorAll(settings.formSelector);
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const buttonElement = formElement.querySelector(
      settings.submitButtonSelector
    );

    disableSubmitButton(buttonElement, settings);
    setEventListeners(formElement, settings);
  });
};

export { enableValidation, clearValidation };
