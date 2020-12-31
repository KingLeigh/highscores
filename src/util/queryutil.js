import axios from 'axios';

export default class QueryUtil {

  static getCompetitionByCode(code, callbackFn) {
    axios.get('/api/competitions/lookup/' + code)
        .then(res => callbackFn(res.data));
  }

  static getCompetitionById(id, callbackFn) {
    axios.get('/api/competitions/' + id)
        .then(res => callbackFn(res.data));
  }
}