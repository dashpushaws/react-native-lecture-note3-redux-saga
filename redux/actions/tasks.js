// ActionCreator
// action1
export const addTask = payload => (
  // Action -> Design pattern: Command Pattern
  {
   type: 'ADD_TASK',
    payload
  }
)
// action2
export const removeTask = payload => ({
  type: 'REMOVE_TASK',
  payload
})