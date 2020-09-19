import React from 'react';
import {
  StyleSheet,
  View,
  Text, Button
} from 'react-native';
import PlayerComponent from './src/Components/Player/PlayerComponent';


const App = () => {
  return (
    <View style={styles.container}>
 <PlayerComponent/>
    </View>
  
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})

export default App;
