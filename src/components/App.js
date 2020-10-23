import React from 'react';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import ImagePopup from '../components/ImagePopup.js';
import EditProfilePopup from '../components/EditProfilePopup.js';
import EditAvatarPopup from '../components/EditAvatarPopup.js';
import AddPlacePopup from '../components/AddPlacePopup.js';
import DeleteCardPopup from '../components/DeleteCardPopup.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [currentCard, setCurrentCard] = React.useState({});
    const [selectedCard, setSelectedCard] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo()
        .then((data) => {
            setCurrentUser(data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    function handleCardClick(name, link) {
        setSelectedCard({
            isOpen: true, 
            name: name, 
            link: link
        });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleDeleteCardClick(card) {
        setIsDeleteCardPopupOpen(true);
        setCurrentCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setSelectedCard((selectedCard)=> {
            return {...selectedCard, isOpen: false}
        });
    }

    React.useEffect(() => {
        api.getInitialCards()
        .then((data) => {
            setCards(data);
        })
        .catch((error) => {
            console.error(error)
        })
    }, []);

    React.useEffect(() => {
        function handleEscClose(e) {
          if (e.key === "Escape") {
            closeAllPopups();
          }
        }
    
        function closeByOverlay(e) {
          if (e.target.classList.contains('popup_view_open')) {
            closeAllPopups();
          }
        }
    
        document.addEventListener('keyup', handleEscClose);
        document.addEventListener('click', closeByOverlay);

        return () => {
          document.removeEventListener('keyup', handleEscClose);
          document.removeEventListener('click', closeByOverlay);
        }
    })

    function handleCardLike(card) { 
        const isLiked = card.likes.some((like) => like._id === currentUser._id);
        
        if (!isLiked) {
            api.putLike(card._id)
            .then((newCard) => {
                const newCards = cards.map((item) => item._id === card._id ? newCard : item);
                setCards(newCards);
            })
            .catch((error) => {
                console.error(error)
            })
        } else {
            api.removeLike(card._id)
            .then((newCard) => {
                const newCards = cards.map((item) => item._id === card._id ? newCard : item);
                setCards(newCards);
            })
            .catch((error) => {
                console.error(error)
            })
        }
    }

    function handleCardDelete(card) {
        setIsLoading(true);
        api.deleteCard(card._id)
        .then(() => {
            const newCards = cards.filter(item => item._id !== card._id);
            setCards(newCards);
            closeAllPopups();
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    function handleUpdateUser({name, about}) {
        setIsLoading(true);
        api.editUserInfo(name, about)
        .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    function handleUpdateAvatar({avatar}) {
        setIsLoading(true);
        api.changeAvatar(avatar)
        .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    function handleAddPlaceSubmit({name, link}) {
        setIsLoading(true);
        api.addCard(name, link)
        .then((data) => {
            setCards([data, ...cards]);
            closeAllPopups();
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick} 
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleDeleteCardClick}
                />
                <Footer />
                <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading}
                />
                <EditProfilePopup 
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isLoading={isLoading}
                />
                <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                isLoading={isLoading}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <DeleteCardPopup
                isOpen={isDeleteCardPopupOpen}
                onClose={closeAllPopups}
                onDeleteCard={handleCardDelete}
                currentCard={currentCard}
                isLoading={isLoading}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
