import "./style.scss";
import metadata from "./block.json";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./components/edit";
import Save from "./components/save";
import type { User } from "./types/user";

registerBlockType(metadata.name, {
	title: metadata.title,
	category: metadata.category,
	attributes: {
		members: {
			type: "array",
			default: [] as User[],
		},
		styles: {
			type: "object",
			default: {},
		},
	},
	edit: Edit,
	save: Save,
});
