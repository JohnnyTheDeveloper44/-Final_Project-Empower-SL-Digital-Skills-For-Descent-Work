import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Briefcase, MapPin, Clock, Search, ExternalLink, Lock, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import jobsData from '@/data/slJobs.json';
import { useLanguage } from '@/hooks/useLanguage';
import { hasJobsAccess, getUserProgress } from '@/utils/gamification';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();
  const hasAccess = hasJobsAccess();
  const progress = getUserProgress();

  const filteredJobs = jobsData.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {!hasAccess ? (
          // Locked State
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 animate-fade-in text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                <Lock className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Job Board Locked
              </h1>
              <p className="text-muted-foreground text-lg">
                Complete a course to unlock Sierra Leone tech opportunities
              </p>
            </div>

            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  Unlock Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Complete Any Course</h3>
                      <p className="text-sm text-muted-foreground">
                        Finish all lessons in any course to demonstrate your skills and unlock job opportunities
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Apply Your Skills</h3>
                      <p className="text-sm text-muted-foreground">
                        Access {jobsData.length}+ tech job opportunities in Sierra Leone
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Your Progress</span>
                    <span className="font-semibold">
                      {progress.coursesCompleted} / 1 course completed
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${Math.min(100, progress.coursesCompleted * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {progress.lessonsCompleted} lessons completed across all courses
                  </p>
                </div>

                <div className="pt-4">
                  <Link to="/courses">
                    <Button className="w-full" size="lg">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      Browse Courses
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4 text-center opacity-50">
                What You'll Get Access To
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-50 pointer-events-none">
                <Card>
                  <CardContent className="pt-6">
                    <Briefcase className="h-8 w-8 text-primary mb-2" />
                    <div className="text-2xl font-bold text-primary">{jobsData.length}+</div>
                    <div className="text-sm text-muted-foreground">Tech Jobs</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <MapPin className="h-8 w-8 text-accent mb-2" />
                    <div className="text-2xl font-bold text-accent">Freetown</div>
                    <div className="text-sm text-muted-foreground">Local Opportunities</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <Clock className="h-8 w-8 text-secondary mb-2" />
                    <div className="text-2xl font-bold text-secondary">Le 4M+</div>
                    <div className="text-sm text-muted-foreground">Average Salary</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          // Unlocked State - Original Content
          <>
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-primary" />
            {t('Sierra Leone Tech Jobs')}
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover opportunities to apply your skills in Sierra Leone
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{jobsData.length}</div>
              <div className="text-sm text-muted-foreground">Active Positions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent">Freetown</div>
              <div className="text-sm text-muted-foreground">Primary Location</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary">Le 4M+</div>
              <div className="text-sm text-muted-foreground">Average Salary</div>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-3xl">{job.logo}</div>
                      <div>
                        <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                        <CardDescription className="text-base">{job.company}</CardDescription>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {job.type}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.posted}
                  </div>
                  <div className="font-medium text-primary">
                    {job.salary}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{job.description}</p>

                <div>
                  <div className="text-sm font-medium mb-2">Required Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Requirements:</div>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {job.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full sm:w-auto">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-medium mb-2">No jobs found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
