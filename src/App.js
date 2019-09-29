import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import Chart from './components/Chart/LineChart'
import { getHoursMinutesSeconds, replaceDotWithComma } from './util/functions'

const App: () => React$Node = () => {
  let initialBalance = 1000
  const [balance, setBalance] = useState(initialBalance)
  const [balanceHistory, setBalanceHistory] = useState([initialBalance])
  const [orders, setOrder] = useState(0)
  const [ordersHistory, setOrdersHistory] = useState([0])
  const [timeLabels, setTimelabels] = useState([getHoursMinutesSeconds()])

  const buy = (amount) => {
    if ((balance - amount) < 0) return;

    let balanceValue = balance - amount
    let orderValue = orders + amount
    setBalance(balanceValue)
    setOrder(orderValue)
    limitChart(balanceHistory, timeLabels)
    limitChart(ordersHistory, timeLabels)
    setTimelabels(timeLabels => [...timeLabels, getHoursMinutesSeconds()])

    setBalanceHistory(balanceHistory => [...balanceHistory, balanceValue])
    setOrdersHistory(ordersHistory => [...ordersHistory, orderValue])
  }
  const sell = (amount) => {
    if ((orders - amount) <= 0) return;
    let orderValue = orders - amount
    let balanceValue = balance + amount
    setOrder(orderValue)
    setBalance(balance + amount)
    limitChart(ordersHistory, timeLabels)
    limitChart(balanceHistory, timeLabels)
    setTimelabels(timeLabels => [...timeLabels, getHoursMinutesSeconds()])

    setOrdersHistory(ordersHistory => [...ordersHistory, orderValue])
    setBalanceHistory(balanceHistory => [...balanceHistory, balanceValue])

  }

  const limitChart = (chartData, timeData, limit = 5) => {
    // Condicional que limita o maximo de valores no gráfico.
    // (limit - 1) serve para deixar o @arg limit mais intuitivo
    if (chartData.length > (limit - 1)) chartData.shift()
    if (timeData.length > (limit - 1)) timeLabels.shift()
  }

  // Valores para o Gráfico do portfólio
  const balanceData = {
    labels: timeLabels,
    datasets: [{
      data: balanceHistory,
    }]
  }

  const orderData = {
    labels: timeLabels,
    datasets: [{
      data: ordersHistory
    }]
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <ScrollView>
          <Text>Gráfico de Portfólio parado</Text>
          <Chart data={balanceData} />

          <Button title={'Abrir Ordem de Compra'} onPress={() => { buy(Math.random() * 100) }} />
          <Text>Portfólio: R${replaceDotWithComma(balance)} |
            Em ordens: R${replaceDotWithComma(orders)}</Text>
          <Button title={'Fechar Ordem de Compra'} color="maroon" onPress={() => { sell(Math.random() * 10) }} />

          <Text>Gráfico de Portfólio investido</Text>

          <Chart
            data={orderData}
            backgroundColor={'#800000'}
            backgroundGradientFrom={'#800000'}
            backgroundGradientTo={'#ffa726'} />

        </ScrollView>
      </SafeAreaView>
    </>
  );
};


export default App;
