import { disableButton, resetFormValidation } from "./validation.js";
import { settings } from "./validation.js";

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

 //Declare a variable for the preview modal
 const previewModal = document.querySelector("#preview-modal");
 //Declare a variable for the preivew modal image
 const previewImage = previewModal.querySelector(".modal__image--preview");

 //Delcare a variable for the preview modal caption
 const previewCaption = previewModal.querySelector(".modal__caption--preview");

 //Declare a variable for the preview close button
 const previewCloseBtn = previewModal.querySelector(".modal__close-btn--preview");


//Generating Cards

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  //Declare and choose the template that was made for the cards and mae it cardTemplate
  const cardTemplate = document.querySelector("#card__template").content;

  //Declare the actual card element that we want to add to the DOM
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  //Declare a variable for the card title
  const cardTitle = cardElement.querySelector(".card__title");

  //Declare a varuabe for the card Image
  const cardImage = cardElement.querySelector(".card__image");

  //Populate the element with the current data from the list
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  //Open the preview modal when the image is clicked
  cardImage.addEventListener("click", () => {
    //Assign its src value to the current cards src value
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;

    openModal(previewModal);
  });


  // Declare a variable for the card like button
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");

  // Listen for a click event to change the color of the button
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  // Declare a variable for the card delete button
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  //Listen for a click event to delete the card
  cardDeleteBtn.addEventListener("click", (event) => {
    cardElement.remove();
  });

  return cardElement;
}

  //Close the preview modal when the close button is clicked
  previewCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
  });

// use foreach method to initalize the cards
// this way we don't have to worry about the length of the inital card array
// also the code is more concise
initialCards.forEach((item) => {
  const card = getCardElement(item);
  cardsList.append(card);
});

//The Edit Profile Modal

const profileModal = document.querySelector("#profile-edit-modal");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const closeProfileBtn = document.querySelector(".modal__close-btn--edit-profile");
const submitProfileBtn = document.querySelector(".modal__submit-btn--edit-profile");

const profileFormElement = document.querySelector(".modal__form--edit-profile");
const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#description");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

// The New Post Modal

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostCloseBtn = document.querySelector(".modal__close-btn--new-post");
const newPostSubmitBtn = document.querySelector(".modal__submit-btn--new-post");

const newPostFormElement = document.querySelector(".modal__form--new-post");
const imageLinkInput = newPostFormElement.querySelector("#image-link");
const captionInput = newPostFormElement.querySelector("#post-caption");

//*** Opening the modals ***

//This function will open any modal that's passed onto it
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener('keydown', handleEscape);

}

//Call the openModal function on the edit profile button click
editProfileBtn.addEventListener("click", () => {
  resetFormValidation(profileFormElement,settings);
  openModal(profileModal);
  //Insert the current profile name value into the form's input field
  nameInput.value = profileNameElement.textContent;
  //Insert the current profile job value into the form's input field
  jobInput.value = profileJobElement.textContent;
});

//Call the openModal function on the new post button click
newPostBtn.addEventListener("click", () => {
  openModal(newPostModal);
});

//*** Closing the modals ***

//This function will close any modal that's passed onto it
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener('keydown', handleEscape);
}

//Call the closeModal function on the edit profile close button click
closeProfileBtn.addEventListener("click", () => {
  closeModal(profileModal);
});

//Call the closeModal function on the close new post button click
newPostCloseBtn.addEventListener("click", () => {
  closeModal(newPostModal);
});



//*** Submitting the profile changes ***

// The  profile form submission handler.
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior
  evt.preventDefault();

  // Get the values of each form field from the value property
  // of the corresponding input element.
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  //Then insert these new values into the textContent property of the
  // corresponding profile elements.
  profileNameElement.textContent = nameInputValue;
  profileJobElement.textContent = jobInputValue;
  // TODO: Close the modal.
  closeModal(profileModal);
}

// Connect the handler to the form, so it will watch for the submit event.
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//*** Submitting the new post photos and captions ***

function handleNewPostSubmit(evt) {
  // Prevent default browser behavior
  evt.preventDefault();

  //Creatw a new post with user data
  const newPost = { name: captionInput.value, link: imageLinkInput.value };
  // Generate the card for the new post
  const newCard = getCardElement(newPost);
  //Add the new card to the cards list
  cardsList.prepend(newCard);
  //Close the modal
  captionInput.value = "";
  imageLinkInput.value = "";
  disableButton(newPostSubmitBtn);
  closeModal(newPostModal);
}

// Connect the handler to the form, so it will watch for the submit event.
newPostFormElement.addEventListener("submit", handleNewPostSubmit);


//Call the closeModalfunction when the overlay is clicked
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});



//Call the closeModalfunction when the ESC Key is clicked

function handleEscape(evt) {
  console.log('escape is clicked');
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.modal_opened');
    closeModal(openedModal);
  }
}