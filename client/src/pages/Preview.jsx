import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ResumePDF from '../components/ResumePDF';

function Preview() {
  const { formData, summary, template } = useLocation().state;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        Resume Preview - {template}
      </Typography>

      {/*Live PDF Preview */}
      <Box sx={{ border: '1px solid #ccc', height: '700px', mb: 4 }}>
        <PDFViewer width="100%" height="100%">
          <ResumePDF formData={formData} summary={summary} template={template} />
        </PDFViewer>
      </Box>

      {/* Download Button */}
      <PDFDownloadLink
        document={<ResumePDF formData={formData} summary={summary} template={template} />}
        fileName="resume.pdf"
        style={{ textDecoration: 'none' }}
      >
        {({ loading }) =>
          loading ? (
            <Button variant="contained" disabled>
              Preparing PDF...
            </Button>
          ) : (
            <Button variant="contained" color="primary">
              Download PDF
            </Button>
          )
        }
      </PDFDownloadLink>
    </Box>
  );
}

export default Preview;
