import type { UseFetchOptions } from "../../../core/hooks/useFetch";
import type { User } from "../../../types/user";

export type UseGetTeamMembersType = {
	options: Partial<UseFetchOptions>;
	response: User[];
};
