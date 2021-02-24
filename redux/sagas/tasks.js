import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import api from '../../api/tasks'

function* addTask(action) {
  console.log("-- Saga: action.type --")
  console.log(action);

  // 1. back-end와 REST API 연동
  // yield call(비동기함수명, 매개변수, 매개변수...)

  const result = yield call(api.post, action.payload)
  
  // 2. state를 변경하는 reducer 함수를 실행
  yield put({type:"ADD_TASK_SUCCEEDED", payload: action.payload});
  
  //try catch로 

}

function* fetchTasks(action) {
  console.log("-- saga: action --")
  console.log(action);
  
  // 1. 비동기 함수 호출(API 연동)
  const result = yield call(api.list);
  console.log("-- saga: api result --")
  console.log(result);

  // 2. dispatch를 실행하는 부분
  yield put({type: 'FETCH_TASKS_SUCCEEDED', payload: result.data})
}

function* removeTasks(action){

  const result = yield call(api.delete, action.payload)

  yield put({type: 'REMOVE_TASK_SUCCEEDED', payload: action.payload})

}


function* tasksSaga() {
  
  

  // takeEvery: 해당 액션이 발생할 때마다 모두 처리

  

  // yield takeEvery("액션타입", 처리할 제네레이터함수)
  // 액션이 발생했을 때, 제네레이터함수로 처리
  yield takeEvery("ADD_TASK", addTask) // ADD_TASK 액션이 발생하면, addTask로 처리

  // dispatch({type:"ADD_TASK", payload:item}) 액션 -> 리듀서 였는데
  // 액션 -> 사가 -> 리듀서



  // takeLatest: 해당 액션이 발생할 때 가장 나중에 호출할 액션처리
  //              이전의 액션은 취소가 됨. 여러번 버튼을 연속적으로 누를때
  // 주로 api를 통해서 데이터를 조회해 올 때 사용(반응 빨리안해서 여러번 누를때)
  // yield takeLatest("액션타입", 제네레이터함수) 

  yield takeLatest("FETCH_TASKS", fetchTasks);

  yield takeLatest("REMOVE_TASK", removeTasks);
}

export default tasksSaga