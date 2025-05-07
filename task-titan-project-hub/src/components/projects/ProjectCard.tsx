
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types";
import { format } from "date-fns";
import { getProjectStats } from "@/lib/data";
import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { progressPercentage, totalTasks, completedTasks, daysLeft } = getProjectStats(project);

  const getDaysLeftText = () => {
    if (daysLeft < 0) return "Overdue";
    if (daysLeft === 0) return "Due today";
    return `${daysLeft} days left`;
  };

  const getDaysLeftClass = () => {
    if (daysLeft < 0) return "text-red-500";
    if (daysLeft < 3) return "text-amber-500";
    return "text-green-500";
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold truncate">
            <Link to={`/projects/${project.id}`} className="hover:text-primary transition-colors">
              {project.title}
            </Link>
          </CardTitle>
          <span className={`text-sm font-medium ${getDaysLeftClass()}`}>
            {getDaysLeftText()}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Progress</span>
            <span className="font-semibold">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="pt-1 text-xs text-muted-foreground flex justify-between">
        <div>
          {completedTasks} of {totalTasks} tasks completed
        </div>
        <div>Due {format(project.deadline, "MMM d, yyyy")}</div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
