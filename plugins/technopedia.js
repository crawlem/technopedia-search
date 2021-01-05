export default function ({ $http, $config }, inject) {
  // Setup the HTTP object
  const $technopedia = $http.create({})
  $technopedia.setBaseURL($config.baseUrl)
  $technopedia.setToken($config.apiUser + ':' + $config.apiKey, 'apikey')

  // Inject to the context
  inject('technopedia', $technopedia)

  // Some debug
  $technopedia.onRequest((config) => {
    // eslint-disable-next-line no-console
    console.log('Making request to ' + config.url)
  })
}
