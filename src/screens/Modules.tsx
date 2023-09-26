import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable
} from 'react-native';
import Module from './Module';
import { COLORS } from '../constants/colors';
const modules = require('../users.json');

export default function Modules() {
  const [currentFilter, setCurrentFilter] = useState('Popular');
  const filterNames = ['Popular', 'Todos', 'Iniciando', 'Lanzando'];

  const handleFilter = filter => {
    setCurrentFilter(filter);
  };

  const getFilterStyle = (filter: string) => {
    if (currentFilter === filter)
      return { ...styles.filterBtn, ...styles.filterBtnSelected };
    else return styles.filterBtn;
  };

  const getFilterTextStyle = (filter: string) => {
    if (currentFilter === filter) return { color: COLORS.primaryWhite };
    else return { color: COLORS.primaryBlack };
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.filters}>
            {filterNames.map((filter, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => handleFilter(filter)}
                  style={getFilterStyle(filter)}
                >
                  <Text style={getFilterTextStyle(filter)}>{filter}</Text>
                </Pressable>
              );
            })}
          </View>
          <FlatList
            data={modules}
            renderItem={({ item }) => <Module item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryWhite
  },
  title: {
    fontSize: 18,
    marginBottom: 8
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
    paddingHorizontal: 24,
    paddingVertical: 16
  },
  filterBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#eee'
  },
  filterBtnSelected: {
    backgroundColor: COLORS.primaryBlack
  }
});
