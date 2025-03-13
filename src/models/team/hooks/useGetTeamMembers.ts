import { api } from "../../../core/config/api";
import { useFetch } from "../../../core/hooks/useFetch";
import type { UseGetTeamMembersType } from "../types/getTeamMembers";

export function useGetTeamMembers(options?: UseGetTeamMembersType["options"]) {
	return useFetch<UseGetTeamMembersType["response"]>({
		queryKey: ["teamMembers"],
		queryFn: async () => {
			const url = "users";

			const response = await api.get(url);

			return response.data;
		},
		...options,
	});
}
