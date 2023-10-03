export type TaskPayload = {
	name: string;
	description: string;
	deadline: string;
	priority: string;
}

export type Task = TaskPayload & {
	_id: string;
	status: boolean;
}