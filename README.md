This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Initial configuration
First, set configuration for firebase and google api
```
// ./src/config.js
const config = {
	firebaseConfig: {
		apiKey: <YOUR_API_KEY>,
		authDomain: <YOUR_APPS_AUTH_DOMAIN>,
		databaseURL: <YOUR_DATABASE_URL>,
		projectId: <PROJECT_ID>,
		storageBucket: 'xxxxxx',
		messagingSenderId: 'xxxxxx',
		appId: 'XXXXXX',
		measurementId: 'XXXXXXX',
		client_id: 'XXXXXX',
	},
	scope: 'https://www.googleapis.com/auth/photoslibrary.readonly', // scope for google photos api
};

export default config;
```

