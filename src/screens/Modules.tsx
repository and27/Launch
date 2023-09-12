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
const modules = require('../users.json');

export default function Modules() {
  const [currentFilter, setCurrentFilter] = useState('popular');
  const filterNames = ['Popular', 'Todos', 'Iniciando', 'Lanzando'];
  const handleFilter = filter => {
    setCurrentFilter(filter);
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.filters}>
          {filterNames.map((filter, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => handleFilter(filter)}
                style={
                  currentFilter === filter
                    ? { ...styles.filterBtn, ...styles.filterBtnSelected }
                    : styles.filterBtn
                }
              >
                <Text>{filter}</Text>
              </Pressable>
            );
          })}
        </View>
        <FlatList
          data={modules}
          renderItem={({ item }) => <Module item={item} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  filterBtn: {
    padding: 8,
    borderRadius: 8
  },
  filterBtnSelected: {
    backgroundColor: '#ddd'
  }
});
