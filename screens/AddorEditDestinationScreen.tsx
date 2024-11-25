import React from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import DestinationForm from '../components/DestinationForm';
import { API_BASE_URL } from '../constants/Constants';
import CustomEventEmitter from '../utils/CustomEventEmitter';

const AddorEditDestinationScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { destination } = route.params || {};

  const handleSubmit = async (name: string, description: string, difficulty: string) => {
    if (destination) {
      await axios.put(`${API_BASE_URL}/${destination.id}`, {
        name,
        description,
        difficulty,
      });
    } else {
      await axios.post(`${API_BASE_URL}`, {
        name,
        description,
        difficulty,
        isFavorite: false,
      });
    }
    CustomEventEmitter.emit('refresh');
    navigation.navigate('Destinos');
  };

  return (
    <View style={styles.container}>
      <DestinationForm
        onSubmit={handleSubmit}
        initialValues={destination}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default AddorEditDestinationScreen;