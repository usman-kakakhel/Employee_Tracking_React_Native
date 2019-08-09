/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Platform
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-community/async-storage';
import BackgroundTimer from 'react-native-background-timer';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import * as RNEP from '@estimote/react-native-proximity';
import PieChart from 'react-native-pie-chart';
import SystemSetting from 'react-native-system-setting';
import notifications from "react-native-push-notification";



this.stopService = async() => {
  await VIForegroundService.stopService();
}

const App = () => {
  if (!check){a = new Beacons();}
  return a.generate();
}

class dataBeacon{
  visitedTimes1= 0;
  visitedTimes2= 0;
  visitedTimes3= 0;
  visitedTimes4=0;
  maxTime1= 0;
  maxTime2= 0;
  maxTime3= 0;
  maxTime4= 0;
  currTime1= 0;
  currTime2=0;
  currTime3=0;
  currTime4= 0;
  totalTime1= 1;
  totalTime2= 1;
  totalTime3= 1;
  totalTime4= 1;
  en1=0;
  en2=0;
  en3=0;
  en4=0;
  time1 = 0;
  time2 = 0;
  time3 = 0;
  time4 = 0;
  copy(newVal){
    this.currTime1 = newVal.currTime1;
    this.currTime2 = newVal.currTime2;
    this.currTime3 = newVal.currTime3;
    this.currTime4 = newVal.currTime4;
    this.en1 = newVal.en1;
    this.en2 = newVal.en2;
    this.en3 = newVal.en3;
    this.en4 = newVal.en4;
    this.maxTime1 = newVal.maxTime1;
    this.maxTime2 = newVal.maxTime2;
    this.maxTime3 = newVal.maxTime3;
    this.maxTime4 = newVal.maxTime4;
    this.time1 = newVal.time1;
    this.time2 = newVal.time2;
    this.time3 = newVal.time3;
    this.time4 = newVal.time4;
    this.totalTime1 = newVal.totalTime1;
    this.totalTime2 = newVal.totalTime2;
    this.totalTime3 = newVal.totalTime3;
    this.totalTime4 = newVal.totalTime4;
    this.visitedTimes1 = newVal.visitedTimes1;
    this.visitedTimes2 = newVal.visitedTimes2;
    this.visitedTimes3 = newVal.visitedTimes3;
    this.visitedTimes4 = newVal.visitedTimes4;
  }
}
this.check = false;
this.loadCheck = false;
this.blueCheck = false;
this.locCheck = false;
this.volSettings = {
  music : 0,
  call : 0,
  system : 0,
  ring : 0,
  alarm : 0,
  notification : 0,
};

class Beacons {
  constructor(){
    this.initialData = new dataBeacon();
    this.beaconData = new dataBeacon();
    if (!check){
      SystemSetting.isLocationEnabled().then((state) => {
        if (!state){
          SystemSetting.switchLocation(() => {});
        }
      });
      SystemSetting.isBluetoothEnabled().then((state) => {
        if (!state){
          SystemSetting.switchBluetooth(async () => { SystemSetting.isBluetoothEnabled().then(() => {
            this.startAllSystems();
            })});
        }
        else{
          this.startAllSystems();
        }
      });
    }
    else{this.startAllSystems();}
  }
  
  connectionCheck(){
    SystemSetting.isLocationEnabled().then((state) => {
      if (!state){
        this.putEnablersToZero();
        if (!locCheck){
          notifications.localNotification({
            id: "1",
            message: "Location is turned off"
          })
          this.stop();
          locCheck = true;
        }
      }
      else{
        if (locCheck){
          locCheck = false;
          this.wait = BackgroundTimer.setTimeout(() => {this.startAllSystems();}, 2000);
        }
      }
    });

    SystemSetting.isBluetoothEnabled().then((state) => {
      if (!state){
        this.putEnablersToZero();
        if (!blueCheck){
          notifications.localNotification({
            id: "2",
            message: "Bluetooth is turned off"
          })
          this.stop();
          blueCheck = true;
        }
      }
      else{
        if (blueCheck){
          blueCheck = false;
          this.wait = BackgroundTimer.setTimeout(() => {this.startAllSystems();}, 2000);
        }
      }
    });
  }

