'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, CircularProgress, Paper, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [grafanaUrl, setGrafanaUrl] = useState('');
  
  useEffect(() => {
    // In a real environment, this would be set from environment variables
    // For local development, we're using the docker-compose service name
    const grafanaBaseUrl = '/grafana';
    
    // Construct the URL for the embedded dashboard
    // Using anonymous access with the dashboard UID from our provisioned dashboard
    const dashboardUrl = `${grafanaBaseUrl}/d/erp-products/erp-products-dashboard?orgId=1&kiosk=tv`;
    
    setGrafanaUrl(dashboardUrl);
    setLoading(false);
  }, []);

  return (
    <Box className="page-container">
      <Typography variant="h4" className="page-title">
        Products
      </Typography>
      
      <Card className="dashboard-card" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Product Management
          </Typography>
          <Typography variant="body1">
            View and manage your product catalog with detailed information including category, brand, specifications, and more.
          </Typography>
        </CardContent>
      </Card>
      
      <Paper className="grafana-container">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <iframe 
            src={grafanaUrl}
            className="grafana-embed"
            title="Products Dashboard"
            allowTransparency={true}
          />
        )}
      </Paper>
    </Box>
  );
}
