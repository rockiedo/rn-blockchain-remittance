import { useTodayQuote } from '@/hooks/useTodayQuote';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { quote, isLoading, error, loadQuote } = useTodayQuote();

  useEffect(() => {
    loadQuote()
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Button on top */}
      <Button
        title="Press Me"
        onPress={() => loadQuote()}
      />

      {/* Text under it */}
      <Text style={styles.text}>{quote?.q}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,      // move content down from top
    alignItems: 'center' // center horizontally
  },
  text: {
    marginTop: 20,
    fontSize: 20
  }
});