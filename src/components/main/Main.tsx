import React, { ReactElement, useEffect, useState } from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { signOut } from '../../utils/gapi';

export default function Main(): ReactElement {
	const history = useHistory();
	const [items, setItems] = useState<any[]>([]);

	useEffect(() => {
		if (!gapi.auth2) {
			history.push('/signin');
		} else if (gapi.auth2 && gapi.auth2.getAuthInstance().isSignedIn.get()) {
			const googleAuth = gapi.auth2.getAuthInstance();
			googleAuth.currentUser.listen((user) => {
				if (!user.isSignedIn()) {
					history.push('/signin');
				}
			});
		}
	}, [history]);

	const fetchPhotos = async () => {
		try {
			const response = await gapi.client.request({
				path: 'https://photoslibrary.googleapis.com/v1/mediaItems:search',
				method: 'POST',
				body: {
					filters: {
						contentFilter: {
							includedContentCategories: ['PEOPLE', 'LANDSCAPES'],
						},
					},
				},
			});

			const json = JSON.parse(response.body);
			const { mediaItems } = json;
			setItems(mediaItems);
		} catch (e) {}
	};

	return (
		<div>
			<Button onClick={(e) => signOut(gapi.auth2.getAuthInstance())}>
				Logout
			</Button>
			<Button onClick={fetchPhotos}>Fetch API</Button>
			<div>
				{items.map((mediaItem, i: number) => (
					<img src={mediaItem.baseUrl} key={i} alt={`img${i}`} />
				))}
			</div>
		</div>
	);
}
