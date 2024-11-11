import React, { useState } from 'react'
import styles from './favorites-header.module.css'
import { motion } from 'framer-motion'
import { Search, Settings } from 'lucide-react'
import { API_DOMAIN, BASE_DOMAIN, useHeaders } from '../Shared/account-manager'
import { useClickAway } from '@uidotdev/usehooks'
import { useDebounce } from '@uidotdev/usehooks'
import axios from 'axios'
import { MiniSongPrew } from '../Shared/mini-song-prew/mini-song-prew'

interface Props {
	userData: any
	setModalActive: any
}

export const FavoritesHeader: React.FC<Props> = ({
	setModalActive,
	userData,
}) => {
	const [searchActive, setSearchActive] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const ref = useClickAway(() => setSearchActive(false))
	const debouncedValue = useDebounce(inputValue, 400)
	const Headers = useHeaders()
	const [searchResult, setSearchResult] = useState([])

	React.useEffect(() => {
		axios
			.post(
				API_DOMAIN + '/Search.php',
				{
					SearchVal: debouncedValue,
					Category: 'Music',
				},
				{
					//@ts-ignore
					headers: Headers,
				}
			)
			.then(res => {
				setSearchResult(res.data.Content)
			})
	}, [debouncedValue])

	return (
		<>
			<div className={styles.FavoritesHeader}>
				<motion.div
					className={styles.FavoritesUserData}
					animate={{
						opacity: searchActive ? 0 : 1,
						display: searchActive ? 'none' : 'flex',
					}}
				>
					<img
						src={BASE_DOMAIN + 'Content/Avatars/' + userData.Avatar}
						className={styles.FavoritesUserAvatar}
						alt='фыр'
					/>
					<p className={styles.FavoritesUserName}>{userData.Name}</p>
				</motion.div>
				<div
					className={
						searchActive ? styles.ActiveSearch : styles.FavoritesRightHeader
					}
				>
					<div //@ts-ignore
						ref={ref}
						style={{ width: '100%' }}
					>
						<motion.div className={styles.Search}>
							<Search
								color={'white'}
								size={24}
								className={styles.SearchIcon}
								onClick={() => setSearchActive(!searchActive)}
							/>

							<motion.input
								type='text'
								className={styles.SearchInput}
								initial={{ width: 0, opacity: 0 }}
								transition={{ duration: 0.4, ease: 'easeOut' }}
								animate={{
									width: searchActive ? '100%' : 0,
									opacity: searchActive ? 1 : 0,
								}}
								placeholder='Поиск...'
								value={inputValue}
								onChange={e => setInputValue(e.target.value)} //@ts-ignore
							/>
						</motion.div>

						<motion.div
							className={styles.SearchResult}
							initial={{ opacity: 0, visibility: 'hidden' }}
							animate={{
								opacity: searchResult && searchActive ? 1 : 0,
								visibility: searchResult && searchActive ? 'visible' : 'hidden',
							}}
							transition={{ duration: 0.2, ease: 'easeOut' }}
						>
							<MiniSongPrew
								className={styles.MiniSongPrew} //@ts-ignore
								result={searchResult}
								hide={() => setSearchActive(false)}
							/>
						</motion.div>
					</div>

					<motion.div
						className={styles.FavoritesSettings}
						whileHover={{ scale: 1.2 }}
						animate={{
							opacity: searchActive ? 0 : 1,
							display: searchActive ? 'none' : 'flex',
						}}
					>
						<Settings
							size={24}
							color={'white'}
							onClick={() => setModalActive(true)}
						/>
					</motion.div>
				</div>
			</div>
		</>
	)
}
