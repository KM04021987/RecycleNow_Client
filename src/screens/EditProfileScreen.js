import React, { useContext } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import FormButton from '../components/FormButton';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../navigation/AuthProvider';


const EditProfileScreen = ({ navigation }) => {
  //console.log('EditProfileScrren')
  const { logout, loading } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  return (
    <ScrollView>
      <Spinner visible={loading} />
      <Text style={styles.text}> Welcome, {user.user.FULLNAME}! </Text>
      <FormButton
        buttonTitle="Logout"
        onPress={() => logout()}
      />
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 18,
    color: '#051d5f',
    marginTop: 20,
    marginLeft: 10,
  },
});