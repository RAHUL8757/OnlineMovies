import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, ImageBackground, TextInput, TouchableWithoutFeedback, FlatList} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Carousel from 'react-native-anchor-carousel';
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons'
   

const Home = (props) => {
  useEffect(() => {
    async function popular() {
      const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=792640e556599718129d2f17e150a3dc&page=20");
      res
        .json()
        .then(res => setgallery(res.results))
        // .catch(err => setErrors(err));
    }
    async function top_rated() {
      const res = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=792640e556599718129d2f17e150a3dc&page=20");
      res
        .json()
        .then(res => setList(res.results))
        // .catch(err => setErrors(err));
    }
    async function discover() {
      const res = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=792640e556599718129d2f17e150a3dc&page=20");
      res
        .json()
        .then(res => setDiscoverMovies(res.results))
        // .catch(err => setErrors(err));
    }
    async function genres() {
      const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=792640e556599718129d2f17e150a3dc");
      res
        .json()
        .then(res => setGenresMovies(res.genres))
        // .catch(err => setErrors(err));
    }
    top_rated();
    popular();
    discover();
    genres();
  });
  const [gallery, setgallery] = useState([]);
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [genresMovies, setGenresMovies] = useState([]);
  const [background,setBackground] = useState({
    uri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
    title: 'Avengers: End Game',
    stat: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
    desc: 'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.'
  })

  const [list, setList] = useState([]);

  const carouselRef = useRef(null);

  const {width, height} = Dimensions.get('window')

  const routeRecents = () => {
      props.navigation.navigate('Recents')
  }
  const opengenricmovies = (id) => {
    debugger
    props.navigation.navigate('GenresScreen')
  }
  const renderItem = ({item, index}) => {
    return (
    <View>
          <TouchableOpacity
            onPress={() => 
                { 
                carouselRef.current.scrollToIndex(index);
                setBackground({
                    uri: "https://image.tmdb.org/t/p/w500"+item.poster_path,
                    name: item.title,
                    stat: item.release_date,
                    desc: item.overview
                })
                }
            }
      >
        <Image source={{uri: "https://image.tmdb.org/t/p/w500"+item.poster_path}} style={styles.carouselImage} />
        <Text style={styles.carouselText}>{item.title}</Text>
        {/* <MaterialIcons name='library-add' size={30} color='white' style={styles.carouselIcon} /> */}
      </TouchableOpacity>
     
    </View>
    
    )
  }


  return (
    <ScrollView style={{backgroundColor: '#000'}} blurRadius={100}>
        
        <StatusBar backgroundColor='#000' barStyle='light-content' />

        <View style={styles.carouselContentContainer}>
          <View style={{...StyleSheet.absoluteFill, backgroundColor: '#000'}}>
            <ImageBackground source={{ uri: background.uri  }} style={styles.ImageBg} blurRadius={10}>
              <View style={styles.SearchboxContainer}>
                <TextInput
                placeholder='Search Movies'
                placeholderTextColor='#666'
                style={styles.Searchbox}
                >
              </TextInput>
                <Feather name='search' size={22} color='#666' style={styles.SearchboxIcon} />
              </View>
            <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold', marginLeft: 10, marginVertical:     10 }}>Popular Movies</Text>
            <View style={styles.carouselContainerView}>
                <Carousel style={styles.carousel}
                data={gallery}
                renderItem={renderItem}
                itemWidth={200}
                containerWidth={width - 20} 
                separatorWidth={0}
                ref={carouselRef}
                inActiveOpacity={0.4}
                //pagingEnable={false}
                //minScrollDistance={20}
            />
      </View>


      <View style={styles.movieInfoContainer}>
        <View style={{ justifyContent: 'center'}}>
            <Text style={styles.movieName}>{background.name}</Text>
            <Text style={styles.movieStat}>{background.stat}</Text>
        </View>
      </View>
      <View style={styles.playInfoContainer}>
      <TouchableOpacity style={styles.playIconContainer}>
            <FontAwesome5  name='play' size={22} color='#02ad94' style={{marginLeft: 4}} />
        </TouchableOpacity>
        </View>
      <View style={{paddingHorizontal: 14, marginTop: 4}}>
          <Text style={{color: 'white', opacity: 0.8, lineHeight: 20}}>
              {background.desc}
          </Text>
      </View>
   </ImageBackground>
 </View>
</View>

    <View style={{marginHorizontal: 14,paddingVertical:20}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',marginBottom: 24, marginTop: 36}}>
        <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold',}}>Genres Movies</Text>
        {/* <Text style={{color: '#02ad94', fontSize: 14, fontWeight: 'normal'}}>View All</Text> */}
        </View>
      
        <FlatList 
        style={{marginBottom: 30}}
        horizontal={true}
        data={genresMovies}
        renderItem={({item}) => {
          return(
            <View style={{flexDirection:"row"}}>
            <View style={{height:10, width:10}} /> 
            <TouchableOpacity onPress={opengenricmovies(item.id)}>
              <View style={{height:100, width:100, backgroundColor: '#02ad94',opacity: 0.8,borderRadius:50,justifyContent:"center"}}>
              <View style={{flexDirection:"row",justifyContent:"center"}}>
              <Text style={{alignContent:"center",color:"#fff",fontWeight:"bold",fontSize:15}}>{item.name}</Text>
              </View>
              
              </View>
            </TouchableOpacity>
            <View style={{height:10, width:10}} /> 
            </View>
          )
        }}
        />
        <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold',marginBottom: 24}}>Continue Watching</Text>
        <ImageBackground
        style={{height: 250, width: '100%', backgroundColor: '000'}}
        resizeMode='cover'
        source={{uri: 'https://image.tmdb.org/t/p/w500/hVSOXCBuPXw8yXqbNfwU9ogIp88.jpg'
    }}
        >

        <Text style={{color: 'white', padding: 14}}>A Woman's island getaway with her boyfriend is thrown for a loop when he forgets to take his prescription medications along.</Text>

          <TouchableOpacity style={{...styles.playIconContainer, position: 'absolute',top: '40%', right: '40%'}}>
            <FontAwesome5  name='play' size={22} color='#02ad94' style={{marginLeft: 4}} />
        </TouchableOpacity>
        {/* <View style={{height: 4, backgroundColor: '#666', position: 'absolute', bottom: 0, width: '100%'}}></View>
        <View style={{height: 4, borderRadius: 10, backgroundColor: '#02ad94', position: 'absolute', bottom: 0, width: '40%'}}></View> */}
        </ImageBackground>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',marginBottom: 24, marginTop: 36}}>
        <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold',}}>Top Reted Movies</Text>
        {/* <Text style={{color: '#02ad94', fontSize: 14, fontWeight: 'normal'}}>View All</Text> */}
        </View>
      
        <FlatList 
        style={{marginBottom: 30}}
        horizontal={true}
        data={list}
        renderItem={({item}) => {
          return(
            <TouchableOpacity style={{marginRight: 20}}>
              <Image source={{uri: "https://image.tmdb.org/t/p/w500"+item.poster_path}} style={{height: 300, width: 200}} />
              <View style={{position: "absolute", height: 5, width: '100%', backgroundColor: '#02ad94',opacity: 0.8}}></View>
              <FontAwesome5  name='play' size={38} color='#fff' style={{position: 'absolute',top: '45%', left: '45%',opacity: 0.9}} />
            </TouchableOpacity>
          )
        }}
        />
         <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',marginBottom: 24, marginTop: 36}}>
        <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold',}}>List of Discover Movies</Text>
        <Text style={{color: '#02ad94', fontSize: 14, fontWeight: 'normal'}}>View All</Text>
        </View>
      
        <FlatList 
        style={{marginBottom: 30}}
        horizontal={true}
        data={discoverMovies}
        renderItem={({item}) => {
          return(
            <TouchableOpacity style={{marginRight: 20}}>
              <Image source={{uri: "https://image.tmdb.org/t/p/w500"+item.poster_path}} style={{height: 300, width: 200}} />
              <View style={{position: "absolute", height: 5, width: '100%', backgroundColor: '#02ad94',opacity: 0.8}}></View>
              <FontAwesome5  name='play' size={38} color='#fff' style={{position: 'absolute',top: '45%', left: '45%',opacity: 0.9}} />
            </TouchableOpacity>
          )
        }}
        />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({


// CAROUSEL STYLES

carouselImage: {
    width: 200, 
    height: 320, 
    borderRadius: 10, 
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)'
},
carouselText: {
    paddingLeft: 14,
    color: 'white', 
    position: 'absolute', 
    bottom: 10, 
    left: 2, 
    fontWeight: 'bold'
},
carouselIcon: {
    position: 'absolute', 
    top: 15, 
    right: 15
},
carouselContentContainer: {
    flex: 1,
    backgroundColor: '#000',
    height: 800,
    paddingHorizontal: 14
  },
SearchboxContainer: {
    flexDirection: 'row',
    marginVertical: 20, 
    width: '95%',
    alignSelf: 'center', 
    backgroundColor: '#fff', 
    elevation: 10,
    borderRadius: 4,
    top:10
  },
  Searchbox: {
    padding: 12,
    paddingLeft: 20,
    fontSize: 16,
  },
  SearchboxIcon: {
    position: 'absolute', 
    right: 20, 
    top: 14
  },
  ImageBg: {
    flex: 1,
    height: null,
    width: null,
    opacity: 1,
    justifyContent: 'flex-start', 
    padding:10 
  },
  carouselContainerView: {
    width: '100%',
    height:350 ,
    justifyContent: 'center',
    alignItems: 'center',
},
  carousel: {
    flex:1,
    overflow: 'visible',
} ,
movieInfoContainer: {
  flexDirection: 'row', 
  marginTop: 16, 
  justifyContent: 'space-between', 
  width: Dimensions.get('window').width - 14
},
playInfoContainer: {
  flexDirection: 'row',
  justifyContent:'flex-end', 
  width: Dimensions.get('window').width - 14
},
movieName: {
  paddingLeft: 14,
  color: 'white', 
  fontWeight: 'bold', 
  fontSize: 20,
  marginBottom: 6
},
movieStat: {
  paddingLeft: 14,
  color: 'white', 
  fontWeight: 'bold', 
  fontSize: 14, 
  opacity: 0.8
},
playIconContainer: {
  backgroundColor: '#212121',
  padding: 18,
  borderRadius: 40,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 25,
  borderWidth: 4,
  borderColor: 'rgba(2, 173, 148, 0.2)',
  marginBottom: 14
}
});

export default Home;