  startAllSystems = () => {
    if (!check){
      this.intervalCon = BackgroundTimer.setInterval(() => {
      this.connectionCheck();
    }, 20000);
  }

    this.beaconData.copy(this.initialData);
    this.loadLocal();
    if (!RNEP.proximityObserver.isObserving){
      this.startProximityObserver();
    }
    this.interval = BackgroundTimer.setInterval(() => {
      this.int1();
      this.int2();
      this.int3();
      this.int4();
      this.saveLocal();
    }, 1000);
  }

  stopAllSystems = () => {
   this.stop();
   BackgroundTimer.clearInterval(this.intervalCon);
   stopService();
   check = false;
  }

  stop = () => {
    BackgroundTimer.clearInterval(this.interval);
    if (RNEP.proximityObserver.isObserving){
      this.stopProximityObserver();
    }
    loadCheck = false;
  }

  saveLocal = async () => {
    try {
      await AsyncStorage.setItem('test', JSON.stringify(this.beaconData)).then(() => {
      });
    } catch (e) {}
  }
  
  loadLocal = async () => {
    try {
      await AsyncStorage.getItem('test').then( (value) => {
        newVal = JSON.parse(value);
        if(newVal !== null) {
          this.beaconData.copy(newVal);
          if (!loadCheck){
            this.putEnablersToZero();
            loadCheck = true;
            check = true;
          }
        }
      });
    } catch(e) {}
  }

  putEnablersToZero = () => {
    this.beaconData.en1 = 0;
    this.beaconData.en2 = 0;
    this.beaconData.en3 = 0;
    this.beaconData.en4 = 0;
    this.beaconData.time1 = 0;
    this.beaconData.time2 = 0;
    this.beaconData.time3 = 0;
    this.beaconData.time4 = 0;
  }

  generate = () => {
    return (<Beac theData={this.myData} theReset={this.reset} theService={this.stopAllSystems}/>);
  }

  myData = () => {
    return this.beaconData;
  }

  reset = () => {
    t1 = this.beaconData.time1;
    t2 = this.beaconData.time2;
    t3 = this.beaconData.time3;
    t4 = this.beaconData.time4;
    this.beaconData.copy(this.initialData);
    if (t1 !== 0){
      this.beaconData.time1 = Date.parse(new Date());
      this.beaconData.visitedTimes1 = 1; 
      this.beaconData.en1 = 1;
      
    }
    if (t2 !== 0){
      this.beaconData.time2 = Date.parse(new Date());
      this.beaconData.visitedTimes2 = 1; 
      this.beaconData.en2 = 1;
      
    }
    if (t3 !== 0){
      this.beaconData.time3 = Date.parse(new Date());
      this.beaconData.visitedTimes3 = 1; 
      this.beaconData.en3 = 1;
      
    }
    if (t4 !== 0){
      this.beaconData.time4 = Date.parse(new Date());
      this.beaconData.visitedTimes4 = 1; 
      this.beaconData.en4 = 1;
      
    }
  }


