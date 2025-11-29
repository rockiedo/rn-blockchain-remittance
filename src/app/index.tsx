import { useXsgdToVndQuote } from '@/hooks/useXsgdToVnd';
import { Button, Card, Divider, Input, Layout, Spinner, Text } from '@ui-kitten/components';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const [xsgdAmount, setXsgdAmount] = useState('');
  const { state, loadQuote } = useXsgdToVndQuote();

  const handleAmountChange = (text: string) => {
    // Allow empty string
    if (text === '') {
      setXsgdAmount('');
      return;
    }

    // Remove commas and only allow numbers and one decimal point
    const cleanedText = text.replace(/,/g, '').replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    const parts = cleanedText.split('.');
    if (parts.length > 2) {
      return;
    }

    // Limit to 3 decimal places
    if (parts.length === 2 && parts[1].length > 3) {
      return;
    }

    // Format with thousand separators
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedText = parts.length === 2 ? `${integerPart}.${parts[1]}` : integerPart;

    setXsgdAmount(formattedText);
  };

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
            onChangeText={handleAmountChange}
            placeholder="0.00"
            keyboardType="numeric"
            textAlign="right"
          />
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text category="s1" style={styles.label}>USDT amount</Text>
          <Text category="s1" style={styles.textField}>
            {state.usdtAmount > 0 ? state.usdtAmount.toLocaleString() : '--'}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text category="s1" style={styles.label}>VND amount</Text>
          <Text category="s1" style={[styles.textField, state.vndAmount > 0 && styles.highlightedPositiveText]}>
            {state.vndAmount > 0 ? state.vndAmount.toLocaleString() : '--'}
          </Text>
        </View>
      </Card>

      <Button 
        style={styles.button} 
        onPress={() => {
          const amountNum = parseFloat(xsgdAmount.replace(/,/g, ''));
          if (isNaN(amountNum)) {
            return;
          }
          loadQuote(amountNum);
        }}
        accessoryLeft={state.isLoading ? () => <Spinner size="small" status="basic" /> : undefined}
        disabled={state.isLoading}
      >
        Calculate
      </Button>

      {/* Section 2 - Exchange Rates Card */}
      <Card style={styles.card}>
        <View style={styles.row}>
          <Text category="s1" style={styles.label}>XSGD to VND rate</Text>
          <Text category="s1" style={[styles.rateText, state.xsgdToVndQuote > 0 && styles.highlightedPositiveText]}>
            {state.xsgdToVndQuote > 0 ? state.xsgdToVndQuote.toLocaleString() : '--'}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text category="s1" style={styles.label}>Bank rate</Text>
          <Text category="s1" style={[styles.rateText, state.bankQuote > 0 && styles.highlightedText]}>
            {state.bankQuote > 0 ? state.bankQuote.toLocaleString() : '--'}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text category="s1" style={styles.label}>XSGD to USDT rate</Text>
          <Text category="s1" style={styles.rateText}>
            {state.xsgdToUsdtQuote > 0 ? state.xsgdToUsdtQuote.toLocaleString() : '--'}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text category="s1" style={styles.label}>USDT to VND rate</Text>
          <Text category="s1" style={styles.rateText}>
            {state.usdtToVndQuote > 0 ? state.usdtToVndQuote.toLocaleString() : '--'}
          </Text>
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
  valueColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rateText: {
    textAlign: 'right',
    fontWeight: '600',
  },
  highlightedPositiveText: {
    color: '#16A34A',
    fontWeight: '700',
    fontSize: 16,
  },
  highlightedText: {
    color: '#D97706',
    fontWeight: '700',
    fontSize: 16,
  },
  divider: {
    marginVertical: 8,
  },
  button: {
    marginBottom: 20,
  },
  comparisonText: {
    textAlign: 'right',
    fontSize: 14,
    marginTop: 4,
  },
});