// === Styles and Validation ===
import "./index.css";
import { enableValidation, settings } from "../scripts/validation.js";

// === API and Constants ===
import Api from "../utils/Api.js";

// === Image Imports and Assignments ===
import pencilSrc from "../images/pencil.svg";
const pencilImage = document.getElementById("image-pencil");
pencilImage.src = pencilSrc;

import whitePencilSrc from "../images/white-pencil.svg";
const whitePencilImage = document.getElementById("white-image-pencil");
whitePencilImage.src = whitePencilSrc;

import plusSrc from "../images/plus.svg";
const plusimage = document.getElementById("image-plus");
plusimage.src = plusSrc;

import logoSrc from "../images/logo.svg";
const logoImage = document.getElementById("image-logo");
logoImage.src = logoSrc;

// === API Setup ===
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d36a440a-9446-403c-9bd0-1c72d07d3c16",
    "Content-Type": "application/json",
  },
});

// === DOM Elements ===
// User Info
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const profileImageContainer = document.querySelector(
  ".profile__avatar-container"
);

// Profile Modal
const profileModal = document.querySelector("#profile-edit-modal");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const closeProfileBtn = document.querySelector(
  ".modal__close-btn--edit-profile"
);
const submitProfileBtn = document.querySelector(
  ".modal__submit-btn--edit-profile"
);
const profileFormElement = document.querySelector(".modal__form--edit-profile");
const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#description");

// Profile Avatar Modal
const profileEditImageBtn = document.querySelector(".profile__edit-avatar-btn");
const profileEditImageModal = document.querySelector(
  "#profile-edit-avatar-modal"
);
const profileEditImageFormElement = document.querySelector(
  "#edit-avatar-modal"
);
const profileImageLinkInput =
  profileEditImageFormElement.querySelector("#image-link");
const profileImage = document.querySelector(".profile__avatar");
const profileImageEditCloseBtn = document.querySelector(".modal__close-btn--edit-profile-avatar");
const profileImageSubmitBtn = profileEditImageFormElement.querySelector(
  ".modal__submit-btn--edit-avatar-profile"
);

// New Post Modal
const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostCloseBtn = document.querySelector(".modal__close-btn--new-post");
const newPostSubmitBtn = document.querySelector(".modal__submit-btn--new-post");
const newPostFormElement = document.querySelector(".modal__form--new-post");
const imageLinkInput = newPostFormElement.querySelector("#image-link");
const captionInput = newPostFormElement.querySelector("#post-caption");

// Delete Post Modal
const deletePostModal = document.querySelector("#delete-card-modal");
const deletePostBtn = document.querySelector(".modal__card-delete-btn");
const canelDeletePostBtn = document.querySelector(
  ".modal__card-delete-cancel-btn"
);
const deleteModalCloseBtn = document.querySelector(
  ".modal__close-btn--delete-card"
);

// Preview Modal
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image--preview");
const previewCaption = previewModal.querySelector(".modal__caption--preview");
const previewCloseBtn = previewModal.querySelector(
  ".modal__close-btn--preview"
);

// Cards
const cardsList = document.querySelector(".cards__list");

// === Fetch User Info ===
api
  .getUserInfo()
  .then((data) => {
    profileNameElement.textContent = data.name;
    profileJobElement.textContent = data.about;
    profileImage.src = data.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

// === Fetch and Render Cards ===
api
  .getInitialCards()
  .then((data) => data.map((item) => item))
  .then((cards) => {
    cards.forEach((card) => {
      const newCard = getCardElement(card);
      cardsList.append(newCard);
    });
  })
  .catch(console.error);

// === Card Logic ===
let selectedCard;
let selectedCardID;

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card__template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_liked");
  }

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
    handleCardLikeUnlike(cardLikeBtn, data);
  });

  cardDeleteBtn.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });

  return cardElement;
}

function handleCardLikeUnlike(cardLikeBtn, data) {
  selectedCardID = data._id;
  if (cardLikeBtn.classList.contains("card__like-btn_liked")) {
    api.addLike(selectedCardID).catch((err) => console.error(err));
  } else {
    api.removeLike(selectedCardID).catch((err) => console.error(err));
  }
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardID = data._id;
  openModal(deletePostModal);
}

function handleDeleteSubmit() {
  const originalText = deletePostBtn.textContent;
  deletePostBtn.textContent = "Deleting...";
  api
    .removeCard(selectedCardID)
    .then(() => {
      selectedCard.remove();
      closeModal(deletePostModal);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      deletePostBtn.textContent = originalText;
    });
}

// === Event Listeners ===
// Modal Open Events
editProfileBtn.addEventListener("click", () => {
  openModal(profileModal);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});

newPostBtn.addEventListener("click", () => openModal(newPostModal));
profileEditImageBtn.addEventListener("click", () =>
  openModal(profileEditImageModal)
);

// Modal Close Events
closeProfileBtn.addEventListener("click", () => closeModal(profileModal));
newPostCloseBtn.addEventListener("click", () => closeModal(newPostModal));
deletePostBtn.addEventListener("click", handleDeleteSubmit);
canelDeletePostBtn.addEventListener("click", () => closeModal(deletePostModal));
deleteModalCloseBtn.addEventListener("click", () =>
  closeModal(deletePostModal)
);
previewCloseBtn.addEventListener("click", () => closeModal(previewModal));
profileImageEditCloseBtn.addEventListener("click", ()=> closeModal(profileEditImageModal));
// Profile Form Submission
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const originalText = submitProfileBtn.textContent;
  submitProfileBtn.textContent = "Saving...";
  api
    .editUserInfo({ name: nameInput.value, about: jobInput.value })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileJobElement.textContent = data.about;
    })
    .catch((err) => console.error(err))
    .finally(() => {
      submitProfileBtn.textContent = originalText;
    });

  closeModal(profileModal);
}

// New Post Submission
newPostFormElement.addEventListener("submit", handleNewPostSubmit);
function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const originalText = newPostSubmitBtn.textContent;
  newPostSubmitBtn.textContent = "Saving...";
  api
    .postCard({ caption: captionInput.value, link: imageLinkInput.value })
    .then((data) => {
      const newCard = getCardElement(data);
      cardsList.prepend(newCard);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      newPostSubmitBtn.textContent = originalText;
    });
  captionInput.value = "";
  imageLinkInput.value = "";
  closeModal(newPostModal);
}

// Profile Avatar Submission
profileEditImageFormElement.addEventListener("submit", handleNewProfileImageSubmit);

function handleNewProfileImageSubmit(evt) {
  console.log('Submit')
  evt.preventDefault();
  const link = profileImageLinkInput.value;
  const originalText = profileImageSubmitBtn.textContent;
  profileImageSubmitBtn.textContent = "Saving..."
  api
  .editProfileAvatar(link)
  .then((userData)=>{
    profileImage.src = userData.avatar;
  })
  .catch((err) => console.error(err))
  .finally(()=>{
    profileImageSubmitBtn.textContent= originalText;
  });

  closeModal(profileEditImageModal);
}

// // Avatar Hover
// profileImageContainer.addEventListener("mouseover", function () {
//   profileEditImageBtn.style.display = "flex";
// });
// profileImageContainer.addEventListener("mouseout", function () {
//   profileEditImageBtn.style.display = "none";
// });

// Modal Helpers
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

// Close Modals on Overlay Click
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

// Close Modal on ESC
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// === Initialize Validation ===
enableValidation(settings);
