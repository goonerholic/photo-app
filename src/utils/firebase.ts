import firebase from 'firebase';
import firebaseConfig from '../config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
	auth.signInWithPopup(provider);
};

export const signUpWithEmailAndPassword = (email: string, password: string) => {
	auth.createUserWithEmailAndPassword(email, password);
};

export const signInWithEmailAndPassword = (email: string, password: string) => {
	auth.signInWithEmailAndPassword(email, password);
};
