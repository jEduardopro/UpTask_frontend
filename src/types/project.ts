import { Task, User } from ".";

export type ProjectPayload = {
	name: string;
	description: string;
	deadline: string;
	client: string;
}

export type Project = ProjectPayload & {
	_id: string;
	creator: string;
	tasks: Task[];
	collaborators: User[];
}