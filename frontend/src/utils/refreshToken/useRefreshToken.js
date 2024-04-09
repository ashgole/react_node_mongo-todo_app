import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postRefreshAccessToken } from '../api';
import { addUserAuth, setAuthentication } from '../../features/auth/signinSlice';
import { REFRESH_TOKEN } from '../constants';
import { isSignin, setToken } from '../token';

const useRefreshToken = async () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isSignin("refreshToken")) {
      return
    }
    const fetchData = async () => {
      const response = await postRefreshAccessToken(REFRESH_TOKEN);
      setToken('accessToken', response.data.accessToken)
      setToken('refreshToken', response.data.refreshToken)
      dispatch(addUserAuth(response.data.user));
      dispatch(setAuthentication(true))
    }
    fetchData()
  }, [])

}

export default useRefreshToken