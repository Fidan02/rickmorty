"use client"
import styles from './Footer.module.css'


type footerProps = {
    language: string,
    setLanguage: any;
}

const Footer = ({language, setLanguage}: footerProps) => {    
    return (
        <div className={styles.container}>
            <select
            className="p-2 border border-teal-400 rounded bg-transparent text-white"
            value={language}
            onChange={setLanguage}
            >
            <option value="ENG">ENG</option>
            <option value="MKD">MKD</option>
            </select>
        </div>
    )
}

export default Footer