  int1 = () => {
    currTime = Date.parse(new Date());
    if (this.beaconData.time1 !== 0){
      this.beaconData.currTime1 = (currTime - this.beaconData.time1) / 1000;
      if (this.beaconData.currTime1 > this.beaconData.maxTime1){
        this.beaconData.maxTime1 = this.beaconData.currTime1;
      }
      this.beaconData.totalTime1 = this.beaconData.totalTime1 + (((currTime - this.beaconData.time1) / 1000) - this.beaconData.currTime1 + 1);
      if (this.beaconData.currTime1 > this.beaconData.totalTime1){this.beaconData.totalTime1 = this.beaconData.currTime1}
    }
  }
  int2 = () => {
    currTime = Date.parse(new Date());
    if (this.beaconData.time2 !== 0){
      this.beaconData.currTime2 = (currTime - this.beaconData.time2) / 1000;
      if (this.beaconData.currTime2 > this.beaconData.maxTime2){
        this.beaconData.maxTime2 = this.beaconData.currTime2;
      }
      this.beaconData.totalTime2 = this.beaconData.totalTime2 + (((currTime - this.beaconData.time2) / 1000) - this.beaconData.currTime2 + 1);
      if (this.beaconData.currTime2 > this.beaconData.totalTime2){this.beaconData.totalTime2 = this.beaconData.currTime2}
    }
  }
  int3 = () => {
    currTime = Date.parse(new Date());
    if (this.beaconData.time3 !== 0){
      this.beaconData.currTime3 = (currTime - this.beaconData.time3) / 1000;
      if (this.beaconData.currTime3 > this.beaconData.maxTime3){
        this.beaconData.maxTime3 = this.beaconData.currTime3;
      }
      this.beaconData.totalTime3 = this.beaconData.totalTime3 + (((currTime - this.beaconData.time3) / 1000) - this.beaconData.currTime3 + 1);
      if (this.beaconData.currTime3 > this.beaconData.totalTime3){this.beaconData.totalTime3 = this.beaconData.currTime3}
    }
  }
  int4 = () => {
    currTime = Date.parse(new Date());
    if (this.beaconData.time4 !== 0){
      this.beaconData.currTime4 = (currTime - this.beaconData.time4) / 1000;
      if (this.beaconData.currTime4 > this.beaconData.maxTime4){
        this.beaconData.maxTime4 = this.beaconData.currTime4;
      }
      this.beaconData.totalTime4 = this.beaconData.totalTime4 + (((currTime - this.beaconData.time4) / 1000) - this.beaconData.currTime4 + 1);
      if (this.beaconData.currTime4 > this.beaconData.totalTime4){this.beaconData.totalTime4 = this.beaconData.currTime4}
    }
  }

  startProximityObserver = () => {
    const ESTIMOTE_APP_ID = "testingbeacons-nwt";
    const ESTIMOTE_APP_TOKEN = "b7a21028ae4394901f216d92c1e711f3";
  
    //White
    const zone1 = new RNEP.ProximityZone(5, "Testing 1");
    zone1.onEnterAction = context => {
      this.beaconData.visitedTimes1 = this.beaconData.visitedTimes1 + 1; 
      this.beaconData.en1 = 1;
      this.beaconData.time1 = Date.parse(new Date());
    }
    zone1.onExitAction = context => {
      this.beaconData.currTime1 = 0;
      this.beaconData.en1 = 0;
      this.beaconData.time1 = 0;
    }
    

    //green
    const zone2 = new RNEP.ProximityZone(5, "Testing 2");
    zone2.onEnterAction = context => {
      this.beaconData.visitedTimes2 = this.beaconData.visitedTimes2 + 1; 
      this.beaconData.en2 = 1;
      this.beaconData.time2 = Date.parse(new Date());
    }
    zone2.onExitAction = context => {
      this.beaconData.currTime2 = 0;
      this.beaconData.en2 = 0;
      this.beaconData.time2 = 0;
    }

    //darkBlue
    const zone3 = new RNEP.ProximityZone(5, "Testing 3");
    zone3.onEnterAction = context => {
      this.beaconData.visitedTimes3 = this.beaconData.visitedTimes3 + 1; 
      this.beaconData.en3 = 1;
      this.beaconData.time3 = Date.parse(new Date());
    }
    zone3.onExitAction = context => {
      this.beaconData.currTime3 = 0;
      this.beaconData.en3 = 0;
      this.beaconData.time3 = 0;
    }

    //lightBlue
    const zone4 = new RNEP.ProximityZone(5, "Testing 4");
    zone4.onEnterAction = context => {
      this.beaconData.visitedTimes4 = this.beaconData.visitedTimes4 + 1; 
      this.beaconData.en4 = 1;
      this.beaconData.time4 = Date.parse(new Date());
      z4EnTimeout = BackgroundTimer.setTimeout(() => {if (this.beaconData.en4 === 1){this.mutePhone();}}, 60000);
    }
    zone4.onExitAction = context => {
      this.beaconData.currTime4 = 0;
      this.beaconData.en4 = 0;
      this.beaconData.time4 = 0;
      z4ExTimeout = BackgroundTimer.setTimeout(() => {if (this.beaconData.en4 === 0){this.unMutePhone();}}, 60000);
    }
  
    RNEP.locationPermission.request().then(
      permission => {
        console.log(`location permission: ${permission}`);
  
        if (permission !== RNEP.locationPermission.DENIED) {
          const credentials = new RNEP.CloudCredentials(
            ESTIMOTE_APP_ID,
            ESTIMOTE_APP_TOKEN
          );
  
          // const config = {
    
          //   notification: {
          //     title: "Exploration mode is on",
          //     text: "Tracking your location.",
          //     channel: {
          //       id: "exploration-mode",
          //       name: "Exploration Mode"
          //     }
          //   }
          // };
  
          RNEP.proximityObserver.initialize(credentials);
          RNEP.proximityObserver.startObservingZones([zone1, zone2, zone3, zone4]);
        }
      },
      error => {
        console.error("Error when trying to obtain location permission", error);
        alert("Error when trying to obtain location permission", error);
      }
    );
  
  };
  
