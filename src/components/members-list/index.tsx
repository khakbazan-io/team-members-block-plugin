import { MemberCard } from "../../common/member-card";
import { joinStrings } from "../../core/utils/joinStrings";
import type { MembersListCmProps } from "./types";
import styles from "./style.module.scss";

export const MembersList: React.FC<MembersListCmProps> = ({
	members,
	customStyles,
	isError,
	isFetching,
}) => {
	if (isFetching) {
		return <p>Loading Team Members...</p>;
	}

	if (isError) {
		return <p>Error fetching team members</p>;
	}

	if (!members?.length) {
		return <p>No Team Members Found!</p>;
	}

	return (
		<ul className={styles.wrapper} role="list">
			{members?.map((item) => {
				return (
					<li key={`edit-${item?.id}`} role="listitem">
						<MemberCard
							name={item?.username}
							address={joinStrings({
								data: [item?.address?.city, item?.address?.street],
								separator: ", ",
							})}
							imageSrc=""
							customStyles={customStyles}
						/>
					</li>
				);
			})}
		</ul>
	);
};
