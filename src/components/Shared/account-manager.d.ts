import { IUserData } from './account-manager.d';
// account-manager.d.ts

import {AxiosHeaders } from "axios"

	export interface IHeaders {
		'Content-Type': string
		'S-KEY': string
		api: string
	}

	export interface IUserData {
		Avatar: string
		Cover?: any
		Description:any
		Email: string
		GoldStatus: boolean
		ID: number
		Name: string
		Username: string

	}

	export const BASE_DOMAIN = 'https://elemsocial.com/'
	export const API_DOMAIN = 'https://elemsocial.com/System/API/'
	export const SCRIPTS_DOMAIN = 'https://elemsocial.com/System/Scripts/'
	export const SHARE_DOMAIN = 'https://share.elemsocial.com'
	export const CDN_DOMAIN = 'https://elemsocial.com'
	export const WS_DOMAIN = 'wss://wselem.xyz:2053/'

	export const Headers

	export function useHeaders()

	export function getAuth(headers: IHeaders): Promise<boolean>
	export function connect(headers: IHeaders): Promise<any>
export const useAccountData = () => {
	const S_KEY = localStorage.getItem('S_KEY')
	if (S_KEY) {
		const userData = JSON.parse(localStorage.getItem('UserData'))
		if (userData) {
			return userData
		} else {
			return false
		}
	} else {
		return []
	}
}
	export const getUserData = async () => {
		const userData: IUserData = localStorage.getItem('UserData')
		if (userData) {
			return JSON.parse(userData)
		} else {
			return connect()
		}
	}

