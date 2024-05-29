import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon library
import { AuthContext } from '../navigation/AuthProvider';

const AccordionItem = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Icon name={expanded ? 'angle-up' : 'angle-down'} size={40} color="#28108f" />
      </TouchableOpacity>
      {expanded && <Text style={styles.content}>{content}</Text>}
    </View>
  );
};

const ViewPickupScreen = () => {
  const { user } = useContext(AuthContext);
  const pickuparray = user.pickupdata;
  return (
    <SafeAreaView>
      <ScrollView>
        {/* Add more sections as needed */}
        {pickuparray.map((pickuparray) => {
          return (
            <View>
              <AccordionItem
                title={"Request No: " + pickuparray.PICKUP_REQUEST_NO + ", Submitted on: " + pickuparray.ADD_TS.substring(0, 10)}
                content={pickuparray.ADD_TS + "\n" +
                  pickuparray.ADD_TS}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.sectionBody}>
          <View style={[styles.rowWrapper, styles.rowFirst]}>
            <TouchableOpacity onPress={() => {}} style={styles.row}>
              <Text style={styles.rowLabel}>Language</Text>
              <View style={styles.rowSpacer} />
              <Icon
                color="#C6C6C6"
                name="angle-right"
                size={35} />
            </TouchableOpacity>
          </View>

          <View style={styles.rowWrapper}>
            <TouchableOpacity onPress={() => {}} style={styles.row}>
              <Text style={styles.rowLabel}>Location</Text>
              <View style={styles.rowSpacer} />
              <Icon
                color="#C6C6C6"
                name="angle-right"
                size={35} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionBody}>
            <View style={styles.rowWrapper}>
              <TouchableOpacity onPress={() => {}} style={styles.row}>
                <Text style={styles.rowLabel}>Sound</Text>
                <View style={styles.rowSpacer} />
                <Icon
                  color="#3634b9"
                  name="angle-right"
                  size={35} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewPickupScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E3EDFB',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0F56B3',
    overflow: 'hidden',
    fontFamily: 'Kufam-SemiBoldItalic',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#2031ca',
    //fontWeight: 'bold',
  },
  content: {
    marginTop: 8,
    fontSize: 16,
    color: '#111111',
    padding: 20,
    //backgroundColor: '#f9f9fa',
    fontFamily: 'Kufam-SemiBoldItalic',
  },

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

  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#2e12ac',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: '500',
    color: '#8B8B8B',
    marginRight: 4,
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