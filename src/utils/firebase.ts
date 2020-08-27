import firebase from 'firebase';
import firebaseConfig from '../config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
	try {
		await auth.signInWithPopup(provider);
	} catch (e) {
		console.log({
			code: e.code,
			message: e.message,
		});
	}
};

export const signUpWithEmailAndPassword = async (
	email: string,
	password: string,
) => {
	try {
		await auth.createUserWithEmailAndPassword(email, password);
	} catch (e) {
		console.log({
			code: e.code,
			message: e.message,
		});
	}
};

export const signInWithEmailAndPassword = async (
	email: string,
	password: string,
) => {
	try {
		auth.signInWithEmailAndPassword(email, password);
	} catch (e) {
		console.log({
			code: e.code,
			message: e.message,
		});
	}
};
