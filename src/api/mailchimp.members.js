export default class Members {
  constructor (settings) {
    this.mailchimp = settings
  }

  add (listId, body) {
    if (!listId) {
      throw Error('List id is missing.')
    }

    const requiredFields = ['email_address', 'status']
    requiredFields.forEach((field) => {
      if (!body[field]) {
        throw Error(`${field} param is required.`)
      }
    })

    return this.mailchimp.call('POST', `/lists/${listId}/members`, body)
  }
}
