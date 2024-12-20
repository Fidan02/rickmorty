import React from 'react'
import Image from 'next/image'
import styles from "./Card.module.css"
import { logo } from '../../../public/Images/image'


const Card = () => {
  return (
    <div className={styles.CardContainer}>
        <div className={styles.Container}>
            <div className={styles.imageContainer}>
                <Image src={logo} alt='Character Image'/>
            </div>
            <div className={styles.information}>
                <p>Name: <span>Rick Sanchez</span></p>
                <div className={styles.GenderOrigin}>
                    <span>Gender: <span>Female</span></span>
                    <span>Origin: <span>Earth (C-123)</span></span>
                </div>
            </div>
        </div>
        <p>Human</p>
    </div>
  )
}

export default Card