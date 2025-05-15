import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';

export default function Home() {
  return (
    <Box className="page-container">
      <Typography variant="h4" className="page-title">
        Dashboard
      </Typography>
      
      <Card className="dashboard-card">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Welcome to the ERP System
          </Typography>
          <Typography variant="body1">
            This is a Grafana-centric ERP system. Navigate using the sidebar to access different modules.
          </Typography>
        </CardContent>
      </Card>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
            <Typography variant="body2">
              Manage your product catalog and inventory
            </Typography>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sales
            </Typography>
            <Typography variant="body2">
              Track sales orders and customer information
            </Typography>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Purchases
            </Typography>
            <Typography variant="body2">
              Manage purchase orders and supplier information
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
