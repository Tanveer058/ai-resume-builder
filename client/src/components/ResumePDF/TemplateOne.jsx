import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: 'Times-Roman',
    fontSize: 11,
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#003b2f',
    color: '#ffffff',
    padding: 15,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    objectFit: 'cover',
    marginBottom: 12,
    alignSelf: 'center',
  },
  main: {
    width: '70%',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  role: {
    fontSize: 10,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'uppercase',
    color: '#003b2f',
  },
  text: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.4,
    color: '#333',
  },
  bullet: {
    fontSize: 10,
    marginBottom: 3,
    marginLeft: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },
  subLabel: {
    fontSize: 9,
    color: '#555',
  },
  sidebarLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 10,
  },
  sidebarItem: {
    fontSize: 9,
    marginBottom: 2,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    marginVertical: 8,
  },
});

function TemplateOne({ formData, summary }) {
  const experience = Array.isArray(formData.experience) ? formData.experience : [];
  const education = Array.isArray(formData.education) ? formData.education : [];
  const skills = Array.isArray(formData.skills) ? formData.skills : [];
  const references = Array.isArray(formData.references) ? formData.references : [];

  return (
    <Page style={styles.page}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {/* {formData.image && (
          <img
            src={formData.image}
            style={styles.profileImage}
            alt="Profile"
          />
        )} */}
         {formData.image && (
          <Image
            src={formData.image}
            style={styles.profileImage}
          />
        )}
        <Text style={styles.name}>{formData.name}</Text>
        <Text style={styles.role}>{formData.role}</Text>

        <View style={styles.divider} />
        <Text style={styles.sidebarLabel}>Contact</Text>
        {formData.address && <Text style={styles.sidebarItem}>{formData.address}</Text>}
        {formData.email && <Text style={styles.sidebarItem}>{formData.email}</Text>}
        {formData.phone && <Text style={styles.sidebarItem}>{formData.phone}</Text>}

        <View style={styles.divider} />
        <Text style={styles.sidebarLabel}>Skills</Text>
        {skills.map((skill, i) => (
          <Text key={i} style={styles.sidebarItem}>• {skill}</Text>
        ))}
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        <View style={styles.section}>
          <Text style={styles.heading}>Profile</Text>
          <Text style={styles.text}>{summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Employment History</Text>
          {experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Text style={styles.label}>{exp.position} — {exp.company}</Text>
              <Text style={styles.subLabel}>
                {exp.location}{exp.location && exp.dates ? ' | ' : ''}{exp.dates}
              </Text>
              {Array.isArray(exp.responsibilities) &&
                exp.responsibilities.map((r, j) => (
                  <Text key={j} style={styles.bullet}>• {r}</Text>
                ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          {education.map((edu, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text style={styles.label}>{edu.degree}</Text>
              <Text style={styles.subLabel}>
                {edu.institution}{edu.institution && edu.location ? ', ' : ''}{edu.location}
              </Text>
              {edu.dates && <Text style={styles.subLabel}>{edu.dates}</Text>}
            </View>
          ))}
        </View>

        {references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>References</Text>
            {references.map((ref, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.label}>{ref.name}</Text>
                <Text style={styles.subLabel}>
                  {ref.email ? `${ref.email} | ` : ''}{ref.phone}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  );
}

export default TemplateOne;
