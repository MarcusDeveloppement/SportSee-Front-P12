export default class ApiCall {
  async getUserData(userId) {
    const userData = await fetch(
      "http://localhost:3000/user/" + userId + "/"
    ).then((r) => r.json());
    return userData.data;
  }

  async getUserActivity(userId) {
    const userActivity = await fetch(
      "http://localhost:3000/user/" + userId + "/activity"
    ).then((r) => r.json());
    return userActivity.data;
  }

  async getUserAverageSessions(userId) {
    const userAverage = await fetch(
      "http://localhost:3000/user/" + userId + "/average-sessions"
    ).then((r) => r.json());
    return userAverage.data;
  }

  async getUserPerformance(userId) {
    const userPerformance = await fetch(
      "http://localhost:3000/user/" + userId + "/performance"
    ).then((r) => r.json());
    return userPerformance.data;
  }
}
