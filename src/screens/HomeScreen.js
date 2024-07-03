import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import FormButton from '../components/FormButton';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ navigation }) => {
  //console.log('HomeScrren')
  const { logout, loading } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [pickupsuccess, setPickupsuccess] = useState();
  const [pickupupdatesuccess, setPickupUpdatesuccess] = useState();

  return (
    <ScrollView>
      <Spinner visible={loading} />
      <View style={{ backgroundColor: '#ffffff', height: 55 }}>
        <Text style={styles.text}> Welcome, {user.user.FULLNAME}! </Text>
      </View>
      <TouchableOpacity
        style={styles.userBtn}
        onPress={() => {
          AsyncStorage.getItem('pickupsuccess').then((value) => {
            if (value == 1) {
              AsyncStorage.setItem('pickupsuccess', JSON.stringify(0))
            }
          })
          navigation.navigate('NewPickup');
        }}>
        <Text style={styles.userBtnTxt}>Create a New Pickup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.userBtn}
        onPress={() => {
          AsyncStorage.getItem('pickupupdatesuccess').then((value) => {
            if (value == 1) {
              AsyncStorage.setItem('pickupupdatesuccess', JSON.stringify(0))
            }
          })
          navigation.navigate('ViewPickup');
        }}>
        <Text style={styles.userBtnTxt}>Pickup History</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 18,
    color: '#051d5f',
    marginTop: 20,
    marginLeft: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 15,
  },
  userBtnTxt: {
    color: '#2e64e5',
    fontSize: 17,
    marginLeft: 15,
  },
});