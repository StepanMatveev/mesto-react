import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onLikeClick, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`element__remove-button ${isOwn ? '' : 'element__remove-button_disabled'}`);

    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    const cardLikeButtonClassName = (`elements__place-button ${isLiked ? 'elements__place-button_active' : '' }`);

    function handleClick() {
        onCardClick(card.name, card.link);
    }

    function handleLikeClick() {
        onLikeClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }   

    return(
        <li className="elements__place">
            <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить карточку" onClick={handleDeleteClick}/>
            <img className="elements__place-image" src={card.link} alt={card.name} onClick={handleClick}/>
            <div className="elements__place-signature">
                <h2 className="elements__place-title">{card.name}</h2>
                <div className="elements__place-button-container">
                    <button className={cardLikeButtonClassName} type="button" aria-label="лайк" onClick={handleLikeClick}/>
                    <p className="elements__place-counter">{card.likes.length}</p>
                </div>    
            </div>
        </li>
    );
} 

export default Card;