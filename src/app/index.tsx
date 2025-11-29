import { useXsgdToVndQuote } from '@/hooks/useXsgdToVnd';
import { Button, Card, Divider, Input, Layout, Text } from '@ui-kitten/components';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const [xsgdAmount, setXsgdAmount] = useState('');
  const { state, loadQuote } = useXsgdToVndQuote();

  return (
    <Layout style={styles.container}>
      {/* Title */}
      <Text category="h3" style={styles.title}>Blockchain Remittance</Text>

      {/* Description */}
      <Text category="s1" appearance="hint" style={styles.description}>
        Off-ramp XSGD to VND
      </Text>

      {/* Section 1 - Conversion Card */}
      <Card style={styles.card}>
        <View style={styles.row}>
          <Text category="s1" style={styles.label}>XSGD amount</Text>
          <Input
            style={styles.input}
            value={xsgdAmount}
            onChangeText={setXsgdAmount}
            placeholder="0.00"
            keyboardType="numeric"
            textAlign="right"
          />
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text category="s1" style={styles.label}>USDT amount</Text>
          <Text category="s1" style={styles.textField}>{state.usdtAmount.toLocaleString() || '--'}</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text category="s1" style={styles.label}>VND amount</Text>
          <Text category="s1" style={styles.textField}>{state.vndAmount.toLocaleString() || '--'}</Text>
        </View>
      </Card>

      <Button style={styles.button} onPress={() => {
        const amountNum = parseFloat(xsgdAmount);
        if (isNaN(amountNum)) {
          return;
        }
        loadQuote(amountNum);
      }}>Calculate</Button>

      {/* Section 2 - Exchange Rates Card */}
      <Card style={styles.card}>
        <View style={styles.row}>
          <Text category="s1" style={styles.label}>XSGD to VND rate</Text>
          <Text category="s1" style={styles.rateText}>{state.xsgdToVndQuote.toLocaleString()}</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text category="s1" style={styles.label}>XSGD to USDT rate</Text>
          <Text category="s1" style={styles.rateText}>{state.xsgdToUsdtQuote.toLocaleString()}</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text category="s1" style={styles.label}>USDT to VND rate</Text>
          <Text category="s1" style={styles.rateText}>{state.usdtToVndQuote.toLocaleString()}</Text>
        </View>
      </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
  },
  quoteText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    flex: 1,
  },
  input: {
    flex: 1,
  },
  textField: {
    flex: 1,
    textAlign: 'right',
  },
  rateText: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '600',
  },
  divider: {
    marginVertical: 8,
  },
  button: {
    marginBottom: 20,
  },
});