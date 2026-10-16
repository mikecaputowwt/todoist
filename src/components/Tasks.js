import React, { useEffect, useState } from 'react';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { TagDisplay } from './TagDisplay';
import { useTasks, useTags } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  const { tags } = useTags();
  const [taskTags, setTaskTags] = useState({});

  const projectName = getTitle(projects, selectedProject);

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  useEffect(() => {
    // Map task tags to their full tag objects
    const tagMap = {};
    tasks.forEach(task => {
      if (task.tags && task.tags.length > 0) {
        tagMap[task.id] = task.tags.map(tagId => {
          const tag = tags.find(t => t.docId === tagId);
          return tag ? { name: tag.name, color: tag.color } : null;
        }).filter(t => t !== null);
      }
    });
    setTaskTags(tagMap);
  }, [tasks, tags]);

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>

      <ul className="tasks__list">
        {tasks.map(task => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} taskDesc={task.task} />
            <span>{task.task}</span>
            {taskTags[task.id] && taskTags[task.id].length > 0 && (
              <TagDisplay tags={taskTags[task.id]} />
            )}
          </li>
        ))}
      </ul>

      <AddTask />
    </div>
  );
};