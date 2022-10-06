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
				<form>
					<input type="text" name="name" id="name" />
					<input type="date" name="created-date" id="created-date" />
					<select name="status" id="select-status">
					  <option value="alive">Alive</option>
					  <option value="unknown">Unknown</option>
					  <option value="dead">Dead</option>
					</select>
          <label><input name="species" type="checkbox" value="Horrid"/> Horrid</label>
          <label><input name="species" type="checkbox" value="Lovely"/> Lovely</label>
          <label><input name="species" type="checkbox" value="Unusual"/> Unusual</label>
          <label><input name="gender" type="radio" value="Male"/> Male</label>
          <label><input name="gender" type="radio" value="Female"/> Female</label>
          <label><input name="gender" type="radio" value="Unknown"/> Unknown</label>
				</form>
			</div>
		)

	}
}

export default Form;