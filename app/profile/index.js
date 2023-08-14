import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';


const LOCATION_TASK_NAME = 'background-location-task';

const coordinateList = [];

const ProfilePage = () => {

    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const {status} = await Location.requestBackgroundPermissionsAsync();
        if (status === 'granted') {
            await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                accuracy: Location.Accuracy.High,
                timeInterval: 10000,
                distanceInterval: 0
            });
        }
    };

    TaskManager.defineTask(LOCATION_TASK_NAME, ({data, error}) => {
        if (error) {
            console.log("Error in background location task:", error);
            return;
        }
        if (data) {
            const {locations} = data;
            const {coords} = locations[0];

            coordinateList.push(coords);
            setCoordinates(prevState => [...prevState, coords]);
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <FlatList data={coordinateList} renderItem={({item}) => (
                    <View>
                        <Text>
                            Task Manager Coords List:
                        </Text>
                        <Text>
                            latitude: {item.latitude}
                        </Text>
                        <Text>
                            longitude: {item.longitude}
                        </Text>
                        <Text>
                            --------------------------------
                        </Text>
                    </View>
                )}/>
            </View>
            <StatusBar/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProfilePage;
