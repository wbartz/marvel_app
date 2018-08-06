import {
  createStackNavigator,
} from 'react-navigation';

import Heroes from '../pages/Heroes';
import Detail from '../pages/Detail';

export default createStackNavigator(
  {
    Heroes,
    Detail,
  },
  {
    initialRouteName: 'Heroes',
  },
);
