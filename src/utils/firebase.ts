import firebase from 'firebase';
import config from '../config';

export type UserInfo = {
	email: string;
	uid: string;
};

firebase.initializeApp(config.firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/photoslibrary');

interface ExtendedAuthCredential extends firebase.auth.AuthCredential {
	accessToken: string;
	idToken: string;
}

export const signInWithGoogle = async () => {
	try {
		const response = await auth.signInWithPopup(provider);
		if (!response.user) throw new Error('No user info.');
		const {
			accessToken,
			idToken,
		} = response.credential as ExtendedAuthCredential;
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('idToken', idToken);
		console.log('authentication succeeded.');

		return {
			email: response.user.email as string,
			uid: response.user.uid,
		};
	} catch (e) {
		throw new Error('Signin Failed.');
	}
};

// export const signUpWithEmailAndPassword = async (
// 	email: string,
// 	password: string,
// ) => {
// 	try {
// 		const response = await auth.createUserWithEmailAndPassword(email, password);
// 		if (!response.user) throw new Error('No user info.');

// 		return {
// 			email: response.user.email as string,
// 			uid: response.user.uid,
// 		};
// 	} catch (e) {
// 		console.log({
// 			code: e.code,
// 			message: e.message,
// 		});
// 	}
// };

// export const signInWithEmailAndPassword = async (
// 	email: string,
// 	password: string,
// ) => {
// 	try {
// 		const response = await auth.signInWithEmailAndPassword(email, password);
// 		if (!response.user) throw new Error('No user info.');

// 		return {
// 			email: response.user.email as string,
// 			uid: response.user.uid,
// 		};
// 	} catch (e) {
// 		console.log({
// 			code: e.code,
// 			message: e.message,
// 		});
// 	}
// };

export const signOut = async () => {
	try {
		await auth.signOut();
	} catch (e) {
		console.log({
			code: e.code,
			message: e.message,
		});
	}
};
