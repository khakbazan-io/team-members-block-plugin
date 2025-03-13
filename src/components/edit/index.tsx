import {
	InspectorControls,
	useBlockProps,
	SETTINGS_DEFAULTS,
	getColorClassName,
} from "@wordpress/block-editor";
import styles from "./style.module.scss";
import { useGetTeamMembers } from "../../models/team/hooks/useGetTeamMembers";
import type { BlockEditProps } from "@wordpress/blocks";
import { MemberCard } from "../../common/member-card";
import { joinStrings } from "../../core/utils/joinStrings";
import { ColorPalette, PanelBody, PanelRow } from "@wordpress/components";
import type { Attributes } from "../../types/block";
import { useCallback } from "react";

const Edit = ({ attributes, setAttributes }: BlockEditProps<Attributes>) => {
	const blockProps = useBlockProps();

	const { data, isFetching, isError } = useGetTeamMembers({
		onSuccess: (response) => {
			if (response) {
				setAttributes({ members: response });
			}
		},
	});

	const handleSetColor = useCallback(
		(key: "name" | "address", color?: string) => {
			if (color) {
				const selectedColor = SETTINGS_DEFAULTS.colors.find(
					(c) => c.color === color,
				);

				if (selectedColor) {
					setAttributes({
						styles: {
							...attributes.styles,
							[key]: getColorClassName("color", selectedColor.slug),
						},
					});
				}
			}
		},
		[getColorClassName, attributes.styles, setAttributes],
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Name Color">
					<PanelRow>
						<ColorPalette
							disableCustomColors
							colors={SETTINGS_DEFAULTS.colors}
							onChange={(color) => {
								handleSetColor("name", color);
							}}
						/>
					</PanelRow>
				</PanelBody>

				<PanelBody title="Address Color">
					<PanelRow>
						<ColorPalette
							disableCustomColors
							colors={SETTINGS_DEFAULTS.colors}
							onChange={(color) => {
								handleSetColor("address", color);
							}}
						/>
					</PanelRow>
				</PanelBody>

				
			</InspectorControls>

			<div {...blockProps}>
				{isFetching ? (
					<p>Loading Team Members...</p>
				) : isError ? (
					<p>Error fetching team members</p>
				) : (
					<ul className={styles.wrapper} role="list">
						{data?.map((item) => {
							return (
								<li key={`edit-${item?.id}`} role="listitem">
									<MemberCard
										name={item?.username}
										address={joinStrings({
											data: [item?.address?.city, item?.address?.street],
											separator: ", ",
										})}
										imageSrc=""
										customStyles={attributes?.styles}
									/>
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</>
	);
};

export default Edit;
