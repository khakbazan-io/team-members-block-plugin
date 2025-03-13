import {
	InspectorControls,
	useBlockProps,
	SETTINGS_DEFAULTS,
	getColorClassName,
} from "@wordpress/block-editor";
import { useGetTeamMembers } from "../../models/team/hooks/useGetTeamMembers";
import type { BlockEditProps } from "@wordpress/blocks";
import { ColorPalette, PanelBody, PanelRow } from "@wordpress/components";
import type { Attributes } from "../../types/block";
import { useCallback } from "react";
import { MembersList } from "../members-list";

const Edit = ({ attributes, setAttributes }: BlockEditProps<Attributes>) => {
	const blockProps = useBlockProps();

	const { isFetching, isError } = useGetTeamMembers({
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
				<MembersList
					members={attributes?.members}
					customStyles={attributes?.styles}
					isFetching={isFetching}
					isError={isError}
				/>
			</div>
		</>
	);
};

export default Edit;
