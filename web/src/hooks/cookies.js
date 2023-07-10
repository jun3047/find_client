import {Cookies} from 'react-cookie';
import CryptoJS from 'crypto-js';


const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY || "";

// 암호화 함수
const encryptString = (plainText, encryptionKey) => {
	const ciphertext = CryptoJS.AES.encrypt(plainText, encryptionKey).toString();
	return ciphertext;
};

// 복호화 함수
const decryptString = (ciphertext, encryptionKey) => {
	const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
	const plaintext = bytes.toString(CryptoJS.enc.Utf8);
	return plaintext;
};

const cookies = new Cookies();

export const setUserInfoCookie = (_id) => {

	const encryptedId = encryptString(_id.toString(), encryptionKey);

 	return cookies.set('user', encryptedId);
}

export const getUserInfoCookie = () => {
	const encryptedId = cookies.get('user');

	if(encryptedId === undefined) return undefined;

	const decryptedText = decryptString(encryptedId, encryptionKey);

	console.log("decryptedText:", decryptedText);

	return parseInt(decryptedText)
}