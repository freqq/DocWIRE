import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const BillPDF = ({ doctor, paymentType, paymentDate }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Doctor:</Text>
        <Text>{`${doctor.firstName} ${doctor.lastName}`}</Text>
      </View>
      <View style={styles.section}>
        <Text>Payment type: </Text>
        <Text>{paymentType}</Text>
      </View>
      <View style={styles.section}>
        <Text>Payment date: </Text>
        <Text>{paymentDate}</Text>
      </View>
    </Page>
  </Document>
);

BillPDF.propTypes = {
  doctor: PropTypes.instanceOf(Object).isRequired,
  paymentType: PropTypes.string.isRequired,
  paymentDate: PropTypes.string.isRequired,
};

export default BillPDF;
