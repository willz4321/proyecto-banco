import { useDispatch } from "react-redux";
import { registerClient, loadClients, loadTipeTrans} from "../store/bancoSlice/bancoSlice";
import { bancoApi } from "../api/bancoApi";

export const useBankStore = () => {

  
  const dispatch = useDispatch();

  const getTipeTransaction = async() => {
       try {
          const {data} = await bancoApi.get("tipos");
          dispatch(loadTipeTrans(data))
       } catch (error) {
        console.log(error.message)
       }
  }

  const getClients = async() => {
    try {
       const {data} = await bancoApi.get("clientes");
       dispatch(loadClients(data))
    } catch (error) {
     console.log(error.message)
    }
}

  const getClientByDui = async(dui) => {
       try {
            await bancoApi.get(`getDui/${dui}`)
       } catch (error) {
        console.log(error.message)
       }
  }

  const getAccounts = async() => {
       try {
         await bancoApi.get('cuentas')
       } catch (error) {
        console.log(error.message)
       }
  }
  
  const starCreateClient = async(cliente) => {
        try {
            await bancoApi.post('registerClient', cliente)
            dispatch(registerClient(cliente))
        } catch (error) {
            console.log(error.message);
        }
  }

  const starCreateAccount = async(dui, cuenta) => {
      try {
        await bancoApi.post(`createAccount/${dui}`, cuenta)
        dispatch(registerClient(cuenta))
    } catch (error) {
        console.log(error.message);
    } 
  }

  const starTransaction = async (id_cuenta, tipoTransaccion, valorTransaccion) => {
    try {
      await bancoApi.post(`createTransaction/${id_cuenta}/${tipoTransaccion}/${valorTransaccion}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  

  return {
    getClients,
    getAccounts,
    getClientByDui,
    starTransaction,
    starCreateClient,
    starCreateAccount,
    getTipeTransaction
  }
     
}
