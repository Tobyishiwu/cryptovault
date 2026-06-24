import CryptoJS from "crypto-js";

export const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(
    text,
    process.env.ENCRYPTION_KEY as string
  ).toString();
};

export const decrypt = (cipher: string) => {
  const bytes = CryptoJS.AES.decrypt(
    cipher,
    process.env.ENCRYPTION_KEY as string
  );

  return bytes.toString(CryptoJS.enc.Utf8);
};