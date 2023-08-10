import React from 'react'
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native'
import {useRouter} from "expo-router";
import styles from "../nearby/nearbyjobs.style";
import useFetch from "../../../hook/useFetch";
import {COLORS} from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const NearbyJobs = () => {
    const router = useRouter();

    const {isLoading, data, error} = useFetch('search', {
        query: 'Nearby',
        num_pages: 1
    });

    const handleNavigate = (job) => {
        router.push(`/job-details/${job.job_id}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nearby jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>
                        Show all
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (<ActivityIndicator size={"large"} color={COLORS.primary}/>)
                    : error ? (<Text>Woops! Sorry but, something went wrong</Text>)
                        : (
                            data?.map(job => <NearbyJobCard key={`nearby-job-${job?.job_id}`} job={job}
                                                            handleNavigate={() => handleNavigate(job)}/>)
                        )}
            </View>
        </View>
    )
}

export default NearbyJobs