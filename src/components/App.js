import React from 'react';
import '../index.css';
import Footer from './Footer.js';
import Header from './Header.js';
import ImagePopup from './ImagePopup.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';

function App() {
  const [isPopupEditProfileOpen, setIsPopupEditProfileOpen] = React.useState(false);
  const [isPopupAddPlaceOpen, setIsPopupAddPlaceOpen] = React.useState(false);
  const [isPopupEditAvatarOpen, setIsPopupEditAvatarOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(name, link) {
      setSelectedCard({
          isOpen: true, 
          name: name, 
          link: link
      });
  };

  function handleEditProfileClick() {
      setIsPopupEditProfileOpen(true);
  };

  function handleAddPlaceClick() {
      setIsPopupAddPlaceOpen(true);
  };

  function handleEditAvatarClick() {
      setIsPopupEditAvatarOpen(true);
  };

  function closeAllPopups() {
      setIsPopupEditProfileOpen(false);
      setIsPopupAddPlaceOpen(false);
      setIsPopupEditAvatarOpen(false);
      setSelectedCard((selectedCard)=> {
          return {...selectedCard, isOpen: false}
      });
  };

  return (
    <div className="page">
      <Header/>
      <Main    
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          />
      <Footer/>
      <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
      />
      <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          onOpen={isPopupEditProfileOpen}
          onClose={closeAllPopups}
      >
          <label className="popup__field">
              <input 
                  className="popup__input popup__input_name" 
                  type="text" 
                  placeholder="Имя Фамилия" 
                  name="name" 
                  id="name" 
                  required 
                  minLength="2" 
                  maxLength="40"
              />
              <span className="popup__input-error" id="name-error"></span>
          </label>    
          <label className="popup__field">    
              <input 
                  className="popup__input popup__input_occupation" 
                  type="text" 
                  placeholder="Род деятельности" 
                  name="occupation" 
                  id="occupation" 
                  required 
                  minLength="2" 
                  maxLength="200"
              />
              <span className="popup__input-error" id="occupation-error"></span>
          </label>  
      </PopupWithForm>
      <PopupWithForm
          name="add-place"
          title="Новое место"
          onOpen={isPopupAddPlaceOpen}
          onClose={closeAllPopups}        
      >
          <label className="popup__field">
              <input 
                  className="popup__input popup__input_pic-name" 
                  type="text" 
                  placeholder="Название" 
                  name="place" 
                  id="place" 
                  required
              />
              <span className="popup__input-error" id="place-error"></span>
          </label>    
          <label className="popup__field">
              <input 
                  className="popup__input popup__input_link" 
                  type="url" 
                  placeholder="Ссылка на картинку" 
                  name="link" 
                  id="link" 
                  required
              />
              <span className="popup__input-error" id="link-error"></span>
          </label>        
      </PopupWithForm>
      <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          onOpen={isPopupEditAvatarOpen}
          onClose={closeAllPopups}         
      >
          <label className="popup__field">
              <input 
                  className="popup__input popup__input_avatar-link" 
                  type="url" 
                  placeholder="Ссылка на картинку" 
                  name="link" 
                  id="link" 
                  required
              />
              <span className="popup__input-error" id="link-error"></span>
          </label>      
      </PopupWithForm>
      <PopupWithForm
          name="delete"
          title="Вы уверены?" 
      />      
    </div>  
  );
}

export default App;
