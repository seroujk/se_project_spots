const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__submit-btn_inactive",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__input-error_active"
  }



const toggleButtonState = (inputList, buttonElement,settings) => {
        if(hasInvalidInput(inputList)){
           disableButton(buttonElement);
           
        }
        else{
            buttonElement.disabled = false;
            buttonElement.classList.remove(settings.inactiveButtonClass);
        }
 };

 const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(settings.inactiveButtonClass);
 };

 const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
   
  };

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  };


const checkInputValidity = (formElement, inputElement,settings) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement,  inputElement, inputElement.validationMessage, settings);

    }
    else{
        hideInputError(formElement, inputElement,settings);
    }
};


const setEventListeners = (formElement,settings) =>{
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function(){
        checkInputValidity(formElement, inputElement,settings);
        toggleButtonState(inputList, buttonElement,settings);
    });
  });
};


const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) =>{
    setEventListeners(formElement,settings);
  });
};


const resetFormValidation = (formElement,settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, settings);
    });
  
    toggleButtonState(inputList, buttonElement, settings);
  };

  export { enableValidation, settings, resetFormValidation, disableButton }; 
