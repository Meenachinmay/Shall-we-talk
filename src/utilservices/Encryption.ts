import { encrypt, decrypt, compare } from 'n-krypta'

import { SECRET_KEY_FOR_EMAIL_ENCRYPTION as secretKey } from '../keys'

export function encryptEmail(email: string) {
  return encrypt(email, secretKey) as string
}

export function decryptEmail(email: string) {
  return decrypt(email, secretKey)
}