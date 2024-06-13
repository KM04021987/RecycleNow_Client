import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const PickupDetailsScreen = (route, navigation) => {
  //console.log('PickupDetailsScreen')

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.line1}>
            {
              "Request No: " + route.route.params.pickuparray.PICKUP_REQUEST_NO + "\n"
            }
          </Text>
          <Text style={styles.line2}>
            {
              "Submitted on: " + route.route.params.pickuparray.ADD_TS.substring(0, 10) + "\n" +
              "Submitted at: " + route.route.params.pickuparray.ADD_TS.substring(11, 19) + "\n"
            }
          </Text>
          <Text style={styles.line2}>
            {
              "Plastic bottles:  " + route.route.params.pickuparray.PLASTIC_BOTTLE + "\n" +
              "Plastic wrapper:  " + route.route.params.pickuparray.PLASTIC_WRAPPER + "\n" +
              "Glass bottle:  " + route.route.params.pickuparray.GLASS_BOTTLE + "\n" +
              "Metal cans:  " + route.route.params.pickuparray.METAL_CANS + "\n" +
              "Paper wastes:  " + route.route.params.pickuparray.PAPER_WASTE + "\n" +
              "Other wastes:  " + route.route.params.pickuparray.OTHER_WASTE + "\n"
            }
          </Text>
          <Text style={styles.line2}>
            {
              "Pickup location:  " + "\n" +
              route.route.params.pickuparray.DONOR_ADDRESS + "\n" +
              route.route.params.pickuparray.DONOR_CITY + ", " + route.route.params.pickuparray.DONOR_STATE + ", " + route.route.params.pickuparray.DONOR_COUNTRY + "\n" +
              route.route.params.pickuparray.DONOR_PIN_OR_ZIP + "\n"
            }
          </Text>
          <Text style={styles.line2}>
            {
              "Contact number:  " + route.route.params.pickuparray.DONOR_PHONE_NO + "\n"
            }
          </Text>

          <TouchableOpacity onPress={() => { navigation.navigate('EditProfile') }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Pickup Details</Text>
              <Icon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('EditProfile') }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Delete Pickup Details</Text>
              <Icon color="#fff" name="trash" size={16} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PickupDetailsScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderRadius: 18,
  },

  line1: {
    marginTop: 5,
    marginLeft: 10,
    fontWeight: '900',
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 16,
    color: '#082880',
  },

  line2: {
    marginTop: 2,
    marginLeft: 10,
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 16,
    color: '#082880',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4d5ac7',
    borderRadius: 8,
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});