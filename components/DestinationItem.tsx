import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

interface DestinationItemProps {
  name: string;
  difficulty: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const DestinationItem: React.FC<DestinationItemProps> = ({ name, difficulty, isFavorite, onToggleFavorite, onDelete, onEdit }) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy':
        return 'green';
      case 'medium':
        return 'yellow';
      case 'hard':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const getFavoriteIcon = () => {
    if (Platform.OS === 'android') {
      return isFavorite ? '★' : '☆';
    } else if (Platform.OS === 'ios') {
      return isFavorite ? '❤️' : '🤍';
    }
    return '☆';
  };

  const getFavoriteStyle = () => {
    if (Platform.OS === 'android') {
      return isFavorite ? styles.favoriteAndroidActive : styles.favoriteAndroidInactive;
    } else if (Platform.OS === 'ios') {
      return isFavorite ? styles.favoriteIosActive : styles.favoriteIosInactive;
    }
    return styles.favoriteAndroidInactive;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onEdit}>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
      <Text style={[styles.difficulty, { backgroundColor: getDifficultyColor() }]}>{difficulty}</Text>
      <TouchableOpacity onPress={onToggleFavorite} style={getFavoriteStyle()}>
        <Text style={styles.favorite}>{getFavoriteIcon()}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
  difficulty: {
    padding: 5,
    borderRadius: 5,
    color: 'white',
  },
  favorite: {
    fontSize: 24,
  },
  favoriteAndroidActive: {
    backgroundColor: 'yellow',
  },
  favoriteAndroidInactive: {
    backgroundColor: 'transparent',
  },
  favoriteIosActive: {
    backgroundColor: 'pink',
  },
  favoriteIosInactive: {
    backgroundColor: 'transparent',
  },
  delete: {
    fontSize: 24,
    color: 'red',
  },
});

export default DestinationItem;