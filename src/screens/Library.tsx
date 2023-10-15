import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable
} from 'react-native';
import LibraryCard from '../components/LibraryCard';
import { COLORS } from '../constants/colors';
import SPACING from '../constants/spacing';
import TYPOGRAPHY from '../constants/typography';
const modules = require('../data/libraryModules.json');

export default function Libary() {
  const [currentFilter, setCurrentFilter] = useState('Popular');
  const filterNames = ['Popular', 'Todos', 'Iniciando', 'Lanzando'];
  const filteredLibraryModueles = modules.filter(module => {
    if (currentFilter === 'Todos') return module;
    else return module.level === currentFilter;
  });

  const handleFilter = filter => {
    setCurrentFilter(filter);
  };

  const getFilterStyle = (filter: string) => {
    if (currentFilter === filter)
      return { ...styles.filterBtn, ...styles.filterBtnSelected };
    else return styles.filterBtn;
  };

  const getFilterTextStyle = (filter: string) => {
    if (currentFilter === filter)
      return { color: COLORS.primaryWhite, fontSize: TYPOGRAPHY.baseText };
    else return { color: COLORS.primaryBlack, fontSize: TYPOGRAPHY.baseText };
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.title}>Biblioteca</Text>
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
            style={{ paddingBottom: SPACING.xlarge }}
            data={filteredLibraryModueles}
            renderItem={({ item }) => <LibraryCard item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryWhite,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.medium,
    height: '100%'
  },

  title: {
    fontSize: TYPOGRAPHY.extraLargeTitle,
    marginBottom: SPACING.large,
    color: COLORS.primaryBlack
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
    marginBottom: SPACING.medium
  },

  filterBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.lightGrey
  },

  filterBtnSelected: {
    backgroundColor: COLORS.primaryBlack
  }
});
