const URL_BASE = 'http://localhost:3000'

export default {
  async request(method, path, body) {
    const url = URL_BASE + path;
    const headers = { 'Accept': 'application/json' };
    const options = { method, headers };
    if (body) {
      options.body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }
    const response = await fetch(url, options);
    const json = await response.json();

    return json;
  },

  async get(path) {
    return this.request('GET', path);
  },

  async post(path, body) {
    return this.request('POST', path, body);
  },

  async patch(path) {
    return this.request('PATCH', path, body);
  },

  async del(path) {
    return this.request('DELETE', path);
  },
}
