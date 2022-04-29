import axios from 'axios'

const BASE_URL = 'https://ca26-213-91-249-239.eu.ngrok.io'

export const getCodes = () => axios.get(`${BASE_URL}/airdrop/codes`)

export const decryptJWT = (jwt) => axios.get(`${BASE_URL}/airdrop/claim/${jwt}`)

