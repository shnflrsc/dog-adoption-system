export function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 6 &&
		username.length <= 20 &&
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
