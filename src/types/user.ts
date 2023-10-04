export type AuthUser = {
	id: string;
	name: string;
	email: string;
}

export type User = AuthUser & {
	_id: string;
}