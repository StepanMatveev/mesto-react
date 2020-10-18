import React from 'react';

function PopupWithForm({name, title, onOpen, onClose, children}) {
    return (
        <section className={`popup popup__${name} ${onOpen ?"popup_view_open" : ""}`}>
        <form className="popup__container popup__form" action="#" name={name}>
            <button className="popup__close-button" type="button" aria-label="закрыть" onClick={onClose}/>
            <h4 className="popup__title">{title}</h4>
            {children}
            <button className={`popup__save-button popup__save-button_${name}`} type="submit">Сохранить</button>    
        </form>
    </section>
    )
} 

export default PopupWithForm;