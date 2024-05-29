import React, { useContext } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome';


const ProfileScreen = ({ navigation }) => {
  //console.log('ProfileScreen')
  const { logout, loading } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  return (
    <ScrollView>
      <Spinner visible={loading} />
      <View style={{backgroundColor: '#ffffff', height: 55}}>
        <Text style={styles.text}> Hello, {user.user.FULLNAME}</Text>
        <Text style={styles.text}> {user.user.FULLNAME}</Text>
      </View>
          
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.profileName}>Account Number:{"\t"}{user.user.ACCOUNT}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditProfile')
            }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>
              <Icon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              logout()
            }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 18,
    color: '#051d5f',
    marginTop: 20,
    marginLeft: 10,
  },

  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderRadius: 18,
  },
  /** Profile */
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#e3e3e3',
    borderRadius: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileName: {
    marginTop: 2,
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 18,
    color: '#051d5f',
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