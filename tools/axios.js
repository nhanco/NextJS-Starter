import axios from "axios"
import jwtDecode from "jwt-decode"
import { setCookie, getCookie } from "./cookies"

exports.post = async (path, data, callback) => {
  const token = getCookie("x-access-token")
  const decoded = jwtDecode(token)
  try {
    const res = await axios.post(`${window.location.origin}/${path}`, data, {
      headers: {
        "X-XSRF-TOKEN": decoded.xsrfToken,
      },
    })
    callback(res)
  } catch (error) {
    callback(error)
  }
}
