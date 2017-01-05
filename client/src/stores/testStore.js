import { request } from '../common';
import { observable } from 'mobx';

class TestStore {
  @observable data = []
  fetchData(groupId, params={}) {
   return request(`/group/api/groups/${groupId}/users`).then(res => {
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