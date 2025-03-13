import { useBlockProps } from "@wordpress/block-editor";
import styles from "./style.module.scss";
import { MemberCard } from "../../common/member-card";
import { joinStrings } from "../../core/utils/joinStrings";
import type { BlockSaveProps } from "@wordpress/blocks";
import type { Attributes } from "../../types/block";

const Save = ({ attributes }: BlockSaveProps<Attributes>) => {
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<ul className={styles.wrapper} role="list">
				{attributes?.members?.map((item) => {
					return (
						<li key={`save-${item?.id}`} role="listitem">
							<MemberCard
								name={item?.username}
								address={joinStrings({
									data: [item?.address?.city, item?.address?.street],
									separator: ", ",
								})}
								imageSrc=""
								customStyles={attributes.styles}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Save;
