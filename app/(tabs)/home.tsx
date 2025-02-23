import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/constants/Typography';
import ExclamationIcon from '@/assets/icons/Exclamation.svg';
import UserIcon from '@/assets/icons/User.svg';
import Article1Icon from '@/assets/icons/article/Article1.svg';
import Article2Icon from '@/assets/icons/article/Article2.svg';
import Article3Icon from '@/assets/icons/article/Article3.svg';


const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const progressSlides = [
    {
      title: "Your average heart rate has been",
      value: "092",
      description: "bpm",
      color: "#C72323",
    },
    {
      title: "Your heart rate has been consistently",
      value: "LOW",
      description: "",
      color: "#C72323",
    },
    {
      title: "You have been sleeping an average of",
      value: "7 hours 34 minutes",
      description: "",
      color: "#C72323",
    },
  ];

  const renderSlide = ({ item }: { item: any }) => (
    <View style={styles.heartRateCard}>
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={[styles.progressValue, { color: item.color }]}>{item.value}</Text>
      {item.description && <Text style={styles.slideDescription}>{item.description}</Text>}
    </View>
  );

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const articleData = [
    { title: 'How to sleep better?', id: '1', icon: <Article1Icon width={50} height={50} /> },
    { title: 'What are signs of depression?', id: '2', icon: <Article2Icon width={50} height={50} /> },
    { title: 'How to manage stress?', id: '3', icon: <Article3Icon width={50} height={50} /> },
  ];

  return (
    <ScrollView style={styles.container}>
    <View style={styles.greetingContainer}>
      <Text style={styles.greeting}>Good Morning!</Text>
      <UserIcon width={30} height={30} style={styles.userIcon} />
    </View>
    <Text style={styles.userName}>John</Text>

      {/* Carousel for Progress Section */}
      <Text style={styles.sectionTitle}>Progress for the week</Text>
      <FlatList
        data={progressSlides}
        renderItem={renderSlide}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onScroll={handleScroll}
        style={styles.carousel}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.pagination}>
        {progressSlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.activePaginationDot,
            ]}
          />
        ))}
      </View>

      {/* Pending Task Section */}
      <Text style={styles.sectionTitle}>Pending Task</Text>
      <TouchableOpacity style={styles.taskCard} onPress={() => router.replace('/checkin')}>
        <View style={styles.taskContent}>
          <ExclamationIcon width={24} height={24} style={styles.taskIcon} />
          <Text style={styles.taskText}>
            You’ve got a task waiting for you. {"\n"} 
            <Text style={styles.taskHighlight}>Tap to finish it!</Text>
          </Text>
        </View>
      </TouchableOpacity>

      {/* For You Section */}
      <Text style={styles.sectionTitle}>For you</Text>
      <FlatList
        data={articleData}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.articleCard}>
            <Text style={styles.articleTitle}>{item.title}</Text>
            <View style={styles.articleIconContainer}>
              {item.icon}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 70, backgroundColor: '#F9F7F0', flex: 1 },
  greetingContainer: {
    flexDirection: 'row', // Places "Good Morning" and icon in the same row
    justifyContent: 'space-between', // Pushes them apart
    alignItems: 'center', // Aligns them properly
    width: '100%', // Makes sure it spans the full width
  },
  greeting: {
    color: '#333333',
    fontSize: Typography.fontSize.larger,
    fontWeight: '300',
  },
  userIcon: {
    width: 30, 
    height: 30,
  },

  listContainer:{
    margin: 10,
  } , 
  userName: {
    color: '#333333',
    fontSize: Typography.fontSize.larger,
    fontWeight: '600',
    marginBottom: 10,
  },  
  sectionTitle: {
    color: '#333333',
    fontSize: Typography.fontSize.larger,
    fontWeight: '500',
  },  
  // Carousel styles
  carousel: { 
    marginVertical: 0,
  },
  heartRateCard: {
    backgroundColor: '#FAF0D9',
    width: width * 0.8,
    height: 160,
    padding: 20,
    borderRadius: 30,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 4 },
    alignItems: 'flex-start', 
    marginTop: 5,
  },
  slideTitle: {
    color: '#333333',
    fontSize: Typography.fontSize.small,
    fontWeight: '500',
    marginBottom: 5,
  }, 
  progressValue: {     
    color: '#C72323',
    fontSize: Typography.fontSize.extra,
    fontWeight: '800'
  },
  slideDescription: { 
    color: '#333333',
    fontSize: Typography.fontSize.small,
    fontWeight: '800',    
    textAlign: 'center', 
    marginTop: 5, 
  },

  // Pagination styles for the carousel
  pagination: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  paginationDot: {
    height: 6,
    width: 6,
    backgroundColor: '#FFE1A1',
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activePaginationDot: {
    backgroundColor: '#FFAE00',
    width: 20,
    height: 5,
    borderRadius: 10,
  },

  // Pending Task Section
  taskCard: {
    backgroundColor: '#FFAE00',
    borderRadius: 30,
    padding: 16,
    marginBottom: 10,
    marginTop: 10,
  },

  taskContent: {
    flexDirection: 'row', // 🔹 Puts the icon and text in a row
    alignItems: 'center', // 🔹 Centers them vertically
  },

  taskIcon: {
    width: 40 , // Adjust icon size
    height: 40,
    marginRight: 10, // Adds spacing between the icon and text
  },

  taskText: { 
    fontSize: Typography.fontSize.small,
    fontWeight: '600', 
    color: '#fff',
  },

  taskHighlight: {
    fontWeight: '600',
    fontSize: Typography.fontSize.small,
  },

  // For You Section
  articleCard: {
    backgroundColor: '#E0F7FA',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 150,
    height: 200,
    justifyContent: 'space-between', 
    marginTop: 10,
  },
  
  articleTitle: {
    fontSize: Typography.fontSize.small,
    fontWeight: '400',
    textAlign: 'left',
  },
  
});
