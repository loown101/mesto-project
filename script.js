const editButton = document.querySelector('.profile__button-change');
const addButton = document.querySelector('.profile__button-add');
const closeButtons = document.querySelectorAll('.pop-up__btn-close');

const profileName = document.querySelector('.profile__title');
const jobName = document.querySelector('.profile__subtitle');

const galleryList = document.querySelector('.gallery__list');

const popups = document.querySelectorAll('.pop-up');
const popupProfile = document.querySelector('.pop-up__profile');
const popupPlace = document.querySelector('.pop-up__place');

const formElement = document.querySelector('#profile-forms');
const nameInput = document.querySelector('#pop-up__profile-name');
const jobInput = document.querySelector('#pop-up__profile-description');

const formElementPlace = document.querySelector('#place-forms');
const placeLink = document.querySelector('#pop-up__place-name');
const placeDescription = document.querySelector('#pop-up__place-description');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup(element) {
  element.classList.add('pop-up_opened');
}

function closePopup() {
  popups.forEach(element => {
    element.classList.remove('pop-up_opened');
  });
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  if (nameInputValue.length !== 0 && jobInputValue.length !== 0) {
    profileName.textContent = nameInputValue;
    jobName.textContent = jobInputValue;
  }

  closePopup()
}

function createImage(placeLinkValue, placeDescriptionValue) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);

  const image = cardElement.querySelector('.gallery__pic');

  const likeButton = cardElement.querySelector('.gallery__button-like');
  const deleteButton = cardElement.querySelector('.gallery__button-delete');

  cardElement.querySelector('.gallery__pic').src = `${placeLinkValue}`;
  cardElement.querySelector('.gallery__pic').alt = `${placeDescriptionValue}`;
  cardElement.querySelector('.gallery__item-descriprion').textContent = `${placeDescriptionValue}`;

  galleryList.prepend(cardElement);

  image.addEventListener('click', function () {
    const popupImage = document.querySelector('.pop-up__image');

    const imageGallery = document.querySelector('.pop-up__gallery-image');
    const figcaptionImageGallery = document.querySelector('.pop-up__desctiption-image')

    imageGallery.src = `${placeLinkValue}`;
    figcaptionImageGallery.textContent = `${placeDescriptionValue}`;

    openPopup(popupImage);
  });

  likeButton.addEventListener('click', like);
  deleteButton.addEventListener('click', del);
}

function like(event) {
  let target = event.target;

  if (target.classList.contains('gallery__button-like')) {
    target.classList.toggle('gallery__button-like_active');
  }
}

function del(event) {
  let target = event.target;

  const listItem = target.closest('.gallery__item');
  listItem.remove();
}

for (let i = initialCards.length - 1; i >= 0; i--) {
  createImage(initialCards[i].link, initialCards[i].name)
}

editButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;

  openPopup(popupProfile)
});


addButton.addEventListener('click', () => openPopup(popupPlace));

closeButtons.forEach(button => {
  button.addEventListener('click', closePopup);
});

formElement.addEventListener('submit', formSubmitHandler);

formElementPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();

  createImage(placeLink.value, placeDescription.value);

  closePopup()
});