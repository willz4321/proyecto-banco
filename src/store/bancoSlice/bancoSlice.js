import { createSlice } from '@reduxjs/toolkit';

export const bancoSlice = createSlice({
  name: 'banco',
  initialState: {
    status: 'not-authenticated',
    newCliente: {},
   clientes : {},
   cuentas : {},
   transaccionTipo: {},
    errorMenssage: undefined,
        }, 
  reducers: {

    loadClients: (state, {payload}) => {
       state.clientes = payload
    },
    loadTipeTrans: (state, {payload}) => {
        state.transaccionTipo = payload;
    },
    registerClient: (state, {payload}) => {
      state.newCliente = payload;
      state.errorMenssage = undefined;
   },
   createCuenta: (state, {payload}) => {
    state.status = "not-authenticated";
    state.user = {};
    state.errorMenssage = payload;
   },
   checkingCredentials: (state) => {
       state.status = "checking";
       state.user = {};
       state.errorMenssage = undefined;
   },  
  }
});

export const {
  registerClient,
  loadTipeTrans,
  createCuenta,
  loadClients,
  checkingCredentials,
} = bancoSlice.actions;
