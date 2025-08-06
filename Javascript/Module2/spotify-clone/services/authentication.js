import httpRequest from "../utils/httpRequest.js";
import toast from "./toastMessage.min.js";
class Authentication {
  async getInfo() {
    try {
      const res = await httpRequest.get("api/users/me");
      if (res.ok) {
        return res.json();
      }
    } catch (error) {
      console.dir("Request failed:", error);
      return error;
    }
  }
  async register({ email, password, display_name, username }) {
    try {
      const res = await httpRequest.post("api/auth/register", {
        email,
        password,
        display_name,
        username,
      });
      if (res.ok) {
        const response = await res.json();
        localStorage.setItem("access_token", response?.access_token);
      }
      return res;
    } catch (error) {
      console.dir("Register failed:", error);
      return error;
    }
  }
  async login({ email, password }) {
    try {
      const res = await httpRequest.post("api/auth/login", { email, password });
      if (res.ok) {
        const response = await res.json();
        localStorage.setItem("access_token", response?.access_token);
      }
      return res;
    } catch (error) {
      console.dir("Login failed:", error);
      return error;
    }
  }
}
export default new Authentication();
