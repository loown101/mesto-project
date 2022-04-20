import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ selector, config, submitForm }) {
    super(selector, config);
    this._submitForm = submitForm;
    this._form = this._container.querySelector(config.popupFormSelector);
    this._objInput = {};
  }

  _getInputValues() {
    [...this._form].forEach(element => {
      this._objInput[element.name] = element.value;
    });

    return this._objInput;
  }

  // renderLoading(isLoading, evt) {
  //   this._button = evt.submitter;

  //   if (isLoading) {
  //     this._button.textContent = 'Сохранение...';
  //   } else {
  //     this._button.textContent = 'Сохранить';
  //   }
  // }

  close() {
    super.close()

    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    
    //  this._submitForm(evt, this._getInputValues());
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton = evt.submitter;
      console.log('this._submitButton',this._submitButton);
      // перед запросом сохраняем изначальный текст кнопки
      const initialText = this._submitButton.textContent;
      console.log('this._submitButton.textContent',this._submitButton.textContent);
      // меняем его, чтобы показать пользователю ожидание
      this._submitButton.textContent = 'Сохранение...';
      this._submitForm(this._getInputValues())
        .then(() => this.close()) // закрывается попап в `then`
        // .catch((err) => {
        //   console.log('Ошибка. Запрос не выполнен: ', err);
        // })
        .finally(() => {
          this._submitButton.textContent = initialText;
        }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
    });
  };
  
}
  
  //   this._form.addEventListener('submit', () => {
  //   // перед запросом сохраняем изначальный текст кнопки
  //   const initialText = this._submitButton.textContent;
  //   // меняем его, чтобы показать пользователю ожидание
  //   this._submitButton.textContent = 'Сохранение...';
  //   this._submitForm(this._getInputValues())
  //     .then(() => this.close()) // закрывается попап в `then`
  //     .finally(() => {
  //       this._submitButton.textContent = initialText;
  //     }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
  // });
