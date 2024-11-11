
//@ts-nocheck
export const Animate = (obj, name, time) => {
	let speed = localStorage.getItem('S-AnimSpeed')
	if (speed) {
		speed = parseInt(speed)
		if (speed !== 5) {
			if (speed < 5) {
				time = time * speed * 0.2
			} else {
				time = time * speed * 0.5
			}
		}
	}
	document.querySelector(obj).style.animation = name + ' ' + time + 's forwards'
}
export const AnimateElement = (obj, name, time) => {
	let speed = localStorage.getItem('S-AnimSpeed')
	if (speed) {
		speed = parseInt(speed)
		if (speed !== 5) {
			if (speed < 5) {
				time = time * speed * 0.2
			} else {
				time = time * speed * 0.5
			}
		}
	}
	obj.style.animation = name + ' ' + time + 's forwards'
}
export const hexToRgba = (hex, alpha) => {
	hex = hex.replace(/^#/, '')
	let r = parseInt(hex.substring(0, 2), 16)
	let g = parseInt(hex.substring(2, 4), 16)
	let b = parseInt(hex.substring(4, 6), 16)
	return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
