import React, { useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../navigation/AuthProvider';


const ViewPickupScreen = ({ navigation }) => {
  //console.log('ViewPickupScreen)
  const { user } = useContext(AuthContext);
  const pickuparray = user.pickupdata;
  return (
    <SafeAreaView>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Last 5 Pickup Requests</Text>
        {pickuparray.map((pickuparray) => {
          return (
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity key={pickuparray.PICKUP_REQUEST_NO} onPress={() => { navigation.navigate('PickupDetails', { pickuparray }) }} style={styles.row}>
                  <Text style={styles.rowLabel}>{"Request No: " + pickuparray.PICKUP_REQUEST_NO + ", Submitted on: " + pickuparray.ADD_TS.substring(0, 10)}</Text>
                  <View style={styles.rowSpacer} />
                  <Icon
                    color="#4018f3"
                    name="angle-right"
                    size={35} />
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </View>
    </SafeAreaView>
  );
};

export default ViewPickupScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 16,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#2e12ac',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
});