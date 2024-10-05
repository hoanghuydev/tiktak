// import { message } from 'antd';

// const handlePending = (state) => {
//   state.isLoading = true;
// };

// const handleFulfilled = (state, action) => {
//   state.isError = false;
//   state.isLoading = false;
//   state.isSuccess = true;
//   if (action.payload) {
//     state.message = action.payload.mes;
//   }
// };

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.isError = true;
//   state.isSuccess = false;
//   if (action.payload) {
//     state.message = action.payload.mes;
//     message.error(action.payload.mes);
//   }
// };

// export { handlePending, handleFulfilled, handleRejected };
