import { Card, Divider, Input, Layout, Text } from '@ui-kitten/components';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const [xsgdAmount, setXsgdAmount] = useState('');

  // Placeholder rates - these can be replaced with actual API calls later
  const xsgdToUsdtRate = 1.0; // 1 XSGD = 1 USDT (example)
  const usdtToVndRate = 25000; // 1 USDT = 25000 VND (example)

  // Calculate USDT and VND amounts
  const usdtAmount = xsgdAmount ? (parseFloat(xsgdAmount) * xsgdToUsdtRate).toFixed(2) : '';
  const vndAmount = xsgdAmount ? (parseFloat(xsgdAmount) * xsgdToUsdtRate * usdtToVndRate).toFixed(2) : '';

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
          <Text category="s1" style={styles.textField}>{usdtAmount || '0.00'}</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text category="s1" style={styles.label}>VND amount</Text>
          <Text category="s1" style={styles.textField}>{vndAmount || '0.00'}</Text>
        </View>
      </Card>

      {/* Section 2 - Exchange Rates Card */}
      <Card style={styles.card}>
        <View style={styles.row}>
          <Text category="s1" style={styles.label}>XSGD to USDT rate</Text>
          <Text category="s1" style={styles.rateText}>{xsgdToUsdtRate}</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text category="s1" style={styles.label}>USDT to VND rate</Text>
          <Text category="s1" style={styles.rateText}>{usdtToVndRate.toLocaleString()}</Text>
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
});