import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Markdown.scss";

export const Markdown = () => {
	const [value, setValue] = useState("");
	return (
		<>
			<ReactQuill className="mt_30 mr_20" theme="snow" value={value} onChange={setValue} />
		</>
	);
};
