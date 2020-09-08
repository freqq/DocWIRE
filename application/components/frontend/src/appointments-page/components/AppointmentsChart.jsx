import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';

const AppointmentsChartWrapper = styled.div.attrs({ className: 'appointments-chart-wrapper' })`
  width: calc(100% - 20px);
  height: calc(100% - 40px);
  background: #ffffff;
  padding: 25px 10px 0 10px;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
`;

const CharTitle = styled.div.attrs({ className: 'chart-title' })`
  text-align: left;
  font-size: 14px;
  font-weight: 100;
  margin-bottom: 20px;
  padding-left: 40px;
`;

const AppointmentsChart = () => {
  return (
    <AppointmentsChartWrapper>
      <CharTitle>Customers statistics</CharTitle>
      <Bar
        data={{
          datasets: [
            {
              data: [62, 132],
              backgroundColor: ['#2d4564', '#2d456494'],
            },
          ],
          labels: ['New', 'Returning'],
        }}
        options={{
          legend: {
            display: false,
          },
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
    </AppointmentsChartWrapper>
  );
};

export default AppointmentsChart;