  stopProximityObserver = () => { RNEP.proximityObserver.stopObservingZones(); };

  mutePhone = () => {
    SystemSetting.getVolume("music").then(vol => {volSettings.music = vol;});
    SystemSetting.getVolume("call").then(vol => {volSettings.call = vol;});
    SystemSetting.getVolume("system").then(vol => {volSettings.system = vol;});
    SystemSetting.getVolume("ring").then(vol => {volSettings.ring = vol;});
    SystemSetting.getVolume("alarm").then(vol => {volSettings.alarm = vol;});
    SystemSetting.getVolume("notification").then(vol => {volSettings.notification = vol;});

    let config = {
      type : "",
      playSound : false,
      showUI : true
    };
    if (!volSettings.ring === 0){
      config.type = "music";
      SystemSetting.setVolume(0, config);
      config.type = "call";
      SystemSetting.setVolume(0, config);
      config.type = "system";
      SystemSetting.setVolume(0, config);
      config.type = "ring";
      SystemSetting.setVolume(0, config);
      config.type = "alarm";
      SystemSetting.setVolume(0, config);
      config.type = "notification";
      SystemSetting.setVolume(0, config);
    }
  }

  unMutePhone = () => {
    let config = {
      type : "",
      playSound : false,
      showUI : true
    };
    config.type = "music";
    SystemSetting.setVolume(volSettings.music, config);
    config.type = "call";
    SystemSetting.setVolume(volSettings.call, config);
    config.type = "system";
    SystemSetting.setVolume(volSettings.system, config);
    config.type = "ring";
    SystemSetting.setVolume(volSettings.ring, config);
    config.type = "alarm";
    SystemSetting.setVolume(volSettings.alarm, config);
    config.type = "notification";
    SystemSetting.setVolume(volSettings.notification, config);
  }

}


class Beac extends Component{
  constructor(){
    super();
    this.state = {
      visitedTimes1: 0,
      visitedTimes2: 0,
      visitedTimes3: 0,
      visitedTimes4: 0,
      maxTime1: 0,
      maxTime2: 0,
      maxTime3: 0,
      maxTime4: 0,
      currTime1: 0,
      currTime2: 0,
      currTime3: 0,
      currTime4: 0,
      totalTime1: 1,
      totalTime2: 1,
      totalTime3: 1,
      totalTime4: 1,
      en1:0,
      en2:0,
      en3:0,
      en4:0,
      time1 : 0,
      time2 : 0,
      time3 : 0,
      time4 : 0,
    };
    this.chart_wh = 250;
    this.sliceColor = ["#FFFFFF", "#B5F2B5", "#0D0DAB", "#00CCFF"];
  }

