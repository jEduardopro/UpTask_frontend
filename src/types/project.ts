export type ProjectPayload = {
	name: string;
	description: string;
	deadline: string;
	client: string;
}

export type Project = ProjectPayload & {
	id: string;
}