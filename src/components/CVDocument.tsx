import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { CVData } from '../store';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 700 },
  ],
});

// Template 1: Modern Sidebar Styles (Thandiwe Style)
const modernStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontSize: 10,
    lineHeight: 1.45,
    fontFamily: 'Inter',
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#0a2540',
    color: '#ffffff',
    padding: 22,
  },
  main: {
    width: '65%',
    padding: 25,
    paddingRight: 30,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#d4af37',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    border: '3pt solid #ffffff',
    alignSelf: 'center',
  },
  nameSidebar: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  sectionTitleSidebar: {
    fontSize: 9,
    marginTop: 18,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '1pt solid #d4af37',
    paddingBottom: 3,
    color: '#d4af37',
  },
  sidebarText: {
    fontSize: 9,
    marginBottom: 4,
  },
  studentIdBox: {
    backgroundColor: '#1e40af',
    padding: 10,
    marginTop: 22,
    borderRadius: 6,
    textAlign: 'center',
  },
  mainName: {
    fontSize: 19,
    fontWeight: 700,
    marginBottom: 6,
    color: '#0a2540',
  },
  degreeBanner: {
    backgroundColor: '#0a2540',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 18,
    borderRadius: 4,
  },
  degreeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 700,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  levelText: {
    color: '#fbbf24',
    fontSize: 8,
    textAlign: 'center',
    marginTop: 2,
  },
  mainSectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#0a2540',
    borderBottom: '2pt solid #d4af37',
    paddingBottom: 4,
    marginBottom: 10,
    marginTop: 15,
    textTransform: 'uppercase',
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
    gap: 6,
  },
  pill: {
    backgroundColor: '#f3f4f6',
    color: '#1f2937',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 8,
  },
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  column: {
    width: '48%',
  },
  bullet: {
    marginLeft: 12,
    marginBottom: 4,
    fontSize: 9,
  },
  experienceHeader: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 2,
  },
  experienceOrg: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 18,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 7,
    color: '#9ca3af',
  },
});

// Template 2: Classic Professional Styles
const classicStyles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#ffffff', fontSize: 10, lineHeight: 1.5, fontFamily: 'Inter' },
  header: { borderBottom: '2pt solid #111', paddingBottom: 15, marginBottom: 20, textAlign: 'center' },
  name: { fontSize: 24, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 },
  degree: { fontSize: 12, color: '#444', marginTop: 5 },
  contactRow: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginTop: 10, fontSize: 9, color: '#666' },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 12, fontWeight: 700, textTransform: 'uppercase', borderBottom: '1pt solid #ccc', marginBottom: 10, paddingBottom: 3 },
  expItem: { marginBottom: 12 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', fontWeight: 700 },
  expOrg: { fontStyle: 'italic', color: '#555', marginBottom: 4 },
  bullet: { marginLeft: 15, marginBottom: 3, flexDirection: 'row' },
  bulletDot: { width: 3, height: 3, backgroundColor: '#000', borderRadius: 1.5, marginTop: 6, marginRight: 8 },
  pillContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  pill: { border: '1pt solid #ddd', padding: '2 8', borderRadius: 2, fontSize: 9 },
  footer: { position: 'absolute', bottom: 20, left: 40, right: 40, textAlign: 'center', fontSize: 8, color: '#888', borderTop: '1pt solid #eee', paddingTop: 10 }
});

// Template 3: Minimalist Styles
const minimalistStyles = StyleSheet.create({
  page: { padding: 50, backgroundColor: '#ffffff', fontSize: 9, lineHeight: 1.6, fontFamily: 'Inter', color: '#2d3748' },
  header: { marginBottom: 30 },
  name: { fontSize: 28, fontWeight: 700, color: '#1a202c', marginBottom: 5 },
  degree: { fontSize: 14, color: '#718096', marginBottom: 15 },
  contactGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, borderTop: '1pt solid #edf2f7', paddingTop: 15 },
  contactItem: { fontSize: 8, color: '#4a5568' },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 10, fontWeight: 700, color: '#a0aec0', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 },
  expItem: { marginBottom: 15 },
  expRole: { fontSize: 11, fontWeight: 700, color: '#2d3748' },
  expOrg: { fontSize: 10, color: '#4a5568' },
  expDate: { fontSize: 9, color: '#a0aec0', marginBottom: 5 },
  bullet: { marginBottom: 4, paddingLeft: 10 },
  pill: { color: '#4a5568', marginRight: 15, fontSize: 9 },
  footer: { position: 'absolute', bottom: 30, left: 50, right: 50, fontSize: 7, color: '#cbd5e0', textAlign: 'right' }
});

