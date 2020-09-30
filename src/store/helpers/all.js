export const init_state = {
    user: null,
    msgServer:null,
    bills:null,
    calls:null,
    isDataLoading:false,
}


// -------[ getters ]----------
export const getUser = state => {
    return  state.user
}

export const getMsgServer = state => {
    return  state.msgServer
}

// -------[ mutations ]----------
export const checkUserSession = (state, payload = null) => {
    // let storageRefreshToken = JSON.parse(localStorage.getItem('RefreshToken ') || '{}');
	// if( !Object.keys(storageRefreshToken).length )
	// 	{
	// 		localStorage.setItem("RefreshToken ", JSON.stringify(initState));
	// 	}
    state.user = payload;
}
export const login = (state, payload = []) => {
    state.user = payload.user ? payload.user : null;
}
export const msgServer = ( state, payload = [] )=>{
    state.msgServer  = payload ?  payload : state.msgServer  ;
}
export const setBills = ( state, payload = null )=>{
    state.bills  = payload ;
}
export const setCalls = ( state, payload = null )=>{
    state.calls  = payload ;
}
export const setIsDataLoading = ( state, manualSet = false  )=>{
    state.isDataLoading  = manualSet ;
}


// -------[ Actions ]-------

export const checkUserSessionAction = async (context, path = '/users/jwt_refresh') => {

    let corsAPI = `${process.env.VUE_APP_DATA_API}${path}`;

    const myHeaders = {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
    };

    context.commit('setIsDataLoading', true);

    const response = await fetch(corsAPI, myHeaders);
    const data = await response.json();

    if (data && data.user) {
        context.commit('checkUserSession', data.user);
        context.commit('setIsDataLoading');
        context.dispatch('autoRefresh');
    } else {
        context.commit('checkUserSession');
        context.commit('setIsDataLoading');
    }

}
export const autoRefresh  = async (context ) => {

    const { state, dispatch } = context;

    const { jwt_time_expires } = state.user
    let timeUntilRefresh = Math.floor( ( jwt_time_expires - Date.now() ) - (1000 * 60 * 1.2) )

    var waitAlitle = null
    var refresh = null

    if( state.isDataLoading ){
        clearTimeout(refresh);
        waitAlitle =  setTimeout(() => dispatch('autoRefresh'), 2000);
    }
    else{
        clearTimeout(waitAlitle);
        refresh=  setTimeout(() => dispatch('checkUserSessionAction' ), timeUntilRefresh );
    }


}

//--логин || регистрация || изменение данных пользователя
export const loginAction = async (context, payload) => {

    let corsAPI = `${process.env.VUE_APP_DATA_API}${payload.path}`;
    let r_body = payload.form;

    const myHeaders = {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        body: r_body
    };

    //--loading
    context.commit('setIsDataLoading', true);

    const response = await fetch(corsAPI, myHeaders);

    let data = '';

    if (response.status >= 200 && response.status <= 299) {
        data = await response.json();

        if (data.msg && (data.msg.regSuccess || data.msg.loginSuccess)) {
            context.commit('login', data);
            context.commit('msgServer', data.msg);
            context.commit('setIsDataLoading');
            context.dispatch('autoRefresh');
        }else if (data.msg && (data.msg.userUpdated )) {
            context.commit('login', data);
            context.commit('msgServer', data.msg);
            context.commit('setIsDataLoading');
        }else if (data.msg && (data.msg.passUpdated )) {
            context.commit('login', data);
            context.commit('msgServer', data.msg);
            context.commit('setIsDataLoading');
        }
        else if (data.msg && data.msg.contact) {
            context.commit('msgServer', data.msg);
            context.commit('setIsDataLoading');
        } else if (data.msg && data.msg.userDeleted) {
            context.commit('login');
            context.commit('setIsDataLoading');
        }
    } else if (response.status === 401) {
        let regErrors = await response.json();

        context.commit('msgServer', regErrors.msg);
        context.commit('setIsDataLoading');
    }
}

export const emailVerifyAction = async (context, payload) => {

    let corsAPI = `${process.env.VUE_APP_DATA_API}${payload.path}`;
    let jwt = (context.state.user && context.state.user.jwt) && context.state.user.jwt

    const myHeaders = {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            "Authorization": jwt,
        },
        credentials: 'include',
    };

    const response = await fetch(corsAPI, myHeaders);
    const data = await response.json();

    let serverResp = data.msg && data.msg.emailConfirmed || data.msg.timeErr || data.msg.errorCred || data.msg.verLinkSend ? data.msg : false;

    if (data && data.user && serverResp ) {
        context.commit('checkUserSession', data.user);
        context.commit('msgServer', serverResp);
    }else if(!data.user && serverResp ){
        context.commit('checkUserSession');
        context.commit('msgServer', serverResp);
    }else {
        context.commit('checkUserSession');
    }

}


export const getUserDataAction = async (context, payload ) => {

    let corsAPI = `${process.env.VUE_APP_DATA_API}${payload.path}`;
    let jwt = (context.state.user && context.state.user.jwt) && context.state.user.jwt

    const myHeaders = {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            "Authorization": jwt,
        },
        credentials: 'include',
    };

    var wait = null

    if( context.state.isDataLoading ){
        wait = setTimeout(() => context.dispatch('getUserDataAction', payload), 1000);
    }
    else{
        clearTimeout(wait);

        //--loading
        context.commit('setIsDataLoading', true);

        const response = await fetch(corsAPI, myHeaders);
        const data = await response.json();

        if (data && data.bills) {
            context.commit('setBills', data);
            context.commit('setIsDataLoading');
        } else if(data && 'calls' in data){
            context.commit('setCalls', data);
            context.commit('setIsDataLoading');
        } else {
            context.commit('setBills');
            context.commit('setCalls');
            context.commit('setIsDataLoading');
        }
    }
}


