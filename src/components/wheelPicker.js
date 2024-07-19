import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const WheelPicker = () => {
  const [selectedValue, setSelectedValue] = useState('6');

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="6" value="6" />
        <Picker.Item label="하루 7" value="7" />
        <Picker.Item label="일주일에 8번" value="8" />
        <Picker.Item label="한 달 9" value="9" />
        <Picker.Item label="1년 10" value="10" />
      </Picker>
      <Text style={styles.selectedText}>선택된 값: {selectedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18
  }
});

export default WheelPicker;