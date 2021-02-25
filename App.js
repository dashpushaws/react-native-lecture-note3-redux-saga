import 'react-native-gesture-handler';

import React from 'react';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './redux/reducers'
import rootSaga from './redux/sagas'
// redux 디렉토리에 sagas.js가없으면 sagas디렉토리까지 가서 index.js를 로딩

import Main from './components/MainContainer'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga) 
// run: 디스패치로 들어오는 액션에 대해서 감지하는 
// saga를 다른 context에서 쓰겠다

export default function App() {
  return (
    <Provider store={store}>
      {/* useDispatch, useSelector 사용 불가 */}
      <Main />
    </Provider>
  );
}
