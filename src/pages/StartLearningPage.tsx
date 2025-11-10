import { Link } from 'react-router-dom';
import { Code, Database, Palette, Smartphone, Target, Zap, Trophy, TrendingUp, CheckCircle2, Award, User } from 'lucide-react';

const categoryColors = {
  dev: 'hsl(var(--category-dev))',
  data: 'hsl(var(--category-data))',
  design: 'hsl(var(--category-design))',
  marketing: 'hsl(var(--category-marketing))',
};

export default function StartLearningPage() {
  return (
    <main className="learning-page">
      {/* Hero/Introduction Section */}
      <section className="learning-hero">
        <div className="parallax-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">Start Your Professional Learning Journey</h1>
          <p className="hero-description">
            Begin your transformation today. Access world-class courses, gain valuable skills, 
            and unlock opportunities that will shape your future in the digital world.
          </p>
          <div className="hero-buttons">
            <a href="#courses" className="btn btn-primary">Enroll Now</a>
            <a href="#featured" className="btn btn-outline">View Courses</a>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section id="categories" className="categories-section">
        <div className="container">
          <h2 className="section-title">Explore <span className="gradient-text">Learning Paths</span></h2>
          <p className="section-description">Choose your path and start building your future</p>

          <div className="categories-grid">
            <div className="category-card" data-category="dev">
              <div className="category-icon">
                <Code className="icon" />
              </div>
              <h3>Software Development</h3>
              <p>Learn programming, web development, and software engineering from scratch to advanced levels.</p>
              <Link to="#courses" className="category-btn">Explore Courses</Link>
            </div>

            <div className="category-card" data-category="data">
              <div className="category-icon">
                <Database className="icon" />
              </div>
              <h3>Data Science</h3>
              <p>Master data analysis, machine learning, and AI to become a data professional.</p>
              <Link to="#courses" className="category-btn">Explore Courses</Link>
            </div>

            <div className="category-card" data-category="design">
              <div className="category-icon">
                <Palette className="icon" />
              </div>
              <h3>Design</h3>
              <p>Create stunning visuals, UI/UX designs, and brand identities that captivate audiences.</p>
              <Link to="#courses" className="category-btn">Explore Courses</Link>
            </div>

            <div className="category-card" data-category="marketing">
              <div className="category-icon">
                <Smartphone className="icon" />
              </div>
              <h3>Digital Marketing</h3>
              <p>Learn SEO, social media marketing, content creation, and digital advertising strategies.</p>
              <Link to="#courses" className="category-btn">Explore Courses</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="featured" className="featured-courses">
        <div className="container">
          <h2 className="section-title">Featured <span className="gradient-text">Courses</span></h2>
          <p className="section-description">Top trending and recommended courses for you</p>

          <div className="courses-grid">
            <div className="course-card" data-category="dev">
              <div className="course-thumbnail" style={{ background: `linear-gradient(135deg, ${categoryColors.dev} 0%, ${categoryColors.dev}99 100%)` }}>
                <Code size={64} strokeWidth={1.5} style={{ color: 'white', opacity: 0.2, position: 'absolute', bottom: '1rem', right: '1rem' }} />
              </div>
              <div className="course-content">
                <div className="course-header">
                  <span className="course-badge beginner">Beginner</span>
                  <span className="course-duration">8 weeks</span>
                </div>
                <h3>Introduction to Web Development</h3>
                <p>Master HTML, CSS, and JavaScript to build beautiful and responsive websites.</p>
                <div className="course-instructor">
                  <div className="instructor-avatar">
                    <User className="avatar-icon" />
                  </div>
                  <div className="instructor-info">
                    <span className="instructor-name">John Smith</span>
                    <span className="instructor-title">Senior Developer</span>
                  </div>
                </div>
                <button className="btn btn-primary full-width">Start Learning</button>
              </div>
            </div>

            <div className="course-card" data-category="data">
              <div className="course-thumbnail" style={{ background: `linear-gradient(135deg, ${categoryColors.data} 0%, ${categoryColors.data}99 100%)` }}>
                <Database size={64} strokeWidth={1.5} style={{ color: 'white', opacity: 0.2, position: 'absolute', bottom: '1rem', right: '1rem' }} />
              </div>
              <div className="course-content">
                <div className="course-header">
                  <span className="course-badge intermediate">Intermediate</span>
                  <span className="course-duration">10 weeks</span>
                </div>
                <h3>Python for Data Science</h3>
                <p>Learn Python programming and apply it to real-world data analysis projects.</p>
                <div className="course-instructor">
                  <div className="instructor-avatar">
                    <User className="avatar-icon" />
                  </div>
                  <div className="instructor-info">
                    <span className="instructor-name">Sarah Johnson</span>
                    <span className="instructor-title">Data Scientist</span>
                  </div>
                </div>
                <button className="btn btn-primary full-width">Start Learning</button>
              </div>
            </div>

            <div className="course-card" data-category="design">
              <div className="course-thumbnail" style={{ background: `linear-gradient(135deg, ${categoryColors.design} 0%, ${categoryColors.design}99 100%)` }}>
                <Palette size={64} strokeWidth={1.5} style={{ color: 'white', opacity: 0.2, position: 'absolute', bottom: '1rem', right: '1rem' }} />
              </div>
              <div className="course-content">
                <div className="course-header">
                  <span className="course-badge beginner">Beginner</span>
                  <span className="course-duration">6 weeks</span>
                </div>
                <h3>UI/UX Design Fundamentals</h3>
                <p>Design user-friendly interfaces and create exceptional user experiences.</p>
                <div className="course-instructor">
                  <div className="instructor-avatar">
                    <User className="avatar-icon" />
                  </div>
                  <div className="instructor-info">
                    <span className="instructor-name">Michael Chen</span>
                    <span className="instructor-title">UX Designer</span>
                  </div>
                </div>
                <button className="btn btn-primary full-width">Start Learning</button>
              </div>
            </div>

            <div className="course-card" data-category="dev">
              <div className="course-thumbnail" style={{ background: `linear-gradient(135deg, ${categoryColors.dev} 0%, ${categoryColors.dev}99 100%)` }}>
                <Code size={64} strokeWidth={1.5} style={{ color: 'white', opacity: 0.2, position: 'absolute', bottom: '1rem', right: '1rem' }} />
              </div>
              <div className="course-content">
                <div className="course-header">
                  <span className="course-badge advanced">Advanced</span>
                  <span className="course-duration">12 weeks</span>
                </div>
                <h3>Full-Stack Web Development</h3>
                <p>Build complete web applications using modern frameworks and best practices.</p>
                <div className="course-instructor">
                  <div className="instructor-avatar">
                    <User className="avatar-icon" />
                  </div>
                  <div className="instructor-info">
                    <span className="instructor-name">Emily Davis</span>
                    <span className="instructor-title">Full-Stack Engineer</span>
                  </div>
                </div>
                <button className="btn btn-primary full-width">Start Learning</button>
              </div>
            </div>

            <div className="course-card" data-category="marketing">
              <div className="course-thumbnail" style={{ background: `linear-gradient(135deg, ${categoryColors.marketing} 0%, ${categoryColors.marketing}99 100%)` }}>
                <Smartphone size={64} strokeWidth={1.5} style={{ color: 'white', opacity: 0.2, position: 'absolute', bottom: '1rem', right: '1rem' }} />
              </div>
              <div className="course-content">
                <div className="course-header">
                  <span className="course-badge intermediate">Intermediate</span>
                  <span className="course-duration">8 weeks</span>
                </div>
                <h3>Digital Marketing Mastery</h3>
                <p>Master SEO, social media, content marketing, and analytics to grow businesses.</p>
                <div className="course-instructor">
                  <div className="instructor-avatar">
                    <User className="avatar-icon" />
                  </div>
                  <div className="instructor-info">
                    <span className="instructor-name">David Wilson</span>
                    <span className="instructor-title">Marketing Expert</span>
                  </div>
                </div>
                <button className="btn btn-primary full-width">Start Learning</button>
              </div>
            </div>

            <div className="course-card" data-category="dev">
              <div className="course-thumbnail" style={{ background: `linear-gradient(135deg, ${categoryColors.dev} 0%, ${categoryColors.dev}99 100%)` }}>
                <Smartphone size={64} strokeWidth={1.5} style={{ color: 'white', opacity: 0.2, position: 'absolute', bottom: '1rem', right: '1rem' }} />
              </div>
              <div className="course-content">
                <div className="course-header">
                  <span className="course-badge beginner">Beginner</span>
                  <span className="course-duration">7 weeks</span>
                </div>
                <h3>Mobile App Development</h3>
                <p>Create native mobile applications for iOS and Android platforms.</p>
                <div className="course-instructor">
                  <div className="instructor-avatar">
                    <User className="avatar-icon" />
                  </div>
                  <div className="instructor-info">
                    <span className="instructor-name">Lisa Anderson</span>
                    <span className="instructor-title">Mobile Developer</span>
                  </div>
                </div>
                <button className="btn btn-primary full-width">Start Learning</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Development Tracks */}
      <section className="skill-tracks">
        <div className="container">
          <h2 className="section-title">Competency <span className="gradient-text">Tracks</span></h2>
          <p className="section-description">Follow structured learning paths and earn certificates</p>

          <div className="tracks-grid">
            <div className="track-card">
              <h3>Web Development Track</h3>
              <div className="track-roadmap">
                <div className="track-level active">
                  <div className="level-badge">
                    <Target className="badge-icon" />
                  </div>
                  <div className="level-info">
                    <h4>Beginner</h4>
                    <p>HTML, CSS & JavaScript Basics</p>
                    <span className="level-badge-small">Certificate</span>
                  </div>
                </div>
                <div className="track-connector"></div>
                <div className="track-level">
                  <div className="level-badge">
                    <Zap className="badge-icon" />
                  </div>
                  <div className="level-info">
                    <h4>Intermediate</h4>
                    <p>React, Node.js & Databases</p>
                    <span className="level-badge-small">Certificate</span>
                  </div>
                </div>
                <div className="track-connector"></div>
                <div className="track-level">
                  <div className="level-badge">
                    <Trophy className="badge-icon" />
                  </div>
                  <div className="level-info">
                    <h4>Advanced</h4>
                    <p>Full-Stack Projects & Deployment</p>
                    <span className="level-badge-small">Professional Certificate</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="track-card">
              <h3>Data Science Track</h3>
              <div className="track-roadmap">
                <div className="track-level active">
                  <div className="level-badge">
                    <Target className="badge-icon" />
                  </div>
                  <div className="level-info">
                    <h4>Beginner</h4>
                    <p>Python & Statistics Fundamentals</p>
                    <span className="level-badge-small">Certificate</span>
                  </div>
                </div>
                <div className="track-connector"></div>
                <div className="track-level">
                  <div className="level-badge">
                    <Zap className="badge-icon" />
                  </div>
                  <div className="level-info">
                    <h4>Intermediate</h4>
                    <p>Data Analysis & Visualization</p>
                    <span className="level-badge-small">Certificate</span>
                  </div>
                </div>
                <div className="track-connector"></div>
                <div className="track-level">
                  <div className="level-badge">
                    <Trophy className="badge-icon" />
                  </div>
                  <div className="level-info">
                    <h4>Advanced</h4>
                    <p>Machine Learning & AI</p>
                    <span className="level-badge-small">Professional Certificate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="learning-testimonials">
        <div className="container">
          <h2 className="section-title">Success <span className="gradient-text">Stories</span></h2>
          <p className="section-description">Learn from those who've completed their journey</p>

          <div className="testimonials-grid">
            <div className="testimonial-card video-testimonial">
              <div className="video-placeholder">
                <div className="play-button">▶</div>
                <span>Watch Video Testimonial</span>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <Code className="avatar-icon" />
                </div>
                <div className="author-info">
                  <div className="author-name">James Koroma</div>
                  <div className="author-role">Software Engineer at Tech Corp</div>
                </div>
              </div>
              <p>"Started as a complete beginner, now I'm building enterprise applications!"</p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The structured learning paths helped me transition from marketing to data science. The certificates opened doors I never imagined!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <User className="avatar-icon" />
                </div>
                <div className="author-info">
                  <div className="author-name">Fatmata Kamara</div>
                  <div className="author-role">Data Analyst at Finance Ltd</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The hands-on projects and interactive learning tools made complex concepts easy to understand. Highly recommended!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <User className="avatar-icon" />
                </div>
                <div className="author-info">
                  <div className="author-name">Ibrahim Sesay</div>
                  <div className="author-role">UX Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Learning Tools */}
      <section className="learning-tools">
        <div className="container">
          <h2 className="section-title">Interactive <span className="gradient-text">Learning Tools</span></h2>
          <p className="section-description">Track your progress and stay motivated</p>

          <div className="tools-grid">
            <div className="tool-card">
              <div className="tool-icon">
                <TrendingUp className="icon" />
              </div>
              <h3>Progress Tracker</h3>
              <p>Monitor your learning journey with detailed analytics and milestones.</p>
              <div className="progress-demo">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '65%'}}></div>
                </div>
                <span className="progress-text">65% Complete</span>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-icon">
                <CheckCircle2 className="icon" />
              </div>
              <h3>Quizzes & Assessments</h3>
              <p>Test your knowledge with interactive quizzes after each module.</p>
              <div className="quiz-demo">
                <div className="quiz-stat">
                  <span className="quiz-number">12</span>
                  <span className="quiz-label">Completed</span>
                </div>
                <div className="quiz-stat">
                  <span className="quiz-number">92%</span>
                  <span className="quiz-label">Avg Score</span>
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-icon">
                <Award className="icon" />
              </div>
              <h3>Personalized Recommendations</h3>
              <p>Get course suggestions based on your skill level and interests.</p>
              <ul className="recommendations-list">
                <li><CheckCircle2 size={16} className="inline mr-2" /> Advanced React Patterns</li>
                <li><CheckCircle2 size={16} className="inline mr-2" /> API Development with Node.js</li>
                <li><CheckCircle2 size={16} className="inline mr-2" /> Database Design Principles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="learning-faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>

          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-question">
                <span>How long does it take to complete a learning path?</span>
                <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className="faq-answer">
                <p>The duration varies depending on the learning path and your pace. On average, beginner paths take 6-8 weeks, intermediate paths take 10-12 weeks, and advanced paths take 12-16 weeks. You can learn at your own pace and access materials 24/7.</p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>Do I get a certificate after completing a course?</span>
                <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className="faq-answer">
                <p>Yes! Upon successful completion of each course and passing the final assessment, you'll receive a digital certificate that you can share on LinkedIn, your resume, and other professional platforms.</p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>Is there any cost to enroll in courses?</span>
                <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className="faq-answer">
                <p>All our courses are completely free for Sierra Leone youth. We believe in making quality education accessible to everyone. Our program is funded by partnerships with local and international organizations.</p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>What if I need help while learning?</span>
                <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className="faq-answer">
                <p>We provide multiple support channels including instructor office hours, peer study groups, discussion forums, and a dedicated help desk. You're never alone in your learning journey!</p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>Can I switch learning paths if I change my mind?</span>
                <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className="faq-answer">
                <p>Absolutely! You can explore different learning paths at any time. Your progress in each path is saved independently, so you can switch between them or pursue multiple paths simultaneously.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="learning-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Learning Journey?</h2>
            <p>Join thousands of learners who are already transforming their careers.</p>
            <div className="cta-buttons">
              <Link to="/#contact" className="btn btn-primary large">Enroll Now</Link>
              <a href="#categories" className="btn btn-outline large">Browse Courses</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}