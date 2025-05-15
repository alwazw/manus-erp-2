import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';

export default function Sales() {
  return (
    <Box className="page-container">
      <Typography variant="h4" className="page-title">
        Sales
      </Typography>
      
      <Card className="dashboard-card">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Sales Module
          </Typography>
          <Typography variant="body1">
            This module is under development. Please check the Products module for a working example of Grafana integration.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
