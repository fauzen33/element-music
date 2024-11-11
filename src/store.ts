import {create} from 'zustand'

export interface selectedSong {
	Artist: string
	AudioFormat: string
	Bitrate: number
	Composer: string
	Cover: {
		image: string
		simple_image: string
	} | null
	Duration: string
	File: string
	Genre: string
	ID: number
	Title: string
	isPlaying: boolean
	currentDuration: string
	Liked: boolean
	progress: number
	setSelectedSong: (song: selectedSong) => void
	setIsPlaying: (isPlaying: boolean) => void
	setDuration: (Duration: string) => void
	setCurrentDuration: (currentDuration: string) => void
	setProgress: (progress: number) => void
	setLiked: (liked: boolean) => void


}

export interface selectedCategory{
	songs: Array<selectedSong>
	setSongs: (songs: Array<selectedSong>) => void
}



export const useSelectedSong = create<selectedSong>()(set => ({
	Artist: 'имя исполнителя',
	AudioFormat: 'mp3',
	Bitrate: 128,
	Composer: 'имя композитора',
	Cover: null,
	Duration: '0:00',
	File: 'file',
	Genre: 'genre',
	ID: 0,
	Title: 'название песни',
	isPlaying: false,
	currentDuration: '0:00',
	progress: 0,
	Liked: false,


	setSelectedSong: (song: selectedSong) => set(() => song),
	setIsPlaying: (isPlaying: boolean) => set(() => ({ isPlaying })),
	setDuration: (Duration: string) => set(() => ({ Duration })),
	setCurrentDuration: (currentDuration: string) =>
		set(() => ({ currentDuration })),
	setProgress: (progress: number) => set(() => ({ progress })),
	setLiked: (Liked: boolean) => set(() => ({ Liked })),
}))

export const useSelectedCategory = create<selectedCategory>()(set => ({
	songs: [],
	setSongs: (songs: Array<selectedSong>) => set(() => ({ songs })),
}))