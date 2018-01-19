const WEBSITE = 'https://pinafore.social'
const SCOPES = 'read write follow'
const CLIENT_NAME = 'Pinafore'
import { post, get, paramsString } from '../ajax'
import { basename } from './utils'

export function registerApplication(instanceName, redirectUri) {
  const url = `${basename(instanceName)}/api/v1/apps`
  return post(url, {
      client_name: CLIENT_NAME,
      redirect_uris: redirectUri,
      scopes: SCOPES,
      website: WEBSITE
  })
}

export function generateAuthLink(instanceName, clientId, redirectUri) {
  let params = paramsString({
    'client_id': clientId,
    'redirect_uri': redirectUri,
    'response_type': 'code',
    'scope': SCOPES
  })
  return `${basename(instanceName)}/oauth/authorize?${params}`
}

export function getAccessTokenFromAuthCode(instanceName, clientId, clientSecret, code, redirectUri) {
  let url = `${basename(instanceName)}/oauth/token`
  return post(url, {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
    code: code
  })
}