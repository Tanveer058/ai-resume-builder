import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    backgroundColor: '#ffffff',
    fontSize: 10,
    color: '#333',
  },
  header: {
    marginBottom: 20,
    backgroundColor: '#afc99f',
    padding: 12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#1976d2',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    objectFit: 'cover',
    marginBottom: 8,
    alignSelf: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  title: {
    fontSize: 11,
    color: '#333',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  contactLine: {
    fontSize: 9,
    color: '#444',
    marginBottom: 2,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9cb58d',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subLabel: {
    fontSize: 10,
    marginBottom: 2,
    color: '#555',
  },
  bullet: {
    fontSize: 9,
    marginLeft: 10,
    marginBottom: 2,
  },
});

const TemplateThree = ({ formData, summary }) => {
  const experience = Array.isArray(formData.experience)
    ? formData.experience
    : formData.experience
    ? [{ position: '', company: '', location: '', dates: '', responsibilities: [formData.experience] }]
    : [];

  const education = Array.isArray(formData.education)
    ? formData.education
    : formData.education
    ? [{ degree: formData.education, institution: '', location: '', dates: '' }]
    : [];

  return (
    <Page style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
         {/* {formData.image && (
          <Image
            src={formData.image}
            style={styles.profileImage}
          />
        )} */}
        <Text style={styles.name}>{formData.name}</Text>
        {formData.role && <Text style={styles.title}>{formData.role}</Text>}
        {formData.email && <Text style={styles.contactLine}>{formData.email}</Text>}
        {formData.phone && <Text style={styles.contactLine}>{formData.phone}</Text>}
        {formData.address && <Text style={styles.contactLine}>{formData.address}</Text>}
      </View>


      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.heading}>Profile</Text>
        <Text style={styles.subLabel}>{summary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.heading}>Career Experience</Text>
        {experience.length === 0 && <Text style={styles.subLabel}>No experience provided.</Text>}
        {experience.map((exp, i) => (
          <View key={i} style={{ marginBottom: 10 }}>
            <Text style={styles.label}>{exp.position} {exp.company && `— ${exp.company}`}</Text>
            {(exp.location || exp.dates) && (
              <Text style={styles.subLabel}>
                {exp.location}{exp.location && exp.dates ? ' | ' : ''}{exp.dates}
              </Text>
            )}
            {Array.isArray(exp.responsibilities)
              ? exp.responsibilities.map((item, j) => (
                  <Text key={j} style={styles.bullet}>• {item}</Text>
                ))
              : exp.responsibilities && <Text style={styles.bullet}>• {exp.responsibilities}</Text>}
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.heading}>Education</Text>
        {education.length === 0 && <Text style={styles.subLabel}>No education provided.</Text>}
        {education.map((edu, i) => (
          <View key={i}>
            <Text style={styles.label}>{edu.degree}</Text>
            {(edu.institution || edu.location) && (
              <Text style={styles.subLabel}>
                {edu.institution}{edu.institution && edu.location ? ', ' : ''}{edu.location}
              </Text>
            )}
            {edu.dates && <Text style={styles.subLabel}>{edu.dates}</Text>}
          </View>
        ))}
      </View>
    </Page>
  );
};

export default TemplateThree;
