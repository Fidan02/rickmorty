import React from 'react'
import styles from './navbar.module.css';
import Image from 'next/image';
import { logo } from '../../../public/Images/image';

function Navbar() {
  return (
    <div className={styles.container}>
        <div className={styles.logoContainer}>
            <Image  src={logo} alt="Logo" height={150} className={styles.logo} />
        </div>
    </div>
  )
}

export default Navbar