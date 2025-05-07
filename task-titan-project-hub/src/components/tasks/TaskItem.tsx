
import React from "react";
import { Task } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const getStatusClass = () => {
    switch (task.status) {
      case "todo": return "bg-status-todo";
      case "progress": return "bg-status-progress";
      case "done": return "bg-status-done";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (task.status) {
      case "todo": return "To Do";
      case "progress": return "In Progress";
      case "done": return "Done";
      default: return "Unknown";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex justify-between items-center">
        <div className="space-y-1">
          <h4 className="font-medium">{task.title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
        </div>
        <div className="flex items-center space-x-3">
          {task.assignee && (
            <div className="flex items-center text-sm">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                <AvatarFallback>{task.assignee.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">{task.assignee.name}</span>
            </div>
          )}
          <Badge className={getStatusClass()}>{getStatusText()}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
