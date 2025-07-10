import React from 'react';
import { useState } from 'react'
import './Card.css'

export function CardTwitter({children, initialIsFollowing = false, userName}) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

    const buttonText = isFollowing ? 'Siguiendo' : 'Seguir';

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const buttonClassName = isFollowing ? 'tw-card-button is-following' : 'tw-card-button'

    return (
        <div className="tw-card">
            <img className='tw-card-avatar' src={`https://unavatar.io/${userName}`} alt="" />
            <div className='tw-card-info'>
                <strong className='tw-card-name'>{children}</strong>
                <span className='tw-card-username'>@{userName}</span>
            </div>
            <button className={buttonClassName} onClick={toggleFollow}>
                <span className='tw-card-button-text'>{buttonText}</span>
                <span className='tw-card-button-stopFollowing'>Dejar de seguir</span>
            </button>
        </div>
    );
};
