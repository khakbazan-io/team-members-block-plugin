import type { User } from "./user";

export type Attributes = {
	members: User[];
	styles: {
		address: string;
		name: string;
	};
};
