import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';
import FormButton from '../components/FormButton';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../navigation/AuthProvider';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const plastic_bottles_data = [
  { label: 'None', value: '0' },
  { label: 'Above 5 Bottles', value: 'Above 5 Bottles' },
  { label: 'Above 10 Bottles', value: 'Above 10 Bottles' },
  { label: 'Above 20 Bottles', value: 'Above 20 Bottles' },
  { label: 'Above 30 Bottles', value: 'Above 30 Bottles' },
  { label: 'Above 50 Bottles', value: 'Above 50 Bottles' },
];

const plastic_wrapper_data = [
  { label: 'None', value: '0' },
  { label: 'Above 10 Plastic Wrapper/Bag', value: 'Above 10 Plastic Wrapper/Bag' },
  { label: 'Above 25 Plastic Wrapper/Bag', value: 'Above 25 Plastic Wrapper/Bag' },
  { label: 'Above 50 Plastic Wrapper/Bag', value: 'Above 50 Plastic Wrapper/Bag' },
  { label: 'Above 100 Plastic Wrapper/Bag', value: 'Above 100 Plastic Wrapper/Bag' },
];

const glass_bottles_data = [
  { label: 'None', value: '0' },
  { label: 'Above 5 Bottles', value: 'Above 5 Bottles' },
  { label: 'Above 10 Bottles', value: 'Above 10 Bottles' },
  { label: 'Above 20 Bottles', value: 'Above 20 Bottles' },
  { label: 'Above 30 Bottles', value: 'Above 30 Bottles' },
  { label: 'Above 50 Bottles', value: 'Above 50 Bottles' },
];

const metal_cans_data = [
  { label: 'None', value: '0' },
  { label: 'Above 5 cans', value: 'Above 5 cans' },
  { label: 'Above 10 cans', value: 'Above 10 cans' },
  { label: 'Above 20 cans', value: 'Above 20 cans' },
  { label: 'Above 30 cans', value: 'Above 30 cans' },
];

const paper_box_data = [
  { label: 'None', value: '0' },
  { label: 'Above 2 Kilogram', value: 'Above 2 Kilogram' },
  { label: 'Above 5 Kilogram', value: 'Above 5 Kilogram' },
  { label: 'Above 10 Kilogram', value: 'Above 10 Kilogram' },
  { label: 'Above 15 Kilogram', value: 'Above 15 Kilogram' },
];

const other_thermocol_plastic_waste_data = [
  { label: 'None', value: '0' },
  { label: 'Less', value: 'Less' },
  { label: 'Medium', value: 'Medium' },
  { label: 'More', value: 'More' },
];


