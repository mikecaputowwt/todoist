import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

export const useTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('tags')
      .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw')
      .orderBy('name')
      .onSnapshot(snapshot => {
        const allTags = snapshot.docs.map(tag => ({
          ...tag.data(),
          docId: tag.id,
        }));

        setTags(allTags);
      });

    return () => unsubscribe();
  }, []);

  return { tags, setTags };
};