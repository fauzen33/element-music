import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'

import {API_DOMAIN, getUserData,IUserData, useHeaders} from '../../components/Shared/account-manager'
import { FavoritesBLock } from '../../components/Shared/FavoritesBlock/FavoritesBlock'
import { HorizontalScrollBlock } from '../../components/Shared/HorizontalScrollBlock/HorizontalScrollBlock'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { MusicPlayer } from '../../components/Shared/MusicPlayer/MusicPlayer'
import { useSelectedSong } from '../../store'



type Props = {}

function Home({}: Props) {
  const { t} = useTranslation()
			const [categories, setCategories] = useState([
				{
					title: t('Home-FSongs-title'),
					get: 'FAVORITES',
					songs: [],
					loaded: false,
					startIndex: 0,
				},
				{
					title: t('Home-NSongs-title'),
					get: 'LATEST',
					songs: [],
					loaded: false,
					startIndex: 0,
				},
				{
					title: t('Home-Rsongs-title'),
					get: 'RANDOM',
					songs: [],
					loaded: false,
					startIndex: 0,
				},
			])


const Headers = useHeaders()

const [userData, setUserData] = React.useState<IUserData>({} as IUserData)
const [songsIndex, setSongsIndex] = React.useState(0)
const selectedSong = useSelectedSong(state => state)
	const setSelectedSong = useSelectedSong(state => state.setSelectedSong)



useEffect(() => {
  getUserData().then(data => {
    setUserData(data)
  })
}, [])

    useEffect(() => {
			for (const category of categories) {
				axios
					.post(
						`${API_DOMAIN}/LoadSongs.php?F=${category.get}`,
						{ StartIndex: songsIndex },
						{ headers: Headers }
					)
					.then(res => {
						if (res.data) {
							setCategories(prevCategories =>
								prevCategories.map(cat =>
									cat.get === category.get
										? { ...cat, songs: res.data, loaded: true }
										: cat
								)
							)
						}
					})
			}
		}, [])

		

    const loadMore = (category:any) => {
			axios
				.post(
					`${API_DOMAIN}/LoadSongs.php?F=${category.get}`,
					{ StartIndex: category.startIndex + 25 },
					{ headers: Headers }
				)
				.then(res => {
					if (res.data) { //@ts-ignore
						setCategories(prevCategories =>
							prevCategories.map(cat =>
								cat.get === category.get
									? {
											...cat,
											songs: [...cat.songs, ...res.data],
											loaded: true,
									  }
									: cat
							)
						)
					}
				})
			setCategories(prevCategories =>
				prevCategories.map(cat =>
					cat.get === category.get
						? { ...cat, startIndex: category.startIndex + 25 }
						: cat
				)
			)
		}





  return (
		<div className={styles.container}>
			<FavoritesBLock userData={userData} songs={categories[0].songs}/>
			{
        categories.map((category, i) => (
          <HorizontalScrollBlock
            key={i}
            songs={category.songs}
            category = {category}
						loadMore={loadMore}

          />
        ))}
        <MusicPlayer />
		</div>
	)
}

export default Home