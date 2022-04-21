let userId = '';

const editButton = document.querySelector('.profile__button-change');
const addButton = document.querySelector('.profile__button-add');

const editAvatarBtn = document.querySelector('.profile__edit-avatar');
const editAvatarBtnActive = document.querySelector('.profile__avatar-change');

const profileForm = document.querySelector('#profile-forms');
const avatarForm = document.querySelector('#avatar-forms');
const nameInput = document.querySelector('#profile-name');
const jobInput = document.querySelector('#profile-description');
const placeForm = document.querySelector('#place-forms');


export {
  editButton,
  addButton,
  editAvatarBtn,
  editAvatarBtnActive,
  profileForm,
  avatarForm,
  nameInput,
  jobInput,
  placeForm,
  userId,
}