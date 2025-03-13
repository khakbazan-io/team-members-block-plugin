import styles from "./style.module.scss";
import type { MemberCardCmProps } from "./types";
import avatar from "./avatar.jpg";
import clsx from "clsx";

export const MemberCard: React.FC<MemberCardCmProps> = ({
	address,
	imageSrc,
	name,
	customStyles,
}) => {
	const nameId = `member-name-${name.replace(/\s+/g, "-").toLowerCase()}`;

	return (
		<article
			className={clsx(styles.memberCardWrapper, "has-accent-6-border-color")}
			aria-labelledby={nameId}
		>
			<img src={avatar} alt={`profile picture of ${name}`} />

			<div>
				<h3
					id={nameId}
					className={clsx(
						"has-text-color",
						"has-medium-font-size",
						customStyles?.name || "has-contrast-color",
					)}
				>
					{name}
				</h3>

				<p
					aria-label="Address"
					className={clsx(
						"has-text-color",
						"has-small-font-size",
						customStyles?.address || "has-accent-4-color",
					)}
				>
					{address}
				</p>
			</div>
		</article>
	);
};
