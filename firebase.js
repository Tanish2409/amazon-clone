import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyDqzgxmfn6b0SI_SJNCo5ppgAXRZAF1yXc',
	authDomain: 'amzn-clone-27cd9.firebaseapp.com',
	projectId: 'amzn-clone-27cd9',
	storageBucket: 'amzn-clone-27cd9.appspot.com',
	messagingSenderId: '774104758531',
	appId: '1:774104758531:web:8a8bf281178f6b565d5136',
};

const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

export const db = app.firestore();
