import React, {useEffect, useState} from 'react';
import {SafeplaceComponent} from '../components/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import {safeplaceServices} from '../services';
import {useSelector} from 'react-redux';

export const Safeplace = (): JSX.Element => {

    const navigation = useNavigation();
    const route = useRoute();
    const [safeplace, setSafeplace] = useState<{}>({});
    const [showHours, setShowHours] = useState<boolean>(false);
    const days: Array<string> = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const [modalComment, setModalComment] = useState<boolean>(false);
    const {credentials} = useSelector((state: RootState) => state.user);
    const [comment, setComment] = useState<string>("");
    const [grade, setGrade] = useState<number>(3);
    const [userComments, setUserComments] = useState<[]>([]);

    useEffect(() => {
        safeplaceServices.getSafeplaceId(route.params.id)
        .then((res) => {
            setSafeplace(res.data);
            safeplaceServices.getCommentSafeplace()
            .then((res) => {
                console.log(res.data);
                setUserComments(res.data);
            })
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    }, [])

    const sendComment = (comment: string, idSafeplace: string, grade: number) => {
        console.log(credentials);
        safeplaceServices.setCommentSafeplace(comment, idSafeplace, credentials._id, grade, credentials.token)
        .then((res) => {
            console.log(res.data);
            setModalComment(false);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
    }

    return (
        <>
            <SafeplaceComponent
                safeplace={safeplace}
                showHours={showHours}
                setShowHours={setShowHours}
                days={days}
                modalComment={modalComment}
                setModalComment={setModalComment}
                sendComment={sendComment}
                comment={comment}
                setComment={setComment}
                grade={grade}
                setGrade={setGrade}
                userComments={userComments}
            />
        </>
     );
};
