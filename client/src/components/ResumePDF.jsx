import { Document } from '@react-pdf/renderer';
import TemplateOne from './ResumePDF/TemplateOne';
import TemplateTwo from './ResumePDF/TemplateTwo';
import TemplateThree from './ResumePDF/TemplateThree';

function ResumePDF({ formData, summary, template }) {
  let SelectedTemplate;

  switch (template) {
    case 'template2': SelectedTemplate = TemplateTwo; break;
    case 'template3': SelectedTemplate = TemplateThree; break;
    default: SelectedTemplate = TemplateOne;
  }

  return (
    <Document>
      <SelectedTemplate formData={formData} summary={summary} />
    </Document>
  );
}

export default ResumePDF;
