import axios from 'axios'

export default async ({ store, route, redirect }) => {
  // 認証済みの場合は何もしない
  if (store.state.auth) {
    return
  }

  if (route.path !== '/callback') {
    // サーバーのsessionからuser情報を取得する
    const { session } = await axios.get(process.env.baseURL + '/server/session')
    if (session != null) {
      store.commit('login', session.data.user)
      if (route.path === '/') {
        return redirect('/')
      }
    } else if (route.path !== '/') {
      // 無限リダイレクトにならないように、パスが"/"の場合は何もしない
      return redirect('/')
    }
  }
}