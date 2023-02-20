const BASE_URL = 'http://localhost:5000';

export const PERFUMES_URL = BASE_URL + '/api/perfumes';
export const PERFUMES_BY_SEARCH_URL = PERFUMES_URL + '/search/';
export const PERFUMES_BY_ID_URL = PERFUMES_URL + '/';
export const PERFUMES_UPDATE_URL = PERFUMES_URL + '/update/';

export const USERS_URL = BASE_URL + '/api/users';
export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const PEDIDO_CREATE_URL = BASE_URL + '/api/pedidos/create';
export const PEDIDO_BY_USER_URL = BASE_URL + '/api/pedidos/';
export const PEDIDO_BY_ID_URL = BASE_URL + '/api/pedidos/search/';
export const PEDIDO_DELETE_URL = BASE_URL + '/api/pedidos/delete/';

export const TARJETAS_URL = BASE_URL + '/api/tarjetas';
export const TARJETA_CREATE_URL = TARJETAS_URL + '/register';

export const DIRECCIONES_URL = BASE_URL + '/api/direcciones';
export const DIRECCION_CREATE_URL = DIRECCIONES_URL + '/register';
