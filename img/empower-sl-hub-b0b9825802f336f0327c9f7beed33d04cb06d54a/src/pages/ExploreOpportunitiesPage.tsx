import { Link } from 'react-router-dom';
import { Code, BarChart3, Palette, Smartphone, Building2, Clock, DollarSign, Calendar, MessageCircle, Users, Mic, Award, Shield, Brain, Cloud, Lock } from 'lucide-react';

export default function ExploreOpportunitiesPage() {
  return (
    <main className="opportunities-page">
      {/* Opportunities Overview */}
      <section className="opportunities-hero">
        <div className="parallax-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">Discover Opportunities After Learning</h1>
          <p className="hero-description">
            Transform your skills into real-world success. Explore careers, internships, certifications, 
            and networking opportunities that will accelerate your professional growth.
          </p>
        </div>
      </section>

      {/* Career Pathways */}
      <section className="career-pathways">
        <div className="container">
          <h2 className="section-title">Career <span className="gradient-text">Pathways</span></h2>
          <p className="section-description">Explore career options aligned with your skills</p>

          <div className="careers-grid">
            <div className="career-card">
              <div className="career-icon">
                <Code className="icon" />
              </div>
              <h3>Software Engineer</h3>
              <div className="career-stats">
                <div className="career-stat">
                  <span className="stat-label">Avg Salary</span>
                  <span className="stat-value">$85,000/yr</span>
                </div>
                <div className="career-stat">
                  <span className="stat-label">Job Growth</span>
                  <span className="stat-value growth-positive">+22%</span>
                </div>
              </div>
              <p className="career-description">
                Design, develop, and maintain software applications. Work with modern technologies and solve complex problems.
              </p>
              <div className="career-skills">
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">React</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Git</span>
              </div>
              <Link to="/start-learning" className="career-link">View Related Courses →</Link>
            </div>

            <div className="career-card">
              <div className="career-icon">
                <BarChart3 className="icon" />
              </div>
              <h3>Data Analyst</h3>
              <div className="career-stats">
                <div className="career-stat">
                  <span className="stat-label">Avg Salary</span>
                  <span className="stat-value">$70,000/yr</span>
                </div>
                <div className="career-stat">
                  <span className="stat-label">Job Growth</span>
                  <span className="stat-value growth-positive">+25%</span>
                </div>
              </div>
              <p className="career-description">
                Interpret data, analyze results, and provide actionable insights to drive business decisions.
              </p>
              <div className="career-skills">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Tableau</span>
                <span className="skill-tag">Excel</span>
              </div>
              <Link to="/start-learning" className="career-link">View Related Courses →</Link>
            </div>

            <div className="career-card">
              <div className="career-icon">
                <Palette className="icon" />
              </div>
              <h3>UX Designer</h3>
              <div className="career-stats">
                <div className="career-stat">
                  <span className="stat-label">Avg Salary</span>
                  <span className="stat-value">$75,000/yr</span>
                </div>
                <div className="career-stat">
                  <span className="stat-label">Job Growth</span>
                  <span className="stat-value growth-positive">+18%</span>
                </div>
              </div>
              <p className="career-description">
                Create intuitive and engaging user experiences through research, wireframing, and prototyping.
              </p>
              <div className="career-skills">
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">UI Design</span>
                <span className="skill-tag">Research</span>
                <span className="skill-tag">Prototyping</span>
              </div>
              <Link to="/start-learning" className="career-link">View Related Courses →</Link>
            </div>

            <div className="career-card">
              <div className="career-icon">
                <Smartphone className="icon" />
              </div>
              <h3>Digital Marketer</h3>
              <div className="career-stats">
                <div className="career-stat">
                  <span className="stat-label">Avg Salary</span>
                  <span className="stat-value">$65,000/yr</span>
                </div>
                <div className="career-stat">
                  <span className="stat-label">Job Growth</span>
                  <span className="stat-value growth-positive">+20%</span>
                </div>
              </div>
              <p className="career-description">
                Plan and execute digital marketing campaigns across multiple channels to drive business growth.
              </p>
              <div className="career-skills">
                <span className="skill-tag">SEO</span>
                <span className="skill-tag">Social Media</span>
                <span className="skill-tag">Content</span>
                <span className="skill-tag">Analytics</span>
              </div>
              <Link to="/start-learning" className="career-link">View Related Courses →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internships & Projects */}
      <section className="internships-section">
        <div className="container">
          <h2 className="section-title">Internships & <span className="gradient-text">Projects</span></h2>
          <p className="section-description">Gain hands-on experience with real-world projects</p>

          <div className="internships-grid">
            <div className="internship-card">
              <div className="internship-badge">Remote</div>
              <h3>Frontend Development Internship</h3>
              <div className="internship-company">
                <div className="company-logo">
                  <Building2 className="company-icon" />
                </div>
                <div className="company-info">
                  <span className="company-name">Tech Innovations</span>
                  <span className="company-location">Freetown, Sierra Leone</span>
                </div>
              </div>
              <p>Build responsive web applications using React and modern frontend technologies.</p>
              <div className="internship-details">
                <span className="detail-item"><Clock size={16} className="inline mr-1" /> 3 months</span>
                <span className="detail-item"><DollarSign size={16} className="inline mr-1" /> Paid</span>
                <span className="detail-item"><Calendar size={16} className="inline mr-1" /> Starts June 2025</span>
              </div>
              <button className="btn btn-primary full-width">Apply Now</button>
            </div>

            <div className="internship-card">
              <div className="internship-badge">On-site</div>
              <h3>Data Analytics Project</h3>
              <div className="internship-company">
                <div className="company-logo">
                  <BarChart3 className="company-icon" />
                </div>
                <div className="company-info">
                  <span className="company-name">DataCorp SL</span>
                  <span className="company-location">Freetown, Sierra Leone</span>
                </div>
              </div>
              <p>Work on real business data to provide insights and data-driven recommendations.</p>
              <div className="internship-details">
                <span className="detail-item"><Clock size={16} className="inline mr-1" /> 2 months</span>
                <span className="detail-item"><DollarSign size={16} className="inline mr-1" /> Stipend</span>
                <span className="detail-item"><Calendar size={16} className="inline mr-1" /> Flexible start</span>
              </div>
              <button className="btn btn-primary full-width">Apply Now</button>
            </div>

            <div className="internship-card">
              <div className="internship-badge">Hybrid</div>
              <h3>Mentorship Program</h3>
              <div className="internship-company">
                <div className="company-logo">
                  <Users className="company-icon" />
                </div>
                <div className="company-info">
                  <span className="company-name">Empower SL</span>
                  <span className="company-location">Sierra Leone</span>
                </div>
              </div>
              <p>Get paired with industry professionals for one-on-one guidance and career advice.</p>
              <div className="internship-details">
                <span className="detail-item"><Clock size={16} className="inline mr-1" /> 6 months</span>
                <span className="detail-item"><Award size={16} className="inline mr-1" /> Free</span>
                <span className="detail-item"><Calendar size={16} className="inline mr-1" /> Rolling admission</span>
              </div>
              <button className="btn btn-primary full-width">Join Program</button>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Recognition */}
      <section className="certifications-section">
        <div className="container">
          <h2 className="section-title">Certifications & <span className="gradient-text">Recognition</span></h2>
          <p className="section-description">Earn credentials that boost your career prospects</p>

          <div className="certifications-grid">
            <div className="certification-card">
              <div className="cert-badge">
                <Award className="cert-icon" />
              </div>
              <h3>Professional Web Developer</h3>
              <p>Industry-recognized certification proving your expertise in modern web development technologies.</p>
              <ul className="cert-benefits">
                <li>✓ Verified digital certificate</li>
                <li>✓ LinkedIn profile badge</li>
                <li>✓ Priority job matching</li>
                <li>✓ Alumni network access</li>
              </ul>
              <div className="cert-partners">
                <span className="partner-label">Recognized by:</span>
                <div className="partner-logos">
                  <span className="partner-logo">🏢</span>
                  <span className="partner-logo">🏭</span>
                  <span className="partner-logo">🏛️</span>
                </div>
              </div>
            </div>

            <div className="certification-card">
              <div className="cert-badge">
                <Award className="cert-icon" />
              </div>
              <h3>Data Science Specialist</h3>
              <p>Demonstrate your data analysis and machine learning skills with this comprehensive certification.</p>
              <ul className="cert-benefits">
                <li>✓ Portfolio of projects</li>
                <li>✓ Technical interview prep</li>
                <li>✓ Salary negotiation guide</li>
                <li>✓ Career coaching sessions</li>
              </ul>
              <div className="cert-partners">
                <span className="partner-label">Partnerships with:</span>
                <div className="partner-logos">
                  <span className="partner-logo">🎓</span>
                  <span className="partner-logo">🏢</span>
                  <span className="partner-logo">💼</span>
                </div>
              </div>
            </div>

            <div className="certification-card">
              <div className="cert-badge">
                <Award className="cert-icon" />
              </div>
              <h3>Digital Marketing Expert</h3>
              <p>Validate your marketing expertise and stand out in the competitive digital landscape.</p>
              <ul className="cert-benefits">
                <li>✓ Case study portfolio</li>
                <li>✓ Industry connections</li>
                <li>✓ Freelance platform access</li>
                <li>✓ Marketing toolkit</li>
              </ul>
              <div className="cert-partners">
                <span className="partner-label">Endorsed by:</span>
                <div className="partner-logos">
                  <span className="partner-logo">📱</span>
                  <span className="partner-logo">🎯</span>
                  <span className="partner-logo">🚀</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Networking & Community */}
      <section className="networking-section">
        <div className="container">
          <h2 className="section-title">Networking & <span className="gradient-text">Community</span></h2>
          <p className="section-description">Connect with peers, mentors, and industry leaders</p>

          <div className="networking-grid">
            <div className="networking-card">
              <div className="networking-icon">
                <MessageCircle className="icon" />
              </div>
              <h3>Discussion Forums</h3>
              <p>Join vibrant communities where learners and professionals share knowledge and support.</p>
              <div className="networking-stats">
                <span className="network-stat">5,000+ Members</span>
                <span className="network-stat">Active Daily</span>
              </div>
              <button className="btn btn-primary">Join Forum</button>
            </div>

            <div className="networking-card">
              <div className="networking-icon">
                <Users className="icon" />
              </div>
              <h3>Professional Network</h3>
              <p>Build connections with alumni working at top companies across various industries.</p>
              <div className="networking-stats">
                <span className="network-stat">1,200+ Alumni</span>
                <span className="network-stat">50+ Companies</span>
              </div>
              <button className="btn btn-primary">Connect Now</button>
            </div>

            <div className="networking-card">
              <div className="networking-icon">
                <Mic className="icon" />
              </div>
              <h3>Events & Webinars</h3>
              <p>Attend workshops, tech talks, and networking events with industry experts.</p>
              <div className="networking-stats">
                <span className="network-stat">Monthly Events</span>
                <span className="network-stat">Expert Speakers</span>
              </div>
              <button className="btn btn-primary">View Events</button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Market Insights */}
      <section className="market-insights">
        <div className="container">
          <h2 className="section-title">Job Market <span className="gradient-text">Insights</span></h2>
          <p className="section-description">Stay informed about industry trends and in-demand skills</p>

          <div className="insights-grid">
            <div className="insight-card">
              <h3>Most In-Demand Skills 2025</h3>
              <div className="skills-chart">
                <div className="chart-item">
                  <div className="chart-bar" style={{width: '90%'}}>
                    <span className="chart-label">JavaScript/React</span>
                    <span className="chart-value">90%</span>
                  </div>
                </div>
                <div className="chart-item">
                  <div className="chart-bar" style={{width: '85%'}}>
                    <span className="chart-label">Python</span>
                    <span className="chart-value">85%</span>
                  </div>
                </div>
                <div className="chart-item">
                  <div className="chart-bar" style={{width: '80%'}}>
                    <span className="chart-label">Data Analysis</span>
                    <span className="chart-value">80%</span>
                  </div>
                </div>
                <div className="chart-item">
                  <div className="chart-bar" style={{width: '75%'}}>
                    <span className="chart-label">Cloud Computing</span>
                    <span className="chart-value">75%</span>
                  </div>
                </div>
                <div className="chart-item">
                  <div className="chart-bar" style={{width: '70%'}}>
                    <span className="chart-label">UI/UX Design</span>
                    <span className="chart-value">70%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="insight-card">
              <h3>Emerging Technologies</h3>
              <div className="emerging-tech">
                <div className="tech-item">
                  <div className="tech-icon">
                    <Brain className="tech-svg-icon" />
                  </div>
                  <div className="tech-info">
                    <h4>Artificial Intelligence</h4>
                    <span className="tech-growth">+150% demand growth</span>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon">
                    <Shield className="tech-svg-icon" />
                  </div>
                  <div className="tech-info">
                    <h4>Blockchain</h4>
                    <span className="tech-growth">+120% demand growth</span>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon">
                    <Cloud className="tech-svg-icon" />
                  </div>
                  <div className="tech-info">
                    <h4>Cloud Native</h4>
                    <span className="tech-growth">+95% demand growth</span>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon">
                    <Lock className="tech-svg-icon" />
                  </div>
                  <div className="tech-info">
                    <h4>Cybersecurity</h4>
                    <span className="tech-growth">+85% demand growth</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="insight-card">
              <h3>Industry Outlook</h3>
              <div className="industry-stats">
                <div className="stat-box">
                  <div className="stat-number">2.5M</div>
                  <div className="stat-label">Tech Jobs by 2026</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">$95K</div>
                  <div className="stat-label">Average Starting Salary</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">78%</div>
                  <div className="stat-label">Remote Work Options</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="opportunities-cta">
        <div className="container">
          <h2>Ready to Seize Your Opportunity?</h2>
          <p>Start learning today and unlock endless possibilities tomorrow</p>
          <div className="cta-buttons">
            <Link to="/start-learning" className="btn btn-primary">View Courses to Boost Career</Link>
            <button className="btn btn-outline">Apply for Internship</button>
            <button className="btn btn-outline">Join Community</button>
          </div>
        </div>
      </section>
    </main>
  );
}
