export function validateEmail(email: unknown): email is string {
	return (
		typeof email === 'string' &&
		email.length >= 6 &&
		email.length <= 100 &&
		/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
	);
}

export function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 50 &&
		/^[a-zA-Z0-9_-]+$/.test(username)
	);
}

export function validatePassword(password: unknown): password is string {
	return (
		typeof password === 'string' &&
		password.length >= 8 &&
		password.length <= 255 &&
		/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(password)
	);
}
