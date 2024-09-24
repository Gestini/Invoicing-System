const axios = require('axios')

const errorMessage = 'No token, authorization denied'

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) return res.status(401).json(errorMessage)

    const response = await axios.get('http://localhost:3000/user/info', {
      headers: {
        Authorization: token,
      },
    })

    if (!response.data) return res.status(401).json(errorMessage)

    req.user = response.data
    next()
  } catch (error) {
    return res.status(401).json(errorMessage)
  }
}
