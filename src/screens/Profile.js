// ===== Home
// import all modules
import React, {Fragment} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Dimensions, StyleSheet} from 'react-native';

// import all components
import DetailsAccount from './DetailsAccount';
import OrderHistory from './OrderHistory';

const initialLayout = {width: Dimensions.get('window').width};

function Profile() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'details', title: 'Details Account'},
    {key: 'order', title: 'Order History'},
  ]);

  const renderScene = SceneMap({
    details: DetailsAccount,
    order: OrderHistory,
  });

  return (
    <Fragment>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.nav}
            inactiveColor="#AAAAAA"
            activeColor="#14142B"
            indicatorStyle={styles.indicatorStyle}
          />
        )}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  nav: {
    backgroundColor: 'white',
  },
  indicatorStyle: {
    backgroundColor: '#5F2EEA',
  },
});

export default Profile;
