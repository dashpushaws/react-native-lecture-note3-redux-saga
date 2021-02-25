import { fork } from 'redux-saga/effects'
import tasksSaga from './tasks'

export default function* rootSaga(){
  yield fork(tasksSaga)

  // fork 병렬처리
  // bookmarksSaga, likesSaga, profileSaga 각각 따로 처리시킴
  // 
  // yield fork(bookmarksSaga)
  // yield fork(likesSaga)
  // yield fork(profileSaga)
}