import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get("window").width;

const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 3,
        height: 3,
        marginHorizontal: 3,
        backgroundColor
      }}
    />
  );
}

const Skip = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10 }}
    {...props}
  >
    <Text style={{ fontSize: 16, color: 'blue' }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10 }}
    {...props}
  >
    <Text style={{ fontSize: 16, color: 'blue' }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10 }}
    {...props}
  >
    <Text style={{ fontSize: 16, color: 'green' }}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  //console.log('OnboardingScreen')
  AsyncStorage.setItem('registersuccess', JSON.stringify(0))
  AsyncStorage.setItem('pickupsuccess', JSON.stringify(0))
  AsyncStorage.setItem('pickupupdatesuccess', JSON.stringify(0))
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/welcome.webp')} style={{ width: width, height: 300 }} />,
          title: 'Welcome',
          subtitle: "Let's have a smart recycling process so that dry-wastes get recycled before going to landfill. It is a free service and our intention is not to make any kind of monetory transactions.",
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/landfill.jpg')} style={{ width: width, height: 300 }} />,
          title: 'Landfill',
          subtitle: 'The size of landfill is getting increased day by day because wet-wastes and dry-wastes both are dumped together to the landfill. This is why very less amount of dry-wastes are recycled from here.',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../assets/segregate.webp')} style={{ width: width, height: 300 }} />,
          title: 'Segregate',
          subtitle: "We can segregate wet-wastes and dry-wastes. We can store the dry-waste for a month at our home/office and we can deliver it directly to the recycling industry.",
        },
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/donor.jpeg')} style={{ width: width, height: 300 }} />,
          title: 'Donor',
          subtitle: "Any individual can store dry-wastes for a month at our home/office and can book a request using this app to be picked all the dry-wastes from our home/office.",
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/receiver.jpg')} style={{ width: width, height: 300 }} />,
          title: 'Receiver',
          subtitle: "Person who are working with recycling industry can login in this app to view the requests by the Donors and can come to Donor's home/office to collect all the dry-wastes.",
        },
        {
          backgroundColor: '#e9bcbe',
          title: 'Things which can be recycled?',
          subtitle: "Please check next few pages to have an idea...",
        },
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/PlasticBottles.webp')} style={{ width: width, height: 300 }} />,
          title: 'Single use Plastic Bottles',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/PlasticWrappers.jpg')} style={{ width: width, height: 300 }} />,
          title: 'Plastic Wrappers',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../assets/PlasticBags.jpg')} style={{ width: width, height: 300 }} />,
          title: 'Single use Plastic Bags',
        },
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/GlassBottles.jpg')} style={{ width: width, height: 300 }} />,
          title: 'Glass Bottles',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/MetalCans.jpg')} style={{ width: width, height: 300 }} />,
          title: 'Metal Cans',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../assets/Paper.jpg')} style={{ width: width, height: 300 }} />,
          title: 'Paper',
        }, {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/PaperBox.jpg')} style={{ width: width, height: 300 }} />,
          title: 'Paper Box',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/Thermocol.png')} style={{ width: width, height: 300 }} />,
          title: 'Dry Cleanned Thermocol',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../assets/ElectronicWaste.jpg')} style={{ width: width, height: 300 }} />,
          title: 'Electronic Wastes',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/Others.jpg')} style={{ width: width, height: 300 }} />,
          title: 'Other dry-wastes',
        },
        {
          backgroundColor: '#e9bcbe',
          title: 'How to use this App?',
          subtitle: "It is simple. Please check the next 3 pages. You will have an idea...",
        }, {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/segregate.webp')} style={{ width: width, height: 300 }} />,
          title: "1. Segregate dry-wastes and wet-wastes (Donor's Responsibility)",
          subtitle: "The primary and most important part of this process is segregation of home wastes. Donors should collect all the dry-wastes(Plastic, Paper, Thermocol, Metal etc) for few weeks. Any kind of wet-wastes(Kitchen wastes, Diaper etc) shoud not be mixed with these dry wastes."
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/donor.jpeg')} style={{ width: width, height: 300 }} />,
          title: "2. Raise a pickup request(Donor's Responsibility):",
          subtitle: "Once Donor stores a large amount of dry-wastes, donor should raise a pickup request with correct address and phone number. Donors can also search and contact nearest Receivers."
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../assets/receiver.jpg')} style={{ width: width, height: 300 }} />,
          title: "3. Collect dry-wastes from Donor's address(Receiver's Responsibility):",
          subtitle: "Receiver need to search pickup requests in nearest location. If receivers are interested, they can contact to donors and collect the dry-wastes from donor's address."
        },
        {
          backgroundColor: '#a6e4d0',
          title: "Get started!",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});