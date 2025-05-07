
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProject } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import TaskItem from "@/components/tasks/TaskItem";
import { ArrowLeft, Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { getProjectStats } from "@/lib/data";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id!),
  });

  if (isLoading) {
    return <div className="py-10 text-center">Loading project...</div>;
  }

  if (!project) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-semibold">Project not found</h2>
        <Link to="/" className="mt-4 inline-block text-primary">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const { progressPercentage } = getProjectStats(project);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="outline" size="icon">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{project.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                <p>{project.description}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Deadline</h3>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-muted-foreground" />
                    <span>{format(new Date(project.deadline), "MMM d, yyyy")}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Progress</h3>
                  <div className="space-y-2">
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="text-sm text-muted-foreground">
                      {progressPercentage}% complete
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <Button size="sm">
              <Plus size={16} className="mr-2" />
              Add Task
            </Button>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="todo">To Do</TabsTrigger>
              <TabsTrigger value="progress">In Progress</TabsTrigger>
              <TabsTrigger value="done">Done</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-3">
              {project.tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </TabsContent>
            
            <TabsContent value="todo" className="space-y-3">
              {project.tasks
                .filter((task) => task.status === "todo")
                .map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-3">
              {project.tasks
                .filter((task) => task.status === "progress")
                .map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
            </TabsContent>
            
            <TabsContent value="done" className="space-y-3">
              {project.tasks
                .filter((task) => task.status === "done")
                .map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Total Tasks</div>
                <div className="font-semibold">{project.tasks.length}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Completed Tasks</div>
                <div className="font-semibold">
                  {project.tasks.filter((task) => task.status === "done").length}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">To Do Tasks</div>
                <div className="font-semibold">
                  {project.tasks.filter((task) => task.status === "todo").length}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">In Progress Tasks</div>
                <div className="font-semibold">
                  {project.tasks.filter((task) => task.status === "progress").length}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from(
                new Set(project.tasks.filter(t => t.assignee).map(t => t.assignee!.id))
              ).map((userId) => {
                const user = project.tasks.find(t => t.assignee?.id === userId)?.assignee!;
                return (
                  <div key={userId} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.role}</div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
