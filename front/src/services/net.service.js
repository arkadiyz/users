import { httpService } from './http.service';

export async function login(userParams) {
  try {
    const res = await httpService.post('/api/auth/login', userParams);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function signUp(userParams) {
  try {
    const res = await httpService.post('/api/register', userParams);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    await httpService.post('/api/auth/logout', {});
    return true;
  } catch (error) {
    return false;
  }
}

export async function isAuthenticated() {
  try {
    const res = await httpService.post('/api/auth/islogin', {});
    return res;
  } catch (error) {
    return error;
  }
}

export async function getAllUsers() {
  try {
    const res = await httpService.post('/api/users', {});
    return res;
  } catch (error) {
    return error;
  }
}
