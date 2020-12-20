import React from 'react';
import styles from './personInfo.module.css';


const PersonInfo = ({ personData }) => (
    <div>
        <div>{personData.name}</div>
        <div className={styles.personImage}>image</div>
    </div>
);
  
export default PersonInfo;