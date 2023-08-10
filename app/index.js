import {SafeAreaView, ScrollView, View} from "react-native";
import {Stack, useRouter} from "expo-router";
import {COLORS, icons, images, SIZES} from "../constants";
import {NearbyJobs, PopularJobs, ScreenHeaderBtn, Welcome} from "../components";
import React, {useState} from "react";

const Home = () => {
    const router = useRouter();

    const [search, setSearch] = useState('');

    const handleClickSearch = () => {
        if (search) {
            router.push(`/search/${search}`);
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%'/>
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension='100%'/>
                    ),
                    headerTitle: "",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium,
                    }}>
                    <Welcome
                        searchTerm={search}
                        setSearchTerm={setSearch}
                        handleClick={handleClickSearch}
                    />
                    <PopularJobs/>
                    <NearbyJobs/>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}

export default Home;