// Template 4: Creative Styles
const creativeStyles = StyleSheet.create({
  page: { backgroundColor: '#ffffff', fontSize: 9, lineHeight: 1.4, fontFamily: 'Inter' },
  header: { backgroundColor: '#6366f1', padding: 30, color: '#ffffff' },
  name: { fontSize: 32, fontWeight: 700, marginBottom: 5 },
  degree: { fontSize: 14, opacity: 0.9, marginBottom: 15 },
  contactBar: { flexDirection: 'row', gap: 20, fontSize: 9 },
  content: { padding: 30, flexDirection: 'row', gap: 30 },
  leftCol: { width: '60%' },
  rightCol: { width: '40%' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: 700, color: '#4338ca', marginBottom: 10, borderLeft: '3pt solid #6366f1', paddingLeft: 10 },
  expItem: { marginBottom: 12, paddingLeft: 13 },
  expRole: { fontWeight: 700, fontSize: 10 },
  expDate: { color: '#6366f1', fontSize: 8, marginBottom: 2 },
  pill: { backgroundColor: '#e0e7ff', color: '#4338ca', padding: '3 8', borderRadius: 6, marginBottom: 5, marginRight: 5, fontSize: 8 },
  bullet: { flexDirection: 'row', marginBottom: 3 },
  bulletDot: { width: 4, height: 4, backgroundColor: '#6366f1', borderRadius: 2, marginTop: 5, marginRight: 6 }
});

// Template 5: Elegant Styles
const elegantStyles = StyleSheet.create({
  page: { padding: 60, backgroundColor: '#ffffff', fontSize: 10, lineHeight: 1.4, fontFamily: 'Inter', color: '#1a1a1a' },
  header: { alignItems: 'center', marginBottom: 40, borderBottom: '0.5pt solid #000', paddingBottom: 20 },
  name: { fontSize: 26, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 },
  degree: { fontSize: 11, letterSpacing: 1, color: '#666', textTransform: 'uppercase' },
  contact: { flexDirection: 'row', gap: 15, marginTop: 15, fontSize: 8, color: '#888' },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center', marginBottom: 15, color: '#000' },
  expItem: { marginBottom: 15 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  expRole: { fontWeight: 700, fontSize: 10 },
  expOrg: { fontSize: 9, color: '#444' },
  bullet: { marginLeft: 20, marginBottom: 4, fontSize: 9 },
  pillContainer: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 10 },
  pill: { fontSize: 9, fontStyle: 'italic' },
  footer: { position: 'absolute', bottom: 40, left: 60, right: 60, textAlign: 'center', fontSize: 7, color: '#ccc', letterSpacing: 1 }
});

