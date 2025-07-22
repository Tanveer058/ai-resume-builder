import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 0,
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#000',
    backgroundColor: '#fff',
  },
  leftColumn: {
    width: '35%',
    backgroundColor: '#f2f2f2',
    padding: 20,
    paddingTop: 40,
  },
  rightColumn: {
    width: '65%',
    padding: 20,
    paddingTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    objectFit: 'cover',
    alignSelf: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000080',
    textTransform: 'uppercase',
    borderBottom: '1px solid #000080',
    paddingBottom: 2,
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  role: {
    fontSize: 12,
    marginBottom: 10,
  },
  infoText: {
    marginBottom: 3,
  },
  aboutText: {
    textAlign: 'justify',
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 6,
  },
});

function TemplateTwo({ formData, summary }) {
  return (
    <Page size="A4" style={styles.page}>
      {/* LEFT COLUMN */}
      <View style={styles.leftColumn}>
        {formData.image && (
          <Image src={formData.image} style={styles.profileImage} />
        )}
        <Text style={styles.sectionTitle}>Contact</Text>
        <Text style={styles.infoText}>{formData.phone}</Text>
        <Text style={styles.infoText}>{formData.email}</Text>
        <Text style={styles.infoText}>{formData.address}</Text>

        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.aboutText}>{summary}</Text>

        <Text style={styles.sectionTitle}>Language</Text>
        {formData.languages?.map((lang, i) => (
          <Text key={i} style={styles.infoText}>• {lang}</Text>
        ))}
      </View>

      {/* RIGHT COLUMN */}
      <View style={styles.rightColumn}>
        <Text style={styles.name}>{formData.name}</Text>
        <Text style={styles.role}>{formData.role}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {formData.experience?.map((exp, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <Text style={styles.bold}>{exp.jobTitle}</Text>
              <Text>{exp.company}</Text>
              <Text>{exp.startDate} - {exp.endDate || 'Present'}</Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {formData.education?.map((edu, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <Text style={styles.bold}>{edu.degree}</Text>
              <Text>{edu.institute}</Text>
              <Text>{edu.startDate} - {edu.endDate}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text>{formData.skills?.join(', ')}</Text>
        </View>
      </View>
    </Page>
  );
}

export default TemplateTwo;
