import React, { useState } from 'react';
import styles from './FavoritesBlock.module.css';
import { BASE_DOMAIN, IUserData } from '../account-manager';
import { Play, Search, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {Modal} from '../../UI/modal/modal.tsx'
import { SetingsModal } from '../SettingsModal/setings-modal.tsx';
import { useSelectedCategory, useSelectedSong } from '../../../store.ts';
import { FavoritesHeader } from '../../FavoritesHeader/favorites-header.tsx';


interface Props {
  userData: IUserData;
	songs: any
}

export const FavoritesBLock: React.FC<Props> = ({userData,songs}) => {
	const [modalActive, setModalActive] = useState(false)

  const { t, i18n } = useTranslation()
	const setSelectedCategory = useSelectedCategory(state => state.setSongs)
		const setIsPlaying = useSelectedSong(state => state.setIsPlaying)

		const setSelectedSong = useSelectedSong(state => state.setSelectedSong)

		const setDuration = useSelectedSong(state => state.setDuration)

			const formatTime: (time: string) => string = (time: string) => {
				return time.replace(/:00$/, '')
			}


  const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
	}

	const startSongs = () => {
		setSelectedCategory(songs)
		setSelectedSong(songs[0])

		setDuration(formatTime(songs[0].Duration))

		setIsPlaying(true)
	}

  return (
		<div className={styles.FavotesBlock}>
			<FavoritesHeader setModalActive={setModalActive} userData={userData} />

			<div className={styles.FavoritesText}>
				<h2>{t('Home-FBlock-title')}</h2>
				<p>{t('Home-FBlock-title2')}</p>
				<motion.button
					className={styles.FavoritesButton}
					onClick={startSongs}
					whileTap={{ scale: 0.2 }}
					transition={{ duration: 0.2 }}
				>
					<Play color={'black'} fill={'black'} className={styles.PlayIcon} />
				</motion.button>
			</div>
			<div className={styles.AbsoluteBlock}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className={styles.Circles}
				>
					<motion.div
						className={styles.BlueCircle}
						animate={{
							scale: [1, 1.5],
							translateY: [150, 0],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							repeatDelay: 0,
							repeatType: 'reverse',
							ease: 'easeInOut',
						}}
					></motion.div>

					<motion.div
						className={styles.RedCircle}
						animate={{
							scale: [1, 1.5],
							translateY: [0, 150],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							repeatDelay: 0.3,
							repeatType: 'reverse',
							ease: 'easeIn',
						}}
					></motion.div>

					<motion.div
						className={styles.WhiteCircle}
						animate={{
							scale: [1, 1.5],
							translateY: [0, 120],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							repeatDelay: 0,
							repeatType: 'reverse',
							ease: 'easeIn',
						}}
					></motion.div>

					<motion.div
						className={styles.YellowCircle}
						animate={{
							scale: [1, 1.5],
							translateY: [0, 80],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							repeatDelay: 0.1,
							repeatType: 'reverse',
							ease: 'easeOut',
						}}
					></motion.div>
				</motion.div>
			</div>
			<Modal
				active={modalActive}
				setActive={setModalActive}
				children={<SetingsModal setActive={setModalActive} />}
			/>
		</div>
	)
};