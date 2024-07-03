import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//const BASE_URL = 'http://10.0.2.2:8080';
const BASE_URL = 'https://recyclenow-server.onrender.com';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usertype, setUserType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [pickupsuccess, setPickupsuccess] = useState(0);
  const [pickupupdatesuccess, setPickupUpdatesuccess] = useState(0);
  const [registersuccess, setRegistersuccess] = useState(0);

  //const register = (fullname, phone, password, confirmpassword, usertype) => {
  const register = (input) => {
    setLoading(true);
    const fullname = input.fullname;
    const phone = input.phone;
    const password = input.password;
    const confirmpassword = input.confirmpassword;
    const usertype = input.usertype;
    axios
      .post(`${BASE_URL}/register`, {
        fullname,
        phone,
        password,
        confirmpassword,
        usertype
      })
      .then(res => {
        Alert.alert('Congratulations!', 'You have successfully created your account', [
          {
            text: 'OK', onPress: async () => {
              try {
                await AsyncStorage.setItem('registersuccess', JSON.stringify(1));
              } catch (error) {
                console.log(error)
              }
              setSplashLoading(true);
              setSplashLoading(false);
            }
          },]);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        const err_string = JSON.stringify(e)
        const err_json = JSON.parse(err_string);
        const err_message = err_json.message
        const err_status = err_message.substring(32, 35)
        if (err_status == '401') {
          Alert.alert(`This phone "${phone}" already exists. Please use a different phone number.`);
        }
        if (err_status == '402') {
          Alert.alert(`Error occured. Please try again.`);
        }
      });
  };

  //const login = (phone, password) => {
  const login = (input) => {
    const phone = input.phone;
    const password = input.password;
    setLoading(true);
    axios
      .post(`${BASE_URL}/login`, { phone, password })
      .then(res => {
        let user = res.data;
        const usertype = user.usertype
        setUserType(usertype)
        AsyncStorage.setItem('usertype', JSON.stringify(usertype));
        setUser(user);
        AsyncStorage.setItem('user', JSON.stringify(user));
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        const err_string = JSON.stringify(e)
        const err_json = JSON.parse(err_string);
        const err_message = err_json.message
        const err_status = err_message.substring(32, 35)
        if (err_status == '401') {
          Alert.alert(`This user phone "${phone}" doesn't exist`);
        }
      });
  };

  const logout = () => {
    setLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      )
      .then(res => {
        AsyncStorage.removeItem('user');
        setUser(null);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on logout ${e.message}`);
      });
  };

  const isLoggedIn = async () => {
    setSplashLoading(true);
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    if (user) {
      setUser(user);
    }

    setSplashLoading(false);
  };


  const newpickup = (plasticbottles, plasticwrapper, glassbottles, metalcans, paperbox, otherthermocolplasticwaste, country, state, city, address, ziporpin, phone) => {
    setLoading(true);
    let account = user.user.ACCOUNT;
    let saveduser = user.user;
    let savedtoken = user.token;
    let savedusertype = user.usertype;

    axios
      .post(`${BASE_URL}/newpickup`, {
        account,
        saveduser,
        savedtoken,
        savedusertype,
        plasticbottles,
        plasticwrapper,
        glassbottles,
        metalcans,
        paperbox,
        otherthermocolplasticwaste,
        country,
        state,
        city,
        address,
        ziporpin,
        phone
      })
      .then(res => {
        let user = res.data;
        setUser(user);
        AsyncStorage.setItem('user', JSON.stringify(user));
        //Alert.alert(`A new pickup request is successfully entered`);
        Alert.alert('Successful!', 'Pickup request is successfully entered', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK', onPress: async () => {
              try {
                await AsyncStorage.setItem('pickupsuccess', JSON.stringify(1));
              } catch (error) {
                console.log(error)
              }
              setSplashLoading(true);
              setSplashLoading(false);
            }
          },]);
        setLoading(false);
      })
      .catch(e => {
        console.log(`Error on register ${e.message}`);
      });
  };

  const updatepickup = (plasticbottles, plasticwrapper, glassbottles, metalcans, paperbox, otherthermocolplasticwaste, country, state, city, address, ziporpin, phone, pickuprequestno) => {
    setLoading(true);
    let account = user.user.ACCOUNT;
    let saveduser = user.user;
    let savedtoken = user.token;
    let savedusertype = user.usertype;

    axios
      .post(`${BASE_URL}/updatepickup`, {
        account,
        saveduser,
        savedtoken,
        savedusertype,
        plasticbottles,
        plasticwrapper,
        glassbottles,
        metalcans,
        paperbox,
        otherthermocolplasticwaste,
        country,
        state,
        city,
        address,
        ziporpin,
        phone,
        pickuprequestno
      })
      .then(res => {
        let user = res.data;
        setUser(user);
        AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert('Successful!', 'Pickup request is successfully updated', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK', onPress: async () => {
              try {
                await AsyncStorage.setItem('pickupupdatesuccess', JSON.stringify(1));
              } catch (error) {
                console.log(error)
              }
              setSplashLoading(true);
              setSplashLoading(false);
            }
          },]);
        setLoading(false);
      })
      .catch(e => {
        console.log(`Error on register ${e.message}`);
      });
  };


  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, register, logout, loading, user, usertype, splashLoading, newpickup, updatepickup, pickupsuccess, pickupupdatesuccess }}>
      {children}
    </AuthContext.Provider>
  );
};