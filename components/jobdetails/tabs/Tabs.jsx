import React from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import styles from './tabs.style';
import {SIZES} from "../../../constants";

const TabButton = ({name, activeTab, onHandleSearchType}) => (
    <TouchableOpacity style={styles.btn(name, activeTab)} onPress={onHandleSearchType}>
        <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
);

const Tabs = ({tabs, activeTab, setActiveTab}) => {

    const onHandleSearchType = (item) => {
        setActiveTab(item);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={tabs}
                renderItem={({item}) => (
                    <TabButton name={item} activeTab={activeTab} onHandleSearchType={() => onHandleSearchType(item)}/>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                contentContainerStyle={{columnGap: SIZES.small / 2}}
            />
        </View>
    )
}

export default Tabs