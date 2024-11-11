import React from 'react'
import styles from './setings-modal.module.css'
import { X } from 'lucide-react'
import { Combobox } from '../../UI/combobox/combobox'
import i18n from '../../../i18n'
import { json, useNavigate } from 'react-router-dom'
import { BASE_DOMAIN } from '../account-manager'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

interface Props {
	className?: string
	setActive: any
}

export const SetingsModal: React.FC<Props> = ({ className, setActive }) => {

  const [comboboxActive, setComboboxActive] = React.useState(false)

  const { t, i18n } = useTranslation()


  	const changeLanguage = (language: string) => {
			i18n.changeLanguage(language)
		}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<p className={styles.title}>{t("Settings-Title")}</p>
				<X className={styles.close} onClick={() => setActive(false)} />
			</div>
			<div className={styles.content}>
				<div className={styles.contentItem}>
					{' '}
					<p>{t("Settings-Lang")}</p>{' '}
					<button
						className={styles.langButton}
						onClick={() => setComboboxActive(true)}
					>
						{i18n.language}
					</button>
					<Combobox
						className={styles.langBox}
						values={['ru', 'tp', 'en']}
						active={comboboxActive}
						setActive={setComboboxActive}
						onSelect={changeLanguage}
					/>{' '}
				</div>
				<div className={styles.contentItem}>
					<p>{t("Settings-Link")}</p>

					<a href={BASE_DOMAIN}>
						<button className={styles.Button}>Перейти</button>
					</a>
				</div>
			</div>
		</div>
	)
}
