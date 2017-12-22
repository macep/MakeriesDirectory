import request from 'axios'

export default {
  addRegisteredToMailChimp: (mail, fname, lname) => {
    request.post('', {
      'email_address': mail,
      'status': 'subscribed',
      'merge_fields': {
        'FNAME': fname,
        'LNAME': lname
      }
    }).then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
