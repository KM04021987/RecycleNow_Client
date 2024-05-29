import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  //console.log('RegisterScreen')
  const [registersuccess, setRegistersuccess] = useState(0);
  const [fullname, setName] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [usertype, setUsertype] = useState();

  const { register, loading } = useContext(AuthContext);

  const registrationSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Please enter your full name'),
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
    /* .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    ) */
    ,
    confirmpassword: Yup.string()
      .min(4, 'Password is too short')
      .oneOf([Yup.ref('password')], 'Your passwords do not match')
      .required('Confirm password is required'),
    usertype: Yup.string()
      .max(1)
      .required('If you are a Donor please type "D", if you are a Receiver then type "R"')
      .matches(/^[D&d&R&r]/, 'Must be either "D" or "R". Please type "D" if you are a donor, type "R" if you are a receiver')
    ,
  });

  AsyncStorage.getItem('registersuccess').then((value) => {
    if (value == 0) {
      setRegistersuccess(0)
    } else {
      setRegistersuccess(1)
    }
  });

  if (registersuccess == 0) {
    return (
      <Formik initialValues={{
        fullname: '',
        phone: '',
        password: '',
        confirmpassword: '',
        usertype: '',
      }}
        validationSchema={registrationSchema}
        onSubmit={values => register(values)}
      >
        {({ values
          , errors
          , touched
          , handleChange
          , setFieldTouched
          , isValid
          , handleSubmit
        }) => (
          <View style={styles.container}>
            <Spinner visible={loading} />

            <Text style={styles.text}>Register</Text>

            <FormInput
              labelValue={fullname}
              onChangeText={handleChange('fullname')}
              placeholderText="Full Name"
              maxLength={30}
              iconType="user"
              autoCapitalize="none"
              autoCorrect={false}
              value={values.fullname}
              onBlur={() => setFieldTouched('fullname')}
            />
            {touched.fullname && errors.fullname && (
              <Text style={styles.errorText}>{errors.fullname}</Text>
            )}

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

            <FormInput
              labelValue={confirmpassword}
              onChangeText={handleChange('confirmpassword')}
              placeholderText="Confirm Password"
              iconType="lock"
              secureTextEntry={true}
              value={values.confirmpassword}
              onBlur={() => setFieldTouched('confirmpassword')}
            />
            {touched.confirmpassword && errors.confirmpassword && (
              <Text style={styles.errorText}>{errors.confirmpassword}</Text>
            )}

            <FormInput
              labelValue={usertype}
              onChangeText={handleChange('usertype')}
              placeholderText='Type "D" for Donor or "R" for Receiver'
              maxLength={1}
              iconType="question"
              autoCorrect={false}
              value={values.usertype}
              onBlur={() => setFieldTouched('usertype')}
            />
            {touched.usertype && errors.usertype && (
              <Text style={styles.errorText}>{errors.usertype}</Text>
            )}

            <FormButton
              onPress={handleSubmit}
              disabled={!isValid}
              buttonTitle="Register"
            />

            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                By registering, you confirm that you accept our{' '}
              </Text>
              <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                  Terms of service
                </Text>
              </TouchableOpacity>
              <Text style={styles.color_textPrivate}> and </Text>
              <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                Privacy Policy
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 30,
              }}>
              <Text style={{ fontSize: 17 }}>Already registered?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'blue', fontWeight: '600', fontSize: 17 }}> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    );
  }
  else {
    return (
      <ScrollView>
        <Spinner visible={loading} />
        <Text> You already had registered before. </Text>
      </ScrollView>
    );
  };
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 24,
    marginBottom: 10,
    color: 'black',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
});