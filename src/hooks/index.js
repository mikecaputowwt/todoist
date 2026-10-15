/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
import { useUserValue } from '../context';

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const { userId } = useUserValue();

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', userId);

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY')
          ))
        : selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
              task =>
                moment(task.date, 'DD/MM/YYYY').diff(moment(), 'days') <= 7 &&
                task.archived !== true
            )
          : selectedProject === 'FUTURE'
          ? newTasks.filter(
              task =>
                moment(task.date, 'DD/MM/YYYY').diff(moment(), 'days') > 7 &&
                task.archived !== true
            )
          : newTasks.filter(task => task.archived !== true)
      );
      setArchivedTasks(newTasks.filter(task => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject, userId]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const { userId } = useUserValue();

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', userId)
      .orderBy('projectId')
      .onSnapshot(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          ...project.data(),
          docId: project.id,
        }));

        setProjects(allProjects);
      });

    return () => unsubscribe();
  }, [userId]);

  return { projects, setProjects };
};
