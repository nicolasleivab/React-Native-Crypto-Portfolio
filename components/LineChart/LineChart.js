import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Colors from '../../constants/colors';

export default class CryptoChart extends Component {
    render() {
        return (
            <View>
                <LineChart
                    data={{
                        labels: this.props.labels,
                        datasets: this.props.series
                    }}
                    verticalLabelRotation={45}
                    horizontalLabelRotation={-30}
                    width={Dimensions.get("window").width} // from react-native
                    height={250}
                    yAxisLabel="$"
                    yAxisSuffix=""
                    chartConfig={{
                        backgroundColor: Colors.primary,
                        backgroundGradientFrom: Colors.primary,
                        backgroundGradientTo: Colors.secondary,
                        propsForBackgroundLines: {
                            strokeWidth: 1
                        },
                        decimalPlaces: this.props.decimalPlaces, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(0, 255, 70, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "0",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </View>
        );
    }
}
