import React, { useEffect, useRef, useState } from 'react'
import styles from './MusicPlayer.module.css'
import { API_DOMAIN, CDN_DOMAIN } from '../account-manager'
import noCover from '../../../assets/noCover.png'
import { useSelectedCategory, useSelectedSong } from '../../../store'
import {
	FastForward,
	Heart,
	Pause,
	Play,
	Rewind,
	Volume2,
	VolumeOff,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Slider from 'react-slider' //@ts-ignore
import { li } from 'framer-motion/client'
import axios from 'axios'
import { useHeaders} from '../account-manager'

interface Props {}

export const MusicPlayer: React.FC<Props> = ({}) => {
	const playerRef: React.RefObject<HTMLAudioElement> = React.createRef()

	const LSvolume = localStorage.getItem('volume')
	const [volume, setVolume] = useState(LSvolume ? parseInt(LSvolume) : 50)
	const headers = useHeaders()
	const [canPlay, setCanPlay] = useState(false)
	const isPlaying = useSelectedSong(state => state.isPlaying)
	const song = useSelectedSong(state => state)
	const setCurrentDuration = useSelectedSong(state => state.setCurrentDuration)
	const progress = useSelectedSong(state => state.progress)
	const liked = useSelectedSong(state => state.Liked)
	const setLiked = useSelectedSong(state => state.setLiked)
	const playIcon = useRef(null)
	const pauseIcon = useRef(null)
	const selectedCategory = useSelectedCategory(state => state.songs)

	const setSelectedSong = useSelectedSong(state => state.setSelectedSong)
	const [progressBar, setProgressBar] = useState(progress)
	const coverURL = song.Cover
		? song.Cover.simple_image
			? `${CDN_DOMAIN}/Content/Simple/${song.Cover.simple_image}`
			: `${CDN_DOMAIN}/Content/Music/Covers/${song.Cover.image}`
		: ''

	const setIsPlaying = useSelectedSong(state => state.setIsPlaying)

	const formatTime: (time: number) => string = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		return `${minutes}:${seconds.toString().padStart(2, '0')}`
	}

	useEffect(() => {
		if (LSvolume) {
			setVolume(parseInt(LSvolume))
		}
	}, [])

	useEffect(() => {
		if (!song) return

		const player = playerRef.current
		if (!player) return

		const updateProgress = () => {

			const newProgress = (player.currentTime / player.duration) * 100
			setCurrentDuration(formatTime(player.currentTime))
			setProgress(newProgress)

		}

		player.addEventListener('timeupdate', updateProgress)

		return () => {

			player.removeEventListener('timeupdate', updateProgress)
		}
	}, [song, isPlaying])

	useEffect(() => {

		if (!song) return

		const player = playerRef.current // @ts-ignore
		player.volume = volume / 100

		const handleCanPlay = () => {

			setCanPlay(true) // @ts-ignore
			playerRef.current.play()
			setIsPlaying(true)
		}
		const updateDuration = () => {
 // @ts-ignore
			setCurrentDuration(formatTime(player.duration))
		} // @ts-ignore

		player.addEventListener('canplay', handleCanPlay) // @ts-ignore
		player.addEventListener('loadedmetadata', updateDuration)

		return () => {
// @ts-ignore
			player.removeEventListener('canplay', handleCanPlay) // @ts-ignore
			player.removeEventListener('loadedmetadata', updateDuration)
		}
	}, [song])

	const togglePlay = () => {
		if (playerRef.current && canPlay) {
			if (playerRef.current.paused) {
				playerRef.current.play()
				setIsPlaying(true)
			} else {
				playerRef.current.pause()
				setIsPlaying(false)
			}
		}
	}

	const changeVolume = (value: number) => {
		setVolume(value)
		localStorage.setItem('volume', value.toString())
	}

	const setProgress = useSelectedSong(state => state.setProgress)

	useEffect(() => {
		if (canPlay) {
			const player = playerRef.current
			if (player) {
				player.currentTime = (progressBar * player.duration) / 100
				setProgress(progressBar * 100)
				setCurrentDuration(formatTime(player.currentTime))
				if (!isPlaying) {
					setIsPlaying(true)
				}
			}
		}
	}, [progressBar])

	const songLike = () => {
		if (song.ID) {
			axios
				.post(
					`${API_DOMAIN}/MusicInteraction.php?F=LIKE`,
					{ SongID: song.ID },
					{ headers: headers }
				)
					setLiked(!liked)
				}
		}

const playerBack = () => {
	if (song.ID === 0 || !song.ID) return

	const currentIndex = selectedCategory.findIndex(s => s.ID === song.ID)
	if (currentIndex === -1) return

	let backIndex = currentIndex - 1
	if (backIndex < 0) {
		backIndex = selectedCategory.length - 1
	}
	const backSong = selectedCategory[backIndex]

	setSelectedSong(backSong)
}

const playerNext = () => {


	const currentIndex = selectedCategory.findIndex(s => s.ID === song.ID)
	if (currentIndex === -1) return

	let nextIndex = currentIndex + 1
	if (nextIndex >= selectedCategory.length) {
		nextIndex = 0
	}
	const nextSong = selectedCategory[nextIndex]

	setSelectedSong(nextSong)
}





	return (
		<div className={styles.player}>
			<div className={styles.SongInfo}>
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
					<div className={styles.TextInfo}>
						<div className={styles.TitleArtist}>
							<div className={styles.Title}>{song.Title}</div>
							<div className={styles.Artist}>{song.Artist}</div>
						</div>
						<div className={styles.VolumeControl}>
							{liked ? (
								<motion.button
									className={styles.PauseBtn}
									whileHover={{ scale: 1.2 }}
									whileTap={{scale: 0.9}}
									onClick={songLike}
								>
									<Heart
										size={20}
										color={'white'}
										fill={'red'}
										className={styles.likeIcon}
									/>
								</motion.button>
							) : (
								<motion.button
									className={styles.PauseBtn}
									whileHover={{ scale: 1.2 }}
									whileTap={{scale: 0.9}}
									onClick={songLike}
								>
									<Heart
										size={20}
										color={'white'}
										fill={'none'}
										className={styles.likeIcon}
									/>
								</motion.button>
							)}
							<VolumeOff size={20} />
							<Slider
								value={volume}
								onChange={changeVolume}
								min={0}
								max={100}
								className={styles.VolumeSlider}
								thumbClassName={styles.VolumeThumb}
								trackClassName='V-trekk'
								thumbActiveClassName={styles.VolumeThumbActive}
							/>
							<Volume2 size={20} />
						</div>
					</div>
					<div className={styles.ProgressBarWrapper}>
						<div className={styles.ProgressText}>{song.currentDuration}</div>
						<Slider
							value={progress}
							onAfterChange={setProgressBar}
							min={0}
							max={100}
							className={styles.Progress}
							thumbClassName={styles.thumb}
							trackClassName='trekk'
							thumbActiveClassName={styles.thumbActive}
						/>
						<div className={styles.ProgressText}>{song.Duration}</div>
					</div>
				</div>
			</div>

			<audio
				ref={playerRef}
				src={`${CDN_DOMAIN}/Content/Music/Files/${song.File}`}
				preload='auto'
			></audio>
			<div className={styles.Controls}>
				<motion.button
					className={styles.PauseBtn}
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.9, x: -8 }}
					onClick={playerBack}
				>
					<Rewind size={24} color='white' fill='white' />
				</motion.button>
				<motion.button
					onClick={togglePlay}
					className={styles.PauseBtn}
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.7 }}
				>
					{isPlaying ? (
						<Pause
							fill='white'
							stroke='white'
							className={styles.PauseIcon}
							ref={pauseIcon}
						/>
					) : (
						<Play
							fill='white'
							stroke='white'
							className={styles.PauseIcon}
							ref={playIcon}
						/>
					)}
				</motion.button>
				<motion.button
					className={styles.PauseBtn}
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.9, x: 8 }}
					onClick={playerNext}
				>
					<FastForward size={24} color='white' fill='white' />
				</motion.button>
			</div>
		</div>
	)
}
