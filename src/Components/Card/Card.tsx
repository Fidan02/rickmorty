import React from 'react'
import Image from 'next/image'
import styles from "./Card.module.css"
import { rip, unknown } from '../../../public/Images/image'


type Properties = {
    name: string,
    status: string,
    gender: string,
    origin: {
        name: string,
    },
    species: string,
    image: string
}

type CardProps = {
    properties: Properties;
};


const Card = ({ properties }: CardProps) => {
    const {name, status, gender, origin, species, image} = properties

  return (
    <div className={styles.CardContainer}>
        <div className={styles.Container}>
            <div className={styles.imageContainer}>
                <p 
                className={`${styles.Species}`}>
                    {species}
                </p>
                <Image src={image} alt='Character Image' layout='fill' sizes='cover' />
                {status == 'Dead' && (
                    <div className={styles.ripContainer}>
                        <Image src={rip} alt='RIP Character'/>
                    </div>
                )}
                {status == 'unknown' && (
                    <div className={styles.unknownContainer}>
                        <Image src={unknown} alt='RIP Character'/>
                    </div>
                )}
            </div>
            <div className={styles.information}>
                <p>Name: <span>{name}</span></p>
                <div className={styles.GenderOrigin}>
                    <span>Gender: <span>{gender}</span></span>
                    <span>Origin: <span>{origin.name}</span></span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card