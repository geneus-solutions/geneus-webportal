import React from 'react';
import styles from '../../styles/HoverCard.module.css'; // Import the CSS file for styles

const HoverCard = ({title,description,image,level}) => {
  return (
    <div className={styles.card}>
        <div className={styles.content}>
            <img
                className={styles.logo}
                src={image}
                alt="mparticle"
            />
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'100%'}}>
                <p className={styles.level}>{level}</p>
                <h6>{title}</h6>
                <div className={styles.hover_content}>
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default HoverCard;
