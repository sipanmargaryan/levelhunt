import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

export default ({ name, label, error, type, value, className, ...rest }) => {
	const id = `id_${name}`,
		input_type = type ? type : 'text'

	return (
		<FormGroup>
			{label ? <Label htmlFor={id}>{label}</Label> : ''}
			<Input
				type={input_type}
				value={!value ? '' : value}
				name={name}
				id={id}
				className={error ? `is-invalid ${className}` : className ? className : ''}
				{...rest}
			/>
			{error ? <span className="alert-danger">{error}</span> : ''}
		</FormGroup>
	)
}
