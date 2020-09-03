import config from '../config';
import firebase from 'firebase';

const { client_id } = config.firebaseConfig;
const { scope } = config;

firebase.initializeApp(config.firebaseConfig);
export const firebaseAuth = firebase.auth();

export async function gapiInit() {
	try {
		const googleAuth = await new Promise<Omit<gapi.auth2.GoogleAuth, 'then'>>(
			(resolve) => {
				gapi.load('client', () => {
					resolve(
						gapi.auth2.init({
							client_id,
							scope,
						}),
					);
				});
			},
		);

		return googleAuth;
	} catch (e) {
		throw Error(`Google api initialization failed: ${e}`);
	}
}

export async function signIn(googleAuth: gapi.auth2.GoogleAuth) {
	if (googleAuth.isSignedIn.get()) {
		console.log('Already signed in.');
		return;
	}
	const googleUser = await googleAuth.signIn();
	const { id_token } = googleUser.getAuthResponse();
	const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
	await firebaseAuth.signInWithCredential(credential);
}

export async function signOut(googleAuth: gapi.auth2.GoogleAuth) {
	await googleAuth.signOut();
	await firebaseAuth.signOut();
}
