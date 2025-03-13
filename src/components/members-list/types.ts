import type { Attributes } from "../../types/block";
import type { User } from "../../types/user";

export type MembersListCmProps = {
	members: User[];
	customStyles: Attributes["styles"];
	isFetching?: boolean;
	isError?: boolean;
};
