import React from 'react'
import styles from './HorizontalScrollBlock.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SongPrew } from '../SongPrew/SongPrew'
import 'swiper/css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelectedCategory } from '../../../store'

interface Props {
  songs: any
	category: any,
	loadMore: any
}

export const HorizontalScrollBlock: React.FC<Props> = ({songs, category, loadMore}) => {


const setSelectedCategory = useSelectedCategory((state) => state.setSongs)

	const setCategory = () => {
			setSelectedCategory(category.songs)
	}

	return (
		<div className={styles.Container}>
			<div className={styles.Title}>{category.title}</div>
			{category.loaded ? (
				<Swiper
				onReachEnd={() => loadMore(category)}
				slidesPerView={'auto'}
				>
					{songs &&
						songs.map((song: any) => (
							<SwiperSlide key={song.ID} >
								<SongPrew song={song} setCategory={setCategory}/>
							</SwiperSlide>
						))}
				</Swiper>
			) : (
				<Skeleton
					height={200}
					containerClassName={styles.Skeleton}
					width={1500}
					baseColor='#252525'
				/>
			)}
		</div>
	)
}
