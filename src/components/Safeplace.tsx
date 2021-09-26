import React from 'react';
import {SafeAreaView, TouchableOpacity, View, Dimensions} from 'react-native';
import {Text} from '../components/generic/Text';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { faMapMarkerAlt, faClock, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

interface Props {
    safeplace: {};
    showHours: boolean;
    setShowHours: (bool: boolean) => void;
    days: Array<string>;
    modalComment: boolean;
}

export const SafeplaceComponent = ({days, showHours, setShowHours, safeplace}: Props): JSX.Element => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <SafeAreaView>
            <Text style={{margin: 15}} type="h1" color="black" size="xl" testID="safeplaceTitle">{safeplace.name}</Text>
            <View style={{alignSelf: 'stretch', borderBottomWidth: 0.6, borderBottomColor: 'lightgray', width: '100%', marginBottom: 15}} />
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <FontAwesomeIcon icon={faMapMarkerAlt} color={"#1E90FF"} size={(windowHeight/windowWidth)*15} style={{margin: 10}} />
                <Text style={{marginTop: (windowWidth)*0.02, marginLeft: 15}} type="body" color="black" size="m" testID="safeplaceaddress">{safeplace.address}</Text>
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
                        console.log(hours);
                        return (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{marginBottom: 15}}>
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
            
        </SafeAreaView>
    )
}
