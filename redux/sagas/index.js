import { fork } from 'redux-saga/effects'
import tasksSaga from './tasks'

export default function* rootSaga(){
  yield fork(tasksSaga)

  // fork 병렬처리
  // yield fork(bookmarkSaga)
  // yield fork(likesSaga)
  // yield fork(profileSaga)
}