const ModernSidebar: React.FC<{ data: CVData }> = ({ data }) => (
  <>
    <Page size="A4" style={modernStyles.page}>
      <View style={modernStyles.sidebar}>
        <View style={modernStyles.circle}>
          <Text style={{ fontSize: 28, color: '#0a2540', fontWeight: 700 }}>
            {data.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </Text>
        </View>
        <Text style={modernStyles.nameSidebar}>{data.name}</Text>

        <Text style={modernStyles.sectionTitleSidebar}>CONTACT</Text>
        <Text style={modernStyles.sidebarText}>📱 {data.contact.phone}</Text>
        <Text style={modernStyles.sidebarText}>✉️ {data.contact.email}</Text>
        <Text style={modernStyles.sidebarText}>📍 {data.contact.location}</Text>
        <Text style={modernStyles.sidebarText}>🔗 {data.contact.linkedin}</Text>

        <Text style={modernStyles.sectionTitleSidebar}>PERSONAL</Text>
        <Text style={modernStyles.sidebarText}>Born: {data.personal.born}</Text>
        <Text style={modernStyles.sidebarText}>Gender: {data.personal.gender}</Text>
        <Text style={modernStyles.sidebarText}>Nationality: {data.personal.nationality}</Text>

        <Text style={modernStyles.sectionTitleSidebar}>LANGUAGES</Text>
        {data.languages.map((lang, i) => (
          <Text key={i} style={modernStyles.sidebarText}>• {lang}</Text>
        ))}

        <Text style={modernStyles.sectionTitleSidebar}>KEY SKILLS</Text>
        {data.keySkills.map((skill, i) => (
          <Text key={i} style={modernStyles.sidebarText}>• {skill}</Text>
        ))}

        <Text style={modernStyles.sectionTitleSidebar}>DIGITAL SKILLS</Text>
        {data.digitalSkills.map((skill, i) => (
          <Text key={i} style={modernStyles.sidebarText}>• {skill}</Text>
        ))}

        <View style={modernStyles.studentIdBox}>
          <Text style={{ fontSize: 9, fontWeight: 700 }}>STUDENT ID</Text>
          <Text style={{ fontSize: 12, marginTop: 2 }}>{data.studentId}</Text>
          <Text style={{ fontSize: 7, marginTop: 4 }}>OHSC — Open High School College</Text>
        </View>
      </View>

      <View style={modernStyles.main}>
        <Text style={modernStyles.mainName}>{data.name}</Text>

        <View style={modernStyles.degreeBanner}>
          <Text style={modernStyles.degreeText}>{data.degree}</Text>
          <Text style={modernStyles.levelText}>LEVEL: UNDERGRADUATE DEGREE</Text>
        </View>

        <Text style={modernStyles.mainSectionTitle}>PROFESSIONAL SUMMARY</Text>
        <Text style={{ textAlign: 'justify' }}>{data.summary}</Text>

        <Text style={modernStyles.mainSectionTitle}>CAREER OBJECTIVE</Text>
        <Text style={{ textAlign: 'justify' }}>{data.objective}</Text>

        <Text style={modernStyles.mainSectionTitle}>CORE MODULES & COURSEWORK</Text>
        <View style={modernStyles.pillContainer}>
          {data.modules.map((module, i) => (
            <Text key={i} style={modernStyles.pill}>{module}</Text>
          ))}
        </View>

        <Text style={modernStyles.mainSectionTitle}>KEY PROFESSIONAL SKILLS</Text>
        <View style={modernStyles.twoColumn}>
          <View style={modernStyles.column}>
            {data.professionalSkills.slice(0, 5).map((skill, i) => (
              <Text key={i} style={modernStyles.bullet}>• {skill}</Text>
            ))}
          </View>
          <View style={modernStyles.column}>
            {data.professionalSkills.slice(5).map((skill, i) => (
              <Text key={i} style={modernStyles.bullet}>• {skill}</Text>
            ))}
          </View>
        </View>

        <Text style={modernStyles.mainSectionTitle}>WORK EXPERIENCE</Text>
        {data.experience.slice(0, 1).map((exp) => (
          <View key={exp.id} style={{ marginBottom: 10 }}>
            <Text style={modernStyles.experienceHeader}>{exp.role}</Text>
            <Text style={modernStyles.experienceOrg}>{exp.org} — {exp.dates}</Text>
            {exp.bullets.map((bullet, i) => (
              <Text key={i} style={modernStyles.bullet}>• {bullet}</Text>
            ))}
          </View>
        ))}

        <Text style={modernStyles.footer}>
          Curriculum Vitae • {data.name} • {data.studentId} • Page 1 of 2 • {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </Text>
      </View>
    </Page>

    <Page size="A4" style={modernStyles.page}>
      <View style={modernStyles.sidebar} />
      <View style={modernStyles.main}>
        {data.experience.length > 1 && (
          <View style={{ marginBottom: 20 }}>
            {data.experience.slice(1).map((exp) => (
              <View key={exp.id} style={{ marginBottom: 15 }}>
                <Text style={modernStyles.experienceHeader}>{exp.role}</Text>
                <Text style={modernStyles.experienceOrg}>{exp.org} — {exp.dates}</Text>
                {exp.bullets.map((bullet, i) => (
                  <Text key={i} style={modernStyles.bullet}>• {bullet}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        <Text style={modernStyles.mainSectionTitle}>EDUCATION</Text>
        {data.education.map((edu) => (
          <View key={edu.id} style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: 700 }}>{edu.degree}</Text>
            <Text>{edu.institution}</Text>
            {edu.year && <Text>{edu.year}</Text>}
            {edu.details && <Text style={{ fontSize: 8, marginTop: 2, color: '#6b7280' }}>{edu.details}</Text>}
          </View>
        ))}

        <Text style={modernStyles.mainSectionTitle}>ACHIEVEMENTS & ACTIVITIES</Text>
        {data.achievements.map((ach, i) => (
          <Text key={i} style={modernStyles.bullet}>• {ach}</Text>
        ))}

        <Text style={modernStyles.mainSectionTitle}>REFERENCES</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
          {data.references.map((ref) => (
            <View key={ref.id} style={{ width: '45%', marginBottom: 14 }}>
              <Text style={{ fontWeight: 700 }}>{ref.name}</Text>
              <Text style={{ fontSize: 9 }}>{ref.title}</Text>
              <Text style={{ fontSize: 8, color: '#6b7280' }}>{ref.contact}</Text>
            </View>
          ))}
        </View>

        <Text style={modernStyles.footer}>
          Curriculum Vitae • {data.name} • {data.studentId} • Page 2 of 2 • {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </Text>
      </View>
    </Page>
  </>
);

const ClassicProfessional: React.FC<{ data: CVData }> = ({ data }) => (
  <Page size="A4" style={classicStyles.page}>
    <View style={classicStyles.header}>
      <Text style={classicStyles.name}>{data.name}</Text>
      <Text style={classicStyles.degree}>{data.degree}</Text>
      <View style={classicStyles.contactRow}>
        <Text>{data.contact.phone}</Text>
        <Text>•</Text>
        <Text>{data.contact.email}</Text>
        <Text>•</Text>
        <Text>{data.contact.location}</Text>
      </View>
    </View>
    <View style={classicStyles.section}>
      <Text style={classicStyles.sectionTitle}>Professional Summary</Text>
      <Text style={{ textAlign: 'justify' }}>{data.summary}</Text>
    </View>
    <View style={classicStyles.section}>
      <Text style={classicStyles.sectionTitle}>Experience</Text>
      {data.experience.map(exp => (
        <View key={exp.id} style={classicStyles.expItem}>
          <View style={classicStyles.expHeader}><Text>{exp.role}</Text><Text>{exp.dates}</Text></View>
          <Text style={classicStyles.expOrg}>{exp.org}</Text>
          {exp.bullets.map((b, i) => (
            <View key={i} style={classicStyles.bullet}><View style={classicStyles.bulletDot}/><Text style={{flex:1}}>{b}</Text></View>
          ))}
        </View>
      ))}
    </View>
    <View style={classicStyles.section}>
      <Text style={classicStyles.sectionTitle}>Education</Text>
      {data.education.map(edu => (
        <View key={edu.id} style={classicStyles.expItem}>
          <View style={classicStyles.expHeader}><Text>{edu.degree}</Text><Text>{edu.year}</Text></View>
          <Text style={classicStyles.expOrg}>{edu.institution}</Text>
        </View>
      ))}
    </View>
    <View style={classicStyles.section}>
      <Text style={classicStyles.sectionTitle}>Skills</Text>
      <View style={classicStyles.pillContainer}>
        {data.keySkills.concat(data.skills).map((s, i) => (
          <Text key={i} style={classicStyles.pill}>{s}</Text>
        ))}
      </View>
    </View>
    <Text style={classicStyles.footer}>{data.name} • {data.studentId} • {new Date().getFullYear()}</Text>
  </Page>
);

const Minimalist: React.FC<{ data: CVData }> = ({ data }) => (
  <Page size="A4" style={minimalistStyles.page}>
    <View style={minimalistStyles.header}>
      <Text style={minimalistStyles.name}>{data.name}</Text>
      <Text style={minimalistStyles.degree}>{data.degree}</Text>
      <View style={minimalistStyles.contactGrid}>
        <Text style={minimalistStyles.contactItem}>{data.contact.email}</Text>
        <Text style={minimalistStyles.contactItem}>{data.contact.phone}</Text>
        <Text style={minimalistStyles.contactItem}>{data.contact.linkedin}</Text>
      </View>
    </View>
    <View style={minimalistStyles.section}>
      <Text style={minimalistStyles.sectionTitle}>About</Text>
      <Text>{data.summary}</Text>
    </View>
    <View style={minimalistStyles.section}>
      <Text style={minimalistStyles.sectionTitle}>Experience</Text>
      {data.experience.map(exp => (
        <View key={exp.id} style={minimalistStyles.expItem}>
          <Text style={minimalistStyles.expDate}>{exp.dates}</Text>
          <Text style={minimalistStyles.expRole}>{exp.role}</Text>
          <Text style={minimalistStyles.expOrg}>{exp.org}</Text>
          {exp.bullets.map((b, i) => (
            <Text key={i} style={minimalistStyles.bullet}>- {b}</Text>
          ))}
        </View>
      ))}
    </View>
    <View style={minimalistStyles.section}>
      <Text style={minimalistStyles.sectionTitle}>Skills</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {data.keySkills.map((s, i) => (<Text key={i} style={minimalistStyles.pill}>{s}</Text>))}
      </View>
    </View>
    <Text style={minimalistStyles.footer}>{data.name} / {data.studentId}</Text>
  </Page>
);

const Creative: React.FC<{ data: CVData }> = ({ data }) => (
  <Page size="A4" style={creativeStyles.page}>
    <View style={creativeStyles.header}>
      <Text style={creativeStyles.name}>{data.name}</Text>
      <Text style={creativeStyles.degree}>{data.degree}</Text>
      <View style={creativeStyles.contactBar}>
        <Text>{data.contact.email}</Text>
        <Text>|</Text>
        <Text>{data.contact.phone}</Text>
        <Text>|</Text>
        <Text>{data.contact.location}</Text>
      </View>
    </View>
    <View style={creativeStyles.content}>
      <View style={creativeStyles.leftCol}>
        <View style={creativeStyles.section}>
          <Text style={creativeStyles.sectionTitle}>Experience</Text>
          {data.experience.map(exp => (
            <View key={exp.id} style={creativeStyles.expItem}>
              <Text style={creativeStyles.expDate}>{exp.dates}</Text>
              <Text style={creativeStyles.expRole}>{exp.role}</Text>
              {exp.bullets.map((b, i) => (
                <View key={i} style={creativeStyles.bullet}><View style={creativeStyles.bulletDot}/><Text style={{flex:1}}>{b}</Text></View>
              ))}
            </View>
          ))}
        </View>
      </View>
      <View style={creativeStyles.rightCol}>
        <View style={creativeStyles.section}>
          <Text style={creativeStyles.sectionTitle}>Summary</Text>
          <Text>{data.summary}</Text>
        </View>
        <View style={creativeStyles.section}>
          <Text style={creativeStyles.sectionTitle}>Skills</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.keySkills.map((s, i) => (<Text key={i} style={creativeStyles.pill}>{s}</Text>))}
          </View>
        </View>
        <View style={creativeStyles.section}>
          <Text style={creativeStyles.sectionTitle}>Education</Text>
          {data.education.map(edu => (
            <View key={edu.id} style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 700 }}>{edu.degree}</Text>
              <Text style={{ fontSize: 8, color: '#666' }}>{edu.institution}, {edu.year}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  </Page>
);

const Elegant: React.FC<{ data: CVData }> = ({ data }) => (
  <Page size="A4" style={elegantStyles.page}>
    <View style={elegantStyles.header}>
      <Text style={elegantStyles.name}>{data.name}</Text>
      <Text style={elegantStyles.degree}>{data.degree}</Text>
      <View style={elegantStyles.contact}>
        <Text>{data.contact.email}</Text>
        <Text>•</Text>
        <Text>{data.contact.phone}</Text>
        <Text>•</Text>
        <Text>{data.contact.location}</Text>
      </View>
    </View>
    <View style={elegantStyles.section}>
      <Text style={elegantStyles.sectionTitle}>Summary</Text>
      <Text style={{ textAlign: 'center' }}>{data.summary}</Text>
    </View>
    <View style={elegantStyles.section}>
      <Text style={elegantStyles.sectionTitle}>Experience</Text>
      {data.experience.map(exp => (
        <View key={exp.id} style={elegantStyles.expItem}>
          <View style={elegantStyles.expHeader}>
            <Text style={elegantStyles.expRole}>{exp.role}</Text>
            <Text style={{ fontSize: 8 }}>{exp.dates}</Text>
          </View>
          <Text style={elegantStyles.expOrg}>{exp.org}</Text>
          {exp.bullets.map((b, i) => (
            <Text key={i} style={elegantStyles.bullet}>• {b}</Text>
          ))}
        </View>
      ))}
    </View>
    <View style={elegantStyles.section}>
      <Text style={elegantStyles.sectionTitle}>Education</Text>
      {data.education.map(edu => (
        <View key={edu.id} style={elegantStyles.expItem}>
          <View style={elegantStyles.expHeader}>
            <Text style={elegantStyles.expRole}>{edu.degree}</Text>
            <Text style={{ fontSize: 8 }}>{edu.year}</Text>
          </View>
          <Text style={elegantStyles.expOrg}>{edu.institution}</Text>
        </View>
      ))}
    </View>
    <View style={elegantStyles.section}>
      <Text style={elegantStyles.sectionTitle}>Skills</Text>
      <View style={elegantStyles.pillContainer}>
        {data.keySkills.map((s, i) => (<Text key={i} style={elegantStyles.pill}>{s}</Text>))}
      </View>
    </View>
    <Text style={elegantStyles.footer}>{data.name} | {data.studentId}</Text>
  </Page>
);

export const CVDocument: React.FC<{ data: CVData }> = ({ data }) => {
  const renderTemplate = () => {
    switch (data.templateId) {
      case 'classic': return <ClassicProfessional data={data} />;
      case 'minimalist': return <Minimalist data={data} />;
      case 'creative': return <Creative data={data} />;
      case 'elegant': return <Elegant data={data} />;
      case 'modern-sidebar':
      default: return <ModernSidebar data={data} />;
    }
  };

  return (
    <Document>
      {renderTemplate()}
    </Document>
  );
};
