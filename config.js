const user = 'joaovsa'
const password = 'WOhQQKDAfuEQYro'

module.exports = {
  getConnection: () =>
		`mongodb+srv://${user}:${password}@cluster0-rsntu.mongodb.net/test?retryWrites=true&w=majority`
}
