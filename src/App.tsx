import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderGit2, 
  Plus, 
  Trash2, 
  Download, 
  Eye, 
  Edit3,
  ChevronRight,
  ChevronDown,
  Layout,
  Check
} from 'lucide-react';
import { useCVStore, CVData } from './store';
import { CVDocument } from './components/CVDocument';

const SectionHeader: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  isOpen: boolean; 
  onToggle: () => void;
}> = ({ icon, title, isOpen, onToggle }) => (
  <button 
    onClick={onToggle}
    className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
        {icon}
      </div>
      <span className="font-semibold text-slate-800">{title}</span>
    </div>
    {isOpen ? <ChevronDown className="text-slate-400" /> : <ChevronRight className="text-slate-400" />}
  </button>
);

export default function App() {
  const { 
    data, 
    updateField, 
    addItem, 
    removeItem, 
    updateItem, 
    addListValue, 
    removeListValue, 
    addBullet, 
    removeBullet,
    resetData,
    updateTemplate
  } = useCVStore();
  
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [openSections, setOpenSections] = useState<string[]>(['personal', 'templates']);

  const templates = [
    { id: 'modern-sidebar', name: 'Modern Sidebar', color: 'bg-slate-800' },
    { id: 'classic', name: 'Classic Prof.', color: 'bg-stone-200' },
    { id: 'minimalist', name: 'Minimalist', color: 'bg-white' },
    { id: 'creative', name: 'Creative', color: 'bg-indigo-500' },
    { id: 'elegant', name: 'Elegant', color: 'bg-zinc-900' },
  ];

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const handleListAdd = (collection: any, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim();
      if (value) {
        addListValue(collection, value);
        e.currentTarget.value = '';
      }
    }
  };

  const handleBulletAdd = (expId: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim();
      if (value) {
        addBullet(expId, value);
        e.currentTarget.value = '';
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Edit3 className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Pro CV Builder</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Craft your professional story</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('edit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'edit' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Edit3 size={16} />
              Editor
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Eye size={16} />
              Preview
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={resetData}
              className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-4 py-2 transition-colors"
            >
              Reset to Sample
            </button>
            <PDFDownloadLink
              document={<CVDocument data={data} />}
              fileName={`${data.name || 'CV'}.pdf`}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-200 active:scale-95"
            >
              {({ loading }) => (
                <>
                  <Download size={18} />
                  {loading ? 'Preparing...' : 'Download PDF'}
                </>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Side */}
        <div className={`lg:col-span-7 space-y-6 overflow-y-auto h-[calc(100vh-8rem)] pr-4 custom-scrollbar ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
          
          {/* Template Selection */}
          <div className="space-y-3">
            <SectionHeader 
              icon={<Layout size={20} />} 
              title="Resume Template" 
              isOpen={openSections.includes('templates')}
              onToggle={() => toggleSection('templates')}
            />
            {openSections.includes('templates') && (
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => updateTemplate(t.id)}
                      className={`group relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${data.templateId === t.id ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-slate-200 bg-slate-50'}`}
                    >
                      <div className={`w-full aspect-[3/4] rounded-md shadow-sm border border-slate-200 ${t.color} flex items-center justify-center`}>
                        <div className="w-4/5 h-4/5 flex flex-col gap-1">
                          <div className="w-1/2 h-1 bg-slate-400/20 rounded" />
                          <div className="w-full h-1 bg-slate-400/20 rounded" />
                          <div className="w-full h-1 bg-slate-400/20 rounded" />
                          <div className="w-2/3 h-1 bg-slate-400/20 rounded" />
                        </div>
                      </div>
                      <span className={`text-xs font-bold ${data.templateId === t.id ? 'text-blue-600' : 'text-slate-600'}`}>{t.name}</span>
                      {data.templateId === t.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Header Info */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input 
                  type="text" 
                  value={data.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Degree Title</label>
                <input 
                  type="text" 
                  value={data.degree}
                  onChange={(e) => updateField('degree', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Student ID</label>
                <input 
                  type="text" 
                  value={data.studentId}
                  onChange={(e) => updateField('studentId', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <SectionHeader 
              icon={<Mail size={20} />} 
              title="Contact Information" 
              isOpen={openSections.includes('contact')}
              onToggle={() => toggleSection('contact')}
            />
            {openSections.includes('contact') && (
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Phone</label>
                    <input 
                      type="text" 
                      value={data.contact.phone}
                      onChange={(e) => updateField('contact.phone', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <input 
                      type="email" 
                      value={data.contact.email}
                      onChange={(e) => updateField('contact.email', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Location</label>
                    <input 
                      type="text" 
                      value={data.contact.location}
                      onChange={(e) => updateField('contact.location', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">LinkedIn</label>
                    <input 
                      type="text" 
                      value={data.contact.linkedin}
                      onChange={(e) => updateField('contact.linkedin', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Personal Details */}
          <div className="space-y-3">
            <SectionHeader 
              icon={<User size={20} />} 
              title="Personal Details" 
              isOpen={openSections.includes('personal')}
              onToggle={() => toggleSection('personal')}
            />
            {openSections.includes('personal') && (
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Born</label>
                    <input 
                      type="text" 
                      value={data.personal.born}
                      onChange={(e) => updateField('personal.born', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Gender</label>
                    <input 
                      type="text" 
                      value={data.personal.gender}
                      onChange={(e) => updateField('personal.gender', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Nationality</label>
                    <input 
                      type="text" 
                      value={data.personal.nationality}
                      onChange={(e) => updateField('personal.nationality', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary & Objective */}
          <div className="space-y-3">
            <SectionHeader 
              icon={<Edit3 size={20} />} 
              title="Summary & Objective" 
              isOpen={openSections.includes('summary')}
              onToggle={() => toggleSection('summary')}
            />
            {openSections.includes('summary') && (
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Professional Summary</label>
                  <textarea 
                    value={data.summary}
                    onChange={(e) => updateField('summary', e.target.value)}
                    className="w-full h-24 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Career Objective</label>
                  <textarea 
                    value={data.objective}
                    onChange={(e) => updateField('objective', e.target.value)}
                    className="w-full h-24 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* List Sections (Languages, Skills, Modules, etc.) */}
          {[
            { id: 'languages', title: 'Languages', icon: <Globe size={20} /> },
            { id: 'skills', title: 'Skills', icon: <Code size={20} /> },
            { id: 'digitalSkills', title: 'Digital Skills', icon: <Code size={20} /> },
            { id: 'modules', title: 'Core Modules', icon: <FolderGit2 size={20} /> },
            { id: 'keySkills', title: 'Key Skills', icon: <Edit3 size={20} /> },
            { id: 'professionalSkills', title: 'Professional Skills', icon: <Briefcase size={20} /> },
            { id: 'achievements', title: 'Achievements', icon: <FolderGit2 size={20} /> },
          ].map((section) => (
            <div key={section.id} className="space-y-3">
              <SectionHeader 
                icon={section.icon} 
                title={section.title} 
                isOpen={openSections.includes(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
              {openSections.includes(section.id) && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex flex-wrap gap-2">
                    {(data as any)[section.id].map((item: string, i: number) => (
                      <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100">
                        {item}
                        <button onClick={() => removeListValue(section.id as any, i)} className="hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input 
                    type="text" 
                    onKeyDown={(e) => handleListAdd(section.id, e)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder={`Type a ${section.title.toLowerCase()} and press Enter...`}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Experience */}
          <div className="space-y-3">
            <SectionHeader 
              icon={<Briefcase size={20} />} 
              title="Work Experience" 
              isOpen={openSections.includes('experience')}
              onToggle={() => toggleSection('experience')}
            />
            {openSections.includes('experience') && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 relative group">
                    <button 
                      onClick={() => removeItem('experience', exp.id)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Role</label>
                        <input 
                          type="text" 
                          value={exp.role}
                          onChange={(e) => updateItem('experience', exp.id, { role: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Organization</label>
                        <input 
                          type="text" 
                          value={exp.org}
                          onChange={(e) => updateItem('experience', exp.id, { org: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Dates</label>
                        <input 
                          type="text" 
                          value={exp.dates}
                          onChange={(e) => updateItem('experience', exp.id, { dates: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="Jan 2022 - Present"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Bullets</label>
                      <div className="space-y-2">
                        {exp.bullets.map((bullet, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="flex-1 text-sm bg-slate-50 p-2 rounded-lg border border-slate-100">{bullet}</span>
                            <button onClick={() => removeBullet(exp.id, i)} className="text-slate-400 hover:text-red-500">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <input 
                          type="text" 
                          onKeyDown={(e) => handleBulletAdd(exp.id, e)}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          placeholder="Add a bullet point and press Enter..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => addItem('experience')}
                  className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  <Plus size={20} />
                  Add Experience
                </button>
              </div>
            )}
          </div>

          {/* Education */}
          <div className="space-y-3">
            <SectionHeader 
              icon={<GraduationCap size={20} />} 
              title="Education" 
              isOpen={openSections.includes('education')}
              onToggle={() => toggleSection('education')}
            />
            {openSections.includes('education') && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {data.education.map((edu) => (
                  <div key={edu.id} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 relative group">
                    <button 
                      onClick={() => removeItem('education', edu.id)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Degree</label>
                        <input 
                          type="text" 
                          value={edu.degree}
                          onChange={(e) => updateItem('education', edu.id, { degree: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Institution</label>
                        <input 
                          type="text" 
                          value={edu.institution}
                          onChange={(e) => updateItem('education', edu.id, { institution: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Year</label>
                        <input 
                          type="text" 
                          value={edu.year}
                          onChange={(e) => updateItem('education', edu.id, { year: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Details</label>
                        <input 
                          type="text" 
                          value={edu.details}
                          onChange={(e) => updateItem('education', edu.id, { details: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => addItem('education')}
                  className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  <Plus size={20} />
                  Add Education
                </button>
              </div>
            )}
          </div>

          {/* References */}
          <div className="space-y-3">
            <SectionHeader 
              icon={<User size={20} />} 
              title="References" 
              isOpen={openSections.includes('references')}
              onToggle={() => toggleSection('references')}
            />
            {openSections.includes('references') && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {data.references.map((ref) => (
                  <div key={ref.id} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 relative group">
                    <button 
                      onClick={() => removeItem('references', ref.id)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Name</label>
                        <input 
                          type="text" 
                          value={ref.name}
                          onChange={(e) => updateItem('references', ref.id, { name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Title</label>
                        <input 
                          type="text" 
                          value={ref.title}
                          onChange={(e) => updateItem('references', ref.id, { title: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Contact</label>
                        <input 
                          type="text" 
                          value={ref.contact}
                          onChange={(e) => updateItem('references', ref.id, { contact: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => addItem('references')}
                  className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  <Plus size={20} />
                  Add Reference
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview Side */}
        <div className={`lg:col-span-5 sticky top-28 h-[calc(100vh-8rem)] ${activeTab === 'edit' ? 'hidden lg:block' : ''}`}>
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Live Preview</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
            </div>
            <div className="flex-1 bg-slate-200">
              <PDFViewer className="w-full h-full border-none" showToolbar={false}>
                <CVDocument data={data} />
              </PDFViewer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
