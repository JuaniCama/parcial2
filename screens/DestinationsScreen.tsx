import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import DestinationItem from '../components/DestinationItem';
import { API_BASE_URL } from '../constants/Constants';
import CustomEventEmitter from '../utils/CustomEventEmitter';

const DestinationsScreen: React.FC = () => {
  interface Destination {
    id: number;
    name: string;
    difficulty: string;
    isFavorite: boolean;
  }

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDestinations();
    CustomEventEmitter.on('refresh', fetchDestinations);

    return () => {
      CustomEventEmitter.off('refresh', fetchDestinations);
    };
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      const sortedDestinations = response.data.sort((a: Destination, b: Destination) => {
        if (a.isFavorite === b.isFavorite) {
          return a.name.localeCompare(b.name);
        }
        return Number(b.isFavorite) - Number(a.isFavorite);
      });
      setDestinations(sortedDestinations);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id: number) => {
    const destination = destinations.find((d) => d.id === id);
    if (destination) {
      await axios.patch(`${API_BASE_URL}/${id}`, {
        isFavorite: !destination.isFavorite,
      });
      fetchDestinations();
    }
  };

  const deleteDestination = async (id: number) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
    fetchDestinations();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DestinationItem
            name={item.name}
            difficulty={item.difficulty}
            isFavorite={item.isFavorite}
            onToggleFavorite={() => toggleFavorite(item.id)}
            onDelete={() => deleteDestination(item.id)}
            onEdit={() => navigation.navigate('Editar Destino', { destination: item })}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
    maxWidth: Dimensions.get('window').width * 0.85,
  },
});

export default DestinationsScreen;