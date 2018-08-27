import { NotificationManager } from 'react-notifications'

export const createNotification = (type, message, title = '') => {
	switch (type) {
		case 'info':
			NotificationManager.info(message)
			break
		case 'success':
			NotificationManager.success(message, title)
			break
		case 'warning':
			NotificationManager.warning(message, title, 3000)
			break
		case 'error':
			NotificationManager.error(message, title, 5000, () => {})
			break
		default:
			break
	}
}
