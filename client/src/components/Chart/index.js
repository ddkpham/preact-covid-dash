import React from "react";
import { h, Component } from "preact";
import { Line as LineChart } from "react-chartjs-2";
import { options, styles, startingData } from "./data";
import NoDataCard from "./NoDataCard";

class LineChartExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: startingData,
      country: this.props.country,
    };
  }

  async componentDidMount() {
    this.updateContryDataSets();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.country === this.state.country &&
      prevProps.country === this.props.country
    ) {
      return;
    }
    this.updateContryDataSets();
  }

  updateContryDataSets = async () => {
    const { country } = this.props;
    const url = `http://localhost:3000/api/stats/${country}`;
    const response = await fetch(url);
    const data = await response.json();
    const newData = this.generateDataSets(data.data);
    this.setState({ data: newData });
  };

  generateDataSets(data) {
    const {
      data: { datasets },
    } = this.state;
    const activeCasesData = data.map((record) => {
      return record.active;
    });
    const confirmedCasesData = data.map((record) => {
      return record.confirmed;
    });

    const deathsData = data.map((record) => {
      return record.deaths;
    });
    const recoveredCasesData = data.map((record) => {
      return record.recovered;
    });

    const newLabels = data.map((record) => {
      const strippedDate = record.date.split("T")[0];
      return strippedDate;
    });

    const newDataSets = datasets.map((dataset, index) => {
      const newDataSet = { ...dataset };
      switch (index) {
        case 0:
          newDataSet.data = activeCasesData;
          break;
        case 1:
          newDataSet.data = confirmedCasesData;
          break;
        case 2:
          newDataSet.data = deathsData;
          break;
        case 3:
          newDataSet.data = recoveredCasesData;
          break;
        default:
          break;
      }
      return newDataSet;
    });

    const newData = {};
    newData.labels = newLabels;
    newData.datasets = newDataSets;
    return newData;
  }

  render({}, { data }) {
    const containsChartData = data.labels.length >= 1;
    return (
      <div style={styles.graphContainer}>
        {containsChartData ? (
          <LineChart
            type="line"
            data={data}
            options={options}
            width="600"
            height="250"
            country="canada"
          />
        ) : (
          <NoDataCard />
        )}
      </div>
    );
  }
}

export default LineChartExample;
