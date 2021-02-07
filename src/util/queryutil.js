import axios from 'axios';

export default class QueryUtil {

  static getCompetitionByCode(code, pin, callbackFn) {
    const pinQueryString = pin.length > 0 ? `?p=${pin}` : '';
    axios.get('/api/competitions/lookup/' + code + pinQueryString)
        .then(res => callbackFn(res.data));
  }

  static getCompetitionById(id, callbackFn) {
    axios.get('/api/competitions/' + id)
        .then(res => callbackFn(res.data));
  }

  static cacheCompetitionName(id, name) {
    window.sessionStorage.setItem("compIdToName_" + id, name);
  }

  static getCachedCompetitionName(id) {
    return window.sessionStorage.getItem("compIdToName_" + id);
  }

  static cacheCompetitionPermission(id, permission) {
    window.sessionStorage.setItem("compIdToPermission_" + id, permission);
  }

  static getCachedCompetitionPermission(id) {
    return window.sessionStorage.getItem("compIdToPermission_" + id);
  }
}