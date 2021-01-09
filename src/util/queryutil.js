import axios from 'axios';

export default class QueryUtil {

  static getCompetitionByCode(code, pin, callbackFn) {
    axios.get('/api/competitions/lookup/' + code)
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
}