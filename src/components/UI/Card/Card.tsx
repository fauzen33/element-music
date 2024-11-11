import React from 'react'
import styles from './Card.module.css'

interface Props {
	className?:string
	children?: React.ReactNode
}

export const Card: React.FC<Props> = ({ className, children }) => {
	return <div className={styles.cardBg + ' ' + className}>{children}</div>
}
