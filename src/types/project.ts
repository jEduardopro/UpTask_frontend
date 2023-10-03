import { Task } from ".";

export type ProjectPayload = {
	name: string;
	description: string;
	deadline: string;
	client: string;
}

export type Project = ProjectPayload & {
	_id: string;
	tasks: Task[];
}