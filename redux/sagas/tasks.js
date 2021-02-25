import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import api from '../../api/tasks'

function* addTask(action) {
  console.log("-- Saga: action.type --")
  console.log(action);

  // 1. back-end와 REST API 연동
  // yield call(비동기함수명, 매개변수, 매개변수...)
  // call 비동기 함수 호출 명령어
  // yield call(api.post, action.payload)
  // 2. state를 변경하는 reducer 함수를 실행
  // yield put({type:"ADD_TASK_SUCCEEDED", payload: action.payload});
  

  action.payload.id = 1;

  try{
    const result = yield call(api.post, action.payload)
    // console.log(result.data);
    yield put({type:"ADD_TASK_SUCCEEDED", payload: action.payload});  
  } catch (error) {
    yield put({type:"SHOW_ALERT", msg:error.message});  
  }  

}

function* fetchTasks(action) {
  console.log("-- saga: fetchTasks--------- --")
  console.log(action);
  
  // 1. 비동기 함수 호출(API 연동)
  const result = yield call(api.list);
  console.log("-- saga: api result --")
  console.log(result.data);

  // 2. dispatch를 실행하는 부분
  yield put({type: 'FETCH_TASKS_SUCCEEDED', payload: result.data})
}

function* removeTasks(action){

  yield call(api.delete, action.payload)

  yield put({type: 'REMOVE_TASK_SUCCEEDED', payload: action.payload})

}


function* tasksSaga() {

  // yield takeEvery("액션타입", 처리할 제네레이터함수)
  // 액션이 발생했을 때, 제네레이터함수로 처리

  // yield takeLatest("액션타입", 제네레이터함수) 
  

  // takeEvery: 해당 액션이 발생할 때마다 모두 처리. 
  // takeLatest: 해당 액션이 발생할 때 가장 나중에 호출한 액션만 처리
  //              이전의 액션은 취소가 됨
  // 주로 api를 통해서 데이터를 조회해 올 때 사용
  // ex) 조회 시, 반응 빨리 안하면 여러번 누르는 경우가 있는데,
  // 마지막 조회에만 반응하면 된다. takeEvery로 하여 모두 반응할 필요x

  
  yield takeEvery("ADD_TASK", addTask) // ADD_TASK 액션이 발생하면, addTask로 처리
  // onPress={()=>{dispatch(addTask(item))}}
  // addTask(itme): actioncreator의 action 실행 ->
  // dispatcher로 action type으로 실행 -> (reducer였는데) 
  // -> middleware인 saga( function* tasksSaga() )에서 캐치해서 먼저 처리
  // -> addTask(action) 실행, dispatcher가 받은 action도 같이 보냄.

  // addTask액션 송신 -> 사가에서 감지(여기선 type(ADD_TASK)으로 감지해서 addTask 실행)
  // -> addTask에서 REST API 호출 + Reducer로 송신 -> state 업데이트

  // dispatch({type:"ADD_TASK", payload:item}) 액션 -> 리듀서 였는데

  // saga 내부적으로,
  // const gen = addTask()
  // gen.next() 이렇게 실행
  

  yield takeLatest("FETCH_TASKS", fetchTasks);

  yield takeEvery("REMOVE_TASK", removeTasks);
}

export default tasksSaga
// export되는건 맨아래 함수만-function* tasksSaga()