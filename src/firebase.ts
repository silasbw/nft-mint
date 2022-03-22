// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDG8zuLHPoVbK_c8pnRCel3icQlndntdxg',
  authDomain: 'nft-mint-2534a.firebaseapp.com',
  projectId: 'nft-mint-2534a',
  storageBucket: 'nft-mint-2534a.appspot.com',
  messagingSenderId: '13743552469',
  appId: '1:13743552469:web:ddee0527dd64294bb46f5c',
  measurementId: 'G-R58TJCRY7Z',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
