import { request } from '../common';
import { observable } from 'mobx';
import queryString from 'querystring';

class TestStore {
  @observable data = []
  @observable pagination = {}
  fetchData(groupId, params={}) {
   return request(`/group/api/groups/${groupId}/users?${queryString.stringify(params)}`).then(res => {
      if (res.status !== 200) {
        return res.json().then(rst => {
          throw new Error(`[${rst.code}] ${rst.message}`);
        });
      }
      return res.json();
    });
  }
}

export default new TestStore();