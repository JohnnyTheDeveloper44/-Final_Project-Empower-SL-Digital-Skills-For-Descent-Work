import { useState } from 'react';
import { Plus, X, Upload, Save } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: 'dev' | 'data' | 'design' | 'marketing';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  instructor: string;
  instructorTitle: string;
  thumbnail?: string;
}

export default function AdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Partial<Course>>({
    category: 'dev',
    level: 'beginner',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentCourse((prev) => ({ ...prev, thumbnail: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      ...currentCourse,
      id: Date.now().toString(),
    } as Course;

    setCourses((prev) => [...prev, newCourse]);
    setIsModalOpen(false);
    setCurrentCourse({ category: 'dev', level: 'beginner' });
  };

  const handleDelete = (id: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  const categoryColors = {
    dev: '#4f83e3',
    data: '#9333ea',
    design: '#ec4899',
    marketing: '#f59e0b',
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Course Management</h1>
            <p className="text-muted-foreground">Add and manage courses for the platform</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-all"
          >
            <Plus size={20} />
            Add New Course
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div
                  className="w-full h-48 flex items-center justify-center text-white text-lg font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${categoryColors[course.category]} 0%, ${categoryColors[course.category]}99 100%)`,
                  }}
                >
                  {course.title}
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {course.level}
                  </span>
                  <span className="text-sm text-muted-foreground">{course.duration}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{course.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{course.instructor}</p>
                    <p className="text-xs text-muted-foreground">{course.instructorTitle}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No courses yet. Add your first course!</p>
          </div>
        )}

        {/* Add Course Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Add New Course</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={currentCourse.title || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground"
                    placeholder="e.g., Introduction to React"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={currentCourse.description || ''}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground"
                    placeholder="Brief description of the course"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={currentCourse.category || 'dev'}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground"
                    >
                      <option value="dev">Development</option>
                      <option value="data">Data Science</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Level</label>
                    <select
                      name="level"
                      value={currentCourse.level || 'beginner'}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={currentCourse.duration || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground"
                    placeholder="e.g., 8 weeks"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Instructor Name
                    </label>
                    <input
                      type="text"
                      name="instructor"
                      value={currentCourse.instructor || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground"
                      placeholder="e.g., John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Instructor Title
                    </label>
                    <input
                      type="text"
                      name="instructorTitle"
                      value={currentCourse.instructorTitle || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground"
                      placeholder="e.g., Senior Developer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Course Thumbnail
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-8 bg-background border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      <Upload size={20} className="text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {currentCourse.thumbnail ? 'Change Thumbnail' : 'Upload Thumbnail'}
                      </span>
                    </label>
                    {currentCourse.thumbnail && (
                      <img
                        src={currentCourse.thumbnail}
                        alt="Preview"
                        className="mt-4 w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all"
                  >
                    <Save size={20} />
                    Save Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
