import config from '../config';
import firebase from 'firebase';
import 'firebase/performance';

const { client_id } = config.firebaseConfig;
const { scope } = config;

firebase.initializeApp(config.firebaseConfig);
const perf = firebase.performance();
const firebaseAuth = firebase.auth();

export async function gapiInit() {
  try {
    return await new Promise<Omit<gapi.auth2.GoogleAuth, 'then'>>((resolve) => {
      gapi.load('client', () => {
        resolve(
          gapi.auth2.init({
            client_id,
            scope,
          }),
        );
      });
    });
  } catch (e) {
    throw Error(`Google api initialization failed: ${e}`);
  }
}

export async function signIn() {
  try {
    const googleAuth = gapi.auth2.getAuthInstance();
    // if (googleAuth.isSignedIn.get()) {
    //   console.log('Already signed in.');
    //   return;
    // }

    const googleUser = await googleAuth.signIn();
    const { id_token } = googleUser.getAuthResponse();
    const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
    const userCredential = await firebaseAuth.signInWithCredential(credential);
    console.log(userCredential);
    const user = userCredential.user as firebase.User;
    console.log(user);
    const { uid, displayName, photoURL } = user;
    localStorage.setItem(
      'user',
      JSON.stringify({ uid, displayName, photoURL }),
    );
    return {
      uid,
      displayName,
      photoURL,
    };
  } catch (e) {
    throw Error(`Signin failed: ${e.message}`);
  }
}

export function signOut() {
  gapi.auth2.getAuthInstance().then((googleAuth) => {
    console.log(googleAuth.currentUser.get());
    googleAuth.signOut();
  });
  firebaseAuth.signOut();
}

export interface FetchOptions {
  keywords?: string[];
  pageSize?: number;
  pageToken?: string;
}

export interface RequestOptions {
  filters: {
    contentFilter: {
      includedContentCategories: string[];
    };
  };
  pageSize?: number;
  pageToken?: string;
}

export interface MediaItem {
  id: string;
  description: string;
  productUrl: string;
  baseUrl: string;
  mimeType: string;
  mediaMetadata: {
    creationTime: string;
    width: string;
    height: string;
    photo?: {
      cameraMake: string;
      cameraModel: string;
      focalLength: number;
      apertureFNumber: number;
      isoEquivalent: number;
      exposureTime: string;
    };
    video?: {
      cameraMake: string;
      cameraModel: string;
      fps: number;
      status: any;
    };
  };
  contributorInfo: {
    profilePictureBaseUrl: string;
    displayName: string;
  };
  filename: string;
}

export interface FetchPhotoResponse {
  mediaItems: MediaItem[];
  nextPageToken: string;
}

export async function fetchPhotos({
  keywords,
  pageSize,
  pageToken,
}: FetchOptions): Promise<FetchPhotoResponse> {
  try {
    const requestOptions: RequestOptions = {
      filters: {
        contentFilter: {
          includedContentCategories: keywords || [],
        },
      },
    };
    requestOptions.pageSize = pageSize ? pageSize : 20;
    if (pageToken) requestOptions.pageToken = pageToken;

    const response = await gapi.client.request({
      path: 'https://photoslibrary.googleapis.com/v1/mediaItems:search',
      method: 'POST',
      body: requestOptions,
    });

    const json = JSON.parse(response.body);
    return json;
  } catch (e) {
    throw Error(`Failed to fetch photos from google photos library. : ${e}`);
  }
}
