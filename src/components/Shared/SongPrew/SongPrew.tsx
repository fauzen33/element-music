import React from 'react'
import styles from './SongPrew.module.css'
import { MoreVertical } from 'lucide-react'
import { CDN_DOMAIN } from '../account-manager'
import noCover from '../../../assets/noCover.png'
import { useSelectedSong } from '../../../store'


interface Props {
	song: any,
	setCategory?: any
}

export const SongPrew: React.FC<Props> = ({ song, setCategory }) => {


	const setIsPlaying = useSelectedSong((state) => state.setIsPlaying)

	const setSelectedSong = useSelectedSong((state) => state.setSelectedSong)

	const setDuration = useSelectedSong((state) => state.setDuration)


	const formatTime: (time: string) => string = (time: string) => {
		return time.replace(/:00$/, '')
	}


	const coverURL = song.Cover
		? song.Cover.simple_image
			? `${CDN_DOMAIN}/Content/Simple/${song.Cover.simple_image}`
			: `${CDN_DOMAIN}/Content/Music/Covers/${song.Cover.image}`
		: ''


		const selectOnClick = () => {

			setSelectedSong(song)

			setDuration(formatTime(song.Duration))
			
			setIsPlaying(true)

			setCategory()

		}	

	return (
		<div className={styles.SongPrew} onClick={selectOnClick}>
			<div className={styles.Cover}>
				{song.Cover ? (
					<img
						src={coverURL}
						alt='фыр'
						loading='lazy'
						className={styles.CoverImg}
					/>
				) : (
					<img
						src={noCover}
						alt='no cover'
						loading='lazy'
						className={styles.CoverImg}
					/>
				)}
			</div>
			<div className={styles.Info}>
				<div className={styles.Title}>
					<div className={styles.TitleName}>{song.Title}</div>
					<div className={styles.TitleAuthor}>{song.Artist}</div>
				</div>
				<div className={styles.Button}>
					<MoreVertical />
				</div>
			</div>
		</div>
	)
}
