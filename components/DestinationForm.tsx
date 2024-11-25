import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface DestinationFormProps {
  onSubmit: (name: string, description: string, difficulty: string) => void;
  initialValues?: { name: string; description: string; difficulty: string };
}

const DestinationForm: React.FC<DestinationFormProps> = ({ onSubmit, initialValues }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [difficulty, setDifficulty] = useState(initialValues?.difficulty || '');

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setDescription(initialValues.description);
      setDifficulty(initialValues.difficulty);
    }
  }, [initialValues]);

  const isFormValid = () => {
    return name.trim() !== '' && description.trim() !== '';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del destino:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del destino"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Descripción breve:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción breve"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Dificultad:</Text>
      <Picker
        selectedValue={difficulty}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="easy" value="easy" />
        <Picker.Item label="medium" value="medium" />
        <Picker.Item label="hard" value="hard" />
      </Picker>
      <Button
        title="Guardar"
        onPress={() => onSubmit(name, description, difficulty)}
        disabled={!isFormValid()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginVertical: 10,
    },
    picker: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      height: 250,
      width: '100%',
      marginVertical: 0,
      backgroundColor: '#fff',
    },
    pickerItem: {
      color: '#000',
    },
  });

export default DestinationForm;