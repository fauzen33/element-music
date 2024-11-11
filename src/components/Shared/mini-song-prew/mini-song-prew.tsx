import React, { useEffect } from 'react'
import styles from './mini-song-prew.module.css'
import { API_DOMAIN, BASE_DOMAIN, CDN_DOMAIN } from '../account-manager'
import { useHeaders } from '../account-manager'
import { useSelectedSong } from '../../../store'
import axios from 'axios'

interface Props {
	className?: string
	result: any
	hide?: any
}

export const MiniSongPrew: React.FC<Props> = ({ className, result, hide }) => {
	const Headers = useHeaders()
	const selectedSong = useSelectedSong(state => state)
	const setIsPlaying = useSelectedSong(state => state.setIsPlaying)

	const setSelectedSong = useSelectedSong(state => state.setSelectedSong)

	const setDuration = useSelectedSong(state => state.setDuration)

	const handleClick = (ID: number) => {
		axios
			.post(
				`${API_DOMAIN}LoadSong.php`,
				{ SongID: ID }, //@ts-ignore
				{ headers: Headers }
			)
			.then(res => {
				setSelectedSong(res.data)

				setDuration(res.data.Duration)

				setIsPlaying(true)
				hide()
			})
	}

	return (
		<div className={className}>
			{result.map((song: any) => {
				return (
					<div
						className={styles.item}
						key={song.ID}
						onClick={() => handleClick(song.ID)}
					>
						<img
							src={
								song.Cover
									? `${CDN_DOMAIN}/Content/Music/Covers/${song.Cover.image}`
									: ''
							}
						/>
            <div className={styles.info}>
						<span>{song.Title ? song.Title : ''}</span>
						<span>{song.Artist ? song.Artist : ''}</span>
            </div>
					</div>
				)
			})}
		</div>
	)
}
