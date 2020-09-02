import React from 'react';
import styled from 'styled-components';

import Activity from 'dashboard-page/components/Activity';
import doctorImage from 'images/doctor.jpg';

const RecentActivityWrapper = styled.div.attrs({ className: 'appointments-wrapper' })`
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
`;

const CardTitle = styled.div.attrs({ className: 'card-title' })`
  border-bottom: 1px solid #f0f0f0;
  padding: 10px;
  font-weight: 400;
  font-size: 15px;
`;

const CardContent = styled.div.attrs({ className: 'card-content' })`
  padding: 10px 25px;
  font-size: 12px;
  font-weight: 100;
`;

const ACTIVITIES = [
  {
    activityImage: doctorImage,
    userName: 'Dr Kowalski',
    activityDate: '03 May, 2020',
    activityContent:
      'Dr Ramadi Kowalski added two new conditions to your health record on the 09 May regarding your symptoms',
  },
  {
    activityImage: doctorImage,
    userName: 'Medicare',
    activityDate: '24 Apr, 2020',
    activityContent: 'Medicare has sent a benefit of $132.44 for item 3566',
  },
  {
    activityImage: doctorImage,
    userName: 'Dr Kalish',
    activityDate: '17 Apr, 2020',
    activityContent: 'Dr Kalish has updated the prescription of Alufosin from 8mg to 10mg',
    quote:
      'Note: "This increase should help manage some of the pain as well as the inflammation. Be sure to take with food and try and avoid direct sun exposure if possible."',
  },
];

const RecentActivity = () => (
  <RecentActivityWrapper>
    <CardTitle>Recent Activity</CardTitle>
    <CardContent>
      {ACTIVITIES.map(activity => (
        <Activity
          activityImage={activity.activityImage}
          userName={activity.userName}
          activityDate={activity.activityDate}
          activityContent={activity.activityContent}
          quote={activity.quote}
        />
      ))}
    </CardContent>
  </RecentActivityWrapper>
);

export default RecentActivity;
