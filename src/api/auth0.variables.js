import Config from './app.config'

export const AUTH_CONFIG = {
  clientId: 'fqTWDoWMui4cHuyput1GA22Q0QPeeX',
  domain: Config.wpDomain,
  callbackUrl: `${Config.wpDomain}callback/`,
  apiUrl: `${Config.wpDomain}wp-json/wp/v2/`
}
