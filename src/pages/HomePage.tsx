import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Briefcase, Code, Users, GraduationCap } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <section id="home" className="hero">
        <div className="parallax-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">Unlock Your Digital Future</h1>
          <p className="hero-description">
            Free digital skills training and real opportunities for Sierra Leone's youth. 
            Learn, grow, and transform your career with us.
          </p>
          <div className="hero-buttons">
            <Link to="/start-learning" className="btn btn-primary">Start Learning</Link>
            <Link to="/explore-opportunities" className="btn btn-secondary">Explore Opportunities</Link>
          </div>
        </div>
      </section>

      <main>
        <section id="features" className="features">
          <div className="container">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-description">Everything you need to build a successful digital career</p>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <BookOpen className="icon" />
                </div>
                <h3>Free Learning Resources</h3>
                <p>Access quality digital skills courses at no cost. From coding to digital marketing.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <TrendingUp className="icon" />
                </div>
                <h3>Success Stories</h3>
                <p>Join hundreds of successful graduates who've transformed their careers.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Briefcase className="icon" />
                </div>
                <h3>Real Opportunities</h3>
                <p>Connect with jobs, scholarships, internships, and training programs.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="statistics">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number" data-target="500" data-suffix="+">0+</div>
                <div className="stat-label">Active Learners</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="50" data-suffix="+">0+</div>
                <div className="stat-label">Free Courses</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="100" data-suffix="+">0+</div>
                <div className="stat-label">Opportunities</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="85" data-suffix="%">0%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials">
          <div className="container">
            <h2 className="section-title">Success Stories</h2>
            <p className="section-description">Hear from those who've transformed their lives</p>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"This platform changed my life. I learned web development for free and now I'm working as a freelance developer!"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <Code className="avatar-icon" />
                  </div>
                  <div className="author-info">
                    <div className="author-name">Mohamed Kamara</div>
                    <div className="author-role">Web Developer</div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"The scholarship opportunities posted here helped me get funding for my studies. Forever grateful!"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <GraduationCap className="avatar-icon" />
                  </div>
                  <div className="author-info">
                    <div className="author-name">Aminata Sesay</div>
                    <div className="author-role">Student</div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"I found my first tech internship through this platform. The support and resources are amazing!"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <Users className="avatar-icon" />
                  </div>
                  <div className="author-info">
                    <div className="author-name">Abdul Bangura</div>
                    <div className="author-role">Software Intern</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq">
          <div className="container">
            <h2 className="section-title">Frequently Asked Questions</h2>

            <div className="faq-list">
              <div className="faq-item">
                <div className="faq-question">
                  <span>Is the training really free?</span>
                  <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <div className="faq-answer">
                  <p>Yes! All our learning resources and courses are completely free. We believe in making digital education accessible to everyone.</p>
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">
                  <span>What kind of opportunities are available?</span>
                  <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <div className="faq-answer">
                  <p>We post job listings, scholarships, internships, training programs, and freelance opportunities specifically for Sierra Leonean youth.</p>
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">
                  <span>Do I need any prior experience?</span>
                  <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <div className="faq-answer">
                  <p>No prior experience needed! We have courses for complete beginners as well as advanced learners.</p>
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">
                  <span>How do I get started?</span>
                  <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <div className="faq-answer">
                  <p>Simply browse our learning resources, pick a course that interests you, and start learning. You can also subscribe to our newsletter for the latest opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="opportunities" className="cta">
          <div className="container">
            <h2>Ready to Explore Opportunities?</h2>
            <p>Join hundreds of youth who are transforming their futures</p>
            <Link to="/explore-opportunities" className="btn btn-primary">Explore Now</Link>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-description">Have questions? We'd love to hear from you!</p>

            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} required></textarea>
              </div>

              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
