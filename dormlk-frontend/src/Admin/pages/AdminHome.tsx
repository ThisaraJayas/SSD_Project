import { RootState } from '@/Redux/store.ts';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AdminHome() {
  const { loginUser } = useSelector((state: RootState) => state.User);
  const navigate = useNavigate()
  console.log("USSS ",loginUser?.userType);
  // if(loginUser?.userType==='REGULAR'){
  //   navigate('/')
  // }
  return (
    <div>AdminHomes</div>
  )
}
