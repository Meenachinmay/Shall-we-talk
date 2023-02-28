import { AES, enc } from "crypto-js";
const secretKey = "hello world";

export const encryptData = async (dataToEncrypt: string) => {
  const data = AES.encrypt(
    JSON.stringify(dataToEncrypt),
    secretKey
  ).toString();
  return data;
};

export const decryptData = (dataToDecrpyt: string) => {
  const bytes = CryptoJS.AES.decrypt(dataToDecrpyt, secretKey);
  const data = JSON.parse(bytes.toString(enc.Utf8));
  return data;
};

export const filterEncryption = (dataToFilter: string) => {
    const final = dataToFilter.replace('/', '')
    return final as string
}