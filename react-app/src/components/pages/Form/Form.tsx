import { render, renderHook } from "@testing-library/react";
import React from "react";
import './Form.css';

class Form extend from React.Component {
	construcror(props) {
		super(props);
	}
	render(): React.ReactNode {
		return (
			<div className="block-form">
				<p>Form create card</p>
			</div>
		)

	}
}

export default Form;