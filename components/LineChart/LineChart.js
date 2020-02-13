import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Colors from '../../constants/colors';
import FlashMessage, { showMessage } from "react-native-flash-message";

export default class CryptoChart extends Component {
    render() {
        return (
            <View>
                <LineChart
                    data={{
                        labels: this.props.labels,
                        datasets: this.props.series
                    }}
                    onDataPointClick={({ value, getColor }) =>
                    showMessage({
                            message: `price: $${Number(value) < 10 ? value.toFixed(4) : value.toFixed(2)}`,
                            description: `date: ${(this.props.tpSeries.find((d)=> d['price'] === value))['date']}`,
                            backgroundColor: getColor(0.9),
                            
                        })
                    }
                    verticalLabelRotation={this.props.verticalRotation} //30 -30
                    horizontalLabelRotation={this.props.horizontalRotation}
                    width={Dimensions.get("window").width} // from react-native
                    height={this.props.chartHeight}
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
                            r: "3",
                            strokeWidth: "2",
                            stroke: "rgba(0, 255, 70, 1)"
                        },
                        propsForBackgroundLines: {
                            strokeWidth: 0
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
                <FlashMessage 
                position= 'center'
                duration={1000} 
                style={{width:'65%', height: 30, borderRadius: 5}}
        
                />
            </View>
        );
    }
}
