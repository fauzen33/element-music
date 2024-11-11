import React from 'react'
import axios from 'axios'

// Переменные
export const BASE_DOMAIN = 'https://elemsocial.com/'
export const API_DOMAIN = 'https://elemsocial.com/System/API/'
export const SCRIPTS_DOMAIN = 'https://elemsocial.com/System/Scripts/'
export const SHARE_DOMAIN = 'https://share.elemsocial.com'
export const CDN_DOMAIN = 'https://elemsocial.com'
export const WS_DOMAIN = 'wss://wselem.xyz:2053/'
// export const BASE_DOMAIN = 'http://element.local/';
// export const API_DOMAIN = 'http://element.local/System/API/';
// export const SCRIPTS_DOMAIN = 'http://element.local/System/Scripts/';
// export const CDN_DOMAIN = 'http://element.local/';
// export const SHARE_DOMAIN = 'https://share.elemsocial.com';
// export const WS_DOMAIN = 'ws://localhost:8080';

export const Headers = {
	'Content-Type': 'multipart/form-data',
	'S-KEY': localStorage.getItem('S_KEY') || '',
	api: 'true',
}

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
export const useHeaders = () => {
	return {
		'Content-Type': 'multipart/form-data',
		'S-KEY': localStorage.getItem('S_KEY') || '',
		api: 'true',
	}
}

const connect = async headers => {
	const res = await axios.post(
		API_DOMAIN + 'Connect.php',
		{},
		{ headers: headers }
	)
	if (res.data && res.data.ID) {
		localStorage.setItem('UserData', JSON.stringify(res.data))
		return res.data
	} else {
		return false
	}
}

export const getAuth = async headers => {
	if (headers) {
		try {
			const userData = await connect(headers)
			if (userData) {
				return true
			} else {
				return false
			}
		} catch (e) {
			return false
		}
	}
	return false
}

export const getUserData = async () => {
	const userData = localStorage.getItem('UserData')
	if (userData) {
		return JSON.parse(userData)
	} else {
		return connect()
	}
}

export const GetLinks = async ({
	setUserDataLinks,
	userDataLinks,
	handlePartitionClick,
}) => {
	const res = await axios.get(API_DOMAIN + 'Settings.php?F=GET_LINKS', {
		headers: Headers,
	})

	if (res.data) {
		setUserDataLinks(res.data)
		// TODO: сделать ссылки
		// ;<Handle_GetLinks
		// 	handlePartitionClick={handlePartitionClick}
		// 	userDataLinks={userDataLinks}
		// />
	} else {
		return false
	}
}

export const changePassword = async ({ oldPassword, newPassword }) => {
	const formDataChangePass = new FormData()
	if (oldPassword.length === 0 && newPassword.length === 0) return
	formDataChangePass.append('OldPassword', oldPassword)
	formDataChangePass.append('NewPassword', newPassword)
	const res = await axios.post(
		API_DOMAIN + 'Settings.php?F=CHANGE_PASSWORD',
		formDataChangePass,
		{
			headers: Headers,
		}
	)
	if (res.data?.Type) {
		return res.data
	} else {
		return true
	}
}

