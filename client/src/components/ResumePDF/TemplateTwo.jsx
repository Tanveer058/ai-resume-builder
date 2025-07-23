import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 0,
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#000',
    backgroundColor: '#fff',
    position: 'relative',
  },
 
  leftColumn: {
    width: '35%',
    backgroundColor: '#fff',
    padding: 25,
    paddingTop: 40,
    zIndex: 1,
  },
  rightColumn: {
    width: '65%',
    padding: 25,
    paddingTop: 40,
    paddingRight: 40,
    zIndex: 1,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    objectFit: 'cover',
    border: '4px solid #4A90E2',
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4A90E2',
    alignSelf: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  role: {
    fontSize: 14,
    marginBottom: 25,
    color: '#34495E',
    fontWeight: 'normal',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#34495E',
    padding: 8,
    marginBottom: 15,
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  leftSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    marginTop: 25,
    textAlign: 'center',
  },
  aboutText: {
    textAlign: 'justify',
    lineHeight: 1.6,
    fontSize: 10,
    color: '#2C3E50',
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    fontSize: 10,
  },
  contactIcon: {
    width: 15,
    height: 15,
    backgroundColor: '#34495E',
    borderRadius: 7.5,
    marginRight: 10,
  },
  contactText: {
    fontSize: 10,
    color: '#2C3E50',
    flex: 1,
  },
  languageItem: {
    fontSize: 11,
    color: '#2C3E50',
    marginBottom: 5,
    paddingLeft: 5,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  companyInfo: {
    fontSize: 10,
    color: '#34495E',
    marginBottom: 2,
  },
  dateRange: {
    fontSize: 10,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  jobDescription: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#2C3E50',
    textAlign: 'justify',
  },
  educationItem: {
    marginBottom: 12,
  },
  degreeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  institutionInfo: {
    fontSize: 10,
    color: '#34495E',
    marginBottom: 1,
  },
  educationDate: {
    fontSize: 10,
    color: '#7F8C8D',
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#2C3E50',
  },
});

function TemplateTwo({ formData, summary }) {
  // Process experience data
  const experience = Array.isArray(formData.experience)
    ? formData.experience
    : formData.experience
    ? [{ position: '', company: '', location: '', dates: '', responsibilities: [formData.experience] }]
    : [];

  // Process education data
  const education = Array.isArray(formData.education)
    ? formData.education
    : formData.education
    ? [{ degree: formData.education, institution: '', location: '', dates: '' }]
    : [];

  // Process skills data
  const skills = Array.isArray(formData.skills)
    ? formData.skills
    : formData.skills
    ? [formData.skills]
    : [];

  // Process languages data
  const languages = Array.isArray(formData.languages)
    ? formData.languages
    : formData.languages
    ? [formData.languages]
    : ['English', 'Spanish'];

  return (
    <Page size="A4" style={styles.page}>
    
      {/* LEFT COLUMN */}
      <View style={styles.leftColumn}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          {formData.image ? (
            <Image src={formData.image} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder} />
          )}
        </View>

        {/* About Me Section */}
        <Text style={styles.leftSectionTitle}>About Me</Text>
        <Text style={styles.aboutText}>
          {summary || 'I am a passionate MERN Stack Developer with experience in crafting dynamic, responsive, and high-performing web applications. Currently pursuing a degree in Information Technology at QUEST, NawabShah. I specialize in modern web development.'}
        </Text>

        {/* Contact Section */}
        <Text style={styles.sectionTitle}>CONTACT</Text>
        <View style={styles.contactItem}>
          <View style={styles.contactIcon} />
          <Text style={styles.contactText}>{formData.phone || '+92 304 8351334'}</Text>
        </View>
        <View style={styles.contactItem}>
          <View style={styles.contactIcon} />
          <Text style={styles.contactText}>{formData.email || 'email@gmail.com'}</Text>
        </View>
        <View style={styles.contactItem}>
          <View style={styles.contactIcon} />
          <Text style={styles.contactText}>{formData.address || 'Housing Society Nawabshah, Sindh'}</Text>
        </View>

        {/* Language Section */}
        {/* <Text style={styles.leftSectionTitle}>LANGUAGE</Text> */}
        <Text style={styles.sectionTitle}>LANGUAGE</Text>
        {languages.map((lang, i) => (
          <Text key={i} style={styles.languageItem}>• {lang}</Text>
        ))}
      </View>

      {/* RIGHT COLUMN */}
      <View style={styles.rightColumn}>
        {/* Header */}
        <Text style={styles.name}>{formData.name || 'TANVEER HUSSAIN'}</Text>
        <Text style={styles.role}>{formData.role || 'MERN Stack Developer'}</Text>

        {/* Experience Section */}
        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        {experience.map((exp, i) => (
          <View key={i} style={styles.experienceItem}>
            <Text style={styles.experienceNumber}>{i + 1}. {exp.position || 'Front End Developer'}</Text>
            <Text style={styles.companyInfo}>
              At <Text style={{ fontWeight: 'bold' }}>{exp.company || 'Icreatevez Technologies'}</Text> {exp.location || 'Office No 203, 204'}
            </Text>
            <Text style={styles.companyInfo}>
              {exp.location || 'Software Technology Park Department of Software Engineering QUEST University Nawabshah'}
            </Text>
            <Text style={styles.dateRange}>
              {exp.dates || 'July 3, 2024 - November 1, 2024'}
            </Text>
            {Array.isArray(exp.responsibilities) ? (
              exp.responsibilities.map((resp, j) => (
                <Text key={j} style={styles.jobDescription}>{resp}</Text>
              ))
            ) : (
              <Text style={styles.jobDescription}>
                Developed and maintained responsive web applications using HTML, CSS, and JavaScript. Utilized Bootstrap for responsive layouts, ensuring cross-browser compatibility. Built dynamic components in React.js for enhanced interactivity and performance.
              </Text>
            )}
          </View>
        ))}

        {/* Education Section */}
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        {education.map((edu, i) => (
          <View key={i} style={styles.educationItem}>
            <Text style={styles.degreeTitle}>{edu.degree || 'Bachelor of Information Technology'}</Text>
            <Text style={styles.institutionInfo}>
              {edu.institution || 'Quaid e Awam University of Engineering Science and Technology (QUEST)'}
            </Text>
            <Text style={styles.institutionInfo}>
              {edu.location || 'NawabShah22 Batch, 3rd Year (ID: 22BSIT-58)'}
            </Text>
            <Text style={styles.educationDate}>
              Expected Graduation: {edu.dates || 'December 2026'}
            </Text>
          </View>
        ))}

        {/* Skills Section - if you want to add it */}
        {skills.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <Text style={styles.skillsText}>
              {skills.join(', ')}
            </Text>
          </>
        )}
      </View>
    </Page>
  );
}

export default TemplateTwo;

