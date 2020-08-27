import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

interface Props {}

export default function Main({}: Props): ReactElement {
	const user = useSelector();
	return <div></div>;
}
