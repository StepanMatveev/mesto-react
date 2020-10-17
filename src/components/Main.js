import React from 'react';
import Card from './Card.js';
import {api} from '../utils/api.js';


function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
    const [userName, setUserName] = React.useState();
    const [userSubtitle, setUserSubtitle] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then((data) => {
            const [UserData, initialCards] = data;
            setUserName(UserData.name);
            setUserSubtitle(UserData.about);
            setUserAvatar(UserData.avatar);
            setCards(initialCards);
        })
    }, []);

    return(
        <main className="content">
        <section className="profile">
            <div className="profile__avatar_container">
                <img className="profile__avatar" alt="Аватарка" src={userAvatar}/>
                <button className="profile__avatar-overlay" onClick={onEditAvatar}></button>
            </div>
            <div className="profile__info">
                <div className="profile__top">
                    <h1 className="profile__title">{userName}</h1>
                    <button className="profile__edit-button" type="button" aria-label="редактировать" onClick={onEditProfile}></button>
                </div>
            <p className="profile__subtitle">{userSubtitle}</p>
            </div>
            <button className="profile__add-button" type="button" aria-label="добавить" onClick={onAddPlace}></button>    
        </section>
        <section className="elements">
            <ul className="elements__list">
                {cards.map((card) => 
                    <Card 
                        key={card._id} 
                        name={card.name} 
                        link={card.link} 
                        likes={card.likes.length} 
                        onCardClick={onCardClick} 
                    />
                )}
            </ul>
        </section>
    </main>
    )
}

export default Main;