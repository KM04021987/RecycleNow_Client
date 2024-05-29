import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  //console.log('LoginScrren')
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const { loading, login } = useContext(AuthContext);
  const [registersuccess, setRegistersuccess] = useState();

  const loginSchema = Yup.object().shape({
    phone: Yup.string()
      .min(10, 'Enter 10 digits only')
      .max(10, 'Enter 10 digits only')
      .matches(
        /^[0-9]+$/,
        'Please enter only 10 digit phone number, country code is not required'
      )
      .required('Please enter your 10 digit phone number'),
    password: Yup.string()
      .min(4, 'Password is too short')
      .required('Please enter your password')
  });


  return (
    <Formik initialValues={{
      phone: '',
      password: '',
    }}
      validationSchema={loginSchema}
      onSubmit={values => login(values)}
    >
      {({ values
        , errors
        , touched
        , handleChange
        , setFieldTouched
        , isValid
        , handleSubmit
      }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <Spinner visible={loading} />
          <Image
            source={require('../assets/Logo.png')}
            style={styles.logo}
          />
          <Text style={styles.text}>Recycle Now</Text>
          <Text style={styles.text1}>A smart recycling system to resolve landfill problem</Text>

          <Text style={styles.text2}>Login</Text>

          <FormInput
            labelValue={phone}
            onChangeText={handleChange('phone')}
            placeholderText="Phone Number (10 digits only)"
            maxLength={10}
            iconType="phone"
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
            value={values.phone}
            onBlur={() => setFieldTouched('phone')}
          />
          {touched.phone && errors.phone && (
            <Text style={styles.errorText}>{errors.phone}</Text>
          )}

          <FormInput
            labelValue={password}
            onChangeText={handleChange('password')}
            placeholderText="Password"
            iconType="lock"
            secureTextEntry={true}
            value={values.password}
            onBlur={() => setFieldTouched('password')}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <FormButton
            onPress={handleSubmit}
            disabled={!isValid}
            buttonTitle="Login"
          />

          <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
            <Text style={styles.navButtonText}>Forgot Password?</Text>
          </TouchableOpacity>


          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
            }}>
            <Text style={{ fontSize: 17 }}>Don't have an acount?</Text>
            <TouchableOpacity onPress={() => {
              AsyncStorage.getItem('registersuccess').then((value) => {
                if (value == 1) {
                  AsyncStorage.setItem('registersuccess', JSON.stringify(0))
                }
              })
              navigation.navigate('Register')
            }}>
              <Text style={{ color: 'blue', fontWeight: '500', fontSize: 17 }}> Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    color: '#051d5f',
  },
  text1: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    marginBottom: 50,
    color: '#051d5f',
  },
  text2: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 24,
    marginBottom: 10,
    color: 'black',
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: 'blue',
    fontFamily: 'Lato-Regular',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
});