  componentDidMount(){
    this.interval = setInterval(() => {this.setState(this.props.theData());}, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  secondsToPattern = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " h, " : " h, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " m, " : " m, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
    return hDisplay + mDisplay + sDisplay; 
}

  render(){
    this.chartData = [this.state.totalTime1, this.state.totalTime2, this.state.totalTime3, this.state.totalTime4];
    if (this.chartData[0] === 0 || this.chartData[1] === 0 || this.chartData[2] === 0 || this.chartData[3] === 0){
      this.chartData[0] = 1;
      this.chartData[1] = 1;
      this.chartData[2] = 1;
      this.chartData[3] = 1;
    }
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.container}>
              <StatusBar
                hidden={true}
              />
              <Text style={styles.title}>Time spent in each area: </Text>
              <PieChart
                chart_wh={this.chart_wh}
                series={this.chartData}
                sliceColor={this.sliceColor} 
              /> 
              </View>
              <Text style={styles.textVieww}>---------------------------------------------------------------------------------------</Text>
              <Text style={{margin: 15, borderColor: '#7a42f4', borderWidth: 1, backgroundColor: "#FFFFFF"}}></Text>
              <Text style={styles.textVieww}>Number of times entered in white area: {this.state.visitedTimes1}</Text>
              <Text style={styles.textVieww}>Maximum time spent in white area: {this.secondsToPattern(this.state.maxTime1)}</Text>
              <Text style={styles.textVieww}>Current time spent in white area: {this.secondsToPattern(this.state.currTime1)}</Text>
              <Text style={styles.textVieww}>Total time spent in white area: {this.secondsToPattern(this.state.totalTime1)}</Text>
              <Text style={styles.textVieww}>---------------------------------------------------------------------------------------</Text>
              <Text style={{margin: 15, borderColor: '#7a42f4', borderWidth: 1, backgroundColor: "#B5F2B5"}}></Text>
              <Text style={styles.textVieww}>Number of times entered in green area: {this.state.visitedTimes2}</Text>
              <Text style={styles.textVieww}>Maximum time spent in green area: {this.secondsToPattern(this.state.maxTime2)}</Text>
              <Text style={styles.textVieww}>Current time spent in green area: {this.secondsToPattern(this.state.currTime2)}</Text>
              <Text style={styles.textVieww}>Total time spent in green area: {this.secondsToPattern(this.state.totalTime2)}</Text>
              <Text style={styles.textVieww}>---------------------------------------------------------------------------------------</Text>
              <Text style={{margin: 15, borderColor: '#7a42f4', borderWidth: 1, backgroundColor: "#0D0DAB"}}></Text>
              <Text style={styles.textVieww}>Number of times entered in dark blue area: {this.state.visitedTimes3}</Text>
              <Text style={styles.textVieww}>Maximum time spent in dark blue area: {this.secondsToPattern(this.state.maxTime3)}</Text>
              <Text style={styles.textVieww}>Current time spent in dark blue area: {this.secondsToPattern(this.state.currTime3)}</Text>
              <Text style={styles.textVieww}>Total time spent in dark blue area: {this.secondsToPattern(this.state.totalTime3)}</Text>
              <Text style={styles.textVieww}>---------------------------------------------------------------------------------------</Text>
              <Text style={{margin: 15, borderColor: '#7a42f4', borderWidth: 1, backgroundColor: "#00CCFF"}}></Text>
              <Text style={styles.textVieww}>Number of times entered in light blue area: {this.state.visitedTimes4}</Text>
              <Text style={styles.textVieww}>Maximum time spent in light blue area: {this.secondsToPattern(this.state.maxTime4)}</Text>
              <Text style={styles.textVieww}>Current time spent in light blue area: {this.secondsToPattern(this.state.currTime4)}</Text>
              <Text style={styles.textVieww}>Total time spent in light blue area: {this.secondsToPattern(this.state.totalTime4)}</Text>


            <View  style={styles.buttonContainer}>
              <Button  color="#841584" style={styles.button}
                onPress={() => {
                  this.props.theReset();
                  this.render();
                }} 
                title= {"Reset"}
                />
            </View>
            <View  style={styles.buttonContainer}>
              <Button  color="#841584" style={styles.button}
                onPress={() => {
                  this.props.theService();
                }} 
                title= {"Stop Service"}
                />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}


const styles = StyleSheet.create({

  scrollView: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: Colors.lighter,
  },
  scrollView1: {
    paddingHorizontal: 24,
    backgroundColor: Colors.lighter,
  },
  buttonContainer: {
    margin:15
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  textVieww:{
    margin: 15,
    // borderColor: '#7a42f4',
    // borderWidth: 1
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    margin: 10
  }
});

export default App;