const NewPickupScreen = ({ navigation }) => {
  //console.log('NewPickupScrren')
  const [pickupsuccess, setPickupsuccess] = useState(0);
  const { newpickup, loading } = useContext(AuthContext);

  const [plasticbottles, setPlasticbottles] = useState();
  const [plasticwrapper, setPlasticwrapper] = useState();
  const [glassbottles, setGlassbottles] = useState();
  const [metalcans, setMetalcans] = useState();
  const [paperbox, setPaperbox] = useState();
  const [otherthermocolplasticwaste, setOtherthermocolplasticwaste] = useState();

  const [address, setAddress] = useState();
  const [ziporpin, setZiporpin] = useState();
  const [phone, setPhone] = useState();

  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries`,
      headers: {
        'X-CSCAPI-KEY': 'Vjh4dFlRR0I4d3lCMUxzZlcxWWUxM1A3aVBaMmp2UmFVREg4MGh3Wg==',
      },
    };

    axios(config)
      .then(response => {
        var count = Object.keys(response.data).length;
        let countryArray = [];
        for (var i = 0; i < count; i++) {
          countryArray.push({
            value: response.data[i].iso2,
            label: response.data[i].name,
          });
        }
        setCountryData(countryArray);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleState = countryCode => {
    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      headers: {
        'X-CSCAPI-KEY': 'Vjh4dFlRR0I4d3lCMUxzZlcxWWUxM1A3aVBaMmp2UmFVREg4MGh3Wg==',
      },
    };

    axios(config)
      .then(function (response) {
        var count = Object.keys(response.data).length;
        let stateArray = [];
        for (var i = 0; i < count; i++) {
          stateArray.push({
            value: response.data[i].iso2,
            label: response.data[i].name,
          });
        }
        setStateData(stateArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCity = (countryCode, stateCode) => {
    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      headers: {
        'X-CSCAPI-KEY': 'Vjh4dFlRR0I4d3lCMUxzZlcxWWUxM1A3aVBaMmp2UmFVREg4MGh3Wg==',
      },
    };

    axios(config)
      .then(function (response) {
        var count = Object.keys(response.data).length;
        let cityArray = [];
        for (var i = 0; i < count; i++) {
          cityArray.push({
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setCityData(cityArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  AsyncStorage.getItem('pickupsuccess').then((value) => {
    if (value == 0) {
      setPickupsuccess(0)
    } else {
      setPickupsuccess(1)
    }
  });

  if (pickupsuccess == 0) {
    return (
      <ScrollView>
        <Spinner visible={loading} />
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 15 }}>

            <Text style={{ fontSize: 14, fontWeight: 400, marginVertical: 8, fontFamily: 'Kufam-SemiBoldItalic', fontWeight: 'bold', marginBottom: 12, marginTop: 12 }}>
              Please select all types of dry waste to be picked up.
            </Text>

            <Text style={{ fontSize: 14, fontWeight: 400, marginVertical: 8 }}>
              Plastic Bottles
            </Text>

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              //inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={plastic_bottles_data}
              //search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'None' : '...'}
              //searchPlaceholder="Search..."
              value={plasticbottles}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setPlasticbottles(item.value);
                setIsFocus(false);
              }}
            />



            <Text style={{ fontSize: 14, fontWeight: 400, marginVertical: 8 }}>
              Plastic Wrapper/Any Single-use Plastic Bag
            </Text>

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              //inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={plastic_wrapper_data}
              //search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'None' : '...'}
              //searchPlaceholder="Search..."
              value={plasticwrapper}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setPlasticwrapper(item.value);
                setIsFocus(false);
              }}
            />


            <Text style={{ fontSize: 14, fontWeight: 400, marginVertical: 8 }}>
              Glass Bottles/Any Glass waste
            </Text>

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              //inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={glass_bottles_data}
              //search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'None' : '...'}
              //searchPlaceholder="Search..."
              value={glassbottles}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setGlassbottles(item.value);
                setIsFocus(false);
              }}
            />

            <Text style={{ fontSize: 14, fontWeight: 400, marginVertical: 8 }}>
              Metal Cans/Any Other Metal Waste
            </Text>

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              //inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={metal_cans_data}
              //search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'None' : '...'}
              //searchPlaceholder="Search..."
              value={metalcans}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setMetalcans(item.value);
                setIsFocus(false);
              }}
            />

            <Text style={{ fontSize: 14, fontWeight: 400, marginVertical: 8 }}>
              Paper Box/Any paper waste
            </Text>

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              //inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={paper_box_data}
              //search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'None' : '...'}
              //searchPlaceholder="Search..."
              value={paperbox}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setPaperbox(item.value);
                setIsFocus(false);
              }}
            />

            <Text style={{ fontSize: 14, fontWeight: 400, marginVertical: 8 }}>
              Others - Any Dry Thermocol/Plastic Waste
            </Text>

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              //inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={other_thermocol_plastic_waste_data}
              //search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'None' : '...'}
              //searchPlaceholder="Search..."
              value={otherthermocolplasticwaste}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setOtherthermocolplasticwaste(item.value);
                setIsFocus(false);
              }}
            />

            <Text style={{ fontSize: 14, fontWeight: 400, marginVertical: 8, fontWeight: 'bold', marginBottom: 12, marginTop: 12 }}>
              Please enter the pickup address correctly.
            </Text>

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={countryData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select country' : '...'}
              searchPlaceholder="Search..."
              value={country}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setCountry(item.value);
                handleState(item.value);
                setCountryName(item.label);
                setIsFocus(false);
              }}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={stateData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select state' : '...'}
              searchPlaceholder="Search..."
              value={state}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setState(item.value);
                handleCity(country, item.value);
                setStateName(item.label);
                setIsFocus(false);
              }}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={cityData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select city' : '...'}
              searchPlaceholder="Search..."
              value={city}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setCity(item.value);
                setCityName(item.label);
                setIsFocus(false);
              }}
            />
            <TextInput
              style={styles.input}
              value={address}
              placeholder="Enter address"
              placeholderTextColor="black"
              maxLength={100}
              onChangeText={text => setAddress(text)}
            />

            <TextInput
              style={styles.input}
              value={ziporpin}
              placeholder="Enter zip/pin"
              placeholderTextColor="black"
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={text => setZiporpin(text)}
            />

            <Text style={{ fontSize: 14, fontWeight: 400, marginVertical: 8, fontWeight: 'bold', marginBottom: 12, marginTop: 12 }}>
              Please enter the contact information correctly.
            </Text>

            <TextInput
              style={styles.input}
              value={phone}
              placeholder="Enter 10 digit phone number"
              placeholderTextColor="black"
              keyboardType="phone-pad"
              maxLength={10}
              onChangeText={text => setPhone(text)}
            />

            <FormButton
              buttonTitle="Submit"
              onPress={() => newpickup(plasticbottles, plasticwrapper, glassbottles, metalcans, paperbox, otherthermocolplasticwaste, countryName, stateName, cityName, address, ziporpin, phone)}
            />

          </View>
        </View>
      </ScrollView>
    );
  }
  else {
    return (
      <ScrollView>
        <Spinner visible={loading} />
        <Text style={styles.text}>To view the submitted pickup request, 'Go Back' to the Home screen and check 'Pickup History'.</Text>
      </ScrollView>
    );
  };
}

export default NewPickupScreen;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 18,
    color: '#051d5f',
    marginTop: 20,
    marginLeft: 10,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 45,
  },
  container: {
    flex: 1,
    backgroundColor: '#051d5f',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dropdown: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});