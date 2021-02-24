import 'react-native-gesture-handler';

import React from 'react';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './redux/reducers'
import rootSaga from './redux/sagas'

import Main from './components/MainContainer'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga) 


export default function App() {
  return (
    <Provider store={store}>
      {/* useDispatch, useSelector 사용 불가 */}
      <Main />
    </Provider>
  );
}
