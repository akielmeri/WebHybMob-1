import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";

export default function App() {
  const [minHr, setMinHr] = useState(0);
  const [maxHr, setMaxHr] = useState(0);
  const [age, setAge] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);  // New state for validation

  const calculateHr = (age) => {
    if (age === "" || isNaN(age)) {
      setIsInvalid(true);
      return;
    }

    setIsInvalid(false);
    const ageNumber = Number(age);
    const min = Math.round((220 - ageNumber) * 0.65);
    const max = Math.round((220 - ageNumber) * 0.85);
    setMinHr(min);
    setMaxHr(max);
    setShowResults(true);
  };

  const handleAgeInput = (value) => {
    setShowResults(false);
    const numberValue = Number(value);
    if (Number.isInteger(numberValue) && numberValue >= 0 && numberValue <= 120) {
      setAge(value);
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Calculate your heart rate limits.</Text>
      <TextInput
        placeholder="Enter your age"
        inputMode="numeric"
        onChangeText={handleAgeInput}
        value={age}
        style={[styles.input, isInvalid ? styles.invalidInput : null]}
      />
      {isInvalid && <Text style={styles.errorText}>Invalid Input: numeric values between 1-120 only.</Text>}  
      
      {showResults && (
        <>
          <Text style={styles.text}>Your age: {age}</Text>
          <Text style={styles.text}>Minimum heart rate: {minHr}</Text>
          <Text style={styles.text}>Maximum heart rate: {maxHr}</Text>
        </>
      )}
      <Pressable onPress={() => calculateHr(age)} style={styles.button}>
        <Text style={styles.buttonText}>Calculate</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginTop: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 200,
  },
  invalidInput: {
    borderColor: "red",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
  },
  errorText: {  // New style for error text
    color: "red",
    marginBottom: 10,
  },
});
