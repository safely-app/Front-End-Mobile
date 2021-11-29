
import React from 'react';
import {SafeAreaView, TouchableOpacity, View, Dimensions, Modal, ScrollView} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { faMapMarkerAlt, faClock, faChevronDown, faPlusSquare, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {TextInput, Text, Button} from '../components';

interface Props {
    safeplace: {};
    showHours: boolean;
    setShowHours: (bool: boolean) => void;
    days: Array<string>;
    modalComment: boolean;
    setModalComment: (bool: boolean) => void;
    sendComment: (comment: string, idSafeplace: string, grade: number) => void;
    comment: string;
    setComment: (comment: string) => void;
    grade: number;
    setGrade: (grade: number) => void;
    userComments: [];
}

export const SafeplaceComponent = ({userComments, comment, setComment, grade, setGrade, sendComment, modalComment, setModalComment, days, showHours, setShowHours, safeplace}: Props): JSX.Element => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={{margin: 15}} type="h1" color="black" size="xl" testID="safeplaceTitle">{safeplace.name}</Text>
                <View style={{alignSelf: 'stretch', borderBottomWidth: 0.6, borderBottomColor: 'lightgray', width: '100%', marginBottom: 15}} />
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} color={"#1E90FF"} size={(windowHeight/windowWidth)*15} style={{margin: 10}} />
                    <Text style={{marginTop: (windowWidth)*0.02, marginLeft: 15, flex: 1}} type="body" color="black" size="m" testID="safeplaceaddress">{safeplace.address}</Text>
                </View>
                <View style={{alignSelf: 'stretch', borderBottomWidth: 0.6, borderBottomColor: 'lightgray', width: '100%', marginBottom: 15}} />
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <FontAwesomeIcon icon={faClock} color={"#1E90FF"} size={(windowHeight/windowWidth)*15} style={{margin: 10}} />
                    <Text style={{marginTop: (windowWidth)*0.02, marginLeft: 15}} type="body" color="black" size="m" testID="safeplaceaddress">Horaires</Text>
                    <TouchableOpacity
                        onPress={() => {setShowHours(!showHours)}}
                        style={{marginLeft: 15, marginTop: 12}}
                    >
                        <FontAwesomeIcon icon={faChevronDown} color={"#1E90FF"} size={(windowHeight/windowWidth)*10}/>
                    </TouchableOpacity>
                </View>
                {showHours && safeplace && (
                    <View style={{margin: 15, display: 'flex'}}>
                        {safeplace.dayTimetable && safeplace.dayTimetable.map((hours, index) => {
                            return (
                                <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View  style={{marginBottom: 15}}>
                                        <Text>{days[index]}</Text>
                                    </View>
                                    <View>
                                        <Text>{hours}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                )}
                <View style={{alignSelf: 'stretch', borderBottomWidth: 0.6, borderBottomColor: 'lightgray', width: '100%', marginBottom: 15}} />
                <View style={{margin: 15, justifyContent: 'space-around', display: 'flex', alignItems: 'flex-start', flexDirection: 'row'}}>
                    <Text>Notez et partager votre expérience</Text>
                    <TouchableOpacity onPress={() => {setModalComment(true)}}>
                        <FontAwesomeIcon icon={faPlusSquare} color={"#1E90FF"} size={(windowHeight/windowWidth)*20} style={{}} />            
                    </TouchableOpacity>
                </View>
                <Text style={{margin: 15}} type="h1" color="black" size="xl" testID="safeplaceTitleComments">Commentaires</Text>
                <Modal
                    visible={modalComment}
                    animationType={"slide"}
                    transparent={true}
                >
                    <TouchableOpacity
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', flex: 1,justifyContent:'center' }}
                        onPress={() => setModalComment(!modalComment)}>

                        <View style={{backgroundColor: 'white', width: windowWidth*0.8, height: windowHeight*0.7, alignSelf: 'center', borderRadius: windowHeight*0.03, alignItems: 'center', top: windowHeight*0.03}}>
                            <Text style={{marginTop: (windowWidth*0.05)}} type="h1" color="black" size="l">Votre avis</Text>
                            <AirbnbRating
                                count={5}
                                defaultRating={3}
                                size={35}
                                showRating={false}
                                onFinishRating={(number) => {setGrade(number)}}
                                starContainerStyle={{marginTop: 25}}
                            />
                            <TextInput
                                placeholder="Partagez votre expérience de cette safeplace"
                                width="80%"
                                height="35%"
                                type="roundedTextInput"
                                bgColor="transparent"
                                value={comment}
                                onChangeText={(text) => {setComment(text);}}
                                style={{textAlignVertical: 'top', marginTop: 20, borderColor: 'black', borderWidth: 0.5}}
                                multiline={true}
                                testID="inputComment"
                            />
                            <Button
                                style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}
                                width="80%"
                                type="roundedButton"
                                bgColor="blue"
                                testID="buttonSendComment"
                                onPress={() => {comment.length > 0 ? sendComment(comment, safeplace._id, grade) : null;}}
                            >
                                <Text type="body" color="white" size="m">Envoyer</Text>
                            </Button>
                        </View>
                    </TouchableOpacity>
                </Modal>
                {userComments && userComments.length > 0 && userComments.map((comment, index) => {
                    if (comment.safeplaceId === safeplace._id) {
                        return (
                            <View key={"comments" + index} style={{display: 'flex', flexDirection: 'column', margin: 15}}>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <FontAwesomeIcon icon={faUser} color={"#1E90FF"} size={(windowHeight/windowWidth)*15} style={{}} />
                                    <View>
                                        <Text style={{marginLeft: 15}}>Monsieur Inconnu</Text>
                                        <AirbnbRating 
                                            size={10}
                                            defaultRating={comment.grade}
                                            showRating={false}
                                            isDisabled={true}
                                        />
                                    </View>
                                </View>
                                <Text key={index} style={{margin: 15}}>{comment.comment}</Text>
                                <View style={{alignSelf: 'stretch', borderBottomWidth: 0.6, borderBottomColor: 'lightgray', width: '100%', marginBottom: 15, marginTop: 15}} />
                            </View>
                        )
                    }
                })}
            </ScrollView>
        </SafeAreaView>
    )
}
