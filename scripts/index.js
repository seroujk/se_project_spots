const initialCards = [
  (firstCard = {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  }),
  (secondCard = {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  }),
  (thirdCard = {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  }),
  (fourthCard = {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  }),
  (fifthCard = {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  }),
  (sixthCard = {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  }),
];

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

  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  const card = getCardElement(initialCards[i]);
  cardsList.append(card);
}

//The Edit Profile Functionality

let modal = document.querySelector("#edit-modal");
let editBtn = document.querySelector(".profile__edit-btn");
let closeBtn = document.querySelector(".modal__close-btn");
let submitBtn = document.querySelector(".modal__submit-btn");

const profileFormElement = document.querySelector(".modal__form");
const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#description");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

//Opening the profile
// Add event listener for when the edit button is clicked
// Call the function that opens the profile edit form
editBtn.addEventListener("click", showModal);
// In the function add a class that will set the modals visibility to visible
function showModal() {
  modal.classList.add("modal_opened");
  //Insert the current profile name value into the form's input field
  nameInput.value = profileNameElement.textContent;
  //Insert the current profile job value into the form's input field
  jobInput.value = profileJobElement.textContent;
}

// Closing the modal
// Add event listener for when the close button is clicked
// Call the function that closes the profile edit form
closeBtn.addEventListener("click", closeModal);
// In the function remove the class that set the modals visibility to visible
// This will make the form invisible again
function closeModal() {
  modal.classList.remove("modal_opened");
}

// The form submission handler. Note that its name
// starts with a verb and concisely describes what it does.
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior, see explanation below.
  evt.preventDefault();

  // TODO: Get the values of each form field from the value property
  // of the corresponding input element.
  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;
  // TODO: Then insert these new values into the textContent property of the
  // corresponding profile elements.
  profileNameElement.textContent = nameInputValue;
  profileJobElement.textContent = jobInputValue;
  // TODO: Close the modal.
  closeModal();
}

// Connect the handler to the form, so it will watch for the submit event.
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
