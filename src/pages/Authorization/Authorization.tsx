import styles from './Authorization.module.css'
import { Card } from '../../components/UI/Card/Card'
import axios, { AxiosHeaders } from 'axios'
import {API_DOMAIN, useHeaders} from '../../components/Shared/account-manager'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { Combobox } from '../../components/UI/combobox/combobox'
import { useClickAway } from '@uidotdev/usehooks'
import { Modal } from '../../components/UI/modal/modal'
import { div } from 'framer-motion/client'



function Authorization({}) {
	const { t, i18n } = useTranslation()

	

	const [loginEmail, setLoginEmail] = useState('')
	const [loginPassword, setLoginPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [active, setActive] = useState(false)
	const Headers = useHeaders()
	const navigate = useNavigate()
	const [modalActive, setModalActive] = useState(false)
	const [errMessage, setErrMessage] = useState('')
	
	

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
	}

	  const login = (e: React.FormEvent) => {
			setIsLoading(true)
			e.preventDefault()
			axios
				.post(
					`${API_DOMAIN}/Authorization.php?F=LOGIN`,
					{ Email: loginEmail, Password: loginPassword },
					{ headers: Headers as AxiosHeaders}
				)
				.then(res => {
					const answer = res.data
					if (answer.Type === 'Verify') {
						localStorage.setItem('S_KEY', answer.Content)
						navigate('/')
					} else if (answer.Type === 'Error') {
						console.log('error: ' + answer.Content)
						setIsLoading(false)
						setModalActive(true)
						setErrMessage(answer.Content)
					}
				})
		}

	return (
		<main className={styles.main}>
			<Card className={styles.card}>
				<div className={styles.leftBlock}>
					<div>
						<img src='/img/elemusicLogo.png' alt='Logo' height={312} />
					</div>
					<div className={styles.description}>
						<p>
							{t('auth-creator-info')}
							<br />
							{t('auth-creator-info-2')}
							<a href='https://elemsocial.com/' target='_blank'>
								Element
							</a>
							<Globe
								className={styles.langButton}
								onClick={() => setActive(!active)}
								
							/>
							<Combobox className={styles.langButton} values={['ru', 'tp', 'en']} active={active} setActive={setActive} onSelect={changeLanguage} />
								
							
						</p>
					</div>
				</div>
				<div className={styles.rightBlock}>
					<div className={styles.title}>{t('auth-title')}</div>
					<form id='loginForm' className={styles.form} onSubmit={login}>
						<input
							type='email'
							placeholder={t('auth-email-placeholder')}
							className={styles.input}
							onChange={e => setLoginEmail(e.target.value)}
							autoComplete='on'
						/>
						<input
							type='password'
							placeholder={t('auth-password-placeholder')}
							className={styles.input}
							onChange={e => setLoginPassword(e.target.value)}
							autoComplete='on'
						/>
						<button className={styles.button} type='submit'>
							{t('auth-enter-button')}
						</button>
						<p className={styles.loginInfo}>
							{t('auth-pass-info')}
							<a href='https://elemsocial.com/' target='_blank'>
								{' '}
								Element
							</a>
						</p>
					</form>
				</div>
			</Card>
			<Modal	active={modalActive} setActive={setModalActive} children={
				<div className={styles.modalContent}>
					<h2>{errMessage}</h2>
					<button onClick={() => setModalActive(false)} className={styles.button}>OK</button>
				</div>
			}/>
		</main>
	)
}

export default Authorization
