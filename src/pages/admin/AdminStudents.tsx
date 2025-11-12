import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Calendar, Award, TrendingUp } from "lucide-react";
import { getCurrentUser } from "@/utils/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminStudents = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  // Demo student data
  const students = [
    {
      id: "1",
      name: "Aminata Kamara",
      email: "aminata.kamara@example.com",
      joinedDate: "2024-01-15",
      enrolledCourses: 3,
      completedCourses: 1,
      progress: 65,
      status: "active"
    },
    {
      id: "2",
      name: "Mohamed Sesay",
      email: "mohamed.sesay@example.com",
      joinedDate: "2024-02-20",
      enrolledCourses: 4,
      completedCourses: 2,
      progress: 80,
      status: "active"
    },
    {
      id: "3",
      name: "Fatmata Koroma",
      email: "fatmata.koroma@example.com",
      joinedDate: "2024-01-10",
      enrolledCourses: 2,
      completedCourses: 0,
      progress: 30,
      status: "active"
    },
    {
      id: "4",
      name: "John Kamara",
      email: "john.kamara@example.com",
      joinedDate: "2024-03-05",
      enrolledCourses: 5,
      completedCourses: 3,
      progress: 90,
      status: "active"
    },
    {
      id: "5",
      name: "Isatu Bangura",
      email: "isatu.bangura@example.com",
      joinedDate: "2024-02-28",
      enrolledCourses: 3,
      completedCourses: 1,
      progress: 55,
      status: "active"
    },
    {
      id: "6",
      name: "Ibrahim Conteh",
      email: "ibrahim.conteh@example.com",
      joinedDate: "2024-01-25",
      enrolledCourses: 2,
      completedCourses: 2,
      progress: 100,
      status: "active"
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 p-4 md:p-8 md:ml-64 pt-16 md:pt-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Student Management</h1>
          <p className="text-muted-foreground">View and manage all registered students</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">15,234</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                  <p className="text-2xl font-bold">12,456</p>
                </div>
                <div className="bg-accent/10 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Completion</p>
                  <p className="text-2xl font-bold">68%</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New This Month</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="bg-accent/10 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Table */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Student</TableHead>
                    <TableHead className="min-w-[200px]">Email</TableHead>
                    <TableHead className="min-w-[120px]">Joined Date</TableHead>
                    <TableHead className="min-w-[100px]">Enrolled</TableHead>
                    <TableHead className="min-w-[100px]">Completed</TableHead>
                    <TableHead className="min-w-[120px]">Progress</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                            alt={student.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{student.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{student.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{student.joinedDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{student.enrolledCourses} courses</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.completedCourses} done</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-accent"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-accent">
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No students found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStudents;
