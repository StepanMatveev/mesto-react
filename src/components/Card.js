import React from 'react';

function Card({name, link, likes, onCardClick}) {
    
    function handleClick(){
        onCardClick(name, link)
    };

    return(
        <li className="elements__place">
            <button type="button" className="element__remove-button" aria-label="Удалить карточку"/>
            <img className="elements__place-image" src={link} alt={name} onClick={handleClick}/>
            <div className="elements__place-signature">
                <h2 className="elements__place-title">{name}</h2>
                <div className="elements__place-button-container">
                    <button className="elements__place-button" type="button" aria-label="лайк"/>
                    <p className="elements__place-counter">{likes}</p>
                </div>    
            </div>
        </li>
    );
} 

export default Card;