import {ActivityIndicator, Alert, RefreshControl, SafeAreaView, ScrollView, Text, View, Share} from "react-native";
import {Stack, useRouter, useSearchParams} from "expo-router";
import useFetch from "../../hook/useFetch";
import {COLORS, icons, SIZES} from "../../constants";
import {Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from "../../components";
import {useCallback, useState} from "react";

const tabs = ["About", "Qualification", "Responsibilities"]

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();

    const {data, isLoading, error, refetch} = useFetch('job-details', {
        job_id: params.id
    });

    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, []);

    const handleShare = async () => {
        try {
            await Share.share({
                message: data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'
            });
        } catch (error) {
            Alert.alert('Something went wrong, please try again.');
            console.log(error);
        }
    }

    const displayTabContent = () => {
        switch (activeTab) {
            case tabs[1]:
                return <Specifics title={tabs[1]}
                                  points={data[0].job_highlights?.Qualifications ?? ['N/A']}/>
            case tabs[0]:
                return <JobAbout info={data[0].job_description ?? "No data provided"}
                />
            case tabs[2]:
                return <Specifics title={tabs[2]}
                                  points={data[0].job_highlights?.Responsibilities ?? ['N/A']}/>
            default:
                break;
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.left}
                                         dimension={"60%"}
                                         handlePress={() => router.back()}/>
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={icons.share}
                                         dimension={"60%"}
                                         handlePress={handleShare}
                        />
                    ),
                    headerTitle: ''
                }}/>
            <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                {isLoading ? (<ActivityIndicator size={"large"} color={COLORS.primary}/>)
                    : error ? (<Text>The something went wrong</Text>)
                        : data.length === 0 ? (<Text>No data</Text>) :
                            <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                                <Company
                                    companyLogo={data[0].employer_logo}
                                    jobTitle={data[0].job_title}
                                    companyName={data[0].employer_name}
                                    location={data[0].job_country}
                                />
                                <JobTabs
                                    tabs={tabs}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />
                                {displayTabContent()}
                            </View>
                }
            </ScrollView>
            <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}/>
        </SafeAreaView>
    );
}

export default JobDetails;