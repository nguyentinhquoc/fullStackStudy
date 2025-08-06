class httpRequest {
  constructor() {
    this.baseUrl = "https://spotify.f8team.dev/";
  }
  async _send(path, method, body, options = {}) {
    try {
      let access_token = localStorage.getItem("access_token");
      const _options = {
        ...options,
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      };
      if (body) _options.body = JSON.stringify(body);
      if (!!options.headers) {
        _options.headers = JSON.stringify(...options.headers);
      }
      const res = await fetch(`${this.baseUrl}${path}`, _options);
      if (res.ok === false) {
        console.log("LỖI:======:", res);
      }
      return res;
    } catch (error) {
      console.log("Lỗi", error);
    }
  }
  async get(path, options) {
    return await this._send(path, "GET", null, options);
  }
  async patch(path, body, options) {
    return await this._send(path, "PATCH", body, options);
  }
  async post(path, body, options) {
    return await this._send(path, "POST", body, options);
  }
  async put(path, body, options) {
    return await this._send(path, "PUT", body, options);
  }
  async delete(path, options) {
    return await this._send(path, "DELETE", null, options);
  }
}
export default new httpRequest();
