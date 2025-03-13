import { useBlockProps } from "@wordpress/block-editor";
import type { BlockSaveProps } from "@wordpress/blocks";
import type { Attributes } from "../../types/block";
import { MembersList } from "../members-list";

const Save = ({ attributes }: BlockSaveProps<Attributes>) => {
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<MembersList
				members={attributes?.members}
				customStyles={attributes?.styles}
			/>
		</div>
	);
};

export default Save;
